use concordium_std::schema::{Fields, Type};
use convert_case::{Case, Casing};
use proc_macro2::TokenStream;
use quote::{format_ident, quote};

use crate::contracts::Contract;

pub fn generated_contract_ui_types(contract: Contract) -> TokenStream {
    let contract_name = format_ident!("{}", contract.name.to_case(Case::Camel));
    let mut methods = Vec::<TokenStream>::new();
    let mut entrypoints = Vec::<TokenStream>::new();

    let init_code = {
        //Init Method
        let method_name = format_ident!("init");
        let method_name_str = method_name.to_string();
        let method_type_name = method_name_str;
        let method_var_name = format_ident!("init");

        let request_json_schema_type_name = format_ident!("{}RequestJsonSchema", method_var_name);
        let request_ui_type_name = format_ident!("{}RequestUi", method_type_name);
        let request_ui_code = contract.init_method.request.as_ref().map(|t| get_ui_code(&t));
        let request_json_schema_code = contract
            .init_method
            .request
            .as_ref()
            .map(|t| get_json_schema_code(t, &format!("{} Request", method_type_name)));
        if request_ui_code.is_some() {
            methods.push(quote! {
                export const #request_json_schema_type_name: RJSFSchema = #request_json_schema_code;
                export type #request_ui_type_name = #request_ui_code;
            });
        }

        let error_json_schema_type_name = format_ident!("{}ErrorJsonSchema", method_var_name);
        let error_ui_type_name = format_ident!("{}ErrorUi", method_type_name);
        let error_ui_code = contract.init_method.error.as_ref().map(|t| get_ui_code(&t));
        let error_json_schema_code = contract
            .init_method
            .error
            .as_ref()
            .map(|t| get_json_schema_code(t, &format!("{} Error", method_type_name)));
        if error_ui_code.is_some() {
            methods.push(quote! {
                export const #error_json_schema_type_name: RJSFSchema = #error_json_schema_code;
                export type #error_ui_type_name = #error_ui_code;
            });
        }

        let entrypoint_code = {
            let request_type_name = request_ui_code
                .as_ref()
                .map(|_| format_ident!("{}Request", method_type_name))
                .unwrap_or(format_ident!("never"));
            let request_schema_base64_type_name = request_ui_code
                .is_some()
                .then(|| format_ident!("{}RequestSchemaBase64", method_var_name))
                .unwrap_or(format_ident!("undefined"));
            /* let error_type_name = error_ui_code
            .as_ref()
            .map(|_| format_ident!("{}Error", method_type_name))
            .unwrap_or(format_ident!("never")); */
            /*           let error_schema_base64_type_name = error_ui_code
            .is_some()
            .then(|| format_ident!("{}ErrorSchemaBase64", method_var_name))
            .unwrap_or(format_ident!("undefined")); */

            match request_ui_code.is_some() {
                true => {
                    quote! {(props: { onInitialize: (contract: ContractAddress.Type) => void }) =>
                            GenericInit<
                                types.#request_type_name,
                                #request_ui_type_name,
                            >({
                                onContractInitialized: props.onInitialize,
                                method: client.#method_name,
                                requestJsonSchema: #request_json_schema_type_name,
                                requestSchemaBase64: types.#request_schema_base64_type_name,
                            })
                    }
                }
                false => quote! {
                    (props: { onInitialize: (contract: ContractAddress.Type) => void }) =>
                        GenericInit<
                            never,
                            never,
                        >({
                            onContractInitialized: props.onInitialize,
                            method: client.#method_name,
                        })
                },
            }
        };

        quote! {
            export const #method_name = #entrypoint_code;
        }
    };

    for method in contract.receive_methods {
        let method_name = format_ident!("{}", method.name);
        let method_name_str = method.name.to_owned();
        let method_type_name = method_name_str.to_case(Case::Pascal);
        let method_var_name = format_ident!("{}", method.name.to_case(Case::Camel));

        let request_json_schema_type_name = format_ident!("{}RequestJsonSchema", method_var_name);
        let request_ui_type_name = format_ident!("{}RequestUi", method_type_name);
        let request_ui_code = method.request.as_ref().map(|t| get_ui_code(&t));
        let request_json_schema_code = method
            .request
            .as_ref()
            .map(|t| get_json_schema_code(t, &format!("{} Request", method_type_name)));
        if request_ui_code.is_some() {
            methods.push(quote! {
                export const #request_json_schema_type_name: RJSFSchema = #request_json_schema_code;
                export type #request_ui_type_name = #request_ui_code;
            });
        }

        let response_json_schema_type_name = format_ident!("{}ResponseJsonSchema", method_var_name);
        let response_ui_type_name = format_ident!("{}ResponseUi", method_type_name);
        let response_ui_code = method.response.as_ref().map(|t| get_ui_code(&t));
        let response_json_schema_code = method
            .response
            .as_ref()
            .map(|t| get_json_schema_code(t, &format!("{} Response", method_type_name)));
        if response_ui_code.is_some() {
            methods.push(quote! {
                export const #response_json_schema_type_name: RJSFSchema = #response_json_schema_code;
                export type #response_ui_type_name = #response_ui_code;
            });
        }

        let error_json_schema_type_name = format_ident!("{}ErrorJsonSchema", method_var_name);
        let error_ui_type_name = format_ident!("{}ErrorUi", method_type_name);
        let error_ui_code = method.error.as_ref().map(|t| get_ui_code(&t));
        let error_json_schema_code = method
            .error
            .as_ref()
            .map(|t| get_json_schema_code(t, &format!("{} Error", method_type_name)));
        if error_ui_code.is_some() {
            methods.push(quote! {
                export const #error_json_schema_type_name: RJSFSchema = #error_json_schema_code;
                export type #error_ui_type_name = #error_ui_code;
            });
        }

        let entrypoint_code = {
            let request_type_name = request_ui_code
                .as_ref()
                .map(|_| format_ident!("{}Request", method_type_name))
                .unwrap_or(format_ident!("never"));
            let request_schema_base64_type_name = request_ui_code
                .is_some()
                .then(|| format_ident!("{}RequestSchemaBase64", method_var_name))
                .unwrap_or(format_ident!("undefined"));
            let response_type_name = response_ui_code
                .as_ref()
                .map(|_| format_ident!("{}Response", method_type_name))
                .unwrap_or(format_ident!("never"));
            let response_schema_base64_type_name = response_ui_code
                .is_some()
                .then(|| format_ident!("{}ResponseSchemaBase64", method_var_name))
                .unwrap_or(format_ident!("undefined"));
            let error_type_name = error_ui_code
                .as_ref()
                .map(|_| format_ident!("{}Error", method_type_name))
                .unwrap_or(format_ident!("never"));
            let error_schema_base64_type_name = error_ui_code
                .is_some()
                .then(|| format_ident!("{}ErrorSchemaBase64", method_var_name))
                .unwrap_or(format_ident!("undefined"));

            if method.is_mutable {
                match (request_ui_code.is_some(), error_ui_code.is_some()) {
                    (true, true) => quote! {
                            (props: { contract: ContractAddress.Type }) =>
                            GenericUpdate<
                                types.#request_type_name,
                                #request_ui_type_name,
                                types.#error_type_name,
                                #error_ui_type_name
                            >({
                                contract: props.contract,
                                method: client.#method_name,
                                requestJsonSchema: #request_json_schema_type_name,
                                requestSchemaBase64: types.#request_schema_base64_type_name,
                                errorJsonSchema: #error_json_schema_type_name,
                                errorSchemaBase64: types.#error_schema_base64_type_name,
                            })
                    },
                    (true, false) => quote! {
                            (props: { contract: ContractAddress.Type }) =>
                            GenericUpdate<
                                types.#request_type_name,
                                #request_ui_type_name,
                                never,
                                never
                            >({
                                contract: props.contract,
                                method: client.#method_name,
                                requestJsonSchema: #request_json_schema_type_name,
                                requestSchemaBase64: types.#request_schema_base64_type_name,
                            })
                    },
                    (false, true) => quote! {
                            (props: { contract: ContractAddress.Type }) =>
                            GenericUpdate<
                                never,
                                never,
                                types.#error_type_name,
                                #error_ui_type_name
                            >({
                                contract: props.contract,
                                method: client.#method_name,
                                errorJsonSchema: #error_json_schema_type_name,
                                errorSchemaBase64: types.#error_schema_base64_type_name,
                            })
                    },
                    (false, false) => quote! {
                            (props: { contract: ContractAddress.Type }) =>
                            GenericUpdate<
                                never,
                                never,
                                never,
                                never
                            >({
                                contract: props.contract,
                                method: client.#method_name,
                            })
                    },
                }
            } else {
                match (
                    request_ui_code.is_some(),
                    response_ui_code.is_some(),
                    error_ui_code.is_some(),
                ) {
                    (true, true, true) => quote! {
                            (props: { contract: ContractAddress.Type }) =>
                            GenericInvoke<
                                types.#request_type_name,
                                #request_ui_type_name,
                                types.#response_type_name,
                                #response_ui_type_name,
                                types.#error_type_name,
                                #error_ui_type_name
                            >({
                                contract: props.contract,
                                method: client.#method_name,
                                requestJsonSchema: #request_json_schema_type_name,
                                requestSchemaBase64: types.#request_schema_base64_type_name,
                                responseJsonSchema: #response_json_schema_type_name,
                                responseSchemaBase64: types.#response_schema_base64_type_name,
                                errorJsonSchema: #error_json_schema_type_name,
                                errorSchemaBase64: types.#error_schema_base64_type_name,
                            })
                    },
                    (true, true, false) => quote! {
                            (props: { contract: ContractAddress.Type }) =>
                            GenericInvoke<
                                types.#request_type_name,
                                #request_ui_type_name,
                                types.#response_type_name,
                                #response_ui_type_name,
                                never,
                                never
                            >({
                                contract: props.contract,
                                method: client.#method_name,
                                requestJsonSchema: #request_json_schema_type_name,
                                requestSchemaBase64: types.#request_schema_base64_type_name,
                                responseJsonSchema: #response_json_schema_type_name,
                                responseSchemaBase64: types.#response_schema_base64_type_name,
                            })
                    },
                    (true, false, true) => quote! {
                            (props: { contract: ContractAddress.Type }) =>
                            GenericInvoke<
                                types.#request_type_name,
                                #request_ui_type_name,
                                never,
                                never,
                                types.#error_type_name,
                                #error_ui_type_name
                            >({
                                contract: props.contract,
                                method: client.#method_name,
                                requestJsonSchema: #request_json_schema_type_name,
                                requestSchemaBase64: types.#request_schema_base64_type_name,
                                errorJsonSchema: #error_json_schema_type_name,
                                errorSchemaBase64: types.#error_schema_base64_type_name,
                            })
                    },
                    (true, false, false) => quote! {
                            (props: { contract: ContractAddress.Type }) =>
                            GenericInvoke<
                                types.#request_type_name,
                                #request_ui_type_name,
                                never,
                                never,
                                never,
                                never
                            >({
                                contract: props.contract,
                                method: client.#method_name,
                                requestJsonSchema: #request_json_schema_type_name,
                                requestSchemaBase64: types.#request_schema_base64_type_name,
                            })
                    },
                    (false, true, true) => quote! {
                            (props: { contract: ContractAddress.Type }) =>
                            GenericInvoke<
                                never,
                                never,
                                types.#response_type_name,
                                #response_ui_type_name,
                                types.#error_type_name,
                                #error_ui_type_name
                            >({
                                contract: props.contract,
                                method: client.#method_name,
                                responseJsonSchema: #response_json_schema_type_name,
                                responseSchemaBase64: types.#response_schema_base64_type_name,
                                errorJsonSchema: #error_json_schema_type_name,
                                errorSchemaBase64: types.#error_schema_base64_type_name,
                            })
                    },
                    (false, true, false) => quote! {
                            (props: { contract: ContractAddress.Type }) =>
                            GenericInvoke<
                                never,
                                never,
                                types.#response_type_name,
                                #response_ui_type_name,
                                never,
                                never
                            >({
                                contract: props.contract,
                                method: client.#method_name,
                                responseJsonSchema: #response_json_schema_type_name,
                                responseSchemaBase64: types.#response_schema_base64_type_name,
                            })
                    },
                    (false, false, true) => quote! {
                            (props: { contract: ContractAddress.Type }) =>
                            GenericInvoke<
                                never,
                                never,
                                never,
                                never,
                                types.#error_type_name,
                                #error_ui_type_name
                            >({
                                contract: props.contract,
                                method: client.#method_name,
                                errorJsonSchema: #error_json_schema_type_name,
                                errorSchemaBase64: types.#error_schema_base64_type_name,
                            })
                    },
                    (false, false, false) => quote! {
                            (props: { contract: ContractAddress.Type }) =>
                            GenericInvoke<
                                never,
                                never,
                                never,
                                never,
                                never,
                                never
                            >({
                                contract: props.contract,
                                method: client.#method_name,
                            })
                    },
                }
            }
        };

        entrypoints.push(quote! {
            #method_name: #entrypoint_code,
        });
    }
    let entrypoints = quote! {
        export const ENTRYPOINTS_UI: {
            [key: keyof typeof types.ENTRYPOINTS]: (props: { contract: ContractAddress.Type }) => React.JSX.Element;
        } = {
            #(#entrypoints)*
        };
    };

    let client_file = format!("./{}", contract_name);
    return quote! {
        import { RJSFSchema } from "@rjsf/utils";
        import React from "react";
        import { ContractAddress } from "@concordium/web-sdk";
        import { default as client } from #client_file;
        import * as types from #client_file;
        import { GenericInit, GenericInvoke, GenericUpdate } from "./GenericContractUI";
        #(#methods)*
        #init_code
        #entrypoints
    };
}

// fn get_method_response_ui_code(response: Option<&Type>) -> TokenStream {
//     match response {
//         Some(response) => get_ui_code(response),
//         None => quote! {never},
//     }
// }

// fn get_method_request_ui_code(request: Option<&Type>) -> TokenStream {
//     match request {
//         Some(request) => get_ui_code(request),
//         None => quote! {never},
//     }
// }

// fn get_method_response_json_schema_code(response: Option<&Type>, title:
// &String) -> TokenStream {     match response {
//         Some(response) => get_json_schema_code(response, title),
//         None => quote! {{}},
//     }
// }

// fn get_method_request_json_schema_code(request: Option<&Type>, title:
// &String) -> TokenStream {     match request {
//         Some(request) => get_json_schema_code(request, title),
//         None => quote! {{}},
//     }
// }

fn get_json_schema_code(request: &Type, title: &String) -> TokenStream {
    match request {
        Type::Unit => quote! {{type: "null", title: #title}},
        Type::Bool => quote! {{type: "boolean", title: #title}},
        Type::U8 => quote! {{type: "integer", minimum: 0, maximum: 255, title: #title}},
        Type::U16 => quote! {{type: "integer", minimum: 0, maximum: 65535, title: #title}},
        Type::U32 => quote! {{type: "integer", minimum: 0, maximum: 4294967295, title: #title}},
        Type::U64 => quote! {{type: "integer", minimum: 0, title: #title}},
        Type::U128 => quote! {{type: "integer", minimum: 0, title: #title}},
        Type::I8 => quote! {{type: "integer", minimum: -128, maximum: 127, title: #title}},
        Type::I16 => quote! {{type: "integer", minimum: -32768, maximum: 32767, title: #title}},
        Type::I32 => {
            quote! {{type: "integer", minimum: -2147483648, maximum: 2147483647, title: #title}}
        }
        Type::I64 => quote! {{type: "integer", title: #title}},
        Type::I128 => quote! {{type: "integer", title: #title}},
        Type::Amount => quote! {{type: "string", title: #title}},
        Type::AccountAddress => quote! {{type: "string", title: #title}},
        Type::ContractAddress => {
            quote! {
                {
                    type: "object",
                    title: #title,
                    properties: {
                        index: { type: "integer", minimum: 0},
                        subindex: {type: "integer", minimum: 0}
                    }
                }
            }
        }
        Type::Timestamp => quote! {{type: "string", title: #title}},
        Type::Duration => quote! {{type: "string", title: #title}},
        Type::Pair(t1, t2) => {
            let t1_code = get_json_schema_code(t1, &format!("{} First", title));
            let t2_code = get_json_schema_code(t2, &format!("{} Second", title));
            quote! {{type: "array", items: [#t1_code, #t2_code]}}
        }
        Type::List(_, t) => {
            let list_type = get_json_schema_code(t, &format!("{} List", title));
            quote! {{type: "array", items: #list_type}}
        }
        Type::Set(_, t) => {
            let list_type = get_json_schema_code(t, &format!("{} Set", title));
            quote! {{type: "array", items: #list_type}}
        }
        Type::Map(_, t_key, t_val) => {
            let t1_code = get_json_schema_code(t_key, &format!("{} Key", title));
            let t2_code = get_json_schema_code(t_val, &format!("{} Value", title));
            quote! {{type: "array", items: [#t1_code, #t2_code]}}
        }
        Type::Array(_, t) => {
            let array_type = get_json_schema_code(t, &format!("{} Array", title));
            quote! {{type: "array", items: #array_type}}
        }
        Type::Struct(f) => get_fields_json_schema(f, title),
        Type::Enum(e) => {
            let enum_keys: Vec<&String> = e.iter().map(|(k, _)| k).collect();
            let one_ofs = e.iter().map(|(k, v)| {
                let k_property_name = format_ident!("{}", k);
                let k_property_display_name = k.to_case(Case::Title);
                let k_property_code =
                    get_fields_json_schema(v, &format!("{} {}", title, k_property_display_name));
                quote! {
                    {
                        properties: {
                            tag: {enum: [#k]},
                            #k_property_name: #k_property_code
                        }
                    }
                }
            });
            quote! {
                {
                    type: "object",
                    properties: {
                        tag: {
                            type: "string",
                            enum: [#(#enum_keys),*]
                        }
                    },
                    required: ["tag"],
                    dependencies: {
                        tag: {
                            oneOf: [
                                #(#one_ofs),*
                            ]
                        }
                    }
                }
            }
        }
        Type::String(_) => quote! {{type: "string"}},
        Type::ContractName(_) => quote! {{type: "string", title: "Contract Name"}},
        Type::ReceiveName(_) => quote! {{type: "string", title: "Receive Name"}},
        Type::ULeb128(_) => quote! {{type: "string"}},
        Type::ILeb128(_) => quote! {{type: "string"}},
        Type::ByteList(_) => quote! {{type: "string"}},
        Type::ByteArray(_) => quote! {{type: "string"}},
        Type::TaggedEnum(e) => {
            let items: Vec<(String, Fields)> = e.iter().map(|(_, v)| v.clone()).collect();
            get_json_schema_code(&Type::Enum(items), title)
        }
    }
}

fn get_fields_json_schema(fields: &Fields, title: &String) -> TokenStream {
    match fields {
        Fields::Named(fields) => {
            let fields_code: Vec<TokenStream> = fields
                .iter()
                .map(|(k, t)| {
                    let field_code = get_json_schema_code(t, &k.to_case(Case::Title));
                    quote! {#k: #field_code}
                })
                .collect();
            quote! {{type: "object", title: #title,  properties: {#(#fields_code),*}}}
        }
        Fields::Unnamed(fields) => {
            let fields_code: Vec<TokenStream> = fields
                .iter()
                .enumerate()
                .map(|(_, t)| {
                    let field_code = get_json_schema_code(t, &"".to_owned());
                    quote! {#field_code}
                })
                .collect();
            quote! {{type: "array", items: [#(#fields_code),*]}}
        }
        Fields::None => quote! {{type: "object", title: #title, properties: {}}},
    }
}

fn get_ui_code(request: &Type) -> TokenStream {
    match request {
        Type::Unit => quote! {undefined},
        Type::Bool => quote! {boolean},
        Type::U8 => quote! {number},
        Type::U16 => quote! {number},
        Type::U32 => quote! {number},
        Type::U64 => quote! {number},
        Type::U128 => quote! {number},
        Type::I8 => quote! {number},
        Type::I16 => quote! {number},
        Type::I32 => quote! {number},
        Type::I64 => quote! {number},
        Type::I128 => quote! {number},
        Type::Amount => quote! {string},
        Type::AccountAddress => quote! {string},
        Type::ContractAddress => quote! {{index: number, subindex: number}},
        Type::Timestamp => quote! {string},
        Type::Duration => quote! {string},
        Type::Pair(t1, t2) => {
            let t1_code = get_ui_code(t1);
            let t2_code = get_ui_code(t2);
            quote! {[#t1_code, #t2_code]}
        }
        Type::List(_, t) => {
            let list_type = get_ui_code(t);
            quote! {#list_type[]}
        }
        Type::Set(_, t) => {
            let list_type = get_ui_code(t);
            quote! {#list_type[]}
        }
        Type::Map(_, t_key, t_val) => {
            let t1_code = get_ui_code(t_key);
            let t2_code = get_ui_code(t_val);
            quote! {[#t1_code, #t2_code][]}
        }
        Type::Array(_, t) => {
            let array_type = get_ui_code(t);
            quote! {#array_type[]}
        }
        Type::Struct(f) => get_fields_ui_code(f),
        Type::Enum(e) => {
            let variant_codes: Vec<TokenStream> = e
                .iter()
                .map(|(k, v)| {
                    let k_property_name = format_ident!("{}", k);
                    let k_property_code = get_fields_ui_code(v);
                    quote! {
                        {
                            tag: #k,
                            #k_property_name: #k_property_code
                        }
                    }
                })
                .collect();

            quote! {#(#variant_codes)|*}
        }
        Type::String(_) => quote! {string},
        Type::ContractName(_) => quote! {string},
        Type::ReceiveName(_) => quote! {string},
        Type::ULeb128(_) => quote! {string},
        Type::ILeb128(_) => quote! {string},
        Type::ByteList(_) => quote! {string},
        Type::ByteArray(_) => quote! {string},
        Type::TaggedEnum(e) => {
            let items: Vec<(String, Fields)> = e.iter().map(|(_, v)| v.clone()).collect();
            get_ui_code(&Type::Enum(items))
        }
    }
}

fn get_fields_ui_code(f: &Fields) -> TokenStream {
    match f {
        Fields::Named(fields) => {
            let fields_code: Vec<TokenStream> = fields
                .iter()
                .map(|(k, t)| {
                    let field_code = get_ui_code(t);
                    quote! {#k: #field_code}
                })
                .collect();
            quote! {{#(#fields_code),*}}
        }
        Fields::Unnamed(fields) => {
            let fields_code: Vec<TokenStream> = fields
                .iter()
                .enumerate()
                .map(|(i, t)| {
                    let field_code = get_ui_code(t);
                    quote! {#field_code}
                })
                .collect();
            quote! {[#(#fields_code),*]}
        }
        Fields::None => quote! {never},
    }
}
