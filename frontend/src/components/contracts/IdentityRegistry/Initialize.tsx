import { BlockItemSummaryInBlock } from "@concordium/web-sdk";
import { useWallet } from "../../WalletProvider";
import SendTransactionButton from "../../common/SendTransactionButton";
import { Contract, ContractType } from "../ContractTypes";
import { Stack, TextField } from "@mui/material";
import { useState } from "react";
import { errorString, initialize } from "../../../lib/IdentityRegistryContract";
import { parseContractAddress } from "../../../lib/common/common";
import ErrorDisplay from "../../common/ErrorDisplay";

export default function Initialize(props: { onSuccess: (contract: Contract) => void }) {
	const wallet = useWallet();
	const [form, setForm] = useState({
		contractDisplayName: "",
	});
	const [error, setError] = useState("");

	const handleSuccess = (outcome: BlockItemSummaryInBlock) => {
		try {
			const address = parseContractAddress(outcome);
			props.onSuccess({
				address,
				name: form.contractDisplayName,
				type: ContractType.IdentityRegistry,
			});
		} catch (error) {
			setError(error instanceof Error ? error.message : "Unknown error");
			return;
		}
	};

	const isFormValid = () => {
		return form.contractDisplayName.length > 0;
	};

	const setFormValue = (key: keyof typeof form, value: string) => {
		setForm((prev) => ({ ...prev, [key]: value }));
	};

	return (
		<form>
			<Stack spacing={2}>
				<TextField
					id="contractDisplayName"
					name="contractDisplayName"
					label="Contract Display Name"
					variant="outlined"
					fullWidth
					required
					type="text"
					onChange={(e) => setFormValue("contractDisplayName", e.target.value)}
				/>
				<SendTransactionButton
					onClick={() => initialize(wallet.provider!, wallet.currentAccount!)}
					onSuccess={handleSuccess}
					toContractError={(r) => errorString(r)}
					disabled={!isFormValid()}>
					Initialize Identity Registry
				</SendTransactionButton>
				{error && <ErrorDisplay text={error} />}
			</Stack>
		</form>
	);
}
