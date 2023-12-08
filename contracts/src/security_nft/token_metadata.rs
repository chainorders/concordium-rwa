use concordium_cis2::{TokenMetadataQueryParams, TokenMetadataQueryResponse};
use concordium_std::*;

use crate::utils::tokens_state::HasTokensState;

use super::{
    state::State,
    types::{ContractResult, TokenId},
};

/// Retrieves the metadata for a token.
#[receive(
    contract = "rwa_security_nft",
    name = "tokenMetadata",
    parameter = "TokenMetadataQueryParams<TokenId>",
    return_value = "TokenMetadataQueryResponse",
    error = "super::error::Error"
)]
pub fn token_metadata(
    ctx: &ReceiveContext,
    host: &Host<State>,
) -> ContractResult<TokenMetadataQueryResponse> {
    let TokenMetadataQueryParams {
        queries,
    }: TokenMetadataQueryParams<TokenId> = ctx.parameter_cursor().get()?;

    let state = host.state().tokens_state();
    let res: Result<Vec<_>, _> = queries.iter().map(|q| state.token_metadata_url(&q)).collect();

    Ok(TokenMetadataQueryResponse(res?))
}
