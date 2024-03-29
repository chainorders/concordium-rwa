import {
	ContractEvent,
	ContractName,
	EntrypointName,
	ModuleReference,
} from "@concordium/web-sdk";
import { InitMethod, ReceiveMethod } from "./GenericContract";
export const CONTRACT_NAME = "rwa_market";
export type initRequest = {
	commission: { numerator: bigint; denominator: bigint };
	token_contracts: Array<{ index: number; subindex: number }>;
	exchange_tokens: Array<{
		contract: { index: number; subindex: number };
		id: string;
	}>;
};
export const initRequestSchemaBase64 =
	"FAADAAAACgAAAGNvbW1pc3Npb24UAAIAAAAJAAAAbnVtZXJhdG9yBQsAAABkZW5vbWluYXRvcgUPAAAAdG9rZW5fY29udHJhY3RzEAIMDwAAAGV4Y2hhbmdlX3Rva2VucxACFAACAAAACAAAAGNvbnRyYWN0DAIAAABpZB0A";
export type AddPaymentTokenError =
	| { ParseError: Record<string, never> }
	| { LogError: Record<string, never> }
	| { Unauthorized: Record<string, never> }
	| { InvalidExchange: Record<string, never> }
	| { OnlyAccount: Record<string, never> }
	| { InsufficientSupply: Record<string, never> }
	| { InvalidRate: Record<string, never> }
	| { NotListed: Record<string, never> }
	| { InsufficientDeposits: Record<string, never> }
	| { InsufficientPayment: Record<string, never> }
	| { PaymentNotRequired: Record<string, never> }
	| { InvalidDepositData: Record<string, never> }
	| { InvalidListToken: Record<string, never> }
	| { InvalidPaymentToken: Record<string, never> }
	| { InvalidCommission: Record<string, never> }
	| { InvalidSupply: Record<string, never> }
	| { InvalidExchangeRates: Record<string, never> }
	| { Cis2WithdrawError: Record<string, never> }
	| { Cis2SettlementError: Record<string, never> }
	| { Cis2PaymentError: Record<string, never> }
	| { Cis2CommissionPaymentError: Record<string, never> }
	| { CCDPaymentError: Record<string, never> }
	| { CCDCommissionPaymentError: Record<string, never> }
	| { NotDeposited: Record<string, never> };
export const addPaymentTokenErrorSchemaBase64 =
	"FRgAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDAAAAFVuYXV0aG9yaXplZAIPAAAASW52YWxpZEV4Y2hhbmdlAgsAAABPbmx5QWNjb3VudAISAAAASW5zdWZmaWNpZW50U3VwcGx5AgsAAABJbnZhbGlkUmF0ZQIJAAAATm90TGlzdGVkAhQAAABJbnN1ZmZpY2llbnREZXBvc2l0cwITAAAASW5zdWZmaWNpZW50UGF5bWVudAISAAAAUGF5bWVudE5vdFJlcXVpcmVkAhIAAABJbnZhbGlkRGVwb3NpdERhdGECEAAAAEludmFsaWRMaXN0VG9rZW4CEwAAAEludmFsaWRQYXltZW50VG9rZW4CEQAAAEludmFsaWRDb21taXNzaW9uAg0AAABJbnZhbGlkU3VwcGx5AhQAAABJbnZhbGlkRXhjaGFuZ2VSYXRlcwIRAAAAQ2lzMldpdGhkcmF3RXJyb3ICEwAAAENpczJTZXR0bGVtZW50RXJyb3ICEAAAAENpczJQYXltZW50RXJyb3ICGgAAAENpczJDb21taXNzaW9uUGF5bWVudEVycm9yAg8AAABDQ0RQYXltZW50RXJyb3ICGQAAAENDRENvbW1pc3Npb25QYXltZW50RXJyb3ICDAAAAE5vdERlcG9zaXRlZAI=";
export type AddPaymentTokenRequest = {
	contract: { index: number; subindex: number };
	id: string;
};
export const addPaymentTokenRequestSchemaBase64 =
	"FAACAAAACAAAAGNvbnRyYWN0DAIAAABpZB0A";
export type AddSellTokenContractError =
	| { ParseError: Record<string, never> }
	| { LogError: Record<string, never> }
	| { Unauthorized: Record<string, never> }
	| { InvalidExchange: Record<string, never> }
	| { OnlyAccount: Record<string, never> }
	| { InsufficientSupply: Record<string, never> }
	| { InvalidRate: Record<string, never> }
	| { NotListed: Record<string, never> }
	| { InsufficientDeposits: Record<string, never> }
	| { InsufficientPayment: Record<string, never> }
	| { PaymentNotRequired: Record<string, never> }
	| { InvalidDepositData: Record<string, never> }
	| { InvalidListToken: Record<string, never> }
	| { InvalidPaymentToken: Record<string, never> }
	| { InvalidCommission: Record<string, never> }
	| { InvalidSupply: Record<string, never> }
	| { InvalidExchangeRates: Record<string, never> }
	| { Cis2WithdrawError: Record<string, never> }
	| { Cis2SettlementError: Record<string, never> }
	| { Cis2PaymentError: Record<string, never> }
	| { Cis2CommissionPaymentError: Record<string, never> }
	| { CCDPaymentError: Record<string, never> }
	| { CCDCommissionPaymentError: Record<string, never> }
	| { NotDeposited: Record<string, never> };
export const addSellTokenContractErrorSchemaBase64 =
	"FRgAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDAAAAFVuYXV0aG9yaXplZAIPAAAASW52YWxpZEV4Y2hhbmdlAgsAAABPbmx5QWNjb3VudAISAAAASW5zdWZmaWNpZW50U3VwcGx5AgsAAABJbnZhbGlkUmF0ZQIJAAAATm90TGlzdGVkAhQAAABJbnN1ZmZpY2llbnREZXBvc2l0cwITAAAASW5zdWZmaWNpZW50UGF5bWVudAISAAAAUGF5bWVudE5vdFJlcXVpcmVkAhIAAABJbnZhbGlkRGVwb3NpdERhdGECEAAAAEludmFsaWRMaXN0VG9rZW4CEwAAAEludmFsaWRQYXltZW50VG9rZW4CEQAAAEludmFsaWRDb21taXNzaW9uAg0AAABJbnZhbGlkU3VwcGx5AhQAAABJbnZhbGlkRXhjaGFuZ2VSYXRlcwIRAAAAQ2lzMldpdGhkcmF3RXJyb3ICEwAAAENpczJTZXR0bGVtZW50RXJyb3ICEAAAAENpczJQYXltZW50RXJyb3ICGgAAAENpczJDb21taXNzaW9uUGF5bWVudEVycm9yAg8AAABDQ0RQYXltZW50RXJyb3ICGQAAAENDRENvbW1pc3Npb25QYXltZW50RXJyb3ICDAAAAE5vdERlcG9zaXRlZAI=";
export type AddSellTokenContractRequest = { index: number; subindex: number };
export const addSellTokenContractRequestSchemaBase64 = "DA==";
export type AllowedToListResponse = Array<{ index: number; subindex: number }>;
export const allowedToListResponseSchemaBase64 = "EAIM";
export type BalanceOfDepositedError =
	| { ParseError: Record<string, never> }
	| { LogError: Record<string, never> }
	| { Unauthorized: Record<string, never> }
	| { InvalidExchange: Record<string, never> }
	| { OnlyAccount: Record<string, never> }
	| { InsufficientSupply: Record<string, never> }
	| { InvalidRate: Record<string, never> }
	| { NotListed: Record<string, never> }
	| { InsufficientDeposits: Record<string, never> }
	| { InsufficientPayment: Record<string, never> }
	| { PaymentNotRequired: Record<string, never> }
	| { InvalidDepositData: Record<string, never> }
	| { InvalidListToken: Record<string, never> }
	| { InvalidPaymentToken: Record<string, never> }
	| { InvalidCommission: Record<string, never> }
	| { InvalidSupply: Record<string, never> }
	| { InvalidExchangeRates: Record<string, never> }
	| { Cis2WithdrawError: Record<string, never> }
	| { Cis2SettlementError: Record<string, never> }
	| { Cis2PaymentError: Record<string, never> }
	| { Cis2CommissionPaymentError: Record<string, never> }
	| { CCDPaymentError: Record<string, never> }
	| { CCDCommissionPaymentError: Record<string, never> }
	| { NotDeposited: Record<string, never> };
export const balanceOfDepositedErrorSchemaBase64 =
	"FRgAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDAAAAFVuYXV0aG9yaXplZAIPAAAASW52YWxpZEV4Y2hhbmdlAgsAAABPbmx5QWNjb3VudAISAAAASW5zdWZmaWNpZW50U3VwcGx5AgsAAABJbnZhbGlkUmF0ZQIJAAAATm90TGlzdGVkAhQAAABJbnN1ZmZpY2llbnREZXBvc2l0cwITAAAASW5zdWZmaWNpZW50UGF5bWVudAISAAAAUGF5bWVudE5vdFJlcXVpcmVkAhIAAABJbnZhbGlkRGVwb3NpdERhdGECEAAAAEludmFsaWRMaXN0VG9rZW4CEwAAAEludmFsaWRQYXltZW50VG9rZW4CEQAAAEludmFsaWRDb21taXNzaW9uAg0AAABJbnZhbGlkU3VwcGx5AhQAAABJbnZhbGlkRXhjaGFuZ2VSYXRlcwIRAAAAQ2lzMldpdGhkcmF3RXJyb3ICEwAAAENpczJTZXR0bGVtZW50RXJyb3ICEAAAAENpczJQYXltZW50RXJyb3ICGgAAAENpczJDb21taXNzaW9uUGF5bWVudEVycm9yAg8AAABDQ0RQYXltZW50RXJyb3ICGQAAAENDRENvbW1pc3Npb25QYXltZW50RXJyb3ICDAAAAE5vdERlcG9zaXRlZAI=";
export type BalanceOfDepositedRequest = {
	token_id: { contract: { index: number; subindex: number }; id: string };
	address: string;
};
export const balanceOfDepositedRequestSchemaBase64 =
	"FAACAAAACAAAAHRva2VuX2lkFAACAAAACAAAAGNvbnRyYWN0DAIAAABpZB0ABwAAAGFkZHJlc3ML";
export type BalanceOfDepositedResponse = string;
export const balanceOfDepositedResponseSchemaBase64 = "GyUAAAA=";
export type BalanceOfListedError =
	| { ParseError: Record<string, never> }
	| { LogError: Record<string, never> }
	| { Unauthorized: Record<string, never> }
	| { InvalidExchange: Record<string, never> }
	| { OnlyAccount: Record<string, never> }
	| { InsufficientSupply: Record<string, never> }
	| { InvalidRate: Record<string, never> }
	| { NotListed: Record<string, never> }
	| { InsufficientDeposits: Record<string, never> }
	| { InsufficientPayment: Record<string, never> }
	| { PaymentNotRequired: Record<string, never> }
	| { InvalidDepositData: Record<string, never> }
	| { InvalidListToken: Record<string, never> }
	| { InvalidPaymentToken: Record<string, never> }
	| { InvalidCommission: Record<string, never> }
	| { InvalidSupply: Record<string, never> }
	| { InvalidExchangeRates: Record<string, never> }
	| { Cis2WithdrawError: Record<string, never> }
	| { Cis2SettlementError: Record<string, never> }
	| { Cis2PaymentError: Record<string, never> }
	| { Cis2CommissionPaymentError: Record<string, never> }
	| { CCDPaymentError: Record<string, never> }
	| { CCDCommissionPaymentError: Record<string, never> }
	| { NotDeposited: Record<string, never> };
export const balanceOfListedErrorSchemaBase64 =
	"FRgAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDAAAAFVuYXV0aG9yaXplZAIPAAAASW52YWxpZEV4Y2hhbmdlAgsAAABPbmx5QWNjb3VudAISAAAASW5zdWZmaWNpZW50U3VwcGx5AgsAAABJbnZhbGlkUmF0ZQIJAAAATm90TGlzdGVkAhQAAABJbnN1ZmZpY2llbnREZXBvc2l0cwITAAAASW5zdWZmaWNpZW50UGF5bWVudAISAAAAUGF5bWVudE5vdFJlcXVpcmVkAhIAAABJbnZhbGlkRGVwb3NpdERhdGECEAAAAEludmFsaWRMaXN0VG9rZW4CEwAAAEludmFsaWRQYXltZW50VG9rZW4CEQAAAEludmFsaWRDb21taXNzaW9uAg0AAABJbnZhbGlkU3VwcGx5AhQAAABJbnZhbGlkRXhjaGFuZ2VSYXRlcwIRAAAAQ2lzMldpdGhkcmF3RXJyb3ICEwAAAENpczJTZXR0bGVtZW50RXJyb3ICEAAAAENpczJQYXltZW50RXJyb3ICGgAAAENpczJDb21taXNzaW9uUGF5bWVudEVycm9yAg8AAABDQ0RQYXltZW50RXJyb3ICGQAAAENDRENvbW1pc3Npb25QYXltZW50RXJyb3ICDAAAAE5vdERlcG9zaXRlZAI=";
export type BalanceOfListedRequest = {
	token_id: { contract: { index: number; subindex: number }; id: string };
	owner: string;
};
export const balanceOfListedRequestSchemaBase64 =
	"FAACAAAACAAAAHRva2VuX2lkFAACAAAACAAAAGNvbnRyYWN0DAIAAABpZB0ABQAAAG93bmVyCw==";
export type BalanceOfListedResponse = string;
export const balanceOfListedResponseSchemaBase64 = "GyUAAAA=";
export type BalanceOfUnlistedError =
	| { ParseError: Record<string, never> }
	| { LogError: Record<string, never> }
	| { Unauthorized: Record<string, never> }
	| { InvalidExchange: Record<string, never> }
	| { OnlyAccount: Record<string, never> }
	| { InsufficientSupply: Record<string, never> }
	| { InvalidRate: Record<string, never> }
	| { NotListed: Record<string, never> }
	| { InsufficientDeposits: Record<string, never> }
	| { InsufficientPayment: Record<string, never> }
	| { PaymentNotRequired: Record<string, never> }
	| { InvalidDepositData: Record<string, never> }
	| { InvalidListToken: Record<string, never> }
	| { InvalidPaymentToken: Record<string, never> }
	| { InvalidCommission: Record<string, never> }
	| { InvalidSupply: Record<string, never> }
	| { InvalidExchangeRates: Record<string, never> }
	| { Cis2WithdrawError: Record<string, never> }
	| { Cis2SettlementError: Record<string, never> }
	| { Cis2PaymentError: Record<string, never> }
	| { Cis2CommissionPaymentError: Record<string, never> }
	| { CCDPaymentError: Record<string, never> }
	| { CCDCommissionPaymentError: Record<string, never> }
	| { NotDeposited: Record<string, never> };
export const balanceOfUnlistedErrorSchemaBase64 =
	"FRgAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDAAAAFVuYXV0aG9yaXplZAIPAAAASW52YWxpZEV4Y2hhbmdlAgsAAABPbmx5QWNjb3VudAISAAAASW5zdWZmaWNpZW50U3VwcGx5AgsAAABJbnZhbGlkUmF0ZQIJAAAATm90TGlzdGVkAhQAAABJbnN1ZmZpY2llbnREZXBvc2l0cwITAAAASW5zdWZmaWNpZW50UGF5bWVudAISAAAAUGF5bWVudE5vdFJlcXVpcmVkAhIAAABJbnZhbGlkRGVwb3NpdERhdGECEAAAAEludmFsaWRMaXN0VG9rZW4CEwAAAEludmFsaWRQYXltZW50VG9rZW4CEQAAAEludmFsaWRDb21taXNzaW9uAg0AAABJbnZhbGlkU3VwcGx5AhQAAABJbnZhbGlkRXhjaGFuZ2VSYXRlcwIRAAAAQ2lzMldpdGhkcmF3RXJyb3ICEwAAAENpczJTZXR0bGVtZW50RXJyb3ICEAAAAENpczJQYXltZW50RXJyb3ICGgAAAENpczJDb21taXNzaW9uUGF5bWVudEVycm9yAg8AAABDQ0RQYXltZW50RXJyb3ICGQAAAENDRENvbW1pc3Npb25QYXltZW50RXJyb3ICDAAAAE5vdERlcG9zaXRlZAI=";
export type BalanceOfUnlistedRequest = {
	token_id: { contract: { index: number; subindex: number }; id: string };
	owner: string;
};
export const balanceOfUnlistedRequestSchemaBase64 =
	"FAACAAAACAAAAHRva2VuX2lkFAACAAAACAAAAGNvbnRyYWN0DAIAAABpZB0ABQAAAG93bmVyCw==";
export type BalanceOfUnlistedResponse = string;
export const balanceOfUnlistedResponseSchemaBase64 = "GyUAAAA=";
export type CalculateAmountsError =
	| { ParseError: Record<string, never> }
	| { LogError: Record<string, never> }
	| { Unauthorized: Record<string, never> }
	| { InvalidExchange: Record<string, never> }
	| { OnlyAccount: Record<string, never> }
	| { InsufficientSupply: Record<string, never> }
	| { InvalidRate: Record<string, never> }
	| { NotListed: Record<string, never> }
	| { InsufficientDeposits: Record<string, never> }
	| { InsufficientPayment: Record<string, never> }
	| { PaymentNotRequired: Record<string, never> }
	| { InvalidDepositData: Record<string, never> }
	| { InvalidListToken: Record<string, never> }
	| { InvalidPaymentToken: Record<string, never> }
	| { InvalidCommission: Record<string, never> }
	| { InvalidSupply: Record<string, never> }
	| { InvalidExchangeRates: Record<string, never> }
	| { Cis2WithdrawError: Record<string, never> }
	| { Cis2SettlementError: Record<string, never> }
	| { Cis2PaymentError: Record<string, never> }
	| { Cis2CommissionPaymentError: Record<string, never> }
	| { CCDPaymentError: Record<string, never> }
	| { CCDCommissionPaymentError: Record<string, never> }
	| { NotDeposited: Record<string, never> };
export const calculateAmountsErrorSchemaBase64 =
	"FRgAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDAAAAFVuYXV0aG9yaXplZAIPAAAASW52YWxpZEV4Y2hhbmdlAgsAAABPbmx5QWNjb3VudAISAAAASW5zdWZmaWNpZW50U3VwcGx5AgsAAABJbnZhbGlkUmF0ZQIJAAAATm90TGlzdGVkAhQAAABJbnN1ZmZpY2llbnREZXBvc2l0cwITAAAASW5zdWZmaWNpZW50UGF5bWVudAISAAAAUGF5bWVudE5vdFJlcXVpcmVkAhIAAABJbnZhbGlkRGVwb3NpdERhdGECEAAAAEludmFsaWRMaXN0VG9rZW4CEwAAAEludmFsaWRQYXltZW50VG9rZW4CEQAAAEludmFsaWRDb21taXNzaW9uAg0AAABJbnZhbGlkU3VwcGx5AhQAAABJbnZhbGlkRXhjaGFuZ2VSYXRlcwIRAAAAQ2lzMldpdGhkcmF3RXJyb3ICEwAAAENpczJTZXR0bGVtZW50RXJyb3ICEAAAAENpczJQYXltZW50RXJyb3ICGgAAAENpczJDb21taXNzaW9uUGF5bWVudEVycm9yAg8AAABDQ0RQYXltZW50RXJyb3ICGQAAAENDRENvbW1pc3Npb25QYXltZW50RXJyb3ICDAAAAE5vdERlcG9zaXRlZAI=";
export type CalculateAmountsRequest = {
	token_id: { contract: { index: number; subindex: number }; id: string };
	owner: string;
	amount: string;
	rate:
		| { Ccd: [{ numerator: bigint; denominator: bigint }] }
		| {
				Cis2: [
					[
						{ contract: { index: number; subindex: number }; id: string },
						{ numerator: bigint; denominator: bigint },
					],
				];
		  };
	payer: string;
};
export const calculateAmountsRequestSchemaBase64 =
	"FAAFAAAACAAAAHRva2VuX2lkFAACAAAACAAAAGNvbnRyYWN0DAIAAABpZB0ABQAAAG93bmVyCwYAAABhbW91bnQbJQAAAAQAAAByYXRlFQIAAAADAAAAQ2NkAQEAAAAUAAIAAAAJAAAAbnVtZXJhdG9yBQsAAABkZW5vbWluYXRvcgUEAAAAQ2lzMgEBAAAADxQAAgAAAAgAAABjb250cmFjdAwCAAAAaWQdABQAAgAAAAkAAABudW1lcmF0b3IFCwAAAGRlbm9taW5hdG9yBQUAAABwYXllcgs=";
export type CalculateAmountsResponse = {
	buy: string;
	pay: { Cis2: [string] } | { CCD: [string] };
	pay_token:
		| { Cis2: [{ contract: { index: number; subindex: number }; id: string }] }
		| { CCD: Record<string, never> };
	commission: { Cis2: [string] } | { CCD: [string] };
};
export const calculateAmountsResponseSchemaBase64 =
	"FAAEAAAAAwAAAGJ1eRslAAAAAwAAAHBheRUCAAAABAAAAENpczIBAQAAABslAAAAAwAAAENDRAEBAAAACgkAAABwYXlfdG9rZW4VAgAAAAQAAABDaXMyAQEAAAAUAAIAAAAIAAAAY29udHJhY3QMAgAAAGlkHQADAAAAQ0NEAgoAAABjb21taXNzaW9uFQIAAAAEAAAAQ2lzMgEBAAAAGyUAAAADAAAAQ0NEAQEAAAAK";
export type DeListError =
	| { ParseError: Record<string, never> }
	| { LogError: Record<string, never> }
	| { Unauthorized: Record<string, never> }
	| { InvalidExchange: Record<string, never> }
	| { OnlyAccount: Record<string, never> }
	| { InsufficientSupply: Record<string, never> }
	| { InvalidRate: Record<string, never> }
	| { NotListed: Record<string, never> }
	| { InsufficientDeposits: Record<string, never> }
	| { InsufficientPayment: Record<string, never> }
	| { PaymentNotRequired: Record<string, never> }
	| { InvalidDepositData: Record<string, never> }
	| { InvalidListToken: Record<string, never> }
	| { InvalidPaymentToken: Record<string, never> }
	| { InvalidCommission: Record<string, never> }
	| { InvalidSupply: Record<string, never> }
	| { InvalidExchangeRates: Record<string, never> }
	| { Cis2WithdrawError: Record<string, never> }
	| { Cis2SettlementError: Record<string, never> }
	| { Cis2PaymentError: Record<string, never> }
	| { Cis2CommissionPaymentError: Record<string, never> }
	| { CCDPaymentError: Record<string, never> }
	| { CCDCommissionPaymentError: Record<string, never> }
	| { NotDeposited: Record<string, never> };
export const deListErrorSchemaBase64 =
	"FRgAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDAAAAFVuYXV0aG9yaXplZAIPAAAASW52YWxpZEV4Y2hhbmdlAgsAAABPbmx5QWNjb3VudAISAAAASW5zdWZmaWNpZW50U3VwcGx5AgsAAABJbnZhbGlkUmF0ZQIJAAAATm90TGlzdGVkAhQAAABJbnN1ZmZpY2llbnREZXBvc2l0cwITAAAASW5zdWZmaWNpZW50UGF5bWVudAISAAAAUGF5bWVudE5vdFJlcXVpcmVkAhIAAABJbnZhbGlkRGVwb3NpdERhdGECEAAAAEludmFsaWRMaXN0VG9rZW4CEwAAAEludmFsaWRQYXltZW50VG9rZW4CEQAAAEludmFsaWRDb21taXNzaW9uAg0AAABJbnZhbGlkU3VwcGx5AhQAAABJbnZhbGlkRXhjaGFuZ2VSYXRlcwIRAAAAQ2lzMldpdGhkcmF3RXJyb3ICEwAAAENpczJTZXR0bGVtZW50RXJyb3ICEAAAAENpczJQYXltZW50RXJyb3ICGgAAAENpczJDb21taXNzaW9uUGF5bWVudEVycm9yAg8AAABDQ0RQYXltZW50RXJyb3ICGQAAAENDRENvbW1pc3Npb25QYXltZW50RXJyb3ICDAAAAE5vdERlcG9zaXRlZAI=";
export type DeListRequest = {
	token_id: { contract: { index: number; subindex: number }; id: string };
	owner: string;
};
export const deListRequestSchemaBase64 =
	"FAACAAAACAAAAHRva2VuX2lkFAACAAAACAAAAGNvbnRyYWN0DAIAAABpZB0ABQAAAG93bmVyCw==";
export type DepositError =
	| { ParseError: Record<string, never> }
	| { LogError: Record<string, never> }
	| { Unauthorized: Record<string, never> }
	| { InvalidExchange: Record<string, never> }
	| { OnlyAccount: Record<string, never> }
	| { InsufficientSupply: Record<string, never> }
	| { InvalidRate: Record<string, never> }
	| { NotListed: Record<string, never> }
	| { InsufficientDeposits: Record<string, never> }
	| { InsufficientPayment: Record<string, never> }
	| { PaymentNotRequired: Record<string, never> }
	| { InvalidDepositData: Record<string, never> }
	| { InvalidListToken: Record<string, never> }
	| { InvalidPaymentToken: Record<string, never> }
	| { InvalidCommission: Record<string, never> }
	| { InvalidSupply: Record<string, never> }
	| { InvalidExchangeRates: Record<string, never> }
	| { Cis2WithdrawError: Record<string, never> }
	| { Cis2SettlementError: Record<string, never> }
	| { Cis2PaymentError: Record<string, never> }
	| { Cis2CommissionPaymentError: Record<string, never> }
	| { CCDPaymentError: Record<string, never> }
	| { CCDCommissionPaymentError: Record<string, never> }
	| { NotDeposited: Record<string, never> };
export const depositErrorSchemaBase64 =
	"FRgAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDAAAAFVuYXV0aG9yaXplZAIPAAAASW52YWxpZEV4Y2hhbmdlAgsAAABPbmx5QWNjb3VudAISAAAASW5zdWZmaWNpZW50U3VwcGx5AgsAAABJbnZhbGlkUmF0ZQIJAAAATm90TGlzdGVkAhQAAABJbnN1ZmZpY2llbnREZXBvc2l0cwITAAAASW5zdWZmaWNpZW50UGF5bWVudAISAAAAUGF5bWVudE5vdFJlcXVpcmVkAhIAAABJbnZhbGlkRGVwb3NpdERhdGECEAAAAEludmFsaWRMaXN0VG9rZW4CEwAAAEludmFsaWRQYXltZW50VG9rZW4CEQAAAEludmFsaWRDb21taXNzaW9uAg0AAABJbnZhbGlkU3VwcGx5AhQAAABJbnZhbGlkRXhjaGFuZ2VSYXRlcwIRAAAAQ2lzMldpdGhkcmF3RXJyb3ICEwAAAENpczJTZXR0bGVtZW50RXJyb3ICEAAAAENpczJQYXltZW50RXJyb3ICGgAAAENpczJDb21taXNzaW9uUGF5bWVudEVycm9yAg8AAABDQ0RQYXltZW50RXJyb3ICGQAAAENDRENvbW1pc3Npb25QYXltZW50RXJyb3ICDAAAAE5vdERlcG9zaXRlZAI=";
export type DepositRequest = {
	token_id: string;
	amount: string;
	from:
		| { Account: [string] }
		| { Contract: [{ index: number; subindex: number }] };
	data: string;
};
export const depositRequestSchemaBase64 =
	"FAAEAAAACAAAAHRva2VuX2lkHQAGAAAAYW1vdW50GyUAAAAEAAAAZnJvbRUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAwEAAAAZGF0YR0B";
export type ExchangeError =
	| { ParseError: Record<string, never> }
	| { LogError: Record<string, never> }
	| { Unauthorized: Record<string, never> }
	| { InvalidExchange: Record<string, never> }
	| { OnlyAccount: Record<string, never> }
	| { InsufficientSupply: Record<string, never> }
	| { InvalidRate: Record<string, never> }
	| { NotListed: Record<string, never> }
	| { InsufficientDeposits: Record<string, never> }
	| { InsufficientPayment: Record<string, never> }
	| { PaymentNotRequired: Record<string, never> }
	| { InvalidDepositData: Record<string, never> }
	| { InvalidListToken: Record<string, never> }
	| { InvalidPaymentToken: Record<string, never> }
	| { InvalidCommission: Record<string, never> }
	| { InvalidSupply: Record<string, never> }
	| { InvalidExchangeRates: Record<string, never> }
	| { Cis2WithdrawError: Record<string, never> }
	| { Cis2SettlementError: Record<string, never> }
	| { Cis2PaymentError: Record<string, never> }
	| { Cis2CommissionPaymentError: Record<string, never> }
	| { CCDPaymentError: Record<string, never> }
	| { CCDCommissionPaymentError: Record<string, never> }
	| { NotDeposited: Record<string, never> };
export const exchangeErrorSchemaBase64 =
	"FRgAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDAAAAFVuYXV0aG9yaXplZAIPAAAASW52YWxpZEV4Y2hhbmdlAgsAAABPbmx5QWNjb3VudAISAAAASW5zdWZmaWNpZW50U3VwcGx5AgsAAABJbnZhbGlkUmF0ZQIJAAAATm90TGlzdGVkAhQAAABJbnN1ZmZpY2llbnREZXBvc2l0cwITAAAASW5zdWZmaWNpZW50UGF5bWVudAISAAAAUGF5bWVudE5vdFJlcXVpcmVkAhIAAABJbnZhbGlkRGVwb3NpdERhdGECEAAAAEludmFsaWRMaXN0VG9rZW4CEwAAAEludmFsaWRQYXltZW50VG9rZW4CEQAAAEludmFsaWRDb21taXNzaW9uAg0AAABJbnZhbGlkU3VwcGx5AhQAAABJbnZhbGlkRXhjaGFuZ2VSYXRlcwIRAAAAQ2lzMldpdGhkcmF3RXJyb3ICEwAAAENpczJTZXR0bGVtZW50RXJyb3ICEAAAAENpczJQYXltZW50RXJyb3ICGgAAAENpczJDb21taXNzaW9uUGF5bWVudEVycm9yAg8AAABDQ0RQYXltZW50RXJyb3ICGQAAAENDRENvbW1pc3Npb25QYXltZW50RXJyb3ICDAAAAE5vdERlcG9zaXRlZAI=";
export type ExchangeRequest = {
	token_id: { contract: { index: number; subindex: number }; id: string };
	owner: string;
	amount: string;
	rate:
		| { Ccd: [{ numerator: bigint; denominator: bigint }] }
		| {
				Cis2: [
					[
						{ contract: { index: number; subindex: number }; id: string },
						{ numerator: bigint; denominator: bigint },
					],
				];
		  };
	payer: string;
};
export const exchangeRequestSchemaBase64 =
	"FAAFAAAACAAAAHRva2VuX2lkFAACAAAACAAAAGNvbnRyYWN0DAIAAABpZB0ABQAAAG93bmVyCwYAAABhbW91bnQbJQAAAAQAAAByYXRlFQIAAAADAAAAQ2NkAQEAAAAUAAIAAAAJAAAAbnVtZXJhdG9yBQsAAABkZW5vbWluYXRvcgUEAAAAQ2lzMgEBAAAADxQAAgAAAAgAAABjb250cmFjdAwCAAAAaWQdABQAAgAAAAkAAABudW1lcmF0b3IFCwAAAGRlbm9taW5hdG9yBQUAAABwYXllcgs=";
export type GetListedError =
	| { ParseError: Record<string, never> }
	| { LogError: Record<string, never> }
	| { Unauthorized: Record<string, never> }
	| { InvalidExchange: Record<string, never> }
	| { OnlyAccount: Record<string, never> }
	| { InsufficientSupply: Record<string, never> }
	| { InvalidRate: Record<string, never> }
	| { NotListed: Record<string, never> }
	| { InsufficientDeposits: Record<string, never> }
	| { InsufficientPayment: Record<string, never> }
	| { PaymentNotRequired: Record<string, never> }
	| { InvalidDepositData: Record<string, never> }
	| { InvalidListToken: Record<string, never> }
	| { InvalidPaymentToken: Record<string, never> }
	| { InvalidCommission: Record<string, never> }
	| { InvalidSupply: Record<string, never> }
	| { InvalidExchangeRates: Record<string, never> }
	| { Cis2WithdrawError: Record<string, never> }
	| { Cis2SettlementError: Record<string, never> }
	| { Cis2PaymentError: Record<string, never> }
	| { Cis2CommissionPaymentError: Record<string, never> }
	| { CCDPaymentError: Record<string, never> }
	| { CCDCommissionPaymentError: Record<string, never> }
	| { NotDeposited: Record<string, never> };
export const getListedErrorSchemaBase64 =
	"FRgAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDAAAAFVuYXV0aG9yaXplZAIPAAAASW52YWxpZEV4Y2hhbmdlAgsAAABPbmx5QWNjb3VudAISAAAASW5zdWZmaWNpZW50U3VwcGx5AgsAAABJbnZhbGlkUmF0ZQIJAAAATm90TGlzdGVkAhQAAABJbnN1ZmZpY2llbnREZXBvc2l0cwITAAAASW5zdWZmaWNpZW50UGF5bWVudAISAAAAUGF5bWVudE5vdFJlcXVpcmVkAhIAAABJbnZhbGlkRGVwb3NpdERhdGECEAAAAEludmFsaWRMaXN0VG9rZW4CEwAAAEludmFsaWRQYXltZW50VG9rZW4CEQAAAEludmFsaWRDb21taXNzaW9uAg0AAABJbnZhbGlkU3VwcGx5AhQAAABJbnZhbGlkRXhjaGFuZ2VSYXRlcwIRAAAAQ2lzMldpdGhkcmF3RXJyb3ICEwAAAENpczJTZXR0bGVtZW50RXJyb3ICEAAAAENpczJQYXltZW50RXJyb3ICGgAAAENpczJDb21taXNzaW9uUGF5bWVudEVycm9yAg8AAABDQ0RQYXltZW50RXJyb3ICGQAAAENDRENvbW1pc3Npb25QYXltZW50RXJyb3ICDAAAAE5vdERlcG9zaXRlZAI=";
export type GetListedRequest = {
	token_id: { contract: { index: number; subindex: number }; id: string };
	owner: string;
};
export const getListedRequestSchemaBase64 =
	"FAACAAAACAAAAHRva2VuX2lkFAACAAAACAAAAGNvbnRyYWN0DAIAAABpZB0ABQAAAG93bmVyCw==";
export type GetListedResponse = {
	token_id: { contract: { index: number; subindex: number }; id: string };
	owner: string;
	exchange_rates: Array<
		| { Ccd: [{ numerator: bigint; denominator: bigint }] }
		| {
				Cis2: [
					[
						{ contract: { index: number; subindex: number }; id: string },
						{ numerator: bigint; denominator: bigint },
					],
				];
		  }
	>;
	supply: string;
};
export const getListedResponseSchemaBase64 =
	"FAAEAAAACAAAAHRva2VuX2lkFAACAAAACAAAAGNvbnRyYWN0DAIAAABpZB0ABQAAAG93bmVyCw4AAABleGNoYW5nZV9yYXRlcxACFQIAAAADAAAAQ2NkAQEAAAAUAAIAAAAJAAAAbnVtZXJhdG9yBQsAAABkZW5vbWluYXRvcgUEAAAAQ2lzMgEBAAAADxQAAgAAAAgAAABjb250cmFjdAwCAAAAaWQdABQAAgAAAAkAAABudW1lcmF0b3IFCwAAAGRlbm9taW5hdG9yBQYAAABzdXBwbHkbJQAAAA==";
export type ListError =
	| { ParseError: Record<string, never> }
	| { LogError: Record<string, never> }
	| { Unauthorized: Record<string, never> }
	| { InvalidExchange: Record<string, never> }
	| { OnlyAccount: Record<string, never> }
	| { InsufficientSupply: Record<string, never> }
	| { InvalidRate: Record<string, never> }
	| { NotListed: Record<string, never> }
	| { InsufficientDeposits: Record<string, never> }
	| { InsufficientPayment: Record<string, never> }
	| { PaymentNotRequired: Record<string, never> }
	| { InvalidDepositData: Record<string, never> }
	| { InvalidListToken: Record<string, never> }
	| { InvalidPaymentToken: Record<string, never> }
	| { InvalidCommission: Record<string, never> }
	| { InvalidSupply: Record<string, never> }
	| { InvalidExchangeRates: Record<string, never> }
	| { Cis2WithdrawError: Record<string, never> }
	| { Cis2SettlementError: Record<string, never> }
	| { Cis2PaymentError: Record<string, never> }
	| { Cis2CommissionPaymentError: Record<string, never> }
	| { CCDPaymentError: Record<string, never> }
	| { CCDCommissionPaymentError: Record<string, never> }
	| { NotDeposited: Record<string, never> };
export const listErrorSchemaBase64 =
	"FRgAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDAAAAFVuYXV0aG9yaXplZAIPAAAASW52YWxpZEV4Y2hhbmdlAgsAAABPbmx5QWNjb3VudAISAAAASW5zdWZmaWNpZW50U3VwcGx5AgsAAABJbnZhbGlkUmF0ZQIJAAAATm90TGlzdGVkAhQAAABJbnN1ZmZpY2llbnREZXBvc2l0cwITAAAASW5zdWZmaWNpZW50UGF5bWVudAISAAAAUGF5bWVudE5vdFJlcXVpcmVkAhIAAABJbnZhbGlkRGVwb3NpdERhdGECEAAAAEludmFsaWRMaXN0VG9rZW4CEwAAAEludmFsaWRQYXltZW50VG9rZW4CEQAAAEludmFsaWRDb21taXNzaW9uAg0AAABJbnZhbGlkU3VwcGx5AhQAAABJbnZhbGlkRXhjaGFuZ2VSYXRlcwIRAAAAQ2lzMldpdGhkcmF3RXJyb3ICEwAAAENpczJTZXR0bGVtZW50RXJyb3ICEAAAAENpczJQYXltZW50RXJyb3ICGgAAAENpczJDb21taXNzaW9uUGF5bWVudEVycm9yAg8AAABDQ0RQYXltZW50RXJyb3ICGQAAAENDRENvbW1pc3Npb25QYXltZW50RXJyb3ICDAAAAE5vdERlcG9zaXRlZAI=";
export type ListRequest = {
	token_id: { contract: { index: number; subindex: number }; id: string };
	owner: string;
	exchange_rates: Array<
		| { Ccd: [{ numerator: bigint; denominator: bigint }] }
		| {
				Cis2: [
					[
						{ contract: { index: number; subindex: number }; id: string },
						{ numerator: bigint; denominator: bigint },
					],
				];
		  }
	>;
	supply: string;
};
export const listRequestSchemaBase64 =
	"FAAEAAAACAAAAHRva2VuX2lkFAACAAAACAAAAGNvbnRyYWN0DAIAAABpZB0ABQAAAG93bmVyCw4AAABleGNoYW5nZV9yYXRlcxACFQIAAAADAAAAQ2NkAQEAAAAUAAIAAAAJAAAAbnVtZXJhdG9yBQsAAABkZW5vbWluYXRvcgUEAAAAQ2lzMgEBAAAADxQAAgAAAAgAAABjb250cmFjdAwCAAAAaWQdABQAAgAAAAkAAABudW1lcmF0b3IFCwAAAGRlbm9taW5hdG9yBQYAAABzdXBwbHkbJQAAAA==";
export type PaymentTokensResponse = Array<{
	contract: { index: number; subindex: number };
	id: string;
}>;
export const paymentTokensResponseSchemaBase64 =
	"EAIUAAIAAAAIAAAAY29udHJhY3QMAgAAAGlkHQA=";
export type WithdrawError =
	| { ParseError: Record<string, never> }
	| { LogError: Record<string, never> }
	| { Unauthorized: Record<string, never> }
	| { InvalidExchange: Record<string, never> }
	| { OnlyAccount: Record<string, never> }
	| { InsufficientSupply: Record<string, never> }
	| { InvalidRate: Record<string, never> }
	| { NotListed: Record<string, never> }
	| { InsufficientDeposits: Record<string, never> }
	| { InsufficientPayment: Record<string, never> }
	| { PaymentNotRequired: Record<string, never> }
	| { InvalidDepositData: Record<string, never> }
	| { InvalidListToken: Record<string, never> }
	| { InvalidPaymentToken: Record<string, never> }
	| { InvalidCommission: Record<string, never> }
	| { InvalidSupply: Record<string, never> }
	| { InvalidExchangeRates: Record<string, never> }
	| { Cis2WithdrawError: Record<string, never> }
	| { Cis2SettlementError: Record<string, never> }
	| { Cis2PaymentError: Record<string, never> }
	| { Cis2CommissionPaymentError: Record<string, never> }
	| { CCDPaymentError: Record<string, never> }
	| { CCDCommissionPaymentError: Record<string, never> }
	| { NotDeposited: Record<string, never> };
export const withdrawErrorSchemaBase64 =
	"FRgAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDAAAAFVuYXV0aG9yaXplZAIPAAAASW52YWxpZEV4Y2hhbmdlAgsAAABPbmx5QWNjb3VudAISAAAASW5zdWZmaWNpZW50U3VwcGx5AgsAAABJbnZhbGlkUmF0ZQIJAAAATm90TGlzdGVkAhQAAABJbnN1ZmZpY2llbnREZXBvc2l0cwITAAAASW5zdWZmaWNpZW50UGF5bWVudAISAAAAUGF5bWVudE5vdFJlcXVpcmVkAhIAAABJbnZhbGlkRGVwb3NpdERhdGECEAAAAEludmFsaWRMaXN0VG9rZW4CEwAAAEludmFsaWRQYXltZW50VG9rZW4CEQAAAEludmFsaWRDb21taXNzaW9uAg0AAABJbnZhbGlkU3VwcGx5AhQAAABJbnZhbGlkRXhjaGFuZ2VSYXRlcwIRAAAAQ2lzMldpdGhkcmF3RXJyb3ICEwAAAENpczJTZXR0bGVtZW50RXJyb3ICEAAAAENpczJQYXltZW50RXJyb3ICGgAAAENpczJDb21taXNzaW9uUGF5bWVudEVycm9yAg8AAABDQ0RQYXltZW50RXJyb3ICGQAAAENDRENvbW1pc3Npb25QYXltZW50RXJyb3ICDAAAAE5vdERlcG9zaXRlZAI=";
export type WithdrawRequest = {
	token_id: { contract: { index: number; subindex: number }; id: string };
	owner: string;
	amount: string;
};
export const withdrawRequestSchemaBase64 =
	"FAADAAAACAAAAHRva2VuX2lkFAACAAAACAAAAGNvbnRyYWN0DAIAAABpZB0ABQAAAG93bmVyCwYAAABhbW91bnQbJQAAAA==";
export type event =
	| {
			Deposited: [
				{
					token_id: {
						contract: { index: number; subindex: number };
						id: string;
					};
					owner: string;
					amount: string;
				},
			];
	  }
	| {
			Withdraw: [
				{
					token_id: {
						contract: { index: number; subindex: number };
						id: string;
					};
					owner: string;
					amount: string;
				},
			];
	  }
	| {
			Listed: [
				{
					token_id: {
						contract: { index: number; subindex: number };
						id: string;
					};
					owner: string;
					supply: string;
				},
			];
	  }
	| {
			DeListed: [
				{
					token_id: {
						contract: { index: number; subindex: number };
						id: string;
					};
					owner: string;
				},
			];
	  }
	| {
			Exchanged: [
				{
					buy_token_id: {
						contract: { index: number; subindex: number };
						id: string;
					};
					buy_amount: string;
					buy_token_owner: string;
					pay_token_id:
						| {
								Cis2: [
									{ contract: { index: number; subindex: number }; id: string },
								];
						  }
						| { CCD: Record<string, never> };
					pay_amount: { Cis2: [string] } | { CCD: [string] };
					pay_token_owner: string;
					commission_amount: { Cis2: [string] } | { CCD: [string] };
				},
			];
	  };
export const eventSchemaBase64 =
	"FQUAAAAJAAAARGVwb3NpdGVkAQEAAAAUAAMAAAAIAAAAdG9rZW5faWQUAAIAAAAIAAAAY29udHJhY3QMAgAAAGlkHQAFAAAAb3duZXILBgAAAGFtb3VudBslAAAACAAAAFdpdGhkcmF3AQEAAAAUAAMAAAAIAAAAdG9rZW5faWQUAAIAAAAIAAAAY29udHJhY3QMAgAAAGlkHQAFAAAAb3duZXILBgAAAGFtb3VudBslAAAABgAAAExpc3RlZAEBAAAAFAADAAAACAAAAHRva2VuX2lkFAACAAAACAAAAGNvbnRyYWN0DAIAAABpZB0ABQAAAG93bmVyCwYAAABzdXBwbHkbJQAAAAgAAABEZUxpc3RlZAEBAAAAFAACAAAACAAAAHRva2VuX2lkFAACAAAACAAAAGNvbnRyYWN0DAIAAABpZB0ABQAAAG93bmVyCwkAAABFeGNoYW5nZWQBAQAAABQABwAAAAwAAABidXlfdG9rZW5faWQUAAIAAAAIAAAAY29udHJhY3QMAgAAAGlkHQAKAAAAYnV5X2Ftb3VudBslAAAADwAAAGJ1eV90b2tlbl9vd25lcgsMAAAAcGF5X3Rva2VuX2lkFQIAAAAEAAAAQ2lzMgEBAAAAFAACAAAACAAAAGNvbnRyYWN0DAIAAABpZB0AAwAAAENDRAIKAAAAcGF5X2Ftb3VudBUCAAAABAAAAENpczIBAQAAABslAAAAAwAAAENDRAEBAAAACg8AAABwYXlfdG9rZW5fb3duZXILEQAAAGNvbW1pc3Npb25fYW1vdW50FQIAAAAEAAAAQ2lzMgEBAAAAGyUAAAADAAAAQ0NEAQEAAAAK";
export const ENTRYPOINTS: Record<string, EntrypointName.Type> = {
	addPaymentToken: EntrypointName.fromString("addPaymentToken"),
	addSellTokenContract: EntrypointName.fromString("addSellTokenContract"),
	allowedToList: EntrypointName.fromString("allowedToList"),
	balanceOfDeposited: EntrypointName.fromString("balanceOfDeposited"),
	balanceOfListed: EntrypointName.fromString("balanceOfListed"),
	balanceOfUnlisted: EntrypointName.fromString("balanceOfUnlisted"),
	calculateAmounts: EntrypointName.fromString("calculateAmounts"),
	deList: EntrypointName.fromString("deList"),
	deposit: EntrypointName.fromString("deposit"),
	exchange: EntrypointName.fromString("exchange"),
	getListed: EntrypointName.fromString("getListed"),
	list: EntrypointName.fromString("list"),
	paymentTokens: EntrypointName.fromString("paymentTokens"),
	withdraw: EntrypointName.fromString("withdraw"),
};
export const ENTRYPOINT_DISPLAY_NAMES: Record<string, string> = {
	addPaymentToken: "Add Payment Token",
	addSellTokenContract: "Add Sell Token Contract",
	allowedToList: "Allowed To List",
	balanceOfDeposited: "Balance Of Deposited",
	balanceOfListed: "Balance Of Listed",
	balanceOfUnlisted: "Balance Of Unlisted",
	calculateAmounts: "Calculate Amounts",
	deList: "De List",
	deposit: "Deposit",
	exchange: "Exchange",
	getListed: "Get Listed",
	list: "List",
	paymentTokens: "Payment Tokens",
	withdraw: "Withdraw",
};
export const rwaMarket = {
	init: new InitMethod<initRequest>(
		ModuleReference.fromHexString(
			"67655f7a28ec355cb5c33fb6cc53bf4f64d40d5a2b231610f7daa1b4f39fa96c",
		),
		ContractName.fromString("rwa_market"),
		initRequestSchemaBase64,
	),
	addPaymentToken: new ReceiveMethod<
		AddPaymentTokenRequest,
		never,
		AddPaymentTokenError
	>(
		ContractName.fromString("rwa_market"),
		EntrypointName.fromString("addPaymentToken"),
		addPaymentTokenRequestSchemaBase64,
		undefined,
		addPaymentTokenErrorSchemaBase64,
	),
	addSellTokenContract: new ReceiveMethod<
		AddSellTokenContractRequest,
		never,
		AddSellTokenContractError
	>(
		ContractName.fromString("rwa_market"),
		EntrypointName.fromString("addSellTokenContract"),
		addSellTokenContractRequestSchemaBase64,
		undefined,
		addSellTokenContractErrorSchemaBase64,
	),
	allowedToList: new ReceiveMethod<void, AllowedToListResponse>(
		ContractName.fromString("rwa_market"),
		EntrypointName.fromString("allowedToList"),
		undefined,
		allowedToListResponseSchemaBase64,
	),
	balanceOfDeposited: new ReceiveMethod<
		BalanceOfDepositedRequest,
		BalanceOfDepositedResponse,
		BalanceOfDepositedError
	>(
		ContractName.fromString("rwa_market"),
		EntrypointName.fromString("balanceOfDeposited"),
		balanceOfDepositedRequestSchemaBase64,
		balanceOfDepositedResponseSchemaBase64,
		balanceOfDepositedErrorSchemaBase64,
	),
	balanceOfListed: new ReceiveMethod<
		BalanceOfListedRequest,
		BalanceOfListedResponse,
		BalanceOfListedError
	>(
		ContractName.fromString("rwa_market"),
		EntrypointName.fromString("balanceOfListed"),
		balanceOfListedRequestSchemaBase64,
		balanceOfListedResponseSchemaBase64,
		balanceOfListedErrorSchemaBase64,
	),
	balanceOfUnlisted: new ReceiveMethod<
		BalanceOfUnlistedRequest,
		BalanceOfUnlistedResponse,
		BalanceOfUnlistedError
	>(
		ContractName.fromString("rwa_market"),
		EntrypointName.fromString("balanceOfUnlisted"),
		balanceOfUnlistedRequestSchemaBase64,
		balanceOfUnlistedResponseSchemaBase64,
		balanceOfUnlistedErrorSchemaBase64,
	),
	calculateAmounts: new ReceiveMethod<
		CalculateAmountsRequest,
		CalculateAmountsResponse,
		CalculateAmountsError
	>(
		ContractName.fromString("rwa_market"),
		EntrypointName.fromString("calculateAmounts"),
		calculateAmountsRequestSchemaBase64,
		calculateAmountsResponseSchemaBase64,
		calculateAmountsErrorSchemaBase64,
	),
	deList: new ReceiveMethod<DeListRequest, never, DeListError>(
		ContractName.fromString("rwa_market"),
		EntrypointName.fromString("deList"),
		deListRequestSchemaBase64,
		undefined,
		deListErrorSchemaBase64,
	),
	deposit: new ReceiveMethod<DepositRequest, never, DepositError>(
		ContractName.fromString("rwa_market"),
		EntrypointName.fromString("deposit"),
		depositRequestSchemaBase64,
		undefined,
		depositErrorSchemaBase64,
	),
	exchange: new ReceiveMethod<ExchangeRequest, never, ExchangeError>(
		ContractName.fromString("rwa_market"),
		EntrypointName.fromString("exchange"),
		exchangeRequestSchemaBase64,
		undefined,
		exchangeErrorSchemaBase64,
	),
	getListed: new ReceiveMethod<
		GetListedRequest,
		GetListedResponse,
		GetListedError
	>(
		ContractName.fromString("rwa_market"),
		EntrypointName.fromString("getListed"),
		getListedRequestSchemaBase64,
		getListedResponseSchemaBase64,
		getListedErrorSchemaBase64,
	),
	list: new ReceiveMethod<ListRequest, never, ListError>(
		ContractName.fromString("rwa_market"),
		EntrypointName.fromString("list"),
		listRequestSchemaBase64,
		undefined,
		listErrorSchemaBase64,
	),
	paymentTokens: new ReceiveMethod<void, PaymentTokensResponse>(
		ContractName.fromString("rwa_market"),
		EntrypointName.fromString("paymentTokens"),
		undefined,
		paymentTokensResponseSchemaBase64,
	),
	withdraw: new ReceiveMethod<WithdrawRequest, never, WithdrawError>(
		ContractName.fromString("rwa_market"),
		EntrypointName.fromString("withdraw"),
		withdrawRequestSchemaBase64,
		undefined,
		withdrawErrorSchemaBase64,
	),
	deserializeEvent: (event: ContractEvent.Type): event => {
		return ContractEvent.parseWithSchemaTypeBase64(
			event,
			eventSchemaBase64,
		) as event;
	},
};
export default rwaMarket;
