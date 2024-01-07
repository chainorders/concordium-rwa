import { RJSFSchema } from "@rjsf/utils";
import React from "react";
import { ContractAddress } from "@concordium/web-sdk";
import { default as client } from "./rwaSponsor";
import * as types from "./rwaSponsor";
import { GenericInit, GenericInvoke, GenericUpdate } from "./GenericContractUI";
export const initErrorJsonSchema: RJSFSchema = {
	type: "object",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"WrongContract",
				"Expired",
				"NonceMismatch",
				"WrongSignature",
				"SerializationError",
				"AccountMissing",
				"CallContractError",
				"CIS3NotImplemented",
				"CIS3CheckError",
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
						tag: { enum: ["WrongContract"] },
						WrongContract: { type: "object", title: "init Error Wrong Contract", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Expired"] },
						Expired: { type: "object", title: "init Error Expired", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["NonceMismatch"] },
						NonceMismatch: { type: "object", title: "init Error Nonce Mismatch", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["WrongSignature"] },
						WrongSignature: { type: "object", title: "init Error Wrong Signature", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["SerializationError"] },
						SerializationError: { type: "object", title: "init Error Serialization Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AccountMissing"] },
						AccountMissing: { type: "object", title: "init Error Account Missing", properties: {} },
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
						tag: { enum: ["CIS3NotImplemented"] },
						CIS3NotImplemented: { type: "object", title: "init Error Cis 3 Not Implemented", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CIS3CheckError"] },
						CIS3CheckError: { type: "object", title: "init Error Cis 3 Check Error", properties: {} },
					},
				},
			],
		},
	},
};
export type initErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "WrongContract"; WrongContract: never }
	| { tag: "Expired"; Expired: never }
	| { tag: "NonceMismatch"; NonceMismatch: never }
	| { tag: "WrongSignature"; WrongSignature: never }
	| { tag: "SerializationError"; SerializationError: never }
	| { tag: "AccountMissing"; AccountMissing: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "CIS3NotImplemented"; CIS3NotImplemented: never }
	| { tag: "CIS3CheckError"; CIS3CheckError: never };
export const permitRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Permit Request",
	properties: {
		signature: {
			type: "array",
			items: [
				{ type: "integer", minimum: 0, maximum: 255, title: "Signature Key" },
				{
					type: "array",
					items: [
						{ type: "integer", minimum: 0, maximum: 255, title: "Signature Value Key" },
						{
							type: "object",
							properties: { tag: { type: "string", enum: ["Ed25519"] } },
							required: ["tag"],
							dependencies: {
								tag: {
									oneOf: [
										{
											properties: {
												tag: { enum: ["Ed25519"] },
												Ed25519: { type: "array", items: [{ type: "string" }] },
											},
										},
									],
								},
							},
						},
					],
				},
			],
		},
		signer: { type: "string", title: "Signer" },
		message: {
			type: "object",
			title: "Message",
			properties: {
				contract_address: {
					type: "object",
					title: "Contract Address",
					properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
				},
				nonce: { type: "integer", minimum: 0, title: "Nonce" },
				timestamp: { type: "string", title: "Timestamp" },
				entry_point: { type: "string" },
				payload: { type: "array", items: { type: "integer", minimum: 0, maximum: 255, title: "Payload List" } },
			},
		},
	},
};
export type PermitRequestUi = {
	signature: [number, [number, { tag: "Ed25519"; Ed25519: [string] }][]][];
	signer: string;
	message: {
		contract_address: { index: number; subindex: number };
		nonce: number;
		timestamp: string;
		entry_point: string;
		payload: number[];
	};
};
export const permitErrorJsonSchema: RJSFSchema = {
	type: "object",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"WrongContract",
				"Expired",
				"NonceMismatch",
				"WrongSignature",
				"SerializationError",
				"AccountMissing",
				"CallContractError",
				"CIS3NotImplemented",
				"CIS3CheckError",
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
						ParseError: { type: "object", title: "Permit Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "Permit Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["WrongContract"] },
						WrongContract: { type: "object", title: "Permit Error Wrong Contract", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Expired"] },
						Expired: { type: "object", title: "Permit Error Expired", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["NonceMismatch"] },
						NonceMismatch: { type: "object", title: "Permit Error Nonce Mismatch", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["WrongSignature"] },
						WrongSignature: { type: "object", title: "Permit Error Wrong Signature", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["SerializationError"] },
						SerializationError: { type: "object", title: "Permit Error Serialization Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AccountMissing"] },
						AccountMissing: { type: "object", title: "Permit Error Account Missing", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "Permit Error Call Contract Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CIS3NotImplemented"] },
						CIS3NotImplemented: { type: "object", title: "Permit Error Cis 3 Not Implemented", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CIS3CheckError"] },
						CIS3CheckError: { type: "object", title: "Permit Error Cis 3 Check Error", properties: {} },
					},
				},
			],
		},
	},
};
export type PermitErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "WrongContract"; WrongContract: never }
	| { tag: "Expired"; Expired: never }
	| { tag: "NonceMismatch"; NonceMismatch: never }
	| { tag: "WrongSignature"; WrongSignature: never }
	| { tag: "SerializationError"; SerializationError: never }
	| { tag: "AccountMissing"; AccountMissing: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "CIS3NotImplemented"; CIS3NotImplemented: never }
	| { tag: "CIS3CheckError"; CIS3CheckError: never };
export const supportsPermitRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "SupportsPermit Request",
	properties: { queries: { type: "array", items: { type: "string" } } },
};
export type SupportsPermitRequestUi = { queries: string[] };
export const supportsPermitResponseJsonSchema: RJSFSchema = {
	type: "array",
	items: { type: "boolean", title: "SupportsPermit Response List" },
};
export type SupportsPermitResponseUi = boolean[];
export const supportsPermitErrorJsonSchema: RJSFSchema = {
	type: "object",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"WrongContract",
				"Expired",
				"NonceMismatch",
				"WrongSignature",
				"SerializationError",
				"AccountMissing",
				"CallContractError",
				"CIS3NotImplemented",
				"CIS3CheckError",
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
						ParseError: { type: "object", title: "SupportsPermit Error Parse Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "SupportsPermit Error Log Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["WrongContract"] },
						WrongContract: { type: "object", title: "SupportsPermit Error Wrong Contract", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Expired"] },
						Expired: { type: "object", title: "SupportsPermit Error Expired", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["NonceMismatch"] },
						NonceMismatch: { type: "object", title: "SupportsPermit Error Nonce Mismatch", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["WrongSignature"] },
						WrongSignature: { type: "object", title: "SupportsPermit Error Wrong Signature", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["SerializationError"] },
						SerializationError: { type: "object", title: "SupportsPermit Error Serialization Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["AccountMissing"] },
						AccountMissing: { type: "object", title: "SupportsPermit Error Account Missing", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CallContractError"] },
						CallContractError: { type: "object", title: "SupportsPermit Error Call Contract Error", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CIS3NotImplemented"] },
						CIS3NotImplemented: { type: "object", title: "SupportsPermit Error Cis 3 Not Implemented", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["CIS3CheckError"] },
						CIS3CheckError: { type: "object", title: "SupportsPermit Error Cis 3 Check Error", properties: {} },
					},
				},
			],
		},
	},
};
export type SupportsPermitErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "WrongContract"; WrongContract: never }
	| { tag: "Expired"; Expired: never }
	| { tag: "NonceMismatch"; NonceMismatch: never }
	| { tag: "WrongSignature"; WrongSignature: never }
	| { tag: "SerializationError"; SerializationError: never }
	| { tag: "AccountMissing"; AccountMissing: never }
	| { tag: "CallContractError"; CallContractError: never }
	| { tag: "CIS3NotImplemented"; CIS3NotImplemented: never }
	| { tag: "CIS3CheckError"; CIS3CheckError: never };
export const init = (props: { onInitialize: (contract: ContractAddress.Type) => void }) =>
	GenericInit<never, never>({ onContractInitialized: props.onInitialize, method: client.init });
export const ENTRYPOINTS_UI: {
	[key: keyof typeof types.ENTRYPOINTS]: (props: { contract: ContractAddress.Type }) => React.JSX.Element;
} = {
	permit: (props: { contract: ContractAddress.Type }) =>
		GenericUpdate<types.PermitRequest, PermitRequestUi, types.PermitError, PermitErrorUi>({
			contract: props.contract,
			method: client.permit,
			requestJsonSchema: permitRequestJsonSchema,
			requestSchemaBase64: types.permitRequestSchemaBase64,
			errorJsonSchema: permitErrorJsonSchema,
			errorSchemaBase64: types.permitErrorSchemaBase64,
		}),
	supportsPermit: (props: { contract: ContractAddress.Type }) =>
		GenericInvoke<
			types.SupportsPermitRequest,
			SupportsPermitRequestUi,
			types.SupportsPermitResponse,
			SupportsPermitResponseUi,
			types.SupportsPermitError,
			SupportsPermitErrorUi
		>({
			contract: props.contract,
			method: client.supportsPermit,
			requestJsonSchema: supportsPermitRequestJsonSchema,
			requestSchemaBase64: types.supportsPermitRequestSchemaBase64,
			responseJsonSchema: supportsPermitResponseJsonSchema,
			responseSchemaBase64: types.supportsPermitResponseSchemaBase64,
			errorJsonSchema: supportsPermitErrorJsonSchema,
			errorSchemaBase64: types.supportsPermitErrorSchemaBase64,
		}),
};
