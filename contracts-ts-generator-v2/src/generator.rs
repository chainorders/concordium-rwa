use base64::{engine::general_purpose, Engine as _};
use concordium_std::{
    schema::{Fields, Type},
    Cursor, Serial,
};
use convert_case::{Case, Casing};
use proc_macro2::TokenStream;
use quote::{format_ident, quote};

use crate::contracts::Contract;

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
            quote! {[#k_type, #v_type][]}
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
        Type::TaggedEnum(tags) => {
            let field_code: Vec<_> = tags
                .iter()
                .map(|(_, (name, fields))| {
                    let name = name.to_string();
                    let ty = get_ts_type(&Type::Struct(fields.clone()));
                    quote! {{#name: #ty}}
                })
                .collect();
            quote! {#(#field_code)|*}
        }
    }
}

fn get_schema_string(ty: &Type) -> String {
    let mut ty_bytes = Vec::<u8>::new();
    let mut cursor = Cursor::new(&mut ty_bytes);
    ty.serial(&mut cursor).unwrap();
    general_purpose::STANDARD.encode(&ty_bytes)
}

pub fn generated_contract_ts_types(contract: Contract) -> TokenStream {
    let contract_name = format_ident!("{}", contract.name.to_case(Case::Pascal));
    let contract_name_string = contract.name.to_owned();
    let mut method_types = Vec::<TokenStream>::new();
    let mut methods = Vec::<TokenStream>::new();
    let mut entrypoints = Vec::<TokenStream>::new();
    let mut entrypoint_display_names = Vec::<TokenStream>::new();

    {
        let method = contract.init_method;
        let module_reference_string = method.module_reference.to_string().to_owned();
        let method_name = format_ident!("{}", "init");
        let method_type_name = format_ident!("{}", "Init");

        let request = method.request.as_ref().map(get_ts_type);
        let request_schema = method.request.map(|ty| get_schema_string(&ty));

        let name_request = format_ident!("{}Request", method_type_name);
        let name_request_schema = format_ident!("{}RequestSchema", method_type_name);

        match request.is_some() {
            true => {
                method_types.push(quote! {
                    export type #name_request = #request;
                    export const #name_request_schema = #request_schema;
                });
                methods.push(quote! {
                    #method_name: new InitMethod<#name_request>(
                        ModuleReference.fromHexString(#module_reference_string),
                        ContractName.fromString(#contract_name_string),
                        #name_request_schema
                    ),
                })
            }
            false => methods.push(quote! {
                #method_name: new InitMethod<void>(
                    ModuleReference.fromHexString(#module_reference_string),
                    ContractName.fromString(#contract_name_string),
                ),
            }),
        }
    }

    for method in contract.receive_methods {
        let method_name = format_ident!("{}", method.name);
        let method_name_string = method.name.to_owned();
        let method_type_name = format_ident!("{}", method.name.to_case(Case::Pascal));

        let request = method.request.as_ref().map(get_ts_type);
        let request_schema = method.request.map(|ty| get_schema_string(&ty));
        let response = method.response.as_ref().map(get_ts_type);
        let response_schema = method.response.map(|ty| get_schema_string(&ty));

        let name_request = format_ident!("{}Request", method_type_name);
        let name_request_schema = format_ident!("{}RequestSchema", method_type_name);
        let name_response = format_ident!("{}Response", method_type_name);
        let name_response_schema = format_ident!("{}ResponseSchema", method_type_name);

        entrypoints.push(quote! {
            #method_name: EntrypointName.fromString(#method_name_string),
        });

        let method_display_name = method_name_string.to_case(Case::Title);
        entrypoint_display_names.push(quote! {
            #method_name: #method_display_name,
        });
        match (request.is_some(), response.is_some()) {
            (true, true) => {
                method_types.push(quote! {
                    export type #name_request = #request;
                    export const #name_request_schema = #request_schema;
                    export type #name_response = #response;
                    export const #name_response_schema = #response_schema;
                });
                methods.push(quote! {
                    #method_name: new ReceiveMethod<#name_request, #name_response>(
                        ContractName.fromString(#contract_name_string),
                        EntrypointName.fromString(#method_name_string),
                        #name_request_schema,
                        #name_response_schema,
                    ),
                })
            }
            (true, false) => {
                method_types.push(quote! {
                    export type #name_request = #request;
                    export const #name_request_schema = #request_schema;
                });
                methods.push(quote! {
                    #method_name: new ReceiveMethod<#name_request, void>(
                        ContractName.fromString(#contract_name_string),
                        EntrypointName.fromString(#method_name_string),
                        #name_request_schema
                    ),
                })
            }
            (false, true) => {
                method_types.push(quote! {
                    export type #name_response = #response;
                    export const #name_response_schema = #response_schema;
                });
                methods.push(quote! {
                    #method_name: new ReceiveMethod<void, #name_response>(
                        ContractName.fromString(#contract_name_string),
                        EntrypointName.fromString(#method_name_string),
                        undefined,
                        #name_response_schema
                    ),
                })
            }
            (false, false) => methods.push(quote! {
                #method_name: new ReceiveMethod<void, void>(
                    ContractName.fromString(#contract_name_string),
                    EntrypointName.fromString(#method_name_string)
                ),
            }),
        }
    }

    let entrypoint_type = quote! {
        export const ENTRYPOINTS: Record<string, EntrypointName.Type> = {
            #(#entrypoints)*
        };
    };
    let entrypoint_display_name = quote! {
        export const ENTRYPOINT_DISPLAY_NAMES: Record<string, string> = {
            #(#entrypoint_display_names)*
        };
    };
    let event_type = contract.event_type.to_owned().map(|ty| get_ts_type(&ty));
    let event_schema = contract.event_type.map(|ty| get_schema_string(&ty));
    let name_event = format_ident!("{}Event", contract_name);
    let name_event_schema = format_ident!("{}EventSchema", contract_name);

    if event_type.is_some() {
        method_types.push(quote! {
            export type #name_event = #event_type;
            export const #name_event_schema = #event_schema;
            export const deserializeEvent = (event: ContractEvent.Type): #name_event => {
                return ContractEvent.parseWithSchemaTypeBase64(event, #name_event_schema) as #name_event;
            };
        });
    }
    let contract_client = quote! {
        export const #contract_name = {
            #(#methods)*
        }
    };

    quote! {
        import { ContractEvent, ContractName, EntrypointName, ModuleReference } from "@concordium/web-sdk";
        import { InitMethod, ReceiveMethod } from "./GenericContract";
        #(#method_types)*
        #entrypoint_type;
        #entrypoint_display_name;
        #contract_client;
        export default #contract_name;
    }
}
