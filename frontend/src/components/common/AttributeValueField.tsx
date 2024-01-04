import { AttributeKeyString } from "@concordium/web-sdk";
import { AttributeValue } from "../../lib/common/types";
import { TextField } from "@mui/material";
import { Buffer } from "buffer/";

export interface AttributeFieldProps {
	disabled?: boolean;
	readonly?: boolean;
	value?: AttributeValue;
	onChange?: (attribute?: AttributeValue) => void;
	attributeKey?: AttributeKeyString;
	helperText?: string;
}

export default function AttributeValueField(props: AttributeFieldProps) {
	const onChange = (value: string) => {
		if (!value) {
			props.onChange?.(undefined);
			return;
		}

		props.onChange?.(Buffer.from(value, "utf8"));
	};

	return (
		<TextField
			disabled={props?.disabled || !props.attributeKey}
			InputProps={{ readOnly: props?.readonly }}
			value={props?.value?.toString("utf8") || ""}
			onChange={(e) => onChange(e.target.value)}
			required
			helperText={props.helperText || "Attribute Value"}
			fullWidth
		/>
	);
}
