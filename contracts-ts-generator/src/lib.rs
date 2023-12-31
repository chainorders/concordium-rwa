use std::collections::HashMap;

use concordium_std::schema::{Fields, Type};
use proc_macro2::TokenStream;
use quote::quote;

pub fn get_ts_type(concordium_type: &Type) -> TokenStream {
    match concordium_type {
        Type::Unit => quote! {},
        Type::Bool => quote! {boolean},
        Type::U8 => quote! {number},
        Type::U16 => quote! {number},
        Type::U32 => quote! {number},
        Type::U64 => quote! {bigint},
        Type::U128 => quote! {bigint},
        Type::I8 => quote! {number},
        Type::I16 => quote! {number},
        Type::I32 => quote! {number},
        Type::I64 => quote! {bigint},
        Type::I128 => quote! {bigint},
        Type::Amount => quote! {string},
        Type::AccountAddress => quote! {string},
        Type::ContractAddress => quote! {{index: number, subindex: number}},
        Type::Timestamp => quote! {string},
        Type::Duration => quote! {string},
        Type::Pair(x, y) => {
            let x_type = get_ts_type(x);
            let y_type = get_ts_type(y);
            quote! {[#x_type, #y_type]}
        }
        Type::List(_, x) => {
            let x_type = get_ts_type(x);
            quote! {#x_type[]}
        }
        Type::Set(_, x) => {
            let x_type = get_ts_type(x);
            quote! {#x_type[]}
        }
        Type::Map(_, k, v) => {
            let k_type = get_ts_type(k);
            let v_type = get_ts_type(v);
            quote! {[][#k_type, #v_type]}
        }
        Type::Array(_, a) => {
            let a_type = get_ts_type(a);
            quote! {#a_type[]}
        }
        Type::Struct(fields) => match fields {
            Fields::Named(fields) => {
                let field_code: Vec<_> = fields
                    .iter()
                    .map(|(name, ty)| {
                        let name = name.to_string();
                        let ty = get_ts_type(ty);
                        quote! {#name: #ty}
                    })
                    .collect();
                quote! {{#(#field_code),*}}
            }
            Fields::Unnamed(fields) => {
                let field_code: Vec<_> = fields.iter().map(get_ts_type).collect();
                quote! {[#(#field_code),*]}
            }
            Fields::None => quote! {Record<string, never>},
        },
        Type::Enum(enum_fields) => {
            let field_code: Vec<_> = enum_fields
                .iter()
                .map(|(name, ty)| {
                    let name = name.to_string();
                    let ty = get_ts_type(&Type::Struct(ty.clone()));
                    quote! {{#name: #ty}}
                })
                .collect();
            quote! {#(#field_code)|*}
        }
        Type::String(_) => quote! {string},
        Type::ContractName(_) => quote! {string},
        Type::ReceiveName(_) => quote! {string},
        Type::ULeb128(_) => quote! {string},
        Type::ILeb128(_) => quote! {string},
        Type::ByteList(_) => quote! {string},
        Type::ByteArray(_) => quote! {string},
        Type::TaggedEnum(_) => panic!("Tagged enums are not supported"),
    }
}

pub fn generate_typescript_types(types: &HashMap<String, Type>) -> TokenStream {
    let type_ts_codes = types
        .iter()
        .map(|(name, ty)| {
            let name = quote::format_ident!("{}SchemaJson", name);
            let ty = get_ts_type(ty);
            quote! {export type #name = #ty;}
        })
        .collect::<Vec<_>>();
    quote! {#(#type_ts_codes)*}
}

#[cfg(test)]
mod tests {
    use std::{collections::HashMap, fs};

    use concordium_rwa_compliance::{
        compliance::init::InitParams as ComplianceInitParams,
        compliance_modules::allowed_nationalities::{
            init::InitParams as ComplianceModuleAllowedNationalitiesInitParams,
            types::{TokenAmount, TokenId},
        },
    };
    use concordium_rwa_identity_registry::{
        error::Error as IdentityRegistryError,
        identities::{DeleteIdentitiesParams, RegisterIdentitiesParams},
        types::Identity,
    };
    use concordium_rwa_utils::compliance_types::CanTransferParam;
    use concordium_std::{
        schema::{SchemaType, Type},
        Address, ContractAddress,
    };

    #[test]
    fn it_works() {
        let mut types: HashMap<String, Type> = HashMap::new();
        types.insert("ContractAddress".to_owned(), ContractAddress::get_type());
        types.insert("Address".to_owned(), Address::get_type());
        types.insert("IdentityRegistryError".to_owned(), IdentityRegistryError::get_type());
        types.insert("IdentityRegistryIdentity".to_owned(), Identity::get_type());
        types.insert("IdentityRegistryIdentities".to_owned(), Vec::<Identity>::get_type());
        types.insert(
            "IdentityRegistryRegisterIdentitiesParams".to_owned(),
            RegisterIdentitiesParams::get_type(),
        );
        types.insert(
            "IdentityRegistryDeleteIdentitiesParams".to_owned(),
            DeleteIdentitiesParams::get_type(),
        );
        //-------
        types.insert(
            "ComplianceModuleAllowedNationalitiesInitParams".to_owned(),
            ComplianceModuleAllowedNationalitiesInitParams::get_type(),
        );
        types.insert(
            "ComplianceCanTransferParams".to_owned(),
            CanTransferParam::<TokenId, TokenAmount>::get_type(),
        );
        //----
        types.insert("ComplianceInitParams".to_owned(), ComplianceInitParams::get_type());
        let output = super::generate_typescript_types(&types);

        println!("output: {:?}", output.to_string());
        fs::write("../frontend/src/lib/ts-types.ts", output.to_string()).unwrap();
    }
}
