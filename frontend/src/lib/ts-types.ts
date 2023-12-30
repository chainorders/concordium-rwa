export type IdentityRegistryIdentitiesSchemaJson = {
	attributes: [number, number[]][];
	credentials: [{ index: number; subindex: number }, string][];
}[];
export type IdentityRegistryErrorSchemaJson =
	| { ParseError: Record<string, never> }
	| { LogError: Record<string, never> }
	| { Unauthorized: Record<string, never> }
	| { IdentityNotFound: Record<string, never> }
	| { IssuerNotFound: Record<string, never> }
	| { IssuerAlreadyExists: Record<string, never> }
	| { AgentAlreadyExists: Record<string, never> }
	| { AgentNotFound: Record<string, never> }
	| { InvalidIssuer: Record<string, never> }
	| { CallContractError: Record<string, never> };
export type ContractAddressSchemaJson = { index: number; subindex: number };
export type AddressSchemaJson = { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
export type IdentityRegistryIdentitySchemaJson = {
	attributes: [number, number[]][];
	credentials: [{ index: number; subindex: number }, string][];
};
export type IdentityRegistryRegisterIdentitiesParamsSchemaJson = {
	identities: {
		identity: { attributes: [number, number[]][]; credentials: [{ index: number; subindex: number }, string][] };
		address: { Account: [string] } | { Contract: [{ index: number; subindex: number }] };
	}[];
};
export type IdentityRegistryDeleteIdentitiesParamsSchemaJson = {
	addresses: { Account: [string] } | { Contract: [{ index: number; subindex: number }] }[];
};
