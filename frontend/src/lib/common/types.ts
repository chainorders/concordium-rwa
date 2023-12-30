import {
	AccountAddress,
	Address,
	ContractAddress,
	ContractTraceEvent,
	Energy,
	RejectReason,
} from "@concordium/web-sdk";
import { AddressSchemaJson, ContractAddressSchemaJson } from "../ts-types";

export type Agent = Address;
export const fromAddressJson = (json: AddressSchemaJson): Address => {
	if ("Account" in json) {
		return {
			type: "AddressAccount",
			address: AccountAddress.fromSchemaValue(json.Account[0]),
		};
	} else if ("Contract" in json) {
		return {
			type: "AddressContract",
			address: ContractAddress.fromSchemaValue({
				index: BigInt(json.Contract[0].index),
				subindex: BigInt(json.Contract[0].subindex),
			}),
		};
	} else {
		throw new Error("Invalid address");
	}
};
export const toAddressJson = (agent: Address) => {
	let params: AddressSchemaJson;
	switch (agent.type) {
		case "AddressAccount": {
			params = { Account: [agent.address.address] };
			break;
		}
		case "AddressContract": {
			params = {
				Contract: [toContractAddressJson(agent.address)],
			};
			break;
		}
	}
	return params;
};
export const toContractAddressJson = (contractAddress: ContractAddress.Type) => {
	return {
		index: Number(contractAddress.index.toString()),
		subindex: Number(contractAddress.subindex.toString()),
	};
};
export const fromContractAddressJson = (json: ContractAddressSchemaJson): ContractAddress.Type => {
	return ContractAddress.fromSchemaValue({
		index: BigInt(json.index),
		subindex: BigInt(json.subindex),
	});
};

export interface InvokeContractSuccessResult<P> {
	tag: "success";
	usedEnergy: Energy.Type;
	events: ContractTraceEvent[];
	returnValue: P;
}

export interface InvokeContractFailedResult<P> {
	tag: "failure";
	usedEnergy: Energy.Type;
	reason: RejectReason;
	/**
	 * Return value from smart contract call, used to provide error messages.
	 * Is only defined when smart contract instance is a V1 smart contract and
	 * the transaction was rejected by the smart contract logic i.e. `reason.tag === "RejectedReceive"`.
	 */
	returnValue: P;
}
