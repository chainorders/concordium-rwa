import { AttributeKeyString } from "@concordium/web-sdk";
import { MenuItem, Select, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { IdentityAttribute } from "../../../lib/IdentityRegistryContract";
import AttributeValueField from "../../common/AttributeValueField";
import { AttributeValue } from "../../../lib/common/types";

export interface AttributeFieldProps {
	value?: IdentityAttribute;
	onChange?: (attribute: IdentityAttribute) => void;
	disabled?: boolean;
	readonly?: boolean;
}

interface State {
	key?: AttributeKeyString | "";
	value?: AttributeValue;
}
export default function AttributeField(props?: AttributeFieldProps) {
	const [form, setForm] = useState<State>({
		key: props?.value?.key || "",
		value: props?.value?.value,
	});

	const updateAttribute = (form: State) => {
		if (props?.onChange && form.key && form.value) {
			props.onChange({
				key: form.key,
				value: form.value,
			});
		}
	};

	const setKey = (key: AttributeKeyString | "") => {
		const newValue = { ...form, key };
		setForm(newValue);
		updateAttribute(newValue);
	};

	const setValue = (value?: AttributeValue) => {
		const newValue = { ...form, value };
		setForm(newValue);
		updateAttribute(newValue);
	};

	useEffect(() => {
		setForm({
			key: props?.value?.key || "",
			value: props?.value?.value,
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
			<AttributeValueField
				attributeKey={form.key ? form.key : undefined}
				disabled={props?.disabled}
				readonly={props?.readonly}
				value={form.value}
				onChange={setValue}
			/>
		</Stack>
	);
}
