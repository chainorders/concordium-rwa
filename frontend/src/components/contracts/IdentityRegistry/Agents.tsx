import { Button, Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Agent, fromAddressJson } from "../../../lib/common/types";
import { useParams } from "react-router-dom";
import { AccountAddress, ContractAddress } from "@concordium/web-sdk";
import { getAgents } from "../../../lib/IdentityRegistryContract";
import { useNodeClient } from "../../NodeClientProvider";
import CCDScanContractLink from "../../common/concordium/CCDScanContractLink";

export default function Agents() {
	const { index, subIndex } = useParams();
	const contract = ContractAddress.create(BigInt(index!), BigInt(subIndex!));
	const { provider } = useNodeClient();
	const [error, setError] = useState("");
	const [result, setResult] = useState<Agent[] | undefined>();

	const onClick = async () => {
		try {
			const result = await getAgents(provider, contract);
			switch (result.tag) {
				case "success":
					setResult(result.returnValue?.map(fromAddressJson));
					break;
				case "failure":
					setError("Failed");
					break;
			}
		} catch (e: unknown) {
			console.error(e);
			setError(e instanceof Error ? e.message : "Unknown error");
		}
	};

	return (
		<Stack spacing={2}>
			<Button onClick={onClick}>Get Agents</Button>
			{error && <Typography color="error">{error}</Typography>}
			{result !== undefined && (
				<>
					<Typography>Agents:</Typography>
					{
						<Grid container spacing={2}>
							{result.map((agent: Agent, index: number) => (
								<div key={index}>
									<Grid item>
										{
											{
												AddressAccount: <Typography>Account</Typography>,
												AddressContract: <Typography>Contract</Typography>,
											}[agent.type]
										}
									</Grid>
									<Grid item>
										<Typography>
											{
												{
													AddressAccount: <>{(agent.address as AccountAddress.Type).address}</>,
													AddressContract: (
														<CCDScanContractLink
															index={(agent.address as ContractAddress.Type).index?.toString()}
															subIndex={(agent.address as ContractAddress.Type).subindex?.toString()}
														/>
													),
												}[agent.type]
											}
										</Typography>
									</Grid>
								</div>
							))}
						</Grid>
					}
				</>
			)}
		</Stack>
	);
}
