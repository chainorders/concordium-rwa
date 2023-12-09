use concordium_cis2::{
    AdditionalData, Cis2Event, MintEvent, OnReceivingCis2Params, Receiver, TokenAmountU8,
    TokenMetadataEvent,
};
use concordium_std::*;

use crate::utils::{
    agents_state::HasAgentsState, compliance_client::ComplianceClient,
    identity_registry_client::IdentityRegistryClient, tokens_state::HasTokensState,
};

use super::{error::*, event::*, state::State, types::*};

#[derive(Serialize, SchemaType)]
pub struct MintParam {
    pub metadata_url: ContractMetadataUrl,
}

#[derive(Serialize, SchemaType)]
pub struct MintParams {
    pub owner: Receiver,
    pub tokens: Vec<MintParam>,
}

const TOKEN_AMOUNT_1: TokenAmountU8 = TokenAmountU8(1);

/// Mints the given amount of given tokenIds for the given address.
#[receive(
    contract = "rwa_security_nft",
    name = "mint",
    enable_logger,
    mutable,
    parameter = "MintParams",
    error = "super::error::Error"
)]
pub fn mint(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut Logger,
) -> ContractResult<()> {
    let state = host.state_mut();

    // Sender of this transaction should be registered as an agent in the contract
    ensure!(state.agent_state().is_agent(&ctx.sender()), Error::Unauthorized);

    let params: MintParams = ctx.parameter_cursor().get()?;
    let owner_address = params.owner.address();

    // The supposed owner of the Token should be verified to hold the token
    // This includes both KYC verification and VC verification
    let tir = IdentityRegistryClient::new(state.get_identity_registry());
    ensure!(
        tir.is_verified(owner_address)?,
        Error::Custom(CustomContractError::UnVerifiedIdentity)
    );

    let compliance = ComplianceClient::new(state.get_compliance());
    for MintParam {
        metadata_url,
    } in params.tokens
    {
        let metadata_url: MetadataUrl = metadata_url.into();
        let (state, state_builder) = host.state_and_builder();
        let token_id = {
            let token_id = state.get_token_id();
            state.tokens_state_mut().add_token(
                token_id,
                metadata_url.to_owned(),
                vec![(owner_address, TOKEN_AMOUNT_1)],
                state_builder,
            )?;
            state.increment_token_id();

            token_id
        };

        compliance.minted(token_id, owner_address, TOKEN_AMOUNT_1)?;
        logger.log(&Event::Cis2(Cis2Event::Mint(MintEvent {
            token_id,
            amount: TOKEN_AMOUNT_1,
            owner: owner_address,
        })))?;
        logger.log(&Event::Cis2(Cis2Event::TokenMetadata(TokenMetadataEvent {
            token_id,
            metadata_url,
        })))?;

        // If the receiver is a contract: invoke the receive hook function.
        if let Receiver::Contract(address, function) = params.owner.clone() {
            let parameter = OnReceivingCis2Params {
                token_id,
                amount: TOKEN_AMOUNT_1,
                from: ctx.sender(),
                data: AdditionalData::empty(),
            };
            host.invoke_contract(
                &address,
                &parameter,
                function.as_entrypoint_name(),
                Amount::zero(),
            )?;
        }
    }

    Ok(())
}
