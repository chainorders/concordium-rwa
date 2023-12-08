use crate::utils::{agent_state::{AgentState, HasAgentState}, operators_state::{OperatorsState, HasOperatorsState}, tokens_state::{TokensState, HasTokensState}};

use super::types::{TokenId, TokenAmount};
use concordium_std::*;

#[derive(Serialize)]
pub struct TokenState {
    is_paused: bool,
}

impl TokenState {
    fn new() -> TokenState {
        TokenState {
            is_paused: false,
        }
    }
}

#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
struct AddressState<S = StateApi> {
    frozen_tokens: StateSet<TokenId, S>,
}

impl AddressState {
    pub fn new(state_builder: &mut StateBuilder) -> AddressState {
        AddressState {
            frozen_tokens: state_builder.new_set(),
        }
    }
}

#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
pub struct State<S = StateApi> {
    agent_state: AgentState<S>,
    operators_state: OperatorsState<S>,
    tokens_state: TokensState<TokenId, TokenAmount, S>,

    sponsors: StateSet<ContractAddress, S>,
    identity_registry: ContractAddress,
    compliance: ContractAddress,
    tokens: StateMap<TokenId, TokenState, S>,
    addresses: StateMap<Address, AddressState<S>, S>,
    token_id: TokenId,
}

impl State {
    pub fn new(
        identity_registry: ContractAddress,
        compliance: ContractAddress,
        sponsors: Vec<ContractAddress>,
        agents: Vec<Address>,
        state_builder: &mut StateBuilder,
    ) -> Self {
        let mut state = State {
            agent_state: AgentState::new(agents, state_builder),
            operators_state: OperatorsState::new(state_builder),
            tokens_state: TokensState::new(state_builder), 

            identity_registry,
            compliance,
            sponsors: state_builder.new_set(),
            tokens: state_builder.new_map(),
            token_id: 0.into(),
            addresses: state_builder.new_map(),
        };

        for sponsor in sponsors {
            state.sponsors.insert(sponsor);
        }

        state
    }

    pub fn sponsors(&self) -> Vec<ContractAddress> {
        self.sponsors.iter().map(|s| *s).collect()
    }

    pub fn set_pause(&mut self, token_id: TokenId, pause: bool) {
        self.tokens.entry(token_id).and_modify(|t| t.is_paused = pause);
    }

    pub fn is_paused(&self, token_id: &TokenId) -> bool {
        self.tokens.get(token_id).map(|t| t.is_paused).unwrap_or(false)
    }

    pub fn is_frozen(&self, address: &Address, token_id: &TokenId) -> bool {
        self.addresses.get(address).map(|s| s.frozen_tokens.contains(token_id)).unwrap_or(false)
    }

    pub fn freeze(
        &mut self,
        address: Address,
        token_id: TokenId,
        state_builder: &mut StateBuilder,
    ) {
        self.addresses
            .entry(address)
            .or_insert(AddressState::new(state_builder))
            .modify(|f| f.frozen_tokens.insert(token_id));
    }

    pub fn un_freeze(&mut self, address: Address, token_id: concordium_cis2::TokenIdU8) {
        self.addresses.entry(address).and_modify(|f| {
            f.frozen_tokens.remove(&token_id);
        });
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

impl HasAgentState for State {
    fn agent_state(&self) -> &AgentState {
        &self.agent_state
    }

    fn agent_state_mut(&mut self) -> &mut AgentState {
        &mut self.agent_state
    }
}

impl HasOperatorsState for State {
    fn operators_state(&self) -> &OperatorsState {
        &self.operators_state
    }

    fn operators_state_mut(&mut self) -> &mut OperatorsState {
        &mut self.operators_state
    }
}

impl HasTokensState<TokenId, TokenAmount> for State {
    fn tokens_state(&self) -> &TokensState<TokenId, TokenAmount> {
        &self.tokens_state
    }

    fn tokens_state_mut(&mut self) -> &mut TokensState<TokenId, TokenAmount> {
        &mut self.tokens_state
    }
}