use concordium_cis2::*;
use concordium_std::{ops, *};

#[derive(Serial, Deserial)]
pub struct TokenState {
    metadata_url: MetadataUrl,
}

impl TokenState {
    pub fn new(metadata_url: MetadataUrl) -> Self {
        Self {
            metadata_url,
        }
    }

    pub fn metadata_url(&self) -> &MetadataUrl {
        &self.metadata_url
    }
}

#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
pub struct TokensState<T, S> {
    tokens: StateMap<T, TokenState, S>,
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
    fn checked_add_assign(&mut self, other: Self) -> Option<()> {
        if other.le(&Self::max_value().sub(*self)) {
            self.add_assign(other);
            Some(())
        } else {
            None
        }
    }
}

pub enum TokenStateError {
    TokenAlreadyExists,
    TokenDoesNotExist,
}

pub type TokenStateResult<T> = Result<T, TokenStateError>;

impl<T: IsTokenId, S: HasStateApi> TokensState<T, S> {
    pub fn new(state_builder: &mut StateBuilder<S>) -> Self {
        TokensState {
            tokens: state_builder.new_map(),
        }
    }

    /// Returns true if the token with the given id exists.
    pub fn ensure_token_exists(&self, token_id: &T) -> TokenStateResult<()> {
        self.tokens.get(token_id).ok_or(TokenStateError::TokenDoesNotExist)?;
        Ok(())
    }

    /// Returns the metadata url of the token with the given id.
    pub fn token_metadata_url(&self, token_id: &T) -> TokenStateResult<MetadataUrl> {
        self.tokens
            .get(token_id)
            .map(|token| token.metadata_url().to_owned())
            .ok_or(TokenStateError::TokenDoesNotExist)
    }

    /// Adds the token with the given id to the state. Returns an error if the token already exists.
    /// ## Arguments
    /// * `token_id` - The id of the token to add.
    /// * `metadata_url` - The metadata url of the token to add.
    /// * `initial_balances` - The initial balances of the token to add.
    pub fn add_token(&mut self, token_id: T, metadata_url: MetadataUrl) -> TokenStateResult<()> {
        self.tokens
            .entry(token_id)
            .vacant_or(TokenStateError::TokenAlreadyExists)?
            .insert(TokenState::new(metadata_url));

        Ok(())
    }
}

pub trait HasTokensState<T, A, S> {
    fn tokens_state(&self) -> &TokensState<T, S>;
    fn tokens_state_mut(&mut self) -> &mut TokensState<T, S>;
}
