use concordium_std::schema::{Fields, Type};
use convert_case::{Case, Casing};
use proc_macro2::TokenStream;
use quote::{format_ident, quote};

use crate::contracts::Contract;

pub fn generated_contract_client_ui_types(contract: Contract) -> TokenStream {
    let mut methods = Vec::<TokenStream>::new();

    for method in contract.receive_methods {
        let method_name = format_ident!("{}", method.name);
        let method_name_str = method.name;
        let request_json_schema_type_name =
            format_ident!("{}RequestJsonSchema", method_name_str.to_case(Case::Camel));
        let request_json_schema_code: TokenStream =
            get_method_request_json_schema_code(method.request.as_ref());

        let response_json_schema_code: TokenStream =
            get_method_response_json_schema_code(method.response.as_ref());
        let request_ui_type_name =
            format_ident!("{}RequestUi", method_name_str.to_case(Case::Camel));
        let request_ui_code: TokenStream = get_method_request_ui_code(method.request.as_ref());
        // let request_parser_fn_name =
        //     format_ident!("{}RequestParser", method_name_str.to_case(Case::Camel));
        // let request_parser_code: TokenStream =
        // get_method_request_parser_code(method.request, request_ui_type_name);

        let response_json_schema_type_name =
            format_ident!("{}ResponseJsonSchema", method_name_str.to_case(Case::Camel));
        let response_ui_type_name =
            format_ident!("{}ResponseUi", method_name_str.to_case(Case::Camel));
        let response_ui_code: TokenStream = get_method_response_ui_code(method.response.as_ref());
        // let response_parser_fn_name =
        //     format_ident!("{}ResponseParser", method_name_str.to_case(Case::Camel));
        // let response_parser_code: TokenStream =
        // get_method_response_parser_code(method.response);

        let method_code = quote! {
            export type #request_json_schema_type_name = #request_json_schema_code;
            export type #response_json_schema_type_name = #response_json_schema_code;
            export type #request_ui_type_name = #request_ui_code;
            export type #response_ui_type_name = #response_ui_code;
        };

        methods.push(method_code);
    }

    return quote! {#(#methods)*};
}

fn get_method_response_ui_code(response: Option<&Type>) -> TokenStream {
    match response {
        Some(response) => get_ui_code(response),
        None => quote! {never},
    }
}

fn get_method_request_ui_code(request: Option<&Type>) -> TokenStream {
    match request {
        Some(request) => get_ui_code(request),
        None => quote! {never},
    }
}

fn get_method_response_json_schema_code(response: Option<&Type>) -> TokenStream {
    match response {
        Some(response) => get_json_schema_code(response),
        None => quote! {undefined},
    }
}

fn get_method_request_json_schema_code(request: Option<&Type>) -> TokenStream {
    match request {
        Some(request) => get_json_schema_code(request),
        None => quote! {undefined},
    }
}

fn get_json_schema_code(request: &Type) -> TokenStream {
    match request {
        Type::Unit => quote! {{type: "null"}},
        Type::Bool => quote! {{type: "boolean"}},
        Type::U8 => quote! {{type: "integer", minimum: 0, maximum: 255}},
        Type::U16 => quote! {{type: "integer", minimum: 0, maximum: 65535}},
        Type::U32 => quote! {{type: "integer", minimum: 0, maximum: 4294967295}},
        Type::U64 => quote! {{type: "integer", minimum: 0}},
        Type::U128 => quote! {{type: "integer", minimum: 0}},
        Type::I8 => quote! {{type: "integer", minimum: -128, maximum: 127}},
        Type::I16 => quote! {{type: "integer", minimum: -32768, maximum: 32767}},
        Type::I32 => quote! {{type: "integer", minimum: -2147483648, maximum: 2147483647}},
        Type::I64 => quote! {{type: "integer"}},
        Type::I128 => quote! {{type: "integer"}},
        Type::Amount => quote! {{type: "string"}},
        Type::AccountAddress => quote! {{type: "string", title: "Account Address"}},
        Type::ContractAddress => {
            quote! {
                {
                    type: "object",
                    properties: {
                        index: { type: "integer", minimum: 0},
                        subindex: {type: "integer", minimum: 0}
                    }
                }
            }
        }
        Type::Timestamp => quote! {{type: "string"}},
        Type::Duration => quote! {{type: "string"}},
        Type::Pair(t1, t2) => {
            let t1_code = get_json_schema_code(t1);
            let t2_code = get_json_schema_code(t2);
            quote! {{type: "array", items: [#t1_code, #t2_code]}}
        }
        Type::List(_, t) => {
            let list_type = get_json_schema_code(t);
            quote! {{type: "array", items: #list_type}}
        }
        Type::Set(_, t) => {
            let list_type = get_json_schema_code(t);
            quote! {{type: "array", items: #list_type}}
        }
        Type::Map(_, t_key, t_val) => {
            let t1_code = get_json_schema_code(t_key);
            let t2_code = get_json_schema_code(t_val);
            quote! {{type: "array", items: [#t1_code, #t2_code]}}
        }
        Type::Array(_, t) => {
            let array_type = get_json_schema_code(t);
            quote! {{type: "array", items: #array_type}}
        }
        Type::Struct(f) => get_fields_json_schema(f),
        Type::Enum(e) => {
            let enum_keys: Vec<&String> = e.iter().map(|(k, _)| k).collect();
            let one_ofs = e.iter().map(|(k, v)| {
                let k_property_name = format_ident!("{}", k);
                let k_property_code = get_fields_json_schema(v);
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
            get_json_schema_code(&Type::Enum(items))
        }
    }
}

fn get_fields_json_schema(fields: &Fields) -> TokenStream {
    match fields {
        Fields::Named(fields) => {
            let fields_code: Vec<TokenStream> = fields
                .iter()
                .map(|(k, t)| {
                    let field_code = get_json_schema_code(t);
                    quote! {#k: #field_code}
                })
                .collect();
            quote! {{type: "object", properties: {#(#fields_code),*}}}
        }
        Fields::Unnamed(fields) => {
            let fields_code: Vec<TokenStream> = fields
                .iter()
                .enumerate()
                .map(|(i, t)| {
                    let field_code = get_json_schema_code(t);
                    quote! {#field_code}
                })
                .collect();
            quote! {{type: "array", items: [#(#fields_code),*]}}
        }
        Fields::None => quote! {{type: "object", properties: {}}},
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
