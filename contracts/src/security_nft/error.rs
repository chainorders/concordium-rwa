use concordium_cis2::Cis2Error;
use concordium_std::*;

use crate::utils::{
    cis2_state::Cis2StateError, clients::contract_client::ContractClientError,
    holders_security_state::RecoveryError, holders_state::HolderStateError,
    tokens_security_state::TokenSecurityError, tokens_state::TokenStateError,
};

pub type Error = Cis2Error<CustomContractError>;

/// Represents the different types of errors that can occur in the contract.
#[derive(Serialize, SchemaType, Reject, Debug)]
pub enum CustomContractError {
    /// Triggered when there is an error parsing a value.
    ParseError,
    /// Triggered when there is an error logging a value.
    LogError,
    /// Triggered when the receiver of the token is not verified.
    UnVerifiedIdentity,
    /// Triggered when the transfer is non-compliant.
    InCompliantTransfer,
    /// Triggered when there is an error calling the Compliance Contract.
    ComplianceError,
    /// Triggered when there is an error invoking a contract.
    CallContractError,
    /// Triggered when the token is paused.
    PausedToken,
    /// Triggered when the amount for NFT is not 1.
    InvalidAmount,
    /// Triggered when the provided address is invalid.
    InvalidAddress,
    /// Triggered when an agent already exists.
    AgentAlreadyExists,
    /// Triggered when an agent could not be found.
    AgentNotFound,
}

impl From<CustomContractError> for Error {
    fn from(value: CustomContractError) -> Self { Error::Custom(value) }
}

impl<T> From<CallContractError<T>> for CustomContractError {
    fn from(_: CallContractError<T>) -> Self { CustomContractError::CallContractError }
}

impl From<ParseError> for CustomContractError {
    fn from(_: ParseError) -> Self { CustomContractError::ParseError }
}

impl From<LogError> for CustomContractError {
    fn from(_: LogError) -> Self { CustomContractError::LogError }
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
    fn from(_: HolderStateError) -> Self { Error::InsufficientFunds }
}

impl From<TokenStateError> for Error {
    fn from(_: TokenStateError) -> Self { Error::InvalidTokenId }
}

impl From<RecoveryError> for Error {
    fn from(value: RecoveryError) -> Self {
        match value {
            RecoveryError::AddressAlreadyRecovered => {
                Error::Custom(CustomContractError::InvalidAddress)
            }
            RecoveryError::InvalidRecoveryAddress => {
                Error::Custom(CustomContractError::InvalidAddress)
            }
        }
    }
}

impl From<Cis2StateError> for Error {
    fn from(value: Cis2StateError) -> Self {
        match value {
            Cis2StateError::InvalidTokenId => Error::InvalidTokenId,
            Cis2StateError::InsufficientFunds => Error::InsufficientFunds,
            Cis2StateError::InvalidAmount => Error::Custom(CustomContractError::InvalidAmount),
        }
    }
}

impl From<TokenSecurityError> for Error {
    fn from(value: TokenSecurityError) -> Self {
        match value {
            TokenSecurityError::PausedToken => Error::Custom(CustomContractError::PausedToken),
        }
    }
}

impl<E> From<ContractClientError<E>> for Error {
    fn from(_: ContractClientError<E>) -> Self {
        Error::Custom(CustomContractError::CallContractError)
    }
}
