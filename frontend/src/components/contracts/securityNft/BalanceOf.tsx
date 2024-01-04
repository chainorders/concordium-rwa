import { useParams } from "react-router-dom";
import { useNodeClient } from "../../NodeClientProvider";
import { Address, ContractAddress } from "@concordium/web-sdk";
import { TokenId } from "../compliance/CanTransfer";
import { useState } from "react";
import { TokenAmount } from "../../../lib/common/types";
import { balanceOf } from "../../../lib/NftContract";
import TokenIdField from "../../common/concordium/TokenIdField";
import AddressField from "../../common/concordium/AddressField";
import { Button, Stack, Typography } from "@mui/material";

export default function BalanceOf() {
	const { provider } = useNodeClient();
	const { index, subIndex } = useParams();
	const contract = ContractAddress.create(BigInt(index!), BigInt(subIndex!));
	const [error, setError] = useState("");
	const [result, setResult] = useState<TokenAmount | undefined>();

	const [form, setForm] = useState<{
		tokenId: TokenId;
		owner?: Address;
	}>({
		tokenId: "00",
	});

	const setFormValue = (key: keyof typeof form, value: unknown) => {
		setForm({ ...form, [key]: value });
	};

	const isFormValid = () => {
		return form.tokenId !== undefined && form.owner !== undefined;
	};

	const onClick = async () => {
		setError("");
		setResult(undefined);
		try {
			console.log("form", form);
			const result = await balanceOf(provider, contract, {
				tokenId: form.tokenId,
				address: form.owner!,
			});
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
			<TokenIdField
				onChange={(tokenId) => setFormValue("tokenId", tokenId)}
				value={form.tokenId}
				name="tokenId"
				sizeByte={1}
			/>
			<AddressField
				onChange={(owner) => setFormValue("owner", owner)}
				value={form.owner}
				name="from"
				helperText="The Owner of the NFT"
			/>
			<Button disabled={!isFormValid()} onClick={onClick}>
				Get Balance
			</Button>
			{error && <Typography color="error">{error}</Typography>}
			{result !== undefined && <Typography>Balance: {result}</Typography>}
		</Stack>
	);
}
