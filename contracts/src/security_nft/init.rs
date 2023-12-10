use concordium_std::*;

use crate::utils::holders_security_state::HasHoldersSecurityState;

use super::{
    event::{ComplianceAdded, Event, IdentityRegistryAdded},
    state::State,
    types::ContractResult,
};

#[derive(Serialize, SchemaType)]
pub struct InitParam {
    pub identity_registry: ContractAddress,
    pub compliance: ContractAddress,
    pub sponsors: Vec<ContractAddress>,
}

#[init(
    contract = "rwa_security_nft",
    event = "super::event::Event",
    error = "super::error::Error",
    parameter = "InitParam",
    enable_logger
)]
pub fn init(
    ctx: &InitContext,
    state_builder: &mut StateBuilder,
    logger: &mut Logger,
) -> InitResult<State> {
    let params: InitParam = ctx.parameter_cursor().get()?;
    let owner = Address::Account(ctx.init_origin());
    let state = State::new(
        params.identity_registry,
        params.compliance,
        params.sponsors,
        // Adds owner as an agent
        vec![owner],
        state_builder,
    );

    logger.log(&Event::IdentityRegistryAdded(IdentityRegistryAdded(params.identity_registry)))?;
    logger.log(&Event::ComplianceAdded(ComplianceAdded(params.compliance)))?;

    Ok(state)
}

#[receive(
    contract = "rwa_security_nft",
    name = "identityRegistry",
    return_value = "ContractAddress"
)]
pub fn identity_registry(
    _: &ReceiveContext,
    host: &Host<State>,
) -> ContractResult<ContractAddress> {
    Ok(host.state().holders_security_state().identity_registry())
}

#[receive(contract = "rwa_security_nft", name = "compliance", return_value = "ContractAddress")]
pub fn compliance(_: &ReceiveContext, host: &Host<State>) -> ContractResult<ContractAddress> {
    Ok(host.state().holders_security_state().compliance())
}
