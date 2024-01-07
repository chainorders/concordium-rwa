import { RJSFSchema } from "@rjsf/utils";
import React from "react";
import { ContractAddress } from "@concordium/web-sdk";
import { default as client } from "./rwaIdentityRegistry";
import * as types from "./rwaIdentityRegistry";
import { GenericInit, GenericInvoke, GenericUpdate } from "./GenericContractUI";
export const initErrorJsonSchema: RJSFSchema = {
	type: "object",
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
						ParseError: { type: "object", title: "init Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "init Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "init Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IdentityNotFound"] },
						IdentityNotFound: { type: "object", title: "init Error Identity Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerNotFound"] },
						IssuerNotFound: { type: "object", title: "init Error Issuer Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerAlreadyExists"] },
						IssuerAlreadyExists: { type: "object", title: "init Error Issuer Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "init Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "init Error Agent Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidIssuer"] },
						InvalidIssuer: { type: "object", title: "init Error Invalid Issuer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "init Error Call Contract Error", properties: {} },
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
						ParseError: { type: "object", title: "AddAgent Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "AddAgent Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "AddAgent Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IdentityNotFound"] },
						IdentityNotFound: { type: "object", title: "AddAgent Error Identity Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerNotFound"] },
						IssuerNotFound: { type: "object", title: "AddAgent Error Issuer Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerAlreadyExists"] },
						IssuerAlreadyExists: { type: "object", title: "AddAgent Error Issuer Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "AddAgent Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "AddAgent Error Agent Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidIssuer"] },
						InvalidIssuer: { type: "object", title: "AddAgent Error Invalid Issuer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "AddAgent Error Call Contract Error", properties: {} },
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
	title: "AddIssuer Request",
	properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
};
export type AddIssuerRequestUi = { index: number; subindex: number };
export const addIssuerErrorJsonSchema: RJSFSchema = {
	type: "object",
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
						ParseError: { type: "object", title: "AddIssuer Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "AddIssuer Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "AddIssuer Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IdentityNotFound"] },
						IdentityNotFound: { type: "object", title: "AddIssuer Error Identity Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerNotFound"] },
						IssuerNotFound: { type: "object", title: "AddIssuer Error Issuer Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerAlreadyExists"] },
						IssuerAlreadyExists: { type: "object", title: "AddIssuer Error Issuer Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "AddIssuer Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "AddIssuer Error Agent Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidIssuer"] },
						InvalidIssuer: { type: "object", title: "AddIssuer Error Invalid Issuer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "AddIssuer Error Call Contract Error", properties: {} },
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
};
export type AgentsResponseUi =
	| { tag: "Account"; Account: [string] }
	| { tag: "Contract"; Contract: [{ index: number; subindex: number }] }[];
export const agentsErrorJsonSchema: RJSFSchema = {
	type: "object",
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
						ParseError: { type: "object", title: "Agents Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "Agents Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "Agents Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IdentityNotFound"] },
						IdentityNotFound: { type: "object", title: "Agents Error Identity Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerNotFound"] },
						IssuerNotFound: { type: "object", title: "Agents Error Issuer Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerAlreadyExists"] },
						IssuerAlreadyExists: { type: "object", title: "Agents Error Issuer Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "Agents Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "Agents Error Agent Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidIssuer"] },
						InvalidIssuer: { type: "object", title: "Agents Error Invalid Issuer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "Agents Error Call Contract Error", properties: {} },
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
						ParseError: { type: "object", title: "DeleteIdentity Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "DeleteIdentity Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "DeleteIdentity Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IdentityNotFound"] },
						IdentityNotFound: { type: "object", title: "DeleteIdentity Error Identity Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerNotFound"] },
						IssuerNotFound: { type: "object", title: "DeleteIdentity Error Issuer Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerAlreadyExists"] },
						IssuerAlreadyExists: {
							type: "object",
							title: "DeleteIdentity Error Issuer Already Exists",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "DeleteIdentity Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "DeleteIdentity Error Agent Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidIssuer"] },
						InvalidIssuer: { type: "object", title: "DeleteIdentity Error Invalid Issuer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "DeleteIdentity Error Call Contract Error", properties: {} },
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
	title: "GetIdentity Response",
	properties: {
		attributes: {
			type: "array",
			items: {
				type: "object",
				title: "Attributes List",
				properties: { tag: { type: "integer", minimum: 0, maximum: 255, title: "Tag" }, value: { type: "string" } },
			},
		},
		credentials: {
			type: "array",
			items: {
				type: "object",
				title: "Credentials List",
				properties: {
					issuer: {
						type: "object",
						title: "Issuer",
						properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
					},
					key: { type: "string" },
				},
			},
		},
	},
};
export type GetIdentityResponseUi = {
	attributes: { tag: number; value: string }[];
	credentials: { issuer: { index: number; subindex: number }; key: string }[];
};
export const getIdentityErrorJsonSchema: RJSFSchema = {
	type: "object",
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
						ParseError: { type: "object", title: "GetIdentity Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "GetIdentity Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "GetIdentity Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IdentityNotFound"] },
						IdentityNotFound: { type: "object", title: "GetIdentity Error Identity Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerNotFound"] },
						IssuerNotFound: { type: "object", title: "GetIdentity Error Issuer Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerAlreadyExists"] },
						IssuerAlreadyExists: { type: "object", title: "GetIdentity Error Issuer Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "GetIdentity Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "GetIdentity Error Agent Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidIssuer"] },
						InvalidIssuer: { type: "object", title: "GetIdentity Error Invalid Issuer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "GetIdentity Error Call Contract Error", properties: {} },
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
export const hasIdentityResponseJsonSchema: RJSFSchema = { type: "boolean", title: "HasIdentity Response" };
export type HasIdentityResponseUi = boolean;
export const hasIdentityErrorJsonSchema: RJSFSchema = {
	type: "object",
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
						ParseError: { type: "object", title: "HasIdentity Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "HasIdentity Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "HasIdentity Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IdentityNotFound"] },
						IdentityNotFound: { type: "object", title: "HasIdentity Error Identity Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerNotFound"] },
						IssuerNotFound: { type: "object", title: "HasIdentity Error Issuer Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerAlreadyExists"] },
						IssuerAlreadyExists: { type: "object", title: "HasIdentity Error Issuer Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "HasIdentity Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "HasIdentity Error Agent Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidIssuer"] },
						InvalidIssuer: { type: "object", title: "HasIdentity Error Invalid Issuer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "HasIdentity Error Call Contract Error", properties: {} },
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
export const isAgentResponseJsonSchema: RJSFSchema = { type: "boolean", title: "IsAgent Response" };
export type IsAgentResponseUi = boolean;
export const isAgentErrorJsonSchema: RJSFSchema = {
	type: "object",
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
						ParseError: { type: "object", title: "IsAgent Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "IsAgent Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "IsAgent Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IdentityNotFound"] },
						IdentityNotFound: { type: "object", title: "IsAgent Error Identity Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerNotFound"] },
						IssuerNotFound: { type: "object", title: "IsAgent Error Issuer Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerAlreadyExists"] },
						IssuerAlreadyExists: { type: "object", title: "IsAgent Error Issuer Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "IsAgent Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "IsAgent Error Agent Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidIssuer"] },
						InvalidIssuer: { type: "object", title: "IsAgent Error Invalid Issuer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "IsAgent Error Call Contract Error", properties: {} },
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
	title: "IsIssuer Request",
	properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
};
export type IsIssuerRequestUi = { index: number; subindex: number };
export const isIssuerResponseJsonSchema: RJSFSchema = { type: "boolean", title: "IsIssuer Response" };
export type IsIssuerResponseUi = boolean;
export const isIssuerErrorJsonSchema: RJSFSchema = {
	type: "object",
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
						ParseError: { type: "object", title: "IsIssuer Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "IsIssuer Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "IsIssuer Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IdentityNotFound"] },
						IdentityNotFound: { type: "object", title: "IsIssuer Error Identity Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerNotFound"] },
						IssuerNotFound: { type: "object", title: "IsIssuer Error Issuer Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerAlreadyExists"] },
						IssuerAlreadyExists: { type: "object", title: "IsIssuer Error Issuer Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "IsIssuer Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "IsIssuer Error Agent Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidIssuer"] },
						InvalidIssuer: { type: "object", title: "IsIssuer Error Invalid Issuer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "IsIssuer Error Call Contract Error", properties: {} },
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
};
export type IsSameRequestUi = [
	{ tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] },
	{ tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] },
];
export const isSameResponseJsonSchema: RJSFSchema = { type: "boolean", title: "IsSame Response" };
export type IsSameResponseUi = boolean;
export const isSameErrorJsonSchema: RJSFSchema = {
	type: "object",
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
						ParseError: { type: "object", title: "IsSame Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "IsSame Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "IsSame Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IdentityNotFound"] },
						IdentityNotFound: { type: "object", title: "IsSame Error Identity Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerNotFound"] },
						IssuerNotFound: { type: "object", title: "IsSame Error Issuer Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerAlreadyExists"] },
						IssuerAlreadyExists: { type: "object", title: "IsSame Error Issuer Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "IsSame Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "IsSame Error Agent Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidIssuer"] },
						InvalidIssuer: { type: "object", title: "IsSame Error Invalid Issuer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "IsSame Error Call Contract Error", properties: {} },
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
export const isVerifiedResponseJsonSchema: RJSFSchema = { type: "boolean", title: "IsVerified Response" };
export type IsVerifiedResponseUi = boolean;
export const isVerifiedErrorJsonSchema: RJSFSchema = {
	type: "object",
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
						ParseError: { type: "object", title: "IsVerified Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "IsVerified Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "IsVerified Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IdentityNotFound"] },
						IdentityNotFound: { type: "object", title: "IsVerified Error Identity Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerNotFound"] },
						IssuerNotFound: { type: "object", title: "IsVerified Error Issuer Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerAlreadyExists"] },
						IssuerAlreadyExists: { type: "object", title: "IsVerified Error Issuer Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "IsVerified Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "IsVerified Error Agent Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidIssuer"] },
						InvalidIssuer: { type: "object", title: "IsVerified Error Invalid Issuer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "IsVerified Error Call Contract Error", properties: {} },
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
		title: "Issuers Response List",
		properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
	},
};
export type IssuersResponseUi = { index: number; subindex: number }[];
export const issuersErrorJsonSchema: RJSFSchema = {
	type: "object",
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
						ParseError: { type: "object", title: "Issuers Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "Issuers Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "Issuers Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IdentityNotFound"] },
						IdentityNotFound: { type: "object", title: "Issuers Error Identity Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerNotFound"] },
						IssuerNotFound: { type: "object", title: "Issuers Error Issuer Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerAlreadyExists"] },
						IssuerAlreadyExists: { type: "object", title: "Issuers Error Issuer Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "Issuers Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "Issuers Error Agent Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidIssuer"] },
						InvalidIssuer: { type: "object", title: "Issuers Error Invalid Issuer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "Issuers Error Call Contract Error", properties: {} },
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
	title: "RegisterIdentity Request",
	properties: {
		identity: {
			type: "object",
			title: "Identity",
			properties: {
				attributes: {
					type: "array",
					items: {
						type: "object",
						title: "Attributes List",
						properties: { tag: { type: "integer", minimum: 0, maximum: 255, title: "Tag" }, value: { type: "string" } },
					},
				},
				credentials: {
					type: "array",
					items: {
						type: "object",
						title: "Credentials List",
						properties: {
							issuer: {
								type: "object",
								title: "Issuer",
								properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
							},
							key: { type: "string" },
						},
					},
				},
			},
		},
		address: {
			type: "object",
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
						ParseError: { type: "object", title: "RegisterIdentity Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "RegisterIdentity Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "RegisterIdentity Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IdentityNotFound"] },
						IdentityNotFound: { type: "object", title: "RegisterIdentity Error Identity Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerNotFound"] },
						IssuerNotFound: { type: "object", title: "RegisterIdentity Error Issuer Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerAlreadyExists"] },
						IssuerAlreadyExists: {
							type: "object",
							title: "RegisterIdentity Error Issuer Already Exists",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: {
							type: "object",
							title: "RegisterIdentity Error Agent Already Exists",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "RegisterIdentity Error Agent Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidIssuer"] },
						InvalidIssuer: { type: "object", title: "RegisterIdentity Error Invalid Issuer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "RegisterIdentity Error Call Contract Error", properties: {} },
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
						ParseError: { type: "object", title: "RemoveAgent Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "RemoveAgent Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "RemoveAgent Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IdentityNotFound"] },
						IdentityNotFound: { type: "object", title: "RemoveAgent Error Identity Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerNotFound"] },
						IssuerNotFound: { type: "object", title: "RemoveAgent Error Issuer Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerAlreadyExists"] },
						IssuerAlreadyExists: { type: "object", title: "RemoveAgent Error Issuer Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "RemoveAgent Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "RemoveAgent Error Agent Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidIssuer"] },
						InvalidIssuer: { type: "object", title: "RemoveAgent Error Invalid Issuer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "RemoveAgent Error Call Contract Error", properties: {} },
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
	title: "RemoveIssuer Request",
	properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
};
export type RemoveIssuerRequestUi = { index: number; subindex: number };
export const removeIssuerErrorJsonSchema: RJSFSchema = {
	type: "object",
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
						ParseError: { type: "object", title: "RemoveIssuer Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "RemoveIssuer Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "RemoveIssuer Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IdentityNotFound"] },
						IdentityNotFound: { type: "object", title: "RemoveIssuer Error Identity Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerNotFound"] },
						IssuerNotFound: { type: "object", title: "RemoveIssuer Error Issuer Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerAlreadyExists"] },
						IssuerAlreadyExists: { type: "object", title: "RemoveIssuer Error Issuer Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "RemoveIssuer Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "RemoveIssuer Error Agent Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidIssuer"] },
						InvalidIssuer: { type: "object", title: "RemoveIssuer Error Invalid Issuer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "RemoveIssuer Error Call Contract Error", properties: {} },
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
export const supportsRequestJsonSchema: RJSFSchema = { type: "array", items: { type: "string" } };
export type SupportsRequestUi = string[];
export const supportsResponseJsonSchema: RJSFSchema = {
	type: "array",
	items: {
		type: "object",
		properties: { tag: { type: "string", enum: ["NoSupport", "Support", "SupportBy"] } },
		required: ["tag"],
		dependencies: {
			tag: {
				oneOf: [
					{
						properties: {
							tag: { enum: ["NoSupport"] },
							NoSupport: { type: "object", title: "Supports Response List No Support", properties: {} },
						},
					},
					{
						properties: {
							tag: { enum: ["Support"] },
							Support: { type: "object", title: "Supports Response List Support", properties: {} },
						},
					},
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
											title: " List",
											properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
										},
									},
								],
							},
						},
					},
				],
			},
		},
	},
};
export type SupportsResponseUi =
	| { tag: "NoSupport"; NoSupport: never }
	| { tag: "Support"; Support: never }
	| { tag: "SupportBy"; SupportBy: [{ index: number; subindex: number }[]] }[];
export const supportsErrorJsonSchema: RJSFSchema = {
	type: "object",
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
						ParseError: { type: "object", title: "Supports Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "Supports Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "Supports Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IdentityNotFound"] },
						IdentityNotFound: { type: "object", title: "Supports Error Identity Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerNotFound"] },
						IssuerNotFound: { type: "object", title: "Supports Error Issuer Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerAlreadyExists"] },
						IssuerAlreadyExists: { type: "object", title: "Supports Error Issuer Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "Supports Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "Supports Error Agent Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidIssuer"] },
						InvalidIssuer: { type: "object", title: "Supports Error Invalid Issuer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "Supports Error Call Contract Error", properties: {} },
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
export const updateIdentityRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "UpdateIdentity Request",
	properties: {
		identity: {
			type: "object",
			title: "Identity",
			properties: {
				attributes: {
					type: "array",
					items: {
						type: "object",
						title: "Attributes List",
						properties: { tag: { type: "integer", minimum: 0, maximum: 255, title: "Tag" }, value: { type: "string" } },
					},
				},
				credentials: {
					type: "array",
					items: {
						type: "object",
						title: "Credentials List",
						properties: {
							issuer: {
								type: "object",
								title: "Issuer",
								properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
							},
							key: { type: "string" },
						},
					},
				},
			},
		},
		address: {
			type: "object",
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
export type UpdateIdentityRequestUi = {
	identity: {
		attributes: { tag: number; value: string }[];
		credentials: { issuer: { index: number; subindex: number }; key: string }[];
	};
	address: { tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
};
export const updateIdentityErrorJsonSchema: RJSFSchema = {
	type: "object",
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
						ParseError: { type: "object", title: "UpdateIdentity Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "UpdateIdentity Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "UpdateIdentity Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IdentityNotFound"] },
						IdentityNotFound: { type: "object", title: "UpdateIdentity Error Identity Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerNotFound"] },
						IssuerNotFound: { type: "object", title: "UpdateIdentity Error Issuer Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["IssuerAlreadyExists"] },
						IssuerAlreadyExists: {
							type: "object",
							title: "UpdateIdentity Error Issuer Already Exists",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "UpdateIdentity Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "UpdateIdentity Error Agent Not Found", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidIssuer"] },
						InvalidIssuer: { type: "object", title: "UpdateIdentity Error Invalid Issuer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "UpdateIdentity Error Call Contract Error", properties: {} },
					},
				},
			],
		},
	},
};
export type UpdateIdentityErrorUi =
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
export const init = (props: { onInitialize: (contract: ContractAddress.Type) => void }) =>
	GenericInit<never, never>({ onContractInitialized: props.onInitialize, method: client.init });
export const ENTRYPOINTS_UI: {
	[key: keyof typeof types.ENTRYPOINTS]: (props: { contract: ContractAddress.Type }) => React.JSX.Element;
} = {
	addAgent: (props: { contract: ContractAddress.Type }) =>
		GenericUpdate<types.AddAgentRequest, AddAgentRequestUi, types.AddAgentError, AddAgentErrorUi>({
			contract: props.contract,
			method: client.addAgent,
			requestJsonSchema: addAgentRequestJsonSchema,
			requestSchemaBase64: types.addAgentRequestSchemaBase64,
			errorJsonSchema: addAgentErrorJsonSchema,
			errorSchemaBase64: types.addAgentErrorSchemaBase64,
		}),
	addIssuer: (props: { contract: ContractAddress.Type }) =>
		GenericUpdate<types.AddIssuerRequest, AddIssuerRequestUi, types.AddIssuerError, AddIssuerErrorUi>({
			contract: props.contract,
			method: client.addIssuer,
			requestJsonSchema: addIssuerRequestJsonSchema,
			requestSchemaBase64: types.addIssuerRequestSchemaBase64,
			errorJsonSchema: addIssuerErrorJsonSchema,
			errorSchemaBase64: types.addIssuerErrorSchemaBase64,
		}),
	agents: (props: { contract: ContractAddress.Type }) =>
		GenericInvoke<never, never, types.AgentsResponse, AgentsResponseUi, types.AgentsError, AgentsErrorUi>({
			contract: props.contract,
			method: client.agents,
			responseJsonSchema: agentsResponseJsonSchema,
			responseSchemaBase64: types.agentsResponseSchemaBase64,
			errorJsonSchema: agentsErrorJsonSchema,
			errorSchemaBase64: types.agentsErrorSchemaBase64,
		}),
	deleteIdentity: (props: { contract: ContractAddress.Type }) =>
		GenericUpdate<
			types.DeleteIdentityRequest,
			DeleteIdentityRequestUi,
			types.DeleteIdentityError,
			DeleteIdentityErrorUi
		>({
			contract: props.contract,
			method: client.deleteIdentity,
			requestJsonSchema: deleteIdentityRequestJsonSchema,
			requestSchemaBase64: types.deleteIdentityRequestSchemaBase64,
			errorJsonSchema: deleteIdentityErrorJsonSchema,
			errorSchemaBase64: types.deleteIdentityErrorSchemaBase64,
		}),
	getIdentity: (props: { contract: ContractAddress.Type }) =>
		GenericInvoke<
			types.GetIdentityRequest,
			GetIdentityRequestUi,
			types.GetIdentityResponse,
			GetIdentityResponseUi,
			types.GetIdentityError,
			GetIdentityErrorUi
		>({
			contract: props.contract,
			method: client.getIdentity,
			requestJsonSchema: getIdentityRequestJsonSchema,
			requestSchemaBase64: types.getIdentityRequestSchemaBase64,
			responseJsonSchema: getIdentityResponseJsonSchema,
			responseSchemaBase64: types.getIdentityResponseSchemaBase64,
			errorJsonSchema: getIdentityErrorJsonSchema,
			errorSchemaBase64: types.getIdentityErrorSchemaBase64,
		}),
	hasIdentity: (props: { contract: ContractAddress.Type }) =>
		GenericInvoke<
			types.HasIdentityRequest,
			HasIdentityRequestUi,
			types.HasIdentityResponse,
			HasIdentityResponseUi,
			types.HasIdentityError,
			HasIdentityErrorUi
		>({
			contract: props.contract,
			method: client.hasIdentity,
			requestJsonSchema: hasIdentityRequestJsonSchema,
			requestSchemaBase64: types.hasIdentityRequestSchemaBase64,
			responseJsonSchema: hasIdentityResponseJsonSchema,
			responseSchemaBase64: types.hasIdentityResponseSchemaBase64,
			errorJsonSchema: hasIdentityErrorJsonSchema,
			errorSchemaBase64: types.hasIdentityErrorSchemaBase64,
		}),
	isAgent: (props: { contract: ContractAddress.Type }) =>
		GenericInvoke<
			types.IsAgentRequest,
			IsAgentRequestUi,
			types.IsAgentResponse,
			IsAgentResponseUi,
			types.IsAgentError,
			IsAgentErrorUi
		>({
			contract: props.contract,
			method: client.isAgent,
			requestJsonSchema: isAgentRequestJsonSchema,
			requestSchemaBase64: types.isAgentRequestSchemaBase64,
			responseJsonSchema: isAgentResponseJsonSchema,
			responseSchemaBase64: types.isAgentResponseSchemaBase64,
			errorJsonSchema: isAgentErrorJsonSchema,
			errorSchemaBase64: types.isAgentErrorSchemaBase64,
		}),
	isIssuer: (props: { contract: ContractAddress.Type }) =>
		GenericInvoke<
			types.IsIssuerRequest,
			IsIssuerRequestUi,
			types.IsIssuerResponse,
			IsIssuerResponseUi,
			types.IsIssuerError,
			IsIssuerErrorUi
		>({
			contract: props.contract,
			method: client.isIssuer,
			requestJsonSchema: isIssuerRequestJsonSchema,
			requestSchemaBase64: types.isIssuerRequestSchemaBase64,
			responseJsonSchema: isIssuerResponseJsonSchema,
			responseSchemaBase64: types.isIssuerResponseSchemaBase64,
			errorJsonSchema: isIssuerErrorJsonSchema,
			errorSchemaBase64: types.isIssuerErrorSchemaBase64,
		}),
	isSame: (props: { contract: ContractAddress.Type }) =>
		GenericInvoke<
			types.IsSameRequest,
			IsSameRequestUi,
			types.IsSameResponse,
			IsSameResponseUi,
			types.IsSameError,
			IsSameErrorUi
		>({
			contract: props.contract,
			method: client.isSame,
			requestJsonSchema: isSameRequestJsonSchema,
			requestSchemaBase64: types.isSameRequestSchemaBase64,
			responseJsonSchema: isSameResponseJsonSchema,
			responseSchemaBase64: types.isSameResponseSchemaBase64,
			errorJsonSchema: isSameErrorJsonSchema,
			errorSchemaBase64: types.isSameErrorSchemaBase64,
		}),
	isVerified: (props: { contract: ContractAddress.Type }) =>
		GenericInvoke<
			types.IsVerifiedRequest,
			IsVerifiedRequestUi,
			types.IsVerifiedResponse,
			IsVerifiedResponseUi,
			types.IsVerifiedError,
			IsVerifiedErrorUi
		>({
			contract: props.contract,
			method: client.isVerified,
			requestJsonSchema: isVerifiedRequestJsonSchema,
			requestSchemaBase64: types.isVerifiedRequestSchemaBase64,
			responseJsonSchema: isVerifiedResponseJsonSchema,
			responseSchemaBase64: types.isVerifiedResponseSchemaBase64,
			errorJsonSchema: isVerifiedErrorJsonSchema,
			errorSchemaBase64: types.isVerifiedErrorSchemaBase64,
		}),
	issuers: (props: { contract: ContractAddress.Type }) =>
		GenericInvoke<never, never, types.IssuersResponse, IssuersResponseUi, types.IssuersError, IssuersErrorUi>({
			contract: props.contract,
			method: client.issuers,
			responseJsonSchema: issuersResponseJsonSchema,
			responseSchemaBase64: types.issuersResponseSchemaBase64,
			errorJsonSchema: issuersErrorJsonSchema,
			errorSchemaBase64: types.issuersErrorSchemaBase64,
		}),
	registerIdentity: (props: { contract: ContractAddress.Type }) =>
		GenericUpdate<
			types.RegisterIdentityRequest,
			RegisterIdentityRequestUi,
			types.RegisterIdentityError,
			RegisterIdentityErrorUi
		>({
			contract: props.contract,
			method: client.registerIdentity,
			requestJsonSchema: registerIdentityRequestJsonSchema,
			requestSchemaBase64: types.registerIdentityRequestSchemaBase64,
			errorJsonSchema: registerIdentityErrorJsonSchema,
			errorSchemaBase64: types.registerIdentityErrorSchemaBase64,
		}),
	removeAgent: (props: { contract: ContractAddress.Type }) =>
		GenericUpdate<types.RemoveAgentRequest, RemoveAgentRequestUi, types.RemoveAgentError, RemoveAgentErrorUi>({
			contract: props.contract,
			method: client.removeAgent,
			requestJsonSchema: removeAgentRequestJsonSchema,
			requestSchemaBase64: types.removeAgentRequestSchemaBase64,
			errorJsonSchema: removeAgentErrorJsonSchema,
			errorSchemaBase64: types.removeAgentErrorSchemaBase64,
		}),
	removeIssuer: (props: { contract: ContractAddress.Type }) =>
		GenericUpdate<types.RemoveIssuerRequest, RemoveIssuerRequestUi, types.RemoveIssuerError, RemoveIssuerErrorUi>({
			contract: props.contract,
			method: client.removeIssuer,
			requestJsonSchema: removeIssuerRequestJsonSchema,
			requestSchemaBase64: types.removeIssuerRequestSchemaBase64,
			errorJsonSchema: removeIssuerErrorJsonSchema,
			errorSchemaBase64: types.removeIssuerErrorSchemaBase64,
		}),
	supports: (props: { contract: ContractAddress.Type }) =>
		GenericInvoke<
			types.SupportsRequest,
			SupportsRequestUi,
			types.SupportsResponse,
			SupportsResponseUi,
			types.SupportsError,
			SupportsErrorUi
		>({
			contract: props.contract,
			method: client.supports,
			requestJsonSchema: supportsRequestJsonSchema,
			requestSchemaBase64: types.supportsRequestSchemaBase64,
			responseJsonSchema: supportsResponseJsonSchema,
			responseSchemaBase64: types.supportsResponseSchemaBase64,
			errorJsonSchema: supportsErrorJsonSchema,
			errorSchemaBase64: types.supportsErrorSchemaBase64,
		}),
	updateIdentity: (props: { contract: ContractAddress.Type }) =>
		GenericUpdate<
			types.UpdateIdentityRequest,
			UpdateIdentityRequestUi,
			types.UpdateIdentityError,
			UpdateIdentityErrorUi
		>({
			contract: props.contract,
			method: client.updateIdentity,
			requestJsonSchema: updateIdentityRequestJsonSchema,
			requestSchemaBase64: types.updateIdentityRequestSchemaBase64,
			errorJsonSchema: updateIdentityErrorJsonSchema,
			errorSchemaBase64: types.updateIdentityErrorSchemaBase64,
		}),
};
