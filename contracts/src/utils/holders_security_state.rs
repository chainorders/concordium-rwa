use concordium_cis2::IsTokenId;
use concordium_std::*;

use super::{
    holders_state::{HolderBalances, HolderStateError, HolderStateResult},
    tokens_state::IsTokenAmount,
};

pub enum RecoveryError {
    AddressAlreadyRecovered,
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
    pub fn get_recovery_address(&self, address: &Address) -> Option<Address> {
        self.recovery_addresses.get(address).map(|a| *a)
    }

    /// Sets the recovery address for the given address.
    fn set_recovery_address(&mut self, address: Address, recovery_address: Address) {
        self.recovery_addresses.insert(address, recovery_address);
    }

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

    /// Gets the identity registry contract address.
    pub fn identity_registry(&self) -> ContractAddress {
        self.identity_registry
    }

    /// Gets the compliance contract address.
    pub fn compliance(&self) -> ContractAddress {
        self.compliance
    }

    /// Adds amount to the frozen balance of the given address.
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

    /// Subtracts amount from the frozen balance of the given address.
    pub fn un_freeze(&mut self, address: Address, token_id: T, amount: A) -> HolderStateResult<()> {
        self.frozen_balances
            .entry(address)
            .occupied_or(HolderStateError::AmountTooLarge)?
            .sub(token_id, amount)
    }

    /// Returns the frozen balance of the given address.
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
