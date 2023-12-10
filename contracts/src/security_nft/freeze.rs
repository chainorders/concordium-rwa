use concordium_cis2::{IsTokenAmount, IsTokenId};
use concordium_std::*;

use crate::utils::{
    agents_state::HasAgentsState,
    holders_security_state::HasHoldersSecurityState,
    tokens_state::{HasTokensState, TokenStateResult},
};

use super::{error::*, event::*, state::State, types::*};

#[derive(Serialize, SchemaType)]
pub struct FreezeParam<T: IsTokenId, A: IsTokenAmount> {
    pub token_id: T,
    pub token_amount: A,
}

#[derive(Serialize, SchemaType)]
pub struct FreezeParams<T: IsTokenId, A: IsTokenAmount> {
    pub owner: Address,
    pub tokens: Vec<FreezeParam<T, A>>,
}

#[derive(Serialize, SchemaType)]
pub struct FrozenParams<T: IsTokenId> {
    pub owner: Address,
    pub tokens: Vec<T>,
}

#[derive(Serialize, SchemaType)]
pub struct FrozenResponse<T: IsTokenAmount> {
    pub tokens: Vec<T>,
}

/// Freezes the given amount of give tokenIds for the given address.
#[receive(
    contract = "rwa_security_nft",
    name = "freeze",
    mutable,
    enable_logger,
    parameter = "FreezeParams<TokenId, TokenAmount>",
    error = "super::error::Error"
)]
pub fn freeze(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut Logger,
) -> ContractResult<()> {
    let (state, state_builder) = host.state_and_builder();
    // Sender of this transaction should be a Trusted Agent
    ensure!(state.agent_state().is_agent(&ctx.sender()), Error::Unauthorized);

    let FreezeParams {
        owner,
        tokens,
    }: FreezeParams<TokenId, TokenAmount> = ctx.parameter_cursor().get()?;
    for token in tokens {
        ensure!(
            state.unfrozen_balance_of(&owner, &token.token_id).ge(&token.token_amount),
            Error::InsufficientFunds
        );

        state.holders_security_state_mut().freeze(
            owner,
            token.token_id,
            token.token_amount,
            state_builder,
        )?;
        logger.log(&Event::TokensFrozen(TokensFrozen {
            token_id: token.token_id,
            amount: token.token_amount,
            address: owner,
        }))?;
    }

    Ok(())
}

/// Unfreezes the given amount of give tokenIds for the given address.
#[receive(
    contract = "rwa_security_nft",
    name = "unFreeze",
    mutable,
    enable_logger,
    parameter = "FreezeParams<TokenId, TokenAmount>",
    error = "super::error::Error"
)]
pub fn un_freeze(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut Logger,
) -> ContractResult<()> {
    let state = host.state_mut();
    // Sender of this transaction should be a Trusted Agent
    ensure!(state.agent_state().is_agent(&ctx.sender()), Error::Unauthorized);

    let FreezeParams {
        owner,
        tokens,
    }: FreezeParams<TokenId, TokenAmount> = ctx.parameter_cursor().get()?;
    for token in tokens {
        state.holders_security_state_mut().un_freeze(owner, token.token_id, token.token_amount)?;
        logger.log(&Event::TokensUnFrozen(TokensFrozen {
            token_id: token.token_id,
            amount: token.token_amount,
            address: owner,
        }))?;
    }

    Ok(())
}

/// Returns the frozen balance of the given token for the given addresses.
#[receive(
    contract = "rwa_security_nft",
    name = "balanceOfFrozen",
    parameter = "FrozenParams<TokenId>",
    return_value = "FrozenResponse<TokenAmount>",
    error = "super::error::Error"
)]
pub fn balance_of_frozen(
    ctx: &ReceiveContext,
    host: &Host<State>,
) -> ContractResult<FrozenResponse<TokenAmount>> {
    let state = host.state();
    let FrozenParams {
        owner,
        tokens: token_ids,
    }: FrozenParams<TokenId> = ctx.parameter_cursor().get()?;

    let tokens = token_ids
        .iter()
        .map(|token_id| {
            state.tokens_state().ensure_token_exists(&token_id).and_then(|_| {
                Ok(state.holders_security_state().balance_of_frozen(&owner, token_id))
            })
        })
        .collect::<TokenStateResult<Vec<_>>>()?;

    Ok(FrozenResponse {
        tokens,
    })
}

/// Returns the unfrozen balance of the given token for the given addresses.
#[receive(
    contract = "rwa_security_nft",
    name = "balanceOfUnFrozen",
    parameter = "FrozenParams<TokenId>",
    return_value = "FrozenResponse<TokenAmount>",
    error = "super::error::Error"
)]
pub fn balance_of_un_frozen(
    ctx: &ReceiveContext,
    host: &Host<State>,
) -> ContractResult<FrozenResponse<TokenAmount>> {
    let state = host.state();
    let FrozenParams {
        owner,
        tokens: token_ids,
    }: FrozenParams<TokenId> = ctx.parameter_cursor().get()?;

    let tokens =
        token_ids.iter().map(|token_id| state.unfrozen_balance_of(&owner, &token_id)).collect();

    Ok(FrozenResponse {
        tokens,
    })
}
