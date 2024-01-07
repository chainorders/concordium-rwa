import { RJSFSchema } from "@rjsf/utils";
import React from "react";
import { ContractAddress } from "@concordium/web-sdk";
import { default as client } from "./rwaComplianceModuleAllowedNationalities";
import * as types from "./rwaComplianceModuleAllowedNationalities";
import { GenericInit, GenericInvoke, GenericUpdate } from "./GenericContractUI";
export const initRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "init Request",
	properties: {
		nationalities: { type: "array", items: { type: "string" } },
		identity_registry: {
			type: "object",
			title: "Identity Registry",
			properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
		},
	},
};
export type initRequestUi = { nationalities: string[]; identity_registry: { index: number; subindex: number } };
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
	burned: (props: { contract: ContractAddress.Type }) =>
		GenericUpdate<never, never, types.BurnedError, BurnedErrorUi>({
			contract: props.contract,
			method: client.burned,
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
	minted: (props: { contract: ContractAddress.Type }) =>
		GenericUpdate<never, never, types.MintedError, MintedErrorUi>({
			contract: props.contract,
			method: client.minted,
			errorJsonSchema: mintedErrorJsonSchema,
			errorSchemaBase64: types.mintedErrorSchemaBase64,
		}),
	transferred: (props: { contract: ContractAddress.Type }) =>
		GenericUpdate<never, never, types.TransferredError, TransferredErrorUi>({
			contract: props.contract,
			method: client.transferred,
			errorJsonSchema: transferredErrorJsonSchema,
			errorSchemaBase64: types.transferredErrorSchemaBase64,
		}),
};
