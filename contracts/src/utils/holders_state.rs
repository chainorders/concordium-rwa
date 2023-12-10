use concordium_cis2::IsTokenId;
use concordium_std::*;

use super::{holders_security_state::RecoveryError, tokens_state::IsTokenAmount};

pub enum HolderStateError {
    AmountTooLarge,
    AmountOverflow,
}
pub type HolderStateResult<T> = Result<T, HolderStateError>;

#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
pub struct HolderBalances<T, A, S> {
    balances: StateMap<T, A, S>,
}

impl<T: IsTokenId + Copy, A: IsTokenAmount, S: HasStateApi> HolderBalances<T, A, S> {
    pub fn new(state_builder: &mut StateBuilder<S>) -> Self {
        Self {
            balances: state_builder.new_map(),
        }
    }

    pub fn balance_of(&self, token_id: &T) -> A {
        self.balances.get(token_id).map(|a| *a).unwrap_or(A::zero())
    }

    pub fn sub(&mut self, token_id: T, amount: A) -> HolderStateResult<()> {
        let amount = self
            .balances
            .entry(token_id)
            .occupied_or(HolderStateError::AmountTooLarge)?
            .try_modify(|e| {
            e.checked_sub_assign(amount).ok_or(HolderStateError::AmountTooLarge)?;
            Ok(*e)
        })?;

        if A::zero().eq(&amount) {
            self.balances.remove(&token_id);
        }

        Ok(())
    }

    pub fn add(&mut self, token_id: T, amount: A) -> HolderStateResult<()> {
        self.balances
            .entry(token_id)
            .or_insert_with(|| A::zero())
            .try_modify(|e| e.checked_add_assign(amount).ok_or(HolderStateError::AmountOverflow))
    }
}

/// The State of a single address for all tokens.
#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
pub struct HolderState<T, A, S> {
    operators: StateSet<Address, S>,
    balances: HolderBalances<T, A, S>,
}

impl<T: IsTokenId + Copy, A: IsTokenAmount, S: HasStateApi> HolderState<T, A, S> {
    /// Creates a new `HolderState` with empty operators and balances.
    ///
    /// # Arguments
    ///
    /// * `state_builder` - A mutable reference to the state builder.
    pub fn new(state_builder: &mut StateBuilder<S>) -> Self {
        Self {
            operators: state_builder.new_set(),
            balances: HolderBalances::new(state_builder),
        }
    }

    /// Checks if the given address is an operator for the holder.
    ///
    /// # Arguments
    ///
    /// * `operator` - The address to check.
    pub fn is_operator(&self, operator: &Address) -> bool {
        self.operators.contains(operator)
    }

    /// Adds an operator for the holder.
    ///
    /// # Arguments
    ///
    /// * `operator` - The address of the operator to add.
    pub fn add_operator(&mut self, operator: Address) {
        self.operators.insert(operator);
    }

    /// Removes an operator from the holder.
    ///
    /// # Arguments
    ///
    /// * `operator` - The address of the operator to remove.
    pub fn remove_operator(&mut self, operator: &Address) {
        self.operators.remove(operator);
    }

    /// Returns the balance of a specific token for the holder.
    ///
    /// # Arguments
    ///
    /// * `token_id` - The ID of the token to get the balance for.
    pub fn balance_of(&self, token_id: &T) -> A {
        self.balances.balance_of(token_id)
    }

    /// Subtracts a specified amount from the balance of a specific token for the holder.
    ///
    /// # Arguments
    ///
    /// * `token_id` - The ID of the token to subtract from.
    /// * `amount` - The amount to subtract.
    ///
    /// # Errors
    ///
    /// Returns `HolderStateError::AmountTooLarge` if the amount to subtract is larger than the current balance.
    pub fn sub(&mut self, token_id: T, amount: A) -> HolderStateResult<()> {
        self.balances.sub(token_id, amount)
    }

    /// Adds a specified amount to the balance of a specific token for the holder.
    ///
    /// # Arguments
    ///
    /// * `token_id` - The ID of the token to add to.
    /// * `amount` - The amount to add.
    ///
    /// # Errors
    ///
    /// Returns `HolderStateError::AmountOverflow` if the amount to add and the current balance exceed the maximum value of `A`.
    pub fn add(&mut self, token_id: T, amount: A) -> HolderStateResult<()> {
        self.balances.add(token_id, amount)
    }
}

/// The State of all addresses for all tokens.
/// This is the state that should be used for all token transfers.
#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
pub struct HoldersState<T, A, S> {
    pub addresses: StateMap<Address, HolderState<T, A, S>, S>,
}

impl<T: IsTokenId + Copy, A: IsTokenAmount, S: HasStateApi> HoldersState<T, A, S> {
    /// Creates a new `HoldersState` with empty addresses.
    ///
    /// # Arguments
    ///
    /// * `state_builder` - A mutable reference to the state builder.
    pub fn new(state_builder: &mut StateBuilder<S>) -> Self {
        Self {
            addresses: state_builder.new_map(),
        }
    }

    /// Checks if the given operator is an operator for the given address.
    ///
    /// # Arguments
    ///
    /// * `address` - The address to check.
    /// * `operator` - The operator to check.
    ///
    /// # Returns
    ///
    /// Returns `true` if the operator is an operator for the address, `false` otherwise.
    pub fn is_operator(&self, address: &Address, operator: &Address) -> bool {
        self.addresses.get(address).map(|address| address.is_operator(operator)).unwrap_or(false)
    }

    /// Adds an operator for the given address.
    ///
    /// # Arguments
    ///
    /// * `address` - The address to add an operator for.
    /// * `operator` - The operator to add.
    /// * `state_builder` - A mutable reference to the state builder.
    pub fn add_operator(
        &mut self,
        address: Address,
        operator: Address,
        state_builder: &mut StateBuilder<S>,
    ) {
        self.addresses
            .entry(address)
            .or_insert_with(|| HolderState::new(state_builder))
            .add_operator(operator);
    }

    /// Removes an operator from the given address.
    ///
    /// # Arguments
    ///
    /// * `address` - The address to remove an operator from.
    /// * `operator` - The operator to remove.
    pub fn remove_operator(&mut self, address: Address, operator: &Address) {
        self.addresses.entry(address).and_modify(|address| {
            address.remove_operator(operator);
        });
    }

    /// Returns the balance of the given address for the given token.
    ///
    /// # Arguments
    ///
    /// * `address` - The address to get the balance for.
    /// * `token_id` - The ID of the token to get the balance for.
    ///
    /// # Returns
    ///
    /// Returns the balance of the given token for the given address. If the address does not exist, returns zero.
    pub fn balance_of(&self, address: &Address, token_id: &T) -> A {
        self.addresses.get(address).map(|address| address.balance_of(token_id)).unwrap_or(A::zero())
    }

    /// Adds a specified amount to the balance of a specific token for the given address.
    ///
    /// # Arguments
    ///
    /// * `address` - The address to add the balance to.
    /// * `token_id` - The ID of the token to add the balance to.
    /// * `amount` - The amount to add.
    /// * `state_builder` - A mutable reference to the state builder.
    ///
    /// # Returns
    ///
    /// Returns `Ok(())` if the operation was successful. If the address does not exist, it is created.
    ///
    /// # Errors
    ///
    /// Returns `HolderStateError::AmountOverflow` if the amount to add and the current balance exceed the maximum value of `A`.
    pub fn add_balance(
        &mut self,
        address: Address,
        token_id: T,
        amount: A,
        state_builder: &mut StateBuilder<S>,
    ) -> HolderStateResult<()> {
        self.addresses
            .entry(address)
            .or_insert_with(|| HolderState::new(state_builder))
            .add(token_id, amount)
    }

    /// Subtracts a specified amount from the balance of a specific token for the given address.
    ///
    /// # Arguments
    ///
    /// * `address` - The address to subtract the balance from.
    /// * `token_id` - The ID of the token to subtract the balance from.
    /// * `amount` - The amount to subtract.
    ///
    /// # Returns
    ///
    /// Returns `Ok(())` if the operation was successful.
    ///
    /// # Errors
    ///
    /// Returns `HolderStateError::AmountTooLarge` if the amount to subtract is larger than the current balance.
    pub fn sub_balance(
        &mut self,
        address: Address,
        token_id: T,
        amount: A,
    ) -> HolderStateResult<()> {
        self.addresses
            .entry(address)
            .occupied_or(HolderStateError::AmountTooLarge)?
            .try_modify(|address| address.sub(token_id, amount))
    }

    /// Transfers a specified amount of a specific token from one address to another.
    ///
    /// # Arguments
    ///
    /// * `from` - The address to transfer from.
    /// * `to` - The address to transfer to.
    /// * `token_id` - The ID of the token to transfer.
    /// * `amount` - The amount to transfer.
    /// * `state_builder` - A mutable reference to the state builder.
    ///
    /// # Returns
    ///
    /// Returns `Ok(())` if the operation was successful.
    ///
    /// # Errors
    ///
    /// Returns `HolderStateError::AmountTooLarge` if the amount to transfer is larger than the current balance of the `from` address.
    /// Returns `HolderStateError::AmountOverflow` if the amount to add and the current balance of the `to` address exceed the maximum value of `A`.
    pub fn transfer(
        &mut self,
        from: Address,
        to: Address,
        token_id: T,
        amount: A,
        state_builder: &mut StateBuilder<S>,
    ) -> HolderStateResult<()> {
        self.addresses.entry(from).and_try_modify(|address| address.sub(token_id, amount))?;
        self.addresses
            .entry(to)
            .or_insert_with(|| HolderState::new(state_builder))
            .add(token_id, amount)
    }

    /// Transfers state from one address to another.
    ///
    /// # Arguments
    ///
    /// * `address` - The address to transfer state from.
    /// * `new_address` - The address to transfer state to.
    ///
    /// # Returns
    ///
    /// Returns `Ok(())` if the operation was successful.
    ///
    /// # Errors
    ///
    /// Returns `RecoveryError::InvalidRecoveryAddress` if the `new_address` already has a state.
    pub fn recover(&mut self, address: Address, new_address: Address) -> Result<(), RecoveryError> {
        let state = self
            .addresses
            .remove_and_get(&address)
            .and_then(|holder_state| self.addresses.insert(new_address, holder_state));

        // new address should already not have a state
        ensure!(state.is_none(), RecoveryError::InvalidRecoveryAddress);
        Ok(())
    }
}

pub trait HasHoldersState<T, A, S> {
    fn holders_state(&self) -> &HoldersState<T, A, S>;
    fn holders_state_mut(&mut self) -> &mut HoldersState<T, A, S>;
}
