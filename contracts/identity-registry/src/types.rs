use concordium_rwa_utils::common_types;
use concordium_std::{ContractAddress, PublicKeyEd25519, SchemaType, Serialize};

use super::error::Error;

pub type ContractResult<T> = Result<T, Error>;
pub type AttributeTag = common_types::AttributeTag;
pub type AttributeValue = common_types::AttributeValue;

#[derive(Serialize, SchemaType)]
pub struct Identity {
    pub attributes:  Vec<(AttributeTag, AttributeValue)>,
    pub credentials: Vec<(Issuer, PublicKeyEd25519)>,
}

pub type Issuer = ContractAddress;
