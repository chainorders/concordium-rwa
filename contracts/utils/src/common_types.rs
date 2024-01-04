use concordium_std::*;

pub type Agent = Address;
pub type AttributeTag = u8;
pub type AttributeValue = Vec<u8>;
pub type Issuer = ContractAddress;

#[derive(Serialize, SchemaType)]
pub struct Identity {
    pub attributes:  Vec<(AttributeTag, AttributeValue)>,
    pub credentials: Vec<(Issuer, PublicKeyEd25519)>,
}