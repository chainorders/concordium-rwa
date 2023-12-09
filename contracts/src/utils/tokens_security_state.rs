use concordium_cis2::IsTokenId;
use concordium_std::*;

use super::tokens_state::{IsTokenAmount, TokenBalances, TokenStateError, TokenStateResult};

#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
pub struct TokenSecurityState<A, S> {
    is_paused: bool,
    frozen_balances: TokenBalances<A, S>,
}

impl<A: IsTokenAmount, S: HasStateApi> TokenSecurityState<A, S> {
    pub fn new(state_builder: &mut StateBuilder<S>) -> Self {
        Self {
            is_paused: false,
            frozen_balances: TokenBalances::new(state_builder),
        }
    }
}

#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
pub struct TokensSecurityState<T, A, S> {
    tokens_state: StateMap<T, TokenSecurityState<A, S>, S>,
    recovery_addresses: StateMap<Address, Address, S>,
}

impl<T: IsTokenId, A: IsTokenAmount, S: HasStateApi> TokensSecurityState<T, A, S> {
    pub fn new(state_builder: &mut StateBuilder<S>) -> Self {
        Self {
            tokens_state: state_builder.new_map(),
            recovery_addresses: state_builder.new_map(),
        }
    }

    /// Returns true if the token with the given id is paused.
    pub fn is_paused(&self, token_id: &T) -> bool {
        self.tokens_state.get(token_id).map(|token| token.is_paused).unwrap_or(false)
    }

    /// Pauses the token with the given id.
    pub fn pause(&mut self, token_id: T, state_builder: &mut StateBuilder<S>) {
        self.tokens_state
            .entry(token_id)
            .or_insert_with(|| TokenSecurityState::new(state_builder))
            .modify(|token| token.is_paused = true)
    }

    /// Unpauses the token with the given id.
    pub fn un_pause(&mut self, token_id: T) {
        self.tokens_state.entry(token_id).and_modify(|token| token.is_paused = false);
    }

    /// Adds amount to the frozen balance of the given address.
    pub fn freeze(
        &mut self,
        token_id: T,
        address: Address,
        amount: A,
        state_builder: &mut StateBuilder<S>,
    ) -> TokenStateResult<()> {
        self.tokens_state
            .entry(token_id)
            .or_insert_with(|| TokenSecurityState::new(state_builder))
            .try_modify(|token| token.frozen_balances.add(&address, amount).map(|_| ()))
    }

    /// Subtracts amount from the frozen balance of the given address.
    pub fn un_freeze(&mut self, token_id: T, address: Address, amount: A) -> TokenStateResult<()> {
        self.tokens_state
            .entry(token_id)
            .occupied_or(TokenStateError::TokenDoesNotExist)?
            .try_modify(|token| token.frozen_balances.sub(&address, amount).map(|_| ()))
    }

    /// Returns the frozen balance of the given address.
    pub fn balance_of_frozen(&self, token_id: &T, address: &Address) -> A {
        self.tokens_state
            .get(token_id)
            .map(|token| token.frozen_balances.balance_of(address))
            .unwrap_or(A::zero())
    }
}

pub trait HasTokensSecurityState<T, A, S> {
    fn security_tokens_state(&self) -> &TokensSecurityState<T, A, S>;
    fn security_tokens_state_mut(&mut self) -> &mut TokensSecurityState<T, A, S>;
}
