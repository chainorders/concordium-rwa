import {
	ContractEvent,
	ContractName,
	EntrypointName,
	ModuleReference,
} from "@concordium/web-sdk";
import { InitMethod, ReceiveMethod } from "./GenericContract";
export const CONTRACT_NAME = "rwa_identity_registry";
export const initErrorSchemaBase64 =
	"FQoAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDAAAAFVuYXV0aG9yaXplZAIQAAAASWRlbnRpdHlOb3RGb3VuZAIOAAAASXNzdWVyTm90Rm91bmQCEwAAAElzc3VlckFscmVhZHlFeGlzdHMCEgAAAEFnZW50QWxyZWFkeUV4aXN0cwINAAAAQWdlbnROb3RGb3VuZAINAAAASW52YWxpZElzc3VlcgIRAAAAQ2FsbENvbnRyYWN0RXJyb3IC";
export type AddAgentError =
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
export const addAgentErrorSchemaBase64 =
	"FQoAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDAAAAFVuYXV0aG9yaXplZAIQAAAASWRlbnRpdHlOb3RGb3VuZAIOAAAASXNzdWVyTm90Rm91bmQCEwAAAElzc3VlckFscmVhZHlFeGlzdHMCEgAAAEFnZW50QWxyZWFkeUV4aXN0cwINAAAAQWdlbnROb3RGb3VuZAINAAAASW52YWxpZElzc3VlcgIRAAAAQ2FsbENvbnRyYWN0RXJyb3IC";
export type AddAgentRequest =
	| { Account: [string] }
	| { Contract: [{ index: number; subindex: number }] };
export const addAgentRequestSchemaBase64 =
	"FQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type AddIssuerError =
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
export const addIssuerErrorSchemaBase64 =
	"FQoAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDAAAAFVuYXV0aG9yaXplZAIQAAAASWRlbnRpdHlOb3RGb3VuZAIOAAAASXNzdWVyTm90Rm91bmQCEwAAAElzc3VlckFscmVhZHlFeGlzdHMCEgAAAEFnZW50QWxyZWFkeUV4aXN0cwINAAAAQWdlbnROb3RGb3VuZAINAAAASW52YWxpZElzc3VlcgIRAAAAQ2FsbENvbnRyYWN0RXJyb3IC";
export type AddIssuerRequest = { index: number; subindex: number };
export const addIssuerRequestSchemaBase64 = "DA==";
export type AgentsError =
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
export const agentsErrorSchemaBase64 =
	"FQoAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDAAAAFVuYXV0aG9yaXplZAIQAAAASWRlbnRpdHlOb3RGb3VuZAIOAAAASXNzdWVyTm90Rm91bmQCEwAAAElzc3VlckFscmVhZHlFeGlzdHMCEgAAAEFnZW50QWxyZWFkeUV4aXN0cwINAAAAQWdlbnROb3RGb3VuZAINAAAASW52YWxpZElzc3VlcgIRAAAAQ2FsbENvbnRyYWN0RXJyb3IC";
export type AgentsResponse = Array<
	{ Account: [string] } | { Contract: [{ index: number; subindex: number }] }
>;
export const agentsResponseSchemaBase64 =
	"EAIVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAM";
export type DeleteIdentityError =
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
export const deleteIdentityErrorSchemaBase64 =
	"FQoAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDAAAAFVuYXV0aG9yaXplZAIQAAAASWRlbnRpdHlOb3RGb3VuZAIOAAAASXNzdWVyTm90Rm91bmQCEwAAAElzc3VlckFscmVhZHlFeGlzdHMCEgAAAEFnZW50QWxyZWFkeUV4aXN0cwINAAAAQWdlbnROb3RGb3VuZAINAAAASW52YWxpZElzc3VlcgIRAAAAQ2FsbENvbnRyYWN0RXJyb3IC";
export type DeleteIdentityRequest =
	| { Account: [string] }
	| { Contract: [{ index: number; subindex: number }] };
export const deleteIdentityRequestSchemaBase64 =
	"FQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type GetIdentityError =
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
export const getIdentityErrorSchemaBase64 =
	"FQoAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDAAAAFVuYXV0aG9yaXplZAIQAAAASWRlbnRpdHlOb3RGb3VuZAIOAAAASXNzdWVyTm90Rm91bmQCEwAAAElzc3VlckFscmVhZHlFeGlzdHMCEgAAAEFnZW50QWxyZWFkeUV4aXN0cwINAAAAQWdlbnROb3RGb3VuZAINAAAASW52YWxpZElzc3VlcgIRAAAAQ2FsbENvbnRyYWN0RXJyb3IC";
export type GetIdentityRequest =
	| { Account: [string] }
	| { Contract: [{ index: number; subindex: number }] };
export const getIdentityRequestSchemaBase64 =
	"FQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type GetIdentityResponse = {
	attributes: Array<{ tag: number; value: string }>;
	credentials: Array<{
		issuer: { index: number; subindex: number };
		key: string;
	}>;
};
export const getIdentityResponseSchemaBase64 =
	"FAACAAAACgAAAGF0dHJpYnV0ZXMQAhQAAgAAAAMAAAB0YWcCBQAAAHZhbHVlFgILAAAAY3JlZGVudGlhbHMQAhQAAgAAAAYAAABpc3N1ZXIMAwAAAGtleR4gAAAA";
export type HasIdentityError =
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
export const hasIdentityErrorSchemaBase64 =
	"FQoAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDAAAAFVuYXV0aG9yaXplZAIQAAAASWRlbnRpdHlOb3RGb3VuZAIOAAAASXNzdWVyTm90Rm91bmQCEwAAAElzc3VlckFscmVhZHlFeGlzdHMCEgAAAEFnZW50QWxyZWFkeUV4aXN0cwINAAAAQWdlbnROb3RGb3VuZAINAAAASW52YWxpZElzc3VlcgIRAAAAQ2FsbENvbnRyYWN0RXJyb3IC";
export type HasIdentityRequest =
	| { Account: [string] }
	| { Contract: [{ index: number; subindex: number }] };
export const hasIdentityRequestSchemaBase64 =
	"FQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type HasIdentityResponse = boolean;
export const hasIdentityResponseSchemaBase64 = "AQ==";
export type IsAgentError =
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
export const isAgentErrorSchemaBase64 =
	"FQoAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDAAAAFVuYXV0aG9yaXplZAIQAAAASWRlbnRpdHlOb3RGb3VuZAIOAAAASXNzdWVyTm90Rm91bmQCEwAAAElzc3VlckFscmVhZHlFeGlzdHMCEgAAAEFnZW50QWxyZWFkeUV4aXN0cwINAAAAQWdlbnROb3RGb3VuZAINAAAASW52YWxpZElzc3VlcgIRAAAAQ2FsbENvbnRyYWN0RXJyb3IC";
export type IsAgentRequest =
	| { Account: [string] }
	| { Contract: [{ index: number; subindex: number }] };
export const isAgentRequestSchemaBase64 =
	"FQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type IsAgentResponse = boolean;
export const isAgentResponseSchemaBase64 = "AQ==";
export type IsIssuerError =
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
export const isIssuerErrorSchemaBase64 =
	"FQoAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDAAAAFVuYXV0aG9yaXplZAIQAAAASWRlbnRpdHlOb3RGb3VuZAIOAAAASXNzdWVyTm90Rm91bmQCEwAAAElzc3VlckFscmVhZHlFeGlzdHMCEgAAAEFnZW50QWxyZWFkeUV4aXN0cwINAAAAQWdlbnROb3RGb3VuZAINAAAASW52YWxpZElzc3VlcgIRAAAAQ2FsbENvbnRyYWN0RXJyb3IC";
export type IsIssuerRequest = { index: number; subindex: number };
export const isIssuerRequestSchemaBase64 = "DA==";
export type IsIssuerResponse = boolean;
export const isIssuerResponseSchemaBase64 = "AQ==";
export type IsSameError =
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
export const isSameErrorSchemaBase64 =
	"FQoAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDAAAAFVuYXV0aG9yaXplZAIQAAAASWRlbnRpdHlOb3RGb3VuZAIOAAAASXNzdWVyTm90Rm91bmQCEwAAAElzc3VlckFscmVhZHlFeGlzdHMCEgAAAEFnZW50QWxyZWFkeUV4aXN0cwINAAAAQWdlbnROb3RGb3VuZAINAAAASW52YWxpZElzc3VlcgIRAAAAQ2FsbENvbnRyYWN0RXJyb3IC";
export type IsSameRequest = [
	{ Account: [string] } | { Contract: [{ index: number; subindex: number }] },
	{ Account: [string] } | { Contract: [{ index: number; subindex: number }] },
];
export const isSameRequestSchemaBase64 =
	"DxUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAwVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAM";
export type IsSameResponse = boolean;
export const isSameResponseSchemaBase64 = "AQ==";
export type IsVerifiedError =
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
export const isVerifiedErrorSchemaBase64 =
	"FQoAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDAAAAFVuYXV0aG9yaXplZAIQAAAASWRlbnRpdHlOb3RGb3VuZAIOAAAASXNzdWVyTm90Rm91bmQCEwAAAElzc3VlckFscmVhZHlFeGlzdHMCEgAAAEFnZW50QWxyZWFkeUV4aXN0cwINAAAAQWdlbnROb3RGb3VuZAINAAAASW52YWxpZElzc3VlcgIRAAAAQ2FsbENvbnRyYWN0RXJyb3IC";
export type IsVerifiedRequest =
	| { Account: [string] }
	| { Contract: [{ index: number; subindex: number }] };
export const isVerifiedRequestSchemaBase64 =
	"FQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type IsVerifiedResponse = boolean;
export const isVerifiedResponseSchemaBase64 = "AQ==";
export type IssuersError =
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
export const issuersErrorSchemaBase64 =
	"FQoAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDAAAAFVuYXV0aG9yaXplZAIQAAAASWRlbnRpdHlOb3RGb3VuZAIOAAAASXNzdWVyTm90Rm91bmQCEwAAAElzc3VlckFscmVhZHlFeGlzdHMCEgAAAEFnZW50QWxyZWFkeUV4aXN0cwINAAAAQWdlbnROb3RGb3VuZAINAAAASW52YWxpZElzc3VlcgIRAAAAQ2FsbENvbnRyYWN0RXJyb3IC";
export type IssuersResponse = Array<{ index: number; subindex: number }>;
export const issuersResponseSchemaBase64 = "EAIM";
export type RegisterIdentityError =
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
export const registerIdentityErrorSchemaBase64 =
	"FQoAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDAAAAFVuYXV0aG9yaXplZAIQAAAASWRlbnRpdHlOb3RGb3VuZAIOAAAASXNzdWVyTm90Rm91bmQCEwAAAElzc3VlckFscmVhZHlFeGlzdHMCEgAAAEFnZW50QWxyZWFkeUV4aXN0cwINAAAAQWdlbnROb3RGb3VuZAINAAAASW52YWxpZElzc3VlcgIRAAAAQ2FsbENvbnRyYWN0RXJyb3IC";
export type RegisterIdentityRequest = {
	identity: {
		attributes: Array<{ tag: number; value: string }>;
		credentials: Array<{
			issuer: { index: number; subindex: number };
			key: string;
		}>;
	};
	address:
		| { Account: [string] }
		| { Contract: [{ index: number; subindex: number }] };
};
export const registerIdentityRequestSchemaBase64 =
	"FAACAAAACAAAAGlkZW50aXR5FAACAAAACgAAAGF0dHJpYnV0ZXMQAhQAAgAAAAMAAAB0YWcCBQAAAHZhbHVlFgILAAAAY3JlZGVudGlhbHMQAhQAAgAAAAYAAABpc3N1ZXIMAwAAAGtleR4gAAAABwAAAGFkZHJlc3MVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAM";
export type RemoveAgentError =
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
export const removeAgentErrorSchemaBase64 =
	"FQoAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDAAAAFVuYXV0aG9yaXplZAIQAAAASWRlbnRpdHlOb3RGb3VuZAIOAAAASXNzdWVyTm90Rm91bmQCEwAAAElzc3VlckFscmVhZHlFeGlzdHMCEgAAAEFnZW50QWxyZWFkeUV4aXN0cwINAAAAQWdlbnROb3RGb3VuZAINAAAASW52YWxpZElzc3VlcgIRAAAAQ2FsbENvbnRyYWN0RXJyb3IC";
export type RemoveAgentRequest =
	| { Account: [string] }
	| { Contract: [{ index: number; subindex: number }] };
export const removeAgentRequestSchemaBase64 =
	"FQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type RemoveIssuerError =
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
export const removeIssuerErrorSchemaBase64 =
	"FQoAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDAAAAFVuYXV0aG9yaXplZAIQAAAASWRlbnRpdHlOb3RGb3VuZAIOAAAASXNzdWVyTm90Rm91bmQCEwAAAElzc3VlckFscmVhZHlFeGlzdHMCEgAAAEFnZW50QWxyZWFkeUV4aXN0cwINAAAAQWdlbnROb3RGb3VuZAINAAAASW52YWxpZElzc3VlcgIRAAAAQ2FsbENvbnRyYWN0RXJyb3IC";
export type RemoveIssuerRequest = { index: number; subindex: number };
export const removeIssuerRequestSchemaBase64 = "DA==";
export type SupportsError =
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
export const supportsErrorSchemaBase64 =
	"FQoAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDAAAAFVuYXV0aG9yaXplZAIQAAAASWRlbnRpdHlOb3RGb3VuZAIOAAAASXNzdWVyTm90Rm91bmQCEwAAAElzc3VlckFscmVhZHlFeGlzdHMCEgAAAEFnZW50QWxyZWFkeUV4aXN0cwINAAAAQWdlbnROb3RGb3VuZAINAAAASW52YWxpZElzc3VlcgIRAAAAQ2FsbENvbnRyYWN0RXJyb3IC";
export type SupportsRequest = Array<string>;
export const supportsRequestSchemaBase64 = "EAEWAA==";
export type SupportsResponse = Array<
	| { NoSupport: Record<string, never> }
	| { Support: Record<string, never> }
	| { SupportBy: [Array<{ index: number; subindex: number }>] }
>;
export const supportsResponseSchemaBase64 =
	"EAEVAwAAAAkAAABOb1N1cHBvcnQCBwAAAFN1cHBvcnQCCQAAAFN1cHBvcnRCeQEBAAAAEAAM";
export type event =
	| {
			IdentityRegistered: [
				| { Account: [string] }
				| { Contract: [{ index: number; subindex: number }] },
			];
	  }
	| {
			IdentityRemoved: [
				| { Account: [string] }
				| { Contract: [{ index: number; subindex: number }] },
			];
	  }
	| { IssuerAdded: [{ index: number; subindex: number }] }
	| { IssuerRemoved: [{ index: number; subindex: number }] }
	| {
			AgentAdded: [
				{
					agent:
						| { Account: [string] }
						| { Contract: [{ index: number; subindex: number }] };
				},
			];
	  }
	| {
			AgentRemoved: [
				{
					agent:
						| { Account: [string] }
						| { Contract: [{ index: number; subindex: number }] };
				},
			];
	  };
export const eventSchemaBase64 =
	"FQYAAAASAAAASWRlbnRpdHlSZWdpc3RlcmVkAQEAAAAVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAMDwAAAElkZW50aXR5UmVtb3ZlZAEBAAAAFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAsAAABJc3N1ZXJBZGRlZAEBAAAADA0AAABJc3N1ZXJSZW1vdmVkAQEAAAAMCgAAAEFnZW50QWRkZWQBAQAAABQAAQAAAAUAAABhZ2VudBUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAwMAAAAQWdlbnRSZW1vdmVkAQEAAAAUAAEAAAAFAAAAYWdlbnQVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAM";
export const ENTRYPOINTS: Record<string, EntrypointName.Type> = {
	addAgent: EntrypointName.fromString("addAgent"),
	addIssuer: EntrypointName.fromString("addIssuer"),
	agents: EntrypointName.fromString("agents"),
	deleteIdentity: EntrypointName.fromString("deleteIdentity"),
	getIdentity: EntrypointName.fromString("getIdentity"),
	hasIdentity: EntrypointName.fromString("hasIdentity"),
	isAgent: EntrypointName.fromString("isAgent"),
	isIssuer: EntrypointName.fromString("isIssuer"),
	isSame: EntrypointName.fromString("isSame"),
	isVerified: EntrypointName.fromString("isVerified"),
	issuers: EntrypointName.fromString("issuers"),
	registerIdentity: EntrypointName.fromString("registerIdentity"),
	removeAgent: EntrypointName.fromString("removeAgent"),
	removeIssuer: EntrypointName.fromString("removeIssuer"),
	supports: EntrypointName.fromString("supports"),
};
export const ENTRYPOINT_DISPLAY_NAMES: Record<string, string> = {
	addAgent: "Add Agent",
	addIssuer: "Add Issuer",
	agents: "Agents",
	deleteIdentity: "Delete Identity",
	getIdentity: "Get Identity",
	hasIdentity: "Has Identity",
	isAgent: "Is Agent",
	isIssuer: "Is Issuer",
	isSame: "Is Same",
	isVerified: "Is Verified",
	issuers: "Issuers",
	registerIdentity: "Register Identity",
	removeAgent: "Remove Agent",
	removeIssuer: "Remove Issuer",
	supports: "Supports",
};
export const rwaIdentityRegistry = {
	init: new InitMethod<void>(
		ModuleReference.fromHexString(
			"ef23134582caa49733cb669958c12712459701441148f66676b3ee236641cf05",
		),
		ContractName.fromString("rwa_identity_registry"),
	),
	addAgent: new ReceiveMethod<AddAgentRequest, never, AddAgentError>(
		ContractName.fromString("rwa_identity_registry"),
		EntrypointName.fromString("addAgent"),
		addAgentRequestSchemaBase64,
		undefined,
		addAgentErrorSchemaBase64,
	),
	addIssuer: new ReceiveMethod<AddIssuerRequest, never, AddIssuerError>(
		ContractName.fromString("rwa_identity_registry"),
		EntrypointName.fromString("addIssuer"),
		addIssuerRequestSchemaBase64,
		undefined,
		addIssuerErrorSchemaBase64,
	),
	agents: new ReceiveMethod<never, AgentsResponse, AgentsError>(
		ContractName.fromString("rwa_identity_registry"),
		EntrypointName.fromString("agents"),
		undefined,
		agentsResponseSchemaBase64,
		agentsErrorSchemaBase64,
	),
	deleteIdentity: new ReceiveMethod<
		DeleteIdentityRequest,
		never,
		DeleteIdentityError
	>(
		ContractName.fromString("rwa_identity_registry"),
		EntrypointName.fromString("deleteIdentity"),
		deleteIdentityRequestSchemaBase64,
		undefined,
		deleteIdentityErrorSchemaBase64,
	),
	getIdentity: new ReceiveMethod<
		GetIdentityRequest,
		GetIdentityResponse,
		GetIdentityError
	>(
		ContractName.fromString("rwa_identity_registry"),
		EntrypointName.fromString("getIdentity"),
		getIdentityRequestSchemaBase64,
		getIdentityResponseSchemaBase64,
		getIdentityErrorSchemaBase64,
	),
	hasIdentity: new ReceiveMethod<
		HasIdentityRequest,
		HasIdentityResponse,
		HasIdentityError
	>(
		ContractName.fromString("rwa_identity_registry"),
		EntrypointName.fromString("hasIdentity"),
		hasIdentityRequestSchemaBase64,
		hasIdentityResponseSchemaBase64,
		hasIdentityErrorSchemaBase64,
	),
	isAgent: new ReceiveMethod<IsAgentRequest, IsAgentResponse, IsAgentError>(
		ContractName.fromString("rwa_identity_registry"),
		EntrypointName.fromString("isAgent"),
		isAgentRequestSchemaBase64,
		isAgentResponseSchemaBase64,
		isAgentErrorSchemaBase64,
	),
	isIssuer: new ReceiveMethod<IsIssuerRequest, IsIssuerResponse, IsIssuerError>(
		ContractName.fromString("rwa_identity_registry"),
		EntrypointName.fromString("isIssuer"),
		isIssuerRequestSchemaBase64,
		isIssuerResponseSchemaBase64,
		isIssuerErrorSchemaBase64,
	),
	isSame: new ReceiveMethod<IsSameRequest, IsSameResponse, IsSameError>(
		ContractName.fromString("rwa_identity_registry"),
		EntrypointName.fromString("isSame"),
		isSameRequestSchemaBase64,
		isSameResponseSchemaBase64,
		isSameErrorSchemaBase64,
	),
	isVerified: new ReceiveMethod<
		IsVerifiedRequest,
		IsVerifiedResponse,
		IsVerifiedError
	>(
		ContractName.fromString("rwa_identity_registry"),
		EntrypointName.fromString("isVerified"),
		isVerifiedRequestSchemaBase64,
		isVerifiedResponseSchemaBase64,
		isVerifiedErrorSchemaBase64,
	),
	issuers: new ReceiveMethod<never, IssuersResponse, IssuersError>(
		ContractName.fromString("rwa_identity_registry"),
		EntrypointName.fromString("issuers"),
		undefined,
		issuersResponseSchemaBase64,
		issuersErrorSchemaBase64,
	),
	registerIdentity: new ReceiveMethod<
		RegisterIdentityRequest,
		never,
		RegisterIdentityError
	>(
		ContractName.fromString("rwa_identity_registry"),
		EntrypointName.fromString("registerIdentity"),
		registerIdentityRequestSchemaBase64,
		undefined,
		registerIdentityErrorSchemaBase64,
	),
	removeAgent: new ReceiveMethod<RemoveAgentRequest, never, RemoveAgentError>(
		ContractName.fromString("rwa_identity_registry"),
		EntrypointName.fromString("removeAgent"),
		removeAgentRequestSchemaBase64,
		undefined,
		removeAgentErrorSchemaBase64,
	),
	removeIssuer: new ReceiveMethod<
		RemoveIssuerRequest,
		never,
		RemoveIssuerError
	>(
		ContractName.fromString("rwa_identity_registry"),
		EntrypointName.fromString("removeIssuer"),
		removeIssuerRequestSchemaBase64,
		undefined,
		removeIssuerErrorSchemaBase64,
	),
	supports: new ReceiveMethod<SupportsRequest, SupportsResponse, SupportsError>(
		ContractName.fromString("rwa_identity_registry"),
		EntrypointName.fromString("supports"),
		supportsRequestSchemaBase64,
		supportsResponseSchemaBase64,
		supportsErrorSchemaBase64,
	),
	deserializeEvent: (event: ContractEvent.Type): event => {
		return ContractEvent.parseWithSchemaTypeBase64(
			event,
			eventSchemaBase64,
		) as event;
	},
};
export default rwaIdentityRegistry;
