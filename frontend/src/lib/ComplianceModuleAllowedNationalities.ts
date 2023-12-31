import {
	SendTransactionInitContractPayload,
	SmartContractParameters,
	WalletApi,
} from "@concordium/browser-wallet-api-helpers";
import {
	AccountAddress,
	AccountTransactionType,
	CcdAmount,
	ConcordiumGRPCClient,
	ContractAddress,
	ContractName,
	Energy,
	EntrypointName,
	ModuleReference,
	Parameter,
	ReceiveName,
	RejectedReceive,
	deserializeReceiveReturnValue,
	serializeUpdateContractParameters,
	toBuffer,
} from "@concordium/web-sdk";
import { ComplianceModuleAllowedNationalitiesInitParamsSchemaJson } from "./ts-types";
import {
	AttributeValue,
	ComplianceModule,
	InvokeContractFailedResult,
	InvokeContractResult,
	InvokeContractSuccessResult,
	toAttributeValueJson,
	toContractAddressJson,
} from "./common/types";
import { CanTransferParams, errorString, toCanTransferParamsJson } from "./Compliance";

const MODULE_REF: ModuleReference.Type = ModuleReference.fromHexString(import.meta.env.VITE_COMPLIANCE_MODULE_REF);
const CONTRACT_NAME: ContractName.Type = ContractName.fromString(
	import.meta.env.VITE_COMPLIANCE_MODULE_ALLOWED_NATIONALITIES_CONTRACT_NAME as string
);
const EXECUTION_ENERGY: Energy.Type = Energy.create(parseInt(import.meta.env.VITE_COMPLIANCE_ENERGY as string));
const SCHEMA: string = import.meta.env.VITE_COMPLIANCE_SCHEMA as string;
const SCHEMA_BUFFER = toBuffer(SCHEMA, "base64");

export const ENTRYPOINTS: Record<string, EntrypointName.Type> = {
	canTransfer: EntrypointName.fromString("canTransfer"),
};
export const ENTRYPOINT_NAMES: Record<string, string> = {
	canTransfer: "Can Transfer",
};

export const initialize = async (
	provider: WalletApi,
	account: AccountAddress.Type,
	params: { identityRegistry: ContractAddress.Type; nationalities: AttributeValue[] }
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
			nationalities: params.nationalities.map((n) => toAttributeValueJson(n)),
		} as ComplianceModuleAllowedNationalitiesInitParamsSchemaJson,
		SCHEMA
	);
};

export const canTransfer = async (
	provider: ConcordiumGRPCClient,
	contract: ComplianceModule,
	params: CanTransferParams,
	invoker?: AccountAddress.Type
) => {
	return invoke<boolean>(provider, contract, ENTRYPOINTS.canTransfer, toCanTransferParamsJson(params), invoker);
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
