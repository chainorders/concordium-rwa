use concordium_cis2::{
    Cis2Event, OnReceivingCis2Params, Receiver, Transfer, TransferEvent, TransferParams,
};
use concordium_std::*;

use concordium_rwa_utils::{
    agents_state::IsAgentsState,
    clients::{
        compliance_client::{contract_types::Token, ComplianceContract, IComplianceClient},
        identity_registry_client::{IdentityRegistryClient, IdentityRegistryContract},
    },
    holders_security_state::IHoldersSecurityState,
    holders_state::IHoldersState,
    sponsors_state::ISponsorsState,
    tokens_security_state::ITokensSecurityState,
    tokens_state::ITokensState,
};

use super::{error::*, event::*, state::State, types::*};

/// Compliant Transfers ownership of an NFT from one verified account to another
/// verified account. This function can be called by the owner of the token or
/// an operator of the owner or the trusted sponsor of the transaction.
///
/// # Returns
///
/// Returns `ContractResult<()>` indicating the success or failure of the
/// operation.
///
/// # Errors
///
/// This method will return an error if:
/// * `concordium_std::ParseError` - The parameter cursor cannot parse the
///   `TransferParams`.
/// * `Error::Unauthorized` - The sender is not authorized to perform the
///   transfer.
/// * `Error::Custom(CustomContractError::PausedToken)` - The token is paused.
/// * `Error::InsufficientFunds` - The sender does not have enough tokens.
/// * `Error::Custom(CustomContractError::UnVerifiedIdentity)` - The receiver's
///   identity is not verified.
/// * `Error::Custom(CustomContractError::InCompliantTransfer)` - The transfer
///   is not compliant.
/// * `Error::Custom(CustomContractError::LogError)` - The logger failed to log
///   the event.
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
    let compliance = ComplianceContract(state.compliance());

    for Transfer {
        to,
        from,
        amount,
        token_id,
        data,
    } in transfers
    {
        let compliance_token = Token::new(token_id, ctx.self_address());
        let state = host.state();
        state.ensure_token_exists(&token_id)?;
        state.ensure_not_recovered(&to.address())?;
        state.ensure_not_paused(&token_id)?;
        state.ensure_has_sufficient_unfrozen_balance(&from, &token_id, &amount)?;
        ensure!(
            IdentityRegistryContract(state.identity_registry()).is_verified(host, &to.address())?,
            Error::UnVerifiedIdentity
        );
        ensure!(
            compliance.can_transfer(host, compliance_token, from, to.address(), amount)?,
            Error::InCompliantTransfer
        );

        let is_authorized =
            // Sender is the Owner of the token
            from.eq(&sender)
            // Sender is an operator of the owner
            || state.is_operator(&from, &sender)
            // Sender is the sponsor (CIS3) of the transaction 
            || state.is_sponsor(&sender);

        ensure!(is_authorized, Error::Unauthorized);

        let (state, state_builder) = host.state_and_builder();
        state.transfer(from, to.address(), token_id, amount, state_builder)?;
        compliance.transferred(host, compliance_token, from, to.address(), amount)?;

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

/// Forces the transfer of a specific amount of tokens from one verified account
/// to another verified. This function can be called by a trusted agent.
/// This function can be used to transfer tokens that are not compliant.
///
/// # Returns
///
/// Returns `ContractResult<()>` indicating the success or failure of the
/// operation.
///
/// # Errors
///
/// This method will return an error if:
/// * `concordium_std::ParseError` - The parameter cursor cannot parse the
///   `TransferParams`.
/// * `Error::Unauthorized` - The sender is not authorized to perform the
///   transfer. Sender is not an agent.
/// * `Error::Custom(CustomContractError::PausedToken)` - The token is paused.
/// * `Error::InsufficientFunds` - The sender does not have enough tokens.
/// * `Error::Custom(CustomContractError::UnVerifiedIdentity)` - The receiver's
///   identity is not verified.
/// * `Error::Custom(CustomContractError::LogError)` - The logger failed to log
///   the event.
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
    ensure!(state.is_agent(&ctx.sender()), Error::Unauthorized);

    for Transfer {
        to,
        from,
        amount,
        token_id,
        data,
    } in transfers
    {
        let state = host.state();
        state.ensure_token_exists(&token_id)?;
        state.ensure_not_recovered(&to.address())?;
        state.ensure_not_paused(&token_id)?;
        // Only the balance is checked. The frozen balance is not checked.
        state.ensure_has_sufficient_balance(&from, &token_id, &amount)?;
        ensure!(
            IdentityRegistryContract(state.identity_registry()).is_verified(host, &to.address())?,
            Error::UnVerifiedIdentity
        );

        let (state, state_builder) = host.state_and_builder();
        state.transfer(from, to.address(), token_id, amount, state_builder)?;
        // Adjust the frozen balance of the sender.
        state.adjust_frozen_balance(from, token_id)?;
        ComplianceContract(host.state().compliance()).transferred(
            host,
            Token::new(token_id, ctx.self_address()),
            from,
            to.address(),
            amount,
        )?;

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
