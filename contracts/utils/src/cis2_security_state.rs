use concordium_std::HasStateApi;

use super::{tokens_security_state::ITokensSecurityState, holders_state::IsTokenId, tokens_state::IsTokenAmount, holders_security_state::IHoldersSecurityState};

/// Trait representing the security state of the Cis2 contract.
/// It combines the functionality of `ITokensSecurityState` and `IHoldersSecurityState` traits.
pub trait ICis2SecurityState<T: IsTokenId, A: IsTokenAmount, S: HasStateApi>:
    ITokensSecurityState<T, S> + IHoldersSecurityState<T, A, S> {
}

pub enum Cis2SecurityStateError {
    InvalidTokenId,
    InsufficientFunds,
    InvalidAmount,
}