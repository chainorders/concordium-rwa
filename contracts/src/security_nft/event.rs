use concordium_cis2::{Cis2Event, IsTokenAmount, IsTokenId};
use concordium_std::{schema::SchemaType, *};

use super::types::{TokenAmount, TokenId};
/// Represents an event that is triggered when an agent is updated (Added / Removed).
#[derive(Serialize, SchemaType)]
pub struct AgentUpdatedEvent {
    pub agent: Address,
}

/// Represents the event when tokens are frozen / un frozen.
#[derive(Serialize, SchemaType)]
pub struct TokensFrozen<T: IsTokenId + SchemaType, A: IsTokenAmount + SchemaType> {
    pub token_id: T,
    pub amount: A,
    pub address: Address,
}

/// Represents the event when a token is paused / unpaused.
#[derive(Serialize, SchemaType)]
pub struct Paused<T: IsTokenId + SchemaType> {
    pub token_id: T,
}

/// Represents the event when an identity registry is added.
#[derive(Serialize, SchemaType)]
#[concordium(transparent)]
pub struct IdentityRegistryAdded(pub ContractAddress);

/// Represents the event when compliance is added.
#[derive(Serialize, SchemaType)]
#[concordium(transparent)]
pub struct ComplianceAdded(pub ContractAddress);

/// Represents an event for recovering a lost account.
#[derive(Serialize, SchemaType)]
pub struct RecoverEvent {
    /// The address of the lost account.
    pub lost_account: Address,
    /// The address of the new account.
    pub new_account: Address,
}

#[derive(Serialize, SchemaType)]
#[concordium(repr(u8))]
pub enum Event {
    /// Event triggered when an account is recovered.
    #[concordium(tag = 242)]
    Recovered(RecoverEvent),

    /// Event triggered when an identity registry is added.
    #[concordium(tag = 243)]
    IdentityRegistryAdded(IdentityRegistryAdded),

    /// Event triggered when compliance is added.
    #[concordium(tag = 244)]
    ComplianceAdded(ComplianceAdded),

    /// Event triggered when a token is unpaused.
    #[concordium(tag = 245)]
    UnPaused(Paused<TokenId>),

    /// Event triggered when a token is paused.
    #[concordium(tag = 246)]
    Paused(Paused<TokenId>),

    /// Event triggered when tokens are frozen.
    #[concordium(tag = 247)]
    TokensFrozen(TokensFrozen<TokenId, TokenAmount>),

    /// Event triggered when tokens are unfrozen.
    #[concordium(tag = 248)]
    TokensUnFrozen(TokensFrozen<TokenId, TokenAmount>),

    /// Event triggered when an agent is removed.
    #[concordium(tag = 249)]
    AgentRemoved(AgentUpdatedEvent),

    /// Event triggered when an agent is added.
    #[concordium(tag = 250)]
    AgentAdded(AgentUpdatedEvent),

    /// Event forwarded from the CIS2 contract.
    #[concordium(forward = cis2_events)]
    Cis2(Cis2Event<TokenId, TokenAmount>),
}
