use std::num::NonZeroI32;

use concordium_std::*;

use concordium_rwa_utils::{
    cis2_state::Cis2StateError, clients::contract_client::ContractClientError,
    holders_security_state::HolderSecurityStateError, holders_state::HolderStateError,
    tokens_security_state::TokenSecurityError, tokens_state::TokenStateError,
};

#[derive(SchemaType)]
pub enum Error {
    InvalidTokenId,
    /// The balance of the token owner is insufficient for the transfer (Error
    /// code: -42000002).
    InsufficientFunds,
    /// Sender is unauthorized to call this function (Error code: -42000003).
    Unauthorized,
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

impl Error {
    fn error_code(&self) -> NonZeroI32 {
        NonZeroI32::new(match self {
            Error::InvalidTokenId => -42000001,
            Error::InsufficientFunds => -42000002,
            Error::Unauthorized => -42000003,
            Error::ParseError => -42000004,
            Error::LogError => -42000005,
            Error::UnVerifiedIdentity => -42000006,
            Error::InCompliantTransfer => -42000007,
            Error::ComplianceError => -42000008,
            // Add other error mappings here
            _ => -42000009,
        })
        .unwrap()
    }
}

impl From<Error> for Reject {
    fn from(err: Error) -> Self {
        Reject {
            error_code: err.error_code(),
            ..Default::default()
        }
    }
}

impl From<ParseError> for Error {
    fn from(_: ParseError) -> Self { Error::ParseError }
}

impl From<LogError> for Error {
    fn from(_: LogError) -> Self { Error::LogError }
}

impl From<TokenStateError> for Error {
    fn from(_: TokenStateError) -> Self { Error::InvalidTokenId }
}

impl From<HolderStateError> for Error {
    fn from(_: HolderStateError) -> Self { Error::InsufficientFunds }
}

impl<T> From<ContractClientError<T>> for Error {
    fn from(_: ContractClientError<T>) -> Self { Error::CallContractError }
}

impl From<TokenSecurityError> for Error {
    fn from(value: TokenSecurityError) -> Self {
        match value {
            TokenSecurityError::PausedToken => Error::PausedToken,
        }
    }
}

impl From<HolderSecurityStateError> for Error {
    fn from(e: HolderSecurityStateError) -> Self {
        match e {
            HolderSecurityStateError::AmountTooLarge => Error::InsufficientFunds,
            HolderSecurityStateError::AmountOverflow => Error::InvalidAmount,
            HolderSecurityStateError::AddressAlreadyRecovered => Error::InvalidAddress,
            HolderSecurityStateError::InvalidRecoveryAddress => Error::InvalidAddress,
        }
    }
}

impl<T> From<CallContractError<T>> for Error {
    fn from(_: CallContractError<T>) -> Self { Error::CallContractError }
}

impl From<Cis2StateError> for Error {
    fn from(value: Cis2StateError) -> Self {
        match value {
            Cis2StateError::InvalidTokenId => Error::InvalidTokenId,
            Cis2StateError::InsufficientFunds => Error::InsufficientFunds,
            Cis2StateError::InvalidAmount => Error::InvalidAmount,
        }
    }
}
