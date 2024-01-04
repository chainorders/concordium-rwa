import { ContractEvent, ContractName, EntrypointName, ModuleReference } from "@concordium/web-sdk";
import { InitMethod, ReceiveMethod } from "./GenericContract";
export type AddAgentRequest = { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
export const AddAgentRequestSchema = "FQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type AddIssuerRequest = { index: number; subindex: number };
export const AddIssuerRequestSchema = "DA==";
export type AgentsResponse = { Account: [string] } | { Contract: [{ index: number; subindex: number }] }[];
export const AgentsResponseSchema = "EAIVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAM";
export type DeleteIdentitiesRequest = {
	addresses: { Account: [string] } | { Contract: [{ index: number; subindex: number }] }[];
};
export const DeleteIdentitiesRequestSchema =
	"FAABAAAACQAAAGFkZHJlc3NlcxACFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type GetIdentityRequest = { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
export const GetIdentityRequestSchema = "FQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type GetIdentityResponse = {
	attributes: [number, number[]][];
	credentials: [{ index: number; subindex: number }, string][];
};
export const GetIdentityResponseSchema = "FAACAAAACgAAAGF0dHJpYnV0ZXMQAg8CEAICCwAAAGNyZWRlbnRpYWxzEAIPDB4gAAAA";
export type HasIdentityRequest = { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
export const HasIdentityRequestSchema = "FQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type IsAgentRequest = { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
export const IsAgentRequestSchema = "FQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type IsAgentResponse = boolean;
export const IsAgentResponseSchema = "AQ==";
export type IsIssuerRequest = { index: number; subindex: number };
export const IsIssuerRequestSchema = "DA==";
export type IsIssuerResponse = boolean;
export const IsIssuerResponseSchema = "AQ==";
export type IsSameRequest = [
	{ Account: [string] } | { Contract: [{ index: number; subindex: number }] },
	{ Account: [string] } | { Contract: [{ index: number; subindex: number }] },
];
export const IsSameRequestSchema =
	"DxUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAwVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAM";
export type IsSameResponse = boolean;
export const IsSameResponseSchema = "AQ==";
export type IsVerifiedRequest = { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
export const IsVerifiedRequestSchema = "FQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type IsVerifiedResponse = boolean;
export const IsVerifiedResponseSchema = "AQ==";
export type IssuersResponse = { index: number; subindex: number }[];
export const IssuersResponseSchema = "EAIM";
export type RegisterIdentitiesRequest = {
	identities: {
		identity: { attributes: [number, number[]][]; credentials: [{ index: number; subindex: number }, string][] };
		address: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
	}[];
};
export const RegisterIdentitiesRequestSchema =
	"FAABAAAACgAAAGlkZW50aXRpZXMQAhQAAgAAAAgAAABpZGVudGl0eRQAAgAAAAoAAABhdHRyaWJ1dGVzEAIPAhACAgsAAABjcmVkZW50aWFscxACDwweIAAAAAcAAABhZGRyZXNzFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type RemoveAgentRequest = { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
export const RemoveAgentRequestSchema = "FQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type RemoveIssuerRequest = { index: number; subindex: number };
export const RemoveIssuerRequestSchema = "DA==";
export type SupportsRequest = string[];
export const SupportsRequestSchema = "EAEWAA==";
export type SupportsResponse =
	| { NoSupport: Record<string, never> }
	| { Support: Record<string, never> }
	| { SupportBy: [{ index: number; subindex: number }[]] }[];
export const SupportsResponseSchema = "EAEVAwAAAAkAAABOb1N1cHBvcnQCBwAAAFN1cHBvcnQCCQAAAFN1cHBvcnRCeQEBAAAAEAAM";
export type UpdateIdentitiesRequest = {
	identities: {
		identity: { attributes: [number, number[]][]; credentials: [{ index: number; subindex: number }, string][] };
		address: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
	}[];
};
export const UpdateIdentitiesRequestSchema =
	"FAABAAAACgAAAGlkZW50aXRpZXMQAhQAAgAAAAgAAABpZGVudGl0eRQAAgAAAAoAAABhdHRyaWJ1dGVzEAIPAhACAgsAAABjcmVkZW50aWFscxACDwweIAAAAAcAAABhZGRyZXNzFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type RwaIdentityRegistryEvent =
	| { IdentityRegistered: [{ Account: [string] } | { Contract: [{ index: number; subindex: number }] }] }
	| { IdentityUpdated: [{ Account: [string] } | { Contract: [{ index: number; subindex: number }] }] }
	| { IdentityRemoved: [{ Account: [string] } | { Contract: [{ index: number; subindex: number }] }] }
	| { IssuerAdded: [{ index: number; subindex: number }] }
	| { IssuerRemoved: [{ index: number; subindex: number }] }
	| { AgentAdded: [{ agent: { Account: [string] } | { Contract: [{ index: number; subindex: number }] } }] }
	| { AgentRemoved: [{ agent: { Account: [string] } | { Contract: [{ index: number; subindex: number }] } }] };
export const RwaIdentityRegistryEventSchema =
	"FQcAAAASAAAASWRlbnRpdHlSZWdpc3RlcmVkAQEAAAAVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAMDwAAAElkZW50aXR5VXBkYXRlZAEBAAAAFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA8AAABJZGVudGl0eVJlbW92ZWQBAQAAABUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAwLAAAASXNzdWVyQWRkZWQBAQAAAAwNAAAASXNzdWVyUmVtb3ZlZAEBAAAADAoAAABBZ2VudEFkZGVkAQEAAAAUAAEAAAAFAAAAYWdlbnQVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAMDAAAAEFnZW50UmVtb3ZlZAEBAAAAFAABAAAABQAAAGFnZW50FQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export const deserializeEvent = (event: ContractEvent.Type): RwaIdentityRegistryEvent => {
	return ContractEvent.parseWithSchemaTypeBase64(event, RwaIdentityRegistryEventSchema) as RwaIdentityRegistryEvent;
};
export const ENTRYPOINTS: Record<string, EntrypointName.Type> = {
	addAgent: EntrypointName.fromString("addAgent"),
	addIssuer: EntrypointName.fromString("addIssuer"),
	agents: EntrypointName.fromString("agents"),
	deleteIdentities: EntrypointName.fromString("deleteIdentities"),
	getIdentity: EntrypointName.fromString("getIdentity"),
	hasIdentity: EntrypointName.fromString("hasIdentity"),
	isAgent: EntrypointName.fromString("isAgent"),
	isIssuer: EntrypointName.fromString("isIssuer"),
	isSame: EntrypointName.fromString("isSame"),
	isVerified: EntrypointName.fromString("isVerified"),
	issuers: EntrypointName.fromString("issuers"),
	registerIdentities: EntrypointName.fromString("registerIdentities"),
	removeAgent: EntrypointName.fromString("removeAgent"),
	removeIssuer: EntrypointName.fromString("removeIssuer"),
	supports: EntrypointName.fromString("supports"),
	updateIdentities: EntrypointName.fromString("updateIdentities"),
};
export const ENTRYPOINT_DISPLAY_NAMES: Record<string, string> = {
	addAgent: "Add Agent",
	addIssuer: "Add Issuer",
	agents: "Agents",
	deleteIdentities: "Delete Identities",
	getIdentity: "Get Identity",
	hasIdentity: "Has Identity",
	isAgent: "Is Agent",
	isIssuer: "Is Issuer",
	isSame: "Is Same",
	isVerified: "Is Verified",
	issuers: "Issuers",
	registerIdentities: "Register Identities",
	removeAgent: "Remove Agent",
	removeIssuer: "Remove Issuer",
	supports: "Supports",
	updateIdentities: "Update Identities",
};
export const RwaIdentityRegistry = {
	init: new InitMethod<void>(
		ModuleReference.fromHexString("f72f1eb235593a7f23f45fa5bdb8793cd03aeccb9bbc4847f6b8a06e9147c584"),
		ContractName.fromString("rwa_identity_registry")
	),
	addAgent: new ReceiveMethod<AddAgentRequest, void>(
		ContractName.fromString("rwa_identity_registry"),
		EntrypointName.fromString("addAgent"),
		AddAgentRequestSchema
	),
	addIssuer: new ReceiveMethod<AddIssuerRequest, void>(
		ContractName.fromString("rwa_identity_registry"),
		EntrypointName.fromString("addIssuer"),
		AddIssuerRequestSchema
	),
	agents: new ReceiveMethod<void, AgentsResponse>(
		ContractName.fromString("rwa_identity_registry"),
		EntrypointName.fromString("agents"),
		undefined,
		AgentsResponseSchema
	),
	deleteIdentities: new ReceiveMethod<DeleteIdentitiesRequest, void>(
		ContractName.fromString("rwa_identity_registry"),
		EntrypointName.fromString("deleteIdentities"),
		DeleteIdentitiesRequestSchema
	),
	getIdentity: new ReceiveMethod<GetIdentityRequest, GetIdentityResponse>(
		ContractName.fromString("rwa_identity_registry"),
		EntrypointName.fromString("getIdentity"),
		GetIdentityRequestSchema,
		GetIdentityResponseSchema
	),
	hasIdentity: new ReceiveMethod<HasIdentityRequest, void>(
		ContractName.fromString("rwa_identity_registry"),
		EntrypointName.fromString("hasIdentity"),
		HasIdentityRequestSchema
	),
	isAgent: new ReceiveMethod<IsAgentRequest, IsAgentResponse>(
		ContractName.fromString("rwa_identity_registry"),
		EntrypointName.fromString("isAgent"),
		IsAgentRequestSchema,
		IsAgentResponseSchema
	),
	isIssuer: new ReceiveMethod<IsIssuerRequest, IsIssuerResponse>(
		ContractName.fromString("rwa_identity_registry"),
		EntrypointName.fromString("isIssuer"),
		IsIssuerRequestSchema,
		IsIssuerResponseSchema
	),
	isSame: new ReceiveMethod<IsSameRequest, IsSameResponse>(
		ContractName.fromString("rwa_identity_registry"),
		EntrypointName.fromString("isSame"),
		IsSameRequestSchema,
		IsSameResponseSchema
	),
	isVerified: new ReceiveMethod<IsVerifiedRequest, IsVerifiedResponse>(
		ContractName.fromString("rwa_identity_registry"),
		EntrypointName.fromString("isVerified"),
		IsVerifiedRequestSchema,
		IsVerifiedResponseSchema
	),
	issuers: new ReceiveMethod<void, IssuersResponse>(
		ContractName.fromString("rwa_identity_registry"),
		EntrypointName.fromString("issuers"),
		undefined,
		IssuersResponseSchema
	),
	registerIdentities: new ReceiveMethod<RegisterIdentitiesRequest, void>(
		ContractName.fromString("rwa_identity_registry"),
		EntrypointName.fromString("registerIdentities"),
		RegisterIdentitiesRequestSchema
	),
	removeAgent: new ReceiveMethod<RemoveAgentRequest, void>(
		ContractName.fromString("rwa_identity_registry"),
		EntrypointName.fromString("removeAgent"),
		RemoveAgentRequestSchema
	),
	removeIssuer: new ReceiveMethod<RemoveIssuerRequest, void>(
		ContractName.fromString("rwa_identity_registry"),
		EntrypointName.fromString("removeIssuer"),
		RemoveIssuerRequestSchema
	),
	supports: new ReceiveMethod<SupportsRequest, SupportsResponse>(
		ContractName.fromString("rwa_identity_registry"),
		EntrypointName.fromString("supports"),
		SupportsRequestSchema,
		SupportsResponseSchema
	),
	updateIdentities: new ReceiveMethod<UpdateIdentitiesRequest, void>(
		ContractName.fromString("rwa_identity_registry"),
		EntrypointName.fromString("updateIdentities"),
		UpdateIdentitiesRequestSchema
	),
};
export default RwaIdentityRegistry;
