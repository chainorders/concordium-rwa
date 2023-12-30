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
	InvokeContractFailedResult,
	InvokeContractSuccessResult,
	fromAddressJson,
	fromContractAddressJson,
	toAddressJson,
	toContractAddressJson,
} from "./common/types";
import { Buffer } from "buffer/";

export const IdentityRegistryModuleReference: ModuleReference.Type = ModuleReference.fromHexString(
	import.meta.env.VITE_IDENTITY_REGISTRY_MODULE_REFERENCE as string
);
export const CONTRACT_NAME: ContractName.Type = ContractName.fromString(
	import.meta.env.VITE_IDENTITY_REGISTRY_CONTRACT_NAME as string
);
export const ENTRYPOINTS: Record<string, EntrypointName.Type> = {
	addAgent: EntrypointName.fromString("addAgent"),
	removeAgent: EntrypointName.fromString("removeAgent"),
	isAgent: EntrypointName.fromString("isAgent"),
	agents: EntrypointName.fromString("agents"),
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
export const ENTRYPOINTS_DISPLAY_NAMES: Record<string, string> = {
	addAgent: "Add Agent",
	removeAgent: "Remove Agent",
	isAgent: "Is Agent",
	agents: "Agents",
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
const EXECUTION_ENERGY: Energy.Type = Energy.create(
	parseInt(import.meta.env.VITE_IDENTITY_REGISTRY_INIT_ENERGY as string)
);
const SCHEMA: string = import.meta.env.VITE_IDENTITY_REGISTRY_SCHEMA as string;

export type PublicKeyEd25519 = Buffer;
export type AttributeValue = Buffer;
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
			moduleRef: IdentityRegistryModuleReference,
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
	const schemaBuffer = toBuffer(SCHEMA, "base64");
	const parameter = serializeUpdateContractParameters(
		CONTRACT_NAME,
		ENTRYPOINTS.isAgent,
		toAddressJson(agent) as SmartContractParameters,
		schemaBuffer
	);
	const result = await provider.invokeContract({
		contract,
		parameter,
		invoker,
		method: ReceiveName.create(CONTRACT_NAME, ENTRYPOINTS.isAgent),
	});

	const returnValue = result.returnValue
		? deserializeReceiveReturnValue(result.returnValue!.buffer, schemaBuffer, CONTRACT_NAME, ENTRYPOINTS.isAgent)
		: undefined;
	return {
		...result,
		returnValue,
	} as InvokeContractSuccessResult<boolean> | InvokeContractFailedResult<boolean>;
};

export const getAgents = async (
	provider: ConcordiumGRPCClient,
	contract: ContractAddress.Type,
	invoker?: AccountAddress.Type
) => {
	const schemaBuffer = toBuffer(SCHEMA, "base64");
	const result = await provider.invokeContract({
		contract,
		invoker,
		method: ReceiveName.create(CONTRACT_NAME, ENTRYPOINTS.agents),
	});

	const returnValue = result.returnValue
		? deserializeReceiveReturnValue(result.returnValue!.buffer, schemaBuffer, CONTRACT_NAME, ENTRYPOINTS.agents)
		: undefined;
	return {
		...result,
		returnValue,
	} as InvokeContractSuccessResult<AddressSchemaJson[]> | InvokeContractFailedResult<unknown>;
};

const toIdentitySchemaJson = (identity: Identity): IdentityRegistryIdentitySchemaJson => {
	return {
		attributes: identity.attributes.map((attribute) => {
			return [AttributesKeys[attribute.key], [...attribute.value]];
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
) => {
	const schemaBuffer = toBuffer(SCHEMA, "base64");
	const paramsJson = toAddressJson(identity);
	const parameter = serializeUpdateContractParameters(
		CONTRACT_NAME,
		ENTRYPOINTS.getIdentity,
		paramsJson as SmartContractParameters,
		schemaBuffer
	);
	const result = await provider.invokeContract({
		contract,
		parameter,
		invoker,
		method: ReceiveName.create(CONTRACT_NAME, ENTRYPOINTS.getIdentity),
	});

	switch (result.tag) {
		case "success": {
			const returnValue: Identity = fromIdentitySchemaJson(
				paramsJson,
				deserializeReceiveReturnValue(
					result.returnValue!.buffer,
					schemaBuffer,
					CONTRACT_NAME,
					ENTRYPOINTS.getIdentity
				) as IdentityRegistryIdentitySchemaJson
			);
			return {
				...result,
				returnValue,
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
) => {
	const schemaBuffer = toBuffer(SCHEMA, "base64");
	const paramsJson = toAddressJson(identity);
	const parameter = serializeUpdateContractParameters(
		CONTRACT_NAME,
		ENTRYPOINTS.isVerified,
		paramsJson as SmartContractParameters,
		schemaBuffer
	);
	const result = await provider.invokeContract({
		contract,
		parameter,
		invoker,
		method: ReceiveName.create(CONTRACT_NAME, ENTRYPOINTS.isVerified),
	});

	switch (result.tag) {
		case "success": {
			const returnValue: boolean = deserializeReceiveReturnValue(
				result.returnValue!.buffer,
				schemaBuffer,
				CONTRACT_NAME,
				ENTRYPOINTS.isVerified
			) as boolean;
			return {
				...result,
				returnValue,
			} as InvokeContractSuccessResult<boolean>;
		}
		case "failure": {
			return {
				...result,
				returnValue: errorString(result.reason as RejectedReceive),
			} as InvokeContractFailedResult<string>;
		}
	}
};

// This file should be kept in sync with contracts/identity-registry/src/error.rs
export enum IdentityRegistryRejectReasons {
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
		case IdentityRegistryRejectReasons.ParseError:
			return "Parse Error";
		case IdentityRegistryRejectReasons.LogError:
			return "Log Error";
		case IdentityRegistryRejectReasons.Unauthorized:
			return "Unauthorized";
		case IdentityRegistryRejectReasons.IdentityNotFound:
			return "Identity not found";
		case IdentityRegistryRejectReasons.IssuerNotFound:
			return "Issuer not found";
		case IdentityRegistryRejectReasons.IssuerAlreadyExists:
			return "Issuer already exists";
		case IdentityRegistryRejectReasons.AgentAlreadyExists:
			return "Agent already exists";
		case IdentityRegistryRejectReasons.AgentNotFound:
			return "Agent not found";
		case IdentityRegistryRejectReasons.InvalidIssuer:
			return "Invalid issuer";
		case IdentityRegistryRejectReasons.CallContractError:
			return "Call contract error";
		default:
			return `Unknown error: ${reason.rejectReason}`;
	}
};
