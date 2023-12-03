use concordium_std::*;

use super::{state::State, types::ContractResult};

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
    parameter = "InitParam"
)]
pub fn init(ctx: &InitContext, state_builder: &mut StateBuilder) -> InitResult<State> {
    let params: InitParam = ctx.parameter_cursor().get()?;
    let owner = Address::Account(ctx.init_origin());

    Ok(State::new(
        params.identity_registry,
        params.compliance,
        params.sponsors,
        // Adds owner as an agent
        vec![owner],
        state_builder,
    ))
}

#[receive(contract = "rwa_security_nft", name = "identityRegistry")]
pub fn identity_registry(
    _: &ReceiveContext,
    host: &Host<State>,
) -> ContractResult<ContractAddress> {
    Ok(host.state().get_identity_registry())
}

#[receive(contract = "rwa_security_nft", name = "compliance")]
pub fn compliance(_: &ReceiveContext, host: &Host<State>) -> ContractResult<ContractAddress> {
    Ok(host.state().get_compliance())
}
