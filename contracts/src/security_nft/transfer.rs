use concordium_cis2::{OnReceivingCis2Params, Receiver, Transfer, TransferEvent, TransferParams};
use concordium_std::*;

use crate::utils::{
    agent_state::HasAgentState, compliance_client::ComplianceClient,
    identity_registry_client::IdentityRegistryClient, operators_state::HasOperatorsState,
    tokens_state::HasTokensState,
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
        ensure!(amount.eq(&TOKEN_AMOUNT_1), Error::Custom(CustomContractError::InvalidAmount));

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
            !state.is_frozen(&from, &token_id),
            Error::Custom(CustomContractError::FrozenWallet)
        );
        ensure!(!state.is_paused(&token_id), Error::Custom(CustomContractError::PausedToken));
        ensure!(
            state.tokens_state().balance_of(&token_id, &from)?.ge(&amount),
            Error::InsufficientFunds
        );
        // The supposed owner of the Token should be verified to hold the token
        // This includes both KYC verification and VC verification
        ensure!(
            tir.is_verified(to.address())?,
            Error::Custom(CustomContractError::UnVerifiedIdentity)
        );
        // The transfer of the ownership of the token should be compliant.
        // This method will throw error on an non-compliant transfer
        compliance.transferred(token_id, from, to.address(), amount)?;
        state.tokens_state_mut().transfer(token_id, from, to.address(), amount)?;

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

    for Transfer {
        to,
        from,
        amount,
        token_id,
        data,
    } in transfers
    {
        ensure!(amount.eq(&TOKEN_AMOUNT_1), Error::Custom(CustomContractError::InvalidAmount));

        let state = host.state_mut();
        ensure!(state.agent_state().is_agent(&ctx.sender()), Error::Unauthorized);
        ensure!(
            !state.is_frozen(&from, &token_id),
            Error::Custom(CustomContractError::FrozenWallet)
        );
        ensure!(!state.is_paused(&token_id), Error::Custom(CustomContractError::PausedToken));
        ensure!(
            state.tokens_state().balance_of(&token_id, &from)?.ge(&amount),
            Error::InsufficientFunds
        );
        // The supposed owner of the Token should be verified to hold the token
        // This includes both KYC verification and VC verification
        ensure!(
            tir.is_verified(to.address())?,
            Error::Custom(CustomContractError::UnVerifiedIdentity)
        );
        state.tokens_state_mut().transfer(token_id, from, to.address(), amount);

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
