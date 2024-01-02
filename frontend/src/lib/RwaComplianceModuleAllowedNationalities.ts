import { ContractName, EntrypointName, ModuleReference } from "@concordium/web-sdk";
import { InitMethod, ReceiveMethod } from "./GenericContract";
export type InitRequest = { nationalities: number[][]; identity_registry: { index: number; subindex: number } };
export const InitRequestSchema = "FAACAAAADQAAAG5hdGlvbmFsaXRpZXMQAhACAhEAAABpZGVudGl0eV9yZWdpc3RyeQw=";
export type CanTransferRequest = {
	token_id: { token_id: string; contract: { index: number; subindex: number } };
	to: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
	amount: string;
};
export const CanTransferRequestSchema =
	"FAADAAAACAAAAHRva2VuX2lkFAACAAAACAAAAHRva2VuX2lkHQAIAAAAY29udHJhY3QMAgAAAHRvFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAYAAABhbW91bnQbJQAAAA==";
export type CanTransferResponse = boolean;
export const CanTransferResponseSchema = "AQ==";
export const ENTRYPOINTS: Record<string, EntrypointName.Type> = {
	burned: EntrypointName.fromString("burned"),
	canTransfer: EntrypointName.fromString("canTransfer"),
	minted: EntrypointName.fromString("minted"),
	transferred: EntrypointName.fromString("transferred"),
};
export const ENTRYPOINT_DISPLAY_NAMES: Record<string, string> = {
	burned: "Burned",
	canTransfer: "Can Transfer",
	minted: "Minted",
	transferred: "Transferred",
};
export const RwaComplianceModuleAllowedNationalities = {
	init: new InitMethod<InitRequest>(
		ModuleReference.fromHexString("7ce6d2868bbdd0e2f0019c40bcff259311125d34c804dc942825ff8804adb24b"),
		ContractName.fromString("rwa_compliance_module_allowed_nationalities"),
		InitRequestSchema
	),
	burned: new ReceiveMethod<void, void>(
		ContractName.fromString("rwa_compliance_module_allowed_nationalities"),
		EntrypointName.fromString("burned")
	),
	canTransfer: new ReceiveMethod<CanTransferRequest, CanTransferResponse>(
		ContractName.fromString("rwa_compliance_module_allowed_nationalities"),
		EntrypointName.fromString("canTransfer"),
		CanTransferRequestSchema,
		CanTransferResponseSchema
	),
	minted: new ReceiveMethod<void, void>(
		ContractName.fromString("rwa_compliance_module_allowed_nationalities"),
		EntrypointName.fromString("minted")
	),
	transferred: new ReceiveMethod<void, void>(
		ContractName.fromString("rwa_compliance_module_allowed_nationalities"),
		EntrypointName.fromString("transferred")
	),
};
export default RwaComplianceModuleAllowedNationalities;
