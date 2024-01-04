import { Stack, Grid, Paper } from "@mui/material";
import { Route, Routes, useParams } from "react-router-dom";
import EntrypointsList from "../EntrypointsList";
import rwa_security_nft, { ENTRYPOINTS, ENTRYPOINT_DISPLAY_NAMES } from "../../../lib/Contract_rwa_security_nft";
import AddAgent from "../../common/agentsContract/AddAgent";
import ErrorDisplay from "../../common/ErrorDisplay";
import { errorString } from "../../../lib/NftContract";
import { toAddressJson } from "../../../lib/common/types";
import { ContractAddress } from "@concordium/web-sdk";
import { useWallet } from "../../WalletProvider";

export default function IdentityRegistryContract() {
	const { index, subIndex } = useParams();
	const contract = ContractAddress.create(BigInt(index!), BigInt(subIndex!));
	const wallet = useWallet();

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
											rwa_security_nft.addAgent.update(
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
							<Route path="*" element={<ErrorDisplay text="Not Implemented: Work In Progress" />} />
						</Routes>
					</Paper>
				</Grid>
				<Grid item xs={12} md={3}>
					<Paper>
						<EntrypointsList entrypoints={ENTRYPOINTS} entrypointDisplayNames={ENTRYPOINT_DISPLAY_NAMES} />
					</Paper>
				</Grid>
			</Grid>
		</Stack>
	);
}
