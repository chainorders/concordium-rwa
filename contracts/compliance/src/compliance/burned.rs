use concordium_rwa_utils::{
    clients::compliance_client::{ComplianceContract, IComplianceClient},
    compliance_types::*,
};
use concordium_std::*;

use super::{error::Error, state::State, types::*};

/// Handles the `burned` event in the `rwa_compliance` contract.
///
/// This function is called when tokens are burned. It iterates over all modules
/// in the state, and calls the `burned` function on the `ComplianceContract`
/// for each module.
///
/// # Errors
///
/// Returns `Error::ParseError` if the parameters could not be parsed.
/// Returns `Error::Unauthorized` if the sender of the event does not match the
/// contract of the token.
#[receive(
    contract = "rwa_compliance",
    name = "burned",
    parameter = "BurnedParam<TokenId, TokenAmount>",
    error = "super::error::Error"
)]
fn burned(ctx: &ReceiveContext, host: &Host<State>) -> ContractResult<()> {
    let params: BurnedParam<TokenId, TokenAmount> = ctx.parameter_cursor().get()?;
    ensure!(ctx.sender().matches_contract(&params.token_id.contract), Error::Unauthorized);

    let state = host.state();

    for module in state.modules.iter() {
        ComplianceContract(module.to_owned()).burned(
            host,
            params.token_id.clone(),
            params.owner,
            params.amount,
        )?;
    }

    Ok(())
}
