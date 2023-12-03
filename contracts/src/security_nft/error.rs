use concordium_cis2::Cis2Error;
use concordium_std::*;

use crate::utils::{
    compliance_client::ComplianceError, identity_registry_client::IdentityRegistryError,
};

pub type Error = Cis2Error<CustomContractError>;

#[derive(Serialize, SchemaType, Reject, Debug)]
pub enum CustomContractError {
    ParseError,
    LogError,
    IdentityRegistryError,
    UnVerifiedIdentity,
    ComplianceError,
    CallContractError,
    FrozenWallet,
    PausedToken,
    InvalidAmount,
}

impl From<CustomContractError> for Error {
    fn from(value: CustomContractError) -> Self { Error::Custom(value) }
}

impl From<IdentityRegistryError> for Error {
    fn from(_: IdentityRegistryError) -> Self {
        Error::Custom(CustomContractError::IdentityRegistryError)
    }
}

impl From<ComplianceError> for Error {
    fn from(_: ComplianceError) -> Self { Error::Custom(CustomContractError::ComplianceError) }
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
