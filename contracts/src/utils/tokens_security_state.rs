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

#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
pub struct TokensSecurityState<T, S> {
    tokens_state: StateMap<T, TokenSecurityState, S>,
}

impl<T: IsTokenId, S: HasStateApi> TokensSecurityState<T, S> {
    pub fn new(state_builder: &mut StateBuilder<S>) -> Self {
        Self {
            tokens_state: state_builder.new_map(),
        }
    }

    /// Returns true if the token with the given id is paused.
    pub fn is_paused(&self, token_id: &T) -> bool {
        self.tokens_state.get(token_id).map(|token| token.is_paused).unwrap_or(false)
    }

    /// Pauses the token with the given id.
    pub fn pause(&mut self, token_id: T) {
        self.tokens_state
            .entry(token_id)
            .or_insert_with(|| TokenSecurityState::new())
            .modify(|token| token.is_paused = true)
    }

    /// Unpauses the token with the given id.
    pub fn un_pause(&mut self, token_id: T) {
        self.tokens_state.entry(token_id).and_modify(|token| token.is_paused = false);
    }
}

pub trait HasTokensSecurityState<T, S> {
    fn tokens_security_state(&self) -> &TokensSecurityState<T, S>;
    fn tokens_security_state_mut(&mut self) -> &mut TokensSecurityState<T, S>;
}
