import { Grid, List, ListItem, ListItemButton, ListItemText, Paper, Stack, Typography } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ContractType } from "./ContractTypes";
import { capitalCase } from "change-case"

const contractTypes: Record<string, ContractType> = {
	rwaIdentityRegistry: ContractType.RwaIdentityRegistry,
	complianceModule: ContractType.RwaComplianceModule,
	compliance: ContractType.RwaCompliance,
	rwaSecurityNft: ContractType.RwaSecurityNft,
	sponsor: ContractType.RwaSponsor,
};

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
							{Object.keys(contractTypes).map((key) => {
								const contractType = contractTypes[key];
								return (
									<ListItem disablePadding disableGutters key={contractType}>
										<ListItemButton onClick={() => navigate(`${contractType}/init`)}>
											<ListItemText primary="Initialize" secondary={capitalCase(contractType)} />
										</ListItemButton>
									</ListItem>
								);
							})}
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
