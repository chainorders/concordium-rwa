use concordium_std::*;

pub type Identity = Vec<(AttributeTag, AttributeValue)>;
pub type Issuer = ContractAddress;

#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
pub struct State<S = StateApi> {
    identities: StateMap<AccountAddress, StateMap<AttributeTag, AttributeValue, S>, S>,
    issuers: StateSet<Issuer, S>,
}

impl<S: HasStateApi> State<S> {
    /// Creates a new state.
    pub fn new(state_builder: &mut StateBuilder<S>) -> Self {
        State {
            identities: state_builder.new_map(),
            issuers: state_builder.new_set(),
        }
    }

    /// Registers the given identity for the given address.
    pub fn register_identity(
        &mut self,
        address: AccountAddress,
        identity: Identity,
        state_builder: &mut StateBuilder<S>,
    ) {
        let mut identity_map = state_builder.new_map();
        for (tag, val) in identity {
            identity_map.insert(tag, val);
        }
        self.identities.insert(address, identity_map);
    }

    /// Removes the identity of the given address if it exists.
    pub fn remove_identity(&mut self, address: &AccountAddress) {
        self.identities.remove(address)
    }

    /// Returns the identity of the given address if it exists.
    pub fn get_identity(&self, address: &AccountAddress) -> Option<Identity> {
        self.identities
            .get(address)
            .map(|identity_map| identity_map.iter().map(|i| (*i.0, *i.1)).collect())
    }

    /// Returns true if the given issuer is registered.
    pub fn is_issuer(&self, issuer: &Issuer) -> bool {
        self.issuers.contains(issuer)
    }

    /// Registers the given issuer
    pub fn register_issuer(&mut self, issuer: Issuer) {
        self.issuers.insert(issuer);
    }

    /// Removes the given issuer
    pub fn remove_issuer(&mut self, issuer: &Issuer) {
        self.issuers.remove(issuer);
    }

    /// Returns registered issuers
    pub fn get_issuers(&self) -> Vec<Issuer> {
        self.issuers.iter().map(|i| *i).collect()
    }
}
