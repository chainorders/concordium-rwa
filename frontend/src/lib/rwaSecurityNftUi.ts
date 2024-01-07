import { RJSFSchema } from "@rjsf/utils";
import React from "react";
import { ContractAddress } from "@concordium/web-sdk";
import { default as client } from "./rwaSecurityNft";
import * as types from "./rwaSecurityNft";
import { GenericInit, GenericInvoke, GenericUpdate } from "./GenericContractUI";
export const initRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "init Request",
	properties: {
		identity_registry: {
			type: "object",
			title: "Identity Registry",
			properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
		},
		compliance: {
			type: "object",
			title: "Compliance",
			properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
		},
		sponsors: {
			type: "array",
			items: {
				type: "object",
				title: "Sponsors List",
				properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
			},
		},
	},
};
export type initRequestUi = {
	identity_registry: { index: number; subindex: number };
	compliance: { index: number; subindex: number };
	sponsors: { index: number; subindex: number }[];
};
export const initErrorJsonSchema: RJSFSchema = {
	type: "object",
	properties: {
		tag: {
			type: "string",
			enum: [
				"InvalidTokenId",
				"InsufficientFunds",
				"Unauthorized",
				"ParseError",
				"LogError",
				"UnVerifiedIdentity",
				"InCompliantTransfer",
				"ComplianceError",
				"CallContractError",
				"PausedToken",
				"InvalidAmount",
				"InvalidAddress",
				"AgentAlreadyExists",
				"AgentNotFound",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["InvalidTokenId"] },
						InvalidTokenId: { type: "object", title: "init Error Invalid Token Id", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientFunds"] },
						InsufficientFunds: { type: "object", title: "init Error Insufficient Funds", properties: {} },
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
						tag: { enum: ["UnVerifiedIdentity"] },
						UnVerifiedIdentity: { type: "object", title: "init Error Un Verified Identity", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InCompliantTransfer"] },
						InCompliantTransfer: { type: "object", title: "init Error In Compliant Transfer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ComplianceError"] },
						ComplianceError: { type: "object", title: "init Error Compliance Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "init Error Call Contract Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["PausedToken"] },
						PausedToken: { type: "object", title: "init Error Paused Token", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAmount"] },
						InvalidAmount: { type: "object", title: "init Error Invalid Amount", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAddress"] },
						InvalidAddress: { type: "object", title: "init Error Invalid Address", properties: {} },
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
			],
		},
	},
};
export type initErrorUi =
	| { tag: "InvalidTokenId"; InvalidTokenId: never }
	| { tag: "InsufficientFunds"; InsufficientFunds: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "UnVerifiedIdentity"; UnVerifiedIdentity: never }
	| { tag: "InCompliantTransfer"; InCompliantTransfer: never }
	| { tag: "ComplianceError"; ComplianceError: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "PausedToken"; PausedToken: never }
	| { tag: "InvalidAmount"; InvalidAmount: never }
	| { tag: "InvalidAddress"; InvalidAddress: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never };
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
				"InvalidTokenId",
				"InsufficientFunds",
				"Unauthorized",
				"ParseError",
				"LogError",
				"UnVerifiedIdentity",
				"InCompliantTransfer",
				"ComplianceError",
				"CallContractError",
				"PausedToken",
				"InvalidAmount",
				"InvalidAddress",
				"AgentAlreadyExists",
				"AgentNotFound",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["InvalidTokenId"] },
						InvalidTokenId: { type: "object", title: "AddAgent Error Invalid Token Id", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientFunds"] },
						InsufficientFunds: { type: "object", title: "AddAgent Error Insufficient Funds", properties: {} },
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
						tag: { enum: ["UnVerifiedIdentity"] },
						UnVerifiedIdentity: { type: "object", title: "AddAgent Error Un Verified Identity", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InCompliantTransfer"] },
						InCompliantTransfer: { type: "object", title: "AddAgent Error In Compliant Transfer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ComplianceError"] },
						ComplianceError: { type: "object", title: "AddAgent Error Compliance Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "AddAgent Error Call Contract Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["PausedToken"] },
						PausedToken: { type: "object", title: "AddAgent Error Paused Token", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAmount"] },
						InvalidAmount: { type: "object", title: "AddAgent Error Invalid Amount", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAddress"] },
						InvalidAddress: { type: "object", title: "AddAgent Error Invalid Address", properties: {} },
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
			],
		},
	},
};
export type AddAgentErrorUi =
	| { tag: "InvalidTokenId"; InvalidTokenId: never }
	| { tag: "InsufficientFunds"; InsufficientFunds: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "UnVerifiedIdentity"; UnVerifiedIdentity: never }
	| { tag: "InCompliantTransfer"; InCompliantTransfer: never }
	| { tag: "ComplianceError"; ComplianceError: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "PausedToken"; PausedToken: never }
	| { tag: "InvalidAmount"; InvalidAmount: never }
	| { tag: "InvalidAddress"; InvalidAddress: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never };
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
				"InvalidTokenId",
				"InsufficientFunds",
				"Unauthorized",
				"ParseError",
				"LogError",
				"UnVerifiedIdentity",
				"InCompliantTransfer",
				"ComplianceError",
				"CallContractError",
				"PausedToken",
				"InvalidAmount",
				"InvalidAddress",
				"AgentAlreadyExists",
				"AgentNotFound",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["InvalidTokenId"] },
						InvalidTokenId: { type: "object", title: "Agents Error Invalid Token Id", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientFunds"] },
						InsufficientFunds: { type: "object", title: "Agents Error Insufficient Funds", properties: {} },
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
						tag: { enum: ["UnVerifiedIdentity"] },
						UnVerifiedIdentity: { type: "object", title: "Agents Error Un Verified Identity", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InCompliantTransfer"] },
						InCompliantTransfer: { type: "object", title: "Agents Error In Compliant Transfer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ComplianceError"] },
						ComplianceError: { type: "object", title: "Agents Error Compliance Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "Agents Error Call Contract Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["PausedToken"] },
						PausedToken: { type: "object", title: "Agents Error Paused Token", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAmount"] },
						InvalidAmount: { type: "object", title: "Agents Error Invalid Amount", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAddress"] },
						InvalidAddress: { type: "object", title: "Agents Error Invalid Address", properties: {} },
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
			],
		},
	},
};
export type AgentsErrorUi =
	| { tag: "InvalidTokenId"; InvalidTokenId: never }
	| { tag: "InsufficientFunds"; InsufficientFunds: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "UnVerifiedIdentity"; UnVerifiedIdentity: never }
	| { tag: "InCompliantTransfer"; InCompliantTransfer: never }
	| { tag: "ComplianceError"; ComplianceError: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "PausedToken"; PausedToken: never }
	| { tag: "InvalidAmount"; InvalidAmount: never }
	| { tag: "InvalidAddress"; InvalidAddress: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never };
export const balanceOfRequestJsonSchema: RJSFSchema = {
	type: "array",
	items: {
		type: "object",
		title: "BalanceOf Request List",
		properties: {
			token_id: { type: "string" },
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
												properties: {
													index: { type: "integer", minimum: 0 },
													subindex: { type: "integer", minimum: 0 },
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
		},
	},
};
export type BalanceOfRequestUi = {
	token_id: string;
	address: { tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
}[];
export const balanceOfResponseJsonSchema: RJSFSchema = { type: "array", items: { type: "string" } };
export type BalanceOfResponseUi = string[];
export const balanceOfErrorJsonSchema: RJSFSchema = {
	type: "object",
	properties: {
		tag: {
			type: "string",
			enum: [
				"InvalidTokenId",
				"InsufficientFunds",
				"Unauthorized",
				"ParseError",
				"LogError",
				"UnVerifiedIdentity",
				"InCompliantTransfer",
				"ComplianceError",
				"CallContractError",
				"PausedToken",
				"InvalidAmount",
				"InvalidAddress",
				"AgentAlreadyExists",
				"AgentNotFound",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["InvalidTokenId"] },
						InvalidTokenId: { type: "object", title: "BalanceOf Error Invalid Token Id", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientFunds"] },
						InsufficientFunds: { type: "object", title: "BalanceOf Error Insufficient Funds", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "BalanceOf Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "BalanceOf Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "BalanceOf Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["UnVerifiedIdentity"] },
						UnVerifiedIdentity: { type: "object", title: "BalanceOf Error Un Verified Identity", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InCompliantTransfer"] },
						InCompliantTransfer: { type: "object", title: "BalanceOf Error In Compliant Transfer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ComplianceError"] },
						ComplianceError: { type: "object", title: "BalanceOf Error Compliance Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "BalanceOf Error Call Contract Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["PausedToken"] },
						PausedToken: { type: "object", title: "BalanceOf Error Paused Token", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAmount"] },
						InvalidAmount: { type: "object", title: "BalanceOf Error Invalid Amount", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAddress"] },
						InvalidAddress: { type: "object", title: "BalanceOf Error Invalid Address", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "BalanceOf Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "BalanceOf Error Agent Not Found", properties: {} },
					},
				},
			],
		},
	},
};
export type BalanceOfErrorUi =
	| { tag: "InvalidTokenId"; InvalidTokenId: never }
	| { tag: "InsufficientFunds"; InsufficientFunds: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "UnVerifiedIdentity"; UnVerifiedIdentity: never }
	| { tag: "InCompliantTransfer"; InCompliantTransfer: never }
	| { tag: "ComplianceError"; ComplianceError: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "PausedToken"; PausedToken: never }
	| { tag: "InvalidAmount"; InvalidAmount: never }
	| { tag: "InvalidAddress"; InvalidAddress: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never };
export const balanceOfFrozenRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "BalanceOfFrozen Request",
	properties: {
		owner: {
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
		tokens: { type: "array", items: { type: "string" } },
	},
};
export type BalanceOfFrozenRequestUi = {
	owner: { tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
	tokens: string[];
};
export const balanceOfFrozenResponseJsonSchema: RJSFSchema = {
	type: "object",
	title: "BalanceOfFrozen Response",
	properties: { tokens: { type: "array", items: { type: "string" } } },
};
export type BalanceOfFrozenResponseUi = { tokens: string[] };
export const balanceOfFrozenErrorJsonSchema: RJSFSchema = {
	type: "object",
	properties: {
		tag: {
			type: "string",
			enum: [
				"InvalidTokenId",
				"InsufficientFunds",
				"Unauthorized",
				"ParseError",
				"LogError",
				"UnVerifiedIdentity",
				"InCompliantTransfer",
				"ComplianceError",
				"CallContractError",
				"PausedToken",
				"InvalidAmount",
				"InvalidAddress",
				"AgentAlreadyExists",
				"AgentNotFound",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["InvalidTokenId"] },
						InvalidTokenId: { type: "object", title: "BalanceOfFrozen Error Invalid Token Id", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientFunds"] },
						InsufficientFunds: { type: "object", title: "BalanceOfFrozen Error Insufficient Funds", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "BalanceOfFrozen Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "BalanceOfFrozen Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "BalanceOfFrozen Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["UnVerifiedIdentity"] },
						UnVerifiedIdentity: { type: "object", title: "BalanceOfFrozen Error Un Verified Identity", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InCompliantTransfer"] },
						InCompliantTransfer: {
							type: "object",
							title: "BalanceOfFrozen Error In Compliant Transfer",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["ComplianceError"] },
						ComplianceError: { type: "object", title: "BalanceOfFrozen Error Compliance Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "BalanceOfFrozen Error Call Contract Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["PausedToken"] },
						PausedToken: { type: "object", title: "BalanceOfFrozen Error Paused Token", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAmount"] },
						InvalidAmount: { type: "object", title: "BalanceOfFrozen Error Invalid Amount", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAddress"] },
						InvalidAddress: { type: "object", title: "BalanceOfFrozen Error Invalid Address", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "BalanceOfFrozen Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "BalanceOfFrozen Error Agent Not Found", properties: {} },
					},
				},
			],
		},
	},
};
export type BalanceOfFrozenErrorUi =
	| { tag: "InvalidTokenId"; InvalidTokenId: never }
	| { tag: "InsufficientFunds"; InsufficientFunds: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "UnVerifiedIdentity"; UnVerifiedIdentity: never }
	| { tag: "InCompliantTransfer"; InCompliantTransfer: never }
	| { tag: "ComplianceError"; ComplianceError: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "PausedToken"; PausedToken: never }
	| { tag: "InvalidAmount"; InvalidAmount: never }
	| { tag: "InvalidAddress"; InvalidAddress: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never };
export const balanceOfUnFrozenRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "BalanceOfUnFrozen Request",
	properties: {
		owner: {
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
		tokens: { type: "array", items: { type: "string" } },
	},
};
export type BalanceOfUnFrozenRequestUi = {
	owner: { tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
	tokens: string[];
};
export const balanceOfUnFrozenResponseJsonSchema: RJSFSchema = {
	type: "object",
	title: "BalanceOfUnFrozen Response",
	properties: { tokens: { type: "array", items: { type: "string" } } },
};
export type BalanceOfUnFrozenResponseUi = { tokens: string[] };
export const balanceOfUnFrozenErrorJsonSchema: RJSFSchema = {
	type: "object",
	properties: {
		tag: {
			type: "string",
			enum: [
				"InvalidTokenId",
				"InsufficientFunds",
				"Unauthorized",
				"ParseError",
				"LogError",
				"UnVerifiedIdentity",
				"InCompliantTransfer",
				"ComplianceError",
				"CallContractError",
				"PausedToken",
				"InvalidAmount",
				"InvalidAddress",
				"AgentAlreadyExists",
				"AgentNotFound",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["InvalidTokenId"] },
						InvalidTokenId: { type: "object", title: "BalanceOfUnFrozen Error Invalid Token Id", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientFunds"] },
						InsufficientFunds: { type: "object", title: "BalanceOfUnFrozen Error Insufficient Funds", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "BalanceOfUnFrozen Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "BalanceOfUnFrozen Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "BalanceOfUnFrozen Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["UnVerifiedIdentity"] },
						UnVerifiedIdentity: {
							type: "object",
							title: "BalanceOfUnFrozen Error Un Verified Identity",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InCompliantTransfer"] },
						InCompliantTransfer: {
							type: "object",
							title: "BalanceOfUnFrozen Error In Compliant Transfer",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["ComplianceError"] },
						ComplianceError: { type: "object", title: "BalanceOfUnFrozen Error Compliance Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "BalanceOfUnFrozen Error Call Contract Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["PausedToken"] },
						PausedToken: { type: "object", title: "BalanceOfUnFrozen Error Paused Token", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAmount"] },
						InvalidAmount: { type: "object", title: "BalanceOfUnFrozen Error Invalid Amount", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAddress"] },
						InvalidAddress: { type: "object", title: "BalanceOfUnFrozen Error Invalid Address", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: {
							type: "object",
							title: "BalanceOfUnFrozen Error Agent Already Exists",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "BalanceOfUnFrozen Error Agent Not Found", properties: {} },
					},
				},
			],
		},
	},
};
export type BalanceOfUnFrozenErrorUi =
	| { tag: "InvalidTokenId"; InvalidTokenId: never }
	| { tag: "InsufficientFunds"; InsufficientFunds: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "UnVerifiedIdentity"; UnVerifiedIdentity: never }
	| { tag: "InCompliantTransfer"; InCompliantTransfer: never }
	| { tag: "ComplianceError"; ComplianceError: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "PausedToken"; PausedToken: never }
	| { tag: "InvalidAmount"; InvalidAmount: never }
	| { tag: "InvalidAddress"; InvalidAddress: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never };
export const burnRequestJsonSchema: RJSFSchema = {
	type: "array",
	items: {
		type: "object",
		title: "Burn Request List",
		properties: {
			token_id: { type: "string" },
			amount: { type: "string" },
			owner: {
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
												properties: {
													index: { type: "integer", minimum: 0 },
													subindex: { type: "integer", minimum: 0 },
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
		},
	},
};
export type BurnRequestUi = {
	token_id: string;
	amount: string;
	owner: { tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
}[];
export const burnErrorJsonSchema: RJSFSchema = {
	type: "object",
	properties: {
		tag: {
			type: "string",
			enum: [
				"InvalidTokenId",
				"InsufficientFunds",
				"Unauthorized",
				"ParseError",
				"LogError",
				"UnVerifiedIdentity",
				"InCompliantTransfer",
				"ComplianceError",
				"CallContractError",
				"PausedToken",
				"InvalidAmount",
				"InvalidAddress",
				"AgentAlreadyExists",
				"AgentNotFound",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["InvalidTokenId"] },
						InvalidTokenId: { type: "object", title: "Burn Error Invalid Token Id", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientFunds"] },
						InsufficientFunds: { type: "object", title: "Burn Error Insufficient Funds", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "Burn Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "Burn Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "Burn Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["UnVerifiedIdentity"] },
						UnVerifiedIdentity: { type: "object", title: "Burn Error Un Verified Identity", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InCompliantTransfer"] },
						InCompliantTransfer: { type: "object", title: "Burn Error In Compliant Transfer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ComplianceError"] },
						ComplianceError: { type: "object", title: "Burn Error Compliance Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "Burn Error Call Contract Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["PausedToken"] },
						PausedToken: { type: "object", title: "Burn Error Paused Token", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAmount"] },
						InvalidAmount: { type: "object", title: "Burn Error Invalid Amount", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAddress"] },
						InvalidAddress: { type: "object", title: "Burn Error Invalid Address", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "Burn Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "Burn Error Agent Not Found", properties: {} },
					},
				},
			],
		},
	},
};
export type BurnErrorUi =
	| { tag: "InvalidTokenId"; InvalidTokenId: never }
	| { tag: "InsufficientFunds"; InsufficientFunds: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "UnVerifiedIdentity"; UnVerifiedIdentity: never }
	| { tag: "InCompliantTransfer"; InCompliantTransfer: never }
	| { tag: "ComplianceError"; ComplianceError: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "PausedToken"; PausedToken: never }
	| { tag: "InvalidAmount"; InvalidAmount: never }
	| { tag: "InvalidAddress"; InvalidAddress: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never };
export const complianceResponseJsonSchema: RJSFSchema = {
	type: "object",
	title: "Compliance Response",
	properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
};
export type ComplianceResponseUi = { index: number; subindex: number };
export const forcedTransferRequestJsonSchema: RJSFSchema = {
	type: "array",
	items: {
		type: "object",
		title: "ForcedTransfer Request List",
		properties: {
			token_id: { type: "string" },
			amount: { type: "string" },
			from: {
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
												properties: {
													index: { type: "integer", minimum: 0 },
													subindex: { type: "integer", minimum: 0 },
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
			to: {
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
												properties: {
													index: { type: "integer", minimum: 0 },
													subindex: { type: "integer", minimum: 0 },
												},
											},
											{ type: "string" },
										],
									},
								},
							},
						],
					},
				},
			},
			data: { type: "string" },
		},
	},
};
export type ForcedTransferRequestUi = {
	token_id: string;
	amount: string;
	from: { tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
	to:
		| { tag: "Account"; Account: [string] }
		| { tag: "Contract"; Contract: [{ index: number; subindex: number }, string] };
	data: string;
}[];
export const forcedTransferErrorJsonSchema: RJSFSchema = {
	type: "object",
	properties: {
		tag: {
			type: "string",
			enum: [
				"InvalidTokenId",
				"InsufficientFunds",
				"Unauthorized",
				"ParseError",
				"LogError",
				"UnVerifiedIdentity",
				"InCompliantTransfer",
				"ComplianceError",
				"CallContractError",
				"PausedToken",
				"InvalidAmount",
				"InvalidAddress",
				"AgentAlreadyExists",
				"AgentNotFound",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["InvalidTokenId"] },
						InvalidTokenId: { type: "object", title: "ForcedTransfer Error Invalid Token Id", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientFunds"] },
						InsufficientFunds: { type: "object", title: "ForcedTransfer Error Insufficient Funds", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "ForcedTransfer Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "ForcedTransfer Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "ForcedTransfer Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["UnVerifiedIdentity"] },
						UnVerifiedIdentity: { type: "object", title: "ForcedTransfer Error Un Verified Identity", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InCompliantTransfer"] },
						InCompliantTransfer: {
							type: "object",
							title: "ForcedTransfer Error In Compliant Transfer",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["ComplianceError"] },
						ComplianceError: { type: "object", title: "ForcedTransfer Error Compliance Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "ForcedTransfer Error Call Contract Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["PausedToken"] },
						PausedToken: { type: "object", title: "ForcedTransfer Error Paused Token", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAmount"] },
						InvalidAmount: { type: "object", title: "ForcedTransfer Error Invalid Amount", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAddress"] },
						InvalidAddress: { type: "object", title: "ForcedTransfer Error Invalid Address", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "ForcedTransfer Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "ForcedTransfer Error Agent Not Found", properties: {} },
					},
				},
			],
		},
	},
};
export type ForcedTransferErrorUi =
	| { tag: "InvalidTokenId"; InvalidTokenId: never }
	| { tag: "InsufficientFunds"; InsufficientFunds: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "UnVerifiedIdentity"; UnVerifiedIdentity: never }
	| { tag: "InCompliantTransfer"; InCompliantTransfer: never }
	| { tag: "ComplianceError"; ComplianceError: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "PausedToken"; PausedToken: never }
	| { tag: "InvalidAmount"; InvalidAmount: never }
	| { tag: "InvalidAddress"; InvalidAddress: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never };
export const freezeRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Freeze Request",
	properties: {
		owner: {
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
		tokens: {
			type: "array",
			items: {
				type: "object",
				title: "Tokens List",
				properties: { token_id: { type: "string" }, token_amount: { type: "string" } },
			},
		},
	},
};
export type FreezeRequestUi = {
	owner: { tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
	tokens: { token_id: string; token_amount: string }[];
};
export const freezeErrorJsonSchema: RJSFSchema = {
	type: "object",
	properties: {
		tag: {
			type: "string",
			enum: [
				"InvalidTokenId",
				"InsufficientFunds",
				"Unauthorized",
				"ParseError",
				"LogError",
				"UnVerifiedIdentity",
				"InCompliantTransfer",
				"ComplianceError",
				"CallContractError",
				"PausedToken",
				"InvalidAmount",
				"InvalidAddress",
				"AgentAlreadyExists",
				"AgentNotFound",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["InvalidTokenId"] },
						InvalidTokenId: { type: "object", title: "Freeze Error Invalid Token Id", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientFunds"] },
						InsufficientFunds: { type: "object", title: "Freeze Error Insufficient Funds", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "Freeze Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "Freeze Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "Freeze Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["UnVerifiedIdentity"] },
						UnVerifiedIdentity: { type: "object", title: "Freeze Error Un Verified Identity", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InCompliantTransfer"] },
						InCompliantTransfer: { type: "object", title: "Freeze Error In Compliant Transfer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ComplianceError"] },
						ComplianceError: { type: "object", title: "Freeze Error Compliance Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "Freeze Error Call Contract Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["PausedToken"] },
						PausedToken: { type: "object", title: "Freeze Error Paused Token", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAmount"] },
						InvalidAmount: { type: "object", title: "Freeze Error Invalid Amount", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAddress"] },
						InvalidAddress: { type: "object", title: "Freeze Error Invalid Address", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "Freeze Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "Freeze Error Agent Not Found", properties: {} },
					},
				},
			],
		},
	},
};
export type FreezeErrorUi =
	| { tag: "InvalidTokenId"; InvalidTokenId: never }
	| { tag: "InsufficientFunds"; InsufficientFunds: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "UnVerifiedIdentity"; UnVerifiedIdentity: never }
	| { tag: "InCompliantTransfer"; InCompliantTransfer: never }
	| { tag: "ComplianceError"; ComplianceError: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "PausedToken"; PausedToken: never }
	| { tag: "InvalidAmount"; InvalidAmount: never }
	| { tag: "InvalidAddress"; InvalidAddress: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never };
export const identityRegistryResponseJsonSchema: RJSFSchema = {
	type: "object",
	title: "IdentityRegistry Response",
	properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
};
export type IdentityRegistryResponseUi = { index: number; subindex: number };
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
				"InvalidTokenId",
				"InsufficientFunds",
				"Unauthorized",
				"ParseError",
				"LogError",
				"UnVerifiedIdentity",
				"InCompliantTransfer",
				"ComplianceError",
				"CallContractError",
				"PausedToken",
				"InvalidAmount",
				"InvalidAddress",
				"AgentAlreadyExists",
				"AgentNotFound",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["InvalidTokenId"] },
						InvalidTokenId: { type: "object", title: "IsAgent Error Invalid Token Id", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientFunds"] },
						InsufficientFunds: { type: "object", title: "IsAgent Error Insufficient Funds", properties: {} },
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
						tag: { enum: ["UnVerifiedIdentity"] },
						UnVerifiedIdentity: { type: "object", title: "IsAgent Error Un Verified Identity", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InCompliantTransfer"] },
						InCompliantTransfer: { type: "object", title: "IsAgent Error In Compliant Transfer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ComplianceError"] },
						ComplianceError: { type: "object", title: "IsAgent Error Compliance Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "IsAgent Error Call Contract Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["PausedToken"] },
						PausedToken: { type: "object", title: "IsAgent Error Paused Token", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAmount"] },
						InvalidAmount: { type: "object", title: "IsAgent Error Invalid Amount", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAddress"] },
						InvalidAddress: { type: "object", title: "IsAgent Error Invalid Address", properties: {} },
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
			],
		},
	},
};
export type IsAgentErrorUi =
	| { tag: "InvalidTokenId"; InvalidTokenId: never }
	| { tag: "InsufficientFunds"; InsufficientFunds: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "UnVerifiedIdentity"; UnVerifiedIdentity: never }
	| { tag: "InCompliantTransfer"; InCompliantTransfer: never }
	| { tag: "ComplianceError"; ComplianceError: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "PausedToken"; PausedToken: never }
	| { tag: "InvalidAmount"; InvalidAmount: never }
	| { tag: "InvalidAddress"; InvalidAddress: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never };
export const isPausedRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "IsPaused Request",
	properties: { tokens: { type: "array", items: { type: "string" } } },
};
export type IsPausedRequestUi = { tokens: string[] };
export const isPausedResponseJsonSchema: RJSFSchema = {
	type: "object",
	title: "IsPaused Response",
	properties: { tokens: { type: "array", items: { type: "boolean", title: "Tokens List" } } },
};
export type IsPausedResponseUi = { tokens: boolean[] };
export const isPausedErrorJsonSchema: RJSFSchema = {
	type: "object",
	properties: {
		tag: {
			type: "string",
			enum: [
				"InvalidTokenId",
				"InsufficientFunds",
				"Unauthorized",
				"ParseError",
				"LogError",
				"UnVerifiedIdentity",
				"InCompliantTransfer",
				"ComplianceError",
				"CallContractError",
				"PausedToken",
				"InvalidAmount",
				"InvalidAddress",
				"AgentAlreadyExists",
				"AgentNotFound",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["InvalidTokenId"] },
						InvalidTokenId: { type: "object", title: "IsPaused Error Invalid Token Id", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientFunds"] },
						InsufficientFunds: { type: "object", title: "IsPaused Error Insufficient Funds", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "IsPaused Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "IsPaused Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "IsPaused Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["UnVerifiedIdentity"] },
						UnVerifiedIdentity: { type: "object", title: "IsPaused Error Un Verified Identity", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InCompliantTransfer"] },
						InCompliantTransfer: { type: "object", title: "IsPaused Error In Compliant Transfer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ComplianceError"] },
						ComplianceError: { type: "object", title: "IsPaused Error Compliance Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "IsPaused Error Call Contract Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["PausedToken"] },
						PausedToken: { type: "object", title: "IsPaused Error Paused Token", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAmount"] },
						InvalidAmount: { type: "object", title: "IsPaused Error Invalid Amount", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAddress"] },
						InvalidAddress: { type: "object", title: "IsPaused Error Invalid Address", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "IsPaused Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "IsPaused Error Agent Not Found", properties: {} },
					},
				},
			],
		},
	},
};
export type IsPausedErrorUi =
	| { tag: "InvalidTokenId"; InvalidTokenId: never }
	| { tag: "InsufficientFunds"; InsufficientFunds: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "UnVerifiedIdentity"; UnVerifiedIdentity: never }
	| { tag: "InCompliantTransfer"; InCompliantTransfer: never }
	| { tag: "ComplianceError"; ComplianceError: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "PausedToken"; PausedToken: never }
	| { tag: "InvalidAmount"; InvalidAmount: never }
	| { tag: "InvalidAddress"; InvalidAddress: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never };
export const mintRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Mint Request",
	properties: {
		owner: {
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
										{ type: "string" },
									],
								},
							},
						},
					],
				},
			},
		},
		tokens: {
			type: "array",
			items: {
				type: "object",
				title: "Tokens List",
				properties: {
					metadata_url: {
						type: "object",
						title: "Metadata Url",
						properties: {
							url: { type: "string" },
							hash: {
								type: "object",
								properties: { tag: { type: "string", enum: ["None", "Some"] } },
								required: ["tag"],
								dependencies: {
									tag: {
										oneOf: [
											{
												properties: {
													tag: { enum: ["None"] },
													None: { type: "object", title: "Hash None", properties: {} },
												},
											},
											{ properties: { tag: { enum: ["Some"] }, Some: { type: "array", items: [{ type: "string" }] } } },
										],
									},
								},
							},
						},
					},
				},
			},
		},
	},
};
export type MintRequestUi = {
	owner:
		| { tag: "Account"; Account: [string] }
		| { tag: "Contract"; Contract: [{ index: number; subindex: number }, string] };
	tokens: { metadata_url: { url: string; hash: { tag: "None"; None: never } | { tag: "Some"; Some: [string] } } }[];
};
export const mintErrorJsonSchema: RJSFSchema = {
	type: "object",
	properties: {
		tag: {
			type: "string",
			enum: [
				"InvalidTokenId",
				"InsufficientFunds",
				"Unauthorized",
				"ParseError",
				"LogError",
				"UnVerifiedIdentity",
				"InCompliantTransfer",
				"ComplianceError",
				"CallContractError",
				"PausedToken",
				"InvalidAmount",
				"InvalidAddress",
				"AgentAlreadyExists",
				"AgentNotFound",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["InvalidTokenId"] },
						InvalidTokenId: { type: "object", title: "Mint Error Invalid Token Id", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientFunds"] },
						InsufficientFunds: { type: "object", title: "Mint Error Insufficient Funds", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "Mint Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "Mint Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "Mint Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["UnVerifiedIdentity"] },
						UnVerifiedIdentity: { type: "object", title: "Mint Error Un Verified Identity", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InCompliantTransfer"] },
						InCompliantTransfer: { type: "object", title: "Mint Error In Compliant Transfer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ComplianceError"] },
						ComplianceError: { type: "object", title: "Mint Error Compliance Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "Mint Error Call Contract Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["PausedToken"] },
						PausedToken: { type: "object", title: "Mint Error Paused Token", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAmount"] },
						InvalidAmount: { type: "object", title: "Mint Error Invalid Amount", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAddress"] },
						InvalidAddress: { type: "object", title: "Mint Error Invalid Address", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "Mint Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "Mint Error Agent Not Found", properties: {} },
					},
				},
			],
		},
	},
};
export type MintErrorUi =
	| { tag: "InvalidTokenId"; InvalidTokenId: never }
	| { tag: "InsufficientFunds"; InsufficientFunds: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "UnVerifiedIdentity"; UnVerifiedIdentity: never }
	| { tag: "InCompliantTransfer"; InCompliantTransfer: never }
	| { tag: "ComplianceError"; ComplianceError: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "PausedToken"; PausedToken: never }
	| { tag: "InvalidAmount"; InvalidAmount: never }
	| { tag: "InvalidAddress"; InvalidAddress: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never };
export const operatorOfRequestJsonSchema: RJSFSchema = {
	type: "array",
	items: {
		type: "object",
		title: "OperatorOf Request List",
		properties: {
			owner: {
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
												properties: {
													index: { type: "integer", minimum: 0 },
													subindex: { type: "integer", minimum: 0 },
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
												properties: {
													index: { type: "integer", minimum: 0 },
													subindex: { type: "integer", minimum: 0 },
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
		},
	},
};
export type OperatorOfRequestUi = {
	owner: { tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
	address: { tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
}[];
export const operatorOfResponseJsonSchema: RJSFSchema = {
	type: "array",
	items: { type: "boolean", title: "OperatorOf Response List" },
};
export type OperatorOfResponseUi = boolean[];
export const operatorOfErrorJsonSchema: RJSFSchema = {
	type: "object",
	properties: {
		tag: {
			type: "string",
			enum: [
				"InvalidTokenId",
				"InsufficientFunds",
				"Unauthorized",
				"ParseError",
				"LogError",
				"UnVerifiedIdentity",
				"InCompliantTransfer",
				"ComplianceError",
				"CallContractError",
				"PausedToken",
				"InvalidAmount",
				"InvalidAddress",
				"AgentAlreadyExists",
				"AgentNotFound",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["InvalidTokenId"] },
						InvalidTokenId: { type: "object", title: "OperatorOf Error Invalid Token Id", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientFunds"] },
						InsufficientFunds: { type: "object", title: "OperatorOf Error Insufficient Funds", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "OperatorOf Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "OperatorOf Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "OperatorOf Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["UnVerifiedIdentity"] },
						UnVerifiedIdentity: { type: "object", title: "OperatorOf Error Un Verified Identity", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InCompliantTransfer"] },
						InCompliantTransfer: { type: "object", title: "OperatorOf Error In Compliant Transfer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ComplianceError"] },
						ComplianceError: { type: "object", title: "OperatorOf Error Compliance Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "OperatorOf Error Call Contract Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["PausedToken"] },
						PausedToken: { type: "object", title: "OperatorOf Error Paused Token", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAmount"] },
						InvalidAmount: { type: "object", title: "OperatorOf Error Invalid Amount", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAddress"] },
						InvalidAddress: { type: "object", title: "OperatorOf Error Invalid Address", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "OperatorOf Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "OperatorOf Error Agent Not Found", properties: {} },
					},
				},
			],
		},
	},
};
export type OperatorOfErrorUi =
	| { tag: "InvalidTokenId"; InvalidTokenId: never }
	| { tag: "InsufficientFunds"; InsufficientFunds: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "UnVerifiedIdentity"; UnVerifiedIdentity: never }
	| { tag: "InCompliantTransfer"; InCompliantTransfer: never }
	| { tag: "ComplianceError"; ComplianceError: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "PausedToken"; PausedToken: never }
	| { tag: "InvalidAmount"; InvalidAmount: never }
	| { tag: "InvalidAddress"; InvalidAddress: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never };
export const pauseRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Pause Request",
	properties: { tokens: { type: "array", items: { type: "string" } } },
};
export type PauseRequestUi = { tokens: string[] };
export const pauseErrorJsonSchema: RJSFSchema = {
	type: "object",
	properties: {
		tag: {
			type: "string",
			enum: [
				"InvalidTokenId",
				"InsufficientFunds",
				"Unauthorized",
				"ParseError",
				"LogError",
				"UnVerifiedIdentity",
				"InCompliantTransfer",
				"ComplianceError",
				"CallContractError",
				"PausedToken",
				"InvalidAmount",
				"InvalidAddress",
				"AgentAlreadyExists",
				"AgentNotFound",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["InvalidTokenId"] },
						InvalidTokenId: { type: "object", title: "Pause Error Invalid Token Id", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientFunds"] },
						InsufficientFunds: { type: "object", title: "Pause Error Insufficient Funds", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "Pause Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "Pause Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "Pause Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["UnVerifiedIdentity"] },
						UnVerifiedIdentity: { type: "object", title: "Pause Error Un Verified Identity", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InCompliantTransfer"] },
						InCompliantTransfer: { type: "object", title: "Pause Error In Compliant Transfer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ComplianceError"] },
						ComplianceError: { type: "object", title: "Pause Error Compliance Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "Pause Error Call Contract Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["PausedToken"] },
						PausedToken: { type: "object", title: "Pause Error Paused Token", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAmount"] },
						InvalidAmount: { type: "object", title: "Pause Error Invalid Amount", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAddress"] },
						InvalidAddress: { type: "object", title: "Pause Error Invalid Address", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "Pause Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "Pause Error Agent Not Found", properties: {} },
					},
				},
			],
		},
	},
};
export type PauseErrorUi =
	| { tag: "InvalidTokenId"; InvalidTokenId: never }
	| { tag: "InsufficientFunds"; InsufficientFunds: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "UnVerifiedIdentity"; UnVerifiedIdentity: never }
	| { tag: "InCompliantTransfer"; InCompliantTransfer: never }
	| { tag: "ComplianceError"; ComplianceError: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "PausedToken"; PausedToken: never }
	| { tag: "InvalidAmount"; InvalidAmount: never }
	| { tag: "InvalidAddress"; InvalidAddress: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never };
export const recoverRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Recover Request",
	properties: {
		lost_account: {
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
		new_account: {
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
export type RecoverRequestUi = {
	lost_account:
		| { tag: "Account"; Account: [string] }
		| { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
	new_account:
		| { tag: "Account"; Account: [string] }
		| { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
};
export const recoverErrorJsonSchema: RJSFSchema = {
	type: "object",
	properties: {
		tag: {
			type: "string",
			enum: [
				"InvalidTokenId",
				"InsufficientFunds",
				"Unauthorized",
				"ParseError",
				"LogError",
				"UnVerifiedIdentity",
				"InCompliantTransfer",
				"ComplianceError",
				"CallContractError",
				"PausedToken",
				"InvalidAmount",
				"InvalidAddress",
				"AgentAlreadyExists",
				"AgentNotFound",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["InvalidTokenId"] },
						InvalidTokenId: { type: "object", title: "Recover Error Invalid Token Id", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientFunds"] },
						InsufficientFunds: { type: "object", title: "Recover Error Insufficient Funds", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "Recover Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "Recover Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "Recover Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["UnVerifiedIdentity"] },
						UnVerifiedIdentity: { type: "object", title: "Recover Error Un Verified Identity", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InCompliantTransfer"] },
						InCompliantTransfer: { type: "object", title: "Recover Error In Compliant Transfer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ComplianceError"] },
						ComplianceError: { type: "object", title: "Recover Error Compliance Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "Recover Error Call Contract Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["PausedToken"] },
						PausedToken: { type: "object", title: "Recover Error Paused Token", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAmount"] },
						InvalidAmount: { type: "object", title: "Recover Error Invalid Amount", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAddress"] },
						InvalidAddress: { type: "object", title: "Recover Error Invalid Address", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "Recover Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "Recover Error Agent Not Found", properties: {} },
					},
				},
			],
		},
	},
};
export type RecoverErrorUi =
	| { tag: "InvalidTokenId"; InvalidTokenId: never }
	| { tag: "InsufficientFunds"; InsufficientFunds: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "UnVerifiedIdentity"; UnVerifiedIdentity: never }
	| { tag: "InCompliantTransfer"; InCompliantTransfer: never }
	| { tag: "ComplianceError"; ComplianceError: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "PausedToken"; PausedToken: never }
	| { tag: "InvalidAmount"; InvalidAmount: never }
	| { tag: "InvalidAddress"; InvalidAddress: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never };
export const recoveryAddressRequestJsonSchema: RJSFSchema = {
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
export type RecoveryAddressRequestUi =
	| { tag: "Account"; Account: [string] }
	| { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
export const recoveryAddressResponseJsonSchema: RJSFSchema = {
	type: "object",
	properties: { tag: { type: "string", enum: ["None", "Some"] } },
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["None"] },
						None: { type: "object", title: "RecoveryAddress Response None", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Some"] },
						Some: {
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
																	properties: {
																		index: { type: "integer", minimum: 0 },
																		subindex: { type: "integer", minimum: 0 },
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
							],
						},
					},
				},
			],
		},
	},
};
export type RecoveryAddressResponseUi =
	| { tag: "None"; None: never }
	| {
			tag: "Some";
			Some: [
				{ tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] },
			];
	  };
export const recoveryAddressErrorJsonSchema: RJSFSchema = {
	type: "object",
	properties: {
		tag: {
			type: "string",
			enum: [
				"InvalidTokenId",
				"InsufficientFunds",
				"Unauthorized",
				"ParseError",
				"LogError",
				"UnVerifiedIdentity",
				"InCompliantTransfer",
				"ComplianceError",
				"CallContractError",
				"PausedToken",
				"InvalidAmount",
				"InvalidAddress",
				"AgentAlreadyExists",
				"AgentNotFound",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["InvalidTokenId"] },
						InvalidTokenId: { type: "object", title: "RecoveryAddress Error Invalid Token Id", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientFunds"] },
						InsufficientFunds: { type: "object", title: "RecoveryAddress Error Insufficient Funds", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "RecoveryAddress Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "RecoveryAddress Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "RecoveryAddress Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["UnVerifiedIdentity"] },
						UnVerifiedIdentity: { type: "object", title: "RecoveryAddress Error Un Verified Identity", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InCompliantTransfer"] },
						InCompliantTransfer: {
							type: "object",
							title: "RecoveryAddress Error In Compliant Transfer",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["ComplianceError"] },
						ComplianceError: { type: "object", title: "RecoveryAddress Error Compliance Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "RecoveryAddress Error Call Contract Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["PausedToken"] },
						PausedToken: { type: "object", title: "RecoveryAddress Error Paused Token", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAmount"] },
						InvalidAmount: { type: "object", title: "RecoveryAddress Error Invalid Amount", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAddress"] },
						InvalidAddress: { type: "object", title: "RecoveryAddress Error Invalid Address", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "RecoveryAddress Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "RecoveryAddress Error Agent Not Found", properties: {} },
					},
				},
			],
		},
	},
};
export type RecoveryAddressErrorUi =
	| { tag: "InvalidTokenId"; InvalidTokenId: never }
	| { tag: "InsufficientFunds"; InsufficientFunds: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "UnVerifiedIdentity"; UnVerifiedIdentity: never }
	| { tag: "InCompliantTransfer"; InCompliantTransfer: never }
	| { tag: "ComplianceError"; ComplianceError: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "PausedToken"; PausedToken: never }
	| { tag: "InvalidAmount"; InvalidAmount: never }
	| { tag: "InvalidAddress"; InvalidAddress: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never };
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
				"InvalidTokenId",
				"InsufficientFunds",
				"Unauthorized",
				"ParseError",
				"LogError",
				"UnVerifiedIdentity",
				"InCompliantTransfer",
				"ComplianceError",
				"CallContractError",
				"PausedToken",
				"InvalidAmount",
				"InvalidAddress",
				"AgentAlreadyExists",
				"AgentNotFound",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["InvalidTokenId"] },
						InvalidTokenId: { type: "object", title: "RemoveAgent Error Invalid Token Id", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientFunds"] },
						InsufficientFunds: { type: "object", title: "RemoveAgent Error Insufficient Funds", properties: {} },
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
						tag: { enum: ["UnVerifiedIdentity"] },
						UnVerifiedIdentity: { type: "object", title: "RemoveAgent Error Un Verified Identity", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InCompliantTransfer"] },
						InCompliantTransfer: { type: "object", title: "RemoveAgent Error In Compliant Transfer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ComplianceError"] },
						ComplianceError: { type: "object", title: "RemoveAgent Error Compliance Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "RemoveAgent Error Call Contract Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["PausedToken"] },
						PausedToken: { type: "object", title: "RemoveAgent Error Paused Token", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAmount"] },
						InvalidAmount: { type: "object", title: "RemoveAgent Error Invalid Amount", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAddress"] },
						InvalidAddress: { type: "object", title: "RemoveAgent Error Invalid Address", properties: {} },
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
			],
		},
	},
};
export type RemoveAgentErrorUi =
	| { tag: "InvalidTokenId"; InvalidTokenId: never }
	| { tag: "InsufficientFunds"; InsufficientFunds: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "UnVerifiedIdentity"; UnVerifiedIdentity: never }
	| { tag: "InCompliantTransfer"; InCompliantTransfer: never }
	| { tag: "ComplianceError"; ComplianceError: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "PausedToken"; PausedToken: never }
	| { tag: "InvalidAmount"; InvalidAmount: never }
	| { tag: "InvalidAddress"; InvalidAddress: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never };
export const setComplianceRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "SetCompliance Request",
	properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
};
export type SetComplianceRequestUi = { index: number; subindex: number };
export const setComplianceErrorJsonSchema: RJSFSchema = {
	type: "object",
	properties: {
		tag: {
			type: "string",
			enum: [
				"InvalidTokenId",
				"InsufficientFunds",
				"Unauthorized",
				"ParseError",
				"LogError",
				"UnVerifiedIdentity",
				"InCompliantTransfer",
				"ComplianceError",
				"CallContractError",
				"PausedToken",
				"InvalidAmount",
				"InvalidAddress",
				"AgentAlreadyExists",
				"AgentNotFound",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["InvalidTokenId"] },
						InvalidTokenId: { type: "object", title: "SetCompliance Error Invalid Token Id", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientFunds"] },
						InsufficientFunds: { type: "object", title: "SetCompliance Error Insufficient Funds", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "SetCompliance Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "SetCompliance Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "SetCompliance Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["UnVerifiedIdentity"] },
						UnVerifiedIdentity: { type: "object", title: "SetCompliance Error Un Verified Identity", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InCompliantTransfer"] },
						InCompliantTransfer: { type: "object", title: "SetCompliance Error In Compliant Transfer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ComplianceError"] },
						ComplianceError: { type: "object", title: "SetCompliance Error Compliance Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "SetCompliance Error Call Contract Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["PausedToken"] },
						PausedToken: { type: "object", title: "SetCompliance Error Paused Token", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAmount"] },
						InvalidAmount: { type: "object", title: "SetCompliance Error Invalid Amount", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAddress"] },
						InvalidAddress: { type: "object", title: "SetCompliance Error Invalid Address", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "SetCompliance Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "SetCompliance Error Agent Not Found", properties: {} },
					},
				},
			],
		},
	},
};
export type SetComplianceErrorUi =
	| { tag: "InvalidTokenId"; InvalidTokenId: never }
	| { tag: "InsufficientFunds"; InsufficientFunds: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "UnVerifiedIdentity"; UnVerifiedIdentity: never }
	| { tag: "InCompliantTransfer"; InCompliantTransfer: never }
	| { tag: "ComplianceError"; ComplianceError: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "PausedToken"; PausedToken: never }
	| { tag: "InvalidAmount"; InvalidAmount: never }
	| { tag: "InvalidAddress"; InvalidAddress: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never };
export const setIdentityRegistryRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "SetIdentityRegistry Request",
	properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
};
export type SetIdentityRegistryRequestUi = { index: number; subindex: number };
export const setIdentityRegistryErrorJsonSchema: RJSFSchema = {
	type: "object",
	properties: {
		tag: {
			type: "string",
			enum: [
				"InvalidTokenId",
				"InsufficientFunds",
				"Unauthorized",
				"ParseError",
				"LogError",
				"UnVerifiedIdentity",
				"InCompliantTransfer",
				"ComplianceError",
				"CallContractError",
				"PausedToken",
				"InvalidAmount",
				"InvalidAddress",
				"AgentAlreadyExists",
				"AgentNotFound",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["InvalidTokenId"] },
						InvalidTokenId: { type: "object", title: "SetIdentityRegistry Error Invalid Token Id", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientFunds"] },
						InsufficientFunds: {
							type: "object",
							title: "SetIdentityRegistry Error Insufficient Funds",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "SetIdentityRegistry Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "SetIdentityRegistry Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "SetIdentityRegistry Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["UnVerifiedIdentity"] },
						UnVerifiedIdentity: {
							type: "object",
							title: "SetIdentityRegistry Error Un Verified Identity",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InCompliantTransfer"] },
						InCompliantTransfer: {
							type: "object",
							title: "SetIdentityRegistry Error In Compliant Transfer",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["ComplianceError"] },
						ComplianceError: { type: "object", title: "SetIdentityRegistry Error Compliance Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: {
							type: "object",
							title: "SetIdentityRegistry Error Call Contract Error",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["PausedToken"] },
						PausedToken: { type: "object", title: "SetIdentityRegistry Error Paused Token", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAmount"] },
						InvalidAmount: { type: "object", title: "SetIdentityRegistry Error Invalid Amount", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAddress"] },
						InvalidAddress: { type: "object", title: "SetIdentityRegistry Error Invalid Address", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: {
							type: "object",
							title: "SetIdentityRegistry Error Agent Already Exists",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "SetIdentityRegistry Error Agent Not Found", properties: {} },
					},
				},
			],
		},
	},
};
export type SetIdentityRegistryErrorUi =
	| { tag: "InvalidTokenId"; InvalidTokenId: never }
	| { tag: "InsufficientFunds"; InsufficientFunds: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "UnVerifiedIdentity"; UnVerifiedIdentity: never }
	| { tag: "InCompliantTransfer"; InCompliantTransfer: never }
	| { tag: "ComplianceError"; ComplianceError: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "PausedToken"; PausedToken: never }
	| { tag: "InvalidAmount"; InvalidAmount: never }
	| { tag: "InvalidAddress"; InvalidAddress: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never };
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
				"InvalidTokenId",
				"InsufficientFunds",
				"Unauthorized",
				"ParseError",
				"LogError",
				"UnVerifiedIdentity",
				"InCompliantTransfer",
				"ComplianceError",
				"CallContractError",
				"PausedToken",
				"InvalidAmount",
				"InvalidAddress",
				"AgentAlreadyExists",
				"AgentNotFound",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["InvalidTokenId"] },
						InvalidTokenId: { type: "object", title: "Supports Error Invalid Token Id", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientFunds"] },
						InsufficientFunds: { type: "object", title: "Supports Error Insufficient Funds", properties: {} },
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
						tag: { enum: ["UnVerifiedIdentity"] },
						UnVerifiedIdentity: { type: "object", title: "Supports Error Un Verified Identity", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InCompliantTransfer"] },
						InCompliantTransfer: { type: "object", title: "Supports Error In Compliant Transfer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ComplianceError"] },
						ComplianceError: { type: "object", title: "Supports Error Compliance Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "Supports Error Call Contract Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["PausedToken"] },
						PausedToken: { type: "object", title: "Supports Error Paused Token", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAmount"] },
						InvalidAmount: { type: "object", title: "Supports Error Invalid Amount", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAddress"] },
						InvalidAddress: { type: "object", title: "Supports Error Invalid Address", properties: {} },
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
			],
		},
	},
};
export type SupportsErrorUi =
	| { tag: "InvalidTokenId"; InvalidTokenId: never }
	| { tag: "InsufficientFunds"; InsufficientFunds: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "UnVerifiedIdentity"; UnVerifiedIdentity: never }
	| { tag: "InCompliantTransfer"; InCompliantTransfer: never }
	| { tag: "ComplianceError"; ComplianceError: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "PausedToken"; PausedToken: never }
	| { tag: "InvalidAmount"; InvalidAmount: never }
	| { tag: "InvalidAddress"; InvalidAddress: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never };
export const tokenMetadataRequestJsonSchema: RJSFSchema = { type: "array", items: { type: "string" } };
export type TokenMetadataRequestUi = string[];
export const tokenMetadataResponseJsonSchema: RJSFSchema = {
	type: "array",
	items: {
		type: "object",
		title: "TokenMetadata Response List",
		properties: {
			url: { type: "string" },
			hash: {
				type: "object",
				properties: { tag: { type: "string", enum: ["None", "Some"] } },
				required: ["tag"],
				dependencies: {
					tag: {
						oneOf: [
							{ properties: { tag: { enum: ["None"] }, None: { type: "object", title: "Hash None", properties: {} } } },
							{ properties: { tag: { enum: ["Some"] }, Some: { type: "array", items: [{ type: "string" }] } } },
						],
					},
				},
			},
		},
	},
};
export type TokenMetadataResponseUi = {
	url: string;
	hash: { tag: "None"; None: never } | { tag: "Some"; Some: [string] };
}[];
export const tokenMetadataErrorJsonSchema: RJSFSchema = {
	type: "object",
	properties: {
		tag: {
			type: "string",
			enum: [
				"InvalidTokenId",
				"InsufficientFunds",
				"Unauthorized",
				"ParseError",
				"LogError",
				"UnVerifiedIdentity",
				"InCompliantTransfer",
				"ComplianceError",
				"CallContractError",
				"PausedToken",
				"InvalidAmount",
				"InvalidAddress",
				"AgentAlreadyExists",
				"AgentNotFound",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["InvalidTokenId"] },
						InvalidTokenId: { type: "object", title: "TokenMetadata Error Invalid Token Id", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientFunds"] },
						InsufficientFunds: { type: "object", title: "TokenMetadata Error Insufficient Funds", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "TokenMetadata Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "TokenMetadata Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "TokenMetadata Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["UnVerifiedIdentity"] },
						UnVerifiedIdentity: { type: "object", title: "TokenMetadata Error Un Verified Identity", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InCompliantTransfer"] },
						InCompliantTransfer: { type: "object", title: "TokenMetadata Error In Compliant Transfer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ComplianceError"] },
						ComplianceError: { type: "object", title: "TokenMetadata Error Compliance Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "TokenMetadata Error Call Contract Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["PausedToken"] },
						PausedToken: { type: "object", title: "TokenMetadata Error Paused Token", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAmount"] },
						InvalidAmount: { type: "object", title: "TokenMetadata Error Invalid Amount", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAddress"] },
						InvalidAddress: { type: "object", title: "TokenMetadata Error Invalid Address", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "TokenMetadata Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "TokenMetadata Error Agent Not Found", properties: {} },
					},
				},
			],
		},
	},
};
export type TokenMetadataErrorUi =
	| { tag: "InvalidTokenId"; InvalidTokenId: never }
	| { tag: "InsufficientFunds"; InsufficientFunds: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "UnVerifiedIdentity"; UnVerifiedIdentity: never }
	| { tag: "InCompliantTransfer"; InCompliantTransfer: never }
	| { tag: "ComplianceError"; ComplianceError: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "PausedToken"; PausedToken: never }
	| { tag: "InvalidAmount"; InvalidAmount: never }
	| { tag: "InvalidAddress"; InvalidAddress: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never };
export const transferRequestJsonSchema: RJSFSchema = {
	type: "array",
	items: {
		type: "object",
		title: "Transfer Request List",
		properties: {
			token_id: { type: "string" },
			amount: { type: "string" },
			from: {
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
												properties: {
													index: { type: "integer", minimum: 0 },
													subindex: { type: "integer", minimum: 0 },
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
			to: {
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
												properties: {
													index: { type: "integer", minimum: 0 },
													subindex: { type: "integer", minimum: 0 },
												},
											},
											{ type: "string" },
										],
									},
								},
							},
						],
					},
				},
			},
			data: { type: "string" },
		},
	},
};
export type TransferRequestUi = {
	token_id: string;
	amount: string;
	from: { tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
	to:
		| { tag: "Account"; Account: [string] }
		| { tag: "Contract"; Contract: [{ index: number; subindex: number }, string] };
	data: string;
}[];
export const transferErrorJsonSchema: RJSFSchema = {
	type: "object",
	properties: {
		tag: {
			type: "string",
			enum: [
				"InvalidTokenId",
				"InsufficientFunds",
				"Unauthorized",
				"ParseError",
				"LogError",
				"UnVerifiedIdentity",
				"InCompliantTransfer",
				"ComplianceError",
				"CallContractError",
				"PausedToken",
				"InvalidAmount",
				"InvalidAddress",
				"AgentAlreadyExists",
				"AgentNotFound",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["InvalidTokenId"] },
						InvalidTokenId: { type: "object", title: "Transfer Error Invalid Token Id", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientFunds"] },
						InsufficientFunds: { type: "object", title: "Transfer Error Insufficient Funds", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "Transfer Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "Transfer Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "Transfer Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["UnVerifiedIdentity"] },
						UnVerifiedIdentity: { type: "object", title: "Transfer Error Un Verified Identity", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InCompliantTransfer"] },
						InCompliantTransfer: { type: "object", title: "Transfer Error In Compliant Transfer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ComplianceError"] },
						ComplianceError: { type: "object", title: "Transfer Error Compliance Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "Transfer Error Call Contract Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["PausedToken"] },
						PausedToken: { type: "object", title: "Transfer Error Paused Token", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAmount"] },
						InvalidAmount: { type: "object", title: "Transfer Error Invalid Amount", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAddress"] },
						InvalidAddress: { type: "object", title: "Transfer Error Invalid Address", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "Transfer Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "Transfer Error Agent Not Found", properties: {} },
					},
				},
			],
		},
	},
};
export type TransferErrorUi =
	| { tag: "InvalidTokenId"; InvalidTokenId: never }
	| { tag: "InsufficientFunds"; InsufficientFunds: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "UnVerifiedIdentity"; UnVerifiedIdentity: never }
	| { tag: "InCompliantTransfer"; InCompliantTransfer: never }
	| { tag: "ComplianceError"; ComplianceError: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "PausedToken"; PausedToken: never }
	| { tag: "InvalidAmount"; InvalidAmount: never }
	| { tag: "InvalidAddress"; InvalidAddress: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never };
export const unFreezeRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "UnFreeze Request",
	properties: {
		owner: {
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
		tokens: {
			type: "array",
			items: {
				type: "object",
				title: "Tokens List",
				properties: { token_id: { type: "string" }, token_amount: { type: "string" } },
			},
		},
	},
};
export type UnFreezeRequestUi = {
	owner: { tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
	tokens: { token_id: string; token_amount: string }[];
};
export const unFreezeErrorJsonSchema: RJSFSchema = {
	type: "object",
	properties: {
		tag: {
			type: "string",
			enum: [
				"InvalidTokenId",
				"InsufficientFunds",
				"Unauthorized",
				"ParseError",
				"LogError",
				"UnVerifiedIdentity",
				"InCompliantTransfer",
				"ComplianceError",
				"CallContractError",
				"PausedToken",
				"InvalidAmount",
				"InvalidAddress",
				"AgentAlreadyExists",
				"AgentNotFound",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["InvalidTokenId"] },
						InvalidTokenId: { type: "object", title: "UnFreeze Error Invalid Token Id", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientFunds"] },
						InsufficientFunds: { type: "object", title: "UnFreeze Error Insufficient Funds", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "UnFreeze Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "UnFreeze Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "UnFreeze Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["UnVerifiedIdentity"] },
						UnVerifiedIdentity: { type: "object", title: "UnFreeze Error Un Verified Identity", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InCompliantTransfer"] },
						InCompliantTransfer: { type: "object", title: "UnFreeze Error In Compliant Transfer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ComplianceError"] },
						ComplianceError: { type: "object", title: "UnFreeze Error Compliance Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "UnFreeze Error Call Contract Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["PausedToken"] },
						PausedToken: { type: "object", title: "UnFreeze Error Paused Token", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAmount"] },
						InvalidAmount: { type: "object", title: "UnFreeze Error Invalid Amount", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAddress"] },
						InvalidAddress: { type: "object", title: "UnFreeze Error Invalid Address", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "UnFreeze Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "UnFreeze Error Agent Not Found", properties: {} },
					},
				},
			],
		},
	},
};
export type UnFreezeErrorUi =
	| { tag: "InvalidTokenId"; InvalidTokenId: never }
	| { tag: "InsufficientFunds"; InsufficientFunds: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "UnVerifiedIdentity"; UnVerifiedIdentity: never }
	| { tag: "InCompliantTransfer"; InCompliantTransfer: never }
	| { tag: "ComplianceError"; ComplianceError: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "PausedToken"; PausedToken: never }
	| { tag: "InvalidAmount"; InvalidAmount: never }
	| { tag: "InvalidAddress"; InvalidAddress: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never };
export const unPauseRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "UnPause Request",
	properties: { tokens: { type: "array", items: { type: "string" } } },
};
export type UnPauseRequestUi = { tokens: string[] };
export const unPauseErrorJsonSchema: RJSFSchema = {
	type: "object",
	properties: {
		tag: {
			type: "string",
			enum: [
				"InvalidTokenId",
				"InsufficientFunds",
				"Unauthorized",
				"ParseError",
				"LogError",
				"UnVerifiedIdentity",
				"InCompliantTransfer",
				"ComplianceError",
				"CallContractError",
				"PausedToken",
				"InvalidAmount",
				"InvalidAddress",
				"AgentAlreadyExists",
				"AgentNotFound",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["InvalidTokenId"] },
						InvalidTokenId: { type: "object", title: "UnPause Error Invalid Token Id", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientFunds"] },
						InsufficientFunds: { type: "object", title: "UnPause Error Insufficient Funds", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "UnPause Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "UnPause Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "UnPause Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["UnVerifiedIdentity"] },
						UnVerifiedIdentity: { type: "object", title: "UnPause Error Un Verified Identity", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InCompliantTransfer"] },
						InCompliantTransfer: { type: "object", title: "UnPause Error In Compliant Transfer", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ComplianceError"] },
						ComplianceError: { type: "object", title: "UnPause Error Compliance Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "UnPause Error Call Contract Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["PausedToken"] },
						PausedToken: { type: "object", title: "UnPause Error Paused Token", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAmount"] },
						InvalidAmount: { type: "object", title: "UnPause Error Invalid Amount", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAddress"] },
						InvalidAddress: { type: "object", title: "UnPause Error Invalid Address", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "UnPause Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "UnPause Error Agent Not Found", properties: {} },
					},
				},
			],
		},
	},
};
export type UnPauseErrorUi =
	| { tag: "InvalidTokenId"; InvalidTokenId: never }
	| { tag: "InsufficientFunds"; InsufficientFunds: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "UnVerifiedIdentity"; UnVerifiedIdentity: never }
	| { tag: "InCompliantTransfer"; InCompliantTransfer: never }
	| { tag: "ComplianceError"; ComplianceError: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "PausedToken"; PausedToken: never }
	| { tag: "InvalidAmount"; InvalidAmount: never }
	| { tag: "InvalidAddress"; InvalidAddress: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never };
export const updateOperatorRequestJsonSchema: RJSFSchema = {
	type: "array",
	items: {
		type: "object",
		title: "UpdateOperator Request List",
		properties: {
			update: {
				type: "object",
				properties: { tag: { type: "string", enum: ["Remove", "Add"] } },
				required: ["tag"],
				dependencies: {
					tag: {
						oneOf: [
							{
								properties: {
									tag: { enum: ["Remove"] },
									Remove: { type: "object", title: "Update Remove", properties: {} },
								},
							},
							{ properties: { tag: { enum: ["Add"] }, Add: { type: "object", title: "Update Add", properties: {} } } },
						],
					},
				},
			},
			operator: {
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
												properties: {
													index: { type: "integer", minimum: 0 },
													subindex: { type: "integer", minimum: 0 },
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
		},
	},
};
export type UpdateOperatorRequestUi = {
	update: { tag: "Remove"; Remove: never } | { tag: "Add"; Add: never };
	operator:
		| { tag: "Account"; Account: [string] }
		| { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
}[];
export const updateOperatorErrorJsonSchema: RJSFSchema = {
	type: "object",
	properties: {
		tag: {
			type: "string",
			enum: [
				"InvalidTokenId",
				"InsufficientFunds",
				"Unauthorized",
				"ParseError",
				"LogError",
				"UnVerifiedIdentity",
				"InCompliantTransfer",
				"ComplianceError",
				"CallContractError",
				"PausedToken",
				"InvalidAmount",
				"InvalidAddress",
				"AgentAlreadyExists",
				"AgentNotFound",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["InvalidTokenId"] },
						InvalidTokenId: { type: "object", title: "UpdateOperator Error Invalid Token Id", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientFunds"] },
						InsufficientFunds: { type: "object", title: "UpdateOperator Error Insufficient Funds", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "UpdateOperator Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "UpdateOperator Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "UpdateOperator Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["UnVerifiedIdentity"] },
						UnVerifiedIdentity: { type: "object", title: "UpdateOperator Error Un Verified Identity", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InCompliantTransfer"] },
						InCompliantTransfer: {
							type: "object",
							title: "UpdateOperator Error In Compliant Transfer",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["ComplianceError"] },
						ComplianceError: { type: "object", title: "UpdateOperator Error Compliance Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "UpdateOperator Error Call Contract Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["PausedToken"] },
						PausedToken: { type: "object", title: "UpdateOperator Error Paused Token", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAmount"] },
						InvalidAmount: { type: "object", title: "UpdateOperator Error Invalid Amount", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAddress"] },
						InvalidAddress: { type: "object", title: "UpdateOperator Error Invalid Address", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "UpdateOperator Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "UpdateOperator Error Agent Not Found", properties: {} },
					},
				},
			],
		},
	},
};
export type UpdateOperatorErrorUi =
	| { tag: "InvalidTokenId"; InvalidTokenId: never }
	| { tag: "InsufficientFunds"; InsufficientFunds: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "UnVerifiedIdentity"; UnVerifiedIdentity: never }
	| { tag: "InCompliantTransfer"; InCompliantTransfer: never }
	| { tag: "ComplianceError"; ComplianceError: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "PausedToken"; PausedToken: never }
	| { tag: "InvalidAmount"; InvalidAmount: never }
	| { tag: "InvalidAddress"; InvalidAddress: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never };
export const init = (props: { onInitialize: (contract: ContractAddress.Type) => void }) =>
	GenericInit<types.initRequest, initRequestUi>({
		onContractInitialized: props.onInitialize,
		method: client.init,
		requestJsonSchema: initRequestJsonSchema,
		requestSchemaBase64: types.initRequestSchemaBase64,
	});
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
	agents: (props: { contract: ContractAddress.Type }) =>
		GenericInvoke<never, never, types.AgentsResponse, AgentsResponseUi, types.AgentsError, AgentsErrorUi>({
			contract: props.contract,
			method: client.agents,
			responseJsonSchema: agentsResponseJsonSchema,
			responseSchemaBase64: types.agentsResponseSchemaBase64,
			errorJsonSchema: agentsErrorJsonSchema,
			errorSchemaBase64: types.agentsErrorSchemaBase64,
		}),
	balanceOf: (props: { contract: ContractAddress.Type }) =>
		GenericInvoke<
			types.BalanceOfRequest,
			BalanceOfRequestUi,
			types.BalanceOfResponse,
			BalanceOfResponseUi,
			types.BalanceOfError,
			BalanceOfErrorUi
		>({
			contract: props.contract,
			method: client.balanceOf,
			requestJsonSchema: balanceOfRequestJsonSchema,
			requestSchemaBase64: types.balanceOfRequestSchemaBase64,
			responseJsonSchema: balanceOfResponseJsonSchema,
			responseSchemaBase64: types.balanceOfResponseSchemaBase64,
			errorJsonSchema: balanceOfErrorJsonSchema,
			errorSchemaBase64: types.balanceOfErrorSchemaBase64,
		}),
	balanceOfFrozen: (props: { contract: ContractAddress.Type }) =>
		GenericInvoke<
			types.BalanceOfFrozenRequest,
			BalanceOfFrozenRequestUi,
			types.BalanceOfFrozenResponse,
			BalanceOfFrozenResponseUi,
			types.BalanceOfFrozenError,
			BalanceOfFrozenErrorUi
		>({
			contract: props.contract,
			method: client.balanceOfFrozen,
			requestJsonSchema: balanceOfFrozenRequestJsonSchema,
			requestSchemaBase64: types.balanceOfFrozenRequestSchemaBase64,
			responseJsonSchema: balanceOfFrozenResponseJsonSchema,
			responseSchemaBase64: types.balanceOfFrozenResponseSchemaBase64,
			errorJsonSchema: balanceOfFrozenErrorJsonSchema,
			errorSchemaBase64: types.balanceOfFrozenErrorSchemaBase64,
		}),
	balanceOfUnFrozen: (props: { contract: ContractAddress.Type }) =>
		GenericInvoke<
			types.BalanceOfUnFrozenRequest,
			BalanceOfUnFrozenRequestUi,
			types.BalanceOfUnFrozenResponse,
			BalanceOfUnFrozenResponseUi,
			types.BalanceOfUnFrozenError,
			BalanceOfUnFrozenErrorUi
		>({
			contract: props.contract,
			method: client.balanceOfUnFrozen,
			requestJsonSchema: balanceOfUnFrozenRequestJsonSchema,
			requestSchemaBase64: types.balanceOfUnFrozenRequestSchemaBase64,
			responseJsonSchema: balanceOfUnFrozenResponseJsonSchema,
			responseSchemaBase64: types.balanceOfUnFrozenResponseSchemaBase64,
			errorJsonSchema: balanceOfUnFrozenErrorJsonSchema,
			errorSchemaBase64: types.balanceOfUnFrozenErrorSchemaBase64,
		}),
	burn: (props: { contract: ContractAddress.Type }) =>
		GenericUpdate<types.BurnRequest, BurnRequestUi, types.BurnError, BurnErrorUi>({
			contract: props.contract,
			method: client.burn,
			requestJsonSchema: burnRequestJsonSchema,
			requestSchemaBase64: types.burnRequestSchemaBase64,
			errorJsonSchema: burnErrorJsonSchema,
			errorSchemaBase64: types.burnErrorSchemaBase64,
		}),
	compliance: (props: { contract: ContractAddress.Type }) =>
		GenericInvoke<never, never, types.ComplianceResponse, ComplianceResponseUi, never, never>({
			contract: props.contract,
			method: client.compliance,
			responseJsonSchema: complianceResponseJsonSchema,
			responseSchemaBase64: types.complianceResponseSchemaBase64,
		}),
	forcedTransfer: (props: { contract: ContractAddress.Type }) =>
		GenericUpdate<
			types.ForcedTransferRequest,
			ForcedTransferRequestUi,
			types.ForcedTransferError,
			ForcedTransferErrorUi
		>({
			contract: props.contract,
			method: client.forcedTransfer,
			requestJsonSchema: forcedTransferRequestJsonSchema,
			requestSchemaBase64: types.forcedTransferRequestSchemaBase64,
			errorJsonSchema: forcedTransferErrorJsonSchema,
			errorSchemaBase64: types.forcedTransferErrorSchemaBase64,
		}),
	freeze: (props: { contract: ContractAddress.Type }) =>
		GenericUpdate<types.FreezeRequest, FreezeRequestUi, types.FreezeError, FreezeErrorUi>({
			contract: props.contract,
			method: client.freeze,
			requestJsonSchema: freezeRequestJsonSchema,
			requestSchemaBase64: types.freezeRequestSchemaBase64,
			errorJsonSchema: freezeErrorJsonSchema,
			errorSchemaBase64: types.freezeErrorSchemaBase64,
		}),
	identityRegistry: (props: { contract: ContractAddress.Type }) =>
		GenericInvoke<never, never, types.IdentityRegistryResponse, IdentityRegistryResponseUi, never, never>({
			contract: props.contract,
			method: client.identityRegistry,
			responseJsonSchema: identityRegistryResponseJsonSchema,
			responseSchemaBase64: types.identityRegistryResponseSchemaBase64,
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
	isPaused: (props: { contract: ContractAddress.Type }) =>
		GenericInvoke<
			types.IsPausedRequest,
			IsPausedRequestUi,
			types.IsPausedResponse,
			IsPausedResponseUi,
			types.IsPausedError,
			IsPausedErrorUi
		>({
			contract: props.contract,
			method: client.isPaused,
			requestJsonSchema: isPausedRequestJsonSchema,
			requestSchemaBase64: types.isPausedRequestSchemaBase64,
			responseJsonSchema: isPausedResponseJsonSchema,
			responseSchemaBase64: types.isPausedResponseSchemaBase64,
			errorJsonSchema: isPausedErrorJsonSchema,
			errorSchemaBase64: types.isPausedErrorSchemaBase64,
		}),
	mint: (props: { contract: ContractAddress.Type }) =>
		GenericUpdate<types.MintRequest, MintRequestUi, types.MintError, MintErrorUi>({
			contract: props.contract,
			method: client.mint,
			requestJsonSchema: mintRequestJsonSchema,
			requestSchemaBase64: types.mintRequestSchemaBase64,
			errorJsonSchema: mintErrorJsonSchema,
			errorSchemaBase64: types.mintErrorSchemaBase64,
		}),
	operatorOf: (props: { contract: ContractAddress.Type }) =>
		GenericInvoke<
			types.OperatorOfRequest,
			OperatorOfRequestUi,
			types.OperatorOfResponse,
			OperatorOfResponseUi,
			types.OperatorOfError,
			OperatorOfErrorUi
		>({
			contract: props.contract,
			method: client.operatorOf,
			requestJsonSchema: operatorOfRequestJsonSchema,
			requestSchemaBase64: types.operatorOfRequestSchemaBase64,
			responseJsonSchema: operatorOfResponseJsonSchema,
			responseSchemaBase64: types.operatorOfResponseSchemaBase64,
			errorJsonSchema: operatorOfErrorJsonSchema,
			errorSchemaBase64: types.operatorOfErrorSchemaBase64,
		}),
	pause: (props: { contract: ContractAddress.Type }) =>
		GenericUpdate<types.PauseRequest, PauseRequestUi, types.PauseError, PauseErrorUi>({
			contract: props.contract,
			method: client.pause,
			requestJsonSchema: pauseRequestJsonSchema,
			requestSchemaBase64: types.pauseRequestSchemaBase64,
			errorJsonSchema: pauseErrorJsonSchema,
			errorSchemaBase64: types.pauseErrorSchemaBase64,
		}),
	recover: (props: { contract: ContractAddress.Type }) =>
		GenericUpdate<types.RecoverRequest, RecoverRequestUi, types.RecoverError, RecoverErrorUi>({
			contract: props.contract,
			method: client.recover,
			requestJsonSchema: recoverRequestJsonSchema,
			requestSchemaBase64: types.recoverRequestSchemaBase64,
			errorJsonSchema: recoverErrorJsonSchema,
			errorSchemaBase64: types.recoverErrorSchemaBase64,
		}),
	recoveryAddress: (props: { contract: ContractAddress.Type }) =>
		GenericInvoke<
			types.RecoveryAddressRequest,
			RecoveryAddressRequestUi,
			types.RecoveryAddressResponse,
			RecoveryAddressResponseUi,
			types.RecoveryAddressError,
			RecoveryAddressErrorUi
		>({
			contract: props.contract,
			method: client.recoveryAddress,
			requestJsonSchema: recoveryAddressRequestJsonSchema,
			requestSchemaBase64: types.recoveryAddressRequestSchemaBase64,
			responseJsonSchema: recoveryAddressResponseJsonSchema,
			responseSchemaBase64: types.recoveryAddressResponseSchemaBase64,
			errorJsonSchema: recoveryAddressErrorJsonSchema,
			errorSchemaBase64: types.recoveryAddressErrorSchemaBase64,
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
	setCompliance: (props: { contract: ContractAddress.Type }) =>
		GenericUpdate<types.SetComplianceRequest, SetComplianceRequestUi, types.SetComplianceError, SetComplianceErrorUi>({
			contract: props.contract,
			method: client.setCompliance,
			requestJsonSchema: setComplianceRequestJsonSchema,
			requestSchemaBase64: types.setComplianceRequestSchemaBase64,
			errorJsonSchema: setComplianceErrorJsonSchema,
			errorSchemaBase64: types.setComplianceErrorSchemaBase64,
		}),
	setIdentityRegistry: (props: { contract: ContractAddress.Type }) =>
		GenericUpdate<
			types.SetIdentityRegistryRequest,
			SetIdentityRegistryRequestUi,
			types.SetIdentityRegistryError,
			SetIdentityRegistryErrorUi
		>({
			contract: props.contract,
			method: client.setIdentityRegistry,
			requestJsonSchema: setIdentityRegistryRequestJsonSchema,
			requestSchemaBase64: types.setIdentityRegistryRequestSchemaBase64,
			errorJsonSchema: setIdentityRegistryErrorJsonSchema,
			errorSchemaBase64: types.setIdentityRegistryErrorSchemaBase64,
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
	tokenMetadata: (props: { contract: ContractAddress.Type }) =>
		GenericInvoke<
			types.TokenMetadataRequest,
			TokenMetadataRequestUi,
			types.TokenMetadataResponse,
			TokenMetadataResponseUi,
			types.TokenMetadataError,
			TokenMetadataErrorUi
		>({
			contract: props.contract,
			method: client.tokenMetadata,
			requestJsonSchema: tokenMetadataRequestJsonSchema,
			requestSchemaBase64: types.tokenMetadataRequestSchemaBase64,
			responseJsonSchema: tokenMetadataResponseJsonSchema,
			responseSchemaBase64: types.tokenMetadataResponseSchemaBase64,
			errorJsonSchema: tokenMetadataErrorJsonSchema,
			errorSchemaBase64: types.tokenMetadataErrorSchemaBase64,
		}),
	transfer: (props: { contract: ContractAddress.Type }) =>
		GenericUpdate<types.TransferRequest, TransferRequestUi, types.TransferError, TransferErrorUi>({
			contract: props.contract,
			method: client.transfer,
			requestJsonSchema: transferRequestJsonSchema,
			requestSchemaBase64: types.transferRequestSchemaBase64,
			errorJsonSchema: transferErrorJsonSchema,
			errorSchemaBase64: types.transferErrorSchemaBase64,
		}),
	unFreeze: (props: { contract: ContractAddress.Type }) =>
		GenericUpdate<types.UnFreezeRequest, UnFreezeRequestUi, types.UnFreezeError, UnFreezeErrorUi>({
			contract: props.contract,
			method: client.unFreeze,
			requestJsonSchema: unFreezeRequestJsonSchema,
			requestSchemaBase64: types.unFreezeRequestSchemaBase64,
			errorJsonSchema: unFreezeErrorJsonSchema,
			errorSchemaBase64: types.unFreezeErrorSchemaBase64,
		}),
	unPause: (props: { contract: ContractAddress.Type }) =>
		GenericUpdate<types.UnPauseRequest, UnPauseRequestUi, types.UnPauseError, UnPauseErrorUi>({
			contract: props.contract,
			method: client.unPause,
			requestJsonSchema: unPauseRequestJsonSchema,
			requestSchemaBase64: types.unPauseRequestSchemaBase64,
			errorJsonSchema: unPauseErrorJsonSchema,
			errorSchemaBase64: types.unPauseErrorSchemaBase64,
		}),
	updateOperator: (props: { contract: ContractAddress.Type }) =>
		GenericUpdate<
			types.UpdateOperatorRequest,
			UpdateOperatorRequestUi,
			types.UpdateOperatorError,
			UpdateOperatorErrorUi
		>({
			contract: props.contract,
			method: client.updateOperator,
			requestJsonSchema: updateOperatorRequestJsonSchema,
			requestSchemaBase64: types.updateOperatorRequestSchemaBase64,
			errorJsonSchema: updateOperatorErrorJsonSchema,
			errorSchemaBase64: types.updateOperatorErrorSchemaBase64,
		}),
};
