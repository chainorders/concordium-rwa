use concordium_cis2::{BurnEvent, Cis2Event, IsTokenId};
use concordium_std::*;

use concordium_rwa_utils::{
    clients::compliance_client::{ComplianceContract, IComplianceClient},
    compliance_types::Token,
    holders_security_state::IHoldersSecurityState,
    holders_state::IHoldersState,
    sponsors_state::ISponsorsState,
    tokens_security_state::ITokensSecurityState,
    tokens_state::{ITokensState, IsTokenAmount},
};

use super::{
    error::Error,
    event::Event,
    state::State,
    types::{ContractResult, TokenAmount, TokenId},
};

#[derive(Debug, Serialize, Clone, SchemaType)]
pub struct Burn<T: IsTokenId, A: IsTokenAmount> {
    pub token_id: T,
    pub amount:   A,
    pub owner:    Address,
}

#[derive(Debug, Serialize, Clone, SchemaType)]
#[concordium(transparent)]
pub struct BurnParams<T: IsTokenId, A: IsTokenAmount>(
    #[concordium(size_length = 2)] pub Vec<Burn<T, A>>,
);

/// Burns the specified amount of the given token from the given owner's
/// account.
///
/// # Returns
///
/// Returns `ContractResult<()>` indicating whether the operation was
/// successful.
///
/// # Errors
///
/// Returns `Error::Unauthorized` if the sender is not authorized to burn the
/// tokens. Returns `Error::Custom(CustomContractError::PausedToken)` if the
/// token is paused. Returns `Error::InsufficientFunds` if the owner does not
/// have enough tokens.
#[receive(
    contract = "rwa_security_nft",
    name = "burn",
    parameter = "BurnParams<TokenId, TokenAmount>",
    error = "super::error::Error",
    enable_logger,
    mutable
)]
pub fn burn(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut Logger,
) -> ContractResult<()> {
    let sender = ctx.sender();

    let BurnParams(burns): BurnParams<TokenId, TokenAmount> = ctx.parameter_cursor().get()?;
    for Burn {
        token_id,
        amount,
        owner,
    } in burns
    {
        let state = host.state();
        let is_authorized =
        // Sender is the Owner of the token
        owner.eq(&sender)
        // Sender is an operator of the owner
        || state.is_operator(&owner, &sender)
        // Sender is the sponsor (CIS3) of the transaction 
        || state.is_sponsor(&sender);

        ensure!(is_authorized, Error::Unauthorized);
        state.ensure_token_exists(&token_id)?;
        state.ensure_not_paused(&token_id)?;
        state.ensure_has_sufficient_unfrozen_balance(&owner, &token_id, &amount)?;

        host.state_mut().sub_balance(owner, token_id, amount)?;
        ComplianceContract(host.state().compliance()).burned(
            host,
            Token::new(token_id, ctx.self_address()),
            owner,
            amount,
        )?;

        logger.log(&Event::Cis2(Cis2Event::Burn(BurnEvent {
            amount,
            token_id,
            owner,
        })))?;
    }

    Ok(())
}
