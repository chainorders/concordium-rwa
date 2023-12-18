use concordium_std::{ContractAddress, PublicKeyEd25519, SchemaType, Serialize};

use super::error::Error;

pub type ContractResult<T> = Result<T, Error>;
pub type AttributeTag = u8;
pub type AttributeValue = [u8; 32];

#[derive(Serialize, SchemaType)]
pub struct Identity {
    pub attributes: Vec<(AttributeTag, AttributeValue)>,
    pub credentials: Vec<(Issuer, PublicKeyEd25519)>,
}

pub type Issuer = ContractAddress;
