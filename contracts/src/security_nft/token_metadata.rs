use concordium_cis2::{TokenMetadataQueryParams, TokenMetadataQueryResponse};
use concordium_std::*;

use super::{
    error::Error,
    state::State,
    types::{ContractResult, TokenId},
};

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

    let state = host.state();
    let mut res = Vec::with_capacity(queries.len());
    for token_id in queries {
        match state.token_metadata(&token_id) {
            Some(metadata_url) => res.push(metadata_url),
            None => bail!(Error::InvalidTokenId),
        }
    }

    Ok(TokenMetadataQueryResponse(res))
}
