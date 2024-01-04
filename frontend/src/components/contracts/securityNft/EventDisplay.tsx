import { TextField } from "@mui/material";
import { SecurityNftEventSchemaJson } from "../../../lib/ts-types";
import JSON from "json-bigint";

export default function EventDisplay(props: { event: SecurityNftEventSchemaJson }) {
	return <TextField disabled multiline fullWidth value={JSON.stringify(props.event, null, 2)} />;
}
