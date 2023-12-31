import { Grid, List, ListItem, ListItemButton, ListItemText, Paper, Stack, Typography } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function ContractsLayout() {
	const navigate = useNavigate();

	return (
		<Grid container spacing={0}>
			<Grid item xs={2} md={2}>
				<Paper variant="outlined" sx={{ pt: 2, m: 1 }}>
					<Stack m={0} p={0}>
						<Typography variant="h1" fontSize={28} m={0} p={2}>
							<Link to="/contracts">Contracts</Link>
						</Typography>
						<List>
							<ListItem disablePadding disableGutters>
								<ListItemButton onClick={() => navigate("init/IdentityRegistry")}>
									<ListItemText primary="Initialize" secondary="Identity Registry" />
								</ListItemButton>
							</ListItem>
							<ListItem disablePadding disableGutters>
								<ListItemButton onClick={() => navigate("init/ComplianceModule/AllowedNationalities")}>
									<ListItemText primary="Initialize" secondary="Compliance Module Nationalities Allow List" />
								</ListItemButton>
							</ListItem>
							<ListItem disablePadding disableGutters>
								<ListItemButton onClick={() => navigate("init/Compliance")}>
									<ListItemText primary="Initialize" secondary="Compliance Contract" />
								</ListItemButton>
							</ListItem>
						</List>
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
