import { ContractEvent, ContractName, EntrypointName, ModuleReference } from "@concordium/web-sdk";
import { InitMethod, ReceiveMethod } from "./GenericContract";
export type InitRequest = { modules: { index: number; subindex: number }[] };
export const InitRequestSchema = "FAABAAAABwAAAG1vZHVsZXMQAgw=";
export type AddAgentRequest = { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
export const AddAgentRequestSchema = "FQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type AddModuleRequest = { index: number; subindex: number };
export const AddModuleRequestSchema = "DA==";
export type AgentsResponse = { Account: [string] } | { Contract: [{ index: number; subindex: number }] }[];
export const AgentsResponseSchema = "EAIVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAM";
export type BurnedRequest = {
	token_id: { token_id: string; contract: { index: number; subindex: number } };
	owner: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
	amount: string;
};
export const BurnedRequestSchema =
	"FAADAAAACAAAAHRva2VuX2lkFAACAAAACAAAAHRva2VuX2lkHQAIAAAAY29udHJhY3QMBQAAAG93bmVyFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAYAAABhbW91bnQbJQAAAA==";
export type CanTransferRequest = {
	token_id: { token_id: string; contract: { index: number; subindex: number } };
	to: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
	amount: string;
};
export const CanTransferRequestSchema =
	"FAADAAAACAAAAHRva2VuX2lkFAACAAAACAAAAHRva2VuX2lkHQAIAAAAY29udHJhY3QMAgAAAHRvFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAYAAABhbW91bnQbJQAAAA==";
export type CanTransferResponse = boolean;
export const CanTransferResponseSchema = "AQ==";
export type IsAgentRequest = { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
export const IsAgentRequestSchema = "FQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type IsAgentResponse = boolean;
export const IsAgentResponseSchema = "AQ==";
export type MintedRequest = {
	token_id: { token_id: string; contract: { index: number; subindex: number } };
	owner: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
	amount: string;
};
export const MintedRequestSchema =
	"FAADAAAACAAAAHRva2VuX2lkFAACAAAACAAAAHRva2VuX2lkHQAIAAAAY29udHJhY3QMBQAAAG93bmVyFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAYAAABhbW91bnQbJQAAAA==";
export type ModulesRequest = { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
export const ModulesRequestSchema = "FQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type RemoveAgentRequest = { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
export const RemoveAgentRequestSchema = "FQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type RemoveModuleRequest = { index: number; subindex: number };
export const RemoveModuleRequestSchema = "DA==";
export type SupportsRequest = string[];
export const SupportsRequestSchema = "EAEWAA==";
export type SupportsResponse =
	| { NoSupport: Record<string, never> }
	| { Support: Record<string, never> }
	| { SupportBy: [{ index: number; subindex: number }[]] }[];
export const SupportsResponseSchema = "EAEVAwAAAAkAAABOb1N1cHBvcnQCBwAAAFN1cHBvcnQCCQAAAFN1cHBvcnRCeQEBAAAAEAAM";
export type TransferredRequest = {
	token_id: { token_id: string; contract: { index: number; subindex: number } };
	from: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
	to: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
	amount: string;
};
export const TransferredRequestSchema =
	"FAAEAAAACAAAAHRva2VuX2lkFAACAAAACAAAAHRva2VuX2lkHQAIAAAAY29udHJhY3QMBAAAAGZyb20VAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAMAgAAAHRvFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAYAAABhbW91bnQbJQAAAA==";
export type RwaComplianceEvent =
	| { AgentRemoved: [{ agent: { Account: [string] } | { Contract: [{ index: number; subindex: number }] } }] }
	| { AgentAdded: [{ agent: { Account: [string] } | { Contract: [{ index: number; subindex: number }] } }] }
	| { ModuleAdded: [{ index: number; subindex: number }] }
	| { ModuleRemoved: [{ index: number; subindex: number }] };
export const RwaComplianceEventSchema =
	"FQQAAAAMAAAAQWdlbnRSZW1vdmVkAQEAAAAUAAEAAAAFAAAAYWdlbnQVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAMCgAAAEFnZW50QWRkZWQBAQAAABQAAQAAAAUAAABhZ2VudBUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAwLAAAATW9kdWxlQWRkZWQBAQAAAAwNAAAATW9kdWxlUmVtb3ZlZAEBAAAADA==";
export const deserializeEvent = (event: ContractEvent.Type): RwaComplianceEvent => {
	return ContractEvent.parseWithSchemaTypeBase64(event, RwaComplianceEventSchema) as RwaComplianceEvent;
};
export const ENTRYPOINTS: Record<string, EntrypointName.Type> = {
	addAgent: EntrypointName.fromString("addAgent"),
	addModule: EntrypointName.fromString("addModule"),
	agents: EntrypointName.fromString("agents"),
	burned: EntrypointName.fromString("burned"),
	canTransfer: EntrypointName.fromString("canTransfer"),
	isAgent: EntrypointName.fromString("isAgent"),
	minted: EntrypointName.fromString("minted"),
	modules: EntrypointName.fromString("modules"),
	removeAgent: EntrypointName.fromString("removeAgent"),
	removeModule: EntrypointName.fromString("removeModule"),
	supports: EntrypointName.fromString("supports"),
	transferred: EntrypointName.fromString("transferred"),
};
export const ENTRYPOINT_DISPLAY_NAMES: Record<string, string> = {
	addAgent: "Add Agent",
	addModule: "Add Module",
	agents: "Agents",
	burned: "Burned",
	canTransfer: "Can Transfer",
	isAgent: "Is Agent",
	minted: "Minted",
	modules: "Modules",
	removeAgent: "Remove Agent",
	removeModule: "Remove Module",
	supports: "Supports",
	transferred: "Transferred",
};
export const RwaCompliance = {
	init: new InitMethod<InitRequest>(
		ModuleReference.fromHexString("7ce6d2868bbdd0e2f0019c40bcff259311125d34c804dc942825ff8804adb24b"),
		ContractName.fromString("rwa_compliance"),
		InitRequestSchema
	),
	addAgent: new ReceiveMethod<AddAgentRequest, void>(
		ContractName.fromString("rwa_compliance"),
		EntrypointName.fromString("addAgent"),
		AddAgentRequestSchema
	),
	addModule: new ReceiveMethod<AddModuleRequest, void>(
		ContractName.fromString("rwa_compliance"),
		EntrypointName.fromString("addModule"),
		AddModuleRequestSchema
	),
	agents: new ReceiveMethod<void, AgentsResponse>(
		ContractName.fromString("rwa_compliance"),
		EntrypointName.fromString("agents"),
		undefined,
		AgentsResponseSchema
	),
	burned: new ReceiveMethod<BurnedRequest, void>(
		ContractName.fromString("rwa_compliance"),
		EntrypointName.fromString("burned"),
		BurnedRequestSchema
	),
	canTransfer: new ReceiveMethod<CanTransferRequest, CanTransferResponse>(
		ContractName.fromString("rwa_compliance"),
		EntrypointName.fromString("canTransfer"),
		CanTransferRequestSchema,
		CanTransferResponseSchema
	),
	isAgent: new ReceiveMethod<IsAgentRequest, IsAgentResponse>(
		ContractName.fromString("rwa_compliance"),
		EntrypointName.fromString("isAgent"),
		IsAgentRequestSchema,
		IsAgentResponseSchema
	),
	minted: new ReceiveMethod<MintedRequest, void>(
		ContractName.fromString("rwa_compliance"),
		EntrypointName.fromString("minted"),
		MintedRequestSchema
	),
	modules: new ReceiveMethod<ModulesRequest, void>(
		ContractName.fromString("rwa_compliance"),
		EntrypointName.fromString("modules"),
		ModulesRequestSchema
	),
	removeAgent: new ReceiveMethod<RemoveAgentRequest, void>(
		ContractName.fromString("rwa_compliance"),
		EntrypointName.fromString("removeAgent"),
		RemoveAgentRequestSchema
	),
	removeModule: new ReceiveMethod<RemoveModuleRequest, void>(
		ContractName.fromString("rwa_compliance"),
		EntrypointName.fromString("removeModule"),
		RemoveModuleRequestSchema
	),
	supports: new ReceiveMethod<SupportsRequest, SupportsResponse>(
		ContractName.fromString("rwa_compliance"),
		EntrypointName.fromString("supports"),
		SupportsRequestSchema,
		SupportsResponseSchema
	),
	transferred: new ReceiveMethod<TransferredRequest, void>(
		ContractName.fromString("rwa_compliance"),
		EntrypointName.fromString("transferred"),
		TransferredRequestSchema
	),
};
export default RwaCompliance;
