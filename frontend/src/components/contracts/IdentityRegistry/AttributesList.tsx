import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import { IdentityAttribute } from "../../../lib/IdentityRegistryContract";
import { Delete } from "@mui/icons-material";

export default function AttributesList(props: {
	value: IdentityAttribute[];
	onDelete?: (attr: IdentityAttribute) => void;
}) {
	return (
		<List>
			{props.value.map((attr, i) => (
				<ListItem
					key={i}
					secondaryAction={
						props.onDelete && (
							<IconButton edge="end" aria-label="delete" onClick={() => props.onDelete?.(attr)}>
								<Delete />
							</IconButton>
						)
					}>
					<ListItemText primary={attr.key} secondary={attr.value.toString("utf8")} />
				</ListItem>
			))}
		</List>
	);
}
