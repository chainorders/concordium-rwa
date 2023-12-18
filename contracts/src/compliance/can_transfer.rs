use concordium_std::*;

use crate::{
    security_nft::types::{TokenAmount, TokenId},
    utils::clients::compliance_client::{
        contract_types::CanTransferParam, ComplianceContract, IComplianceClient,
    },
};

use super::{state::State, types::ContractResult};

/// Handles the `can_transfer` event in the `rwa_compliance` contract.
///
/// This function is called to check if a transfer of tokens can be made. It
/// iterates over all modules in the state, and calls the `can_transfer`
/// function on the `ComplianceContract` for each module.
#[receive(
    contract = "rwa_compliance",
    name = "can_transfer",
    parameter = "CanTransferParam<TokenId, TokenAmount>",
    return_value = "bool",
    error = "super::error::Error"
)]
fn can_transfer(ctx: &ReceiveContext, host: &Host<State>) -> ContractResult<bool> {
    let params: CanTransferParam<TokenId, TokenAmount> = ctx.parameter_cursor().get()?;
    let state = host.state();

    for module in state.modules.iter() {
        let can_transfer = ComplianceContract(module.to_owned()).can_transfer(
            host,
            params.token_id,
            params.from,
            params.to,
            params.amount,
        )?;

        if !can_transfer {
            return Ok(false);
        }
    }

    Ok(true)
}
