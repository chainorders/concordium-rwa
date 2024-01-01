export const IdentityRegistryIdentitiesBase64Schema =
	"EAIUAAIAAAAKAAAAYXR0cmlidXRlcxACDwIQAgILAAAAY3JlZGVudGlhbHMQAg8MHiAAAAA=";
export type IdentityRegistryIdentitiesSchemaJson = {
	attributes: [number, number[]][];
	credentials: [{ index: number; subindex: number }, string][];
}[];
export const IdentityRegistryRegisterIdentitiesParamsBase64Schema =
	"FAABAAAACgAAAGlkZW50aXRpZXMQAhQAAgAAAAgAAABpZGVudGl0eRQAAgAAAAoAAABhdHRyaWJ1dGVzEAIPAhACAgsAAABjcmVkZW50aWFscxACDwweIAAAAAcAAABhZGRyZXNzFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type IdentityRegistryRegisterIdentitiesParamsSchemaJson = {
	identities: {
		identity: { attributes: [number, number[]][]; credentials: [{ index: number; subindex: number }, string][] };
		address: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
	}[];
};
export const ComplianceInitParamsBase64Schema = "FAABAAAABwAAAG1vZHVsZXMQAgw=";
export type ComplianceInitParamsSchemaJson = { modules: { index: number; subindex: number }[] };
export const SecurityNftInitParamsBase64Schema =
	"FAADAAAAEQAAAGlkZW50aXR5X3JlZ2lzdHJ5DAoAAABjb21wbGlhbmNlDAgAAABzcG9uc29ycxACDA==";
export type SecurityNftInitParamsSchemaJson = {
	identity_registry: { index: number; subindex: number };
	compliance: { index: number; subindex: number };
	sponsors: { index: number; subindex: number }[];
};
export const SecurityNftMintParamsBase64Schema =
	"FAACAAAABQAAAG93bmVyFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAECAAAADBYBBgAAAHRva2VucxACFAABAAAADAAAAG1ldGFkYXRhX3VybBQAAgAAAAMAAAB1cmwWAgQAAABoYXNoFQIAAAAEAAAATm9uZQIEAAAAU29tZQEBAAAAFgI=";
export type SecurityNftMintParamsSchemaJson = {
	owner: { Account: [string] } | { Contract: [{ index: number; subindex: number }, string] };
	tokens: { metadata_url: { url: string; hash: { None: Record<string, never> } | { Some: [string] } } }[];
};
export const IdentityRegistryDeleteIdentitiesParamsBase64Schema =
	"FAABAAAACQAAAGFkZHJlc3NlcxACFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type IdentityRegistryDeleteIdentitiesParamsSchemaJson = {
	addresses: { Account: [string] } | { Contract: [{ index: number; subindex: number }] }[];
};
export const SecurityNftFrozenParamsBase64Schema =
	"FAACAAAABQAAAG93bmVyFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAYAAAB0b2tlbnMQAh0A";
export type SecurityNftFrozenParamsSchemaJson = {
	owner: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
	tokens: string[];
};
export const SecurityNftFrozenResponseBase64Schema = "FAABAAAABgAAAHRva2VucxACGyUAAAA=";
export type SecurityNftFrozenResponseSchemaJson = { tokens: string[] };
export const SecurityNftFreezeParamsBase64Schema =
	"FAACAAAABQAAAG93bmVyFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAYAAAB0b2tlbnMQAhQAAgAAAAgAAAB0b2tlbl9pZB0ADAAAAHRva2VuX2Ftb3VudBslAAAA";
export type SecurityNftFreezeParamsSchemaJson = {
	owner: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
	tokens: { token_id: string; token_amount: string }[];
};
export const SecurityNftPauseParamsBase64Schema = "FAABAAAABgAAAHRva2VucxACHQA=";
export type SecurityNftPauseParamsSchemaJson = { tokens: string[] };
export const ComplianceCanTransferParamsBase64Schema =
	"FAADAAAACAAAAHRva2VuX2lkFAACAAAACAAAAHRva2VuX2lkHQAIAAAAY29udHJhY3QMAgAAAHRvFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAYAAABhbW91bnQbJQAAAA==";
export type ComplianceCanTransferParamsSchemaJson = {
	token_id: { token_id: string; contract: { index: number; subindex: number } };
	to: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
	amount: string;
};
export const ComplianceModuleAllowedNationalitiesInitParamsBase64Schema =
	"FAACAAAADQAAAG5hdGlvbmFsaXRpZXMQAhACAhEAAABpZGVudGl0eV9yZWdpc3RyeQw=";
export type ComplianceModuleAllowedNationalitiesInitParamsSchemaJson = {
	nationalities: number[][];
	identity_registry: { index: number; subindex: number };
};
export const SecurityNftBalanceOfParamBase64Schema =
	"FAACAAAACAAAAHRva2VuX2lkHQAHAAAAYWRkcmVzcxUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAw=";
export type SecurityNftBalanceOfParamSchemaJson = {
	token_id: string;
	address: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
};
export const SecurityNftEventBase64Schema =
	"Hw4AAADyCQAAAFJlY292ZXJlZAEBAAAAFAACAAAADAAAAGxvc3RfYWNjb3VudBUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAwLAAAAbmV3X2FjY291bnQVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAM8xUAAABJZGVudGl0eVJlZ2lzdHJ5QWRkZWQBAQAAAAz0DwAAAENvbXBsaWFuY2VBZGRlZAEBAAAADPUIAAAAVW5QYXVzZWQBAQAAABQAAQAAAAgAAAB0b2tlbl9pZB0A9gYAAABQYXVzZWQBAQAAABQAAQAAAAgAAAB0b2tlbl9pZB0A9wwAAABUb2tlbnNGcm96ZW4BAQAAABQAAwAAAAgAAAB0b2tlbl9pZB0ABgAAAGFtb3VudBslAAAABwAAAGFkZHJlc3MVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAM+A4AAABUb2tlbnNVbkZyb3plbgEBAAAAFAADAAAACAAAAHRva2VuX2lkHQAGAAAAYW1vdW50GyUAAAAHAAAAYWRkcmVzcxUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAz5DAAAAEFnZW50UmVtb3ZlZAEBAAAAFAABAAAABQAAAGFnZW50FQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADPoKAAAAQWdlbnRBZGRlZAEBAAAAFAABAAAABQAAAGFnZW50FQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADPsNAAAAVG9rZW5NZXRhZGF0YQACAAAACAAAAHRva2VuX2lkHQAMAAAAbWV0YWRhdGFfdXJsFAACAAAAAwAAAHVybBYBBAAAAGhhc2gVAgAAAAQAAABOb25lAgQAAABTb21lAQEAAAAeIAAAAPwOAAAAVXBkYXRlT3BlcmF0b3IAAwAAAAYAAAB1cGRhdGUVAgAAAAYAAABSZW1vdmUCAwAAAEFkZAIFAAAAb3duZXIVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAMCAAAAG9wZXJhdG9yFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADP0EAAAAQnVybgADAAAACAAAAHRva2VuX2lkHQAGAAAAYW1vdW50GyUAAAAFAAAAb3duZXIVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAM/gQAAABNaW50AAMAAAAIAAAAdG9rZW5faWQdAAYAAABhbW91bnQbJQAAAAUAAABvd25lchUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAz/CAAAAFRyYW5zZmVyAAQAAAAIAAAAdG9rZW5faWQdAAYAAABhbW91bnQbJQAAAAQAAABmcm9tFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAIAAAB0bxUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAw=";
export type SecurityNftEventSchemaJson =
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
export const AddressBase64Schema = "FQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type AddressSchemaJson = { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
export const IdentityRegistryErrorBase64Schema =
	"FQoAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDAAAAFVuYXV0aG9yaXplZAIQAAAASWRlbnRpdHlOb3RGb3VuZAIOAAAASXNzdWVyTm90Rm91bmQCEwAAAElzc3VlckFscmVhZHlFeGlzdHMCEgAAAEFnZW50QWxyZWFkeUV4aXN0cwINAAAAQWdlbnROb3RGb3VuZAINAAAASW52YWxpZElzc3VlcgIRAAAAQ2FsbENvbnRyYWN0RXJyb3IC";
export type IdentityRegistryErrorSchemaJson =
	| { ParseError: Record<string, never> }
	| { LogError: Record<string, never> }
	| { Unauthorized: Record<string, never> }
	| { IdentityNotFound: Record<string, never> }
	| { IssuerNotFound: Record<string, never> }
	| { IssuerAlreadyExists: Record<string, never> }
	| { AgentAlreadyExists: Record<string, never> }
	| { AgentNotFound: Record<string, never> }
	| { InvalidIssuer: Record<string, never> }
	| { CallContractError: Record<string, never> };
export const SecurityNftTransferParamBase64Schema =
	"FAAFAAAACAAAAHRva2VuX2lkHQAGAAAAYW1vdW50GyUAAAAEAAAAZnJvbRUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAwCAAAAdG8VAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQIAAAAMFgEEAAAAZGF0YR0B";
export type SecurityNftTransferParamSchemaJson = {
	token_id: string;
	amount: string;
	from: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
	to: { Account: [string] } | { Contract: [{ index: number; subindex: number }, string] };
	data: string;
};
export const SecurityNftBurnParamBase64Schema =
	"FAADAAAACAAAAHRva2VuX2lkHQAGAAAAYW1vdW50GyUAAAAFAAAAb3duZXIVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAM";
export type SecurityNftBurnParamSchemaJson = {
	token_id: string;
	amount: string;
	owner: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
};
export const SecurityNftFreezeParamBase64Schema = "FAACAAAACAAAAHRva2VuX2lkHQAMAAAAdG9rZW5fYW1vdW50GyUAAAA=";
export type SecurityNftFreezeParamSchemaJson = { token_id: string; token_amount: string };
export const ContractAddressBase64Schema = "DA==";
export type ContractAddressSchemaJson = { index: number; subindex: number };
export const SecurityNftIsPausedResponseBase64Schema = "FAABAAAABgAAAHRva2VucxACAQ==";
export type SecurityNftIsPausedResponseSchemaJson = { tokens: boolean[] };
export const IdentityRegistryIdentityBase64Schema =
	"FAACAAAACgAAAGF0dHJpYnV0ZXMQAg8CEAICCwAAAGNyZWRlbnRpYWxzEAIPDB4gAAAA";
export type IdentityRegistryIdentitySchemaJson = {
	attributes: [number, number[]][];
	credentials: [{ index: number; subindex: number }, string][];
};
export const ReceiverBase64Schema = "FQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAECAAAADBYB";
export type ReceiverSchemaJson = { Account: [string] } | { Contract: [{ index: number; subindex: number }, string] };
