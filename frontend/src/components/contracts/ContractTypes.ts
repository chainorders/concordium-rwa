import { ContractAddress } from "@concordium/web-sdk";
import { CONTRACT_NAME as rwaSecurityNftContractName } from "../../lib/rwaSecurityNft";
import { CONTRACT_NAME as rwaComplianceContractName } from "../../lib/rwaCompliance";
import { CONTRACT_NAME as rwaComplianceModuleContractName } from "../../lib/rwaComplianceModuleAllowedNationalities";
import { CONTRACT_NAME as rwaIdentityRegistryContractName } from "../../lib/rwaIdentityRegistry";
import { CONTRACT_NAME as rwaSponsorContractName } from "../../lib/rwaSponsor";

export const enum ContractType {
	RwaIdentityRegistry = rwaIdentityRegistryContractName,
	RwaCompliance = rwaComplianceContractName,
	RwaComplianceModule = rwaComplianceModuleContractName,
	RwaSecurityNft = rwaSecurityNftContractName,
	RwaSponsor = rwaSponsorContractName,
}

export interface Contract {
	name: string;
	address: ContractAddress.Type;
	type: ContractType;
}
