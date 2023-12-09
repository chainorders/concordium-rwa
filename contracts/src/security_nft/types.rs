use concordium_cis2::{TokenAmountU8, TokenIdU8};
use concordium_std::*;

use crate::utils::tokens_state::IsTokenAmount;

use super::error::Error;

pub type TokenId = TokenIdU8;
pub type TokenAmount = TokenAmountU8;
pub type ContractResult<R> = Result<R, Error>;

#[derive(SchemaType, Serial, Clone, Deserial)]
pub struct ContractMetadataUrl {
    pub url: String,
    pub hash: Option<String>,
}

impl From<ContractMetadataUrl> for MetadataUrl {
    fn from(val: ContractMetadataUrl) -> Self {
        MetadataUrl {
            url: val.url,
            hash: {
                if let Some(hash) = val.hash {
                    let mut hash_bytes = [0u8; 32];
                    match hex::decode_to_slice(hash, &mut hash_bytes) {
                        Ok(_) => Some(hash_bytes),
                        Err(_) => None,
                    }
                } else {
                    None
                }
            },
        }
    }
}

impl IsTokenAmount for TokenAmount {
    fn zero() -> Self {
        TokenAmountU8(0)
    }

    fn max_value() -> Self {
        // Max Token Amount for NFTs is 1
        TokenAmountU8(1)
    }
}
