import { useState } from "react";
import { useWallet } from "../../../../WalletProvider";
import { BlockItemSummaryInBlock, ContractAddress } from "@concordium/web-sdk";
import { AttributeValue } from "../../../../../lib/common/types";
import { List, ListItem, ListItemButton, ListItemText, Paper, Stack, TextField } from "@mui/material";
import { initialize } from "../../../../../lib/ComplianceModuleAllowedNationalities";
import SendTransactionButton from "../../../../common/SendTransactionButton";
import ContractAddressField from "../../../../common/concordium/ContractAddressField";
import { parseContractAddress } from "../../../../../lib/common/common";
import { Contract, ContractType } from "../../../ContractTypes";
import ErrorDisplay from "../../../../common/ErrorDisplay";
import { Buffer } from "buffer/";
import { errorString } from "../../../../../lib/Compliance";

export default function Initialize(props: { onSuccess: (contract: Contract) => void; identityRegistries: Contract[] }) {
	const wallet = useWallet();
	const [form, setForm] = useState<{
		contractDisplayName: string;
		identityRegistry?: ContractAddress.Type;
		nationalities: AttributeValue[];
	}>({
		contractDisplayName: "",
		nationalities: [],
	});
	const [error, setError] = useState("");

	const setFormValue = (key: keyof typeof form, value: unknown) => {
		setForm((prev) => ({ ...prev, [key]: value }));
	};
	const isFormValid = () => {
		return form.contractDisplayName.length > 0 && form.identityRegistry !== undefined && form.nationalities.length > 0;
	};
	const setNationalities = (nationalities: string) => {
		const trimmed = nationalities.trim();
		if (trimmed.length === 0) {
			setFormValue("nationalities", []);
			return;
		}
		const split = trimmed.split(",").map((s) => s.trim());
		const values = split.map((s) => Buffer.from(s.trim(), "utf8"));

		setFormValue("nationalities", values);
		console.log(values.length);
	};
	const getNationalitiesString = (nationalities: AttributeValue[]) => {
		return nationalities.map((n) => n.toString("utf8")).join(", ");
	};
	const handleSuccess = (outcome: BlockItemSummaryInBlock) => {
		try {
			const address = parseContractAddress(outcome);
			props.onSuccess({
				address,
				name: form.contractDisplayName,
				type: ContractType.ComplianceModule,
			});
		} catch (error) {
			setError(error instanceof Error ? error.message : "Unknown error");
			return;
		}
	};
	return (
		<Stack spacing={2}>
			<TextField
				id="complianceModuleContractDisplayName"
				name="complianceModuleContractDisplayName"
				label="Compliance Module Contract Display Name"
				variant="outlined"
				fullWidth
				required
				type="text"
				onChange={(e) => setFormValue("contractDisplayName", e.target.value)}
			/>
			<Paper variant="outlined" sx={{ p: 1 }}>
				<Stack spacing={1}>
					<List>
						{props.identityRegistries.map((i) => (
							<ListItem key={i.address.index.toString() + i.address.subindex.toString()}>
								<ListItemButton onClick={() => setFormValue("identityRegistry", i.address)}>
									<ListItemText
										primary={i.name}
										secondary={`${i.address.index.toString()}/${i.address.subindex.toString()}`}
									/>
								</ListItemButton>
							</ListItem>
						))}
					</List>
					<ContractAddressField
						value={form.identityRegistry}
						onChange={(value) => setFormValue("identityRegistry", value)}
						indexName="Identity Registry Index"
						subIndexName="Identity Registry SubIndex"
						indexHelperText="Identity Registry Index"
						subIndexHelperText="Identity Registry Sub Index"
					/>
				</Stack>
			</Paper>

			<TextField
				helperText="Comma Separated Values"
				onChange={(e) => setNationalities(e.target.value)}
				value={getNationalitiesString(form.nationalities)}
				id="nationalities"
				name="nationalities"
				label="Nationalities"
			/>
			<SendTransactionButton
				onClick={() =>
					initialize(wallet.provider!, wallet.currentAccount!, {
						identityRegistry: form.identityRegistry!,
						nationalities: form.nationalities,
					})
				}
				onSuccess={handleSuccess}
				toContractError={(r) => errorString(r)}
				disabled={!isFormValid()}>
				Initialize Compliance Module Allowed Nationalities
			</SendTransactionButton>
			{error && <ErrorDisplay text={error} />}
		</Stack>
	);
}
