use concordium_cis2::{IsTokenAmount, IsTokenId};
use concordium_std::*;

use super::{error::*, event::*, state::State, types::*};

#[derive(Serialize, SchemaType)]
pub struct FreezeParam<T: IsTokenId, A: IsTokenAmount> {
    pub token_id:     T,
    pub token_amount: A,
}

#[derive(Serialize, SchemaType)]
pub struct FreezeParams<T: IsTokenId, A: IsTokenAmount> {
    pub owner:  Address,
    pub tokens: Vec<FreezeParam<T, A>>,
}

#[derive(Serialize, SchemaType)]
pub struct FrozenParams<T: IsTokenId> {
    pub owner:  Address,
    pub tokens: Vec<T>,
}

#[derive(Serialize, SchemaType)]
pub struct FrozenResponse<T: IsTokenAmount> {
    pub tokens: Vec<T>,
}

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
    ensure!(state.is_agent(&ctx.sender()), Error::Unauthorized);

    let FreezeParams {
        owner,
        tokens,
    }: FreezeParams<TokenId, TokenAmount> = ctx.parameter_cursor().get()?;
    for token in tokens {
        ensure!(
            token.token_amount.eq(&TOKEN_AMOUNT_1),
            Error::Custom(CustomContractError::InvalidAmount)
        );
        ensure!(state.has_balance(&token.token_id, &owner), Error::InsufficientFunds);
        state.freeze(owner, token.token_id, state_builder);
        logger.log(&Event::TokensFrozen(TokensFrozen {
            token_id: token.token_id,
            amount:   token.token_amount,
            address:  owner,
        }))?;
    }

    Ok(())
}

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
    ensure!(state.is_agent(&ctx.sender()), Error::Unauthorized);

    let FreezeParams {
        owner,
        tokens,
    }: FreezeParams<TokenId, TokenAmount> = ctx.parameter_cursor().get()?;
    for token in tokens {
        ensure!(
            token.token_amount.eq(&TOKEN_AMOUNT_1),
            Error::Custom(CustomContractError::InvalidAmount)
        );
        ensure!(state.is_frozen(&owner, &token.token_id), Error::InsufficientFunds);
        state.un_freeze(owner, token.token_id);
        logger.log(&Event::TokensUnFrozen(TokensFrozen {
            token_id: token.token_id,
            amount:   token.token_amount,
            address:  owner,
        }))?;
    }

    Ok(())
}

#[receive(
    contract = "rwa_security_nft",
    name = "frozen",
    parameter = "FrozenParams<TokenId>",
    return_value = "FrozenResponse<TokenAmount>",
    error = "super::error::Error"
)]
pub fn frozen(
    ctx: &ReceiveContext,
    host: &Host<State>,
) -> ContractResult<FrozenResponse<TokenAmount>> {
    let state = host.state();
    // Sender of this transaction should be a Trusted Agent
    ensure!(state.is_agent(&ctx.sender()), Error::Unauthorized);

    let FrozenParams {
        owner,
        tokens: token_ids,
    }: FrozenParams<TokenId> = ctx.parameter_cursor().get()?;
    let mut res = FrozenResponse {
        tokens: Vec::with_capacity(token_ids.len()),
    };

    for token_id in token_ids {
        ensure!(state.token_exists(&token_id), Error::InvalidTokenId);

        if state.is_frozen(&owner, &token_id) {
            res.tokens.push(TOKEN_AMOUNT_1)
        } else {
            res.tokens.push(TOKEN_AMOUNT_0)
        }
    }

    Ok(res)
}
