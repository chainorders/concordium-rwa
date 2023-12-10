use crate::utils::{
    agents_state::{AgentsState, HasAgentsState},
    holders_security_state::{AddressesSecurityState, HasHoldersSecurityState, RecoveryError},
    holders_state::{HasHoldersState, HolderStateError, HoldersState},
    tokens_security_state::{HasTokensSecurityState, TokensSecurityState},
    tokens_state::{HasTokensState, TokenStateError, TokensState},
};

use super::types::{TokenAmount, TokenId};
use concordium_std::{ops::Sub, *};

pub enum StateError {
    TokenStateError(TokenStateError),
    RecoveryError(RecoveryError),
    HolderStateError(HolderStateError),
}
impl From<TokenStateError> for StateError {
    fn from(e: TokenStateError) -> Self {
        StateError::TokenStateError(e)
    }
}

impl From<RecoveryError> for StateError {
    fn from(e: RecoveryError) -> Self {
        StateError::RecoveryError(e)
    }
}

impl From<HolderStateError> for StateError {
    fn from(e: HolderStateError) -> Self {
        StateError::HolderStateError(e)
    }
}

#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
pub struct State<S = StateApi> {
    /// Agents State
    agents_state: AgentsState<S>,
    /// CIS2 token state
    tokens_state: TokensState<TokenId, S>,
    /// Token Security State
    tokens_security_state: TokensSecurityState<TokenId, S>,
    /// Address Security State
    holders_security_state: AddressesSecurityState<TokenId, TokenAmount, S>,
    /// Token Addresses State
    holders_state: HoldersState<TokenId, TokenAmount, S>,

    sponsors: StateSet<ContractAddress, S>,
    token_id: TokenId,
}

impl<S: HasStateApi> State<S> {
    pub fn new(
        identity_registry: ContractAddress,
        compliance: ContractAddress,
        sponsors: Vec<ContractAddress>,
        agents: Vec<Address>,
        state_builder: &mut StateBuilder<S>,
    ) -> Self {
        let mut state = State {
            agents_state: AgentsState::new(agents, state_builder),
            tokens_state: TokensState::new(state_builder),
            tokens_security_state: TokensSecurityState::new(state_builder),
            holders_security_state: AddressesSecurityState::new(
                identity_registry,
                compliance,
                state_builder,
            ),
            holders_state: HoldersState::new(state_builder),
            sponsors: state_builder.new_set(),
            token_id: 0.into(),
        };

        for sponsor in sponsors {
            state.sponsors.insert(sponsor);
        }

        state
    }

    pub fn sponsors(&self) -> Vec<ContractAddress> {
        self.sponsors.iter().map(|s| *s).collect()
    }

    pub fn is_sponsor(&self, address: &Address) -> bool {
        match address {
            Address::Account(_) => false,
            Address::Contract(contract) => self.sponsors.contains(contract),
        }
    }

    pub fn get_token_id(&self) -> TokenId {
        self.token_id
    }

    pub fn increment_token_id(&mut self) {
        self.token_id.0 += 1;
    }

    pub fn recover(&mut self, address: Address, new_address: Address) -> Result<(), StateError> {
        self.holders_state_mut().recover(address, new_address)?;
        self.holders_security_state_mut().recover(address, new_address)?;
        Ok(())
    }

    /// Mints a new token with the given metadata url and given balances. Returns the token id.
    pub fn mint_token(
        &mut self,
        metadata_url: MetadataUrl,
        balances: Vec<(Address, TokenAmount)>,
        state_builder: &mut StateBuilder<S>,
    ) -> Result<TokenId, StateError> {
        let token_id = self.get_token_id();
        self.tokens_state_mut().add_token(token_id, metadata_url)?;
        for (address, amount) in balances {
            self.holders_state_mut().add_balance(address, token_id, amount, state_builder)?;
        }
        self.increment_token_id();

        Ok(token_id)
    }

    /// Returns the unfrozen balance of the given token for the given addresses.
    pub fn unfrozen_balance_of(&self, address: &Address, token_id: &TokenId) -> TokenAmount {
        let balance = self.holders_state().balance_of(address, token_id);
        let frozen_balance = self.holders_security_state().balance_of_frozen(address, token_id);
        balance.sub(frozen_balance)
    }
}

impl<S> HasAgentsState<S> for State<S> {
    fn agent_state(&self) -> &AgentsState<S> {
        &self.agents_state
    }

    fn agent_state_mut(&mut self) -> &mut AgentsState<S> {
        &mut self.agents_state
    }
}

impl<S> HasTokensState<TokenId, TokenAmount, S> for State<S> {
    fn tokens_state(&self) -> &TokensState<TokenId, S> {
        &self.tokens_state
    }

    fn tokens_state_mut(&mut self) -> &mut TokensState<TokenId, S> {
        &mut self.tokens_state
    }
}

impl<S> HasTokensSecurityState<TokenId, S> for State<S> {
    fn tokens_security_state(&self) -> &TokensSecurityState<TokenId, S> {
        &self.tokens_security_state
    }

    fn tokens_security_state_mut(&mut self) -> &mut TokensSecurityState<TokenId, S> {
        &mut self.tokens_security_state
    }
}

impl<S> HasHoldersState<TokenId, TokenAmount, S> for State<S> {
    fn holders_state(&self) -> &HoldersState<TokenId, TokenAmount, S> {
        &self.holders_state
    }

    fn holders_state_mut(&mut self) -> &mut HoldersState<TokenId, TokenAmount, S> {
        &mut self.holders_state
    }
}

impl<S> HasHoldersSecurityState<TokenId, TokenAmount, S> for State<S> {
    fn holders_security_state(&self) -> &AddressesSecurityState<TokenId, TokenAmount, S> {
        &self.holders_security_state
    }

    fn holders_security_state_mut(
        &mut self,
    ) -> &mut AddressesSecurityState<TokenId, TokenAmount, S> {
        &mut self.holders_security_state
    }
}
