use std::{fs, path::Path};

use any_contract::create_contracts;
use client_generator::generated_contract_client_ts_types;
use concordium_base::smart_contracts::WasmModule;
use concordium_std::{schema::VersionedModuleSchema, Cursor, Deserial};
use convert_case::{Case, Casing};
use ui_generator::generated_contract_client_ui_types;

mod any_contract;
mod client_generator;
mod contracts;
pub mod ui_generator;

fn main() {
    let modules: Vec<(String, String)> = vec![
        // (
        //     "contracts/identity-registry/contract.wasm.v1".to_owned(),
        //     "contracts/identity-registry/schema.bin".to_owned(),
        // ),
        // (
        //     "contracts/compliance/contract.wasm.v1".to_owned(),
        //     "contracts/compliance/schema.bin".to_owned(),
        // ),
        (
            "contracts/security-nft/contract.wasm.v1".to_owned(),
            "contracts/security-nft/schema.bin".to_owned(),
        ),
        // (
        //     "contracts/sponsor/contract.wasm.v1".to_owned(),
        //     "contracts/sponsor/schema.bin".to_owned(),
        // ),
    ];
    modules
        .iter()
        .map(|(module_file_path, schema_file_path)| {
            let module_ref: String = get_module_ref_from_module_file(module_file_path);
            let schema: VersionedModuleSchema = get_schema_from_schema_file(schema_file_path);
            (module_ref, schema)
        })
        .flat_map(|(module_ref, module_schema)| create_contracts(module_ref, module_schema))
        .map(|contract| {
            (
                contract.name.to_owned(),
                generated_contract_client_ts_types(contract.to_owned()),
                generated_contract_client_ui_types(contract),
            )
        })
        .for_each(|(name, client_code, ui_code)| {
            fs::write(
                format!("frontend/src/lib/{}.ts", name.to_case(Case::Camel)),
                client_code.to_string(),
            )
            .expect("could not write to file");
            fs::write(
                format!("frontend/src/lib/{}Ui.ts", name.to_case(Case::Camel)),
                ui_code.to_string(),
            )
            .expect("could not write to file");
        })
}

fn get_schema_from_schema_file(schema_file_path: &str) -> VersionedModuleSchema {
    let bytes = fs::read(Path::new(schema_file_path)).expect("could not read schema file");
    let mut cursor = Cursor::new(&bytes);
    VersionedModuleSchema::deserial(&mut cursor).unwrap()
}

fn get_module_ref_from_module_file(module_file_path: &str) -> String {
    WasmModule::from_file(Path::new(module_file_path))
        .expect("could not read module file")
        .get_module_ref()
        .to_string()
}
