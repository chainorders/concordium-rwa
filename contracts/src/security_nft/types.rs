use concordium_cis2::{TokenAmountU8, TokenIdU8};
use concordium_std::*;

use super::error::Error;

pub type TokenId = TokenIdU8;
pub type TokenAmount = TokenAmountU8;
pub type ContractResult<R> = Result<R, Error>;
pub const TOKEN_AMOUNT_1: TokenAmount = TokenAmountU8(1);
pub const TOKEN_AMOUNT_0: TokenAmount = TokenAmountU8(0);

#[derive(SchemaType, Serial, Clone, Deserial)]
pub struct ContractMetadataUrl {
    pub url:  String,
    pub hash: Option<String>,
}

impl From<ContractMetadataUrl> for MetadataUrl {
    fn from(val: ContractMetadataUrl) -> Self {
        MetadataUrl {
            url:  val.url,
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
