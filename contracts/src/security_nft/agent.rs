use concordium_std::*;

use crate::utils::agent_state::HasAgentState;

use super::{error::*, event::*, state::State, types::*};

#[receive(
    contract = "rwa_security_nft",
    name = "isAgent",
    parameter = "Address",
    error = "super::error::Error"
)]
/// Returns true if the given address is an agent.
pub fn is_agent(ctx: &ReceiveContext, host: &Host<State>) -> ContractResult<bool> {
    let address: Address = ctx.parameter_cursor().get()?;
    Ok(host.state().agent_state().is_agent(&address))
}

#[receive(
    contract = "rwa_security_nft",
    name = "agents",
    return_value = "Vec<Address>",
    error = "super::error::Error"
)]
/// Returns the list of agents.
pub fn agents(_ctx: &ReceiveContext, host: &Host<State>) -> ContractResult<Vec<Address>> {
    Ok(host.state.agent_state().get_agents())
}

#[receive(
    contract = "rwa_security_nft",
    name = "addAgent",
    mutable,
    enable_logger,
    parameter = "Address",
    error = "super::error::Error"
)]
/// Adds the given address as an agent.
pub fn add_agent(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut Logger,
) -> ContractResult<()> {
    ensure!(ctx.sender().matches_account(&ctx.owner()), Error::Unauthorized);
    let address: Address = ctx.parameter_cursor().get()?;
    host.state.agent_state_mut().add_agent(address);
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
/// Removes the given address as an agent.
pub fn remove_agent(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut Logger,
) -> ContractResult<()> {
    ensure!(ctx.sender().matches_account(&ctx.owner()), Error::Unauthorized);
    let address: Address = ctx.parameter_cursor().get()?;
    host.state.agent_state_mut().remove_agent(&address);
    logger.log(&Event::AgentRemoved(AgentUpdatedEvent(address)))?;

    Ok(())
}
