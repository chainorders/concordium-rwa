use concordium_std::*;

use super::types::TokenId;

#[derive(Serialize)]
pub struct TokenState {
    owner:        Address,
    metadata_url: MetadataUrl,
    is_paused:    bool,
}

impl TokenState {
    fn new(owner: Address, metadata_url: MetadataUrl) -> TokenState {
        TokenState {
            owner,
            metadata_url,
            is_paused: false,
        }
    }
}

#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
struct AddressState<S = StateApi> {
    operators:     StateSet<Address, S>,
    frozen_tokens: StateSet<TokenId, S>,
}

impl AddressState {
    pub fn new(state_builder: &mut StateBuilder) -> AddressState {
        AddressState {
            operators:     state_builder.new_set(),
            frozen_tokens: state_builder.new_set(),
        }
    }
}

#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
pub struct State<S = StateApi> {
    identity_registry: ContractAddress,
    compliance:        ContractAddress,
    sponsors:          StateSet<ContractAddress, S>,
    tokens:            StateMap<TokenId, TokenState, S>,
    addresses:         StateMap<Address, AddressState<S>, S>,
    token_id:          TokenId,
    agents:            StateSet<Address, S>,
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
            identity_registry,
            compliance,
            sponsors: state_builder.new_set(),
            tokens: state_builder.new_map(),
            token_id: 0.into(),
            agents: state_builder.new_set(),
            addresses: state_builder.new_map(),
        };

        for agent in agents {
            state.add_agent(agent);
        }

        for sponsor in sponsors {
            state.sponsors.insert(sponsor);
        }

        state
    }

    pub fn sponsors(&self) -> Vec<ContractAddress> { self.sponsors.iter().map(|s| *s).collect() }

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

    pub fn is_operator(&self, operator: &Address, address: &Address) -> bool {
        self.addresses.get(address).map(|s| s.operators.contains(operator)).unwrap_or(false)
    }

    pub fn set_operator(
        &mut self,
        owner: Address,
        operator: Address,
        is_set: bool,
        state_builder: &mut StateBuilder,
    ) {
        self.addresses.entry(owner).or_insert(AddressState::new(state_builder)).modify(|s| {
            if is_set {
                s.operators.insert(operator)
            } else {
                s.operators.remove(&operator)
            }
        });
    }

    pub fn get_identity_registry(&self) -> ContractAddress { self.identity_registry }

    pub fn get_compliance(&self) -> ContractAddress { self.compliance }

    fn get_token_id(&self) -> TokenId { self.token_id }

    pub fn has_balance(&self, token_id: &TokenId, address: &Address) -> bool {
        match self.tokens.get(token_id) {
            Some(entry) => entry.owner.eq(address),
            None => false,
        }
    }

    fn increment_token_id(&mut self) { self.token_id.0 += 1; }

    fn add_token(
        &mut self,
        owner: Address,
        token_id: TokenId,
        metadata_url: impl Into<MetadataUrl>,
    ) {
        self.tokens.entry(token_id).or_insert_with(|| TokenState::new(owner, metadata_url.into()));
    }

    pub fn mint(&mut self, owner: Address, metadata_url: impl Into<MetadataUrl>) -> TokenId {
        let token_id = self.get_token_id();
        self.add_token(owner, token_id, metadata_url);
        self.increment_token_id();

        token_id
    }

    pub fn token_exists(&self, token_id: &TokenId) -> bool { self.tokens.get(token_id).is_some() }

    pub fn transfer(&mut self, token_id: TokenId, to: Address) {
        self.tokens.entry(token_id).and_modify(|e| e.owner = to);
    }

    pub fn is_agent(&self, address: &Address) -> bool { self.agents.contains(address) }

    pub fn add_agent(&mut self, address: Address) { self.agents.insert(address); }

    pub fn remove_agent(&mut self, address: &Address) { self.agents.remove(address); }

    pub fn get_agents(&self) -> Vec<Address> { self.agents.iter().map(|a| *a).collect() }

    pub fn token_metadata(&self, token_id: &TokenId) -> Option<MetadataUrl> {
        self.tokens.get(token_id).map(|t| t.metadata_url.clone())
    }
}
