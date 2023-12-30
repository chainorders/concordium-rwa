import { Button, Stack, Typography } from "@mui/material";
import AddressField from "../../common/concordium/AddressField";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Address, ContractAddress } from "@concordium/web-sdk";
import { isVerified } from "../../../lib/IdentityRegistryContract";
import { useNodeClient } from "../../NodeClientProvider";

export default function IsVerified() {
	const { provider } = useNodeClient();
	const { index, subIndex } = useParams();
	const contract = ContractAddress.create(BigInt(index!), BigInt(subIndex!));
	const [address, setAddress] = useState<Address>();
	const isFromValid = address !== undefined;
	const [error, setError] = useState("");
	const [result, setResult] = useState<boolean | undefined>();

	const onClick = async () => {
		setError("");
		setResult(undefined);

		try {
			const result = await isVerified(provider, contract, address!);
			switch (result.tag) {
				case "success":
					setResult(result.returnValue);
					break;
				case "failure":
					setError(result.returnValue || "Failed");
					break;
			}
		} catch (e: unknown) {
			setError(e instanceof Error ? e.message : "Unknown error");
		}
	};

	return (
		<Stack spacing={2}>
			<AddressField onChange={(address) => setAddress(address)} name="identity-address" helperText="Identity Address" />
			<Button disabled={!isFromValid} onClick={onClick}>
				Check Is Verified
			</Button>
			{error && <Typography color="error">{error}</Typography>}
			{result !== undefined && <Typography>{result ? "Is Verified" : "Is Unverified"}</Typography>}
		</Stack>
	);
}
