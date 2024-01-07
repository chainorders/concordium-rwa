import {
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Paper,
	Stack,
	Typography,
} from "@mui/material";
import { Contract, ContractType } from "./ContractTypes";
import { AccountCircle, Delete, ViewModule } from "@mui/icons-material";
import { Link } from "react-router-dom";

interface Props {
	contracts: Contract[];
	onDelete: (contract: Contract) => void;
}

function ContractLink(props: { contract: Contract }) {
	const contractAddressString = `${props.contract.address.index.toString()}/${props.contract.address.subindex.toString()}`;
	return (
		<Link to={`${props.contract.type}/${contractAddressString}`}>
			{props.contract.name} ({contractAddressString})
		</Link>
	);
}

export default function Contracts(props: Props) {
	const identityRegistries = props.contracts.filter((c) => c.type == ContractType.RwaIdentityRegistry);
	const complianceModules = props.contracts.filter((c) => c.type == ContractType.RwaComplianceModule);
	const complianceContracts = props.contracts.filter((c) => c.type == ContractType.RwaCompliance);

	return (
		<Stack spacing={1}>
			<Paper sx={{ padding: 2 }} variant="outlined">
				<Typography variant="h2" fontSize={20}>
					Identity Registries
				</Typography>
				<List>
					{identityRegistries.map((contract) => {
						return (
							<ListItem
								disablePadding
								key={contract.address.index.toString()}
								secondaryAction={
									<IconButton edge="end" aria-label="delete" onClick={() => props.onDelete(contract)}>
										<Delete />
									</IconButton>
								}>
								<ListItemButton>
									<ListItemIcon>
										<AccountCircle />
									</ListItemIcon>
									<ListItemText primary={<ContractLink contract={contract} />} />
								</ListItemButton>
							</ListItem>
						);
					})}
				</List>
			</Paper>
			<Paper sx={{ padding: 2 }} variant="outlined">
				<Typography variant="h2" fontSize={20}>
					Compliance Modules
				</Typography>
				<List>
					{complianceModules.map((contract) => {
						return (
							<ListItem
								disablePadding
								key={contract.address.index.toString()}
								secondaryAction={
									<IconButton edge="end" aria-label="delete" onClick={() => props.onDelete(contract)}>
										<Delete />
									</IconButton>
								}>
								<ListItemButton>
									<ListItemIcon>
										<ViewModule />
									</ListItemIcon>
									<ListItemText primary={<ContractLink contract={contract} />} />
								</ListItemButton>
							</ListItem>
						);
					})}
				</List>
			</Paper>
			<Paper sx={{ padding: 2 }} variant="outlined">
				<Typography variant="h2" fontSize={20}>
					Compliance Contracts
				</Typography>
				<List>
					{complianceContracts.map((contract) => {
						return (
							<ListItem
								disablePadding
								key={contract.address.index.toString()}
								secondaryAction={
									<IconButton edge="end" aria-label="delete" onClick={() => props.onDelete(contract)}>
										<Delete />
									</IconButton>
								}>
								<ListItemButton>
									<ListItemIcon>
										<ViewModule />
									</ListItemIcon>
									<ListItemText primary={<ContractLink contract={contract} />} />
								</ListItemButton>
							</ListItem>
						);
					})}
				</List>
			</Paper>
			<Paper sx={{ padding: 2 }} variant="outlined">
				<Typography variant="h2" fontSize={20}>
					Security NFT Contracts
				</Typography>
				<List>
					{props.contracts
						.filter((c) => c.type == ContractType.RwaSecurityNft)
						.map((contract) => {
							return (
								<ListItem
									disablePadding
									key={contract.address.index.toString()}
									secondaryAction={
										<IconButton edge="end" aria-label="delete" onClick={() => props.onDelete(contract)}>
											<Delete />
										</IconButton>
									}>
									<ListItemButton>
										<ListItemIcon>
											<ViewModule />
										</ListItemIcon>
										<ListItemText primary={<ContractLink contract={contract} />} />
									</ListItemButton>
								</ListItem>
							);
						})}
				</List>
			</Paper>
		</Stack>
	);
}
