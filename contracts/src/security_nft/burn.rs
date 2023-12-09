use concordium_cis2::{BurnEvent, Cis2Event, IsTokenId};
use concordium_std::{ops::Sub, *};

use crate::{
    security_nft::error::CustomContractError,
    utils::{
        compliance_client::ComplianceClient,
        operators_state::HasOperatorsState,
        tokens_security_state::HasTokensSecurityState,
        tokens_state::{HasTokensState, IsTokenAmount},
    },
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
    pub amount: A,
    pub owner: Address,
}

#[derive(Debug, Serialize, Clone, SchemaType)]
#[concordium(transparent)]
pub struct BurnParams<T: IsTokenId, A: IsTokenAmount>(
    #[concordium(size_length = 2)] pub Vec<Burn<T, A>>,
);

pub fn burn(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut Logger,
) -> ContractResult<()> {
    let sender = ctx.sender();
    let state = host.state_mut();
    let compliance = ComplianceClient::new(state.get_compliance());

    let BurnParams(burns): BurnParams<TokenId, TokenAmount> = ctx.parameter_cursor().get()?;
    for Burn {
        token_id,
        amount,
        owner,
    } in burns
    {
        let is_authorized =
        // Sender is the Owner of the token
        owner.eq(&sender)
        // Sender is an operator of the owner
        || state.operators_state().is_operator(&owner, &sender)
        // Sender is the sponsor (CIS3) of the transaction 
        || state.is_sponsor(&sender);
        ensure!(is_authorized, Error::Unauthorized);
        ensure!(
            !state.security_tokens_state().is_paused(&token_id),
            Error::Custom(CustomContractError::PausedToken)
        );

        let un_frozen_balance = state
            .tokens_state()
            .balance_of(&token_id, &owner)?
            .sub(state.security_tokens_state().balance_of_frozen(&token_id, &owner));
        ensure!(un_frozen_balance.ge(&amount), Error::InsufficientFunds);
        state.tokens_state_mut().burn_token(token_id, owner, amount)?;
        compliance.burned(token_id, owner, amount)?;

        logger.log(&Event::Cis2(Cis2Event::Burn(BurnEvent {
            amount,
            token_id,
            owner,
        })))?;
    }

    Ok(())
}
