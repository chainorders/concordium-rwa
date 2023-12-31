import {
	SendTransactionInitContractPayload,
	SendTransactionUpdateContractPayload,
	SmartContractParameters,
	WalletApi,
} from "@concordium/browser-wallet-api-helpers";
import {
	AccountAddress,
	AccountTransactionType,
	Address,
	AttributeKeyString,
	AttributesKeys,
	CcdAmount,
	ConcordiumGRPCClient,
	ContractAddress,
	ContractName,
	Energy,
	EntrypointName,
	ModuleReference,
	Parameter,
	ReceiveName,
	RejectedInit,
	RejectedReceive,
	deserializeReceiveReturnValue,
	serializeUpdateContractParameters,
	toBuffer,
} from "@concordium/web-sdk";
import {
	AddressSchemaJson,
	IdentityRegistryIdentitySchemaJson,
	IdentityRegistryRegisterIdentitiesParamsSchemaJson,
} from "./ts-types";
import {
	AttributeValue,
	InvokeContractFailedResult,
	InvokeContractResult,
	InvokeContractSuccessResult,
	fromAddressJson,
	fromContractAddressJson,
	toAddressJson,
	toAttributeValueJson,
	toContractAddressJson,
} from "./common/types";
import { Buffer } from "buffer/";
import { AGENT_CONTRACT_ENTRYPOINTS, AGENT_CONTRACT_ENTRYPOINTS_DISPLAY_NAMES } from "./common/AgentContract";

export const MODULE_REF: ModuleReference.Type = ModuleReference.fromHexString(
	import.meta.env.VITE_IDENTITY_REGISTRY_MODULE_REF as string
);
export const CONTRACT_NAME: ContractName.Type = ContractName.fromString(
	import.meta.env.VITE_IDENTITY_REGISTRY_CONTRACT_NAME as string
);
const EXECUTION_ENERGY: Energy.Type = Energy.create(parseInt(import.meta.env.VITE_IDENTITY_REGISTRY_ENERGY as string));
const SCHEMA: string = import.meta.env.VITE_IDENTITY_REGISTRY_SCHEMA as string;
const SCHEMA_BUFFER: Buffer = toBuffer(SCHEMA, "base64");

export const ENTRYPOINTS: Record<string, EntrypointName.Type> = {
	...AGENT_CONTRACT_ENTRYPOINTS,
	registerIdentities: EntrypointName.fromString("registerIdentities"),
	deleteIdentities: EntrypointName.fromString("deleteIdentities"),
	updateIdentities: EntrypointName.fromString("updateIdentities"),
	hasIdentity: EntrypointName.fromString("hasIdentity"),
	getIdentity: EntrypointName.fromString("getIdentity"),
	isVerified: EntrypointName.fromString("isVerified"),
	isIssuer: EntrypointName.fromString("isIssuer"),
	issuers: EntrypointName.fromString("issuers"),
	addIssuer: EntrypointName.fromString("addIssuer"),
	removeIssuer: EntrypointName.fromString("removeIssuer"),
};
export const ENTRYPOINT_NAMES: Record<string, string> = {
	...AGENT_CONTRACT_ENTRYPOINTS_DISPLAY_NAMES,
	registerIdentities: "Register Identities",
	deleteIdentities: "Delete Identities",
	updateIdentities: "Update Identities",
	hasIdentity: "Has Identity",
	getIdentity: "Get Identity",
	isVerified: "Is Verified",
	isIssuer: "Is Issuer",
	issuers: "Issuers",
	addIssuer: "Add Issuer",
	removeIssuer: "Remove Issuer",
};

export type PublicKeyEd25519 = Buffer;
AttributesKeys;
export interface IdentityAttribute {
	key: AttributeKeyString;
	value: AttributeValue;
}
export interface IdentityCredential {
	issuer: ContractAddress.Type;
	id: PublicKeyEd25519;
}
export interface Identity {
	attributes: IdentityAttribute[];
	credentials: IdentityCredential[];
	address: Address;
}

export const initialize = async (provider: WalletApi, account: AccountAddress.Type) => {
	return provider.sendTransaction(
		account,
		AccountTransactionType.InitContract,
		{
			amount: CcdAmount.fromCcd(0),
			moduleRef: MODULE_REF,
			initName: CONTRACT_NAME,
			maxContractExecutionEnergy: EXECUTION_ENERGY,
		} as SendTransactionInitContractPayload,
		undefined,
		undefined,
		undefined
	);
};

export const addAgent = async (
	provider: WalletApi,
	account: AccountAddress.Type,
	contractAddress: ContractAddress.Type,
	agent: Address
) => {
	return provider.sendTransaction(
		account,
		AccountTransactionType.Update,
		{
			amount: CcdAmount.fromCcd(0),
			contractName: CONTRACT_NAME,
			address: contractAddress,
			maxContractExecutionEnergy: EXECUTION_ENERGY,
			receiveName: ReceiveName.create(CONTRACT_NAME, ENTRYPOINTS.addAgent),
		} as SendTransactionUpdateContractPayload,
		toAddressJson(agent) as SmartContractParameters,
		SCHEMA
	);
};

export const removeAgent = async (
	provider: WalletApi,
	account: AccountAddress.Type,
	contractAddress: ContractAddress.Type,
	agent: Address
) => {
	return provider.sendTransaction(
		account,
		AccountTransactionType.Update,
		{
			amount: CcdAmount.fromCcd(0),
			contractName: CONTRACT_NAME,
			address: contractAddress,
			maxContractExecutionEnergy: EXECUTION_ENERGY,
			receiveName: ReceiveName.create(CONTRACT_NAME, ENTRYPOINTS.removeAgent),
		} as SendTransactionUpdateContractPayload,
		toAddressJson(agent) as SmartContractParameters,
		SCHEMA
	);
};

export const isAgent = async (
	provider: ConcordiumGRPCClient,
	contract: ContractAddress.Type,
	agent: Address,
	invoker?: AccountAddress.Type
) => {
	return await invoke<boolean>(provider, contract, ENTRYPOINTS.isAgent, toAddressJson(agent), invoker);
};

export const getAgents = async (
	provider: ConcordiumGRPCClient,
	contract: ContractAddress.Type,
	invoker?: AccountAddress.Type
): Promise<InvokeContractResult<Address[], string>> => {
	const res = await invoke<AddressSchemaJson[]>(provider, contract, ENTRYPOINTS.agents, undefined, invoker);

	switch (res.tag) {
		case "success": {
			return {
				...res,
				returnValue: res.returnValue.map((address) => fromAddressJson(address)),
			} as InvokeContractSuccessResult<Address[]>;
		}
		case "failure": {
			return {
				...res,
				returnValue: errorString(res.reason as RejectedReceive),
			} as InvokeContractFailedResult<string>;
		}
	}
};

const toIdentitySchemaJson = (identity: Identity): IdentityRegistryIdentitySchemaJson => {
	return {
		attributes: identity.attributes.map((attribute) => {
			return [AttributesKeys[attribute.key], toAttributeValueJson(attribute.value)];
		}),
		credentials: identity.credentials.map((credential) => {
			return [toContractAddressJson(credential.issuer), credential.id.toString("hex")];
		}),
	};
};

const fromIdentitySchemaJson = (address: AddressSchemaJson, identity: IdentityRegistryIdentitySchemaJson): Identity => {
	return {
		attributes: identity.attributes.map((attribute) => {
			return {
				key: AttributesKeys[attribute[0]] as AttributeKeyString,
				value: Buffer.from(attribute[1].map((x) => Number(x.toString()))),
			};
		}),
		credentials: identity.credentials.map((credential) => {
			return {
				issuer: fromContractAddressJson(credential[0]),
				id: Buffer.from(credential[1], "hex"),
			};
		}),
		address: fromAddressJson(address),
	};
};

const toIdentitiesJson = (identities: Identity[]): IdentityRegistryRegisterIdentitiesParamsSchemaJson => {
	return {
		identities: identities.map((identity) => {
			return {
				identity: toIdentitySchemaJson(identity),
				address: toAddressJson(identity.address),
			};
		}),
	};
};

export const registerIdentities = async (
	provider: WalletApi,
	account: AccountAddress.Type,
	contractAddress: ContractAddress.Type,
	identifies: Identity[]
) => {
	const json: IdentityRegistryRegisterIdentitiesParamsSchemaJson = toIdentitiesJson(identifies);
	return provider.sendTransaction(
		account,
		AccountTransactionType.Update,
		{
			amount: CcdAmount.fromCcd(0),
			contractName: CONTRACT_NAME,
			address: contractAddress,
			maxContractExecutionEnergy: EXECUTION_ENERGY,
			receiveName: ReceiveName.create(CONTRACT_NAME, ENTRYPOINTS.registerIdentities),
		} as SendTransactionUpdateContractPayload,
		json as SmartContractParameters,
		SCHEMA
	);
};

export const deleteIdentities = async (
	provider: WalletApi,
	account: AccountAddress.Type,
	contractAddress: ContractAddress.Type,
	identities: Address[]
) => {
	const json = {
		addresses: identities.map((identity) => {
			return toAddressJson(identity);
		}),
	};

	return provider.sendTransaction(
		account,
		AccountTransactionType.Update,
		{
			amount: CcdAmount.fromCcd(0),
			contractName: CONTRACT_NAME,
			address: contractAddress,
			maxContractExecutionEnergy: EXECUTION_ENERGY,
			receiveName: ReceiveName.create(CONTRACT_NAME, ENTRYPOINTS.deleteIdentities),
		} as SendTransactionUpdateContractPayload,
		json as SmartContractParameters,
		SCHEMA
	);
};

export const getIdentity = async (
	provider: ConcordiumGRPCClient,
	contract: ContractAddress.Type,
	identity: Address,
	invoker?: AccountAddress.Type
): Promise<InvokeContractResult<Identity, string>> => {
	const paramsJson = toAddressJson(identity);
	const result = await invoke<IdentityRegistryIdentitySchemaJson>(
		provider,
		contract,
		ENTRYPOINTS.getIdentity,
		paramsJson,
		invoker
	);
	switch (result.tag) {
		case "success": {
			return {
				...result,
				returnValue: fromIdentitySchemaJson(paramsJson, result.returnValue),
			} as InvokeContractSuccessResult<Identity>;
		}
		case "failure": {
			return {
				...result,
				returnValue: errorString(result.reason as RejectedReceive),
			} as InvokeContractFailedResult<string>;
		}
	}
};

export const isVerified = async (
	provider: ConcordiumGRPCClient,
	contract: ContractAddress.Type,
	identity: Address,
	invoker?: AccountAddress.Type
): Promise<InvokeContractResult<boolean, string>> => {
	return invoke<boolean>(provider, contract, ENTRYPOINTS.isVerified, toAddressJson(identity), invoker);
};

// This file should be kept in sync with contracts/identity-registry/src/error.rs
export enum Error {
	/// Triggered when there is an error parsing a value.
	ParseError = -1,
	/// Triggered when there is an error logging a value.
	LogError = -2,
	/// Triggered when an unauthorized action is attempted.
	Unauthorized = -3,
	/// Triggered when an identity could not be found.
	IdentityNotFound = -4,
	/// Triggered when an issuer could not be found.
	IssuerNotFound = -5,
	/// Triggered when an issuer already exists.
	IssuerAlreadyExists = -6,
	/// Triggered when an agent already exists.
	AgentAlreadyExists = -7,
	/// Triggered when an agent could not be found.
	AgentNotFound = -8,
	/// Triggered when an issuer is invalid.
	InvalidIssuer = -9,
	/// Triggered when there is an error calling a contract.
	CallContractError = -10,
}

export const errorString = (reason: RejectedInit | RejectedReceive): string => {
	switch (reason.rejectReason) {
		case Error.ParseError:
			return "Parse Error";
		case Error.LogError:
			return "Log Error";
		case Error.Unauthorized:
			return "Unauthorized";
		case Error.IdentityNotFound:
			return "Identity not found";
		case Error.IssuerNotFound:
			return "Issuer not found";
		case Error.IssuerAlreadyExists:
			return "Issuer already exists";
		case Error.AgentAlreadyExists:
			return "Agent already exists";
		case Error.AgentNotFound:
			return "Agent not found";
		case Error.InvalidIssuer:
			return "Invalid issuer";
		case Error.CallContractError:
			return "Call contract error";
		default:
			return `Unknown error: ${reason.rejectReason}`;
	}
};

async function invoke<R>(
	provider: ConcordiumGRPCClient,
	contract: ContractAddress.Type,
	entrypoint: EntrypointName.Type<string>,
	paramsJson?: SmartContractParameters,
	invoker?: AccountAddress.Type
): Promise<InvokeContractResult<R, string>> {
	const parameter = (paramsJson &&
		serializeUpdateContractParameters(CONTRACT_NAME, entrypoint, paramsJson, SCHEMA_BUFFER)) as
		| Parameter.Type
		| undefined;

	const result = await provider.invokeContract({
		contract,
		parameter,
		invoker,
		method: ReceiveName.create(CONTRACT_NAME, entrypoint),
	});

	switch (result.tag) {
		case "success": {
			const returnValue = deserializeReceiveReturnValue(
				result.returnValue!.buffer,
				SCHEMA_BUFFER,
				CONTRACT_NAME,
				entrypoint
			) as boolean;
			return {
				...result,
				returnValue,
			} as InvokeContractSuccessResult<R>;
		}
		case "failure": {
			return {
				...result,
				returnValue: errorString(result.reason as RejectedReceive),
			} as InvokeContractFailedResult<string>;
		}
	}
}
