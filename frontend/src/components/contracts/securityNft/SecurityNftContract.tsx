import { Stack, Grid, Paper, Typography } from "@mui/material";
import { Route, Routes, useParams } from "react-router-dom";
import EntrypointsList from "../EntrypointsList";
import AddAgent from "../../common/agentsContract/AddAgent";
import ErrorDisplay from "../../common/ErrorDisplay";
import { errorString } from "../../../lib/NftContract";
import { toAddressJson } from "../../../lib/common/types";
import { ContractAddress, TransactionHash } from "@concordium/web-sdk";
import { useWallet } from "../../WalletProvider";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/mui";
import RwaSecurityNft, { ENTRYPOINTS, ENTRYPOINT_DISPLAY_NAMES, MintRequestSchema } from "../../../lib/rwaSecurityNft";
import { agentsRequestJsonSchema, mintRequestJsonSchema } from "../../../lib/rwaSecurityNftUi";
import { parse } from "../../../lib/genericParser";
import { useNodeClient } from "../../NodeClientProvider";
import { useState } from "react";

export default function SecurityNftContract() {
	const { index, subIndex } = useParams();
	const contract = ContractAddress.create(BigInt(index!), BigInt(subIndex!));
	const wallet = useWallet();
	const { provider } = useNodeClient();

	const [formValues, setFormValues] = useState<unknown>();
	const [txnHash, setTxnHash] = useState<string | undefined>();
	const waitForTransaction = async (hash: string) => {
		setTxnHash(hash);
		const txnSummary = await provider.waitForTransactionFinalization(TransactionHash.fromHexString(hash));
		console.log(txnSummary);
		setTxnHash(undefined);
		setFormValues(undefined);
	};

	const MintForm = (
		<Form
			disabled={!!txnHash}
			schema={mintRequestJsonSchema}
			validator={validator}
			onChange={(v) => setFormValues(v.formData)}
			formData={formValues}
			onSubmit={(v) =>
				RwaSecurityNft.mint
					.update(wallet.provider!, wallet.currentAccount!, contract, parse(v.formData, MintRequestSchema))
					.then((r) => waitForTransaction(r))
			}
		/>
	);

	return (
		<Stack>
			<Grid container spacing={1}>
				<Grid item xs={12} md={9}>
					<Paper variant="outlined" sx={{ border: 0 }}>
						<Routes>
							<Route
								path="addAgent"
								element={
									<AddAgent
										onClick={(_provider, _account, _contract, agent) =>
											RwaSecurityNft.addAgent.update(
												wallet.provider!,
												wallet.currentAccount!,
												contract,
												toAddressJson(agent)
											)
										}
										errorString={errorString}
									/>
								}
							/>
							<Route
								path="agents"
								element={
									<Form
										schema={agentsRequestJsonSchema}
										validator={validator}
										onSubmit={() => {
											RwaSecurityNft.agents.invoke(provider!, contract).then((r) => console.log(r));
										}}
									/>
								}
							/>
							<Route path="mint" element={MintForm} />
							<Route path="*" element={<ErrorDisplay text="Not Implemented: Work In Progress" />} />
						</Routes>
					</Paper>
				</Grid>
				<Grid item xs={12} md={3}>
					<Paper>
						<EntrypointsList entrypoints={ENTRYPOINTS} entrypointDisplayNames={ENTRYPOINT_DISPLAY_NAMES} disabled={!!txnHash} />
					</Paper>
				</Grid>
			</Grid>
		</Stack>
	);
}
