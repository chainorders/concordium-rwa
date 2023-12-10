use concordium_cis2::*;
use concordium_std::*;

use crate::utils::{holders_state::HasHoldersState, tokens_state::HasTokensState};

use super::{state::State, types::*};

// Returns the balance of the given token for the given addresses.
///
/// # Returns
///
/// Returns `ContractResult<BalanceOfQueryResponse<TokenAmount>>` containing the balance of the given token for the given addresses.
///
/// # Errors
///
/// Returns `Error::TokenDoesNotExist` if the token does not exist.
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
    let res: Result<Vec<_>, _> = queries
        .iter()
        .map(|q| {
            state
                .tokens_state()
                .ensure_token_exists(&q.token_id)
                .and_then(|_| Ok(state.holders_state().balance_of(&q.address, &q.token_id)))
        })
        .collect();

    Ok(BalanceOfQueryResponse(res?))
}
