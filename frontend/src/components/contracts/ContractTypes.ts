import { ContractAddress } from "@concordium/web-sdk";

export const enum ContractType {
	IdentityRegistry = "IdentityRegistry",
	Compliance = "Compliance",
	ComplianceModule = "ComplianceModule",
	Nft = "Nft",
	Sft = "Sft",
	Sponsor = "Sponsor",
}

export interface Contract {
	name: string;
	address: ContractAddress.Type;
	type: ContractType;
}
