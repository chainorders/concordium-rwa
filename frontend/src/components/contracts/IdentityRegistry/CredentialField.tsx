import { FormLabel, Stack, TextField } from "@mui/material";
import { IdentityCredential } from "../../../lib/IdentityRegistryContract";
import ContractAddressField from "../../common/concordium/ContractAddressField";
import { useEffect, useState } from "react";
import { ContractAddress } from "@concordium/web-sdk";
import { Buffer } from "buffer/";

export interface CredentialFieldProps {
	value?: IdentityCredential;
	onChange?: (attribute: IdentityCredential) => void;
	disabled?: boolean;
	readonly?: boolean;
}

export default function CredentialField(props: CredentialFieldProps) {
	const [form, setForm] = useState({
		issuer: props?.value?.issuer,
		id: props?.value?.id.toString("hex") || "",
	});

	const updateCredential = (form: { issuer?: ContractAddress.Type; id?: string }) => {
		if (props?.onChange && form.issuer && form.id) {
			props.onChange({ issuer: form.issuer, id: Buffer.from(form.id, "hex") });
		}
	};

	const setIssuer = (issuer?: ContractAddress.Type) => {
		const newValue = { ...form, issuer, id: "" };
		setForm(newValue);
		updateCredential(newValue);
	};

	const setId = (id: string) => {
		const newValue = { ...form, id };
		setForm(newValue);
		updateCredential(newValue);
	};

	useEffect(() => {
		setForm({
			issuer: props?.value?.issuer,
			id: props?.value?.id.toString("hex") || "",
		});
	}, [props?.value]);

	return (
		<Stack>
			<FormLabel>Issuer Contract (CIS4)</FormLabel>
			<ContractAddressField
				value={props.value?.issuer}
				onChange={setIssuer}
				indexHelperText="Issuer Contract Index"
				subIndexHelperText="Issuer Contract Subindex"
			/>
			<TextField
				margin="normal"
				name="credential-id"
				id="credential-id"
				disabled={props?.disabled || !form.issuer}
				inputProps={{ readOnly: props?.readonly }}
				value={form.id}
				onChange={(e) => setId(e.target.value)}
				fullWidth
				label="Credential ID"
				helperText="The ID of the credential (ED25519 Public Key) to be registered in hex"
			/>
		</Stack>
	);
}
