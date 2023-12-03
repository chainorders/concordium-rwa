use concordium_cis2::IsTokenId;
use concordium_std::*;

use super::{error::*, event::*, state::State, types::*};

#[derive(Serialize, SchemaType)]
pub struct PauseParams<T: IsTokenId> {
    tokens: Vec<T>,
}

#[derive(Serialize, SchemaType)]
pub struct IsPausedResponse {
    tokens: Vec<bool>,
}

#[receive(
    contract = "rwa_security_nft",
    name = "pause",
    mutable,
    enable_logger,
    parameter = "PauseParams<TokenId>",
    error = "super::error::Error"
)]
pub fn pause(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut Logger,
) -> ContractResult<()> {
    let state = host.state_mut();
    ensure!(state.is_agent(&ctx.sender()), Error::Unauthorized);

    let PauseParams {
        tokens,
    }: PauseParams<TokenId> = ctx.parameter_cursor().get()?;
    for token_id in tokens {
        ensure!(state.token_exists(&token_id), Error::InvalidTokenId);
        state.set_pause(token_id, true);
        logger.log(&Event::Paused(Paused {
            token_id,
        }))?;
    }

    Ok(())
}

#[receive(
    contract = "rwa_security_nft",
    name = "unpause",
    mutable,
    enable_logger,
    parameter = "PauseParams<TokenId>",
    error = "super::error::Error"
)]
pub fn unpause(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut Logger,
) -> ContractResult<()> {
    let state = host.state_mut();
    ensure!(state.is_agent(&ctx.sender()), Error::Unauthorized);

    let PauseParams {
        tokens,
    }: PauseParams<TokenId> = ctx.parameter_cursor().get()?;
    for token_id in tokens {
        ensure!(state.is_paused(&token_id), Error::InvalidTokenId);
        state.set_pause(token_id, false);
        logger.log(&Event::UnPaused(Paused {
            token_id,
        }))?;
    }

    Ok(())
}

#[receive(
    contract = "rwa_security_nft",
    name = "isPaused",
    parameter = "PauseParams<TokenId>",
    error = "super::error::Error"
)]
pub fn is_paused(ctx: &ReceiveContext, host: &Host<State>) -> ContractResult<IsPausedResponse> {
    let PauseParams {
        tokens,
    }: PauseParams<TokenId> = ctx.parameter_cursor().get()?;

    let mut res = IsPausedResponse {
        tokens: Vec::with_capacity(tokens.len()),
    };

    let state = host.state();
    for token_id in tokens {
        ensure!(state.token_exists(&token_id), Error::InvalidTokenId);
        res.tokens.push(state.is_paused(&token_id))
    }

    Ok(res)
}
