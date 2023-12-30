import { Button, Stack, Typography } from "@mui/material";
import AddressField from "../../common/concordium/AddressField";
import { useState } from "react";
import { Agent } from "../../../lib/common/types";
import { useParams } from "react-router-dom";
import { ContractAddress } from "@concordium/web-sdk";
import { isAgent } from "../../../lib/IdentityRegistryContract";
import { useNodeClient } from "../../NodeClientProvider";

export default function IsAgent() {
	const { provider } = useNodeClient();
	const { index, subIndex } = useParams();
	const contract = ContractAddress.create(BigInt(index!), BigInt(subIndex!));
	const [agent, setAgent] = useState<Agent>();
	const isFromValid = agent !== undefined;
	const [error, setError] = useState("");
	const [result, setResult] = useState<boolean | undefined>();

	const onClick = async () => {
		try {
			const result = await isAgent(provider, contract, agent!);
			switch (result.tag) {
				case "success":
					setResult(result.returnValue);
					break;
				case "failure":
					setError("Failed");
					break;
			}
		} catch (e: unknown) {
			setError(e instanceof Error ? e.message : "Unknown error");
		}
	};

	return (
		<Stack spacing={2}>
			<AddressField onChange={(address) => setAgent(address)} name="AgentAddress" helperText="Agent" />
			<Button disabled={!isFromValid} onClick={onClick}>
				Check Is Agent
			</Button>
			{error && <Typography color="error">{error}</Typography>}
			{result !== undefined && <Typography>{result ? "Is Agent" : "Is Not Agent"}</Typography>}
		</Stack>
	);
}
