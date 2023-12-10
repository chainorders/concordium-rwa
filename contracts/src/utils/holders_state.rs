use concordium_cis2::IsTokenId;
use concordium_std::*;

use super::tokens_state::{IsTokenAmount, TokenStateError, TokenStateResult};

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

    pub fn sub(&mut self, token_id: T, amount: A) -> TokenStateResult<()> {
        let amount = self
            .balances
            .entry(token_id)
            .occupied_or(TokenStateError::AmountTooLarge)?
            .try_modify(|e| {
                e.checked_sub_assign(amount).ok_or(TokenStateError::AmountTooLarge).copied()
            })?;

        if A::zero().eq(&amount) {
            self.balances.remove(&token_id);
        }

        Ok(())
    }

    pub fn add(&mut self, token_id: T, amount: A) -> TokenStateResult<()> {
        self.balances.entry(token_id).or_insert_with(|| A::zero()).try_modify(|e| {
            e.checked_add_assign(amount).ok_or(TokenStateError::AmountTooLarge).map(|_| ())
        })
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
    pub fn new(state_builder: &mut StateBuilder<S>) -> Self {
        Self {
            operators: state_builder.new_set(),
            balances: HolderBalances::new(state_builder),
        }
    }

    pub fn is_operator(&self, operator: &Address) -> bool {
        self.operators.contains(operator)
    }

    pub fn add_operator(&mut self, operator: Address) {
        self.operators.insert(operator);
    }

    pub fn remove_operator(&mut self, operator: &Address) {
        self.operators.remove(operator);
    }

    pub fn balance_of(&self, token_id: &T) -> A {
        self.balances.balance_of(token_id)
    }

    pub fn sub(&mut self, token_id: T, amount: A) -> TokenStateResult<()> {
        self.balances.sub(token_id, amount)
    }

    pub fn add(&mut self, token_id: T, amount: A) -> TokenStateResult<&mut Self> {
        self.balances.add(token_id, amount)?;
        Ok(self)
    }
}

#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
pub struct HoldersState<T, A, S> {
    pub addresses: StateMap<Address, HolderState<T, A, S>, S>,
}

impl<T: IsTokenId + Copy, A: IsTokenAmount, S: HasStateApi> HoldersState<T, A, S> {
    pub fn new(state_builder: &mut StateBuilder<S>) -> Self {
        Self {
            addresses: state_builder.new_map(),
        }
    }

    pub fn is_operator(&self, address: &Address, operator: &Address) -> bool {
        self.addresses.get(address).map(|address| address.is_operator(operator)).unwrap_or(false)
    }

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

    pub fn remove_operator(&mut self, address: Address, operator: &Address) {
        self.addresses.entry(address).and_modify(|address| {
            address.remove_operator(operator);
        });
    }

    /// Returns the balance of the given address for the given token.
    pub fn balance_of(&self, address: &Address, token_id: &T) -> A {
        self.addresses.get(address).map(|address| address.balance_of(token_id)).unwrap_or(A::zero())
    }

    pub fn add_balance(
        &mut self,
        address: Address,
        token_id: T,
        amount: A,
        state_builder: &mut StateBuilder<S>,
    ) -> TokenStateResult<&mut Self> {
        self.addresses
            .entry(address)
            .or_insert_with(|| HolderState::new(state_builder))
            .add(token_id, amount)?;

        Ok(self)
    }

    pub fn sub_balance(
        &mut self,
        address: Address,
        token_id: T,
        amount: A,
    ) -> TokenStateResult<()> {
        self.addresses
            .entry(address)
            .occupied_or(TokenStateError::AmountTooLarge)?
            .try_modify(|address| address.sub(token_id, amount))
    }

    pub fn transfer(
        &mut self,
        from: Address,
        to: Address,
        token_id: T,
        amount: A,
        state_builder: &mut StateBuilder<S>,
    ) -> TokenStateResult<()> {
        self.addresses
            .entry(from)
            .and_try_modify(|address| address.sub(token_id, amount).map(|_| ()))?;

        self.addresses
            .entry(to)
            .or_insert_with(|| HolderState::new(state_builder))
            .add(token_id, amount)?;

        Ok(())
    }
}

pub trait HasHoldersState<T, A, S> {
    fn holders_state(&self) -> &HoldersState<T, A, S>;
    fn holders_state_mut(&mut self) -> &mut HoldersState<T, A, S>;
}
