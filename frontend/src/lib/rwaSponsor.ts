import { ContractEvent, ContractName, EntrypointName, ModuleReference } from "@concordium/web-sdk";
import { InitMethod, ReceiveMethod } from "./GenericContract";
export type PermitRequest = {
	signature: [number, [number, { Ed25519: [string] }][]][];
	signer: string;
	message: {
		contract_address: { index: number; subindex: number };
		nonce: bigint;
		timestamp: string;
		entry_point: string;
		payload: number[];
	};
};
export const PermitRequestSchema =
	"FAADAAAACQAAAHNpZ25hdHVyZRIAAhIAAhUBAAAABwAAAEVkMjU1MTkBAQAAAB5AAAAABgAAAHNpZ25lcgsHAAAAbWVzc2FnZRQABQAAABAAAABjb250cmFjdF9hZGRyZXNzDAUAAABub25jZQUJAAAAdGltZXN0YW1wDQsAAABlbnRyeV9wb2ludBYBBwAAAHBheWxvYWQQAQI=";
export type SupportsPermitRequest = { queries: string[] };
export const SupportsPermitRequestSchema = "FAABAAAABwAAAHF1ZXJpZXMQARYB";
export type SupportsPermitResponse = boolean[];
export const SupportsPermitResponseSchema = "EAEB";
export type RwaSponsorEvent = { Nonce: [{ account: string; nonce: bigint }] };
export const RwaSponsorEventSchema = "FQEAAAAFAAAATm9uY2UBAQAAABQAAgAAAAcAAABhY2NvdW50CwUAAABub25jZQU=";
export const deserializeEvent = (event: ContractEvent.Type): RwaSponsorEvent => {
	return ContractEvent.parseWithSchemaTypeBase64(event, RwaSponsorEventSchema) as RwaSponsorEvent;
};
export const ENTRYPOINTS: Record<string, EntrypointName.Type> = {
	permit: EntrypointName.fromString("permit"),
	supportsPermit: EntrypointName.fromString("supportsPermit"),
};
export const ENTRYPOINT_DISPLAY_NAMES: Record<string, string> = { permit: "Permit", supportsPermit: "Supports Permit" };
export const RwaSponsor = {
	init: new InitMethod<void>(
		ModuleReference.fromHexString("86af31dae4db8d753f4a8fbfa50f11a4c470245661e0cc03cc6a2dee47389c5f"),
		ContractName.fromString("rwa_sponsor")
	),
	permit: new ReceiveMethod<PermitRequest, void>(
		ContractName.fromString("rwa_sponsor"),
		EntrypointName.fromString("permit"),
		PermitRequestSchema
	),
	supportsPermit: new ReceiveMethod<SupportsPermitRequest, SupportsPermitResponse>(
		ContractName.fromString("rwa_sponsor"),
		EntrypointName.fromString("supportsPermit"),
		SupportsPermitRequestSchema,
		SupportsPermitResponseSchema
	),
};
export default RwaSponsor;
