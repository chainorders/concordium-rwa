use concordium_std::*;

use super::state::State;

#[derive(Serialize, SchemaType)]
pub struct InitParam {
    pub identity_registry: ContractAddress,
    pub compliance:        ContractAddress,
    pub sponsors:          Vec<ContractAddress>,
}

#[init(
    contract = "rwa_security_nft",
    event = "super::event::Event",
    error = "super::error::Error",
    parameter = "InitParams"
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
