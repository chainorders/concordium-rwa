import { BlockItemSummaryInBlock, TransactionKindString, TransactionSummaryType } from "@concordium/web-sdk";
import { useWallet } from "../../WalletProvider";
import SendTransactionButton from "../../common/SendTransactionButton";
import { DefaultIdentityRegistryContract, IdentityRegistryContract } from "../ContractTypes";
import { Stack, TextField } from "@mui/material";
import { useState } from "react";
import { errorString, initialize } from "../../../lib/IdentityRegistryContract";

export default function Initialize(props: { onSuccess: (contract: IdentityRegistryContract) => void }) {
	const wallet = useWallet();
	const [form, setForm] = useState({
		contractDisplayName: "",
		index: "",
		subIndex: "",
	});

	const handleSuccess = (outcome: BlockItemSummaryInBlock) => {
		switch (outcome.summary.type) {
			case TransactionSummaryType.AccountTransaction:
				switch (outcome.summary.transactionType) {
					case TransactionKindString.InitContract:
						setFormValue("index", outcome.summary.contractInitialized.address.index.toString());
						setFormValue("subIndex", outcome.summary.contractInitialized.address.subindex.toString());

						props.onSuccess({
							...DefaultIdentityRegistryContract,
							name: form.contractDisplayName,
							index: outcome.summary.contractInitialized.address.index.toString(),
							subIndex: outcome.summary.contractInitialized.address.subindex.toString(),
						});
						break;
					default:
						console.error("Unknown account transaction type", outcome.summary.transactionType);
				}
				break;
			default:
				console.error("Unknown transaction type", outcome.summary.type);
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
			</Stack>
		</form>
	);
}
