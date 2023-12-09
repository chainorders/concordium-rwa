// use concordium_std::*;

// use super::{
//     state::{Identity, State},
//     types::ContractResult,
// };

// #[derive(Serialize, SchemaType)]
// pub struct RegisterIdentityParams {
//     pub account: AccountAddress,
//     pub identity: Identity,
// }

// pub fn register_identity(
//     ctx: &ReceiveContext,
//     host: &mut Host<State>,
//     logger: &mut Logger,
// ) -> ContractResult<()> {
//     let params: RegisterIdentityParams = ctx.parameter_cursor().get()?;
//     let state = host.state_mut();
//     let sender = ctx.sender();
//     Ok(())
// }
