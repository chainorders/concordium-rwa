use concordium_cis2::IsTokenId;
use concordium_std::*;

use super::{
    holders_state::{HolderBalances, HolderStateError, HolderStateResult},
    tokens_state::IsTokenAmount,
};

pub enum RecoveryError {
    /// The address has already been recovered.
    AddressAlreadyRecovered,
    /// The new address already has frozen balances.
    InvalidRecoveryAddress,
}

#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
pub struct AddressesSecurityState<T, A, S> {
    recovery_addresses: StateMap<Address, Address, S>,
    identity_registry: ContractAddress,
    compliance: ContractAddress,
    frozen_balances: StateMap<Address, HolderBalances<T, A, S>, S>,
}

impl<T: IsTokenId + Copy, A: IsTokenAmount, S: HasStateApi> AddressesSecurityState<T, A, S> {
    pub fn new(
        identity_registry: ContractAddress,
        compliance: ContractAddress,
        state_builder: &mut StateBuilder<S>,
    ) -> Self {
        AddressesSecurityState {
            recovery_addresses: state_builder.new_map(),
            identity_registry,
            compliance,
            frozen_balances: state_builder.new_map(),
        }
    }

    /// Returns the recovery address for the given address if it exists.
    /// Retrieves the recovery address associated with the given address.
    ///
    /// # Arguments
    ///
    /// * `address` - The address for which to retrieve the recovery address.
    ///
    /// # Returns
    ///
    /// An `Option<Address>` representing the recovery address, or `None` if no recovery address is found.
    pub fn get_recovery_address(&self, address: &Address) -> Option<Address> {
        self.recovery_addresses.get(address).map(|a| *a)
    }

    /// Sets the recovery address for the given address.
    /// Sets the recovery address for a given address in the holders security state.
    ///
    /// # Arguments
    ///
    /// * `address` - The address for which the recovery address is being set.
    /// * `recovery_address` - The recovery address to be set.
    fn set_recovery_address(&mut self, address: Address, recovery_address: Address) {
        self.recovery_addresses.insert(address, recovery_address);
    }

    /// Removes the recovery address of the given address and sets it to the new address.
    /// Also transfers any frozen balances from the old address to the new address.
    ///
    /// # Arguments
    ///
    /// * `address` - The address to remove the recovery address from.
    /// * `new_address` - The new address to set as the recovery address.
    ///
    /// # Errors
    ///
    /// Returns `RecoveryError::AddressAlreadyRecovered` if the address has already been recovered.
    /// Returns `RecoveryError::InvalidRecoveryAddress` if the new address already has frozen balances.
    pub fn recover(&mut self, address: Address, new_address: Address) -> Result<(), RecoveryError> {
        // The input address should not already have a recovery address.
        ensure!(
            self.get_recovery_address(&address).is_none(),
            RecoveryError::AddressAlreadyRecovered
        );
        let frozen_balances = self
            .frozen_balances
            .remove_and_get(&address)
            .and_then(|frozen_balances| self.frozen_balances.insert(new_address, frozen_balances));
        // If the address has frozen balances, then the new address must not have any.
        ensure!(frozen_balances.is_none(), RecoveryError::InvalidRecoveryAddress);
        self.set_recovery_address(address, new_address);

        Ok(())
    }

    /// Returns the address of the identity registry contract.
    pub fn identity_registry(&self) -> ContractAddress {
        self.identity_registry
    }

    /// Returns the address of the compliance contract.
    pub fn compliance(&self) -> ContractAddress {
        self.compliance
    }

    /// Adds a specified amount to the frozen balance of a given address.
    ///
    /// # Arguments
    ///
    /// * `address` - The address to freeze the balance for.
    /// * `token_id` - The ID of the token to freeze.
    /// * `amount` - The amount to freeze.
    /// * `state_builder` - A mutable reference to the state builder.
    pub fn freeze(
        &mut self,
        address: Address,
        token_id: T,
        amount: A,
        state_builder: &mut StateBuilder<S>,
    ) -> HolderStateResult<()> {
        self.frozen_balances
            .entry(address)
            .or_insert_with(|| HolderBalances::new(state_builder))
            .add(token_id, amount)
    }

    /// Subtracts a specified amount from the frozen balance of a given address.
    ///
    /// # Arguments
    ///
    /// * `address` - The address to unfreeze the balance for.
    /// * `token_id` - The ID of the token to unfreeze.
    /// * `amount` - The amount to unfreeze.
    pub fn un_freeze(&mut self, address: Address, token_id: T, amount: A) -> HolderStateResult<()> {
        self.frozen_balances
            .entry(address)
            .occupied_or(HolderStateError::AmountTooLarge)?
            .sub(token_id, amount)
    }

    /// Returns the frozen balance of a given address for a specific token.
    ///
    /// # Arguments
    ///
    /// * `address` - The address to get the frozen balance for.
    /// * `token_id` - The ID of the token to get the frozen balance for.
    pub fn balance_of_frozen(&self, address: &Address, token_id: &T) -> A {
        self.frozen_balances
            .get(address)
            .map(|address| address.balance_of(token_id))
            .unwrap_or(A::zero())
    }
}

pub trait HasHoldersSecurityState<T, A, S> {
    fn holders_security_state(&self) -> &AddressesSecurityState<T, A, S>;
    fn holders_security_state_mut(&mut self) -> &mut AddressesSecurityState<T, A, S>;
}
