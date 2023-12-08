use concordium_cis2::*;
use concordium_std::{ops, *};

#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
pub struct TokenState<A, S = StateApi> {
    balances: StateMap<Address, A, S>,
    metadata_url: MetadataUrl,
}

#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
pub struct TokensState<T, A, S = StateApi> {
    tokens: StateMap<T, TokenState<A, S>, S>,
}

pub trait IsTokenAmount:
    concordium_cis2::IsTokenAmount
    + PartialOrd
    + ops::SubAssign
    + Copy
    + ops::AddAssign
    + ops::Sub<Output = Self>
{
    fn zero() -> Self;
    fn max_value() -> Self;
}

pub enum TokenStateError {
    TokenAlreadyExists,
    TokenDoesNotExist,
    AmountTooLarge,
}

pub type TokenStateResult<T> = Result<T, TokenStateError>;

impl<T: IsTokenId, A: IsTokenAmount> TokensState<T, A> {
    pub fn new(state_builder: &mut StateBuilder) -> Self {
        TokensState {
            tokens: state_builder.new_map(),
        }
    }

    pub fn has_token(&self, token_id: &T) -> bool {
        self.tokens.get(token_id).is_some()
    }

    pub fn token_metadata_url(&self, token_id: &T) -> TokenStateResult<MetadataUrl> {
        self.tokens
            .get(token_id)
            .map(|token| token.metadata_url.to_owned())
            .ok_or(TokenStateError::TokenDoesNotExist)
    }

    pub fn balance_of(&self, token_id: &T, address: &Address) -> TokenStateResult<A> {
        self.tokens
            .get(token_id)
            .and_then(|token| token.balances.get(address).map(|a| *a).or(Some(A::zero())))
            .ok_or(TokenStateError::TokenDoesNotExist)
    }

    pub fn add_token(
        &mut self,
        token_id: T,
        metadata_url: MetadataUrl,
        initial_balances: Vec<(Address, A)>,
        state_builder: &mut StateBuilder,
    ) -> TokenStateResult<()> {
        self.tokens
            .entry(token_id)
            .vacant_or(TokenStateError::TokenAlreadyExists)?
            .insert(TokenState {
                balances: state_builder.new_map(),
                metadata_url,
            })
            .try_modify(|e| {
                for (address, amount) in initial_balances {
                    ensure!(amount <= A::max_value(), TokenStateError::AmountTooLarge);
                    e.balances.insert(address, amount);
                }
                Ok(())
            })
    }

    pub fn burn_token(&mut self, token_id: T, owner: Address, amount: A) -> TokenStateResult<()> {
        self.tokens
            .entry(token_id)
            .occupied_or(TokenStateError::TokenDoesNotExist)?
            .try_modify(|token| {
                token
                    .balances
                    .entry(owner)
                    .occupied_or(TokenStateError::AmountTooLarge)?
                    .try_modify(|balance| {
                        let mut balance = *balance;
                        if balance.ge(&amount) {
                            balance -= amount;
                            Ok(())
                        } else {
                            Err(TokenStateError::AmountTooLarge)
                        }
                    })
                    .map(|_| ())
            })
            .map(|_| ())
    }

    pub fn transfer(
        &mut self,
        token_id: T,
        from: Address,
        to: Address,
        amount: A,
    ) -> TokenStateResult<()> {
        self.tokens
            .entry(token_id)
            .occupied_or(TokenStateError::TokenDoesNotExist)?
            .try_modify(|token| {
                token
                    .balances
                    .entry(from)
                    .occupied_or(TokenStateError::AmountTooLarge)?
                    .try_modify(|balance| {
                        let mut balance = *balance;
                        if balance.ge(&amount) {
                            balance -= amount;
                            Ok(())
                        } else {
                            Err(TokenStateError::AmountTooLarge)
                        }
                    })
                    .map(|_| ())?;
                token
                    .balances
                    .entry(to)
                    .or_insert_with(|| A::zero())
                    .try_modify(|balance| {
                        ensure!(
                            amount.le(&A::max_value().sub(*balance)),
                            TokenStateError::AmountTooLarge
                        );
                        *balance += amount;
                        Ok(())
                    })
                    .map(|_| ())
            })
            .map(|_| ())
    }
}

pub trait HasTokensState<T, A, S = StateApi> {
    fn tokens_state(&self) -> &TokensState<T, A, S>;
    fn tokens_state_mut(&mut self) -> &mut TokensState<T, A, S>;
}
