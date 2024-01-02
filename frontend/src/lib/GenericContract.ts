import {
	SchemaSource,
	SendTransactionInitContractPayload,
	SendTransactionUpdateContractPayload,
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
	InvokeContractFailedResult,
	ModuleReference,
	ReceiveName,
	deserializeTypeValue,
	serializeTypeValue,
} from "@concordium/web-sdk";
import { InvokeContractSuccessResult } from "./common/types";
export const CONTRACT_NAME: ContractName.Type = ContractName.fromString(
	import.meta.env.VITE_NFT_CONTRACT_NAME as string
);

export class InitMethod<TIn> {
	constructor(
		public moduleRef: ModuleReference.Type,
		public contractName: ContractName.Type,
		public paramsSchemaBase64?: string,
		public maxExecutionEnergy: Energy.Type = Energy.create(30000)
	) {}

	async init(
		provider: WalletApi,
		account: AccountAddress.Type,
		params?: TIn,
		amount: CcdAmount.Type = CcdAmount.fromCcd(0)
	) {
		const schema: SchemaSource | undefined = this.paramsSchemaBase64
			? {
					type: "parameter",
					value: this.paramsSchemaBase64,
				}
			: undefined;

		return provider.sendTransaction(
			account,
			AccountTransactionType.InitContract,
			{
				amount,
				moduleRef: this.moduleRef,
				initName: this.contractName,
				maxContractExecutionEnergy: this.maxExecutionEnergy,
			} as SendTransactionInitContractPayload,
			params as SmartContractParameters,
			schema
		);
	}
}

export class ReceiveMethod<TIn, TOut = never> {
	constructor(
		public contractName: ContractName.Type,
		public entrypoint: EntrypointName.Type,
		public paramsSchemaBase64?: string,
		public outSchemaBase64?: string,
		public maxExecutionEnergy: Energy.Type = Energy.create(30000)
	) {}
	async update(
		provider: WalletApi,
		account: AccountAddress.Type,
		address: ContractAddress.Type,
		params: TIn,
		amount: CcdAmount.Type = CcdAmount.fromCcd(0)
	) {
		const schema: SchemaSource | undefined = this.paramsSchemaBase64
			? {
					type: "parameter",
					value: this.paramsSchemaBase64,
				}
			: undefined;

		return provider.sendTransaction(
			account,
			AccountTransactionType.Update,
			{
				amount,
				contractName: this.contractName,
				address,
				maxContractExecutionEnergy: this.maxExecutionEnergy,
				receiveName: ReceiveName.create(this.contractName, this.entrypoint),
			} as SendTransactionUpdateContractPayload,
			params as SmartContractParameters,
			schema
		);
	}

	async invoke(
		provider: ConcordiumGRPCClient,
		contract: ContractAddress.Type,
		params?: TIn,
		invoker?: AccountAddress.Type
	): Promise<InvokeContractSuccessResult<TOut> | InvokeContractFailedResult> {
		const parameter = params && serializeTypeValue(params, Buffer.from(this.paramsSchemaBase64!, "base64"));

		const result = await provider.invokeContract({
			contract,
			parameter: parameter ? parameter : undefined,
			invoker,
			method: ReceiveName.create(CONTRACT_NAME, this.entrypoint),
		});

		switch (result.tag) {
			case "success":
				return {
					...result,
					returnValue: result.returnValue
						? (deserializeTypeValue(result.returnValue.buffer, Buffer.from(this.outSchemaBase64!, "base64")) as TOut)
						: undefined,
				} as InvokeContractSuccessResult<TOut>;
			case "failure":
				return result;
		}
	}
}
