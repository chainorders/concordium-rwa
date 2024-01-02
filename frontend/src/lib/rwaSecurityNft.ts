import { ContractEvent, ContractName, EntrypointName, ModuleReference } from "@concordium/web-sdk";
import { InitMethod, ReceiveMethod } from "./GenericContract";
export type InitRequest = {
	identity_registry: { index: number; subindex: number };
	compliance: { index: number; subindex: number };
	sponsors: { index: number; subindex: number }[];
};
export const InitRequestSchema = "FAADAAAAEQAAAGlkZW50aXR5X3JlZ2lzdHJ5DAoAAABjb21wbGlhbmNlDAgAAABzcG9uc29ycxACDA==";
export type AddAgentRequest = { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
export const AddAgentRequestSchema = "FQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type AgentsResponse = { Account: [string] } | { Contract: [{ index: number; subindex: number }] }[];
export const AgentsResponseSchema = "EAIVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAM";
export type BalanceOfRequest = {
	token_id: string;
	address: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
}[];
export const BalanceOfRequestSchema =
	"EAEUAAIAAAAIAAAAdG9rZW5faWQdAAcAAABhZGRyZXNzFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type BalanceOfResponse = string[];
export const BalanceOfResponseSchema = "EAEbJQAAAA==";
export type BalanceOfFrozenRequest = {
	owner: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
	tokens: string[];
};
export const BalanceOfFrozenRequestSchema =
	"FAACAAAABQAAAG93bmVyFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAYAAAB0b2tlbnMQAh0A";
export type BalanceOfFrozenResponse = { tokens: string[] };
export const BalanceOfFrozenResponseSchema = "FAABAAAABgAAAHRva2VucxACGyUAAAA=";
export type BalanceOfUnFrozenRequest = {
	owner: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
	tokens: string[];
};
export const BalanceOfUnFrozenRequestSchema =
	"FAACAAAABQAAAG93bmVyFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAYAAAB0b2tlbnMQAh0A";
export type BalanceOfUnFrozenResponse = { tokens: string[] };
export const BalanceOfUnFrozenResponseSchema = "FAABAAAABgAAAHRva2VucxACGyUAAAA=";
export type BurnRequest = {
	token_id: string;
	amount: string;
	owner: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
}[];
export const BurnRequestSchema =
	"EAEUAAMAAAAIAAAAdG9rZW5faWQdAAYAAABhbW91bnQbJQAAAAUAAABvd25lchUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAw=";
export type ComplianceResponse = { index: number; subindex: number };
export const ComplianceResponseSchema = "DA==";
export type ForcedTransferRequest = {
	token_id: string;
	amount: string;
	from: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
	to: { Account: [string] } | { Contract: [{ index: number; subindex: number }, string] };
	data: string;
}[];
export const ForcedTransferRequestSchema =
	"EAEUAAUAAAAIAAAAdG9rZW5faWQdAAYAAABhbW91bnQbJQAAAAQAAABmcm9tFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAIAAAB0bxUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAgAAAAwWAQQAAABkYXRhHQE=";
export type FreezeRequest = {
	owner: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
	tokens: { token_id: string; token_amount: string }[];
};
export const FreezeRequestSchema =
	"FAACAAAABQAAAG93bmVyFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAYAAAB0b2tlbnMQAhQAAgAAAAgAAAB0b2tlbl9pZB0ADAAAAHRva2VuX2Ftb3VudBslAAAA";
export type IdentityRegistryResponse = { index: number; subindex: number };
export const IdentityRegistryResponseSchema = "DA==";
export type IsAgentRequest = { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
export const IsAgentRequestSchema = "FQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type IsAgentResponse = boolean;
export const IsAgentResponseSchema = "AQ==";
export type IsPausedRequest = { tokens: string[] };
export const IsPausedRequestSchema = "FAABAAAABgAAAHRva2VucxACHQA=";
export type MintRequest = {
	owner: { Account: [string] } | { Contract: [{ index: number; subindex: number }, string] };
	tokens: { metadata_url: { url: string; hash: { None: Record<string, never> } | { Some: [string] } } }[];
};
export const MintRequestSchema =
	"FAACAAAABQAAAG93bmVyFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAECAAAADBYBBgAAAHRva2VucxACFAABAAAADAAAAG1ldGFkYXRhX3VybBQAAgAAAAMAAAB1cmwWAgQAAABoYXNoFQIAAAAEAAAATm9uZQIEAAAAU29tZQEBAAAAFgI=";
export type OperatorOfRequest = {
	owner: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
	address: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
}[];
export const OperatorOfRequestSchema =
	"EAEUAAIAAAAFAAAAb3duZXIVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAMBwAAAGFkZHJlc3MVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAM";
export type OperatorOfResponse = boolean[];
export const OperatorOfResponseSchema = "EAEB";
export type PauseRequest = { tokens: string[] };
export const PauseRequestSchema = "FAABAAAABgAAAHRva2VucxACHQA=";
export type RecoverRequest = {
	lost_account: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
	new_account: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
};
export const RecoverRequestSchema =
	"FAACAAAADAAAAGxvc3RfYWNjb3VudBUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAwLAAAAbmV3X2FjY291bnQVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAM";
export type RecoveryAddressRequest = { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
export const RecoveryAddressRequestSchema = "FQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type RecoveryAddressResponse =
	| { None: Record<string, never> }
	| { Some: [{ Account: [string] } | { Contract: [{ index: number; subindex: number }] }] };
export const RecoveryAddressResponseSchema =
	"FQIAAAAEAAAATm9uZQIEAAAAU29tZQEBAAAAFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type RemoveAgentRequest = { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
export const RemoveAgentRequestSchema = "FQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type SetComplianceRequest = { index: number; subindex: number };
export const SetComplianceRequestSchema = "DA==";
export type SetIdentityRegistryRequest = { index: number; subindex: number };
export const SetIdentityRegistryRequestSchema = "DA==";
export type SupportsRequest = string[];
export const SupportsRequestSchema = "EAEWAA==";
export type SupportsResponse =
	| { NoSupport: Record<string, never> }
	| { Support: Record<string, never> }
	| { SupportBy: [{ index: number; subindex: number }[]] }[];
export const SupportsResponseSchema = "EAEVAwAAAAkAAABOb1N1cHBvcnQCBwAAAFN1cHBvcnQCCQAAAFN1cHBvcnRCeQEBAAAAEAAM";
export type TokenMetadataRequest = string[];
export const TokenMetadataRequestSchema = "EAEdAA==";
export type TokenMetadataResponse = { url: string; hash: { None: Record<string, never> } | { Some: [string] } }[];
export const TokenMetadataResponseSchema =
	"EAEUAAIAAAADAAAAdXJsFgEEAAAAaGFzaBUCAAAABAAAAE5vbmUCBAAAAFNvbWUBAQAAAB4gAAAA";
export type TransferRequest = {
	token_id: string;
	amount: string;
	from: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
	to: { Account: [string] } | { Contract: [{ index: number; subindex: number }, string] };
	data: string;
}[];
export const TransferRequestSchema =
	"EAEUAAUAAAAIAAAAdG9rZW5faWQdAAYAAABhbW91bnQbJQAAAAQAAABmcm9tFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAIAAAB0bxUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAgAAAAwWAQQAAABkYXRhHQE=";
export type UnFreezeRequest = {
	owner: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
	tokens: { token_id: string; token_amount: string }[];
};
export const UnFreezeRequestSchema =
	"FAACAAAABQAAAG93bmVyFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAYAAAB0b2tlbnMQAhQAAgAAAAgAAAB0b2tlbl9pZB0ADAAAAHRva2VuX2Ftb3VudBslAAAA";
export type UnPauseRequest = { tokens: string[] };
export const UnPauseRequestSchema = "FAABAAAABgAAAHRva2VucxACHQA=";
export type UpdateOperatorRequest = {
	update: { Remove: Record<string, never> } | { Add: Record<string, never> };
	operator: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
}[];
export const UpdateOperatorRequestSchema =
	"EAEUAAIAAAAGAAAAdXBkYXRlFQIAAAAGAAAAUmVtb3ZlAgMAAABBZGQCCAAAAG9wZXJhdG9yFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type RwaSecurityNftEvent =
	| {
			Recovered: [
				{
					lost_account: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
					new_account: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
				},
			];
	  }
	| { IdentityRegistryAdded: [{ index: number; subindex: number }] }
	| { ComplianceAdded: [{ index: number; subindex: number }] }
	| { UnPaused: [{ token_id: string }] }
	| { Paused: [{ token_id: string }] }
	| {
			TokensFrozen: [
				{
					token_id: string;
					amount: string;
					address: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
				},
			];
	  }
	| {
			TokensUnFrozen: [
				{
					token_id: string;
					amount: string;
					address: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
				},
			];
	  }
	| { AgentRemoved: [{ agent: { Account: [string] } | { Contract: [{ index: number; subindex: number }] } }] }
	| { AgentAdded: [{ agent: { Account: [string] } | { Contract: [{ index: number; subindex: number }] } }] }
	| {
			TokenMetadata: {
				token_id: string;
				metadata_url: { url: string; hash: { None: Record<string, never> } | { Some: [string] } };
			};
	  }
	| {
			UpdateOperator: {
				update: { Remove: Record<string, never> } | { Add: Record<string, never> };
				owner: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
				operator: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
			};
	  }
	| {
			Burn: {
				token_id: string;
				amount: string;
				owner: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
			};
	  }
	| {
			Mint: {
				token_id: string;
				amount: string;
				owner: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
			};
	  }
	| {
			Transfer: {
				token_id: string;
				amount: string;
				from: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
				to: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
			};
	  };
export const RwaSecurityNftEventSchema =
	"Hw4AAADyCQAAAFJlY292ZXJlZAEBAAAAFAACAAAADAAAAGxvc3RfYWNjb3VudBUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAwLAAAAbmV3X2FjY291bnQVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAM8xUAAABJZGVudGl0eVJlZ2lzdHJ5QWRkZWQBAQAAAAz0DwAAAENvbXBsaWFuY2VBZGRlZAEBAAAADPUIAAAAVW5QYXVzZWQBAQAAABQAAQAAAAgAAAB0b2tlbl9pZB0A9gYAAABQYXVzZWQBAQAAABQAAQAAAAgAAAB0b2tlbl9pZB0A9wwAAABUb2tlbnNGcm96ZW4BAQAAABQAAwAAAAgAAAB0b2tlbl9pZB0ABgAAAGFtb3VudBslAAAABwAAAGFkZHJlc3MVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAM+A4AAABUb2tlbnNVbkZyb3plbgEBAAAAFAADAAAACAAAAHRva2VuX2lkHQAGAAAAYW1vdW50GyUAAAAHAAAAYWRkcmVzcxUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAz5DAAAAEFnZW50UmVtb3ZlZAEBAAAAFAABAAAABQAAAGFnZW50FQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADPoKAAAAQWdlbnRBZGRlZAEBAAAAFAABAAAABQAAAGFnZW50FQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADPsNAAAAVG9rZW5NZXRhZGF0YQACAAAACAAAAHRva2VuX2lkHQAMAAAAbWV0YWRhdGFfdXJsFAACAAAAAwAAAHVybBYBBAAAAGhhc2gVAgAAAAQAAABOb25lAgQAAABTb21lAQEAAAAeIAAAAPwOAAAAVXBkYXRlT3BlcmF0b3IAAwAAAAYAAAB1cGRhdGUVAgAAAAYAAABSZW1vdmUCAwAAAEFkZAIFAAAAb3duZXIVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAMCAAAAG9wZXJhdG9yFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADP0EAAAAQnVybgADAAAACAAAAHRva2VuX2lkHQAGAAAAYW1vdW50GyUAAAAFAAAAb3duZXIVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAM/gQAAABNaW50AAMAAAAIAAAAdG9rZW5faWQdAAYAAABhbW91bnQbJQAAAAUAAABvd25lchUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAz/CAAAAFRyYW5zZmVyAAQAAAAIAAAAdG9rZW5faWQdAAYAAABhbW91bnQbJQAAAAQAAABmcm9tFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAIAAAB0bxUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAw=";
export const deserializeEvent = (event: ContractEvent.Type): RwaSecurityNftEvent => {
	return ContractEvent.parseWithSchemaTypeBase64(event, RwaSecurityNftEventSchema) as RwaSecurityNftEvent;
};
export const ENTRYPOINTS: Record<string, EntrypointName.Type> = {
	addAgent: EntrypointName.fromString("addAgent"),
	agents: EntrypointName.fromString("agents"),
	balanceOf: EntrypointName.fromString("balanceOf"),
	balanceOfFrozen: EntrypointName.fromString("balanceOfFrozen"),
	balanceOfUnFrozen: EntrypointName.fromString("balanceOfUnFrozen"),
	burn: EntrypointName.fromString("burn"),
	compliance: EntrypointName.fromString("compliance"),
	forcedTransfer: EntrypointName.fromString("forcedTransfer"),
	freeze: EntrypointName.fromString("freeze"),
	identityRegistry: EntrypointName.fromString("identityRegistry"),
	isAgent: EntrypointName.fromString("isAgent"),
	isPaused: EntrypointName.fromString("isPaused"),
	mint: EntrypointName.fromString("mint"),
	operatorOf: EntrypointName.fromString("operatorOf"),
	pause: EntrypointName.fromString("pause"),
	recover: EntrypointName.fromString("recover"),
	recoveryAddress: EntrypointName.fromString("recoveryAddress"),
	removeAgent: EntrypointName.fromString("removeAgent"),
	setCompliance: EntrypointName.fromString("setCompliance"),
	setIdentityRegistry: EntrypointName.fromString("setIdentityRegistry"),
	supports: EntrypointName.fromString("supports"),
	tokenMetadata: EntrypointName.fromString("tokenMetadata"),
	transfer: EntrypointName.fromString("transfer"),
	unFreeze: EntrypointName.fromString("unFreeze"),
	unPause: EntrypointName.fromString("unPause"),
	updateOperator: EntrypointName.fromString("updateOperator"),
};
export const ENTRYPOINT_DISPLAY_NAMES: Record<string, string> = {
	addAgent: "Add Agent",
	agents: "Agents",
	balanceOf: "Balance Of",
	balanceOfFrozen: "Balance Of Frozen",
	balanceOfUnFrozen: "Balance Of Un Frozen",
	burn: "Burn",
	compliance: "Compliance",
	forcedTransfer: "Forced Transfer",
	freeze: "Freeze",
	identityRegistry: "Identity Registry",
	isAgent: "Is Agent",
	isPaused: "Is Paused",
	mint: "Mint",
	operatorOf: "Operator Of",
	pause: "Pause",
	recover: "Recover",
	recoveryAddress: "Recovery Address",
	removeAgent: "Remove Agent",
	setCompliance: "Set Compliance",
	setIdentityRegistry: "Set Identity Registry",
	supports: "Supports",
	tokenMetadata: "Token Metadata",
	transfer: "Transfer",
	unFreeze: "Un Freeze",
	unPause: "Un Pause",
	updateOperator: "Update Operator",
};
export const RwaSecurityNft = {
	init: new InitMethod<InitRequest>(
		ModuleReference.fromHexString("432a0da869871ad5ff1fef76881e663ae5a980e689a0406f46f68964b35b4d48"),
		ContractName.fromString("rwa_security_nft"),
		InitRequestSchema
	),
	addAgent: new ReceiveMethod<AddAgentRequest, void>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("addAgent"),
		AddAgentRequestSchema
	),
	agents: new ReceiveMethod<void, AgentsResponse>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("agents"),
		undefined,
		AgentsResponseSchema
	),
	balanceOf: new ReceiveMethod<BalanceOfRequest, BalanceOfResponse>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("balanceOf"),
		BalanceOfRequestSchema,
		BalanceOfResponseSchema
	),
	balanceOfFrozen: new ReceiveMethod<BalanceOfFrozenRequest, BalanceOfFrozenResponse>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("balanceOfFrozen"),
		BalanceOfFrozenRequestSchema,
		BalanceOfFrozenResponseSchema
	),
	balanceOfUnFrozen: new ReceiveMethod<BalanceOfUnFrozenRequest, BalanceOfUnFrozenResponse>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("balanceOfUnFrozen"),
		BalanceOfUnFrozenRequestSchema,
		BalanceOfUnFrozenResponseSchema
	),
	burn: new ReceiveMethod<BurnRequest, void>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("burn"),
		BurnRequestSchema
	),
	compliance: new ReceiveMethod<void, ComplianceResponse>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("compliance"),
		undefined,
		ComplianceResponseSchema
	),
	forcedTransfer: new ReceiveMethod<ForcedTransferRequest, void>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("forcedTransfer"),
		ForcedTransferRequestSchema
	),
	freeze: new ReceiveMethod<FreezeRequest, void>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("freeze"),
		FreezeRequestSchema
	),
	identityRegistry: new ReceiveMethod<void, IdentityRegistryResponse>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("identityRegistry"),
		undefined,
		IdentityRegistryResponseSchema
	),
	isAgent: new ReceiveMethod<IsAgentRequest, IsAgentResponse>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("isAgent"),
		IsAgentRequestSchema,
		IsAgentResponseSchema
	),
	isPaused: new ReceiveMethod<IsPausedRequest, void>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("isPaused"),
		IsPausedRequestSchema
	),
	mint: new ReceiveMethod<MintRequest, void>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("mint"),
		MintRequestSchema
	),
	operatorOf: new ReceiveMethod<OperatorOfRequest, OperatorOfResponse>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("operatorOf"),
		OperatorOfRequestSchema,
		OperatorOfResponseSchema
	),
	pause: new ReceiveMethod<PauseRequest, void>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("pause"),
		PauseRequestSchema
	),
	recover: new ReceiveMethod<RecoverRequest, void>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("recover"),
		RecoverRequestSchema
	),
	recoveryAddress: new ReceiveMethod<RecoveryAddressRequest, RecoveryAddressResponse>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("recoveryAddress"),
		RecoveryAddressRequestSchema,
		RecoveryAddressResponseSchema
	),
	removeAgent: new ReceiveMethod<RemoveAgentRequest, void>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("removeAgent"),
		RemoveAgentRequestSchema
	),
	setCompliance: new ReceiveMethod<SetComplianceRequest, void>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("setCompliance"),
		SetComplianceRequestSchema
	),
	setIdentityRegistry: new ReceiveMethod<SetIdentityRegistryRequest, void>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("setIdentityRegistry"),
		SetIdentityRegistryRequestSchema
	),
	supports: new ReceiveMethod<SupportsRequest, SupportsResponse>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("supports"),
		SupportsRequestSchema,
		SupportsResponseSchema
	),
	tokenMetadata: new ReceiveMethod<TokenMetadataRequest, TokenMetadataResponse>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("tokenMetadata"),
		TokenMetadataRequestSchema,
		TokenMetadataResponseSchema
	),
	transfer: new ReceiveMethod<TransferRequest, void>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("transfer"),
		TransferRequestSchema
	),
	unFreeze: new ReceiveMethod<UnFreezeRequest, void>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("unFreeze"),
		UnFreezeRequestSchema
	),
	unPause: new ReceiveMethod<UnPauseRequest, void>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("unPause"),
		UnPauseRequestSchema
	),
	updateOperator: new ReceiveMethod<UpdateOperatorRequest, void>(
		ContractName.fromString("rwa_security_nft"),
		EntrypointName.fromString("updateOperator"),
		UpdateOperatorRequestSchema
	),
};
export default RwaSecurityNft;
