use crate::contracts::{Contract, ContractInitMethod, ContractReceiveMethod};
use concordium_std::schema::VersionedModuleSchema;

pub fn create_contracts(module_ref: String, module_schema: VersionedModuleSchema) -> Vec<Contract> {
    let contracts: Vec<Contract> = match module_schema {
        VersionedModuleSchema::V0(v0) => v0
            .contracts
            .iter()
            .map(|(name, contract)| Contract {
                name:            name.to_owned(),
                event_type:      None,
                receive_methods: contract
                    .receive
                    .iter()
                    .map(|(name, method_type)| ContractReceiveMethod {
                        name:       name.to_owned(),
                        error:      None,
                        response:   None,
                        is_mutable: true,
                        request:    Some(method_type.to_owned()),
                    })
                    .collect(),
                init_method:     ContractInitMethod {
                    module_reference: module_ref.to_owned(),
                    request:          contract.init.to_owned(),
                    error:            None,
                },
            })
            .collect(),
        VersionedModuleSchema::V1(v1) => v1
            .contracts
            .iter()
            .map(|(name, contract)| Contract {
                name:            name.to_owned(),
                event_type:      None,
                receive_methods: contract
                    .receive
                    .iter()
                    .map(|(name, method_type)| ContractReceiveMethod {
                        name:       name.to_owned(),
                        error:      None,
                        response:   method_type.return_value().map(|t| t.to_owned()),
                        is_mutable: method_type.return_value().is_none(),
                        request:    method_type.parameter().map(|t| t.to_owned()),
                    })
                    .collect(),
                init_method:     ContractInitMethod {
                    module_reference: module_ref.to_owned(),
                    request:          contract
                        .init
                        .to_owned()
                        .map(|i| i.parameter().map(|i| i.to_owned()))
                        .flatten(),
                    error:            None,
                },
            })
            .collect(),
        VersionedModuleSchema::V2(v2) => v2
            .contracts
            .iter()
            .map(|(name, contract)| Contract {
                name:            name.to_owned(),
                event_type:      None,
                receive_methods: contract
                    .receive
                    .iter()
                    .map(|(name, method_type)| ContractReceiveMethod {
                        name:       name.to_owned(),
                        error:      method_type.error().map(|t| t.to_owned()),
                        response:   method_type.return_value().map(|t| t.to_owned()),
                        is_mutable: method_type.return_value().is_none(),
                        request:    method_type.parameter().map(|t| t.to_owned()),
                    })
                    .collect(),
                init_method:     ContractInitMethod {
                    module_reference: module_ref.to_owned(),
                    request:          contract
                        .init
                        .to_owned()
                        .map(|i| i.parameter().map(|i| i.to_owned()))
                        .flatten(),
                    error:            contract
                        .init
                        .to_owned()
                        .map(|i| i.error().map(|i| i.to_owned()))
                        .flatten(),
                },
            })
            .collect(),
        VersionedModuleSchema::V3(v3) => v3
            .contracts
            .iter()
            .map(|(name, contract)| Contract {
                name:            name.to_owned(),
                event_type:      contract.event().map(|t| t.to_owned()),
                receive_methods: contract
                    .receive
                    .iter()
                    .map(|(name, method_type)| ContractReceiveMethod {
                        name:       name.to_owned(),
                        error:      method_type.error().map(|t| t.to_owned()),
                        response:   method_type.return_value().map(|t| t.to_owned()),
                        is_mutable: method_type.return_value().is_none(),
                        request:    method_type.parameter().map(|t| t.to_owned()),
                    })
                    .collect(),
                init_method:     ContractInitMethod {
                    module_reference: module_ref.to_owned(),
                    request:          contract
                        .init
                        .to_owned()
                        .map(|i| i.parameter().map(|i| i.to_owned()))
                        .flatten(),
                    error:            contract
                        .init
                        .to_owned()
                        .map(|i| i.error().map(|i| i.to_owned()))
                        .flatten(),
                },
            })
            .collect(),
    };

    contracts
}
