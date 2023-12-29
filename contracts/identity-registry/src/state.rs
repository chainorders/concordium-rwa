use concordium_std::*;

use concordium_rwa_utils::{agents_state::IsAgentsState, clients::contract_client::IContractState};

use super::types::{AttributeTag, AttributeValue, Identity, Issuer};
pub type CredentialId = PublicKeyEd25519;

#[derive(Serial, DeserialWithState, Deletable)]
#[concordium(state_parameter = "S")]
/// Represents the state of an identity in the identity registry.
pub struct IdentityState<S> {
    attributes:  StateMap<AttributeTag, AttributeValue, S>,
    credentials: StateMap<Issuer, CredentialId, S>,
}

/// Implementation of the `IdentityState` struct.
impl<S: HasStateApi> IdentityState<S> {
    /// Converts the `IdentityState` into an `Identity` struct.
    ///
    /// # Returns
    ///
    /// An `Identity` struct containing the attributes and credentials of the
    /// `IdentityState`.
    pub fn to_identity(&self) -> Identity {
        Identity {
            attributes:  self.attributes.iter().map(|i| (*i.0, *i.1)).collect(),
            credentials: self.credentials.iter().map(|i| (*i.0, *i.1)).collect(),
        }
    }

    /// Retrieves the list of credentials stored in the `IdentityState`.
    ///
    /// # Returns
    ///
    /// A vector of tuples, where each tuple contains an `Issuer` and a
    /// `CredentialId`.
    pub fn credentials(&self) -> Vec<(Issuer, CredentialId)> {
        self.credentials.iter().map(|i| (*i.0, *i.1)).collect()
    }

    /// Retrieves the `CredentialId` associated with the specified `Issuer`.
    ///
    /// # Arguments
    ///
    /// * `issuer` - The `Issuer` for which to retrieve the `CredentialId`.
    ///
    /// # Returns
    ///
    /// An `Option` containing the `CredentialId` if it exists, or `None` if it
    /// does not.
    pub fn credential_id(&self, issuer: &Issuer) -> Option<CredentialId> {
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
