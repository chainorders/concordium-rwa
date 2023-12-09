use concordium_cis2::*;
use concordium_std::{ops, *};

#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
pub struct TokenBalances<A, S> {
    balances: StateMap<Address, A, S>,
}

impl<A: IsTokenAmount, S: HasStateApi> TokenBalances<A, S> {
    pub fn new(state_builder: &mut StateBuilder<S>) -> Self {
        Self {
            balances: state_builder.new_map(),
        }
    }

    pub fn balance_of(&self, address: &Address) -> A {
        self.balances.get(address).map(|a| *a).unwrap_or(A::zero())
    }

    pub fn sub(&mut self, address: &Address, amount: A) -> TokenStateResult<&mut Self> {
        let amount = self
            .balances
            .entry(*address)
            .occupied_or(TokenStateError::AmountTooLarge)?
            .try_modify(|e| {
                e.checked_sub_assign(amount).ok_or(TokenStateError::AmountTooLarge).copied()
            })?;

        if A::zero().eq(&amount) {
            self.balances.remove(address);
        }

        Ok(self)
    }

    pub fn add(&mut self, address: &Address, amount: A) -> TokenStateResult<&mut Self> {
        self.balances.entry(*address).or_insert_with(|| A::zero()).try_modify(|e| {
            e.checked_add_assign(amount).ok_or(TokenStateError::AmountTooLarge).map(|_| ())
        })?;

        Ok(self)
    }
}

#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
pub struct TokenState<A, S> {
    balances: TokenBalances<A, S>,
    metadata_url: MetadataUrl,
}

impl<A: IsTokenAmount, S: HasStateApi> TokenState<A, S> {
    pub fn new(metadata_url: MetadataUrl, state_builder: &mut StateBuilder<S>) -> Self {
        Self {
            balances: TokenBalances::new(state_builder),
            metadata_url,
        }
    }

    pub fn metadata_url(&self) -> &MetadataUrl {
        &self.metadata_url
    }
}

#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
pub struct TokensState<T, A, S> {
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

    /// Subtracts the given amount from self. Returns None if the amount is too large.
    fn checked_sub_assign(&mut self, other: Self) -> Option<&mut Self> {
        if other.le(&self) {
            self.sub_assign(other);
            Some(self)
        } else {
            None
        }
    }

    /// Adds the given amount to self. Returns None if the amount is too large.
    fn checked_add_assign(&mut self, other: Self) -> Option<&mut Self> {
        if other.le(&Self::max_value().sub(*self)) {
            self.add_assign(other);
            Some(self)
        } else {
            None
        }
    }
}

pub enum TokenStateError {
    TokenAlreadyExists,
    TokenDoesNotExist,
    AmountTooLarge,
}

pub type TokenStateResult<T> = Result<T, TokenStateError>;

impl<T: IsTokenId, A: IsTokenAmount, S: HasStateApi> TokensState<T, A, S> {
    pub fn new(state_builder: &mut StateBuilder<S>) -> Self {
        TokensState {
            tokens: state_builder.new_map(),
        }
    }

    /// Returns true if the token with the given id exists.
    pub fn ensure_token_exists(&self, token_id: &T) -> TokenStateResult<()> {
        self.tokens.get(token_id).ok_or(TokenStateError::TokenDoesNotExist).map(|_| ())
    }

    /// Returns the metadata url of the token with the given id.
    pub fn token_metadata_url(&self, token_id: &T) -> TokenStateResult<MetadataUrl> {
        self.tokens
            .get(token_id)
            .map(|token| token.metadata_url().to_owned())
            .ok_or(TokenStateError::TokenDoesNotExist)
    }

    /// Returns the balance of the given address for the token with the given id.
    pub fn balance_of(&self, token_id: &T, address: &Address) -> TokenStateResult<A> {
        self.tokens
            .get(token_id)
            .map(|token| token.balances.balance_of(address))
            .ok_or(TokenStateError::TokenDoesNotExist)
    }

    /// Adds the token with the given id to the state. Returns an error if the token already exists.
    /// ## Arguments
    /// * `token_id` - The id of the token to add.
    /// * `metadata_url` - The metadata url of the token to add.
    /// * `initial_balances` - The initial balances of the token to add.
    pub fn add_token(
        &mut self,
        token_id: T,
        metadata_url: MetadataUrl,
        initial_balances: Vec<(Address, A)>,
        state_builder: &mut StateBuilder<S>,
    ) -> TokenStateResult<()> {
        self.tokens
            .entry(token_id)
            .vacant_or(TokenStateError::TokenAlreadyExists)?
            .insert(TokenState::new(metadata_url, state_builder))
            .try_modify(|e| {
                initial_balances
                    .iter()
                    .try_for_each(|(address, amount)| e.balances.add(address, *amount).map(|_| ()))
            })?;

        Ok(())
    }

    /// Burns the given amount of the token with the given id from the given address.
    pub fn burn_token(&mut self, token_id: T, owner: Address, amount: A) -> TokenStateResult<()> {
        self.tokens
            .entry(token_id)
            .occupied_or(TokenStateError::TokenDoesNotExist)?
            .try_modify(|token| token.balances.sub(&owner, amount).map(|_| ()))
    }

    /// Transfers the given amount of the token with the given id from one address to another.
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
            .try_modify(|token| token.balances.sub(&from, amount)?.add(&to, amount).map(|_| ()))
    }
}

pub trait HasTokensState<T, A, S> {
    fn tokens_state(&self) -> &TokensState<T, A, S>;
    fn tokens_state_mut(&mut self) -> &mut TokensState<T, A, S>;
}
