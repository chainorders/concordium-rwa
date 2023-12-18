use concordium_std::*;

use super::{state::State, types::ContractResult};

#[derive(Serialize, SchemaType)]
pub struct InitParams {
    pub modules: Vec<ContractAddress>,
}

#[init(
    contract = "rwa_compliance",
    event = "super::event::Event",
    error = "super::error::Error",
    parameter = "InitParams"
)]
pub fn init(ctx: &InitContext, state_builder: &mut StateBuilder) -> ContractResult<State> {
    let params: InitParams = ctx.parameter_cursor().get()?;

    Ok(State::new(params.modules, state_builder))
}
