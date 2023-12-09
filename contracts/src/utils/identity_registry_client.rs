use concordium_std::{Address, ContractAddress};

pub struct IdentityRegistryClient {}

pub enum IdentityRegistryError {}

impl IdentityRegistryClient {
    pub fn new(_identity_registry: ContractAddress) -> Self {
        IdentityRegistryClient {}
    }

    pub fn is_verified(&self, _address: Address) -> Result<bool, IdentityRegistryError> {
        // todo: implement using real function

        Ok(true)
    }
}
