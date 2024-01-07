use base64::{engine::general_purpose, Engine as _};
use concordium_rwa_compliance::compliance::error;
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

pub fn generated_contract_client(contract: Contract) -> TokenStream {
    let contract_name = format_ident!("{}", contract.name.to_case(Case::Camel));
    let contract_name_string = contract.name.to_owned();
    let mut method_types = Vec::<TokenStream>::new();
    let mut methods = Vec::<TokenStream>::new();
    let mut entrypoints = Vec::<TokenStream>::new();
    let mut entrypoint_display_names = Vec::<TokenStream>::new();

    {
        let method = contract.init_method;
        let module_reference_string = method.module_reference.to_string().to_owned();
        let method_name = format_ident!("{}", "init");
        let method_type_name = format_ident!("{}", "init");
        let method_var_name = format_ident!("{}", "init".to_case(Case::Camel));

        let request_type_code = method.request.as_ref().map(get_ts_type);
        let request_schema = method.request.map(|ty| get_schema_string(&ty));

        let error_type_code = method.error.as_ref().map(get_ts_type);
        let error_schema = method.error.map(|ty| get_schema_string(&ty));

        let name_request = format_ident!("{}Request", method_var_name);
        let name_request_schema = format_ident!("{}RequestSchemaBase64", method_type_name);
        // let name_error = format_ident!("{}Error", method_var_name);
        let name_error_schema = format_ident!("{}ErrorSchemaBase64", method_type_name);

        if request_type_code.is_some() {
            method_types.push(quote! {
                export type #name_request = #request_type_code;
                export const #name_request_schema = #request_schema;
            });
        }

        if error_type_code.is_some() {
            method_types.push(quote! {
                // export type #name_error = #error_type_code;
                export const #name_error_schema = #error_schema;
            });
        }

        match (request_type_code.is_some()) {
            (true) => {
                methods.push(quote! {
                    #method_name: new InitMethod<#name_request>(
                        ModuleReference.fromHexString(#module_reference_string),
                        ContractName.fromString(#contract_name_string),
                        #name_request_schema
                    ),
                });
            }
            (false) => methods.push(quote! {
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
        let method_var_name = format_ident!("{}", method.name.to_case(Case::Camel));

        let request_type_code = method.request.as_ref().map(get_ts_type);
        let request_schema = method.request.map(|ty| get_schema_string(&ty));

        let response_type_code = method.response.as_ref().map(get_ts_type);
        let response_schema = method.response.map(|ty| get_schema_string(&ty));

        let error_type_code = method.error.as_ref().map(get_ts_type);
        let error_schema = method.error.map(|ty| get_schema_string(&ty));

        let name_request = format_ident!("{}Request", method_type_name);
        let name_request_schema = format_ident!("{}RequestSchemaBase64", method_var_name);

        let name_response = format_ident!("{}Response", method_type_name);
        let name_response_schema = format_ident!("{}ResponseSchemaBase64", method_var_name);

        let name_error = format_ident!("{}Error", method_type_name);
        let name_error_schema = format_ident!("{}ErrorSchemaBase64", method_var_name);

        entrypoints.push(quote! {
            #method_name: EntrypointName.fromString(#method_name_string),
        });

        let method_display_name = method_name_string.to_case(Case::Title);
        entrypoint_display_names.push(quote! {
            #method_name: #method_display_name,
        });

        if error_type_code.is_some() {
            method_types.push(quote! {
                export type #name_error = #error_type_code;
                export const #name_error_schema = #error_schema;
            });
        }

        if request_type_code.is_some() {
            method_types.push(quote! {
                export type #name_request = #request_type_code;
                export const #name_request_schema = #request_schema;
            });
        }

        if response_type_code.is_some() {
            method_types.push(quote! {
                export type #name_response = #response_type_code;
                export const #name_response_schema = #response_schema;
            });
        }

        match (request_type_code.is_some(), response_type_code.is_some(), error_type_code.is_some())
        {
            (true, true, true) => methods.push(quote! {
                #method_name: new ReceiveMethod<#name_request, #name_response, #name_error>(
                    ContractName.fromString(#contract_name_string),
                    EntrypointName.fromString(#method_name_string),
                    #name_request_schema,
                    #name_response_schema,
                    #name_error_schema
                ),
            }),
            (true, true, false) => methods.push(quote! {
                #method_name: new ReceiveMethod<#name_request, #name_response>(
                    ContractName.fromString(#contract_name_string),
                    EntrypointName.fromString(#method_name_string),
                    #name_request_schema,
                    #name_response_schema,
                ),
            }),
            (true, false, false) => methods.push(quote! {
                #method_name: new ReceiveMethod<#name_request>(
                    ContractName.fromString(#contract_name_string),
                    EntrypointName.fromString(#method_name_string),
                    #name_request_schema
                ),
            }),
            (true, false, true) => methods.push(quote! {
                #method_name: new ReceiveMethod<#name_request, never, #name_error>(
                    ContractName.fromString(#contract_name_string),
                    EntrypointName.fromString(#method_name_string),
                    #name_request_schema,
                    undefined,
                    #name_error_schema
                ),
            }),
            (false, true, false) => methods.push(quote! {
                #method_name: new ReceiveMethod<void, #name_response>(
                    ContractName.fromString(#contract_name_string),
                    EntrypointName.fromString(#method_name_string),
                    undefined,
                    #name_response_schema
                ),
            }),
            (false, true, true) => methods.push(quote! {
                #method_name: new ReceiveMethod<never, #name_response, #name_error>(
                    ContractName.fromString(#contract_name_string),
                    EntrypointName.fromString(#method_name_string),
                    undefined,
                    #name_response_schema,
                    #name_error_schema
                ),
            }),
            (false, false, false) => methods.push(quote! {
                #method_name: new ReceiveMethod<void, void>(
                    ContractName.fromString(#contract_name_string),
                    EntrypointName.fromString(#method_name_string)
                ),
            }),
            (false, false, true) => methods.push(quote! {
                #method_name: new ReceiveMethod<never, never, #name_error>(
                    ContractName.fromString(#contract_name_string),
                    EntrypointName.fromString(#method_name_string),
                    undefined,
                    undefined,
                    #name_error_schema
                ),
            }),
        }
    }

    let entrypoints = quote! {
        export const ENTRYPOINTS: Record<string, EntrypointName.Type> = {
            #(#entrypoints)*
        };
    };
    let entrypoint_display_names = quote! {
        export const ENTRYPOINT_DISPLAY_NAMES: Record<string, string> = {
            #(#entrypoint_display_names)*
        };
    };
    let event_type = contract.event_type.to_owned().map(|ty| get_ts_type(&ty));
    let event_schema = contract.event_type.map(|ty| get_schema_string(&ty));
    let name_event = format_ident!("{}", "Event".to_case(Case::Camel));
    let name_event_schema = format_ident!("{}", "EventSchemaBase64".to_case(Case::Camel));

    if event_type.is_some() {
        method_types.push(quote! {
            export type #name_event = #event_type;
            export const #name_event_schema = #event_schema;
        });
    }
    let contract_client = quote! {
        export const #contract_name = {
            #(#methods)*
            deserializeEvent: (event: ContractEvent.Type): #name_event => {
                return ContractEvent.parseWithSchemaTypeBase64(event, #name_event_schema) as #name_event;
            }
        }
    };

    quote! {
        import { ContractEvent, ContractName, EntrypointName, ModuleReference } from "@concordium/web-sdk";
        import { InitMethod, ReceiveMethod } from "./GenericContract";
        export const CONTRACT_NAME = #contract_name_string;
        #(#method_types)*
        #entrypoints;
        #entrypoint_display_names;
        #contract_client;
        export default #contract_name;
    }
}
