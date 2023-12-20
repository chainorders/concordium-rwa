use concordium_std::*;

use concordium_rwa_utils::clients::compliance_client::{
    contract_types::TransferredParam, ComplianceContract, IComplianceClient,
};

use super::{error::Error, state::State, types::*};

/// Handles the `transferred` event in the `rwa_compliance` contract.
///
/// This function is called when tokens are transferred. It iterates over all
/// modules in the state, and calls the `transferred` function on the
/// `ComplianceContract` for each module.
///
/// # Errors
///
/// Returns `Error::Unauthorized` if the sender of the event does not match the
/// contract of the token. Returns `Error::ParseError` if the parameters could
/// not be parsed.
#[receive(
    contract = "rwa_compliance",
    name = "transferred",
    parameter = "TransferredParam<TokenId, TokenAmount>",
    error = "super::error::Error"
)]
fn transferred(ctx: &ReceiveContext, host: &Host<State>) -> ContractResult<()> {
    let params: TransferredParam<TokenId, TokenAmount> = ctx.parameter_cursor().get()?;
    let state = host.state();

    for module in state.modules.iter() {
        ensure!(ctx.sender().matches_contract(&params.token_id.contract), Error::Unauthorized);

        let _ = ComplianceContract(module.to_owned()).transferred(
            host,
            params.token_id,
            params.from,
            params.to,
            params.amount,
        )?;
    }

    Ok(())
}
