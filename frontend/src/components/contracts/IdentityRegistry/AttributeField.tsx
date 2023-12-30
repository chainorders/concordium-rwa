import { AttributeKeyString } from "@concordium/web-sdk";
import { MenuItem, Select, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { IdentityAttribute } from "../../../lib/IdentityRegistryContract";
import { Buffer } from "buffer/";

export interface AttributeFieldProps {
	value?: IdentityAttribute;
	onChange?: (attribute: IdentityAttribute) => void;
	disabled?: boolean;
	readonly?: boolean;
}

interface State {
	key?: AttributeKeyString | "";
	value?: string;
}
export default function AttributeField(props?: AttributeFieldProps) {
	const [form, setForm] = useState<State>({
		key: props?.value?.key || "",
		value: props?.value?.value.toString("utf8") || "",
	});

	const updateAttribute = (form: State) => {
		if (props?.onChange && form.key && form.value) {
			props.onChange({ key: form.key, value: Buffer.from(form.value, "utf8") });
		}
	};

	const setKey = (key: AttributeKeyString | "") => {
		const newValue = { ...form, key, value: "" };
		setForm(newValue);
		updateAttribute(newValue);
	};

	const setValue = (value: string) => {
		const newValue = { ...form, value };
		setForm(newValue);
		updateAttribute(newValue);
	};

	useEffect(() => {
		setForm({
			key: props?.value?.key || "",
			value: props?.value?.value.toString("utf8") || "",
		});
	}, [props?.value]);

	return (
		<Stack direction="row">
			<Select
				disabled={props?.disabled}
				readOnly={props?.readonly}
				value={form.key}
				onChange={(e) => setKey(e.target.value as AttributeKeyString)}
				fullWidth>
				{Object.entries(AttributeKeyString).map(([key, value]) => (
					<MenuItem key={key} value={key}>
						{value}
					</MenuItem>
				))}
				<MenuItem key={""} value={""}>
					Select a Value
				</MenuItem>
			</Select>
			<TextField
				disabled={props?.disabled || !form.key}
				InputProps={{ readOnly: props?.readonly }}
				value={form.value}
				onChange={(e) => setValue(e.target.value)}
				required
				helperText="Attribute Value"
				fullWidth
			/>
		</Stack>
	);
}
