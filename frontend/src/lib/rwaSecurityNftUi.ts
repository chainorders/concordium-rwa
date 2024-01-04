export type addAgentRequestJsonSchema = {
	type: "object";
	properties: { tag: { type: "string"; enum: ["Account", "Contract"] } };
	required: ["tag"];
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["Account"] };
						Account: { type: "array"; items: [{ type: "string"; title: "Account Address" }] };
					};
				},
				{
					properties: {
						tag: { enum: ["Contract"] };
						Contract: {
							type: "array";
							items: [
								{
									type: "object";
									properties: { index: { type: "integer"; minimum: 0 }; subindex: { type: "integer"; minimum: 0 } };
								},
							];
						};
					};
				},
			];
		};
	};
};
export type addAgentResponseJsonSchema = undefined;
export type addAgentRequestUi =
	| { tag: "Account"; Account: [string] }
	| { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
export type addAgentResponseUi = never;
export type agentsRequestJsonSchema = undefined;
export type agentsResponseJsonSchema = {
	type: "array";
	items: {
		type: "object";
		properties: { tag: { type: "string"; enum: ["Account", "Contract"] } };
		required: ["tag"];
		dependencies: {
			tag: {
				oneOf: [
					{
						properties: {
							tag: { enum: ["Account"] };
							Account: { type: "array"; items: [{ type: "string"; title: "Account Address" }] };
						};
					},
					{
						properties: {
							tag: { enum: ["Contract"] };
							Contract: {
								type: "array";
								items: [
									{
										type: "object";
										properties: { index: { type: "integer"; minimum: 0 }; subindex: { type: "integer"; minimum: 0 } };
									},
								];
							};
						};
					},
				];
			};
		};
	};
};
export type agentsRequestUi = never;
export type agentsResponseUi =
	| { tag: "Account"; Account: [string] }
	| { tag: "Contract"; Contract: [{ index: number; subindex: number }] }[];
export type balanceOfRequestJsonSchema = {
	type: "array";
	items: {
		type: "object";
		properties: {
			token_id: { type: "string" };
			address: {
				type: "object";
				properties: { tag: { type: "string"; enum: ["Account", "Contract"] } };
				required: ["tag"];
				dependencies: {
					tag: {
						oneOf: [
							{
								properties: {
									tag: { enum: ["Account"] };
									Account: { type: "array"; items: [{ type: "string"; title: "Account Address" }] };
								};
							},
							{
								properties: {
									tag: { enum: ["Contract"] };
									Contract: {
										type: "array";
										items: [
											{
												type: "object";
												properties: {
													index: { type: "integer"; minimum: 0 };
													subindex: { type: "integer"; minimum: 0 };
												};
											},
										];
									};
								};
							},
						];
					};
				};
			};
		};
	};
};
export type balanceOfResponseJsonSchema = { type: "array"; items: { type: "string" } };
export type balanceOfRequestUi = {
	token_id: string;
	address: { tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
}[];
export type balanceOfResponseUi = string[];
export type balanceOfFrozenRequestJsonSchema = {
	type: "object";
	properties: {
		owner: {
			type: "object";
			properties: { tag: { type: "string"; enum: ["Account", "Contract"] } };
			required: ["tag"];
			dependencies: {
				tag: {
					oneOf: [
						{
							properties: {
								tag: { enum: ["Account"] };
								Account: { type: "array"; items: [{ type: "string"; title: "Account Address" }] };
							};
						},
						{
							properties: {
								tag: { enum: ["Contract"] };
								Contract: {
									type: "array";
									items: [
										{
											type: "object";
											properties: { index: { type: "integer"; minimum: 0 }; subindex: { type: "integer"; minimum: 0 } };
										},
									];
								};
							};
						},
					];
				};
			};
		};
		tokens: { type: "array"; items: { type: "string" } };
	};
};
export type balanceOfFrozenResponseJsonSchema = {
	type: "object";
	properties: { tokens: { type: "array"; items: { type: "string" } } };
};
export type balanceOfFrozenRequestUi = {
	owner: { tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
	tokens: string[];
};
export type balanceOfFrozenResponseUi = { tokens: string[] };
export type balanceOfUnFrozenRequestJsonSchema = {
	type: "object";
	properties: {
		owner: {
			type: "object";
			properties: { tag: { type: "string"; enum: ["Account", "Contract"] } };
			required: ["tag"];
			dependencies: {
				tag: {
					oneOf: [
						{
							properties: {
								tag: { enum: ["Account"] };
								Account: { type: "array"; items: [{ type: "string"; title: "Account Address" }] };
							};
						},
						{
							properties: {
								tag: { enum: ["Contract"] };
								Contract: {
									type: "array";
									items: [
										{
											type: "object";
											properties: { index: { type: "integer"; minimum: 0 }; subindex: { type: "integer"; minimum: 0 } };
										},
									];
								};
							};
						},
					];
				};
			};
		};
		tokens: { type: "array"; items: { type: "string" } };
	};
};
export type balanceOfUnFrozenResponseJsonSchema = {
	type: "object";
	properties: { tokens: { type: "array"; items: { type: "string" } } };
};
export type balanceOfUnFrozenRequestUi = {
	owner: { tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
	tokens: string[];
};
export type balanceOfUnFrozenResponseUi = { tokens: string[] };
export type burnRequestJsonSchema = {
	type: "array";
	items: {
		type: "object";
		properties: {
			token_id: { type: "string" };
			amount: { type: "string" };
			owner: {
				type: "object";
				properties: { tag: { type: "string"; enum: ["Account", "Contract"] } };
				required: ["tag"];
				dependencies: {
					tag: {
						oneOf: [
							{
								properties: {
									tag: { enum: ["Account"] };
									Account: { type: "array"; items: [{ type: "string"; title: "Account Address" }] };
								};
							},
							{
								properties: {
									tag: { enum: ["Contract"] };
									Contract: {
										type: "array";
										items: [
											{
												type: "object";
												properties: {
													index: { type: "integer"; minimum: 0 };
													subindex: { type: "integer"; minimum: 0 };
												};
											},
										];
									};
								};
							},
						];
					};
				};
			};
		};
	};
};
export type burnResponseJsonSchema = undefined;
export type burnRequestUi = {
	token_id: string;
	amount: string;
	owner: { tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
}[];
export type burnResponseUi = never;
export type complianceRequestJsonSchema = undefined;
export type complianceResponseJsonSchema = {
	type: "object";
	properties: { index: { type: "integer"; minimum: 0 }; subindex: { type: "integer"; minimum: 0 } };
};
export type complianceRequestUi = never;
export type complianceResponseUi = { index: number; subindex: number };
export type forcedTransferRequestJsonSchema = {
	type: "array";
	items: {
		type: "object";
		properties: {
			token_id: { type: "string" };
			amount: { type: "string" };
			from: {
				type: "object";
				properties: { tag: { type: "string"; enum: ["Account", "Contract"] } };
				required: ["tag"];
				dependencies: {
					tag: {
						oneOf: [
							{
								properties: {
									tag: { enum: ["Account"] };
									Account: { type: "array"; items: [{ type: "string"; title: "Account Address" }] };
								};
							},
							{
								properties: {
									tag: { enum: ["Contract"] };
									Contract: {
										type: "array";
										items: [
											{
												type: "object";
												properties: {
													index: { type: "integer"; minimum: 0 };
													subindex: { type: "integer"; minimum: 0 };
												};
											},
										];
									};
								};
							},
						];
					};
				};
			};
			to: {
				type: "object";
				properties: { tag: { type: "string"; enum: ["Account", "Contract"] } };
				required: ["tag"];
				dependencies: {
					tag: {
						oneOf: [
							{
								properties: {
									tag: { enum: ["Account"] };
									Account: { type: "array"; items: [{ type: "string"; title: "Account Address" }] };
								};
							},
							{
								properties: {
									tag: { enum: ["Contract"] };
									Contract: {
										type: "array";
										items: [
											{
												type: "object";
												properties: {
													index: { type: "integer"; minimum: 0 };
													subindex: { type: "integer"; minimum: 0 };
												};
											},
											{ type: "string" },
										];
									};
								};
							},
						];
					};
				};
			};
			data: { type: "string" };
		};
	};
};
export type forcedTransferResponseJsonSchema = undefined;
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
export type freezeRequestJsonSchema = {
	type: "object";
	properties: {
		owner: {
			type: "object";
			properties: { tag: { type: "string"; enum: ["Account", "Contract"] } };
			required: ["tag"];
			dependencies: {
				tag: {
					oneOf: [
						{
							properties: {
								tag: { enum: ["Account"] };
								Account: { type: "array"; items: [{ type: "string"; title: "Account Address" }] };
							};
						},
						{
							properties: {
								tag: { enum: ["Contract"] };
								Contract: {
									type: "array";
									items: [
										{
											type: "object";
											properties: { index: { type: "integer"; minimum: 0 }; subindex: { type: "integer"; minimum: 0 } };
										},
									];
								};
							};
						},
					];
				};
			};
		};
		tokens: {
			type: "array";
			items: { type: "object"; properties: { token_id: { type: "string" }; token_amount: { type: "string" } } };
		};
	};
};
export type freezeResponseJsonSchema = undefined;
export type freezeRequestUi = {
	owner: { tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
	tokens: { token_id: string; token_amount: string }[];
};
export type freezeResponseUi = never;
export type identityRegistryRequestJsonSchema = undefined;
export type identityRegistryResponseJsonSchema = {
	type: "object";
	properties: { index: { type: "integer"; minimum: 0 }; subindex: { type: "integer"; minimum: 0 } };
};
export type identityRegistryRequestUi = never;
export type identityRegistryResponseUi = { index: number; subindex: number };
export type isAgentRequestJsonSchema = {
	type: "object";
	properties: { tag: { type: "string"; enum: ["Account", "Contract"] } };
	required: ["tag"];
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["Account"] };
						Account: { type: "array"; items: [{ type: "string"; title: "Account Address" }] };
					};
				},
				{
					properties: {
						tag: { enum: ["Contract"] };
						Contract: {
							type: "array";
							items: [
								{
									type: "object";
									properties: { index: { type: "integer"; minimum: 0 }; subindex: { type: "integer"; minimum: 0 } };
								},
							];
						};
					};
				},
			];
		};
	};
};
export type isAgentResponseJsonSchema = { type: "boolean" };
export type isAgentRequestUi =
	| { tag: "Account"; Account: [string] }
	| { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
export type isAgentResponseUi = boolean;
export type isPausedRequestJsonSchema = {
	type: "object";
	properties: { tokens: { type: "array"; items: { type: "string" } } };
};
export type isPausedResponseJsonSchema = undefined;
export type isPausedRequestUi = { tokens: string[] };
export type isPausedResponseUi = never;
export type mintRequestJsonSchema = {
	type: "object";
	properties: {
		owner: {
			type: "object";
			properties: { tag: { type: "string"; enum: ["Account", "Contract"] } };
			required: ["tag"];
			dependencies: {
				tag: {
					oneOf: [
						{
							properties: {
								tag: { enum: ["Account"] };
								Account: { type: "array"; items: [{ type: "string"; title: "Account Address" }] };
							};
						},
						{
							properties: {
								tag: { enum: ["Contract"] };
								Contract: {
									type: "array";
									items: [
										{
											type: "object";
											properties: { index: { type: "integer"; minimum: 0 }; subindex: { type: "integer"; minimum: 0 } };
										},
										{ type: "string" },
									];
								};
							};
						},
					];
				};
			};
		};
		tokens: {
			type: "array";
			items: {
				type: "object";
				properties: {
					metadata_url: {
						type: "object";
						properties: {
							url: { type: "string" };
							hash: {
								type: "object";
								properties: { tag: { type: "string"; enum: ["None", "Some"] } };
								required: ["tag"];
								dependencies: {
									tag: {
										oneOf: [
											{ properties: { tag: { enum: ["None"] }; None: { type: "object"; properties: {} } } },
											{ properties: { tag: { enum: ["Some"] }; Some: { type: "array"; items: [{ type: "string" }] } } },
										];
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
export type mintResponseJsonSchema = undefined;
export type mintRequestUi = {
	owner:
		| { tag: "Account"; Account: [string] }
		| { tag: "Contract"; Contract: [{ index: number; subindex: number }, string] };
	tokens: { metadata_url: { url: string; hash: { tag: "None"; None: never } | { tag: "Some"; Some: [string] } } }[];
};
export type mintResponseUi = never;
export type operatorOfRequestJsonSchema = {
	type: "array";
	items: {
		type: "object";
		properties: {
			owner: {
				type: "object";
				properties: { tag: { type: "string"; enum: ["Account", "Contract"] } };
				required: ["tag"];
				dependencies: {
					tag: {
						oneOf: [
							{
								properties: {
									tag: { enum: ["Account"] };
									Account: { type: "array"; items: [{ type: "string"; title: "Account Address" }] };
								};
							},
							{
								properties: {
									tag: { enum: ["Contract"] };
									Contract: {
										type: "array";
										items: [
											{
												type: "object";
												properties: {
													index: { type: "integer"; minimum: 0 };
													subindex: { type: "integer"; minimum: 0 };
												};
											},
										];
									};
								};
							},
						];
					};
				};
			};
			address: {
				type: "object";
				properties: { tag: { type: "string"; enum: ["Account", "Contract"] } };
				required: ["tag"];
				dependencies: {
					tag: {
						oneOf: [
							{
								properties: {
									tag: { enum: ["Account"] };
									Account: { type: "array"; items: [{ type: "string"; title: "Account Address" }] };
								};
							},
							{
								properties: {
									tag: { enum: ["Contract"] };
									Contract: {
										type: "array";
										items: [
											{
												type: "object";
												properties: {
													index: { type: "integer"; minimum: 0 };
													subindex: { type: "integer"; minimum: 0 };
												};
											},
										];
									};
								};
							},
						];
					};
				};
			};
		};
	};
};
export type operatorOfResponseJsonSchema = { type: "array"; items: { type: "boolean" } };
export type operatorOfRequestUi = {
	owner: { tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
	address: { tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
}[];
export type operatorOfResponseUi = boolean[];
export type pauseRequestJsonSchema = {
	type: "object";
	properties: { tokens: { type: "array"; items: { type: "string" } } };
};
export type pauseResponseJsonSchema = undefined;
export type pauseRequestUi = { tokens: string[] };
export type pauseResponseUi = never;
export type recoverRequestJsonSchema = {
	type: "object";
	properties: {
		lost_account: {
			type: "object";
			properties: { tag: { type: "string"; enum: ["Account", "Contract"] } };
			required: ["tag"];
			dependencies: {
				tag: {
					oneOf: [
						{
							properties: {
								tag: { enum: ["Account"] };
								Account: { type: "array"; items: [{ type: "string"; title: "Account Address" }] };
							};
						},
						{
							properties: {
								tag: { enum: ["Contract"] };
								Contract: {
									type: "array";
									items: [
										{
											type: "object";
											properties: { index: { type: "integer"; minimum: 0 }; subindex: { type: "integer"; minimum: 0 } };
										},
									];
								};
							};
						},
					];
				};
			};
		};
		new_account: {
			type: "object";
			properties: { tag: { type: "string"; enum: ["Account", "Contract"] } };
			required: ["tag"];
			dependencies: {
				tag: {
					oneOf: [
						{
							properties: {
								tag: { enum: ["Account"] };
								Account: { type: "array"; items: [{ type: "string"; title: "Account Address" }] };
							};
						},
						{
							properties: {
								tag: { enum: ["Contract"] };
								Contract: {
									type: "array";
									items: [
										{
											type: "object";
											properties: { index: { type: "integer"; minimum: 0 }; subindex: { type: "integer"; minimum: 0 } };
										},
									];
								};
							};
						},
					];
				};
			};
		};
	};
};
export type recoverResponseJsonSchema = undefined;
export type recoverRequestUi = {
	lost_account:
		| { tag: "Account"; Account: [string] }
		| { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
	new_account:
		| { tag: "Account"; Account: [string] }
		| { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
};
export type recoverResponseUi = never;
export type recoveryAddressRequestJsonSchema = {
	type: "object";
	properties: { tag: { type: "string"; enum: ["Account", "Contract"] } };
	required: ["tag"];
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["Account"] };
						Account: { type: "array"; items: [{ type: "string"; title: "Account Address" }] };
					};
				},
				{
					properties: {
						tag: { enum: ["Contract"] };
						Contract: {
							type: "array";
							items: [
								{
									type: "object";
									properties: { index: { type: "integer"; minimum: 0 }; subindex: { type: "integer"; minimum: 0 } };
								},
							];
						};
					};
				},
			];
		};
	};
};
export type recoveryAddressResponseJsonSchema = {
	type: "object";
	properties: { tag: { type: "string"; enum: ["None", "Some"] } };
	required: ["tag"];
	dependencies: {
		tag: {
			oneOf: [
				{ properties: { tag: { enum: ["None"] }; None: { type: "object"; properties: {} } } },
				{
					properties: {
						tag: { enum: ["Some"] };
						Some: {
							type: "array";
							items: [
								{
									type: "object";
									properties: { tag: { type: "string"; enum: ["Account", "Contract"] } };
									required: ["tag"];
									dependencies: {
										tag: {
											oneOf: [
												{
													properties: {
														tag: { enum: ["Account"] };
														Account: { type: "array"; items: [{ type: "string"; title: "Account Address" }] };
													};
												},
												{
													properties: {
														tag: { enum: ["Contract"] };
														Contract: {
															type: "array";
															items: [
																{
																	type: "object";
																	properties: {
																		index: { type: "integer"; minimum: 0 };
																		subindex: { type: "integer"; minimum: 0 };
																	};
																},
															];
														};
													};
												},
											];
										};
									};
								},
							];
						};
					};
				},
			];
		};
	};
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
export type removeAgentRequestJsonSchema = {
	type: "object";
	properties: { tag: { type: "string"; enum: ["Account", "Contract"] } };
	required: ["tag"];
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["Account"] };
						Account: { type: "array"; items: [{ type: "string"; title: "Account Address" }] };
					};
				},
				{
					properties: {
						tag: { enum: ["Contract"] };
						Contract: {
							type: "array";
							items: [
								{
									type: "object";
									properties: { index: { type: "integer"; minimum: 0 }; subindex: { type: "integer"; minimum: 0 } };
								},
							];
						};
					};
				},
			];
		};
	};
};
export type removeAgentResponseJsonSchema = undefined;
export type removeAgentRequestUi =
	| { tag: "Account"; Account: [string] }
	| { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
export type removeAgentResponseUi = never;
export type setComplianceRequestJsonSchema = {
	type: "object";
	properties: { index: { type: "integer"; minimum: 0 }; subindex: { type: "integer"; minimum: 0 } };
};
export type setComplianceResponseJsonSchema = undefined;
export type setComplianceRequestUi = { index: number; subindex: number };
export type setComplianceResponseUi = never;
export type setIdentityRegistryRequestJsonSchema = {
	type: "object";
	properties: { index: { type: "integer"; minimum: 0 }; subindex: { type: "integer"; minimum: 0 } };
};
export type setIdentityRegistryResponseJsonSchema = undefined;
export type setIdentityRegistryRequestUi = { index: number; subindex: number };
export type setIdentityRegistryResponseUi = never;
export type supportsRequestJsonSchema = { type: "array"; items: { type: "string" } };
export type supportsResponseJsonSchema = {
	type: "array";
	items: {
		type: "object";
		properties: { tag: { type: "string"; enum: ["NoSupport", "Support", "SupportBy"] } };
		required: ["tag"];
		dependencies: {
			tag: {
				oneOf: [
					{ properties: { tag: { enum: ["NoSupport"] }; NoSupport: { type: "object"; properties: {} } } },
					{ properties: { tag: { enum: ["Support"] }; Support: { type: "object"; properties: {} } } },
					{
						properties: {
							tag: { enum: ["SupportBy"] };
							SupportBy: {
								type: "array";
								items: [
									{
										type: "array";
										items: {
											type: "object";
											properties: { index: { type: "integer"; minimum: 0 }; subindex: { type: "integer"; minimum: 0 } };
										};
									},
								];
							};
						};
					},
				];
			};
		};
	};
};
export type supportsRequestUi = string[];
export type supportsResponseUi =
	| { tag: "NoSupport"; NoSupport: never }
	| { tag: "Support"; Support: never }
	| { tag: "SupportBy"; SupportBy: [{ index: number; subindex: number }[]] }[];
export type tokenMetadataRequestJsonSchema = { type: "array"; items: { type: "string" } };
export type tokenMetadataResponseJsonSchema = {
	type: "array";
	items: {
		type: "object";
		properties: {
			url: { type: "string" };
			hash: {
				type: "object";
				properties: { tag: { type: "string"; enum: ["None", "Some"] } };
				required: ["tag"];
				dependencies: {
					tag: {
						oneOf: [
							{ properties: { tag: { enum: ["None"] }; None: { type: "object"; properties: {} } } },
							{ properties: { tag: { enum: ["Some"] }; Some: { type: "array"; items: [{ type: "string" }] } } },
						];
					};
				};
			};
		};
	};
};
export type tokenMetadataRequestUi = string[];
export type tokenMetadataResponseUi = {
	url: string;
	hash: { tag: "None"; None: never } | { tag: "Some"; Some: [string] };
}[];
export type transferRequestJsonSchema = {
	type: "array";
	items: {
		type: "object";
		properties: {
			token_id: { type: "string" };
			amount: { type: "string" };
			from: {
				type: "object";
				properties: { tag: { type: "string"; enum: ["Account", "Contract"] } };
				required: ["tag"];
				dependencies: {
					tag: {
						oneOf: [
							{
								properties: {
									tag: { enum: ["Account"] };
									Account: { type: "array"; items: [{ type: "string"; title: "Account Address" }] };
								};
							},
							{
								properties: {
									tag: { enum: ["Contract"] };
									Contract: {
										type: "array";
										items: [
											{
												type: "object";
												properties: {
													index: { type: "integer"; minimum: 0 };
													subindex: { type: "integer"; minimum: 0 };
												};
											},
										];
									};
								};
							},
						];
					};
				};
			};
			to: {
				type: "object";
				properties: { tag: { type: "string"; enum: ["Account", "Contract"] } };
				required: ["tag"];
				dependencies: {
					tag: {
						oneOf: [
							{
								properties: {
									tag: { enum: ["Account"] };
									Account: { type: "array"; items: [{ type: "string"; title: "Account Address" }] };
								};
							},
							{
								properties: {
									tag: { enum: ["Contract"] };
									Contract: {
										type: "array";
										items: [
											{
												type: "object";
												properties: {
													index: { type: "integer"; minimum: 0 };
													subindex: { type: "integer"; minimum: 0 };
												};
											},
											{ type: "string" },
										];
									};
								};
							},
						];
					};
				};
			};
			data: { type: "string" };
		};
	};
};
export type transferResponseJsonSchema = undefined;
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
export type unFreezeRequestJsonSchema = {
	type: "object";
	properties: {
		owner: {
			type: "object";
			properties: { tag: { type: "string"; enum: ["Account", "Contract"] } };
			required: ["tag"];
			dependencies: {
				tag: {
					oneOf: [
						{
							properties: {
								tag: { enum: ["Account"] };
								Account: { type: "array"; items: [{ type: "string"; title: "Account Address" }] };
							};
						},
						{
							properties: {
								tag: { enum: ["Contract"] };
								Contract: {
									type: "array";
									items: [
										{
											type: "object";
											properties: { index: { type: "integer"; minimum: 0 }; subindex: { type: "integer"; minimum: 0 } };
										},
									];
								};
							};
						},
					];
				};
			};
		};
		tokens: {
			type: "array";
			items: { type: "object"; properties: { token_id: { type: "string" }; token_amount: { type: "string" } } };
		};
	};
};
export type unFreezeResponseJsonSchema = undefined;
export type unFreezeRequestUi = {
	owner: { tag: "Account"; Account: [string] } | { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
	tokens: { token_id: string; token_amount: string }[];
};
export type unFreezeResponseUi = never;
export type unPauseRequestJsonSchema = {
	type: "object";
	properties: { tokens: { type: "array"; items: { type: "string" } } };
};
export type unPauseResponseJsonSchema = undefined;
export type unPauseRequestUi = { tokens: string[] };
export type unPauseResponseUi = never;
export type updateOperatorRequestJsonSchema = {
	type: "array";
	items: {
		type: "object";
		properties: {
			update: {
				type: "object";
				properties: { tag: { type: "string"; enum: ["Remove", "Add"] } };
				required: ["tag"];
				dependencies: {
					tag: {
						oneOf: [
							{ properties: { tag: { enum: ["Remove"] }; Remove: { type: "object"; properties: {} } } },
							{ properties: { tag: { enum: ["Add"] }; Add: { type: "object"; properties: {} } } },
						];
					};
				};
			};
			operator: {
				type: "object";
				properties: { tag: { type: "string"; enum: ["Account", "Contract"] } };
				required: ["tag"];
				dependencies: {
					tag: {
						oneOf: [
							{
								properties: {
									tag: { enum: ["Account"] };
									Account: { type: "array"; items: [{ type: "string"; title: "Account Address" }] };
								};
							},
							{
								properties: {
									tag: { enum: ["Contract"] };
									Contract: {
										type: "array";
										items: [
											{
												type: "object";
												properties: {
													index: { type: "integer"; minimum: 0 };
													subindex: { type: "integer"; minimum: 0 };
												};
											},
										];
									};
								};
							},
						];
					};
				};
			};
		};
	};
};
export type updateOperatorResponseJsonSchema = undefined;
export type updateOperatorRequestUi = {
	update: { tag: "Remove"; Remove: never } | { tag: "Add"; Add: never };
	operator:
		| { tag: "Account"; Account: [string] }
		| { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
}[];
export type updateOperatorResponseUi = never;
