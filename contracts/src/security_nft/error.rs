use concordium_cis2::Cis2Error;
use concordium_std::*;

use crate::utils::{
    compliance_client::ComplianceError, holders_state::HolderStateError,
    identity_registry_client::IdentityRegistryError, tokens_state::TokenStateError,
};

pub type Error = Cis2Error<CustomContractError>;

#[derive(Serialize, SchemaType, Reject, Debug)]
pub enum CustomContractError {
    ParseError,
    LogError,
    /// Error calling Identity Registry Contract
    IdentityRegistryError,
    /// The Receiver of the token is not verified
    UnVerifiedIdentity,
    /// The transfer is non compliant
    InCompliantTransfer,
    /// Error calling Compliance Contract
    ComplianceError,
    /// There was an error Invoking a contract
    CallContractError,
    /// The token is paused
    PausedToken,
    /// The amount for NFT is not 1
    InvalidAmount,
    InvalidAddress,
}

impl From<CustomContractError> for Error {
    fn from(value: CustomContractError) -> Self {
        Error::Custom(value)
    }
}

impl From<IdentityRegistryError> for Error {
    fn from(_: IdentityRegistryError) -> Self {
        Error::Custom(CustomContractError::IdentityRegistryError)
    }
}

impl From<ComplianceError> for Error {
    fn from(_: ComplianceError) -> Self {
        Error::Custom(CustomContractError::ComplianceError)
    }
}

impl<T> From<CallContractError<T>> for CustomContractError {
    fn from(_: CallContractError<T>) -> Self {
        CustomContractError::CallContractError
    }
}

impl From<ParseError> for CustomContractError {
    fn from(_: ParseError) -> Self {
        CustomContractError::ParseError
    }
}

impl From<LogError> for CustomContractError {
    fn from(_: LogError) -> Self {
        CustomContractError::LogError
    }
}

impl From<super::state::StateError> for Error {
    fn from(value: super::state::StateError) -> Self {
        match value {
            super::state::StateError::TokenStateError(e) => e.into(),
            super::state::StateError::RecoveryError(_) => {
                Error::Custom(CustomContractError::InvalidAddress)
            }
            super::state::StateError::HolderStateError(e) => e.into(),
        }
    }
}

impl From<HolderStateError> for Error {
    fn from(_: HolderStateError) -> Self {
        Error::InsufficientFunds
    }
}

impl From<TokenStateError> for Error {
    fn from(_: TokenStateError) -> Self {
        Error::InvalidTokenId
    }
}
