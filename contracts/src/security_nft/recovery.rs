use concordium_std::*;

use crate::utils::{
    agents_state::HasAgentsState, holders_security_state::HasHoldersSecurityState,
    identity_registry_client::IdentityRegistryClient,
};

use super::{error::*, event::*, state::State, types::ContractResult};

#[derive(Serialize, SchemaType)]
pub struct RecoverParam {
    pub lost_account: Address,
    pub new_account: Address,
}

#[receive(
    contract = "rwa_security_nft",
    name = "recover",
    mutable,
    enable_logger,
    parameter = "RecoverParam",
    error = "super::error::Error"
)]
pub fn recover(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut Logger,
) -> ContractResult<()> {
    let RecoverParam {
        lost_account,
        new_account,
    }: RecoverParam = ctx.parameter_cursor().get()?;
    let state = host.state_mut();
    ensure!(state.agent_state().is_agent(&ctx.sender()), Error::Unauthorized);

    let identity_registry =
        IdentityRegistryClient::new(state.holders_security_state().identity_registry());

    ensure!(
        identity_registry.is_same(lost_account, new_account)?,
        Error::Custom(CustomContractError::UnVerifiedIdentity)
    );

    host.state_mut().recover(lost_account, new_account)?;
    logger.log(&Event::Recovered(RecoverEvent {
        lost_account,
        new_account,
    }))?;

    Ok(())
}

#[receive(
    contract = "rwa_security_nft",
    name = "recoveryAddress",
    parameter = "Address",
    error = "super::error::Error",
    return_value = "Option<Address>"
)]
pub fn is_recovered(ctx: &ReceiveContext, host: &Host<State>) -> ContractResult<Option<Address>> {
    let address: Address = ctx.parameter_cursor().get()?;
    Ok(host.state().holders_security_state().get_recovery_address(&address))
}
