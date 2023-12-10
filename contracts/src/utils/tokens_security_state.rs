use concordium_cis2::IsTokenId;
use concordium_std::*;

#[derive(Serial, Deserial)]
pub struct TokenSecurityState {
    is_paused: bool,
}

impl TokenSecurityState {
    pub fn new() -> Self {
        Self {
            is_paused: false,
        }
    }
}

/// `TokensSecurityState` is a struct that holds the security state of tokens.
///
/// # Type Parameters
///
/// * `T` - The type of the token ID. Must implement `IsTokenId`.
/// * `S` - The type of the state API. Must implement `HasStateApi`.
///
/// # Fields
///
/// * `tokens_state` - A `StateMap` that maps token IDs to their respective `TokenSecurityState`.
#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
pub struct TokensSecurityState<T, S> {
    tokens_state: StateMap<T, TokenSecurityState, S>,
}

impl<T: IsTokenId, S: HasStateApi> TokensSecurityState<T, S> {
    /// Creates a new `TokensSecurityState` with empty tokens state.
    ///
    /// # Arguments
    ///
    /// * `state_builder` - A mutable reference to the state builder.
    pub fn new(state_builder: &mut StateBuilder<S>) -> Self {
        Self {
            tokens_state: state_builder.new_map(),
        }
    }

    /// Checks if the token with the given ID is paused.
    ///
    /// # Arguments
    ///
    /// * `token_id` - The ID of the token to check.
    ///
    /// # Returns
    ///
    /// Returns `true` if the token is paused, `false` otherwise. If the token does not exist, returns `false`.
    pub fn is_paused(&self, token_id: &T) -> bool {
        self.tokens_state.get(token_id).map(|token| token.is_paused).unwrap_or(false)
    }

    /// Pauses the token with the given ID.
    ///
    /// # Arguments
    ///
    /// * `token_id` - The ID of the token to pause.
    ///
    /// If the token does not exist, it is created and then paused.
    pub fn pause(&mut self, token_id: T) {
        self.tokens_state
            .entry(token_id)
            .or_insert_with(|| TokenSecurityState::new())
            .modify(|token| token.is_paused = true)
    }

    /// Unpauses the token with the given ID.
    ///
    /// # Arguments
    ///
    /// * `token_id` - The ID of the token to unpause.
    ///
    /// If the token does not exist, nothing happens.
    pub fn un_pause(&mut self, token_id: T) {
        self.tokens_state.entry(token_id).and_modify(|token| token.is_paused = false);
    }
}

pub trait HasTokensSecurityState<T, S> {
    fn tokens_security_state(&self) -> &TokensSecurityState<T, S>;
    fn tokens_security_state_mut(&mut self) -> &mut TokensSecurityState<T, S>;
}
