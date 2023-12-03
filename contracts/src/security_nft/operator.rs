use concordium_cis2::*;
use concordium_std::*;

use super::{event::Event, state::State, types::ContractResult};

#[receive(
    contract = "rwa_security_nft",
    name = "updateOperator",
    mutable,
    enable_logger,
    parameter = "UpdateOperatorParams",
    error = "super::error::Error"
)]
pub fn update_operator(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut Logger,
) -> ContractResult<()> {
    let UpdateOperatorParams {
        0: updates,
    }: UpdateOperatorParams = ctx.parameter_cursor().get()?;
    let (state, state_builder) = host.state_and_builder();
    let owner = ctx.sender();

    for UpdateOperator {
        operator,
        update,
    } in updates
    {
        match update {
            OperatorUpdate::Remove => state.set_operator(owner, operator, false, state_builder),
            OperatorUpdate::Add => state.set_operator(owner, operator, true, state_builder),
        }

        logger.log(&Event::Cis2(Cis2Event::UpdateOperator(UpdateOperatorEvent {
            operator,
            update,
            owner,
        })))?;
    }

    Ok(())
}

#[receive(
    contract = "rwa_security_nft",
    name = "operatorOf",
    parameter = "OperatorOfQueryParams",
    return_value = "OperatorOfQueryResponse",
    error = "super::error::Error"
)]
pub fn operator_of(
    ctx: &ReceiveContext,
    host: &Host<State>,
) -> ContractResult<OperatorOfQueryResponse> {
    let OperatorOfQueryParams {
        queries,
    }: OperatorOfQueryParams = ctx.parameter_cursor().get()?;
    let state = host.state();

    let mut res: OperatorOfQueryResponse =
        OperatorOfQueryResponse(Vec::with_capacity(queries.len()));
    for OperatorOfQuery {
        owner,
        address,
    } in queries
    {
        res.0.push(state.is_operator(&address, &owner))
    }

    Ok(res)
}
