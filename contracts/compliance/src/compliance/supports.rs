use concordium_cis2::{
    StandardIdentifier, SupportResult, SupportsQueryParams, SupportsQueryResponse,
    CIS0_STANDARD_IDENTIFIER,
};
use concordium_std::*;

use concordium_rwa_utils::clients::compliance_client::COMPLIANCE_STANDARD_IDENTIFIER;

use super::{state::State, types::ContractResult};
const SUPPORTS_STANDARDS: [StandardIdentifier<'static>; 2] =
    [CIS0_STANDARD_IDENTIFIER, COMPLIANCE_STANDARD_IDENTIFIER];

/// Handles the `supports` event in the `rwa_compliance` contract.
///
/// This function is called to check if the contract supports a given standard.
/// It iterates over all standards in the `SUPPORTS_STANDARDS` array, and checks
/// if the queried standard is in the array.
///
/// # Errors
///
/// Returns `Error::ParseError` if the parameters could not be parsed.
#[receive(
    contract = "rwa_compliance",
    name = "supports",
    parameter = "SupportsQueryParams",
    return_value = "SupportsQueryResponse",
    error = "super::error::Error"
)]
fn supports(ctx: &ReceiveContext, _: &Host<State>) -> ContractResult<SupportsQueryResponse> {
    let params: SupportsQueryParams = ctx.parameter_cursor().get()?;
    let mut response = Vec::with_capacity(params.queries.len());
    for std_id in params.queries {
        if SUPPORTS_STANDARDS.contains(&std_id.as_standard_identifier()) {
            response.push(SupportResult::Support);
        } else {
            response.push(SupportResult::NoSupport)
        }
    }

    Ok(SupportsQueryResponse::from(response))
}
