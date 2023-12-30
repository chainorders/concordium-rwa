import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { ENTRYPOINTS, ENTRYPOINTS_DISPLAY_NAMES } from "../../../lib/IdentityRegistryContract";
import { useNavigate } from "react-router-dom";

export default function EntrypointsList() {
	const navigation = useNavigate();
	return (
		<List>
			{Object.keys(ENTRYPOINTS).map((key) => {
				return (
					<ListItem disablePadding key={key}>
						<ListItemButton onClick={() => navigation(key)}>
							<ListItemText primary={ENTRYPOINTS_DISPLAY_NAMES[key]} secondary={key} />
						</ListItemButton>
					</ListItem>
				);
			})}
		</List>
	);
}
