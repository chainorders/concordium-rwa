use crate::utils::{
    agents_state::{AgentsState, HasAgentsState},
    operators_state::{HasOperatorsState, OperatorsState},
    tokens_security_state::{HasTokensSecurityState, TokensSecurityState},
    tokens_state::{HasTokensState, TokensState},
};

use super::types::{TokenAmount, TokenId};
use concordium_std::*;

#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
pub struct State<S = StateApi> {
    /// Agents State
    agents_state: AgentsState<S>,
    /// CIS2 Address State
    operators_state: OperatorsState<S>,
    /// CIS2 token state
    tokens_state: TokensState<TokenId, TokenAmount, S>,
    /// Token Security State
    tokens_security_state: TokensSecurityState<TokenId, TokenAmount, S>,

    sponsors: StateSet<ContractAddress, S>,
    identity_registry: ContractAddress,
    compliance: ContractAddress,
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
            operators_state: OperatorsState::new(state_builder),
            tokens_state: TokensState::new(state_builder),
            tokens_security_state: TokensSecurityState::new(state_builder),

            identity_registry,
            compliance,
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

    pub fn get_identity_registry(&self) -> ContractAddress {
        self.identity_registry
    }

    pub fn get_compliance(&self) -> ContractAddress {
        self.compliance
    }

    pub fn get_token_id(&self) -> TokenId {
        self.token_id
    }

    pub fn increment_token_id(&mut self) {
        self.token_id.0 += 1;
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

impl<S> HasOperatorsState<S> for State<S> {
    fn operators_state(&self) -> &OperatorsState<S> {
        &self.operators_state
    }

    fn operators_state_mut(&mut self) -> &mut OperatorsState<S> {
        &mut self.operators_state
    }
}

impl<S> HasTokensState<TokenId, TokenAmount, S> for State<S> {
    fn tokens_state(&self) -> &TokensState<TokenId, TokenAmount, S> {
        &self.tokens_state
    }

    fn tokens_state_mut(&mut self) -> &mut TokensState<TokenId, TokenAmount, S> {
        &mut self.tokens_state
    }
}

impl<S> HasTokensSecurityState<TokenId, TokenAmount, S> for State<S> {
    fn security_tokens_state(&self) -> &TokensSecurityState<TokenId, TokenAmount, S> {
        &self.tokens_security_state
    }

    fn security_tokens_state_mut(&mut self) -> &mut TokensSecurityState<TokenId, TokenAmount, S> {
        &mut self.tokens_security_state
    }
}
