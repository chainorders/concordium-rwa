import { RJSFSchema, RegistryWidgetsType, UiSchema } from "@rjsf/utils";
import React from "react";
import { ContractAddress } from "@concordium/web-sdk";
import { default as client } from "./rwaIdentityRegistry";
import * as types from "./rwaIdentityRegistry";
import { GenericInit, GenericInvoke, GenericUpdate } from "./GenericContractUI";
export const initErrorJsonSchema: RJSFSchema = {
	type: "object",
	title: "Init Error",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"Unauthorized",
				"IdentityNotFound",
				"IssuerNotFound",
				"IssuerAlreadyExists",
				"AgentAlreadyExists",
				"AgentNotFound",
				"InvalidIssuer",
				"CallContractError",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "ParseError", properties: {} },
					},
				},
				{
					properties: { tag: { enum: ["LogError"] }, LogError: { type: "object", title: "LogError", properties: {} } },
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IdentityNotFound"] },
						IdentityNotFound: { type: "object", title: "IdentityNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerNotFound"] },
						IssuerNotFound: { type: "object", title: "IssuerNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerAlreadyExists"] },
						IssuerAlreadyExists: { type: "object", title: "IssuerAlreadyExists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "AgentAlreadyExists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "AgentNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidIssuer"] },
						InvalidIssuer: { type: "object", title: "InvalidIssuer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "CallContractError", properties: {} },
					},
				},
			],
		},
	},
};
export type initErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "IdentityNotFound"; IdentityNotFound: never }
	| { tag: "IssuerNotFound"; IssuerNotFound: never }
	| { tag: "IssuerAlreadyExists"; IssuerAlreadyExists: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never }
	| { tag: "InvalidIssuer"; InvalidIssuer: never }
	| { tag: "CallContractError"; CallContractError: never };
export const addAgentRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Add Agent Request",
	properties: { tag: { type: "string", enum: ["Account", "Contract"] } },
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["Account"] },
						Account: { type: "array", items: [{ type: "string", title: "" }] },
					},
				},
				{
					properties: {
						tag: { enum: ["Contract"] },
						Contract: {
							type: "array",
							items: [
								{
									type: "object",
									title: "",
									properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
								},
							],
						},
					},
				},
			],
		},
	},
};
export type AddAgentRequestUi =
	| { tag: "Account"; Account: [string] }
	| { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
export const addAgentErrorJsonSchema: RJSFSchema = {
	type: "object",
	title: "Add Agent Error",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"Unauthorized",
				"IdentityNotFound",
				"IssuerNotFound",
				"IssuerAlreadyExists",
				"AgentAlreadyExists",
				"AgentNotFound",
				"InvalidIssuer",
				"CallContractError",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "ParseError", properties: {} },
					},
				},
				{
					properties: { tag: { enum: ["LogError"] }, LogError: { type: "object", title: "LogError", properties: {} } },
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IdentityNotFound"] },
						IdentityNotFound: { type: "object", title: "IdentityNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerNotFound"] },
						IssuerNotFound: { type: "object", title: "IssuerNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerAlreadyExists"] },
						IssuerAlreadyExists: { type: "object", title: "IssuerAlreadyExists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "AgentAlreadyExists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "AgentNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidIssuer"] },
						InvalidIssuer: { type: "object", title: "InvalidIssuer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "CallContractError", properties: {} },
					},
				},
			],
		},
	},
};
export type AddAgentErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "IdentityNotFound"; IdentityNotFound: never }
	| { tag: "IssuerNotFound"; IssuerNotFound: never }
	| { tag: "IssuerAlreadyExists"; IssuerAlreadyExists: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never }
	| { tag: "InvalidIssuer"; InvalidIssuer: never }
	| { tag: "CallContractError"; CallContractError: never };
export const addIssuerRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Add Issuer Request",
	properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
};
export type AddIssuerRequestUi = { index: number; subindex: number };
export const addIssuerErrorJsonSchema: RJSFSchema = {
	type: "object",
	title: "Add Issuer Error",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"Unauthorized",
				"IdentityNotFound",
				"IssuerNotFound",
				"IssuerAlreadyExists",
				"AgentAlreadyExists",
				"AgentNotFound",
				"InvalidIssuer",
				"CallContractError",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "ParseError", properties: {} },
					},
				},
				{
					properties: { tag: { enum: ["LogError"] }, LogError: { type: "object", title: "LogError", properties: {} } },
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IdentityNotFound"] },
						IdentityNotFound: { type: "object", title: "IdentityNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerNotFound"] },
						IssuerNotFound: { type: "object", title: "IssuerNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerAlreadyExists"] },
						IssuerAlreadyExists: { type: "object", title: "IssuerAlreadyExists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "AgentAlreadyExists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "AgentNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidIssuer"] },
						InvalidIssuer: { type: "object", title: "InvalidIssuer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "CallContractError", properties: {} },
					},
				},
			],
		},
	},
};
export type AddIssuerErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "IdentityNotFound"; IdentityNotFound: never }
	| { tag: "IssuerNotFound"; IssuerNotFound: never }
	| { tag: "IssuerAlreadyExists"; IssuerAlreadyExists: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never }
	| { tag: "InvalidIssuer"; InvalidIssuer: never }
	| { tag: "CallContractError"; CallContractError: never };
export const agentsResponseJsonSchema: RJSFSchema = {
	type: "array",
	items: {
		type: "object",
		title: "",
		properties: { tag: { type: "string", enum: ["Account", "Contract"] } },
		required: ["tag"],
		dependencies: {
			tag: {
				oneOf: [
					{
						properties: {
							tag: { enum: ["Account"] },
							Account: { type: "array", items: [{ type: "string", title: "" }] },
						},
					},
					{
						properties: {
							tag: { enum: ["Contract"] },
							Contract: {
								type: "array",
								items: [
									{
										type: "object",
										title: "",
										properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
									},
								],
							},
						},
					},
				],
			},
		},
	},
	title: "Agents Response",
};
export type AgentsResponseUi =
	| { tag: "Account"; Account: [string] }
	| { tag: "Contract"; Contract: [{ index: number; subindex: number }] }[];
export const agentsErrorJsonSchema: RJSFSchema = {
	type: "object",
	title: "Agents Error",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"Unauthorized",
				"IdentityNotFound",
				"IssuerNotFound",
				"IssuerAlreadyExists",
				"AgentAlreadyExists",
				"AgentNotFound",
				"InvalidIssuer",
				"CallContractError",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "ParseError", properties: {} },
					},
				},
				{
					properties: { tag: { enum: ["LogError"] }, LogError: { type: "object", title: "LogError", properties: {} } },
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IdentityNotFound"] },
						IdentityNotFound: { type: "object", title: "IdentityNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerNotFound"] },
						IssuerNotFound: { type: "object", title: "IssuerNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerAlreadyExists"] },
						IssuerAlreadyExists: { type: "object", title: "IssuerAlreadyExists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "AgentAlreadyExists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "AgentNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidIssuer"] },
						InvalidIssuer: { type: "object", title: "InvalidIssuer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "CallContractError", properties: {} },
					},
				},
			],
		},
	},
};
export type AgentsErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "IdentityNotFound"; IdentityNotFound: never }
	| { tag: "IssuerNotFound"; IssuerNotFound: never }
	| { tag: "IssuerAlreadyExists"; IssuerAlreadyExists: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never }
	| { tag: "InvalidIssuer"; InvalidIssuer: never }
	| { tag: "CallContractError"; CallContractError: never };
export const deleteIdentityRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Delete Identity Request",
	properties: { tag: { type: "string", enum: ["Account", "Contract"] } },
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["Account"] },
						Account: { type: "array", items: [{ type: "string", title: "" }] },
					},
				},
				{
					properties: {
						tag: { enum: ["Contract"] },
						Contract: {
							type: "array",
							items: [
								{
									type: "object",
									title: "",
									properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
								},
							],
						},
					},
				},
			],
		},
	},
};
export type DeleteIdentityRequestUi =
	| { tag: "Account"; Account: [string] }
	| { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
export const deleteIdentityErrorJsonSchema: RJSFSchema = {
	type: "object",
	title: "Delete Identity Error",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"Unauthorized",
				"IdentityNotFound",
				"IssuerNotFound",
				"IssuerAlreadyExists",
				"AgentAlreadyExists",
				"AgentNotFound",
				"InvalidIssuer",
				"CallContractError",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "ParseError", properties: {} },
					},
				},
				{
					properties: { tag: { enum: ["LogError"] }, LogError: { type: "object", title: "LogError", properties: {} } },
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IdentityNotFound"] },
						IdentityNotFound: { type: "object", title: "IdentityNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerNotFound"] },
						IssuerNotFound: { type: "object", title: "IssuerNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerAlreadyExists"] },
						IssuerAlreadyExists: { type: "object", title: "IssuerAlreadyExists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "AgentAlreadyExists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "AgentNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidIssuer"] },
						InvalidIssuer: { type: "object", title: "InvalidIssuer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "CallContractError", properties: {} },
					},
				},
			],
		},
	},
};
export type DeleteIdentityErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "IdentityNotFound"; IdentityNotFound: never }
	| { tag: "IssuerNotFound"; IssuerNotFound: never }
	| { tag: "IssuerAlreadyExists"; IssuerAlreadyExists: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never }
	| { tag: "InvalidIssuer"; InvalidIssuer: never }
	| { tag: "CallContractError"; CallContractError: never };
export const getIdentityRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Get Identity Request",
	properties: { tag: { type: "string", enum: ["Account", "Contract"] } },
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["Account"] },
						Account: { type: "array", items: [{ type: "string", title: "" }] },
					},
				},
				{
					properties: {
						tag: { enum: ["Contract"] },
						Contract: {
							type: "array",
							items: [
								{
									type: "object",
									title: "",
									properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
								},
							],
						},
					},
				},
			],
		},
	},
};
export type GetIdentityRequestUi =
	| { tag: "Account"; Account: [string] }
	| { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
export const getIdentityResponseJsonSchema: RJSFSchema = {
	type: "object",
	title: "Get Identity Response",
	properties: {
		attributes: {
			type: "array",
			items: {
				type: "object",
				title: "",
				properties: {
					tag: { type: "integer", minimum: 0, maximum: 255, title: "Tag" },
					value: { type: "string", title: "Value" },
				},
			},
			title: "Attributes",
		},
		credentials: {
			type: "array",
			items: {
				type: "object",
				title: "",
				properties: {
					issuer: {
						type: "object",
						title: "Issuer",
						properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
					},
					key: { type: "string", title: "Key" },
				},
			},
			title: "Credentials",
		},
	},
};
export type GetIdentityResponseUi = {
	attributes: { tag: number; value: string }[];
	credentials: { issuer: { index: number; subindex: number }; key: string }[];
};
export const getIdentityErrorJsonSchema: RJSFSchema = {
	type: "object",
	title: "Get Identity Error",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"Unauthorized",
				"IdentityNotFound",
				"IssuerNotFound",
				"IssuerAlreadyExists",
				"AgentAlreadyExists",
				"AgentNotFound",
				"InvalidIssuer",
				"CallContractError",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "ParseError", properties: {} },
					},
				},
				{
					properties: { tag: { enum: ["LogError"] }, LogError: { type: "object", title: "LogError", properties: {} } },
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IdentityNotFound"] },
						IdentityNotFound: { type: "object", title: "IdentityNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerNotFound"] },
						IssuerNotFound: { type: "object", title: "IssuerNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerAlreadyExists"] },
						IssuerAlreadyExists: { type: "object", title: "IssuerAlreadyExists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "AgentAlreadyExists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "AgentNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidIssuer"] },
						InvalidIssuer: { type: "object", title: "InvalidIssuer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "CallContractError", properties: {} },
					},
				},
			],
		},
	},
};
export type GetIdentityErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "IdentityNotFound"; IdentityNotFound: never }
	| { tag: "IssuerNotFound"; IssuerNotFound: never }
	| { tag: "IssuerAlreadyExists"; IssuerAlreadyExists: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never }
	| { tag: "InvalidIssuer"; InvalidIssuer: never }
	| { tag: "CallContractError"; CallContractError: never };
export const hasIdentityRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Has Identity Request",
	properties: { tag: { type: "string", enum: ["Account", "Contract"] } },
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["Account"] },
						Account: { type: "array", items: [{ type: "string", title: "" }] },
					},
				},
				{
					properties: {
						tag: { enum: ["Contract"] },
						Contract: {
							type: "array",
							items: [
								{
									type: "object",
									title: "",
									properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
								},
							],
						},
					},
				},
			],
		},
	},
};
export type HasIdentityRequestUi =
	| { tag: "Account"; Account: [string] }
	| { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
export const hasIdentityResponseJsonSchema: RJSFSchema = { type: "boolean", title: "Has Identity Response" };
export type HasIdentityResponseUi = boolean;
export const hasIdentityErrorJsonSchema: RJSFSchema = {
	type: "object",
	title: "Has Identity Error",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"Unauthorized",
				"IdentityNotFound",
				"IssuerNotFound",
				"IssuerAlreadyExists",
				"AgentAlreadyExists",
				"AgentNotFound",
				"InvalidIssuer",
				"CallContractError",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "ParseError", properties: {} },
					},
				},
				{
					properties: { tag: { enum: ["LogError"] }, LogError: { type: "object", title: "LogError", properties: {} } },
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IdentityNotFound"] },
						IdentityNotFound: { type: "object", title: "IdentityNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerNotFound"] },
						IssuerNotFound: { type: "object", title: "IssuerNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerAlreadyExists"] },
						IssuerAlreadyExists: { type: "object", title: "IssuerAlreadyExists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "AgentAlreadyExists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "AgentNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidIssuer"] },
						InvalidIssuer: { type: "object", title: "InvalidIssuer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "CallContractError", properties: {} },
					},
				},
			],
		},
	},
};
export type HasIdentityErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "IdentityNotFound"; IdentityNotFound: never }
	| { tag: "IssuerNotFound"; IssuerNotFound: never }
	| { tag: "IssuerAlreadyExists"; IssuerAlreadyExists: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never }
	| { tag: "InvalidIssuer"; InvalidIssuer: never }
	| { tag: "CallContractError"; CallContractError: never };
export const isAgentRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Is Agent Request",
	properties: { tag: { type: "string", enum: ["Account", "Contract"] } },
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["Account"] },
						Account: { type: "array", items: [{ type: "string", title: "" }] },
					},
				},
				{
					properties: {
						tag: { enum: ["Contract"] },
						Contract: {
							type: "array",
							items: [
								{
									type: "object",
									title: "",
									properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
								},
							],
						},
					},
				},
			],
		},
	},
};
export type IsAgentRequestUi =
	| { tag: "Account"; Account: [string] }
	| { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
export const isAgentResponseJsonSchema: RJSFSchema = { type: "boolean", title: "Is Agent Response" };
export type IsAgentResponseUi = boolean;
export const isAgentErrorJsonSchema: RJSFSchema = {
	type: "object",
	title: "Is Agent Error",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"Unauthorized",
				"IdentityNotFound",
				"IssuerNotFound",
				"IssuerAlreadyExists",
				"AgentAlreadyExists",
				"AgentNotFound",
				"InvalidIssuer",
				"CallContractError",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "ParseError", properties: {} },
					},
				},
				{
					properties: { tag: { enum: ["LogError"] }, LogError: { type: "object", title: "LogError", properties: {} } },
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IdentityNotFound"] },
						IdentityNotFound: { type: "object", title: "IdentityNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerNotFound"] },
						IssuerNotFound: { type: "object", title: "IssuerNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerAlreadyExists"] },
						IssuerAlreadyExists: { type: "object", title: "IssuerAlreadyExists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "AgentAlreadyExists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "AgentNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidIssuer"] },
						InvalidIssuer: { type: "object", title: "InvalidIssuer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "CallContractError", properties: {} },
					},
				},
			],
		},
	},
};
export type IsAgentErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "IdentityNotFound"; IdentityNotFound: never }
	| { tag: "IssuerNotFound"; IssuerNotFound: never }
	| { tag: "IssuerAlreadyExists"; IssuerAlreadyExists: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never }
	| { tag: "InvalidIssuer"; InvalidIssuer: never }
	| { tag: "CallContractError"; CallContractError: never };
export const isIssuerRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Is Issuer Request",
	properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
};
export type IsIssuerRequestUi = { index: number; subindex: number };
export const isIssuerResponseJsonSchema: RJSFSchema = { type: "boolean", title: "Is Issuer Response" };
export type IsIssuerResponseUi = boolean;
export const isIssuerErrorJsonSchema: RJSFSchema = {
	type: "object",
	title: "Is Issuer Error",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"Unauthorized",
				"IdentityNotFound",
				"IssuerNotFound",
				"IssuerAlreadyExists",
				"AgentAlreadyExists",
				"AgentNotFound",
				"InvalidIssuer",
				"CallContractError",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "ParseError", properties: {} },
					},
				},
				{
					properties: { tag: { enum: ["LogError"] }, LogError: { type: "object", title: "LogError", properties: {} } },
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IdentityNotFound"] },
						IdentityNotFound: { type: "object", title: "IdentityNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerNotFound"] },
						IssuerNotFound: { type: "object", title: "IssuerNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerAlreadyExists"] },
						IssuerAlreadyExists: { type: "object", title: "IssuerAlreadyExists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "AgentAlreadyExists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "AgentNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidIssuer"] },
						InvalidIssuer: { type: "object", title: "InvalidIssuer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "CallContractError", properties: {} },
					},
				},
			],
		},
	},
};
export type IsIssuerErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "IdentityNotFound"; IdentityNotFound: never }
	| { tag: "IssuerNotFound"; IssuerNotFound: never }
	| { tag: "IssuerAlreadyExists"; IssuerAlreadyExists: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never }
	| { tag: "InvalidIssuer"; InvalidIssuer: never }
	| { tag: "CallContractError"; CallContractError: never };
export const isSameRequestJsonSchema: RJSFSchema = {
	type: "array",
	items: [
		{
			type: "object",
			title: "First",
			properties: { tag: { type: "string", enum: ["Account", "Contract"] } },
			required: ["tag"],
			dependencies: {
				tag: {
					oneOf: [
						{
							properties: {
								tag: { enum: ["Account"] },
								Account: { type: "array", items: [{ type: "string", title: "" }] },
							},
						},
						{
							properties: {
								tag: { enum: ["Contract"] },
								Contract: {
									type: "array",
									items: [
										{
											type: "object",
											title: "",
											properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
										},
									],
								},
							},
						},
					],
				},
			},
		},
		{
			type: "object",
			title: "Second",
			properties: { tag: { type: "string", enum: ["Account", "Contract"] } },
			required: ["tag"],
			dependencies: {
				tag: {
					oneOf: [
						{
							properties: {
								tag: { enum: ["Account"] },
								Account: { type: "array", items: [{ type: "string", title: "" }] },
							},
						},
						{
							properties: {
								tag: { enum: ["Contract"] },
								Contract: {
									type: "array",
									items: [
										{
											type: "object",
											title: "",
											properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
										},
									],
								},
							},
						},
					],
				},
			},
		},
	],
	title: "Is Same Request",
};
export type IsSameRequestUi = [
	{ tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] },
	{ tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] },
];
export const isSameResponseJsonSchema: RJSFSchema = { type: "boolean", title: "Is Same Response" };
export type IsSameResponseUi = boolean;
export const isSameErrorJsonSchema: RJSFSchema = {
	type: "object",
	title: "Is Same Error",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"Unauthorized",
				"IdentityNotFound",
				"IssuerNotFound",
				"IssuerAlreadyExists",
				"AgentAlreadyExists",
				"AgentNotFound",
				"InvalidIssuer",
				"CallContractError",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "ParseError", properties: {} },
					},
				},
				{
					properties: { tag: { enum: ["LogError"] }, LogError: { type: "object", title: "LogError", properties: {} } },
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IdentityNotFound"] },
						IdentityNotFound: { type: "object", title: "IdentityNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerNotFound"] },
						IssuerNotFound: { type: "object", title: "IssuerNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerAlreadyExists"] },
						IssuerAlreadyExists: { type: "object", title: "IssuerAlreadyExists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "AgentAlreadyExists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "AgentNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidIssuer"] },
						InvalidIssuer: { type: "object", title: "InvalidIssuer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "CallContractError", properties: {} },
					},
				},
			],
		},
	},
};
export type IsSameErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "IdentityNotFound"; IdentityNotFound: never }
	| { tag: "IssuerNotFound"; IssuerNotFound: never }
	| { tag: "IssuerAlreadyExists"; IssuerAlreadyExists: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never }
	| { tag: "InvalidIssuer"; InvalidIssuer: never }
	| { tag: "CallContractError"; CallContractError: never };
export const isVerifiedRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Is Verified Request",
	properties: { tag: { type: "string", enum: ["Account", "Contract"] } },
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["Account"] },
						Account: { type: "array", items: [{ type: "string", title: "" }] },
					},
				},
				{
					properties: {
						tag: { enum: ["Contract"] },
						Contract: {
							type: "array",
							items: [
								{
									type: "object",
									title: "",
									properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
								},
							],
						},
					},
				},
			],
		},
	},
};
export type IsVerifiedRequestUi =
	| { tag: "Account"; Account: [string] }
	| { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
export const isVerifiedResponseJsonSchema: RJSFSchema = { type: "boolean", title: "Is Verified Response" };
export type IsVerifiedResponseUi = boolean;
export const isVerifiedErrorJsonSchema: RJSFSchema = {
	type: "object",
	title: "Is Verified Error",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"Unauthorized",
				"IdentityNotFound",
				"IssuerNotFound",
				"IssuerAlreadyExists",
				"AgentAlreadyExists",
				"AgentNotFound",
				"InvalidIssuer",
				"CallContractError",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "ParseError", properties: {} },
					},
				},
				{
					properties: { tag: { enum: ["LogError"] }, LogError: { type: "object", title: "LogError", properties: {} } },
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IdentityNotFound"] },
						IdentityNotFound: { type: "object", title: "IdentityNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerNotFound"] },
						IssuerNotFound: { type: "object", title: "IssuerNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerAlreadyExists"] },
						IssuerAlreadyExists: { type: "object", title: "IssuerAlreadyExists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "AgentAlreadyExists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "AgentNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidIssuer"] },
						InvalidIssuer: { type: "object", title: "InvalidIssuer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "CallContractError", properties: {} },
					},
				},
			],
		},
	},
};
export type IsVerifiedErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "IdentityNotFound"; IdentityNotFound: never }
	| { tag: "IssuerNotFound"; IssuerNotFound: never }
	| { tag: "IssuerAlreadyExists"; IssuerAlreadyExists: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never }
	| { tag: "InvalidIssuer"; InvalidIssuer: never }
	| { tag: "CallContractError"; CallContractError: never };
export const issuersResponseJsonSchema: RJSFSchema = {
	type: "array",
	items: {
		type: "object",
		title: "",
		properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
	},
	title: "Issuers Response",
};
export type IssuersResponseUi = { index: number; subindex: number }[];
export const issuersErrorJsonSchema: RJSFSchema = {
	type: "object",
	title: "Issuers Error",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"Unauthorized",
				"IdentityNotFound",
				"IssuerNotFound",
				"IssuerAlreadyExists",
				"AgentAlreadyExists",
				"AgentNotFound",
				"InvalidIssuer",
				"CallContractError",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "ParseError", properties: {} },
					},
				},
				{
					properties: { tag: { enum: ["LogError"] }, LogError: { type: "object", title: "LogError", properties: {} } },
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IdentityNotFound"] },
						IdentityNotFound: { type: "object", title: "IdentityNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerNotFound"] },
						IssuerNotFound: { type: "object", title: "IssuerNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerAlreadyExists"] },
						IssuerAlreadyExists: { type: "object", title: "IssuerAlreadyExists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "AgentAlreadyExists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "AgentNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidIssuer"] },
						InvalidIssuer: { type: "object", title: "InvalidIssuer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "CallContractError", properties: {} },
					},
				},
			],
		},
	},
};
export type IssuersErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "IdentityNotFound"; IdentityNotFound: never }
	| { tag: "IssuerNotFound"; IssuerNotFound: never }
	| { tag: "IssuerAlreadyExists"; IssuerAlreadyExists: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never }
	| { tag: "InvalidIssuer"; InvalidIssuer: never }
	| { tag: "CallContractError"; CallContractError: never };
export const registerIdentityRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Register Identity Request",
	properties: {
		identity: {
			type: "object",
			title: "Identity",
			properties: {
				attributes: {
					type: "array",
					items: {
						type: "object",
						title: "",
						properties: {
							tag: { type: "integer", minimum: 0, maximum: 255, title: "Tag" },
							value: { type: "string", title: "Value" },
						},
					},
					title: "Attributes",
				},
				credentials: {
					type: "array",
					items: {
						type: "object",
						title: "",
						properties: {
							issuer: {
								type: "object",
								title: "Issuer",
								properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
							},
							key: { type: "string", title: "Key" },
						},
					},
					title: "Credentials",
				},
			},
		},
		address: {
			type: "object",
			title: "Address",
			properties: { tag: { type: "string", enum: ["Account", "Contract"] } },
			required: ["tag"],
			dependencies: {
				tag: {
					oneOf: [
						{
							properties: {
								tag: { enum: ["Account"] },
								Account: { type: "array", items: [{ type: "string", title: "" }] },
							},
						},
						{
							properties: {
								tag: { enum: ["Contract"] },
								Contract: {
									type: "array",
									items: [
										{
											type: "object",
											title: "",
											properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
										},
									],
								},
							},
						},
					],
				},
			},
		},
	},
};
export type RegisterIdentityRequestUi = {
	identity: {
		attributes: { tag: number; value: string }[];
		credentials: { issuer: { index: number; subindex: number }; key: string }[];
	};
	address: { tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
};
export const registerIdentityErrorJsonSchema: RJSFSchema = {
	type: "object",
	title: "Register Identity Error",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"Unauthorized",
				"IdentityNotFound",
				"IssuerNotFound",
				"IssuerAlreadyExists",
				"AgentAlreadyExists",
				"AgentNotFound",
				"InvalidIssuer",
				"CallContractError",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "ParseError", properties: {} },
					},
				},
				{
					properties: { tag: { enum: ["LogError"] }, LogError: { type: "object", title: "LogError", properties: {} } },
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IdentityNotFound"] },
						IdentityNotFound: { type: "object", title: "IdentityNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerNotFound"] },
						IssuerNotFound: { type: "object", title: "IssuerNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerAlreadyExists"] },
						IssuerAlreadyExists: { type: "object", title: "IssuerAlreadyExists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "AgentAlreadyExists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "AgentNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidIssuer"] },
						InvalidIssuer: { type: "object", title: "InvalidIssuer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "CallContractError", properties: {} },
					},
				},
			],
		},
	},
};
export type RegisterIdentityErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "IdentityNotFound"; IdentityNotFound: never }
	| { tag: "IssuerNotFound"; IssuerNotFound: never }
	| { tag: "IssuerAlreadyExists"; IssuerAlreadyExists: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never }
	| { tag: "InvalidIssuer"; InvalidIssuer: never }
	| { tag: "CallContractError"; CallContractError: never };
export const removeAgentRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Remove Agent Request",
	properties: { tag: { type: "string", enum: ["Account", "Contract"] } },
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["Account"] },
						Account: { type: "array", items: [{ type: "string", title: "" }] },
					},
				},
				{
					properties: {
						tag: { enum: ["Contract"] },
						Contract: {
							type: "array",
							items: [
								{
									type: "object",
									title: "",
									properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
								},
							],
						},
					},
				},
			],
		},
	},
};
export type RemoveAgentRequestUi =
	| { tag: "Account"; Account: [string] }
	| { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
export const removeAgentErrorJsonSchema: RJSFSchema = {
	type: "object",
	title: "Remove Agent Error",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"Unauthorized",
				"IdentityNotFound",
				"IssuerNotFound",
				"IssuerAlreadyExists",
				"AgentAlreadyExists",
				"AgentNotFound",
				"InvalidIssuer",
				"CallContractError",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "ParseError", properties: {} },
					},
				},
				{
					properties: { tag: { enum: ["LogError"] }, LogError: { type: "object", title: "LogError", properties: {} } },
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IdentityNotFound"] },
						IdentityNotFound: { type: "object", title: "IdentityNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerNotFound"] },
						IssuerNotFound: { type: "object", title: "IssuerNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerAlreadyExists"] },
						IssuerAlreadyExists: { type: "object", title: "IssuerAlreadyExists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "AgentAlreadyExists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "AgentNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidIssuer"] },
						InvalidIssuer: { type: "object", title: "InvalidIssuer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "CallContractError", properties: {} },
					},
				},
			],
		},
	},
};
export type RemoveAgentErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "IdentityNotFound"; IdentityNotFound: never }
	| { tag: "IssuerNotFound"; IssuerNotFound: never }
	| { tag: "IssuerAlreadyExists"; IssuerAlreadyExists: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never }
	| { tag: "InvalidIssuer"; InvalidIssuer: never }
	| { tag: "CallContractError"; CallContractError: never };
export const removeIssuerRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Remove Issuer Request",
	properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
};
export type RemoveIssuerRequestUi = { index: number; subindex: number };
export const removeIssuerErrorJsonSchema: RJSFSchema = {
	type: "object",
	title: "Remove Issuer Error",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"Unauthorized",
				"IdentityNotFound",
				"IssuerNotFound",
				"IssuerAlreadyExists",
				"AgentAlreadyExists",
				"AgentNotFound",
				"InvalidIssuer",
				"CallContractError",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "ParseError", properties: {} },
					},
				},
				{
					properties: { tag: { enum: ["LogError"] }, LogError: { type: "object", title: "LogError", properties: {} } },
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IdentityNotFound"] },
						IdentityNotFound: { type: "object", title: "IdentityNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerNotFound"] },
						IssuerNotFound: { type: "object", title: "IssuerNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerAlreadyExists"] },
						IssuerAlreadyExists: { type: "object", title: "IssuerAlreadyExists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "AgentAlreadyExists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "AgentNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidIssuer"] },
						InvalidIssuer: { type: "object", title: "InvalidIssuer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "CallContractError", properties: {} },
					},
				},
			],
		},
	},
};
export type RemoveIssuerErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "IdentityNotFound"; IdentityNotFound: never }
	| { tag: "IssuerNotFound"; IssuerNotFound: never }
	| { tag: "IssuerAlreadyExists"; IssuerAlreadyExists: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never }
	| { tag: "InvalidIssuer"; InvalidIssuer: never }
	| { tag: "CallContractError"; CallContractError: never };
export const supportsRequestJsonSchema: RJSFSchema = {
	type: "array",
	items: { type: "string", title: "" },
	title: "Supports Request",
};
export type SupportsRequestUi = string[];
export const supportsResponseJsonSchema: RJSFSchema = {
	type: "array",
	items: {
		type: "object",
		title: "",
		properties: { tag: { type: "string", enum: ["NoSupport", "Support", "SupportBy"] } },
		required: ["tag"],
		dependencies: {
			tag: {
				oneOf: [
					{
						properties: {
							tag: { enum: ["NoSupport"] },
							NoSupport: { type: "object", title: "NoSupport", properties: {} },
						},
					},
					{ properties: { tag: { enum: ["Support"] }, Support: { type: "object", title: "Support", properties: {} } } },
					{
						properties: {
							tag: { enum: ["SupportBy"] },
							SupportBy: {
								type: "array",
								items: [
									{
										type: "array",
										items: {
											type: "object",
											title: "",
											properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
										},
										title: "",
									},
								],
							},
						},
					},
				],
			},
		},
	},
	title: "Supports Response",
};
export type SupportsResponseUi =
	| { tag: "NoSupport"; NoSupport: never }
	| { tag: "Support"; Support: never }
	| { tag: "SupportBy"; SupportBy: [{ index: number; subindex: number }[]] }[];
export const supportsErrorJsonSchema: RJSFSchema = {
	type: "object",
	title: "Supports Error",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"Unauthorized",
				"IdentityNotFound",
				"IssuerNotFound",
				"IssuerAlreadyExists",
				"AgentAlreadyExists",
				"AgentNotFound",
				"InvalidIssuer",
				"CallContractError",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "ParseError", properties: {} },
					},
				},
				{
					properties: { tag: { enum: ["LogError"] }, LogError: { type: "object", title: "LogError", properties: {} } },
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IdentityNotFound"] },
						IdentityNotFound: { type: "object", title: "IdentityNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerNotFound"] },
						IssuerNotFound: { type: "object", title: "IssuerNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerAlreadyExists"] },
						IssuerAlreadyExists: { type: "object", title: "IssuerAlreadyExists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "AgentAlreadyExists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "AgentNotFound", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidIssuer"] },
						InvalidIssuer: { type: "object", title: "InvalidIssuer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "CallContractError", properties: {} },
					},
				},
			],
		},
	},
};
export type SupportsErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "IdentityNotFound"; IdentityNotFound: never }
	| { tag: "IssuerNotFound"; IssuerNotFound: never }
	| { tag: "IssuerAlreadyExists"; IssuerAlreadyExists: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never }
	| { tag: "InvalidIssuer"; InvalidIssuer: never }
	| { tag: "CallContractError"; CallContractError: never };
export const init = (props: {
	onInitialize: (contract: ContractAddress.Type) => void;
	uiSchema?: UiSchema;
	uiWidgets?: RegistryWidgetsType;
}) =>
	GenericInit<never, never>({
		onContractInitialized: props.onInitialize,
		uiSchema: props.uiSchema,
		uiWidgets: props.uiWidgets,
		method: client.init,
	});
export const ENTRYPOINTS_UI: {
	[key: keyof typeof types.ENTRYPOINTS]: (props: {
		contract: ContractAddress.Type;
		uiSchema?: UiSchema;
		uiWidgets?: RegistryWidgetsType;
	}) => React.JSX.Element;
} = {
	addAgent: (props: { contract: ContractAddress.Type; uiSchema?: UiSchema; uiWidgets?: RegistryWidgetsType }) =>
		GenericUpdate<types.AddAgentRequest, AddAgentRequestUi, types.AddAgentError, AddAgentErrorUi>({
			...props,
			method: client.addAgent,
			requestJsonSchema: addAgentRequestJsonSchema,
			requestSchemaBase64: types.addAgentRequestSchemaBase64,
			errorJsonSchema: addAgentErrorJsonSchema,
			errorSchemaBase64: types.addAgentErrorSchemaBase64,
		}),
	addIssuer: (props: { contract: ContractAddress.Type; uiSchema?: UiSchema; uiWidgets?: RegistryWidgetsType }) =>
		GenericUpdate<types.AddIssuerRequest, AddIssuerRequestUi, types.AddIssuerError, AddIssuerErrorUi>({
			...props,
			method: client.addIssuer,
			requestJsonSchema: addIssuerRequestJsonSchema,
			requestSchemaBase64: types.addIssuerRequestSchemaBase64,
			errorJsonSchema: addIssuerErrorJsonSchema,
			errorSchemaBase64: types.addIssuerErrorSchemaBase64,
		}),
	agents: (props: { contract: ContractAddress.Type; uiSchema?: UiSchema; uiWidgets?: RegistryWidgetsType }) =>
		GenericInvoke<never, never, types.AgentsResponse, AgentsResponseUi, types.AgentsError, AgentsErrorUi>({
			...props,
			method: client.agents,
			responseJsonSchema: agentsResponseJsonSchema,
			responseSchemaBase64: types.agentsResponseSchemaBase64,
			errorJsonSchema: agentsErrorJsonSchema,
			errorSchemaBase64: types.agentsErrorSchemaBase64,
		}),
	deleteIdentity: (props: { contract: ContractAddress.Type; uiSchema?: UiSchema; uiWidgets?: RegistryWidgetsType }) =>
		GenericUpdate<
			types.DeleteIdentityRequest,
			DeleteIdentityRequestUi,
			types.DeleteIdentityError,
			DeleteIdentityErrorUi
		>({
			...props,
			method: client.deleteIdentity,
			requestJsonSchema: deleteIdentityRequestJsonSchema,
			requestSchemaBase64: types.deleteIdentityRequestSchemaBase64,
			errorJsonSchema: deleteIdentityErrorJsonSchema,
			errorSchemaBase64: types.deleteIdentityErrorSchemaBase64,
		}),
	getIdentity: (props: { contract: ContractAddress.Type; uiSchema?: UiSchema; uiWidgets?: RegistryWidgetsType }) =>
		GenericInvoke<
			types.GetIdentityRequest,
			GetIdentityRequestUi,
			types.GetIdentityResponse,
			GetIdentityResponseUi,
			types.GetIdentityError,
			GetIdentityErrorUi
		>({
			...props,
			method: client.getIdentity,
			requestJsonSchema: getIdentityRequestJsonSchema,
			requestSchemaBase64: types.getIdentityRequestSchemaBase64,
			responseJsonSchema: getIdentityResponseJsonSchema,
			responseSchemaBase64: types.getIdentityResponseSchemaBase64,
			errorJsonSchema: getIdentityErrorJsonSchema,
			errorSchemaBase64: types.getIdentityErrorSchemaBase64,
		}),
	hasIdentity: (props: { contract: ContractAddress.Type; uiSchema?: UiSchema; uiWidgets?: RegistryWidgetsType }) =>
		GenericInvoke<
			types.HasIdentityRequest,
			HasIdentityRequestUi,
			types.HasIdentityResponse,
			HasIdentityResponseUi,
			types.HasIdentityError,
			HasIdentityErrorUi
		>({
			...props,
			method: client.hasIdentity,
			requestJsonSchema: hasIdentityRequestJsonSchema,
			requestSchemaBase64: types.hasIdentityRequestSchemaBase64,
			responseJsonSchema: hasIdentityResponseJsonSchema,
			responseSchemaBase64: types.hasIdentityResponseSchemaBase64,
			errorJsonSchema: hasIdentityErrorJsonSchema,
			errorSchemaBase64: types.hasIdentityErrorSchemaBase64,
		}),
	isAgent: (props: { contract: ContractAddress.Type; uiSchema?: UiSchema; uiWidgets?: RegistryWidgetsType }) =>
		GenericInvoke<
			types.IsAgentRequest,
			IsAgentRequestUi,
			types.IsAgentResponse,
			IsAgentResponseUi,
			types.IsAgentError,
			IsAgentErrorUi
		>({
			...props,
			method: client.isAgent,
			requestJsonSchema: isAgentRequestJsonSchema,
			requestSchemaBase64: types.isAgentRequestSchemaBase64,
			responseJsonSchema: isAgentResponseJsonSchema,
			responseSchemaBase64: types.isAgentResponseSchemaBase64,
			errorJsonSchema: isAgentErrorJsonSchema,
			errorSchemaBase64: types.isAgentErrorSchemaBase64,
		}),
	isIssuer: (props: { contract: ContractAddress.Type; uiSchema?: UiSchema; uiWidgets?: RegistryWidgetsType }) =>
		GenericInvoke<
			types.IsIssuerRequest,
			IsIssuerRequestUi,
			types.IsIssuerResponse,
			IsIssuerResponseUi,
			types.IsIssuerError,
			IsIssuerErrorUi
		>({
			...props,
			method: client.isIssuer,
			requestJsonSchema: isIssuerRequestJsonSchema,
			requestSchemaBase64: types.isIssuerRequestSchemaBase64,
			responseJsonSchema: isIssuerResponseJsonSchema,
			responseSchemaBase64: types.isIssuerResponseSchemaBase64,
			errorJsonSchema: isIssuerErrorJsonSchema,
			errorSchemaBase64: types.isIssuerErrorSchemaBase64,
		}),
	isSame: (props: { contract: ContractAddress.Type; uiSchema?: UiSchema; uiWidgets?: RegistryWidgetsType }) =>
		GenericInvoke<
			types.IsSameRequest,
			IsSameRequestUi,
			types.IsSameResponse,
			IsSameResponseUi,
			types.IsSameError,
			IsSameErrorUi
		>({
			...props,
			method: client.isSame,
			requestJsonSchema: isSameRequestJsonSchema,
			requestSchemaBase64: types.isSameRequestSchemaBase64,
			responseJsonSchema: isSameResponseJsonSchema,
			responseSchemaBase64: types.isSameResponseSchemaBase64,
			errorJsonSchema: isSameErrorJsonSchema,
			errorSchemaBase64: types.isSameErrorSchemaBase64,
		}),
	isVerified: (props: { contract: ContractAddress.Type; uiSchema?: UiSchema; uiWidgets?: RegistryWidgetsType }) =>
		GenericInvoke<
			types.IsVerifiedRequest,
			IsVerifiedRequestUi,
			types.IsVerifiedResponse,
			IsVerifiedResponseUi,
			types.IsVerifiedError,
			IsVerifiedErrorUi
		>({
			...props,
			method: client.isVerified,
			requestJsonSchema: isVerifiedRequestJsonSchema,
			requestSchemaBase64: types.isVerifiedRequestSchemaBase64,
			responseJsonSchema: isVerifiedResponseJsonSchema,
			responseSchemaBase64: types.isVerifiedResponseSchemaBase64,
			errorJsonSchema: isVerifiedErrorJsonSchema,
			errorSchemaBase64: types.isVerifiedErrorSchemaBase64,
		}),
	issuers: (props: { contract: ContractAddress.Type; uiSchema?: UiSchema; uiWidgets?: RegistryWidgetsType }) =>
		GenericInvoke<never, never, types.IssuersResponse, IssuersResponseUi, types.IssuersError, IssuersErrorUi>({
			...props,
			method: client.issuers,
			responseJsonSchema: issuersResponseJsonSchema,
			responseSchemaBase64: types.issuersResponseSchemaBase64,
			errorJsonSchema: issuersErrorJsonSchema,
			errorSchemaBase64: types.issuersErrorSchemaBase64,
		}),
	registerIdentity: (props: { contract: ContractAddress.Type; uiSchema?: UiSchema; uiWidgets?: RegistryWidgetsType }) =>
		GenericUpdate<
			types.RegisterIdentityRequest,
			RegisterIdentityRequestUi,
			types.RegisterIdentityError,
			RegisterIdentityErrorUi
		>({
			...props,
			method: client.registerIdentity,
			requestJsonSchema: registerIdentityRequestJsonSchema,
			requestSchemaBase64: types.registerIdentityRequestSchemaBase64,
			errorJsonSchema: registerIdentityErrorJsonSchema,
			errorSchemaBase64: types.registerIdentityErrorSchemaBase64,
		}),
	removeAgent: (props: { contract: ContractAddress.Type; uiSchema?: UiSchema; uiWidgets?: RegistryWidgetsType }) =>
		GenericUpdate<types.RemoveAgentRequest, RemoveAgentRequestUi, types.RemoveAgentError, RemoveAgentErrorUi>({
			...props,
			method: client.removeAgent,
			requestJsonSchema: removeAgentRequestJsonSchema,
			requestSchemaBase64: types.removeAgentRequestSchemaBase64,
			errorJsonSchema: removeAgentErrorJsonSchema,
			errorSchemaBase64: types.removeAgentErrorSchemaBase64,
		}),
	removeIssuer: (props: { contract: ContractAddress.Type; uiSchema?: UiSchema; uiWidgets?: RegistryWidgetsType }) =>
		GenericUpdate<types.RemoveIssuerRequest, RemoveIssuerRequestUi, types.RemoveIssuerError, RemoveIssuerErrorUi>({
			...props,
			method: client.removeIssuer,
			requestJsonSchema: removeIssuerRequestJsonSchema,
			requestSchemaBase64: types.removeIssuerRequestSchemaBase64,
			errorJsonSchema: removeIssuerErrorJsonSchema,
			errorSchemaBase64: types.removeIssuerErrorSchemaBase64,
		}),
	supports: (props: { contract: ContractAddress.Type; uiSchema?: UiSchema; uiWidgets?: RegistryWidgetsType }) =>
		GenericInvoke<
			types.SupportsRequest,
			SupportsRequestUi,
			types.SupportsResponse,
			SupportsResponseUi,
			types.SupportsError,
			SupportsErrorUi
		>({
			...props,
			method: client.supports,
			requestJsonSchema: supportsRequestJsonSchema,
			requestSchemaBase64: types.supportsRequestSchemaBase64,
			responseJsonSchema: supportsResponseJsonSchema,
			responseSchemaBase64: types.supportsResponseSchemaBase64,
			errorJsonSchema: supportsErrorJsonSchema,
			errorSchemaBase64: types.supportsErrorSchemaBase64,
		}),
};
