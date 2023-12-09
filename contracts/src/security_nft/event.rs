use concordium_cis2::{Cis2Event, IsTokenAmount, IsTokenId};
use concordium_std::{schema::SchemaType, *};

use super::types::{TokenAmount, TokenId};

#[derive(Serialize, SchemaType)]
pub struct AgentUpdatedEvent{
    pub agent: Address,
}

#[derive(Serialize, SchemaType)]
pub struct TokensFrozen<T: IsTokenId + SchemaType, A: IsTokenAmount + SchemaType> {
    pub token_id: T,
    pub amount: A,
    pub address: Address,
}

#[derive(Serialize, SchemaType)]
pub struct Paused<T: IsTokenId + SchemaType> {
    pub token_id: T,
}

#[derive(Serialize, SchemaType)]
#[concordium(repr(u8))]
pub enum Event {
    #[concordium(tag = 245)]
    UnPaused(Paused<TokenId>),
    #[concordium(tag = 246)]
    Paused(Paused<TokenId>),
    #[concordium(tag = 247)]
    TokensFrozen(TokensFrozen<TokenId, TokenAmount>),
    #[concordium(tag = 248)]
    TokensUnFrozen(TokensFrozen<TokenId, TokenAmount>),
    #[concordium(tag = 249)]
    AgentRemoved(AgentUpdatedEvent),
    #[concordium(tag = 250)]
    AgentAdded(AgentUpdatedEvent),
    #[concordium(forward = cis2_events)]
    Cis2(Cis2Event<TokenId, TokenAmount>),
}
