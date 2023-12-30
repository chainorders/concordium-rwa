import { Alert } from "@mui/material";

export default function ErrorDisplay(props: { text: string }) {
	return <Alert severity="error">{props.text}</Alert>;
}
