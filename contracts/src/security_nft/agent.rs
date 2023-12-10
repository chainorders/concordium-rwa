use concordium_std::*;

use crate::utils::agents_state::HasAgentsState;

use super::{error::*, event::*, state::State, types::*};

/// Returns the list of agents.
///
/// # Returns
///
/// Returns `ContractResult<Vec<Address>>` containing the list of agents.
#[receive(
    contract = "rwa_security_nft",
    name = "isAgent",
    parameter = "Address",
    error = "super::error::Error"
)]
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
    Ok(host.state().agent_state().get_agents())
}

/// Adds the given address as an agent.
///
/// # Returns
///
/// Returns `ContractResult<()>` indicating whether the operation was successful.
///
/// # Errors
///
/// Returns `Error::Unauthorized` if the sender does not match the owner.
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
    let agent: Address = ctx.parameter_cursor().get()?;
    host.state_mut().agent_state_mut().add_agent(agent);
    logger.log(&Event::AgentAdded(AgentUpdatedEvent {
        agent,
    }))?;

    Ok(())
}

/// Removes the given address as an agent.
///
/// # Returns
///
/// Returns `ContractResult<()>` indicating whether the operation was successful.
///
/// # Errors
///
/// Returns `Error::Unauthorized` if the sender does not match the owner.
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
    let agent: Address = ctx.parameter_cursor().get()?;
    host.state_mut().agent_state_mut().remove_agent(&agent);
    logger.log(&Event::AgentRemoved(AgentUpdatedEvent {
        agent,
    }))?;

    Ok(())
}
