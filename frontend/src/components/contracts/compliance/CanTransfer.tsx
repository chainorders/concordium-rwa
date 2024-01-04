import { Button, Stack, Typography } from "@mui/material";
import AddressField from "../../common/concordium/AddressField";
import {
	AccountAddress,
	Address,
	ConcordiumGRPCClient,
	ContractAddress,
	HexString,
	RejectedReceive,
} from "@concordium/web-sdk";
import { useState } from "react";
import ContractAddressField from "../../common/concordium/ContractAddressField";
import { useNodeClient } from "../../NodeClientProvider";
import { useParams } from "react-router-dom";
import ErrorDisplay from "../../common/ErrorDisplay";
import { CanTransferParams, Error as ComplianceError } from "../../../lib/Compliance";
import { InvokeContractResult } from "../../../lib/common/types";
import TokenIdField from "../../common/concordium/TokenIdField";
export type TokenId = HexString;

export default function CanTransfer(props: {
	canTransfer: (
		provider: ConcordiumGRPCClient,
		contract: ContractAddress.Type,
		params: CanTransferParams,
		invoker?: AccountAddress.Type
	) => Promise<InvokeContractResult<boolean, string>>;
}) {
	const { provider } = useNodeClient();
	const { index, subIndex } = useParams();
	const contract = ContractAddress.create(BigInt(index!), BigInt(subIndex!));
	const [error, setError] = useState("");
	const [result, setResult] = useState<boolean | undefined>();

	const [form, setForm] = useState<{
		tokenId: TokenId;
		tokenContract?: ContractAddress.Type;
		to?: Address;
	}>({
		tokenId: "0",
	});
	const setFormValue = (key: keyof typeof form, value: unknown) => {
		setForm({ ...form, [key]: value });
	};
	const isFormValid = () => {
		return form.tokenId !== undefined && form.tokenContract !== undefined && form.to !== undefined;
	};
	const checkCanTransfer = async () => {
		setError("");
		setResult(undefined);

		try {
			const params = {
				token: {
					tokenId: form.tokenId,
					contract: form.tokenContract!,
				},
				to: form.to!,
				amount: "1",
			};
			const result = await props.canTransfer(provider, contract, params);
			switch (result.tag) {
				case "success":
					setResult(result.returnValue);
					break;
				case "failure":
					if ((result.reason as RejectedReceive).rejectReason === ComplianceError.CallContractError) {
						setError(`Failed: Identity Not Found`);
					} else {
						setError(`Failed: ${result.returnValue}`);
					}
					break;
			}
		} catch (e: unknown) {
			setError(e instanceof Error ? e.message : "Unknown error");
		}
	};

	return (
		<Stack spacing={2}>
			<Typography variant="h5">Can Transfer</Typography>
			<TokenIdField name="tokenId" onChange={(a) => setFormValue("tokenId", a)} value={form.tokenId} sizeByte={1} />
			<Typography variant="caption">Token Contract</Typography>
			<ContractAddressField
				onChange={(a) => setFormValue("tokenContract", a)}
				indexHelperText="Token Contract Index"
				subIndexHelperText="Token Contract Sub Index"
				indexName="tokenContractIndex"
				subIndexName="tokenContractSubIndex"
			/>
			<Typography variant="caption">Receiver Address</Typography>
			<AddressField name="address" onChange={(a) => setFormValue("to", a)} />
			<Button variant="contained" color="primary" disabled={!isFormValid()} onClick={checkCanTransfer}>
				Check Can Transfer
			</Button>
			{error && <ErrorDisplay text={error} />}
			{result !== undefined && <Typography>{result ? "Can Transfer" : "Cannot Transfer"}</Typography>}
		</Stack>
	);
}
