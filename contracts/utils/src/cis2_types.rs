use concordium_cis2::{TokenAmountU8 as Cis2TokenAmountU8, TokenIdU8};

use super::{holders_state::IsTokenId, tokens_state::IsTokenAmount};

pub type TokenId = TokenIdU8;
pub type NftTokenAmount = Cis2TokenAmountU8;

/// Trait implementation for a NFT token amount.
impl IsTokenAmount for NftTokenAmount {
    fn zero() -> Self {
        Cis2TokenAmountU8(0)
    }

    fn max_value() -> Self {
        Cis2TokenAmountU8(1)
    }
}

impl IsTokenId for TokenId {}
