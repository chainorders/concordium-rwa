import { RJSFSchema, RegistryWidgetsType, UiSchema } from "@rjsf/utils";
import React from "react";
import { ContractAddress } from "@concordium/web-sdk";
import { default as client } from "./rwaMarket";
import * as types from "./rwaMarket";
import { GenericInit, GenericInvoke, GenericUpdate } from "./GenericContractUI";
export const initRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Init Request",
	properties: {
		commission: {
			type: "object",
			title: "Commission",
			properties: {
				numerator: { type: "integer", minimum: 0, title: "Numerator" },
				denominator: { type: "integer", minimum: 0, title: "Denominator" },
			},
		},
		token_contracts: {
			type: "array",
			items: {
				type: "object",
				title: "",
				properties: {
					index: { type: "integer", minimum: 0 },
					subindex: { type: "integer", minimum: 0 },
				},
			},
			title: "Token Contracts",
		},
		exchange_tokens: {
			type: "array",
			items: {
				type: "object",
				title: "",
				properties: {
					contract: {
						type: "object",
						title: "Contract",
						properties: {
							index: { type: "integer", minimum: 0 },
							subindex: { type: "integer", minimum: 0 },
						},
					},
					id: { type: "string", title: "Id" },
				},
			},
			title: "Exchange Tokens",
		},
	},
};
export type initRequestUi = {
	commission: { numerator: number; denominator: number };
	token_contracts: { index: number; subindex: number }[];
	exchange_tokens: {
		contract: { index: number; subindex: number };
		id: string;
	}[];
};
export const addPaymentTokenRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Add Payment Token Request",
	properties: {
		contract: {
			type: "object",
			title: "Contract",
			properties: {
				index: { type: "integer", minimum: 0 },
				subindex: { type: "integer", minimum: 0 },
			},
		},
		id: { type: "string", title: "Id" },
	},
};
export type AddPaymentTokenRequestUi = {
	contract: { index: number; subindex: number };
	id: string;
};
export const addPaymentTokenErrorJsonSchema: RJSFSchema = {
	type: "object",
	title: "Add Payment Token Error",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"Unauthorized",
				"InvalidExchange",
				"OnlyAccount",
				"InsufficientSupply",
				"InvalidRate",
				"NotListed",
				"InsufficientDeposits",
				"InsufficientPayment",
				"PaymentNotRequired",
				"InvalidDepositData",
				"InvalidListToken",
				"InvalidPaymentToken",
				"InvalidCommission",
				"InvalidSupply",
				"InvalidExchangeRates",
				"Cis2WithdrawError",
				"Cis2SettlementError",
				"Cis2PaymentError",
				"Cis2CommissionPaymentError",
				"CCDPaymentError",
				"CCDCommissionPaymentError",
				"NotDeposited",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "ParseError", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "LogError", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: {
							type: "object",
							title: "Unauthorized",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidExchange"] },
						InvalidExchange: {
							type: "object",
							title: "InvalidExchange",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["OnlyAccount"] },
						OnlyAccount: {
							type: "object",
							title: "OnlyAccount",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientSupply"] },
						InsufficientSupply: {
							type: "object",
							title: "InsufficientSupply",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidRate"] },
						InvalidRate: {
							type: "object",
							title: "InvalidRate",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["NotListed"] },
						NotListed: { type: "object", title: "NotListed", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientDeposits"] },
						InsufficientDeposits: {
							type: "object",
							title: "InsufficientDeposits",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientPayment"] },
						InsufficientPayment: {
							type: "object",
							title: "InsufficientPayment",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["PaymentNotRequired"] },
						PaymentNotRequired: {
							type: "object",
							title: "PaymentNotRequired",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidDepositData"] },
						InvalidDepositData: {
							type: "object",
							title: "InvalidDepositData",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidListToken"] },
						InvalidListToken: {
							type: "object",
							title: "InvalidListToken",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidPaymentToken"] },
						InvalidPaymentToken: {
							type: "object",
							title: "InvalidPaymentToken",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidCommission"] },
						InvalidCommission: {
							type: "object",
							title: "InvalidCommission",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidSupply"] },
						InvalidSupply: {
							type: "object",
							title: "InvalidSupply",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidExchangeRates"] },
						InvalidExchangeRates: {
							type: "object",
							title: "InvalidExchangeRates",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2WithdrawError"] },
						Cis2WithdrawError: {
							type: "object",
							title: "Cis2WithdrawError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2SettlementError"] },
						Cis2SettlementError: {
							type: "object",
							title: "Cis2SettlementError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2PaymentError"] },
						Cis2PaymentError: {
							type: "object",
							title: "Cis2PaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2CommissionPaymentError"] },
						Cis2CommissionPaymentError: {
							type: "object",
							title: "Cis2CommissionPaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["CCDPaymentError"] },
						CCDPaymentError: {
							type: "object",
							title: "CCDPaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["CCDCommissionPaymentError"] },
						CCDCommissionPaymentError: {
							type: "object",
							title: "CCDCommissionPaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["NotDeposited"] },
						NotDeposited: {
							type: "object",
							title: "NotDeposited",
							properties: {},
						},
					},
				},
			],
		},
	},
};
export type AddPaymentTokenErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "InvalidExchange"; InvalidExchange: never }
	| { tag: "OnlyAccount"; OnlyAccount: never }
	| { tag: "InsufficientSupply"; InsufficientSupply: never }
	| { tag: "InvalidRate"; InvalidRate: never }
	| { tag: "NotListed"; NotListed: never }
	| { tag: "InsufficientDeposits"; InsufficientDeposits: never }
	| { tag: "InsufficientPayment"; InsufficientPayment: never }
	| { tag: "PaymentNotRequired"; PaymentNotRequired: never }
	| { tag: "InvalidDepositData"; InvalidDepositData: never }
	| { tag: "InvalidListToken"; InvalidListToken: never }
	| { tag: "InvalidPaymentToken"; InvalidPaymentToken: never }
	| { tag: "InvalidCommission"; InvalidCommission: never }
	| { tag: "InvalidSupply"; InvalidSupply: never }
	| { tag: "InvalidExchangeRates"; InvalidExchangeRates: never }
	| { tag: "Cis2WithdrawError"; Cis2WithdrawError: never }
	| { tag: "Cis2SettlementError"; Cis2SettlementError: never }
	| { tag: "Cis2PaymentError"; Cis2PaymentError: never }
	| { tag: "Cis2CommissionPaymentError"; Cis2CommissionPaymentError: never }
	| { tag: "CCDPaymentError"; CCDPaymentError: never }
	| { tag: "CCDCommissionPaymentError"; CCDCommissionPaymentError: never }
	| { tag: "NotDeposited"; NotDeposited: never };
export const addSellTokenContractRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Add Sell Token Contract Request",
	properties: {
		index: { type: "integer", minimum: 0 },
		subindex: { type: "integer", minimum: 0 },
	},
};
export type AddSellTokenContractRequestUi = { index: number; subindex: number };
export const addSellTokenContractErrorJsonSchema: RJSFSchema = {
	type: "object",
	title: "Add Sell Token Contract Error",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"Unauthorized",
				"InvalidExchange",
				"OnlyAccount",
				"InsufficientSupply",
				"InvalidRate",
				"NotListed",
				"InsufficientDeposits",
				"InsufficientPayment",
				"PaymentNotRequired",
				"InvalidDepositData",
				"InvalidListToken",
				"InvalidPaymentToken",
				"InvalidCommission",
				"InvalidSupply",
				"InvalidExchangeRates",
				"Cis2WithdrawError",
				"Cis2SettlementError",
				"Cis2PaymentError",
				"Cis2CommissionPaymentError",
				"CCDPaymentError",
				"CCDCommissionPaymentError",
				"NotDeposited",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "ParseError", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "LogError", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: {
							type: "object",
							title: "Unauthorized",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidExchange"] },
						InvalidExchange: {
							type: "object",
							title: "InvalidExchange",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["OnlyAccount"] },
						OnlyAccount: {
							type: "object",
							title: "OnlyAccount",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientSupply"] },
						InsufficientSupply: {
							type: "object",
							title: "InsufficientSupply",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidRate"] },
						InvalidRate: {
							type: "object",
							title: "InvalidRate",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["NotListed"] },
						NotListed: { type: "object", title: "NotListed", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientDeposits"] },
						InsufficientDeposits: {
							type: "object",
							title: "InsufficientDeposits",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientPayment"] },
						InsufficientPayment: {
							type: "object",
							title: "InsufficientPayment",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["PaymentNotRequired"] },
						PaymentNotRequired: {
							type: "object",
							title: "PaymentNotRequired",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidDepositData"] },
						InvalidDepositData: {
							type: "object",
							title: "InvalidDepositData",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidListToken"] },
						InvalidListToken: {
							type: "object",
							title: "InvalidListToken",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidPaymentToken"] },
						InvalidPaymentToken: {
							type: "object",
							title: "InvalidPaymentToken",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidCommission"] },
						InvalidCommission: {
							type: "object",
							title: "InvalidCommission",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidSupply"] },
						InvalidSupply: {
							type: "object",
							title: "InvalidSupply",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidExchangeRates"] },
						InvalidExchangeRates: {
							type: "object",
							title: "InvalidExchangeRates",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2WithdrawError"] },
						Cis2WithdrawError: {
							type: "object",
							title: "Cis2WithdrawError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2SettlementError"] },
						Cis2SettlementError: {
							type: "object",
							title: "Cis2SettlementError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2PaymentError"] },
						Cis2PaymentError: {
							type: "object",
							title: "Cis2PaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2CommissionPaymentError"] },
						Cis2CommissionPaymentError: {
							type: "object",
							title: "Cis2CommissionPaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["CCDPaymentError"] },
						CCDPaymentError: {
							type: "object",
							title: "CCDPaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["CCDCommissionPaymentError"] },
						CCDCommissionPaymentError: {
							type: "object",
							title: "CCDCommissionPaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["NotDeposited"] },
						NotDeposited: {
							type: "object",
							title: "NotDeposited",
							properties: {},
						},
					},
				},
			],
		},
	},
};
export type AddSellTokenContractErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "InvalidExchange"; InvalidExchange: never }
	| { tag: "OnlyAccount"; OnlyAccount: never }
	| { tag: "InsufficientSupply"; InsufficientSupply: never }
	| { tag: "InvalidRate"; InvalidRate: never }
	| { tag: "NotListed"; NotListed: never }
	| { tag: "InsufficientDeposits"; InsufficientDeposits: never }
	| { tag: "InsufficientPayment"; InsufficientPayment: never }
	| { tag: "PaymentNotRequired"; PaymentNotRequired: never }
	| { tag: "InvalidDepositData"; InvalidDepositData: never }
	| { tag: "InvalidListToken"; InvalidListToken: never }
	| { tag: "InvalidPaymentToken"; InvalidPaymentToken: never }
	| { tag: "InvalidCommission"; InvalidCommission: never }
	| { tag: "InvalidSupply"; InvalidSupply: never }
	| { tag: "InvalidExchangeRates"; InvalidExchangeRates: never }
	| { tag: "Cis2WithdrawError"; Cis2WithdrawError: never }
	| { tag: "Cis2SettlementError"; Cis2SettlementError: never }
	| { tag: "Cis2PaymentError"; Cis2PaymentError: never }
	| { tag: "Cis2CommissionPaymentError"; Cis2CommissionPaymentError: never }
	| { tag: "CCDPaymentError"; CCDPaymentError: never }
	| { tag: "CCDCommissionPaymentError"; CCDCommissionPaymentError: never }
	| { tag: "NotDeposited"; NotDeposited: never };
export const allowedToListResponseJsonSchema: RJSFSchema = {
	type: "array",
	items: {
		type: "object",
		title: "",
		properties: {
			index: { type: "integer", minimum: 0 },
			subindex: { type: "integer", minimum: 0 },
		},
	},
	title: "Allowed To List Response",
};
export type AllowedToListResponseUi = { index: number; subindex: number }[];
export const balanceOfDepositedRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Balance Of Deposited Request",
	properties: {
		token_id: {
			type: "object",
			title: "Token Id",
			properties: {
				contract: {
					type: "object",
					title: "Contract",
					properties: {
						index: { type: "integer", minimum: 0 },
						subindex: { type: "integer", minimum: 0 },
					},
				},
				id: { type: "string", title: "Id" },
			},
		},
		address: { type: "string", title: "Address" },
	},
};
export type BalanceOfDepositedRequestUi = {
	token_id: { contract: { index: number; subindex: number }; id: string };
	address: string;
};
export const balanceOfDepositedResponseJsonSchema: RJSFSchema = {
	type: "string",
	title: "Balance Of Deposited Response",
};
export type BalanceOfDepositedResponseUi = string;
export const balanceOfDepositedErrorJsonSchema: RJSFSchema = {
	type: "object",
	title: "Balance Of Deposited Error",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"Unauthorized",
				"InvalidExchange",
				"OnlyAccount",
				"InsufficientSupply",
				"InvalidRate",
				"NotListed",
				"InsufficientDeposits",
				"InsufficientPayment",
				"PaymentNotRequired",
				"InvalidDepositData",
				"InvalidListToken",
				"InvalidPaymentToken",
				"InvalidCommission",
				"InvalidSupply",
				"InvalidExchangeRates",
				"Cis2WithdrawError",
				"Cis2SettlementError",
				"Cis2PaymentError",
				"Cis2CommissionPaymentError",
				"CCDPaymentError",
				"CCDCommissionPaymentError",
				"NotDeposited",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "ParseError", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "LogError", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: {
							type: "object",
							title: "Unauthorized",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidExchange"] },
						InvalidExchange: {
							type: "object",
							title: "InvalidExchange",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["OnlyAccount"] },
						OnlyAccount: {
							type: "object",
							title: "OnlyAccount",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientSupply"] },
						InsufficientSupply: {
							type: "object",
							title: "InsufficientSupply",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidRate"] },
						InvalidRate: {
							type: "object",
							title: "InvalidRate",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["NotListed"] },
						NotListed: { type: "object", title: "NotListed", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientDeposits"] },
						InsufficientDeposits: {
							type: "object",
							title: "InsufficientDeposits",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientPayment"] },
						InsufficientPayment: {
							type: "object",
							title: "InsufficientPayment",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["PaymentNotRequired"] },
						PaymentNotRequired: {
							type: "object",
							title: "PaymentNotRequired",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidDepositData"] },
						InvalidDepositData: {
							type: "object",
							title: "InvalidDepositData",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidListToken"] },
						InvalidListToken: {
							type: "object",
							title: "InvalidListToken",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidPaymentToken"] },
						InvalidPaymentToken: {
							type: "object",
							title: "InvalidPaymentToken",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidCommission"] },
						InvalidCommission: {
							type: "object",
							title: "InvalidCommission",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidSupply"] },
						InvalidSupply: {
							type: "object",
							title: "InvalidSupply",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidExchangeRates"] },
						InvalidExchangeRates: {
							type: "object",
							title: "InvalidExchangeRates",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2WithdrawError"] },
						Cis2WithdrawError: {
							type: "object",
							title: "Cis2WithdrawError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2SettlementError"] },
						Cis2SettlementError: {
							type: "object",
							title: "Cis2SettlementError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2PaymentError"] },
						Cis2PaymentError: {
							type: "object",
							title: "Cis2PaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2CommissionPaymentError"] },
						Cis2CommissionPaymentError: {
							type: "object",
							title: "Cis2CommissionPaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["CCDPaymentError"] },
						CCDPaymentError: {
							type: "object",
							title: "CCDPaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["CCDCommissionPaymentError"] },
						CCDCommissionPaymentError: {
							type: "object",
							title: "CCDCommissionPaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["NotDeposited"] },
						NotDeposited: {
							type: "object",
							title: "NotDeposited",
							properties: {},
						},
					},
				},
			],
		},
	},
};
export type BalanceOfDepositedErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "InvalidExchange"; InvalidExchange: never }
	| { tag: "OnlyAccount"; OnlyAccount: never }
	| { tag: "InsufficientSupply"; InsufficientSupply: never }
	| { tag: "InvalidRate"; InvalidRate: never }
	| { tag: "NotListed"; NotListed: never }
	| { tag: "InsufficientDeposits"; InsufficientDeposits: never }
	| { tag: "InsufficientPayment"; InsufficientPayment: never }
	| { tag: "PaymentNotRequired"; PaymentNotRequired: never }
	| { tag: "InvalidDepositData"; InvalidDepositData: never }
	| { tag: "InvalidListToken"; InvalidListToken: never }
	| { tag: "InvalidPaymentToken"; InvalidPaymentToken: never }
	| { tag: "InvalidCommission"; InvalidCommission: never }
	| { tag: "InvalidSupply"; InvalidSupply: never }
	| { tag: "InvalidExchangeRates"; InvalidExchangeRates: never }
	| { tag: "Cis2WithdrawError"; Cis2WithdrawError: never }
	| { tag: "Cis2SettlementError"; Cis2SettlementError: never }
	| { tag: "Cis2PaymentError"; Cis2PaymentError: never }
	| { tag: "Cis2CommissionPaymentError"; Cis2CommissionPaymentError: never }
	| { tag: "CCDPaymentError"; CCDPaymentError: never }
	| { tag: "CCDCommissionPaymentError"; CCDCommissionPaymentError: never }
	| { tag: "NotDeposited"; NotDeposited: never };
export const balanceOfListedRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Balance Of Listed Request",
	properties: {
		token_id: {
			type: "object",
			title: "Token Id",
			properties: {
				contract: {
					type: "object",
					title: "Contract",
					properties: {
						index: { type: "integer", minimum: 0 },
						subindex: { type: "integer", minimum: 0 },
					},
				},
				id: { type: "string", title: "Id" },
			},
		},
		owner: { type: "string", title: "Owner" },
	},
};
export type BalanceOfListedRequestUi = {
	token_id: { contract: { index: number; subindex: number }; id: string };
	owner: string;
};
export const balanceOfListedResponseJsonSchema: RJSFSchema = {
	type: "string",
	title: "Balance Of Listed Response",
};
export type BalanceOfListedResponseUi = string;
export const balanceOfListedErrorJsonSchema: RJSFSchema = {
	type: "object",
	title: "Balance Of Listed Error",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"Unauthorized",
				"InvalidExchange",
				"OnlyAccount",
				"InsufficientSupply",
				"InvalidRate",
				"NotListed",
				"InsufficientDeposits",
				"InsufficientPayment",
				"PaymentNotRequired",
				"InvalidDepositData",
				"InvalidListToken",
				"InvalidPaymentToken",
				"InvalidCommission",
				"InvalidSupply",
				"InvalidExchangeRates",
				"Cis2WithdrawError",
				"Cis2SettlementError",
				"Cis2PaymentError",
				"Cis2CommissionPaymentError",
				"CCDPaymentError",
				"CCDCommissionPaymentError",
				"NotDeposited",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "ParseError", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "LogError", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: {
							type: "object",
							title: "Unauthorized",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidExchange"] },
						InvalidExchange: {
							type: "object",
							title: "InvalidExchange",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["OnlyAccount"] },
						OnlyAccount: {
							type: "object",
							title: "OnlyAccount",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientSupply"] },
						InsufficientSupply: {
							type: "object",
							title: "InsufficientSupply",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidRate"] },
						InvalidRate: {
							type: "object",
							title: "InvalidRate",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["NotListed"] },
						NotListed: { type: "object", title: "NotListed", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientDeposits"] },
						InsufficientDeposits: {
							type: "object",
							title: "InsufficientDeposits",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientPayment"] },
						InsufficientPayment: {
							type: "object",
							title: "InsufficientPayment",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["PaymentNotRequired"] },
						PaymentNotRequired: {
							type: "object",
							title: "PaymentNotRequired",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidDepositData"] },
						InvalidDepositData: {
							type: "object",
							title: "InvalidDepositData",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidListToken"] },
						InvalidListToken: {
							type: "object",
							title: "InvalidListToken",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidPaymentToken"] },
						InvalidPaymentToken: {
							type: "object",
							title: "InvalidPaymentToken",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidCommission"] },
						InvalidCommission: {
							type: "object",
							title: "InvalidCommission",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidSupply"] },
						InvalidSupply: {
							type: "object",
							title: "InvalidSupply",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidExchangeRates"] },
						InvalidExchangeRates: {
							type: "object",
							title: "InvalidExchangeRates",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2WithdrawError"] },
						Cis2WithdrawError: {
							type: "object",
							title: "Cis2WithdrawError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2SettlementError"] },
						Cis2SettlementError: {
							type: "object",
							title: "Cis2SettlementError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2PaymentError"] },
						Cis2PaymentError: {
							type: "object",
							title: "Cis2PaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2CommissionPaymentError"] },
						Cis2CommissionPaymentError: {
							type: "object",
							title: "Cis2CommissionPaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["CCDPaymentError"] },
						CCDPaymentError: {
							type: "object",
							title: "CCDPaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["CCDCommissionPaymentError"] },
						CCDCommissionPaymentError: {
							type: "object",
							title: "CCDCommissionPaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["NotDeposited"] },
						NotDeposited: {
							type: "object",
							title: "NotDeposited",
							properties: {},
						},
					},
				},
			],
		},
	},
};
export type BalanceOfListedErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "InvalidExchange"; InvalidExchange: never }
	| { tag: "OnlyAccount"; OnlyAccount: never }
	| { tag: "InsufficientSupply"; InsufficientSupply: never }
	| { tag: "InvalidRate"; InvalidRate: never }
	| { tag: "NotListed"; NotListed: never }
	| { tag: "InsufficientDeposits"; InsufficientDeposits: never }
	| { tag: "InsufficientPayment"; InsufficientPayment: never }
	| { tag: "PaymentNotRequired"; PaymentNotRequired: never }
	| { tag: "InvalidDepositData"; InvalidDepositData: never }
	| { tag: "InvalidListToken"; InvalidListToken: never }
	| { tag: "InvalidPaymentToken"; InvalidPaymentToken: never }
	| { tag: "InvalidCommission"; InvalidCommission: never }
	| { tag: "InvalidSupply"; InvalidSupply: never }
	| { tag: "InvalidExchangeRates"; InvalidExchangeRates: never }
	| { tag: "Cis2WithdrawError"; Cis2WithdrawError: never }
	| { tag: "Cis2SettlementError"; Cis2SettlementError: never }
	| { tag: "Cis2PaymentError"; Cis2PaymentError: never }
	| { tag: "Cis2CommissionPaymentError"; Cis2CommissionPaymentError: never }
	| { tag: "CCDPaymentError"; CCDPaymentError: never }
	| { tag: "CCDCommissionPaymentError"; CCDCommissionPaymentError: never }
	| { tag: "NotDeposited"; NotDeposited: never };
export const balanceOfUnlistedRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Balance Of Unlisted Request",
	properties: {
		token_id: {
			type: "object",
			title: "Token Id",
			properties: {
				contract: {
					type: "object",
					title: "Contract",
					properties: {
						index: { type: "integer", minimum: 0 },
						subindex: { type: "integer", minimum: 0 },
					},
				},
				id: { type: "string", title: "Id" },
			},
		},
		owner: { type: "string", title: "Owner" },
	},
};
export type BalanceOfUnlistedRequestUi = {
	token_id: { contract: { index: number; subindex: number }; id: string };
	owner: string;
};
export const balanceOfUnlistedResponseJsonSchema: RJSFSchema = {
	type: "string",
	title: "Balance Of Unlisted Response",
};
export type BalanceOfUnlistedResponseUi = string;
export const balanceOfUnlistedErrorJsonSchema: RJSFSchema = {
	type: "object",
	title: "Balance Of Unlisted Error",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"Unauthorized",
				"InvalidExchange",
				"OnlyAccount",
				"InsufficientSupply",
				"InvalidRate",
				"NotListed",
				"InsufficientDeposits",
				"InsufficientPayment",
				"PaymentNotRequired",
				"InvalidDepositData",
				"InvalidListToken",
				"InvalidPaymentToken",
				"InvalidCommission",
				"InvalidSupply",
				"InvalidExchangeRates",
				"Cis2WithdrawError",
				"Cis2SettlementError",
				"Cis2PaymentError",
				"Cis2CommissionPaymentError",
				"CCDPaymentError",
				"CCDCommissionPaymentError",
				"NotDeposited",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "ParseError", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "LogError", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: {
							type: "object",
							title: "Unauthorized",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidExchange"] },
						InvalidExchange: {
							type: "object",
							title: "InvalidExchange",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["OnlyAccount"] },
						OnlyAccount: {
							type: "object",
							title: "OnlyAccount",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientSupply"] },
						InsufficientSupply: {
							type: "object",
							title: "InsufficientSupply",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidRate"] },
						InvalidRate: {
							type: "object",
							title: "InvalidRate",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["NotListed"] },
						NotListed: { type: "object", title: "NotListed", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientDeposits"] },
						InsufficientDeposits: {
							type: "object",
							title: "InsufficientDeposits",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientPayment"] },
						InsufficientPayment: {
							type: "object",
							title: "InsufficientPayment",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["PaymentNotRequired"] },
						PaymentNotRequired: {
							type: "object",
							title: "PaymentNotRequired",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidDepositData"] },
						InvalidDepositData: {
							type: "object",
							title: "InvalidDepositData",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidListToken"] },
						InvalidListToken: {
							type: "object",
							title: "InvalidListToken",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidPaymentToken"] },
						InvalidPaymentToken: {
							type: "object",
							title: "InvalidPaymentToken",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidCommission"] },
						InvalidCommission: {
							type: "object",
							title: "InvalidCommission",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidSupply"] },
						InvalidSupply: {
							type: "object",
							title: "InvalidSupply",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidExchangeRates"] },
						InvalidExchangeRates: {
							type: "object",
							title: "InvalidExchangeRates",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2WithdrawError"] },
						Cis2WithdrawError: {
							type: "object",
							title: "Cis2WithdrawError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2SettlementError"] },
						Cis2SettlementError: {
							type: "object",
							title: "Cis2SettlementError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2PaymentError"] },
						Cis2PaymentError: {
							type: "object",
							title: "Cis2PaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2CommissionPaymentError"] },
						Cis2CommissionPaymentError: {
							type: "object",
							title: "Cis2CommissionPaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["CCDPaymentError"] },
						CCDPaymentError: {
							type: "object",
							title: "CCDPaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["CCDCommissionPaymentError"] },
						CCDCommissionPaymentError: {
							type: "object",
							title: "CCDCommissionPaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["NotDeposited"] },
						NotDeposited: {
							type: "object",
							title: "NotDeposited",
							properties: {},
						},
					},
				},
			],
		},
	},
};
export type BalanceOfUnlistedErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "InvalidExchange"; InvalidExchange: never }
	| { tag: "OnlyAccount"; OnlyAccount: never }
	| { tag: "InsufficientSupply"; InsufficientSupply: never }
	| { tag: "InvalidRate"; InvalidRate: never }
	| { tag: "NotListed"; NotListed: never }
	| { tag: "InsufficientDeposits"; InsufficientDeposits: never }
	| { tag: "InsufficientPayment"; InsufficientPayment: never }
	| { tag: "PaymentNotRequired"; PaymentNotRequired: never }
	| { tag: "InvalidDepositData"; InvalidDepositData: never }
	| { tag: "InvalidListToken"; InvalidListToken: never }
	| { tag: "InvalidPaymentToken"; InvalidPaymentToken: never }
	| { tag: "InvalidCommission"; InvalidCommission: never }
	| { tag: "InvalidSupply"; InvalidSupply: never }
	| { tag: "InvalidExchangeRates"; InvalidExchangeRates: never }
	| { tag: "Cis2WithdrawError"; Cis2WithdrawError: never }
	| { tag: "Cis2SettlementError"; Cis2SettlementError: never }
	| { tag: "Cis2PaymentError"; Cis2PaymentError: never }
	| { tag: "Cis2CommissionPaymentError"; Cis2CommissionPaymentError: never }
	| { tag: "CCDPaymentError"; CCDPaymentError: never }
	| { tag: "CCDCommissionPaymentError"; CCDCommissionPaymentError: never }
	| { tag: "NotDeposited"; NotDeposited: never };
export const calculateAmountsRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Calculate Amounts Request",
	properties: {
		token_id: {
			type: "object",
			title: "Token Id",
			properties: {
				contract: {
					type: "object",
					title: "Contract",
					properties: {
						index: { type: "integer", minimum: 0 },
						subindex: { type: "integer", minimum: 0 },
					},
				},
				id: { type: "string", title: "Id" },
			},
		},
		owner: { type: "string", title: "Owner" },
		amount: { type: "string", title: "Amount" },
		rate: {
			type: "object",
			title: "Rate",
			properties: { tag: { type: "string", enum: ["Ccd", "Cis2"] } },
			required: ["tag"],
			dependencies: {
				tag: {
					oneOf: [
						{
							properties: {
								tag: { enum: ["Ccd"] },
								Ccd: {
									type: "array",
									items: [
										{
											type: "object",
											title: "",
											properties: {
												numerator: {
													type: "integer",
													minimum: 0,
													title: "Numerator",
												},
												denominator: {
													type: "integer",
													minimum: 0,
													title: "Denominator",
												},
											},
										},
									],
								},
							},
						},
						{
							properties: {
								tag: { enum: ["Cis2"] },
								Cis2: {
									type: "array",
									items: [
										{
											type: "array",
											items: [
												{
													type: "object",
													title: "First",
													properties: {
														contract: {
															type: "object",
															title: "Contract",
															properties: {
																index: { type: "integer", minimum: 0 },
																subindex: { type: "integer", minimum: 0 },
															},
														},
														id: { type: "string", title: "Id" },
													},
												},
												{
													type: "object",
													title: "Second",
													properties: {
														numerator: {
															type: "integer",
															minimum: 0,
															title: "Numerator",
														},
														denominator: {
															type: "integer",
															minimum: 0,
															title: "Denominator",
														},
													},
												},
											],
											title: "",
										},
									],
								},
							},
						},
					],
				},
			},
		},
		payer: { type: "string", title: "Payer" },
	},
};
export type CalculateAmountsRequestUi = {
	token_id: { contract: { index: number; subindex: number }; id: string };
	owner: string;
	amount: string;
	rate:
		| { tag: "Ccd"; Ccd: [{ numerator: number; denominator: number }] }
		| {
				tag: "Cis2";
				Cis2: [
					[
						{ contract: { index: number; subindex: number }; id: string },
						{ numerator: number; denominator: number },
					],
				];
		  };
	payer: string;
};
export const calculateAmountsResponseJsonSchema: RJSFSchema = {
	type: "object",
	title: "Calculate Amounts Response",
	properties: {
		buy: { type: "string", title: "Buy" },
		pay: {
			type: "object",
			title: "Pay",
			properties: { tag: { type: "string", enum: ["Cis2", "CCD"] } },
			required: ["tag"],
			dependencies: {
				tag: {
					oneOf: [
						{
							properties: {
								tag: { enum: ["Cis2"] },
								Cis2: { type: "array", items: [{ type: "string", title: "" }] },
							},
						},
						{
							properties: {
								tag: { enum: ["CCD"] },
								CCD: { type: "array", items: [{ type: "string", title: "" }] },
							},
						},
					],
				},
			},
		},
		pay_token: {
			type: "object",
			title: "Pay Token",
			properties: { tag: { type: "string", enum: ["Cis2", "CCD"] } },
			required: ["tag"],
			dependencies: {
				tag: {
					oneOf: [
						{
							properties: {
								tag: { enum: ["Cis2"] },
								Cis2: {
									type: "array",
									items: [
										{
											type: "object",
											title: "",
											properties: {
												contract: {
													type: "object",
													title: "Contract",
													properties: {
														index: { type: "integer", minimum: 0 },
														subindex: { type: "integer", minimum: 0 },
													},
												},
												id: { type: "string", title: "Id" },
											},
										},
									],
								},
							},
						},
						{
							properties: {
								tag: { enum: ["CCD"] },
								CCD: { type: "object", title: "CCD", properties: {} },
							},
						},
					],
				},
			},
		},
		commission: {
			type: "object",
			title: "Commission",
			properties: { tag: { type: "string", enum: ["Cis2", "CCD"] } },
			required: ["tag"],
			dependencies: {
				tag: {
					oneOf: [
						{
							properties: {
								tag: { enum: ["Cis2"] },
								Cis2: { type: "array", items: [{ type: "string", title: "" }] },
							},
						},
						{
							properties: {
								tag: { enum: ["CCD"] },
								CCD: { type: "array", items: [{ type: "string", title: "" }] },
							},
						},
					],
				},
			},
		},
	},
};
export type CalculateAmountsResponseUi = {
	buy: string;
	pay: { tag: "Cis2"; Cis2: [string] } | { tag: "CCD"; CCD: [string] };
	pay_token:
		| {
				tag: "Cis2";
				Cis2: [{ contract: { index: number; subindex: number }; id: string }];
		  }
		| { tag: "CCD"; CCD: never };
	commission: { tag: "Cis2"; Cis2: [string] } | { tag: "CCD"; CCD: [string] };
};
export const calculateAmountsErrorJsonSchema: RJSFSchema = {
	type: "object",
	title: "Calculate Amounts Error",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"Unauthorized",
				"InvalidExchange",
				"OnlyAccount",
				"InsufficientSupply",
				"InvalidRate",
				"NotListed",
				"InsufficientDeposits",
				"InsufficientPayment",
				"PaymentNotRequired",
				"InvalidDepositData",
				"InvalidListToken",
				"InvalidPaymentToken",
				"InvalidCommission",
				"InvalidSupply",
				"InvalidExchangeRates",
				"Cis2WithdrawError",
				"Cis2SettlementError",
				"Cis2PaymentError",
				"Cis2CommissionPaymentError",
				"CCDPaymentError",
				"CCDCommissionPaymentError",
				"NotDeposited",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "ParseError", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "LogError", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: {
							type: "object",
							title: "Unauthorized",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidExchange"] },
						InvalidExchange: {
							type: "object",
							title: "InvalidExchange",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["OnlyAccount"] },
						OnlyAccount: {
							type: "object",
							title: "OnlyAccount",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientSupply"] },
						InsufficientSupply: {
							type: "object",
							title: "InsufficientSupply",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidRate"] },
						InvalidRate: {
							type: "object",
							title: "InvalidRate",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["NotListed"] },
						NotListed: { type: "object", title: "NotListed", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientDeposits"] },
						InsufficientDeposits: {
							type: "object",
							title: "InsufficientDeposits",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientPayment"] },
						InsufficientPayment: {
							type: "object",
							title: "InsufficientPayment",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["PaymentNotRequired"] },
						PaymentNotRequired: {
							type: "object",
							title: "PaymentNotRequired",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidDepositData"] },
						InvalidDepositData: {
							type: "object",
							title: "InvalidDepositData",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidListToken"] },
						InvalidListToken: {
							type: "object",
							title: "InvalidListToken",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidPaymentToken"] },
						InvalidPaymentToken: {
							type: "object",
							title: "InvalidPaymentToken",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidCommission"] },
						InvalidCommission: {
							type: "object",
							title: "InvalidCommission",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidSupply"] },
						InvalidSupply: {
							type: "object",
							title: "InvalidSupply",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidExchangeRates"] },
						InvalidExchangeRates: {
							type: "object",
							title: "InvalidExchangeRates",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2WithdrawError"] },
						Cis2WithdrawError: {
							type: "object",
							title: "Cis2WithdrawError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2SettlementError"] },
						Cis2SettlementError: {
							type: "object",
							title: "Cis2SettlementError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2PaymentError"] },
						Cis2PaymentError: {
							type: "object",
							title: "Cis2PaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2CommissionPaymentError"] },
						Cis2CommissionPaymentError: {
							type: "object",
							title: "Cis2CommissionPaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["CCDPaymentError"] },
						CCDPaymentError: {
							type: "object",
							title: "CCDPaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["CCDCommissionPaymentError"] },
						CCDCommissionPaymentError: {
							type: "object",
							title: "CCDCommissionPaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["NotDeposited"] },
						NotDeposited: {
							type: "object",
							title: "NotDeposited",
							properties: {},
						},
					},
				},
			],
		},
	},
};
export type CalculateAmountsErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "InvalidExchange"; InvalidExchange: never }
	| { tag: "OnlyAccount"; OnlyAccount: never }
	| { tag: "InsufficientSupply"; InsufficientSupply: never }
	| { tag: "InvalidRate"; InvalidRate: never }
	| { tag: "NotListed"; NotListed: never }
	| { tag: "InsufficientDeposits"; InsufficientDeposits: never }
	| { tag: "InsufficientPayment"; InsufficientPayment: never }
	| { tag: "PaymentNotRequired"; PaymentNotRequired: never }
	| { tag: "InvalidDepositData"; InvalidDepositData: never }
	| { tag: "InvalidListToken"; InvalidListToken: never }
	| { tag: "InvalidPaymentToken"; InvalidPaymentToken: never }
	| { tag: "InvalidCommission"; InvalidCommission: never }
	| { tag: "InvalidSupply"; InvalidSupply: never }
	| { tag: "InvalidExchangeRates"; InvalidExchangeRates: never }
	| { tag: "Cis2WithdrawError"; Cis2WithdrawError: never }
	| { tag: "Cis2SettlementError"; Cis2SettlementError: never }
	| { tag: "Cis2PaymentError"; Cis2PaymentError: never }
	| { tag: "Cis2CommissionPaymentError"; Cis2CommissionPaymentError: never }
	| { tag: "CCDPaymentError"; CCDPaymentError: never }
	| { tag: "CCDCommissionPaymentError"; CCDCommissionPaymentError: never }
	| { tag: "NotDeposited"; NotDeposited: never };
export const deListRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "De List Request",
	properties: {
		token_id: {
			type: "object",
			title: "Token Id",
			properties: {
				contract: {
					type: "object",
					title: "Contract",
					properties: {
						index: { type: "integer", minimum: 0 },
						subindex: { type: "integer", minimum: 0 },
					},
				},
				id: { type: "string", title: "Id" },
			},
		},
		owner: { type: "string", title: "Owner" },
	},
};
export type DeListRequestUi = {
	token_id: { contract: { index: number; subindex: number }; id: string };
	owner: string;
};
export const deListErrorJsonSchema: RJSFSchema = {
	type: "object",
	title: "De List Error",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"Unauthorized",
				"InvalidExchange",
				"OnlyAccount",
				"InsufficientSupply",
				"InvalidRate",
				"NotListed",
				"InsufficientDeposits",
				"InsufficientPayment",
				"PaymentNotRequired",
				"InvalidDepositData",
				"InvalidListToken",
				"InvalidPaymentToken",
				"InvalidCommission",
				"InvalidSupply",
				"InvalidExchangeRates",
				"Cis2WithdrawError",
				"Cis2SettlementError",
				"Cis2PaymentError",
				"Cis2CommissionPaymentError",
				"CCDPaymentError",
				"CCDCommissionPaymentError",
				"NotDeposited",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "ParseError", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "LogError", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: {
							type: "object",
							title: "Unauthorized",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidExchange"] },
						InvalidExchange: {
							type: "object",
							title: "InvalidExchange",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["OnlyAccount"] },
						OnlyAccount: {
							type: "object",
							title: "OnlyAccount",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientSupply"] },
						InsufficientSupply: {
							type: "object",
							title: "InsufficientSupply",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidRate"] },
						InvalidRate: {
							type: "object",
							title: "InvalidRate",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["NotListed"] },
						NotListed: { type: "object", title: "NotListed", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientDeposits"] },
						InsufficientDeposits: {
							type: "object",
							title: "InsufficientDeposits",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientPayment"] },
						InsufficientPayment: {
							type: "object",
							title: "InsufficientPayment",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["PaymentNotRequired"] },
						PaymentNotRequired: {
							type: "object",
							title: "PaymentNotRequired",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidDepositData"] },
						InvalidDepositData: {
							type: "object",
							title: "InvalidDepositData",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidListToken"] },
						InvalidListToken: {
							type: "object",
							title: "InvalidListToken",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidPaymentToken"] },
						InvalidPaymentToken: {
							type: "object",
							title: "InvalidPaymentToken",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidCommission"] },
						InvalidCommission: {
							type: "object",
							title: "InvalidCommission",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidSupply"] },
						InvalidSupply: {
							type: "object",
							title: "InvalidSupply",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidExchangeRates"] },
						InvalidExchangeRates: {
							type: "object",
							title: "InvalidExchangeRates",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2WithdrawError"] },
						Cis2WithdrawError: {
							type: "object",
							title: "Cis2WithdrawError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2SettlementError"] },
						Cis2SettlementError: {
							type: "object",
							title: "Cis2SettlementError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2PaymentError"] },
						Cis2PaymentError: {
							type: "object",
							title: "Cis2PaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2CommissionPaymentError"] },
						Cis2CommissionPaymentError: {
							type: "object",
							title: "Cis2CommissionPaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["CCDPaymentError"] },
						CCDPaymentError: {
							type: "object",
							title: "CCDPaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["CCDCommissionPaymentError"] },
						CCDCommissionPaymentError: {
							type: "object",
							title: "CCDCommissionPaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["NotDeposited"] },
						NotDeposited: {
							type: "object",
							title: "NotDeposited",
							properties: {},
						},
					},
				},
			],
		},
	},
};
export type DeListErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "InvalidExchange"; InvalidExchange: never }
	| { tag: "OnlyAccount"; OnlyAccount: never }
	| { tag: "InsufficientSupply"; InsufficientSupply: never }
	| { tag: "InvalidRate"; InvalidRate: never }
	| { tag: "NotListed"; NotListed: never }
	| { tag: "InsufficientDeposits"; InsufficientDeposits: never }
	| { tag: "InsufficientPayment"; InsufficientPayment: never }
	| { tag: "PaymentNotRequired"; PaymentNotRequired: never }
	| { tag: "InvalidDepositData"; InvalidDepositData: never }
	| { tag: "InvalidListToken"; InvalidListToken: never }
	| { tag: "InvalidPaymentToken"; InvalidPaymentToken: never }
	| { tag: "InvalidCommission"; InvalidCommission: never }
	| { tag: "InvalidSupply"; InvalidSupply: never }
	| { tag: "InvalidExchangeRates"; InvalidExchangeRates: never }
	| { tag: "Cis2WithdrawError"; Cis2WithdrawError: never }
	| { tag: "Cis2SettlementError"; Cis2SettlementError: never }
	| { tag: "Cis2PaymentError"; Cis2PaymentError: never }
	| { tag: "Cis2CommissionPaymentError"; Cis2CommissionPaymentError: never }
	| { tag: "CCDPaymentError"; CCDPaymentError: never }
	| { tag: "CCDCommissionPaymentError"; CCDCommissionPaymentError: never }
	| { tag: "NotDeposited"; NotDeposited: never };
export const depositRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Deposit Request",
	properties: {
		token_id: { type: "string", title: "Token Id" },
		amount: { type: "string", title: "Amount" },
		from: {
			type: "object",
			title: "From",
			properties: { tag: { type: "string", enum: ["Account", "Contract"] } },
			required: ["tag"],
			dependencies: {
				tag: {
					oneOf: [
						{
							properties: {
								tag: { enum: ["Account"] },
								Account: {
									type: "array",
									items: [{ type: "string", title: "" }],
								},
							},
						},
						{
							properties: {
								tag: { enum: ["Contract"] },
								Contract: {
									type: "array",
									items: [
										{
											type: "object",
											title: "",
											properties: {
												index: { type: "integer", minimum: 0 },
												subindex: { type: "integer", minimum: 0 },
											},
										},
									],
								},
							},
						},
					],
				},
			},
		},
		data: { type: "string", title: "Data" },
	},
};
export type DepositRequestUi = {
	token_id: string;
	amount: string;
	from:
		| { tag: "Account"; Account: [string] }
		| { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
	data: string;
};
export const depositErrorJsonSchema: RJSFSchema = {
	type: "object",
	title: "Deposit Error",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"Unauthorized",
				"InvalidExchange",
				"OnlyAccount",
				"InsufficientSupply",
				"InvalidRate",
				"NotListed",
				"InsufficientDeposits",
				"InsufficientPayment",
				"PaymentNotRequired",
				"InvalidDepositData",
				"InvalidListToken",
				"InvalidPaymentToken",
				"InvalidCommission",
				"InvalidSupply",
				"InvalidExchangeRates",
				"Cis2WithdrawError",
				"Cis2SettlementError",
				"Cis2PaymentError",
				"Cis2CommissionPaymentError",
				"CCDPaymentError",
				"CCDCommissionPaymentError",
				"NotDeposited",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "ParseError", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "LogError", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: {
							type: "object",
							title: "Unauthorized",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidExchange"] },
						InvalidExchange: {
							type: "object",
							title: "InvalidExchange",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["OnlyAccount"] },
						OnlyAccount: {
							type: "object",
							title: "OnlyAccount",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientSupply"] },
						InsufficientSupply: {
							type: "object",
							title: "InsufficientSupply",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidRate"] },
						InvalidRate: {
							type: "object",
							title: "InvalidRate",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["NotListed"] },
						NotListed: { type: "object", title: "NotListed", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientDeposits"] },
						InsufficientDeposits: {
							type: "object",
							title: "InsufficientDeposits",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientPayment"] },
						InsufficientPayment: {
							type: "object",
							title: "InsufficientPayment",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["PaymentNotRequired"] },
						PaymentNotRequired: {
							type: "object",
							title: "PaymentNotRequired",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidDepositData"] },
						InvalidDepositData: {
							type: "object",
							title: "InvalidDepositData",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidListToken"] },
						InvalidListToken: {
							type: "object",
							title: "InvalidListToken",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidPaymentToken"] },
						InvalidPaymentToken: {
							type: "object",
							title: "InvalidPaymentToken",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidCommission"] },
						InvalidCommission: {
							type: "object",
							title: "InvalidCommission",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidSupply"] },
						InvalidSupply: {
							type: "object",
							title: "InvalidSupply",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidExchangeRates"] },
						InvalidExchangeRates: {
							type: "object",
							title: "InvalidExchangeRates",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2WithdrawError"] },
						Cis2WithdrawError: {
							type: "object",
							title: "Cis2WithdrawError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2SettlementError"] },
						Cis2SettlementError: {
							type: "object",
							title: "Cis2SettlementError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2PaymentError"] },
						Cis2PaymentError: {
							type: "object",
							title: "Cis2PaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2CommissionPaymentError"] },
						Cis2CommissionPaymentError: {
							type: "object",
							title: "Cis2CommissionPaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["CCDPaymentError"] },
						CCDPaymentError: {
							type: "object",
							title: "CCDPaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["CCDCommissionPaymentError"] },
						CCDCommissionPaymentError: {
							type: "object",
							title: "CCDCommissionPaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["NotDeposited"] },
						NotDeposited: {
							type: "object",
							title: "NotDeposited",
							properties: {},
						},
					},
				},
			],
		},
	},
};
export type DepositErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "InvalidExchange"; InvalidExchange: never }
	| { tag: "OnlyAccount"; OnlyAccount: never }
	| { tag: "InsufficientSupply"; InsufficientSupply: never }
	| { tag: "InvalidRate"; InvalidRate: never }
	| { tag: "NotListed"; NotListed: never }
	| { tag: "InsufficientDeposits"; InsufficientDeposits: never }
	| { tag: "InsufficientPayment"; InsufficientPayment: never }
	| { tag: "PaymentNotRequired"; PaymentNotRequired: never }
	| { tag: "InvalidDepositData"; InvalidDepositData: never }
	| { tag: "InvalidListToken"; InvalidListToken: never }
	| { tag: "InvalidPaymentToken"; InvalidPaymentToken: never }
	| { tag: "InvalidCommission"; InvalidCommission: never }
	| { tag: "InvalidSupply"; InvalidSupply: never }
	| { tag: "InvalidExchangeRates"; InvalidExchangeRates: never }
	| { tag: "Cis2WithdrawError"; Cis2WithdrawError: never }
	| { tag: "Cis2SettlementError"; Cis2SettlementError: never }
	| { tag: "Cis2PaymentError"; Cis2PaymentError: never }
	| { tag: "Cis2CommissionPaymentError"; Cis2CommissionPaymentError: never }
	| { tag: "CCDPaymentError"; CCDPaymentError: never }
	| { tag: "CCDCommissionPaymentError"; CCDCommissionPaymentError: never }
	| { tag: "NotDeposited"; NotDeposited: never };
export const exchangeRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Exchange Request",
	properties: {
		token_id: {
			type: "object",
			title: "Token Id",
			properties: {
				contract: {
					type: "object",
					title: "Contract",
					properties: {
						index: { type: "integer", minimum: 0 },
						subindex: { type: "integer", minimum: 0 },
					},
				},
				id: { type: "string", title: "Id" },
			},
		},
		owner: { type: "string", title: "Owner" },
		amount: { type: "string", title: "Amount" },
		rate: {
			type: "object",
			title: "Rate",
			properties: { tag: { type: "string", enum: ["Ccd", "Cis2"] } },
			required: ["tag"],
			dependencies: {
				tag: {
					oneOf: [
						{
							properties: {
								tag: { enum: ["Ccd"] },
								Ccd: {
									type: "array",
									items: [
										{
											type: "object",
											title: "",
											properties: {
												numerator: {
													type: "integer",
													minimum: 0,
													title: "Numerator",
												},
												denominator: {
													type: "integer",
													minimum: 0,
													title: "Denominator",
												},
											},
										},
									],
								},
							},
						},
						{
							properties: {
								tag: { enum: ["Cis2"] },
								Cis2: {
									type: "array",
									items: [
										{
											type: "array",
											items: [
												{
													type: "object",
													title: "First",
													properties: {
														contract: {
															type: "object",
															title: "Contract",
															properties: {
																index: { type: "integer", minimum: 0 },
																subindex: { type: "integer", minimum: 0 },
															},
														},
														id: { type: "string", title: "Id" },
													},
												},
												{
													type: "object",
													title: "Second",
													properties: {
														numerator: {
															type: "integer",
															minimum: 0,
															title: "Numerator",
														},
														denominator: {
															type: "integer",
															minimum: 0,
															title: "Denominator",
														},
													},
												},
											],
											title: "",
										},
									],
								},
							},
						},
					],
				},
			},
		},
		payer: { type: "string", title: "Payer" },
	},
};
export type ExchangeRequestUi = {
	token_id: { contract: { index: number; subindex: number }; id: string };
	owner: string;
	amount: string;
	rate:
		| { tag: "Ccd"; Ccd: [{ numerator: number; denominator: number }] }
		| {
				tag: "Cis2";
				Cis2: [
					[
						{ contract: { index: number; subindex: number }; id: string },
						{ numerator: number; denominator: number },
					],
				];
		  };
	payer: string;
};
export const exchangeErrorJsonSchema: RJSFSchema = {
	type: "object",
	title: "Exchange Error",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"Unauthorized",
				"InvalidExchange",
				"OnlyAccount",
				"InsufficientSupply",
				"InvalidRate",
				"NotListed",
				"InsufficientDeposits",
				"InsufficientPayment",
				"PaymentNotRequired",
				"InvalidDepositData",
				"InvalidListToken",
				"InvalidPaymentToken",
				"InvalidCommission",
				"InvalidSupply",
				"InvalidExchangeRates",
				"Cis2WithdrawError",
				"Cis2SettlementError",
				"Cis2PaymentError",
				"Cis2CommissionPaymentError",
				"CCDPaymentError",
				"CCDCommissionPaymentError",
				"NotDeposited",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "ParseError", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "LogError", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: {
							type: "object",
							title: "Unauthorized",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidExchange"] },
						InvalidExchange: {
							type: "object",
							title: "InvalidExchange",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["OnlyAccount"] },
						OnlyAccount: {
							type: "object",
							title: "OnlyAccount",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientSupply"] },
						InsufficientSupply: {
							type: "object",
							title: "InsufficientSupply",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidRate"] },
						InvalidRate: {
							type: "object",
							title: "InvalidRate",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["NotListed"] },
						NotListed: { type: "object", title: "NotListed", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientDeposits"] },
						InsufficientDeposits: {
							type: "object",
							title: "InsufficientDeposits",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientPayment"] },
						InsufficientPayment: {
							type: "object",
							title: "InsufficientPayment",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["PaymentNotRequired"] },
						PaymentNotRequired: {
							type: "object",
							title: "PaymentNotRequired",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidDepositData"] },
						InvalidDepositData: {
							type: "object",
							title: "InvalidDepositData",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidListToken"] },
						InvalidListToken: {
							type: "object",
							title: "InvalidListToken",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidPaymentToken"] },
						InvalidPaymentToken: {
							type: "object",
							title: "InvalidPaymentToken",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidCommission"] },
						InvalidCommission: {
							type: "object",
							title: "InvalidCommission",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidSupply"] },
						InvalidSupply: {
							type: "object",
							title: "InvalidSupply",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidExchangeRates"] },
						InvalidExchangeRates: {
							type: "object",
							title: "InvalidExchangeRates",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2WithdrawError"] },
						Cis2WithdrawError: {
							type: "object",
							title: "Cis2WithdrawError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2SettlementError"] },
						Cis2SettlementError: {
							type: "object",
							title: "Cis2SettlementError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2PaymentError"] },
						Cis2PaymentError: {
							type: "object",
							title: "Cis2PaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2CommissionPaymentError"] },
						Cis2CommissionPaymentError: {
							type: "object",
							title: "Cis2CommissionPaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["CCDPaymentError"] },
						CCDPaymentError: {
							type: "object",
							title: "CCDPaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["CCDCommissionPaymentError"] },
						CCDCommissionPaymentError: {
							type: "object",
							title: "CCDCommissionPaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["NotDeposited"] },
						NotDeposited: {
							type: "object",
							title: "NotDeposited",
							properties: {},
						},
					},
				},
			],
		},
	},
};
export type ExchangeErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "InvalidExchange"; InvalidExchange: never }
	| { tag: "OnlyAccount"; OnlyAccount: never }
	| { tag: "InsufficientSupply"; InsufficientSupply: never }
	| { tag: "InvalidRate"; InvalidRate: never }
	| { tag: "NotListed"; NotListed: never }
	| { tag: "InsufficientDeposits"; InsufficientDeposits: never }
	| { tag: "InsufficientPayment"; InsufficientPayment: never }
	| { tag: "PaymentNotRequired"; PaymentNotRequired: never }
	| { tag: "InvalidDepositData"; InvalidDepositData: never }
	| { tag: "InvalidListToken"; InvalidListToken: never }
	| { tag: "InvalidPaymentToken"; InvalidPaymentToken: never }
	| { tag: "InvalidCommission"; InvalidCommission: never }
	| { tag: "InvalidSupply"; InvalidSupply: never }
	| { tag: "InvalidExchangeRates"; InvalidExchangeRates: never }
	| { tag: "Cis2WithdrawError"; Cis2WithdrawError: never }
	| { tag: "Cis2SettlementError"; Cis2SettlementError: never }
	| { tag: "Cis2PaymentError"; Cis2PaymentError: never }
	| { tag: "Cis2CommissionPaymentError"; Cis2CommissionPaymentError: never }
	| { tag: "CCDPaymentError"; CCDPaymentError: never }
	| { tag: "CCDCommissionPaymentError"; CCDCommissionPaymentError: never }
	| { tag: "NotDeposited"; NotDeposited: never };
export const getListedRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Get Listed Request",
	properties: {
		token_id: {
			type: "object",
			title: "Token Id",
			properties: {
				contract: {
					type: "object",
					title: "Contract",
					properties: {
						index: { type: "integer", minimum: 0 },
						subindex: { type: "integer", minimum: 0 },
					},
				},
				id: { type: "string", title: "Id" },
			},
		},
		owner: { type: "string", title: "Owner" },
	},
};
export type GetListedRequestUi = {
	token_id: { contract: { index: number; subindex: number }; id: string };
	owner: string;
};
export const getListedResponseJsonSchema: RJSFSchema = {
	type: "object",
	title: "Get Listed Response",
	properties: {
		token_id: {
			type: "object",
			title: "Token Id",
			properties: {
				contract: {
					type: "object",
					title: "Contract",
					properties: {
						index: { type: "integer", minimum: 0 },
						subindex: { type: "integer", minimum: 0 },
					},
				},
				id: { type: "string", title: "Id" },
			},
		},
		owner: { type: "string", title: "Owner" },
		exchange_rates: {
			type: "array",
			items: {
				type: "object",
				title: "",
				properties: { tag: { type: "string", enum: ["Ccd", "Cis2"] } },
				required: ["tag"],
				dependencies: {
					tag: {
						oneOf: [
							{
								properties: {
									tag: { enum: ["Ccd"] },
									Ccd: {
										type: "array",
										items: [
											{
												type: "object",
												title: "",
												properties: {
													numerator: {
														type: "integer",
														minimum: 0,
														title: "Numerator",
													},
													denominator: {
														type: "integer",
														minimum: 0,
														title: "Denominator",
													},
												},
											},
										],
									},
								},
							},
							{
								properties: {
									tag: { enum: ["Cis2"] },
									Cis2: {
										type: "array",
										items: [
											{
												type: "array",
												items: [
													{
														type: "object",
														title: "First",
														properties: {
															contract: {
																type: "object",
																title: "Contract",
																properties: {
																	index: { type: "integer", minimum: 0 },
																	subindex: { type: "integer", minimum: 0 },
																},
															},
															id: { type: "string", title: "Id" },
														},
													},
													{
														type: "object",
														title: "Second",
														properties: {
															numerator: {
																type: "integer",
																minimum: 0,
																title: "Numerator",
															},
															denominator: {
																type: "integer",
																minimum: 0,
																title: "Denominator",
															},
														},
													},
												],
												title: "",
											},
										],
									},
								},
							},
						],
					},
				},
			},
			title: "Exchange Rates",
		},
		supply: { type: "string", title: "Supply" },
	},
};
export type GetListedResponseUi = {
	token_id: { contract: { index: number; subindex: number }; id: string };
	owner: string;
	exchange_rates:
		| { tag: "Ccd"; Ccd: [{ numerator: number; denominator: number }] }
		| {
				tag: "Cis2";
				Cis2: [
					[
						{ contract: { index: number; subindex: number }; id: string },
						{ numerator: number; denominator: number },
					],
				];
		  }[];
	supply: string;
};
export const getListedErrorJsonSchema: RJSFSchema = {
	type: "object",
	title: "Get Listed Error",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"Unauthorized",
				"InvalidExchange",
				"OnlyAccount",
				"InsufficientSupply",
				"InvalidRate",
				"NotListed",
				"InsufficientDeposits",
				"InsufficientPayment",
				"PaymentNotRequired",
				"InvalidDepositData",
				"InvalidListToken",
				"InvalidPaymentToken",
				"InvalidCommission",
				"InvalidSupply",
				"InvalidExchangeRates",
				"Cis2WithdrawError",
				"Cis2SettlementError",
				"Cis2PaymentError",
				"Cis2CommissionPaymentError",
				"CCDPaymentError",
				"CCDCommissionPaymentError",
				"NotDeposited",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "ParseError", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "LogError", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: {
							type: "object",
							title: "Unauthorized",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidExchange"] },
						InvalidExchange: {
							type: "object",
							title: "InvalidExchange",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["OnlyAccount"] },
						OnlyAccount: {
							type: "object",
							title: "OnlyAccount",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientSupply"] },
						InsufficientSupply: {
							type: "object",
							title: "InsufficientSupply",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidRate"] },
						InvalidRate: {
							type: "object",
							title: "InvalidRate",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["NotListed"] },
						NotListed: { type: "object", title: "NotListed", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientDeposits"] },
						InsufficientDeposits: {
							type: "object",
							title: "InsufficientDeposits",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientPayment"] },
						InsufficientPayment: {
							type: "object",
							title: "InsufficientPayment",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["PaymentNotRequired"] },
						PaymentNotRequired: {
							type: "object",
							title: "PaymentNotRequired",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidDepositData"] },
						InvalidDepositData: {
							type: "object",
							title: "InvalidDepositData",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidListToken"] },
						InvalidListToken: {
							type: "object",
							title: "InvalidListToken",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidPaymentToken"] },
						InvalidPaymentToken: {
							type: "object",
							title: "InvalidPaymentToken",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidCommission"] },
						InvalidCommission: {
							type: "object",
							title: "InvalidCommission",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidSupply"] },
						InvalidSupply: {
							type: "object",
							title: "InvalidSupply",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidExchangeRates"] },
						InvalidExchangeRates: {
							type: "object",
							title: "InvalidExchangeRates",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2WithdrawError"] },
						Cis2WithdrawError: {
							type: "object",
							title: "Cis2WithdrawError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2SettlementError"] },
						Cis2SettlementError: {
							type: "object",
							title: "Cis2SettlementError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2PaymentError"] },
						Cis2PaymentError: {
							type: "object",
							title: "Cis2PaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2CommissionPaymentError"] },
						Cis2CommissionPaymentError: {
							type: "object",
							title: "Cis2CommissionPaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["CCDPaymentError"] },
						CCDPaymentError: {
							type: "object",
							title: "CCDPaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["CCDCommissionPaymentError"] },
						CCDCommissionPaymentError: {
							type: "object",
							title: "CCDCommissionPaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["NotDeposited"] },
						NotDeposited: {
							type: "object",
							title: "NotDeposited",
							properties: {},
						},
					},
				},
			],
		},
	},
};
export type GetListedErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "InvalidExchange"; InvalidExchange: never }
	| { tag: "OnlyAccount"; OnlyAccount: never }
	| { tag: "InsufficientSupply"; InsufficientSupply: never }
	| { tag: "InvalidRate"; InvalidRate: never }
	| { tag: "NotListed"; NotListed: never }
	| { tag: "InsufficientDeposits"; InsufficientDeposits: never }
	| { tag: "InsufficientPayment"; InsufficientPayment: never }
	| { tag: "PaymentNotRequired"; PaymentNotRequired: never }
	| { tag: "InvalidDepositData"; InvalidDepositData: never }
	| { tag: "InvalidListToken"; InvalidListToken: never }
	| { tag: "InvalidPaymentToken"; InvalidPaymentToken: never }
	| { tag: "InvalidCommission"; InvalidCommission: never }
	| { tag: "InvalidSupply"; InvalidSupply: never }
	| { tag: "InvalidExchangeRates"; InvalidExchangeRates: never }
	| { tag: "Cis2WithdrawError"; Cis2WithdrawError: never }
	| { tag: "Cis2SettlementError"; Cis2SettlementError: never }
	| { tag: "Cis2PaymentError"; Cis2PaymentError: never }
	| { tag: "Cis2CommissionPaymentError"; Cis2CommissionPaymentError: never }
	| { tag: "CCDPaymentError"; CCDPaymentError: never }
	| { tag: "CCDCommissionPaymentError"; CCDCommissionPaymentError: never }
	| { tag: "NotDeposited"; NotDeposited: never };
export const listRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "List Request",
	properties: {
		token_id: {
			type: "object",
			title: "Token Id",
			properties: {
				contract: {
					type: "object",
					title: "Contract",
					properties: {
						index: { type: "integer", minimum: 0 },
						subindex: { type: "integer", minimum: 0 },
					},
				},
				id: { type: "string", title: "Id" },
			},
		},
		owner: { type: "string", title: "Owner" },
		exchange_rates: {
			type: "array",
			items: {
				type: "object",
				title: "",
				properties: { tag: { type: "string", enum: ["Ccd", "Cis2"] } },
				required: ["tag"],
				dependencies: {
					tag: {
						oneOf: [
							{
								properties: {
									tag: { enum: ["Ccd"] },
									Ccd: {
										type: "array",
										items: [
											{
												type: "object",
												title: "",
												properties: {
													numerator: {
														type: "integer",
														minimum: 0,
														title: "Numerator",
													},
													denominator: {
														type: "integer",
														minimum: 0,
														title: "Denominator",
													},
												},
											},
										],
									},
								},
							},
							{
								properties: {
									tag: { enum: ["Cis2"] },
									Cis2: {
										type: "array",
										items: [
											{
												type: "array",
												items: [
													{
														type: "object",
														title: "First",
														properties: {
															contract: {
																type: "object",
																title: "Contract",
																properties: {
																	index: { type: "integer", minimum: 0 },
																	subindex: { type: "integer", minimum: 0 },
																},
															},
															id: { type: "string", title: "Id" },
														},
													},
													{
														type: "object",
														title: "Second",
														properties: {
															numerator: {
																type: "integer",
																minimum: 0,
																title: "Numerator",
															},
															denominator: {
																type: "integer",
																minimum: 0,
																title: "Denominator",
															},
														},
													},
												],
												title: "",
											},
										],
									},
								},
							},
						],
					},
				},
			},
			title: "Exchange Rates",
		},
		supply: { type: "string", title: "Supply" },
	},
};
export type ListRequestUi = {
	token_id: { contract: { index: number; subindex: number }; id: string };
	owner: string;
	exchange_rates:
		| { tag: "Ccd"; Ccd: [{ numerator: number; denominator: number }] }
		| {
				tag: "Cis2";
				Cis2: [
					[
						{ contract: { index: number; subindex: number }; id: string },
						{ numerator: number; denominator: number },
					],
				];
		  }[];
	supply: string;
};
export const listErrorJsonSchema: RJSFSchema = {
	type: "object",
	title: "List Error",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"Unauthorized",
				"InvalidExchange",
				"OnlyAccount",
				"InsufficientSupply",
				"InvalidRate",
				"NotListed",
				"InsufficientDeposits",
				"InsufficientPayment",
				"PaymentNotRequired",
				"InvalidDepositData",
				"InvalidListToken",
				"InvalidPaymentToken",
				"InvalidCommission",
				"InvalidSupply",
				"InvalidExchangeRates",
				"Cis2WithdrawError",
				"Cis2SettlementError",
				"Cis2PaymentError",
				"Cis2CommissionPaymentError",
				"CCDPaymentError",
				"CCDCommissionPaymentError",
				"NotDeposited",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "ParseError", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "LogError", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: {
							type: "object",
							title: "Unauthorized",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidExchange"] },
						InvalidExchange: {
							type: "object",
							title: "InvalidExchange",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["OnlyAccount"] },
						OnlyAccount: {
							type: "object",
							title: "OnlyAccount",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientSupply"] },
						InsufficientSupply: {
							type: "object",
							title: "InsufficientSupply",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidRate"] },
						InvalidRate: {
							type: "object",
							title: "InvalidRate",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["NotListed"] },
						NotListed: { type: "object", title: "NotListed", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientDeposits"] },
						InsufficientDeposits: {
							type: "object",
							title: "InsufficientDeposits",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientPayment"] },
						InsufficientPayment: {
							type: "object",
							title: "InsufficientPayment",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["PaymentNotRequired"] },
						PaymentNotRequired: {
							type: "object",
							title: "PaymentNotRequired",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidDepositData"] },
						InvalidDepositData: {
							type: "object",
							title: "InvalidDepositData",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidListToken"] },
						InvalidListToken: {
							type: "object",
							title: "InvalidListToken",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidPaymentToken"] },
						InvalidPaymentToken: {
							type: "object",
							title: "InvalidPaymentToken",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidCommission"] },
						InvalidCommission: {
							type: "object",
							title: "InvalidCommission",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidSupply"] },
						InvalidSupply: {
							type: "object",
							title: "InvalidSupply",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidExchangeRates"] },
						InvalidExchangeRates: {
							type: "object",
							title: "InvalidExchangeRates",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2WithdrawError"] },
						Cis2WithdrawError: {
							type: "object",
							title: "Cis2WithdrawError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2SettlementError"] },
						Cis2SettlementError: {
							type: "object",
							title: "Cis2SettlementError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2PaymentError"] },
						Cis2PaymentError: {
							type: "object",
							title: "Cis2PaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2CommissionPaymentError"] },
						Cis2CommissionPaymentError: {
							type: "object",
							title: "Cis2CommissionPaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["CCDPaymentError"] },
						CCDPaymentError: {
							type: "object",
							title: "CCDPaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["CCDCommissionPaymentError"] },
						CCDCommissionPaymentError: {
							type: "object",
							title: "CCDCommissionPaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["NotDeposited"] },
						NotDeposited: {
							type: "object",
							title: "NotDeposited",
							properties: {},
						},
					},
				},
			],
		},
	},
};
export type ListErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "InvalidExchange"; InvalidExchange: never }
	| { tag: "OnlyAccount"; OnlyAccount: never }
	| { tag: "InsufficientSupply"; InsufficientSupply: never }
	| { tag: "InvalidRate"; InvalidRate: never }
	| { tag: "NotListed"; NotListed: never }
	| { tag: "InsufficientDeposits"; InsufficientDeposits: never }
	| { tag: "InsufficientPayment"; InsufficientPayment: never }
	| { tag: "PaymentNotRequired"; PaymentNotRequired: never }
	| { tag: "InvalidDepositData"; InvalidDepositData: never }
	| { tag: "InvalidListToken"; InvalidListToken: never }
	| { tag: "InvalidPaymentToken"; InvalidPaymentToken: never }
	| { tag: "InvalidCommission"; InvalidCommission: never }
	| { tag: "InvalidSupply"; InvalidSupply: never }
	| { tag: "InvalidExchangeRates"; InvalidExchangeRates: never }
	| { tag: "Cis2WithdrawError"; Cis2WithdrawError: never }
	| { tag: "Cis2SettlementError"; Cis2SettlementError: never }
	| { tag: "Cis2PaymentError"; Cis2PaymentError: never }
	| { tag: "Cis2CommissionPaymentError"; Cis2CommissionPaymentError: never }
	| { tag: "CCDPaymentError"; CCDPaymentError: never }
	| { tag: "CCDCommissionPaymentError"; CCDCommissionPaymentError: never }
	| { tag: "NotDeposited"; NotDeposited: never };
export const paymentTokensResponseJsonSchema: RJSFSchema = {
	type: "array",
	items: {
		type: "object",
		title: "",
		properties: {
			contract: {
				type: "object",
				title: "Contract",
				properties: {
					index: { type: "integer", minimum: 0 },
					subindex: { type: "integer", minimum: 0 },
				},
			},
			id: { type: "string", title: "Id" },
		},
	},
	title: "Payment Tokens Response",
};
export type PaymentTokensResponseUi = {
	contract: { index: number; subindex: number };
	id: string;
}[];
export const withdrawRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Withdraw Request",
	properties: {
		token_id: {
			type: "object",
			title: "Token Id",
			properties: {
				contract: {
					type: "object",
					title: "Contract",
					properties: {
						index: { type: "integer", minimum: 0 },
						subindex: { type: "integer", minimum: 0 },
					},
				},
				id: { type: "string", title: "Id" },
			},
		},
		owner: { type: "string", title: "Owner" },
		amount: { type: "string", title: "Amount" },
	},
};
export type WithdrawRequestUi = {
	token_id: { contract: { index: number; subindex: number }; id: string };
	owner: string;
	amount: string;
};
export const withdrawErrorJsonSchema: RJSFSchema = {
	type: "object",
	title: "Withdraw Error",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"LogError",
				"Unauthorized",
				"InvalidExchange",
				"OnlyAccount",
				"InsufficientSupply",
				"InvalidRate",
				"NotListed",
				"InsufficientDeposits",
				"InsufficientPayment",
				"PaymentNotRequired",
				"InvalidDepositData",
				"InvalidListToken",
				"InvalidPaymentToken",
				"InvalidCommission",
				"InvalidSupply",
				"InvalidExchangeRates",
				"Cis2WithdrawError",
				"Cis2SettlementError",
				"Cis2PaymentError",
				"Cis2CommissionPaymentError",
				"CCDPaymentError",
				"CCDCommissionPaymentError",
				"NotDeposited",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "ParseError", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "LogError", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: {
							type: "object",
							title: "Unauthorized",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidExchange"] },
						InvalidExchange: {
							type: "object",
							title: "InvalidExchange",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["OnlyAccount"] },
						OnlyAccount: {
							type: "object",
							title: "OnlyAccount",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientSupply"] },
						InsufficientSupply: {
							type: "object",
							title: "InsufficientSupply",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidRate"] },
						InvalidRate: {
							type: "object",
							title: "InvalidRate",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["NotListed"] },
						NotListed: { type: "object", title: "NotListed", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientDeposits"] },
						InsufficientDeposits: {
							type: "object",
							title: "InsufficientDeposits",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InsufficientPayment"] },
						InsufficientPayment: {
							type: "object",
							title: "InsufficientPayment",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["PaymentNotRequired"] },
						PaymentNotRequired: {
							type: "object",
							title: "PaymentNotRequired",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidDepositData"] },
						InvalidDepositData: {
							type: "object",
							title: "InvalidDepositData",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidListToken"] },
						InvalidListToken: {
							type: "object",
							title: "InvalidListToken",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidPaymentToken"] },
						InvalidPaymentToken: {
							type: "object",
							title: "InvalidPaymentToken",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidCommission"] },
						InvalidCommission: {
							type: "object",
							title: "InvalidCommission",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidSupply"] },
						InvalidSupply: {
							type: "object",
							title: "InvalidSupply",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidExchangeRates"] },
						InvalidExchangeRates: {
							type: "object",
							title: "InvalidExchangeRates",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2WithdrawError"] },
						Cis2WithdrawError: {
							type: "object",
							title: "Cis2WithdrawError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2SettlementError"] },
						Cis2SettlementError: {
							type: "object",
							title: "Cis2SettlementError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2PaymentError"] },
						Cis2PaymentError: {
							type: "object",
							title: "Cis2PaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2CommissionPaymentError"] },
						Cis2CommissionPaymentError: {
							type: "object",
							title: "Cis2CommissionPaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["CCDPaymentError"] },
						CCDPaymentError: {
							type: "object",
							title: "CCDPaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["CCDCommissionPaymentError"] },
						CCDCommissionPaymentError: {
							type: "object",
							title: "CCDCommissionPaymentError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["NotDeposited"] },
						NotDeposited: {
							type: "object",
							title: "NotDeposited",
							properties: {},
						},
					},
				},
			],
		},
	},
};
export type WithdrawErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "LogError"; LogError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "InvalidExchange"; InvalidExchange: never }
	| { tag: "OnlyAccount"; OnlyAccount: never }
	| { tag: "InsufficientSupply"; InsufficientSupply: never }
	| { tag: "InvalidRate"; InvalidRate: never }
	| { tag: "NotListed"; NotListed: never }
	| { tag: "InsufficientDeposits"; InsufficientDeposits: never }
	| { tag: "InsufficientPayment"; InsufficientPayment: never }
	| { tag: "PaymentNotRequired"; PaymentNotRequired: never }
	| { tag: "InvalidDepositData"; InvalidDepositData: never }
	| { tag: "InvalidListToken"; InvalidListToken: never }
	| { tag: "InvalidPaymentToken"; InvalidPaymentToken: never }
	| { tag: "InvalidCommission"; InvalidCommission: never }
	| { tag: "InvalidSupply"; InvalidSupply: never }
	| { tag: "InvalidExchangeRates"; InvalidExchangeRates: never }
	| { tag: "Cis2WithdrawError"; Cis2WithdrawError: never }
	| { tag: "Cis2SettlementError"; Cis2SettlementError: never }
	| { tag: "Cis2PaymentError"; Cis2PaymentError: never }
	| { tag: "Cis2CommissionPaymentError"; Cis2CommissionPaymentError: never }
	| { tag: "CCDPaymentError"; CCDPaymentError: never }
	| { tag: "CCDCommissionPaymentError"; CCDCommissionPaymentError: never }
	| { tag: "NotDeposited"; NotDeposited: never };
export const init = (props: {
	onInitialize: (contract: ContractAddress.Type) => void;
	uiSchema?: UiSchema;
	uiWidgets?: RegistryWidgetsType;
}) =>
	GenericInit<types.initRequest, initRequestUi>({
		onContractInitialized: props.onInitialize,
		uiSchema: props.uiSchema,
		uiWidgets: props.uiWidgets,
		method: client.init,
		requestJsonSchema: initRequestJsonSchema,
		requestSchemaBase64: types.initRequestSchemaBase64,
	});
export const ENTRYPOINTS_UI: {
	[key: keyof typeof types.ENTRYPOINTS]: (props: {
		contract: ContractAddress.Type;
		uiSchema?: UiSchema;
		uiWidgets?: RegistryWidgetsType;
	}) => React.JSX.Element;
} = {
	addPaymentToken: (props: {
		contract: ContractAddress.Type;
		uiSchema?: UiSchema;
		uiWidgets?: RegistryWidgetsType;
	}) =>
		GenericUpdate<
			types.AddPaymentTokenRequest,
			AddPaymentTokenRequestUi,
			types.AddPaymentTokenError,
			AddPaymentTokenErrorUi
		>({
			...props,
			method: client.addPaymentToken,
			requestJsonSchema: addPaymentTokenRequestJsonSchema,
			requestSchemaBase64: types.addPaymentTokenRequestSchemaBase64,
			errorJsonSchema: addPaymentTokenErrorJsonSchema,
			errorSchemaBase64: types.addPaymentTokenErrorSchemaBase64,
		}),
	addSellTokenContract: (props: {
		contract: ContractAddress.Type;
		uiSchema?: UiSchema;
		uiWidgets?: RegistryWidgetsType;
	}) =>
		GenericUpdate<
			types.AddSellTokenContractRequest,
			AddSellTokenContractRequestUi,
			types.AddSellTokenContractError,
			AddSellTokenContractErrorUi
		>({
			...props,
			method: client.addSellTokenContract,
			requestJsonSchema: addSellTokenContractRequestJsonSchema,
			requestSchemaBase64: types.addSellTokenContractRequestSchemaBase64,
			errorJsonSchema: addSellTokenContractErrorJsonSchema,
			errorSchemaBase64: types.addSellTokenContractErrorSchemaBase64,
		}),
	allowedToList: (props: {
		contract: ContractAddress.Type;
		uiSchema?: UiSchema;
		uiWidgets?: RegistryWidgetsType;
	}) =>
		GenericInvoke<
			never,
			never,
			types.AllowedToListResponse,
			AllowedToListResponseUi,
			never,
			never
		>({
			...props,
			method: client.allowedToList,
			responseJsonSchema: allowedToListResponseJsonSchema,
			responseSchemaBase64: types.allowedToListResponseSchemaBase64,
		}),
	balanceOfDeposited: (props: {
		contract: ContractAddress.Type;
		uiSchema?: UiSchema;
		uiWidgets?: RegistryWidgetsType;
	}) =>
		GenericInvoke<
			types.BalanceOfDepositedRequest,
			BalanceOfDepositedRequestUi,
			types.BalanceOfDepositedResponse,
			BalanceOfDepositedResponseUi,
			types.BalanceOfDepositedError,
			BalanceOfDepositedErrorUi
		>({
			...props,
			method: client.balanceOfDeposited,
			requestJsonSchema: balanceOfDepositedRequestJsonSchema,
			requestSchemaBase64: types.balanceOfDepositedRequestSchemaBase64,
			responseJsonSchema: balanceOfDepositedResponseJsonSchema,
			responseSchemaBase64: types.balanceOfDepositedResponseSchemaBase64,
			errorJsonSchema: balanceOfDepositedErrorJsonSchema,
			errorSchemaBase64: types.balanceOfDepositedErrorSchemaBase64,
		}),
	balanceOfListed: (props: {
		contract: ContractAddress.Type;
		uiSchema?: UiSchema;
		uiWidgets?: RegistryWidgetsType;
	}) =>
		GenericInvoke<
			types.BalanceOfListedRequest,
			BalanceOfListedRequestUi,
			types.BalanceOfListedResponse,
			BalanceOfListedResponseUi,
			types.BalanceOfListedError,
			BalanceOfListedErrorUi
		>({
			...props,
			method: client.balanceOfListed,
			requestJsonSchema: balanceOfListedRequestJsonSchema,
			requestSchemaBase64: types.balanceOfListedRequestSchemaBase64,
			responseJsonSchema: balanceOfListedResponseJsonSchema,
			responseSchemaBase64: types.balanceOfListedResponseSchemaBase64,
			errorJsonSchema: balanceOfListedErrorJsonSchema,
			errorSchemaBase64: types.balanceOfListedErrorSchemaBase64,
		}),
	balanceOfUnlisted: (props: {
		contract: ContractAddress.Type;
		uiSchema?: UiSchema;
		uiWidgets?: RegistryWidgetsType;
	}) =>
		GenericInvoke<
			types.BalanceOfUnlistedRequest,
			BalanceOfUnlistedRequestUi,
			types.BalanceOfUnlistedResponse,
			BalanceOfUnlistedResponseUi,
			types.BalanceOfUnlistedError,
			BalanceOfUnlistedErrorUi
		>({
			...props,
			method: client.balanceOfUnlisted,
			requestJsonSchema: balanceOfUnlistedRequestJsonSchema,
			requestSchemaBase64: types.balanceOfUnlistedRequestSchemaBase64,
			responseJsonSchema: balanceOfUnlistedResponseJsonSchema,
			responseSchemaBase64: types.balanceOfUnlistedResponseSchemaBase64,
			errorJsonSchema: balanceOfUnlistedErrorJsonSchema,
			errorSchemaBase64: types.balanceOfUnlistedErrorSchemaBase64,
		}),
	calculateAmounts: (props: {
		contract: ContractAddress.Type;
		uiSchema?: UiSchema;
		uiWidgets?: RegistryWidgetsType;
	}) =>
		GenericInvoke<
			types.CalculateAmountsRequest,
			CalculateAmountsRequestUi,
			types.CalculateAmountsResponse,
			CalculateAmountsResponseUi,
			types.CalculateAmountsError,
			CalculateAmountsErrorUi
		>({
			...props,
			method: client.calculateAmounts,
			requestJsonSchema: calculateAmountsRequestJsonSchema,
			requestSchemaBase64: types.calculateAmountsRequestSchemaBase64,
			responseJsonSchema: calculateAmountsResponseJsonSchema,
			responseSchemaBase64: types.calculateAmountsResponseSchemaBase64,
			errorJsonSchema: calculateAmountsErrorJsonSchema,
			errorSchemaBase64: types.calculateAmountsErrorSchemaBase64,
		}),
	deList: (props: {
		contract: ContractAddress.Type;
		uiSchema?: UiSchema;
		uiWidgets?: RegistryWidgetsType;
	}) =>
		GenericUpdate<
			types.DeListRequest,
			DeListRequestUi,
			types.DeListError,
			DeListErrorUi
		>({
			...props,
			method: client.deList,
			requestJsonSchema: deListRequestJsonSchema,
			requestSchemaBase64: types.deListRequestSchemaBase64,
			errorJsonSchema: deListErrorJsonSchema,
			errorSchemaBase64: types.deListErrorSchemaBase64,
		}),
	deposit: (props: {
		contract: ContractAddress.Type;
		uiSchema?: UiSchema;
		uiWidgets?: RegistryWidgetsType;
	}) =>
		GenericUpdate<
			types.DepositRequest,
			DepositRequestUi,
			types.DepositError,
			DepositErrorUi
		>({
			...props,
			method: client.deposit,
			requestJsonSchema: depositRequestJsonSchema,
			requestSchemaBase64: types.depositRequestSchemaBase64,
			errorJsonSchema: depositErrorJsonSchema,
			errorSchemaBase64: types.depositErrorSchemaBase64,
		}),
	exchange: (props: {
		contract: ContractAddress.Type;
		uiSchema?: UiSchema;
		uiWidgets?: RegistryWidgetsType;
	}) =>
		GenericUpdate<
			types.ExchangeRequest,
			ExchangeRequestUi,
			types.ExchangeError,
			ExchangeErrorUi
		>({
			...props,
			method: client.exchange,
			requestJsonSchema: exchangeRequestJsonSchema,
			requestSchemaBase64: types.exchangeRequestSchemaBase64,
			errorJsonSchema: exchangeErrorJsonSchema,
			errorSchemaBase64: types.exchangeErrorSchemaBase64,
		}),
	getListed: (props: {
		contract: ContractAddress.Type;
		uiSchema?: UiSchema;
		uiWidgets?: RegistryWidgetsType;
	}) =>
		GenericInvoke<
			types.GetListedRequest,
			GetListedRequestUi,
			types.GetListedResponse,
			GetListedResponseUi,
			types.GetListedError,
			GetListedErrorUi
		>({
			...props,
			method: client.getListed,
			requestJsonSchema: getListedRequestJsonSchema,
			requestSchemaBase64: types.getListedRequestSchemaBase64,
			responseJsonSchema: getListedResponseJsonSchema,
			responseSchemaBase64: types.getListedResponseSchemaBase64,
			errorJsonSchema: getListedErrorJsonSchema,
			errorSchemaBase64: types.getListedErrorSchemaBase64,
		}),
	list: (props: {
		contract: ContractAddress.Type;
		uiSchema?: UiSchema;
		uiWidgets?: RegistryWidgetsType;
	}) =>
		GenericUpdate<
			types.ListRequest,
			ListRequestUi,
			types.ListError,
			ListErrorUi
		>({
			...props,
			method: client.list,
			requestJsonSchema: listRequestJsonSchema,
			requestSchemaBase64: types.listRequestSchemaBase64,
			errorJsonSchema: listErrorJsonSchema,
			errorSchemaBase64: types.listErrorSchemaBase64,
		}),
	paymentTokens: (props: {
		contract: ContractAddress.Type;
		uiSchema?: UiSchema;
		uiWidgets?: RegistryWidgetsType;
	}) =>
		GenericInvoke<
			never,
			never,
			types.PaymentTokensResponse,
			PaymentTokensResponseUi,
			never,
			never
		>({
			...props,
			method: client.paymentTokens,
			responseJsonSchema: paymentTokensResponseJsonSchema,
			responseSchemaBase64: types.paymentTokensResponseSchemaBase64,
		}),
	withdraw: (props: {
		contract: ContractAddress.Type;
		uiSchema?: UiSchema;
		uiWidgets?: RegistryWidgetsType;
	}) =>
		GenericUpdate<
			types.WithdrawRequest,
			WithdrawRequestUi,
			types.WithdrawError,
			WithdrawErrorUi
		>({
			...props,
			method: client.withdraw,
			requestJsonSchema: withdrawRequestJsonSchema,
			requestSchemaBase64: types.withdrawRequestSchemaBase64,
			errorJsonSchema: withdrawErrorJsonSchema,
			errorSchemaBase64: types.withdrawErrorSchemaBase64,
		}),
};
