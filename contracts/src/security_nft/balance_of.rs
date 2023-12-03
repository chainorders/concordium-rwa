use concordium_cis2::*;
use concordium_std::*;

use super::{error::*, state::State, types::*};

#[receive(
    contract = "rwa_security_nft",
    name = "balanceOf",
    parameter = "BalanceOfQueryParams<TokenId>",
    return_value = "BalanceOfQueryResponse<TokenAmount>",
    error = "super::error::Error"
)]
pub fn balance_of(
    ctx: &ReceiveContext,
    host: &Host<State>,
) -> ContractResult<BalanceOfQueryResponse<TokenAmount>> {
    let BalanceOfQueryParams {
        queries,
    }: BalanceOfQueryParams<TokenId> = ctx.parameter_cursor().get()?;
    let state = host.state();

    let mut res = Vec::with_capacity(queries.len());
    for BalanceOfQuery {
        token_id,
        address,
    } in queries
    {
        ensure!(state.token_exists(&token_id), Error::InvalidTokenId);

        if state.has_balance(&token_id, &address) {
            res.push(TOKEN_AMOUNT_1)
        } else {
            res.push(TOKEN_AMOUNT_0)
        }
    }

    Ok(BalanceOfQueryResponse(res))
}
