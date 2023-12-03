use concordium_std::*;

use super::{error::*, event::*, state::State, types::*};

#[receive(
    contract = "rwa_security_nft",
    name = "isAgent",
    parameter = "Address",
    error = "super::error::Error"
)]
pub fn is_agent(ctx: &ReceiveContext, host: &Host<State>) -> ContractResult<bool> {
    let address: Address = ctx.parameter_cursor().get()?;
    Ok(host.state.is_agent(&address))
}

#[receive(
    contract = "rwa_security_nft",
    name = "agents",
    return_value = "Vec<Address>",
    error = "super::error::Error"
)]
pub fn agents(_ctx: &ReceiveContext, host: &Host<State>) -> ContractResult<Vec<Address>> {
    Ok(host.state.get_agents())
}

#[receive(
    contract = "rwa_security_nft",
    name = "addAgent",
    mutable,
    enable_logger,
    parameter = "Address",
    error = "super::error::Error"
)]
pub fn add_agent(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut Logger,
) -> ContractResult<()> {
    ensure!(ctx.sender().matches_account(&ctx.owner()), Error::Unauthorized);
    let address: Address = ctx.parameter_cursor().get()?;
    host.state.add_agent(address);
    logger.log(&Event::AgentAdded(AgentUpdatedEvent(address)))?;

    Ok(())
}

#[receive(
    contract = "rwa_security_nft",
    name = "removeAgent",
    mutable,
    enable_logger,
    parameter = "Address",
    error = "super::error::Error"
)]
pub fn remove_agent(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut Logger,
) -> ContractResult<()> {
    ensure!(ctx.sender().matches_account(&ctx.owner()), Error::Unauthorized);
    let address: Address = ctx.parameter_cursor().get()?;
    host.state.remove_agent(&address);
    logger.log(&Event::AgentRemoved(AgentUpdatedEvent(address)))?;

    Ok(())
}
