use concordium_std::*;

use crate::utils::{agents_state::IsAgentsState, clients::contract_client::IContractState};

use super::types::{AttributeTag, AttributeValue, Identity, Issuer};

#[derive(Serial, DeserialWithState, Deletable)]
#[concordium(state_parameter = "S")]
pub struct IdentityState<S> {
    attributes:  StateMap<AttributeTag, AttributeValue, S>,
    credentials: StateMap<Issuer, PublicKeyEd25519, S>,
}

impl<S: HasStateApi> IdentityState<S> {
    pub fn to_identity(&self) -> Identity {
        Identity {
            attributes:  self.attributes.iter().map(|i| (*i.0, *i.1)).collect(),
            credentials: self.credentials.iter().map(|i| (*i.0, *i.1)).collect(),
        }
    }

    pub fn credentials(&self) -> Vec<(Issuer, PublicKeyEd25519)> {
        self.credentials.iter().map(|i| (*i.0, *i.1)).collect()
    }

    pub fn key(&self, issuer: &Issuer) -> Option<PublicKeyEd25519> {
        self.credentials.get(issuer).map(|i| *i)
    }
}

impl<S: HasStateApi> PartialEq for IdentityState<S> {
    fn eq(&self, other: &Self) -> bool {
        for (tag, val) in self.attributes.iter() {
            let is_attr_same =
                other.attributes.get(&tag).map(|val2| val.eq(&*val2)).unwrap_or(false);
            if !is_attr_same {
                return false;
            }
        }

        for (issuer, key) in self.credentials.iter() {
            let is_cred_same =
                other.credentials.get(&issuer).map(|key2| key.eq(&*key2)).unwrap_or(false);
            if !is_cred_same {
                return false;
            }
        }

        true
    }
}

impl<S: HasStateApi> IdentityState<S> {
    pub fn new(identity: Identity, state_builder: &mut StateBuilder<S>) -> Self {
        let mut ret = Self {
            attributes:  state_builder.new_map(),
            credentials: state_builder.new_map(),
        };

        for (tag, value) in identity.attributes {
            ret.attributes.insert(tag, value);
        }

        for (issuer, key) in identity.credentials {
            ret.credentials.insert(issuer, key);
        }

        ret
    }
}

#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
pub struct State<S = StateApi> {
    pub identities: StateMap<Address, IdentityState<S>, S>,
    pub issuers:    StateSet<Issuer, S>,
    pub agents:     StateSet<Address, S>,
}

impl<S: HasStateApi> State<S> {
    /// Creates a new state.
    pub fn new(agents: Vec<Address>, state_builder: &mut StateBuilder<S>) -> Self {
        let mut state = State {
            identities: state_builder.new_map(),
            issuers:    state_builder.new_set(),
            agents:     state_builder.new_set(),
        };

        for agent in agents {
            state.agents.insert(agent);
        }

        state
    }
}

impl IContractState for State {}
impl IsAgentsState<StateApi> for State {
    fn agents(&self) -> &StateSet<Address, StateApi> { &self.agents }

    fn agents_mut(&mut self) -> &mut StateSet<Address, StateApi> { &mut self.agents }
}
