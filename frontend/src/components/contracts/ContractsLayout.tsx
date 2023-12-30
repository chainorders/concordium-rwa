import { Grid, Paper, Stack, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

export default function ContractsLayout() {
	return (
		<Grid container spacing={0}>
			<Grid item xs={2} md={2}>
				<Paper variant="outlined" sx={{ pt: 2, m: 1 }}>
					<Stack m={0} p={0}>
						<Typography variant="h1" fontSize={28} m={0} p={0}>
							<Link to="/contracts">Contracts</Link>
						</Typography>
						<Typography variant="h2" fontSize={18} m={0} p={0}>
							<Link to="IdentityRegistry/init">Initialize Identity Registry</Link>
						</Typography>
					</Stack>
				</Paper>
			</Grid>
			<Grid item xs={10} md={10}>
				<Paper variant="outlined" sx={{ p: 2, m: 1 }}>
					<Outlet />
				</Paper>
			</Grid>
		</Grid>
	);
}
