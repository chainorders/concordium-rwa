import { RJSFSchema } from "@rjsf/utils";
import React from "react";
import { ContractAddress } from "@concordium/web-sdk";
import { default as client } from "./rwaCompliance";
import * as types from "./rwaCompliance";
import { GenericInit, GenericInvoke, GenericUpdate } from "./GenericContractUI";
export const initRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "init Request",
	properties: {
		modules: {
			type: "array",
			items: {
				type: "object",
				title: "Modules List",
				properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
			},
		},
	},
};
export type initRequestUi = { modules: { index: number; subindex: number }[] };
export const initErrorJsonSchema: RJSFSchema = {
	type: "object",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"InvalidModule",
				"CallContractError",
				"Unauthorized",
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
						tag: { enum: ["InvalidModule"] },
						InvalidModule: { type: "object", title: "init Error Invalid Module", properties: {} },
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
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "init Error Unauthorized", properties: {} },
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
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "InvalidModule"; InvalidModule: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
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
				"ParseError",
				"LogError",
				"InvalidModule",
				"CallContractError",
				"Unauthorized",
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
						tag: { enum: ["InvalidModule"] },
						InvalidModule: { type: "object", title: "AddAgent Error Invalid Module", properties: {} },
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
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "AddAgent Error Unauthorized", properties: {} },
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
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "InvalidModule"; InvalidModule: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never };
export const addModuleRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "AddModule Request",
	properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
};
export type AddModuleRequestUi = { index: number; subindex: number };
export const addModuleErrorJsonSchema: RJSFSchema = {
	type: "object",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"InvalidModule",
				"CallContractError",
				"Unauthorized",
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
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "AddModule Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "AddModule Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidModule"] },
						InvalidModule: { type: "object", title: "AddModule Error Invalid Module", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "AddModule Error Call Contract Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "AddModule Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "AddModule Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "AddModule Error Agent Not Found", properties: {} },
					},
				},
			],
		},
	},
};
export type AddModuleErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "InvalidModule"; InvalidModule: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
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
				"ParseError",
				"LogError",
				"InvalidModule",
				"CallContractError",
				"Unauthorized",
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
						tag: { enum: ["InvalidModule"] },
						InvalidModule: { type: "object", title: "Agents Error Invalid Module", properties: {} },
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
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "Agents Error Unauthorized", properties: {} },
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
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "InvalidModule"; InvalidModule: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never };
export const burnedRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Burned Request",
	properties: {
		token_id: {
			type: "object",
			title: "Token Id",
			properties: {
				token_id: { type: "string" },
				contract: {
					type: "object",
					title: "Contract",
					properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
				},
			},
		},
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
		amount: { type: "string" },
	},
};
export type BurnedRequestUi = {
	token_id: { token_id: string; contract: { index: number; subindex: number } };
	owner: { tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
	amount: string;
};
export const burnedErrorJsonSchema: RJSFSchema = {
	type: "object",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"InvalidModule",
				"CallContractError",
				"Unauthorized",
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
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "Burned Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "Burned Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidModule"] },
						InvalidModule: { type: "object", title: "Burned Error Invalid Module", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "Burned Error Call Contract Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "Burned Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "Burned Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "Burned Error Agent Not Found", properties: {} },
					},
				},
			],
		},
	},
};
export type BurnedErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "InvalidModule"; InvalidModule: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never };
export const canTransferRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "CanTransfer Request",
	properties: {
		token_id: {
			type: "object",
			title: "Token Id",
			properties: {
				token_id: { type: "string" },
				contract: {
					type: "object",
					title: "Contract",
					properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
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
		amount: { type: "string" },
	},
};
export type CanTransferRequestUi = {
	token_id: { token_id: string; contract: { index: number; subindex: number } };
	to: { tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
	amount: string;
};
export const canTransferResponseJsonSchema: RJSFSchema = { type: "boolean", title: "CanTransfer Response" };
export type CanTransferResponseUi = boolean;
export const canTransferErrorJsonSchema: RJSFSchema = {
	type: "object",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"InvalidModule",
				"CallContractError",
				"Unauthorized",
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
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "CanTransfer Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "CanTransfer Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidModule"] },
						InvalidModule: { type: "object", title: "CanTransfer Error Invalid Module", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "CanTransfer Error Call Contract Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "CanTransfer Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "CanTransfer Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "CanTransfer Error Agent Not Found", properties: {} },
					},
				},
			],
		},
	},
};
export type CanTransferErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "InvalidModule"; InvalidModule: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never };
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
				"InvalidModule",
				"CallContractError",
				"Unauthorized",
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
						tag: { enum: ["InvalidModule"] },
						InvalidModule: { type: "object", title: "IsAgent Error Invalid Module", properties: {} },
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
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "IsAgent Error Unauthorized", properties: {} },
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
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "InvalidModule"; InvalidModule: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never };
export const mintedRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Minted Request",
	properties: {
		token_id: {
			type: "object",
			title: "Token Id",
			properties: {
				token_id: { type: "string" },
				contract: {
					type: "object",
					title: "Contract",
					properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
				},
			},
		},
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
		amount: { type: "string" },
	},
};
export type MintedRequestUi = {
	token_id: { token_id: string; contract: { index: number; subindex: number } };
	owner: { tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
	amount: string;
};
export const mintedErrorJsonSchema: RJSFSchema = {
	type: "object",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"InvalidModule",
				"CallContractError",
				"Unauthorized",
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
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "Minted Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "Minted Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidModule"] },
						InvalidModule: { type: "object", title: "Minted Error Invalid Module", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "Minted Error Call Contract Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "Minted Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "Minted Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "Minted Error Agent Not Found", properties: {} },
					},
				},
			],
		},
	},
};
export type MintedErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "InvalidModule"; InvalidModule: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never };
export const modulesResponseJsonSchema: RJSFSchema = {
	type: "array",
	items: {
		type: "object",
		title: "Modules Response List",
		properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
	},
};
export type ModulesResponseUi = { index: number; subindex: number }[];
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
				"InvalidModule",
				"CallContractError",
				"Unauthorized",
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
						tag: { enum: ["InvalidModule"] },
						InvalidModule: { type: "object", title: "RemoveAgent Error Invalid Module", properties: {} },
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
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "RemoveAgent Error Unauthorized", properties: {} },
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
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "InvalidModule"; InvalidModule: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never };
export const removeModuleRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "RemoveModule Request",
	properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
};
export type RemoveModuleRequestUi = { index: number; subindex: number };
export const removeModuleErrorJsonSchema: RJSFSchema = {
	type: "object",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"InvalidModule",
				"CallContractError",
				"Unauthorized",
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
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "RemoveModule Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "RemoveModule Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidModule"] },
						InvalidModule: { type: "object", title: "RemoveModule Error Invalid Module", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "RemoveModule Error Call Contract Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "RemoveModule Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "RemoveModule Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "RemoveModule Error Agent Not Found", properties: {} },
					},
				},
			],
		},
	},
};
export type RemoveModuleErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "InvalidModule"; InvalidModule: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
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
				"ParseError",
				"LogError",
				"InvalidModule",
				"CallContractError",
				"Unauthorized",
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
						tag: { enum: ["InvalidModule"] },
						InvalidModule: { type: "object", title: "Supports Error Invalid Module", properties: {} },
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
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "Supports Error Unauthorized", properties: {} },
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
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "InvalidModule"; InvalidModule: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "AgentAlreadyExists"; AgentAlreadyExists: never }
	| { tag: "AgentNotFound"; AgentNotFound: never };
export const transferredRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Transferred Request",
	properties: {
		token_id: {
			type: "object",
			title: "Token Id",
			properties: {
				token_id: { type: "string" },
				contract: {
					type: "object",
					title: "Contract",
					properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
				},
			},
		},
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
		amount: { type: "string" },
	},
};
export type TransferredRequestUi = {
	token_id: { token_id: string; contract: { index: number; subindex: number } };
	from: { tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
	to: { tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
	amount: string;
};
export const transferredErrorJsonSchema: RJSFSchema = {
	type: "object",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"InvalidModule",
				"CallContractError",
				"Unauthorized",
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
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "Transferred Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "Transferred Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidModule"] },
						InvalidModule: { type: "object", title: "Transferred Error Invalid Module", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "Transferred Error Call Contract Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: { type: "object", title: "Transferred Error Unauthorized", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentAlreadyExists"] },
						AgentAlreadyExists: { type: "object", title: "Transferred Error Agent Already Exists", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AgentNotFound"] },
						AgentNotFound: { type: "object", title: "Transferred Error Agent Not Found", properties: {} },
					},
				},
			],
		},
	},
};
export type TransferredErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "InvalidModule"; InvalidModule: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
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
	addModule: (props: { contract: ContractAddress.Type }) =>
		GenericUpdate<types.AddModuleRequest, AddModuleRequestUi, types.AddModuleError, AddModuleErrorUi>({
			contract: props.contract,
			method: client.addModule,
			requestJsonSchema: addModuleRequestJsonSchema,
			requestSchemaBase64: types.addModuleRequestSchemaBase64,
			errorJsonSchema: addModuleErrorJsonSchema,
			errorSchemaBase64: types.addModuleErrorSchemaBase64,
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
	burned: (props: { contract: ContractAddress.Type }) =>
		GenericUpdate<types.BurnedRequest, BurnedRequestUi, types.BurnedError, BurnedErrorUi>({
			contract: props.contract,
			method: client.burned,
			requestJsonSchema: burnedRequestJsonSchema,
			requestSchemaBase64: types.burnedRequestSchemaBase64,
			errorJsonSchema: burnedErrorJsonSchema,
			errorSchemaBase64: types.burnedErrorSchemaBase64,
		}),
	canTransfer: (props: { contract: ContractAddress.Type }) =>
		GenericInvoke<
			types.CanTransferRequest,
			CanTransferRequestUi,
			types.CanTransferResponse,
			CanTransferResponseUi,
			types.CanTransferError,
			CanTransferErrorUi
		>({
			contract: props.contract,
			method: client.canTransfer,
			requestJsonSchema: canTransferRequestJsonSchema,
			requestSchemaBase64: types.canTransferRequestSchemaBase64,
			responseJsonSchema: canTransferResponseJsonSchema,
			responseSchemaBase64: types.canTransferResponseSchemaBase64,
			errorJsonSchema: canTransferErrorJsonSchema,
			errorSchemaBase64: types.canTransferErrorSchemaBase64,
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
	minted: (props: { contract: ContractAddress.Type }) =>
		GenericUpdate<types.MintedRequest, MintedRequestUi, types.MintedError, MintedErrorUi>({
			contract: props.contract,
			method: client.minted,
			requestJsonSchema: mintedRequestJsonSchema,
			requestSchemaBase64: types.mintedRequestSchemaBase64,
			errorJsonSchema: mintedErrorJsonSchema,
			errorSchemaBase64: types.mintedErrorSchemaBase64,
		}),
	modules: (props: { contract: ContractAddress.Type }) =>
		GenericInvoke<never, never, types.ModulesResponse, ModulesResponseUi, never, never>({
			contract: props.contract,
			method: client.modules,
			responseJsonSchema: modulesResponseJsonSchema,
			responseSchemaBase64: types.modulesResponseSchemaBase64,
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
	removeModule: (props: { contract: ContractAddress.Type }) =>
		GenericUpdate<types.RemoveModuleRequest, RemoveModuleRequestUi, types.RemoveModuleError, RemoveModuleErrorUi>({
			contract: props.contract,
			method: client.removeModule,
			requestJsonSchema: removeModuleRequestJsonSchema,
			requestSchemaBase64: types.removeModuleRequestSchemaBase64,
			errorJsonSchema: removeModuleErrorJsonSchema,
			errorSchemaBase64: types.removeModuleErrorSchemaBase64,
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
	transferred: (props: { contract: ContractAddress.Type }) =>
		GenericUpdate<types.TransferredRequest, TransferredRequestUi, types.TransferredError, TransferredErrorUi>({
			contract: props.contract,
			method: client.transferred,
			requestJsonSchema: transferredRequestJsonSchema,
			requestSchemaBase64: types.transferredRequestSchemaBase64,
			errorJsonSchema: transferredErrorJsonSchema,
			errorSchemaBase64: types.transferredErrorSchemaBase64,
		}),
};
