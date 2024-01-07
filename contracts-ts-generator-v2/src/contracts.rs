use concordium_std::schema::Type;

#[derive(Clone)]
pub struct ContractInitMethod {
    pub module_reference: String,
    pub request:          Option<Type>,
    pub error:            Option<Type>,
}

#[derive(Clone)]
pub struct ContractReceiveMethod {
    pub name:       String,
    pub request:    Option<Type>,
    pub response:   Option<Type>,
    pub error:      Option<Type>,
    pub is_mutable: bool,
}

#[derive(Clone)]
pub struct Contract {
    pub name:            String,
    pub receive_methods: Vec<ContractReceiveMethod>,
    pub init_method:     ContractInitMethod,
    pub event_type:      Option<Type>,
}