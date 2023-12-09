use concordium_std::*;

#[derive(Serial, Reject, SchemaType)]
pub enum Error {
    ParseError,
    LogError,
}
