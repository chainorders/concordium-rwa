use concordium_std::{Address, ContractAddress};

pub struct IdentityRegistryClient {
    identity_registry: ContractAddress,
}

pub enum IdentityRegistryError {}

impl IdentityRegistryClient {
    pub fn new(identity_registry: ContractAddress) -> Self {
        IdentityRegistryClient {
            identity_registry,
        }
    }

    pub fn is_verified(&self, address: Address) -> Result<bool, IdentityRegistryError> {
        // todo: implement using real function

        Ok(true)
    }
}
