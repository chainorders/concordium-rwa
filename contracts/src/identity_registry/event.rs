use concordium_std::*;

use super::types::Issuer;

/// Represents an event that is triggered when an identity is updated.
#[derive(Serialize, SchemaType)]
#[concordium(transparent)]
pub struct IdentityUpdatedEvent {
    /// The address associated with the identity.
    pub address: Address,
}

/// Represents an event that is triggered when an issuer is updated.
#[derive(Serialize, SchemaType)]
#[concordium(transparent)]
pub struct IssuerUpdatedEvent {
    /// The issuer that was updated.
    pub issuer: Issuer,
}

/// Represents an event that is triggered when an identity attribute is updated.
#[derive(Serialize, SchemaType)]
pub struct IdentityAttributeUpdatedEvent {}

/// Represents an event that is triggered when an agent is updated (Added /
/// Removed).
#[derive(Serialize, SchemaType)]
pub struct AgentUpdatedEvent {
    /// The agent that was updated.
    pub agent: Address,
}

/// Represents the different types of events that can be triggered in the
/// contract.
#[derive(Serialize, SchemaType)]
#[concordium(repr(u8))]
pub enum Event {
    /// Triggered when a new identity is registered.
    IdentityRegistered(IdentityUpdatedEvent),
    /// Triggered when an existing identity is updated.
    IdentityUpdated(IdentityUpdatedEvent),
    /// Triggered when an identity is removed.
    IdentityRemoved(IdentityUpdatedEvent),
    /// Triggered when an attribute of an identity is updated.
    IdentityAttributeUpdated(IdentityAttributeUpdatedEvent),
    /// Triggered when a new issuer is added.
    IssuerAdded(IssuerUpdatedEvent),
    /// Triggered when an issuer is removed.
    IssuerRemoved(IssuerUpdatedEvent),
    /// Triggered when a new agent is added.
    AgentAdded(AgentUpdatedEvent),
    /// Triggered when an agent is removed.
    AgentRemoved(AgentUpdatedEvent),
}
