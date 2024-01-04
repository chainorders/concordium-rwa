import { Address, ContractAddress } from "@concordium/web-sdk";
import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import AddressField from "../../common/concordium/AddressField";
import { useNodeClient } from "../../NodeClientProvider";
import { useParams } from "react-router-dom";
import { Identity, getIdentity } from "../../../lib/IdentityRegistryContract";
import IdentityDisplay from "./IdentityDisplay";

export default function GetIdentity() {
	const { provider } = useNodeClient();
	const { index, subIndex } = useParams();
	const contract = ContractAddress.create(BigInt(index!), BigInt(subIndex!));

	const [address, setAddress] = useState<Address>();
	const isFromValid = address !== undefined;
	const [error, setError] = useState("");
	const [result, setResult] = useState<Identity | undefined>();

	const onClick = async () => {
		setError("");
		setResult(undefined);
		try {
			const result = await getIdentity(provider, contract, address!);
			switch (result.tag) {
				case "success":
					setResult(result.returnValue);
					break;
				case "failure":
					setError(result.returnValue || "Failed");
					break;
			}
		} catch (e: unknown) {
			console.log(e);
			setError(e instanceof Error ? e.message : "Unknown error");
		}
	};

	return (
		<Stack spacing={2}>
			<AddressField onChange={(address) => setAddress(address)} name="Address" helperText="Address" />
			<Button disabled={!isFromValid} onClick={onClick}>
				Get Identity
			</Button>
			{error && <Typography color="error">{error}</Typography>}
			{result !== undefined && IdentityDisplay({ identity: result })}
		</Stack>
	);
}
