use concordium_std::*;

#[derive(Serialize, SchemaType)]
pub struct IdentityRegisteredEvent {}

#[derive(Serialize, SchemaType)]
pub struct IdentityRemovedEvent {}

#[derive(Serialize, SchemaType)]
pub struct IssuerAddedEvent {}

#[derive(Serialize, SchemaType)]
pub struct IssuerRemovedEvent {}

#[derive(Serialize, SchemaType)]
pub struct IdentityAttributeUpdatedEvent {}

#[derive(Serialize, SchemaType)]
#[concordium(repr(u8))]
pub enum Event {
    IdentityRegistered(IdentityRegisteredEvent),
    IdentityRemoved(IdentityRemovedEvent),
    IdentityAttributeUpdated(IdentityAttributeUpdatedEvent),
    IssuerAdded(IssuerAddedEvent),
    IssuerRemoved(IssuerRemovedEvent),
}
