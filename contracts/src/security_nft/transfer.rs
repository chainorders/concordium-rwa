use concordium_cis2::{OnReceivingCis2Params, Receiver, Transfer, TransferEvent, TransferParams, Cis2Event};
use concordium_std::{ops::Sub, *};

use crate::utils::{
    agents_state::HasAgentsState, compliance_client::ComplianceClient,
    identity_registry_client::IdentityRegistryClient, operators_state::HasOperatorsState,
    tokens_security_state::HasTokensSecurityState, tokens_state::HasTokensState,
};

use super::{error::*, event::*, state::State, types::*};

/// Compliant Transfers ownership of an NFT from one verified account to another verified account.
#[receive(
    contract = "rwa_security_nft",
    name = "transfer",
    enable_logger,
    mutable,
    parameter = "TransferParams<TokenId, TokenAmount>",
    error = "super::error::Error"
)]
pub fn transfer(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut Logger,
) -> ContractResult<()> {
    let sender = ctx.sender();
    let TransferParams(transfers): TransferParams<TokenId, TokenAmount> =
        ctx.parameter_cursor().get()?;

    let state = host.state();
    let compliance = ComplianceClient::new(state.get_compliance());
    let tir = IdentityRegistryClient::new(state.get_identity_registry());

    for Transfer {
        to,
        from,
        amount,
        token_id,
        data,
    } in transfers
    {
        let state = host.state_mut();
        let is_authorized =
            // Sender is the Owner of the token
            from.eq(&sender)
            // Sender is an operator of the owner
            || state.operators_state().is_operator(&from, &sender)
            // Sender is the sponsor (CIS3) of the transaction 
            || state.is_sponsor(&sender);

        ensure!(is_authorized, Error::Unauthorized);
        ensure!(
            !state.security_tokens_state().is_paused(&token_id),
            Error::Custom(CustomContractError::PausedToken)
        );

        let un_frozen_balance = state
            .tokens_state()
            .balance_of(&token_id, &from)?
            .sub(state.security_tokens_state().balance_of_frozen(&token_id, &from));
        ensure!(un_frozen_balance.ge(&amount), Error::InsufficientFunds);

        // The supposed owner of the Token should be verified to hold the token
        // This includes both KYC verification and VC verification
        ensure!(
            tir.is_verified(to.address())?,
            Error::Custom(CustomContractError::UnVerifiedIdentity)
        );
        ensure!(
            compliance.can_transfer(token_id, from, to.address(), amount)?,
            Error::Custom(CustomContractError::InCompliantTransfer)
        );
        state.tokens_state_mut().transfer(token_id, from, to.address(), amount)?;
        // The transfer of the ownership of the token should be compliant.
        compliance.transferred(token_id, from, to.address(), amount)?;

        logger.log(&Event::Cis2(Cis2Event::Transfer(TransferEvent {
            amount,
            token_id,
            from,
            to: to.address(),
        })))?;

        if let Receiver::Contract(to_contract, entrypoint) = to {
            let parameter = OnReceivingCis2Params {
                token_id,
                amount,
                from,
                data,
            };

            host.invoke_contract(
                &to_contract,
                &parameter,
                entrypoint.as_entrypoint_name(),
                Amount::zero(),
            )?;
        }
    }

    Ok(())
}

/// Transfers ownership of an NFT from one verified account to another verified account. Does not check for compliance.
#[receive(
    contract = "rwa_security_nft",
    name = "forcedTransfer",
    enable_logger,
    mutable,
    parameter = "TransferParams<TokenId, TokenAmount>",
    error = "super::error::Error"
)]
pub fn forced_transfer(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut Logger,
) -> ContractResult<()> {
    let TransferParams(transfers): TransferParams<TokenId, TokenAmount> =
        ctx.parameter_cursor().get()?;

    let state = host.state();
    let tir = IdentityRegistryClient::new(state.get_identity_registry());
    let compliance = ComplianceClient::new(state.get_compliance());

    for Transfer {
        to,
        from,
        amount,
        token_id,
        data,
    } in transfers
    {
        let state = host.state_mut();
        ensure!(state.agent_state().is_agent(&ctx.sender()), Error::Unauthorized);
        ensure!(
            !state.security_tokens_state().is_paused(&token_id),
            Error::Custom(CustomContractError::PausedToken)
        );

        let actual_balance = state.tokens_state().balance_of(&token_id, &from)?;
        let frozen_balance = state.security_tokens_state().balance_of_frozen(&token_id, &from);
        let un_frozen_balance = actual_balance.sub(frozen_balance);
        ensure!(actual_balance.ge(&amount), Error::InsufficientFunds);
        // The supposed owner of the Token should be verified to hold the token
        // This includes both KYC verification and VC verification
        ensure!(
            tir.is_verified(to.address())?,
            Error::Custom(CustomContractError::UnVerifiedIdentity)
        );
        state.tokens_state_mut().transfer(token_id, from, to.address(), amount)?;
        compliance.transferred(token_id, from, to.address(), amount)?;

        if un_frozen_balance.lt(&amount) {
            let in_compliant_amount = amount.sub(un_frozen_balance);
            state.security_tokens_state_mut().un_freeze(token_id, from, in_compliant_amount)?;
        }

        logger.log(&Event::Cis2(concordium_cis2::Cis2Event::Transfer(TransferEvent {
            amount,
            token_id,
            from,
            to: to.address(),
        })))?;

        if let Receiver::Contract(to_contract, entrypoint) = to {
            let parameter = OnReceivingCis2Params {
                token_id,
                amount,
                from,
                data,
            };

            host.invoke_contract(
                &to_contract,
                &parameter,
                entrypoint.as_entrypoint_name(),
                Amount::zero(),
            )?;
        }
    }

    Ok(())
}
