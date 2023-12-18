use concordium_std::*;

use super::{
    error::Error,
    event::*,
    state::{IdentityState, State},
    types::{ContractResult, Identity},
};

/// Parameters for registering an identity.
#[derive(Serialize, SchemaType)]
pub struct RegisterIdentityParams {
    pub identity: Identity,
    pub address:  Address,
}

/// Parameters for registering multiple identities.
#[derive(Serialize, SchemaType)]
pub struct RegisterIdentitiesParams {
    pub identities: Vec<RegisterIdentityParams>,
}

/// Register multiple identities.
#[receive(
    contract = "rwa_identity_registry",
    name = "registerIdentities",
    mutable,
    enable_logger,
    parameter = "RegisterIdentitiesParams",
    error = "super::error::Error"
)]
pub fn register_identities(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut Logger,
) -> ContractResult<()> {
    // Check if the sender is authorized to register identities.
    ensure!(host.state().agents.contains(&ctx.sender()), Error::Unauthorized);

    let params: RegisterIdentitiesParams = ctx.parameter_cursor().get()?;
    for RegisterIdentityParams {
        identity,
        address,
    } in params.identities
    {
        let (state, state_builder) = host.state_and_builder();

        // Register the identity and log the event.
        state.identities.insert(address, IdentityState::new(identity, state_builder));
        logger.log(&Event::IdentityRegistered(IdentityUpdatedEvent {
            address,
        }))?;
    }

    Ok(())
}

/// Update multiple identities.
#[receive(
    contract = "rwa_identity_registry",
    name = "updateIdentities",
    mutable,
    enable_logger,
    parameter = "RegisterIdentitiesParams",
    error = "super::error::Error"
)]
pub fn update_identities(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut Logger,
) -> ContractResult<()> {
    // Check if the sender is authorized to update identities.
    ensure!(host.state().agents.contains(&ctx.sender()), Error::Unauthorized);

    let params: RegisterIdentitiesParams = ctx.parameter_cursor().get()?;
    for RegisterIdentityParams {
        identity,
        address,
    } in params.identities
    {
        let (state, state_builder) = host.state_and_builder();
        ensure!(
            state.identities.insert(address, IdentityState::new(identity, state_builder)).is_none(),
            Error::IdentityNotFound
        );
        logger.log(&Event::IdentityUpdated(IdentityUpdatedEvent {
            address,
        }))?;
    }

    Ok(())
}

/// Parameters for deleting identities.
#[derive(Serialize, SchemaType)]
pub struct DeleteIdentitiesParams {
    pub addresses: Vec<Address>,
}

/// Delete multiple identities.
#[receive(
    contract = "rwa_identity_registry",
    name = "deleteIdentities",
    mutable,
    enable_logger,
    parameter = "DeleteIdentitiesParams",
    error = "super::error::Error"
)]
pub fn delete_identities(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut Logger,
) -> ContractResult<()> {
    // Check if the sender is authorized to delete identities.
    ensure!(host.state().agents.contains(&ctx.sender()), Error::Unauthorized);

    let params: DeleteIdentitiesParams = ctx.parameter_cursor().get()?;
    for address in params.addresses {
        let state = host.state_mut();

        ensure!(
            state.identities.remove_and_get(&address).and_then(|i| Some(i.delete())).is_none(),
            Error::IdentityNotFound
        );

        logger.log(&Event::IdentityRemoved(IdentityUpdatedEvent {
            address,
        }))?;
    }

    Ok(())
}

/// Return true if the input address has a registered Identity.
#[receive(
    contract = "rwa_identity_registry",
    name = "hasIdentity",
    parameter = "Address",
    error = "super::error::Error"
)]
pub fn has_identity(ctx: &ReceiveContext, host: &Host<State>) -> ContractResult<bool> {
    let address: Address = ctx.parameter_cursor().get()?;
    let state = host.state();
    Ok(state.identities.get(&address).is_some())
}

/// Return the identity of the input address.
#[receive(
    contract = "rwa_identity_registry",
    name = "getIdentity",
    parameter = "Address",
    return_value = "Identity",
    error = "super::error::Error"
)]
pub fn get_identity(ctx: &ReceiveContext, host: &Host<State>) -> ContractResult<Identity> {
    let address: Address = ctx.parameter_cursor().get()?;
    let state = host.state();
    state.identities.get(&address).map(|i| i.to_identity()).ok_or(Error::IdentityNotFound)
}
