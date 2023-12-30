use concordium_std::*;

use concordium_rwa_utils::clients::cis4_client::{
    Cis4Client, Cis4ContractAddress, CredentialStatus,
};

use super::{state::State, types::ContractResult};

/// Handles the `isVerified` contract call in the `rwa_identity_registry`
/// contract.
///
/// This function is called to check if an address is associated with a verified
/// identity. It retrieves the identity associated with the address from the
/// state, and checks the status of all credentials associated with the
/// identity. If all credentials are active, the identity is considered
/// verified.
///
/// # Errors
///
/// Returns `Error::IdentityNotFound` if the identity associated with the
/// address could not be found. Returns `Error::ParseError` if the parameters
/// could not be parsed.
#[receive(
    contract = "rwa_identity_registry",
    name = "isVerified",
    parameter = "Address",
    return_value = "bool",
    error = "super::error::Error"
)]
pub fn is_verified(ctx: &ReceiveContext, host: &Host<State>) -> ContractResult<bool> {
    let address: Address = ctx.parameter_cursor().get()?;

    // Check that the identity exists.
    let identity = host.state().identities.get(&address);
    let identity = match identity {
        Some(identity) => identity,
        None => return Ok(false),
    };

    let issuers = host.state().issuers.iter().map(|i| *i);
    for issuer in issuers {
        let credential_id = identity.credential_id(&issuer);
        let credential_status = match credential_id {
            Some(credential_holder_id) => {
                Cis4ContractAddress(issuer).credential_status(host, credential_holder_id)?
            }
            None => return Ok(false),
        };

        // If the credential is not active, the identity is not verified.
        if credential_status.ne(&CredentialStatus::Active) {
            return Ok(false);
        }
    }

    Ok(true)
}
