import { ContractName, EntrypointName, ModuleReference } from "@concordium/web-sdk";
import { InitMethod, ReceiveMethod } from "./GenericContract";
export type initRequest = {
	identity_registry: { index: number; subindex: number };
	compliance: { index: number; subindex: number };
	sponsors: { index: number; subindex: number }[];
};
export const initRequestSchema = "FAADAAAAEQAAAGlkZW50aXR5X3JlZ2lzdHJ5DAoAAABjb21wbGlhbmNlDAgAAABzcG9uc29ycxACDA==";
export type addAgentRequest = { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
export const addAgentRequestSchema = "FQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type removeAgentRequest = { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
export const removeAgentRequestSchema = "FQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type agentsResponse = { Account: [string] } | { Contract: [{ index: number; subindex: number }] }[];
export const agentsResponseSchema = "EAIVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAM";
export type isAgentRequest = { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
export const isAgentRequestSchema = "FQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type isAgentResponse = boolean;
export const isAgentResponseSchema = "AQ==";
export type mintRequest = {
	owner: { Account: [string] } | { Contract: [{ index: number; subindex: number }, string] };
	tokens: { metadata_url: { url: string; hash: { None: Record<string, never> } | { Some: [string] } } }[];
};
export const mintRequestSchema =
	"FAACAAAABQAAAG93bmVyFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAECAAAADBYBBgAAAHRva2VucxACFAABAAAADAAAAG1ldGFkYXRhX3VybBQAAgAAAAMAAAB1cmwWAgQAAABoYXNoFQIAAAAEAAAATm9uZQIEAAAAU29tZQEBAAAAFgI=";
export type transferRequest = {
	token_id: string;
	amount: string;
	from: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
	to: { Account: [string] } | { Contract: [{ index: number; subindex: number }, string] };
	data: string;
}[];
export const transferRequestSchema =
	"EAEUAAUAAAAIAAAAdG9rZW5faWQdAAYAAABhbW91bnQbJQAAAAQAAABmcm9tFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAIAAAB0bxUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAgAAAAwWAQQAAABkYXRhHQE=";
export type burnRequest = {
	token_id: string;
	amount: string;
	owner: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
}[];
export const burnRequestSchema =
	"EAEUAAMAAAAIAAAAdG9rZW5faWQdAAYAAABhbW91bnQbJQAAAAUAAABvd25lchUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAw=";
export type balanceOfRequest = {
	token_id: string;
	address: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
}[];
export const balanceOfRequestSchema =
	"EAEUAAIAAAAIAAAAdG9rZW5faWQdAAcAAABhZGRyZXNzFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type balanceOfResponse = string[];
export const balanceOfResponseSchema = "EAEbJQAAAA==";
export type updateOperatorRequest = {
	update: { Remove: Record<string, never> } | { Add: Record<string, never> };
	operator: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
}[];
export const updateOperatorRequestSchema =
	"EAEUAAIAAAAGAAAAdXBkYXRlFQIAAAAGAAAAUmVtb3ZlAgMAAABBZGQCCAAAAG9wZXJhdG9yFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type operatorOfRequest = {
	owner: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
	address: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
}[];
export const operatorOfRequestSchema =
	"EAEUAAIAAAAFAAAAb3duZXIVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAMBwAAAGFkZHJlc3MVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAM";
export type operatorOfResponse = boolean[];
export const operatorOfResponseSchema = "EAEB";
export type tokenMetadataRequest = string[];
export const tokenMetadataRequestSchema = "EAEdAA==";
export type tokenMetadataResponse = { url: string; hash: { None: Record<string, never> } | { Some: [string] } }[];
export const tokenMetadataResponseSchema =
	"EAEUAAIAAAADAAAAdXJsFgEEAAAAaGFzaBUCAAAABAAAAE5vbmUCBAAAAFNvbWUBAQAAAB4gAAAA";
export type freezeRequest = {
	owner: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
	tokens: { token_id: string; token_amount: string }[];
};
export const freezeRequestSchema =
	"FAACAAAABQAAAG93bmVyFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAYAAAB0b2tlbnMQAhQAAgAAAAgAAAB0b2tlbl9pZB0ADAAAAHRva2VuX2Ftb3VudBslAAAA";
export type unFreezeRequest = {
	owner: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
	tokens: { token_id: string; token_amount: string }[];
};
export const unFreezeRequestSchema =
	"FAACAAAABQAAAG93bmVyFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAYAAAB0b2tlbnMQAhQAAgAAAAgAAAB0b2tlbl9pZB0ADAAAAHRva2VuX2Ftb3VudBslAAAA";
export type balanceOfFrozenRequest = {
	owner: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
	tokens: string[];
};
export const balanceOfFrozenRequestSchema =
	"FAACAAAABQAAAG93bmVyFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAYAAAB0b2tlbnMQAh0A";
export type balanceOfFrozenResponse = { tokens: string[] };
export const balanceOfFrozenResponseSchema = "FAABAAAABgAAAHRva2VucxACGyUAAAA=";
export type balanceOfUnFrozenRequest = {
	owner: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
	tokens: string[];
};
export const balanceOfUnFrozenRequestSchema =
	"FAACAAAABQAAAG93bmVyFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAYAAAB0b2tlbnMQAh0A";
export type balanceOfUnFrozenResponse = { tokens: string[] };
export const balanceOfUnFrozenResponseSchema = "FAABAAAABgAAAHRva2VucxACGyUAAAA=";
export type pauseRequest = { tokens: string[] };
export const pauseRequestSchema = "FAABAAAABgAAAHRva2VucxACHQA=";
export type unPauseRequest = { tokens: string[] };
export const unPauseRequestSchema = "FAABAAAABgAAAHRva2VucxACHQA=";
export type isPausedRequest = { tokens: string[] };
export const isPausedRequestSchema = "FAABAAAABgAAAHRva2VucxACHQA=";
export type isPausedResponse = { tokens: boolean[] };
export const isPausedResponseSchema = "FAABAAAABgAAAHRva2VucxACAQ==";
export type recoverRequest = {
	lost_account: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
	new_account: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
};
export const recoverRequestSchema =
	"FAACAAAADAAAAGxvc3RfYWNjb3VudBUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAwLAAAAbmV3X2FjY291bnQVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAM";
export type recoveryAddressRequest = { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
export const recoveryAddressRequestSchema = "FQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type recoveryAddressResponse =
	| { None: Record<string, never> }
	| { Some: [{ Account: [string] } | { Contract: [{ index: number; subindex: number }] }] };
export const recoveryAddressResponseSchema =
	"FQIAAAAEAAAATm9uZQIEAAAAU29tZQEBAAAAFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type supportsRequest = string[];
export const supportsRequestSchema = "EAEWAA==";
export type supportsResponse =
	| { NoSupport: Record<string, never> }
	| { Support: Record<string, never> }
	| { SupportBy: [{ index: number; subindex: number }[]] }[];
export const supportsResponseSchema = "EAEVAwAAAAkAAABOb1N1cHBvcnQCBwAAAFN1cHBvcnQCCQAAAFN1cHBvcnRCeQEBAAAAEAAM";
export const ENTRYPOINTS: Record<string, EntrypointName.Type> = {
	addAgent: EntrypointName.fromString("addAgent"),
	removeAgent: EntrypointName.fromString("removeAgent"),
	agents: EntrypointName.fromString("agents"),
	isAgent: EntrypointName.fromString("isAgent"),
	mint: EntrypointName.fromString("mint"),
	transfer: EntrypointName.fromString("transfer"),
	burn: EntrypointName.fromString("burn"),
	balanceOf: EntrypointName.fromString("balanceOf"),
	updateOperator: EntrypointName.fromString("updateOperator"),
	operatorOf: EntrypointName.fromString("operatorOf"),
	tokenMetadata: EntrypointName.fromString("tokenMetadata"),
	freeze: EntrypointName.fromString("freeze"),
	unFreeze: EntrypointName.fromString("unFreeze"),
	balanceOfFrozen: EntrypointName.fromString("balanceOfFrozen"),
	balanceOfUnFrozen: EntrypointName.fromString("balanceOfUnFrozen"),
	pause: EntrypointName.fromString("pause"),
	unPause: EntrypointName.fromString("unPause"),
	isPaused: EntrypointName.fromString("isPaused"),
	recover: EntrypointName.fromString("recover"),
	recoveryAddress: EntrypointName.fromString("recoveryAddress"),
	supports: EntrypointName.fromString("supports"),
};
export const ENTRYPOINT_DISPLAY_NAMES: Record<string, string> = {
	addAgent: "Add Agent",
	removeAgent: "Remove Agent",
	agents: "Agents",
	isAgent: "Is Agent",
	mint: "Mint",
	transfer: "Transfer",
	burn: "Burn",
	balanceOf: "Balance Of",
	updateOperator: "Update Operator",
	operatorOf: "Operator Of",
	tokenMetadata: "Token Metadata",
	freeze: "Freeze",
	unFreeze: "Un Freeze",
	balanceOfFrozen: "Balance Of Frozen",
	balanceOfUnFrozen: "Balance Of Un Frozen",
	pause: "Pause",
	unPause: "Un Pause",
	isPaused: "Is Paused",
	recover: "Recover",
	recoveryAddress: "Recovery Address",
	supports: "Supports",
};
export const rwa_security_nft = {
	init: new InitMethod<initRequest>(
		ModuleReference.fromHexString("874dc519d6ef856ef597fbba47061fd4fc8b30678e5e4eb7ac558c9c1a7ffd7d"),
		ContractName.fromString("rwa_security_nft"),
		initRequestSchema
	),
	addAgent: new ReceiveMethod<addAgentRequest, void>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("addAgent"),
		addAgentRequestSchema
	),
	removeAgent: new ReceiveMethod<removeAgentRequest, void>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("removeAgent"),
		removeAgentRequestSchema
	),
	agents: new ReceiveMethod<void, agentsResponse>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("agents"),
		undefined,
		agentsResponseSchema
	),
	isAgent: new ReceiveMethod<isAgentRequest, isAgentResponse>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("isAgent"),
		isAgentRequestSchema,
		isAgentResponseSchema
	),
	mint: new ReceiveMethod<mintRequest, void>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("mint"),
		mintRequestSchema
	),
	transfer: new ReceiveMethod<transferRequest, void>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("transfer"),
		transferRequestSchema
	),
	burn: new ReceiveMethod<burnRequest, void>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("burn"),
		burnRequestSchema
	),
	balanceOf: new ReceiveMethod<balanceOfRequest, balanceOfResponse>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("balanceOf"),
		balanceOfRequestSchema,
		balanceOfResponseSchema
	),
	updateOperator: new ReceiveMethod<updateOperatorRequest, void>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("updateOperator"),
		updateOperatorRequestSchema
	),
	operatorOf: new ReceiveMethod<operatorOfRequest, operatorOfResponse>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("operatorOf"),
		operatorOfRequestSchema,
		operatorOfResponseSchema
	),
	tokenMetadata: new ReceiveMethod<tokenMetadataRequest, tokenMetadataResponse>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("tokenMetadata"),
		tokenMetadataRequestSchema,
		tokenMetadataResponseSchema
	),
	freeze: new ReceiveMethod<freezeRequest, void>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("freeze"),
		freezeRequestSchema
	),
	unFreeze: new ReceiveMethod<unFreezeRequest, void>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("unFreeze"),
		unFreezeRequestSchema
	),
	balanceOfFrozen: new ReceiveMethod<balanceOfFrozenRequest, balanceOfFrozenResponse>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("balanceOfFrozen"),
		balanceOfFrozenRequestSchema,
		balanceOfFrozenResponseSchema
	),
	balanceOfUnFrozen: new ReceiveMethod<balanceOfUnFrozenRequest, balanceOfUnFrozenResponse>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("balanceOfUnFrozen"),
		balanceOfUnFrozenRequestSchema,
		balanceOfUnFrozenResponseSchema
	),
	pause: new ReceiveMethod<pauseRequest, void>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("pause"),
		pauseRequestSchema
	),
	unPause: new ReceiveMethod<unPauseRequest, void>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("unPause"),
		unPauseRequestSchema
	),
	isPaused: new ReceiveMethod<isPausedRequest, isPausedResponse>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("isPaused"),
		isPausedRequestSchema,
		isPausedResponseSchema
	),
	recover: new ReceiveMethod<recoverRequest, void>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("recover"),
		recoverRequestSchema
	),
	recoveryAddress: new ReceiveMethod<recoveryAddressRequest, recoveryAddressResponse>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("recoveryAddress"),
		recoveryAddressRequestSchema,
		recoveryAddressResponseSchema
	),
	supports: new ReceiveMethod<supportsRequest, supportsResponse>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("supports"),
		supportsRequestSchema,
		supportsResponseSchema
	),
};
export default rwa_security_nft;
