import {
	AccountAddress,
	AccountTransactionType,
	Address,
	CcdAmount,
	ConcordiumGRPCClient,
	ContractAddress,
	ContractEvent,
	ContractName,
	Energy,
	EntrypointName,
	HexString,
	ModuleReference,
	Parameter,
	ReceiveName,
	RejectedInit,
	RejectedReceive,
	TransactionEventTag,
	UpdateContractSummary,
	deserializeReceiveReturnValue,
	serializeUpdateContractParameters,
	toBuffer,
} from "@concordium/web-sdk";
import { AGENT_CONTRACT_ENTRYPOINTS, AGENT_CONTRACT_ENTRYPOINTS_DISPLAY_NAMES } from "./common/AgentContract";
import {
	SendTransactionInitContractPayload,
	SendTransactionUpdateContractPayload,
	SmartContractParameters,
	WalletApi,
} from "@concordium/browser-wallet-api-helpers";
import {
	InvokeContractFailedResult,
	InvokeContractResult,
	InvokeContractSuccessResult,
	TokenId,
	fromAddressJson,
	toAddressJson,
	toContractAddressJson,
} from "./common/types";
import {
	AddressSchemaJson,
	ReceiverSchemaJson,
	SecurityNftBalanceOfParamSchemaJson,
	SecurityNftBurnParamSchemaJson,
	SecurityNftEventBase64Schema,
	SecurityNftEventSchemaJson,
	SecurityNftInitParamsSchemaJson,
	SecurityNftMintParamsSchemaJson,
	SecurityNftPauseParamsSchemaJson,
	SecurityNftTransferParamSchemaJson,
} from "./ts-types";

const MODULE_REF: ModuleReference.Type = ModuleReference.fromHexString(import.meta.env.VITE_NFT_MODULE_REF);
export const CONTRACT_NAME: ContractName.Type = ContractName.fromString(
	import.meta.env.VITE_NFT_CONTRACT_NAME as string
);
const EXECUTION_ENERGY: Energy.Type = Energy.create(parseInt(import.meta.env.VITE_NFT_ENERGY as string));
const SCHEMA: string = import.meta.env.VITE_NFT_SCHEMA as string;
const SCHEMA_BUFFER = toBuffer(SCHEMA, "base64");

export const ENTRYPOINTS: Record<string, EntrypointName.Type> = {
	// agent functions
	...AGENT_CONTRACT_ENTRYPOINTS,
	//cis2 functions
	transfer: EntrypointName.fromString("transfer"),
	balanceOf: EntrypointName.fromString("balanceOf"),
	updateOperator: EntrypointName.fromString("updateOperator"),
	operatorOf: EntrypointName.fromString("operatorOf"),
	tokenMetadata: EntrypointName.fromString("tokenMetadata"),
	supports: EntrypointName.fromString("supports"),
	//cis2 extension functions
	mint: EntrypointName.fromString("mint"),
	burn: EntrypointName.fromString("burn"),
	//security functions
	identityRegistry: EntrypointName.fromString("identityRegistry"),
	compliance: EntrypointName.fromString("compliance"),
	forcedTransfer: EntrypointName.fromString("forcedTransfer"),
	freeze: EntrypointName.fromString("freeze"),
	unfreeze: EntrypointName.fromString("unfreeze"),
	balanceOfFrozen: EntrypointName.fromString("balanceOfFrozen"),
	balanceOfUnfrozen: EntrypointName.fromString("balanceOfUnfrozen"),
	pause: EntrypointName.fromString("pause"),
	unPause: EntrypointName.fromString("unPause"),
	isPaused: EntrypointName.fromString("isPaused"),
	recover: EntrypointName.fromString("recover"),
	recoveryAddress: EntrypointName.fromString("recoveryAddress"),
};
export const ENTRYPOINT_NAMES: Record<keyof typeof ENTRYPOINTS, string> = {
	...AGENT_CONTRACT_ENTRYPOINTS_DISPLAY_NAMES,
	transfer: "Transfer",
	balanceOf: "Balance Of",
	updateOperator: "Update Operator",
	operatorOf: "Operator Of",
	tokenMetadata: "Token Metadata",
	supports: "Supports",
	mint: "Mint",
	burn: "Burn",
	identityRegistry: "Identity Registry",
	compliance: "Compliance",
	forcedTransfer: "Forced Transfer",
	freeze: "Freeze",
	unfreeze: "Unfreeze",
	balanceOfFrozen: "Balance Of Frozen",
	balanceOfUnfrozen: "Balance Of Unfrozen",
	pause: "Pause",
	unPause: "Un Pause",
	isPaused: "Is Paused",
	recover: "Recover",
	recoveryAddress: "Recovery Address",
};

// This should be kept in sync with contracts/security-nft/src/error.rs
export enum Error {
	InvalidTokenId = -42000001,
	InsufficientFunds = -42000002,
	Unauthorized = -42000003,
	ParseError = -1,
	LogError = -2,
	UnVerifiedIdentity = -3,
	InCompliantTransfer = -4,
	ComplianceError = -5,
	CallContractError = -6,
	PausedToken = -7,
	InvalidAmount = -8,
	InvalidAddress = -9,
	AgentAlreadyExists = -10,
	AgentNotFound = -11,
}

export const initialize = async (
	provider: WalletApi,
	account: AccountAddress.Type,
	params: { identityRegistry: ContractAddress.Type; compliance: ContractAddress.Type; sponsors: ContractAddress.Type[] }
) => {
	return provider.sendTransaction(
		account,
		AccountTransactionType.InitContract,
		{
			amount: CcdAmount.fromCcd(0),
			moduleRef: MODULE_REF,
			initName: CONTRACT_NAME,
			maxContractExecutionEnergy: EXECUTION_ENERGY,
		} as SendTransactionInitContractPayload,
		{
			identity_registry: toContractAddressJson(params.identityRegistry),
			compliance: toContractAddressJson(params.compliance),
			sponsors: params.sponsors.map(toContractAddressJson),
		} as SecurityNftInitParamsSchemaJson,
		SCHEMA
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

export interface MetadataUrl {
	url: string;
	hash?: HexString;
}
export type ReceiverAddress = {
	type: "AddressContract";
	address: ContractAddress.Type;
	entrypoint: EntrypointName.Type;
};
export type Receiver = { type: "AddressAccount"; address: AccountAddress.Type } | ReceiverAddress;

export const toReceiverJson = (receiver: Receiver): ReceiverSchemaJson => {
	switch (receiver.type) {
		case "AddressAccount":
			return { Account: [receiver.address.address] };
		case "AddressContract":
			return { Contract: [toContractAddressJson(receiver.address), receiver.entrypoint.value] };
	}
};
export function toOptionJson<T>(value: T | undefined): { None: Record<string, never> } | { Some: [T] } {
	if (value === undefined || value === null || value === "") {
		return { None: {} };
	}
	return { Some: [value] };
}

export const mint = async (
	provider: WalletApi,
	account: AccountAddress.Type,
	contractAddress: ContractAddress.Type,
	params: {
		owner: Receiver;
		tokens: {
			metadataUrl: MetadataUrl;
		}[];
	}
) => {
	const json: SecurityNftMintParamsSchemaJson = {
		owner: toReceiverJson(params.owner),
		tokens: params.tokens.map((token) => ({
			metadata_url: {
				url: token.metadataUrl.url,
				hash: toOptionJson(token.metadataUrl.hash),
			},
		})),
	};
	return provider.sendTransaction(
		account,
		AccountTransactionType.Update,
		{
			amount: CcdAmount.fromCcd(0),
			contractName: CONTRACT_NAME,
			address: contractAddress,
			maxContractExecutionEnergy: EXECUTION_ENERGY,
			receiveName: ReceiveName.create(CONTRACT_NAME, ENTRYPOINTS.mint),
		} as SendTransactionUpdateContractPayload,
		json,
		SCHEMA
	);
};

export const transfer = async (
	provider: WalletApi,
	account: AccountAddress.Type,
	contractAddress: ContractAddress.Type,
	params: {
		to: Receiver;
		tokenId: TokenId;
		amount: string;
		from: Address;
	}
) => {
	const json = {
		amount: params.amount.toString(),
		from: toAddressJson(params.from),
		to: toReceiverJson(params.to),
		data: "",
		token_id: params.tokenId,
	} as SecurityNftTransferParamSchemaJson;

	return provider.sendTransaction(
		account,
		AccountTransactionType.Update,
		{
			amount: CcdAmount.fromCcd(0),
			contractName: CONTRACT_NAME,
			address: contractAddress,
			maxContractExecutionEnergy: EXECUTION_ENERGY,
			receiveName: ReceiveName.create(CONTRACT_NAME, ENTRYPOINTS.transfer),
		} as SendTransactionUpdateContractPayload,
		[json],
		SCHEMA
	);
};

export const burn = async (
	provider: WalletApi,
	account: AccountAddress.Type,
	contractAddress: ContractAddress.Type,
	params: {
		tokenId: TokenId;
		amount: string;
		owner: Address;
	}
) => {
	const json = {
		amount: params.amount.toString(),
		owner: toAddressJson(params.owner),
		token_id: params.tokenId,
	} as SecurityNftBurnParamSchemaJson;

	return provider.sendTransaction(
		account,
		AccountTransactionType.Update,
		{
			amount: CcdAmount.fromCcd(0),
			contractName: CONTRACT_NAME,
			address: contractAddress,
			maxContractExecutionEnergy: EXECUTION_ENERGY,
			receiveName: ReceiveName.create(CONTRACT_NAME, ENTRYPOINTS.burn),
		} as SendTransactionUpdateContractPayload,
		[json],
		SCHEMA
	);
};

export const balanceOf = async (
	provider: ConcordiumGRPCClient,
	contract: ContractAddress.Type,
	params: {
		tokenId: TokenId;
		address: Address;
	},
	invoker?: AccountAddress.Type
): Promise<InvokeContractResult<string, string>> => {
	const json = {
		address: toAddressJson(params.address),
		token_id: params.tokenId,
	} as SecurityNftBalanceOfParamSchemaJson;
	const res = await invoke<string>(provider, contract, ENTRYPOINTS.balanceOf, [json], invoker);

	switch (res.tag) {
		case "success": {
			return {
				...res,
				returnValue: res.returnValue,
			} as InvokeContractSuccessResult<string>;
		}
		case "failure": {
			return {
				...res,
				returnValue: errorString(res.reason as RejectedReceive),
			} as InvokeContractFailedResult<string>;
		}
	}
};

export const pause = async (
	provider: WalletApi,
	account: AccountAddress.Type,
	contractAddress: ContractAddress.Type,
	params: TokenId
) => {
	const json = { tokens: [params] } as SecurityNftPauseParamsSchemaJson;
	return provider.sendTransaction(
		account,
		AccountTransactionType.Update,
		{
			amount: CcdAmount.fromCcd(0),
			contractName: CONTRACT_NAME,
			address: contractAddress,
			maxContractExecutionEnergy: EXECUTION_ENERGY,
			receiveName: ReceiveName.create(CONTRACT_NAME, ENTRYPOINTS.pause),
		} as SendTransactionUpdateContractPayload,
		json,
		SCHEMA
	);
};

export const unPause = async (
	provider: WalletApi,
	account: AccountAddress.Type,
	contractAddress: ContractAddress.Type,
	params: TokenId
) => {
	const json = { tokens: [params] } as SecurityNftPauseParamsSchemaJson;
	return provider.sendTransaction(
		account,
		AccountTransactionType.Update,
		{
			amount: CcdAmount.fromCcd(0),
			contractName: CONTRACT_NAME,
			address: contractAddress,
			maxContractExecutionEnergy: EXECUTION_ENERGY,
			receiveName: ReceiveName.create(CONTRACT_NAME, ENTRYPOINTS.unPause),
		} as SendTransactionUpdateContractPayload,
		json,
		SCHEMA
	);
};

export const isPaused = async (
	provider: ConcordiumGRPCClient,
	contract: ContractAddress.Type,
	params: TokenId,
	invoker?: AccountAddress.Type
): Promise<InvokeContractResult<boolean, string>> => {
	const json = { tokens: [params] } as SecurityNftPauseParamsSchemaJson;
	const res = await invoke<boolean>(provider, contract, ENTRYPOINTS.isPaused, json, invoker);

	switch (res.tag) {
		case "success": {
			return {
				...res,
				returnValue: res.returnValue,
			} as InvokeContractSuccessResult<boolean>;
		}
		case "failure": {
			return {
				...res,
				returnValue: errorString(res.reason as RejectedReceive),
			} as InvokeContractFailedResult<string>;
		}
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

export const errorString = (reason: RejectedInit | RejectedReceive): string => {
	switch (reason.rejectReason) {
		case Error.InvalidTokenId:
			return "Invalid Token Id";
		case Error.InsufficientFunds:
			return "Insufficient Funds";
		case Error.Unauthorized:
			return "Unauthorized";
		case Error.ParseError:
			return "Parse Error";
		case Error.LogError:
			return "Log Error";
		case Error.UnVerifiedIdentity:
			return "Unverified Identity";
		case Error.InCompliantTransfer:
			return "Incompliant Transfer";
		case Error.ComplianceError:
			return "Compliance Error";
		case Error.CallContractError:
			return "Call Contract Error";
		case Error.PausedToken:
			return "Paused Token";
		case Error.InvalidAmount:
			return "Invalid Amount";
		case Error.InvalidAddress:
			return "Invalid Address";
		case Error.AgentAlreadyExists:
			return "Agent Already Exists";
		case Error.AgentNotFound:
			return "Agent Not Found";
		default:
			return `Unknown error: ${reason.rejectReason}`;
	}
};

export const parseEventsFromSummary = (summary: UpdateContractSummary) => {
	let ret: SecurityNftEventSchemaJson[] = [];
	for (const event of summary.events) {
		switch (event.tag) {
			case TransactionEventTag.Updated: {
				const parsedEvents = event.events.map(
					(event) =>
						ContractEvent.parseWithSchemaTypeBase64(event, SecurityNftEventBase64Schema) as SecurityNftEventSchemaJson
				);
				ret = ret.concat(parsedEvents);
				break;
			}
			default:
				continue;
		}
	}

	return ret;
};
