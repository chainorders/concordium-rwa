import { RJSFSchema } from "@rjsf/utils";
export const addAgentRequestJsonSchema: RJSFSchema = {
	type: "object",
	properties: { tag: { type: "string", enum: ["Account", "Contract"] } },
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["Account"] },
						Account: { type: "array", items: [{ type: "string", title: "" }] },
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
									properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
								},
							],
						},
					},
				},
			],
		},
	},
};
export const addAgentResponseJsonSchema: RJSFSchema = {};
export type addAgentRequestUi =
	| { tag: "Account"; Account: [string] }
	| { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
export type addAgentResponseUi = never;
export const agentsRequestJsonSchema: RJSFSchema = {};
export const agentsResponseJsonSchema: RJSFSchema = {
	type: "array",
	items: {
		type: "object",
		properties: { tag: { type: "string", enum: ["Account", "Contract"] } },
		required: ["tag"],
		dependencies: {
			tag: {
				oneOf: [
					{
						properties: {
							tag: { enum: ["Account"] },
							Account: { type: "array", items: [{ type: "string", title: "" }] },
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
										properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
									},
								],
							},
						},
					},
				],
			},
		},
	},
};
export type agentsRequestUi = never;
export type agentsResponseUi =
	| { tag: "Account"; Account: [string] }
	| { tag: "Contract"; Contract: [{ index: number; subindex: number }] }[];
export const balanceOfRequestJsonSchema: RJSFSchema = {
	type: "array",
	items: {
		type: "object",
		title: "Balance Of Request List",
		properties: {
			token_id: { type: "string" },
			address: {
				type: "object",
				properties: { tag: { type: "string", enum: ["Account", "Contract"] } },
				required: ["tag"],
				dependencies: {
					tag: {
						oneOf: [
							{
								properties: {
									tag: { enum: ["Account"] },
									Account: { type: "array", items: [{ type: "string", title: "" }] },
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
		},
	},
};
export const balanceOfResponseJsonSchema: RJSFSchema = { type: "array", items: { type: "string" } };
export type balanceOfRequestUi = {
	token_id: string;
	address: { tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
}[];
export type balanceOfResponseUi = string[];
export const balanceOfFrozenRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Balance Of Frozen Request",
	properties: {
		owner: {
			type: "object",
			properties: { tag: { type: "string", enum: ["Account", "Contract"] } },
			required: ["tag"],
			dependencies: {
				tag: {
					oneOf: [
						{
							properties: {
								tag: { enum: ["Account"] },
								Account: { type: "array", items: [{ type: "string", title: "" }] },
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
											properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
										},
									],
								},
							},
						},
					],
				},
			},
		},
		tokens: { type: "array", items: { type: "string" } },
	},
};
export const balanceOfFrozenResponseJsonSchema: RJSFSchema = {
	type: "object",
	title: "Balance Of Frozen Response",
	properties: { tokens: { type: "array", items: { type: "string" } } },
};
export type balanceOfFrozenRequestUi = {
	owner: { tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
	tokens: string[];
};
export type balanceOfFrozenResponseUi = { tokens: string[] };
export const balanceOfUnFrozenRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Balance Of Un Frozen Request",
	properties: {
		owner: {
			type: "object",
			properties: { tag: { type: "string", enum: ["Account", "Contract"] } },
			required: ["tag"],
			dependencies: {
				tag: {
					oneOf: [
						{
							properties: {
								tag: { enum: ["Account"] },
								Account: { type: "array", items: [{ type: "string", title: "" }] },
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
											properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
										},
									],
								},
							},
						},
					],
				},
			},
		},
		tokens: { type: "array", items: { type: "string" } },
	},
};
export const balanceOfUnFrozenResponseJsonSchema: RJSFSchema = {
	type: "object",
	title: "Balance Of Un Frozen Response",
	properties: { tokens: { type: "array", items: { type: "string" } } },
};
export type balanceOfUnFrozenRequestUi = {
	owner: { tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
	tokens: string[];
};
export type balanceOfUnFrozenResponseUi = { tokens: string[] };
export const burnRequestJsonSchema: RJSFSchema = {
	type: "array",
	items: {
		type: "object",
		title: "Burn Request List",
		properties: {
			token_id: { type: "string" },
			amount: { type: "string" },
			owner: {
				type: "object",
				properties: { tag: { type: "string", enum: ["Account", "Contract"] } },
				required: ["tag"],
				dependencies: {
					tag: {
						oneOf: [
							{
								properties: {
									tag: { enum: ["Account"] },
									Account: { type: "array", items: [{ type: "string", title: "" }] },
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
		},
	},
};
export const burnResponseJsonSchema: RJSFSchema = {};
export type burnRequestUi = {
	token_id: string;
	amount: string;
	owner: { tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
}[];
export type burnResponseUi = never;
export const complianceRequestJsonSchema: RJSFSchema = {};
export const complianceResponseJsonSchema: RJSFSchema = {
	type: "object",
	title: "Compliance Response",
	properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
};
export type complianceRequestUi = never;
export type complianceResponseUi = { index: number; subindex: number };
export const forcedTransferRequestJsonSchema: RJSFSchema = {
	type: "array",
	items: {
		type: "object",
		title: "Forced Transfer Request List",
		properties: {
			token_id: { type: "string" },
			amount: { type: "string" },
			from: {
				type: "object",
				properties: { tag: { type: "string", enum: ["Account", "Contract"] } },
				required: ["tag"],
				dependencies: {
					tag: {
						oneOf: [
							{
								properties: {
									tag: { enum: ["Account"] },
									Account: { type: "array", items: [{ type: "string", title: "" }] },
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
			to: {
				type: "object",
				properties: { tag: { type: "string", enum: ["Account", "Contract"] } },
				required: ["tag"],
				dependencies: {
					tag: {
						oneOf: [
							{
								properties: {
									tag: { enum: ["Account"] },
									Account: { type: "array", items: [{ type: "string", title: "" }] },
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
											{ type: "string" },
										],
									},
								},
							},
						],
					},
				},
			},
			data: { type: "string" },
		},
	},
};
export const forcedTransferResponseJsonSchema: RJSFSchema = {};
export type forcedTransferRequestUi = {
	token_id: string;
	amount: string;
	from: { tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
	to:
		| { tag: "Account"; Account: [string] }
		| { tag: "Contract"; Contract: [{ index: number; subindex: number }, string] };
	data: string;
}[];
export type forcedTransferResponseUi = never;
export const freezeRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Freeze Request",
	properties: {
		owner: {
			type: "object",
			properties: { tag: { type: "string", enum: ["Account", "Contract"] } },
			required: ["tag"],
			dependencies: {
				tag: {
					oneOf: [
						{
							properties: {
								tag: { enum: ["Account"] },
								Account: { type: "array", items: [{ type: "string", title: "" }] },
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
											properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
										},
									],
								},
							},
						},
					],
				},
			},
		},
		tokens: {
			type: "array",
			items: {
				type: "object",
				title: "Tokens List",
				properties: { token_id: { type: "string" }, token_amount: { type: "string" } },
			},
		},
	},
};
export const freezeResponseJsonSchema: RJSFSchema = {};
export type freezeRequestUi = {
	owner: { tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
	tokens: { token_id: string; token_amount: string }[];
};
export type freezeResponseUi = never;
export const identityRegistryRequestJsonSchema: RJSFSchema = {};
export const identityRegistryResponseJsonSchema: RJSFSchema = {
	type: "object",
	title: "Identity Registry Response",
	properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
};
export type identityRegistryRequestUi = never;
export type identityRegistryResponseUi = { index: number; subindex: number };
export const isAgentRequestJsonSchema: RJSFSchema = {
	type: "object",
	properties: { tag: { type: "string", enum: ["Account", "Contract"] } },
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["Account"] },
						Account: { type: "array", items: [{ type: "string", title: "" }] },
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
									properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
								},
							],
						},
					},
				},
			],
		},
	},
};
export const isAgentResponseJsonSchema: RJSFSchema = { type: "boolean", title: "Is Agent Response" };
export type isAgentRequestUi =
	| { tag: "Account"; Account: [string] }
	| { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
export type isAgentResponseUi = boolean;
export const isPausedRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Is Paused Request",
	properties: { tokens: { type: "array", items: { type: "string" } } },
};
export const isPausedResponseJsonSchema: RJSFSchema = {};
export type isPausedRequestUi = { tokens: string[] };
export type isPausedResponseUi = never;
export const mintRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Mint Request",
	properties: {
		owner: {
			type: "object",
			properties: { tag: { type: "string", enum: ["Account", "Contract"] } },
			required: ["tag"],
			dependencies: {
				tag: {
					oneOf: [
						{
							properties: {
								tag: { enum: ["Account"] },
								Account: { type: "array", items: [{ type: "string", title: "" }] },
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
											properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
										},
										{ type: "string" },
									],
								},
							},
						},
					],
				},
			},
		},
		tokens: {
			type: "array",
			items: {
				type: "object",
				title: "Tokens List",
				properties: {
					metadata_url: {
						type: "object",
						title: "Metadata Url",
						properties: {
							url: { type: "string" },
							hash: {
								type: "object",
								properties: { tag: { type: "string", enum: ["None", "Some"] } },
								required: ["tag"],
								dependencies: {
									tag: {
										oneOf: [
											{
												properties: {
													tag: { enum: ["None"] },
													None: { type: "object", title: "Hash None", properties: {} },
												},
											},
											{ properties: { tag: { enum: ["Some"] }, Some: { type: "array", items: [{ type: "string" }] } } },
										],
									},
								},
							},
						},
					},
				},
			},
		},
	},
};
export const mintResponseJsonSchema: RJSFSchema = {};
export type mintRequestUi = {
	owner:
		| { tag: "Account"; Account: [string] }
		| { tag: "Contract"; Contract: [{ index: number; subindex: number }, string] };
	tokens: { metadata_url: { url: string; hash: { tag: "None"; None: never } | { tag: "Some"; Some: [string] } } }[];
};
export type mintResponseUi = never;
export const operatorOfRequestJsonSchema: RJSFSchema = {
	type: "array",
	items: {
		type: "object",
		title: "Operator Of Request List",
		properties: {
			owner: {
				type: "object",
				properties: { tag: { type: "string", enum: ["Account", "Contract"] } },
				required: ["tag"],
				dependencies: {
					tag: {
						oneOf: [
							{
								properties: {
									tag: { enum: ["Account"] },
									Account: { type: "array", items: [{ type: "string", title: "" }] },
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
			address: {
				type: "object",
				properties: { tag: { type: "string", enum: ["Account", "Contract"] } },
				required: ["tag"],
				dependencies: {
					tag: {
						oneOf: [
							{
								properties: {
									tag: { enum: ["Account"] },
									Account: { type: "array", items: [{ type: "string", title: "" }] },
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
		},
	},
};
export const operatorOfResponseJsonSchema: RJSFSchema = {
	type: "array",
	items: { type: "boolean", title: "Operator Of Response List" },
};
export type operatorOfRequestUi = {
	owner: { tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
	address: { tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
}[];
export type operatorOfResponseUi = boolean[];
export const pauseRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Pause Request",
	properties: { tokens: { type: "array", items: { type: "string" } } },
};
export const pauseResponseJsonSchema: RJSFSchema = {};
export type pauseRequestUi = { tokens: string[] };
export type pauseResponseUi = never;
export const recoverRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Recover Request",
	properties: {
		lost_account: {
			type: "object",
			properties: { tag: { type: "string", enum: ["Account", "Contract"] } },
			required: ["tag"],
			dependencies: {
				tag: {
					oneOf: [
						{
							properties: {
								tag: { enum: ["Account"] },
								Account: { type: "array", items: [{ type: "string", title: "" }] },
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
											properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
										},
									],
								},
							},
						},
					],
				},
			},
		},
		new_account: {
			type: "object",
			properties: { tag: { type: "string", enum: ["Account", "Contract"] } },
			required: ["tag"],
			dependencies: {
				tag: {
					oneOf: [
						{
							properties: {
								tag: { enum: ["Account"] },
								Account: { type: "array", items: [{ type: "string", title: "" }] },
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
											properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
										},
									],
								},
							},
						},
					],
				},
			},
		},
	},
};
export const recoverResponseJsonSchema: RJSFSchema = {};
export type recoverRequestUi = {
	lost_account:
		| { tag: "Account"; Account: [string] }
		| { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
	new_account:
		| { tag: "Account"; Account: [string] }
		| { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
};
export type recoverResponseUi = never;
export const recoveryAddressRequestJsonSchema: RJSFSchema = {
	type: "object",
	properties: { tag: { type: "string", enum: ["Account", "Contract"] } },
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["Account"] },
						Account: { type: "array", items: [{ type: "string", title: "" }] },
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
									properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
								},
							],
						},
					},
				},
			],
		},
	},
};
export const recoveryAddressResponseJsonSchema: RJSFSchema = {
	type: "object",
	properties: { tag: { type: "string", enum: ["None", "Some"] } },
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["None"] },
						None: { type: "object", title: "Recovery Address Response None", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Some"] },
						Some: {
							type: "array",
							items: [
								{
									type: "object",
									properties: { tag: { type: "string", enum: ["Account", "Contract"] } },
									required: ["tag"],
									dependencies: {
										tag: {
											oneOf: [
												{
													properties: {
														tag: { enum: ["Account"] },
														Account: { type: "array", items: [{ type: "string", title: "" }] },
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
							],
						},
					},
				},
			],
		},
	},
};
export type recoveryAddressRequestUi =
	| { tag: "Account"; Account: [string] }
	| { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
export type recoveryAddressResponseUi =
	| { tag: "None"; None: never }
	| {
			tag: "Some";
			Some: [
				{ tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] },
			];
	  };
export const removeAgentRequestJsonSchema: RJSFSchema = {
	type: "object",
	properties: { tag: { type: "string", enum: ["Account", "Contract"] } },
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["Account"] },
						Account: { type: "array", items: [{ type: "string", title: "" }] },
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
									properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
								},
							],
						},
					},
				},
			],
		},
	},
};
export const removeAgentResponseJsonSchema: RJSFSchema = {};
export type removeAgentRequestUi =
	| { tag: "Account"; Account: [string] }
	| { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
export type removeAgentResponseUi = never;
export const setComplianceRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Set Compliance Request",
	properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
};
export const setComplianceResponseJsonSchema: RJSFSchema = {};
export type setComplianceRequestUi = { index: number; subindex: number };
export type setComplianceResponseUi = never;
export const setIdentityRegistryRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Set Identity Registry Request",
	properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
};
export const setIdentityRegistryResponseJsonSchema: RJSFSchema = {};
export type setIdentityRegistryRequestUi = { index: number; subindex: number };
export type setIdentityRegistryResponseUi = never;
export const supportsRequestJsonSchema: RJSFSchema = { type: "array", items: { type: "string" } };
export const supportsResponseJsonSchema: RJSFSchema = {
	type: "array",
	items: {
		type: "object",
		properties: { tag: { type: "string", enum: ["NoSupport", "Support", "SupportBy"] } },
		required: ["tag"],
		dependencies: {
			tag: {
				oneOf: [
					{
						properties: {
							tag: { enum: ["NoSupport"] },
							NoSupport: { type: "object", title: "Supports Response List No Support", properties: {} },
						},
					},
					{
						properties: {
							tag: { enum: ["Support"] },
							Support: { type: "object", title: "Supports Response List Support", properties: {} },
						},
					},
					{
						properties: {
							tag: { enum: ["SupportBy"] },
							SupportBy: {
								type: "array",
								items: [
									{
										type: "array",
										items: {
											type: "object",
											title: " List",
											properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
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
};
export type supportsRequestUi = string[];
export type supportsResponseUi =
	| { tag: "NoSupport"; NoSupport: never }
	| { tag: "Support"; Support: never }
	| { tag: "SupportBy"; SupportBy: [{ index: number; subindex: number }[]] }[];
export const tokenMetadataRequestJsonSchema: RJSFSchema = { type: "array", items: { type: "string" } };
export const tokenMetadataResponseJsonSchema: RJSFSchema = {
	type: "array",
	items: {
		type: "object",
		title: "Token Metadata Response List",
		properties: {
			url: { type: "string" },
			hash: {
				type: "object",
				properties: { tag: { type: "string", enum: ["None", "Some"] } },
				required: ["tag"],
				dependencies: {
					tag: {
						oneOf: [
							{ properties: { tag: { enum: ["None"] }, None: { type: "object", title: "Hash None", properties: {} } } },
							{ properties: { tag: { enum: ["Some"] }, Some: { type: "array", items: [{ type: "string" }] } } },
						],
					},
				},
			},
		},
	},
};
export type tokenMetadataRequestUi = string[];
export type tokenMetadataResponseUi = {
	url: string;
	hash: { tag: "None"; None: never } | { tag: "Some"; Some: [string] };
}[];
export const transferRequestJsonSchema: RJSFSchema = {
	type: "array",
	items: {
		type: "object",
		title: "Transfer Request List",
		properties: {
			token_id: { type: "string" },
			amount: { type: "string" },
			from: {
				type: "object",
				properties: { tag: { type: "string", enum: ["Account", "Contract"] } },
				required: ["tag"],
				dependencies: {
					tag: {
						oneOf: [
							{
								properties: {
									tag: { enum: ["Account"] },
									Account: { type: "array", items: [{ type: "string", title: "" }] },
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
			to: {
				type: "object",
				properties: { tag: { type: "string", enum: ["Account", "Contract"] } },
				required: ["tag"],
				dependencies: {
					tag: {
						oneOf: [
							{
								properties: {
									tag: { enum: ["Account"] },
									Account: { type: "array", items: [{ type: "string", title: "" }] },
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
											{ type: "string" },
										],
									},
								},
							},
						],
					},
				},
			},
			data: { type: "string" },
		},
	},
};
export const transferResponseJsonSchema: RJSFSchema = {};
export type transferRequestUi = {
	token_id: string;
	amount: string;
	from: { tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
	to:
		| { tag: "Account"; Account: [string] }
		| { tag: "Contract"; Contract: [{ index: number; subindex: number }, string] };
	data: string;
}[];
export type transferResponseUi = never;
export const unFreezeRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Un Freeze Request",
	properties: {
		owner: {
			type: "object",
			properties: { tag: { type: "string", enum: ["Account", "Contract"] } },
			required: ["tag"],
			dependencies: {
				tag: {
					oneOf: [
						{
							properties: {
								tag: { enum: ["Account"] },
								Account: { type: "array", items: [{ type: "string", title: "" }] },
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
											properties: { index: { type: "integer", minimum: 0 }, subindex: { type: "integer", minimum: 0 } },
										},
									],
								},
							},
						},
					],
				},
			},
		},
		tokens: {
			type: "array",
			items: {
				type: "object",
				title: "Tokens List",
				properties: { token_id: { type: "string" }, token_amount: { type: "string" } },
			},
		},
	},
};
export const unFreezeResponseJsonSchema: RJSFSchema = {};
export type unFreezeRequestUi = {
	owner: { tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
	tokens: { token_id: string; token_amount: string }[];
};
export type unFreezeResponseUi = never;
export const unPauseRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Un Pause Request",
	properties: { tokens: { type: "array", items: { type: "string" } } },
};
export const unPauseResponseJsonSchema: RJSFSchema = {};
export type unPauseRequestUi = { tokens: string[] };
export type unPauseResponseUi = never;
export const updateOperatorRequestJsonSchema: RJSFSchema = {
	type: "array",
	items: {
		type: "object",
		title: "Update Operator Request List",
		properties: {
			update: {
				type: "object",
				properties: { tag: { type: "string", enum: ["Remove", "Add"] } },
				required: ["tag"],
				dependencies: {
					tag: {
						oneOf: [
							{
								properties: {
									tag: { enum: ["Remove"] },
									Remove: { type: "object", title: "Update Remove", properties: {} },
								},
							},
							{ properties: { tag: { enum: ["Add"] }, Add: { type: "object", title: "Update Add", properties: {} } } },
						],
					},
				},
			},
			operator: {
				type: "object",
				properties: { tag: { type: "string", enum: ["Account", "Contract"] } },
				required: ["tag"],
				dependencies: {
					tag: {
						oneOf: [
							{
								properties: {
									tag: { enum: ["Account"] },
									Account: { type: "array", items: [{ type: "string", title: "" }] },
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
		},
	},
};
export const updateOperatorResponseJsonSchema: RJSFSchema = {};
export type updateOperatorRequestUi = {
	update: { tag: "Remove"; Remove: never } | { tag: "Add"; Add: never };
	operator:
		| { tag: "Account"; Account: [string] }
		| { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
}[];
export type updateOperatorResponseUi = never;
