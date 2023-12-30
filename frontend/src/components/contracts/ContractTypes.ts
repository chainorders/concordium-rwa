export const enum ContractType {
	IdentityRegistry = "IdentityRegistry",
	Compliance = "Compliance",
	Nft = "Nft",
	Sft = "Sft",
	Sponsor = "Sponsor",
}

export interface Contract {
	name: string;
	index: string;
	subIndex: string;
	type: ContractType;
}

export interface IdentityRegistryContract extends Contract {
	// Agent Account Addresses
	agents: string[];
	// Issuer Contract Addresses
	issuers: string[];
	type: ContractType.IdentityRegistry;
}

export const DefaultIdentityRegistryContract: IdentityRegistryContract = {
	name: "Identity Registry",
	index: "0",
	subIndex: "0",
	type: ContractType.IdentityRegistry,
	agents: [],
	issuers: [],
};

export interface ContractAction {
	displayName: string;
	methodName: string;
}

export const ContractTypeActions: Record<ContractType, ContractAction[]> = {
	[ContractType.IdentityRegistry]: [
		{
			displayName: "Add Agent",
			methodName: "addAgent",
		},
		{
			displayName: "Remove Agent",
			methodName: "removeAgent",
		},
		{
			displayName: "Is Agent",
			methodName: "isAgent",
		},
		{
			displayName: "Agents",
			methodName: "agents",
		},
		{
			displayName: "List Identities",
			methodName: "listIdentities",
		},
		{
			displayName: "Register Identities",
			methodName: "registerIdentities",
		},
		{
			displayName: "Update Identities",
			methodName: "updateIdentities",
		},
		{
			displayName: "Delete Identities",
			methodName: "deleteIdentities",
		},
		{
			displayName: "Has Identity",
			methodName: "hasIdentity",
		},
		{
			displayName: "Get Identity",
			methodName: "getIdentity",
		},
		{
			displayName: "Is Verified",
			methodName: "isVerified",
		},
		{
			displayName: "Is Issuer",
			methodName: "isIssuer",
		},
		{
			displayName: "Issuers",
			methodName: "issuers",
		},
		{
			displayName: "Add Issuer",
			methodName: "addIssuer",
		},
		{
			displayName: "Remove Issuer",
			methodName: "removeIssuer",
		},
	],
	[ContractType.Compliance]: [],
	[ContractType.Nft]: [],
	[ContractType.Sft]: [],
	[ContractType.Sponsor]: [],
};
