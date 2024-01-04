import {
	AccountAddress,
	AccountTransactionType,
	Address,
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
import { AGENT_CONTRACT_ENTRYPOINTS, AGENT_CONTRACT_ENTRYPOINTS_DISPLAY_NAMES } from "./common/AgentContract";
import {
	InvokeContractFailedResult,
	InvokeContractResult,
	InvokeContractSuccessResult,
	TokenAmount,
	TokenId,
	fromAddressJson,
	fromContractAddressJson,
	toAddressJson,
	toContractAddressJson,
} from "./common/types";
import {
	SendTransactionInitContractPayload,
	SendTransactionUpdateContractPayload,
	SmartContractParameters,
	WalletApi,
} from "@concordium/browser-wallet-api-helpers";
import {
	AddressSchemaJson,
	ComplianceCanTransferParamsSchemaJson,
	ComplianceInitParamsSchemaJson,
	ContractAddressSchemaJson,
} from "./ts-types";

const MODULE_REF: ModuleReference.Type = ModuleReference.fromHexString(import.meta.env.VITE_COMPLIANCE_MODULE_REF);
const CONTRACT_NAME: ContractName.Type = ContractName.fromString(
	import.meta.env.VITE_COMPLIANCE_CONTRACT_NAME as string
);
const EXECUTION_ENERGY: Energy.Type = Energy.create(parseInt(import.meta.env.VITE_COMPLIANCE_ENERGY as string));
const SCHEMA: string = import.meta.env.VITE_COMPLIANCE_SCHEMA as string;
const SCHEMA_BUFFER = toBuffer(SCHEMA, "base64");

export const ENTRYPOINTS: Record<string, EntrypointName.Type> = {
	...AGENT_CONTRACT_ENTRYPOINTS,
	canTransfer: EntrypointName.fromString("canTransfer"),
	addModule: EntrypointName.fromString("addModule"),
	removeModule: EntrypointName.fromString("removeModule"),
	modules: EntrypointName.fromString("modules"),
};
export const ENTRYPOINT_NAMES: Record<string, string> = {
	...AGENT_CONTRACT_ENTRYPOINTS_DISPLAY_NAMES,
	canTransfer: "Can Transfer",
	addModule: "Add Module",
	removeModule: "Remove Module",
	modules: "List Modules",
};

export enum Error {
	ParseError = -1,
	LogError = -2,
	InvalidModule = -3,
	CallContractError = -4,
	Unauthorized = -5,
	AgentAlreadyExists = -6,
	AgentNotFound = -7,
}

export const errorString = (reason: RejectedInit | RejectedReceive): string => {
	switch (reason.rejectReason) {
		case Error.ParseError:
			return "Parse Error";
		case Error.LogError:
			return "Log Error";
		case Error.InvalidModule:
			return "Invalid Module";
		case Error.CallContractError:
			return "Call Contract Error";
		case Error.Unauthorized:
			return "Unauthorized";
		case Error.AgentAlreadyExists:
			return "Agent Already Exists";
		case Error.AgentNotFound:
			return "Agent Not Found";
		default:
			return `Unknown error: ${reason.rejectReason}`;
	}
};

export const initialize = async (
	provider: WalletApi,
	account: AccountAddress.Type,
	params: { modules: ContractAddress.Type[] }
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
			modules: params.modules.map((module) => toContractAddressJson(module)),
		} as ComplianceInitParamsSchemaJson,
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

export interface CanTransferParams {
	token: { tokenId: TokenId; contract: ContractAddress.Type };
	to: Address;
	amount: TokenAmount;
}

export function toCanTransferParamsJson(params: CanTransferParams): ComplianceCanTransferParamsSchemaJson {
	return {
		token_id: {
			token_id: params.token.tokenId,
			contract: toContractAddressJson(params.token.contract),
		},
		to: toAddressJson(params.to),
		amount: params.amount,
	};
}

export const canTransfer = async (
	provider: ConcordiumGRPCClient,
	contract: ContractAddress.Type,
	params: CanTransferParams,
	invoker?: AccountAddress.Type
) => {
	return invoke<boolean>(provider, contract, ENTRYPOINTS.canTransfer, toCanTransferParamsJson(params), invoker);
};

export const addModule = async (
	provider: WalletApi,
	account: AccountAddress.Type,
	contractAddress: ContractAddress.Type,
	module: ContractAddress.Type
) => {
	return provider.sendTransaction(
		account,
		AccountTransactionType.Update,
		{
			amount: CcdAmount.fromCcd(0),
			contractName: CONTRACT_NAME,
			address: contractAddress,
			maxContractExecutionEnergy: EXECUTION_ENERGY,
			receiveName: ReceiveName.create(CONTRACT_NAME, ENTRYPOINTS.addModule),
		} as SendTransactionUpdateContractPayload,
		toContractAddressJson(module) as SmartContractParameters,
		SCHEMA
	);
};

export const removeModule = async (
	provider: WalletApi,
	account: AccountAddress.Type,
	contractAddress: ContractAddress.Type,
	module: ContractAddress.Type
) => {
	return provider.sendTransaction(
		account,
		AccountTransactionType.Update,
		{
			amount: CcdAmount.fromCcd(0),
			contractName: CONTRACT_NAME,
			address: contractAddress,
			maxContractExecutionEnergy: EXECUTION_ENERGY,
			receiveName: ReceiveName.create(CONTRACT_NAME, ENTRYPOINTS.removeModule),
		} as SendTransactionUpdateContractPayload,
		toContractAddressJson(module) as SmartContractParameters,
		SCHEMA
	);
};

export const getModules = async (
	provider: ConcordiumGRPCClient,
	contract: ContractAddress.Type,
	invoker?: AccountAddress.Type
): Promise<InvokeContractResult<ContractAddress.Type[], string>> => {
	const res = await invoke<ContractAddressSchemaJson[]>(provider, contract, ENTRYPOINTS.modules, undefined, invoker);

	switch (res.tag) {
		case "success": {
			return {
				...res,
				returnValue: res.returnValue.map((address) => fromContractAddressJson(address)),
			} as InvokeContractSuccessResult<ContractAddress.Type[]>;
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
