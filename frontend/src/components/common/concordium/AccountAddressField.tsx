import { AccountAddress } from "@concordium/web-sdk";
import { TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";

export interface AccountAddressFieldProps extends Omit<TextFieldProps, "onChange" | "value"> {
	onChange: (address: AccountAddress.Type) => void;
	value?: AccountAddress.Type;
}

export default function AccountAddressField(props: AccountAddressFieldProps) {
	const [value, setValue] = useState(props.value?.address || "");
	const [error, setError] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setError("");
		setValue(e.target.value);

		try {
			const address = AccountAddress.fromBase58(e.target.value);
			props.onChange(address);
		} catch (e: unknown) {
			setError(e instanceof Error ? e.message : "Unknown error");
		}
	};

	return (
		<TextField
			{...props}
			name="account-address"
			fullWidth
			error={!!error}
			value={value}
			onChange={handleChange}
			helperText={(props.helperText ? props.helperText + " " : "") + "Account Address"}
		/>
	);
}
