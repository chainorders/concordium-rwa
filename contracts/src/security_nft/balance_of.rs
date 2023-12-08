use concordium_cis2::*;
use concordium_std::*;

use crate::utils::tokens_state::HasTokensState;

use super::{state::State, types::*};

#[receive(
    contract = "rwa_security_nft",
    name = "balanceOf",
    parameter = "BalanceOfQueryParams<TokenId>",
    return_value = "BalanceOfQueryResponse<TokenAmount>",
    error = "super::error::Error"
)]
/// Returns the balance of the given token for the given addresses.
pub fn balance_of(
    ctx: &ReceiveContext,
    host: &Host<State>,
) -> ContractResult<BalanceOfQueryResponse<TokenAmount>> {
    let BalanceOfQueryParams {
        queries,
    }: BalanceOfQueryParams<TokenId> = ctx.parameter_cursor().get()?;
    let state = host.state().tokens_state();
    let res: Result<Vec<_>, _> =
        queries.iter().map(|q| state.balance_of(&q.token_id, &q.address)).collect();

    Ok(BalanceOfQueryResponse(res?))
}
