import { Outlet } from "react-router-dom";
import { Grid, Paper, Stack } from "@mui/material";
import EntrypointsList from "./EntrypointsList";
import { EntrypointName } from "@concordium/web-sdk";

export default function ContractTypeLayout(props: {
	entrypoints: Record<string, EntrypointName.Type<string>>;
	entrypointDisplayNames: Record<string, string>;
}) {
	return (
		<Stack>
			<Grid container spacing={1}>
				<Grid item xs={12} md={9}>
					<Paper variant="outlined" sx={{ border: 0 }}>
						<Outlet />
					</Paper>
				</Grid>
				<Grid item xs={12} md={3}>
					<Paper>
						<EntrypointsList {...props} />
					</Paper>
				</Grid>
			</Grid>
		</Stack>
	);
}
