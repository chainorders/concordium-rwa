import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import { Contract, ContractType } from "./ContractTypes";
import { AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";

interface Props {
	contracts: Contract[];
}

function ContractLink(props: { contract: Contract }) {
	return (
		<Link to={`${props.contract.index}/${props.contract.subIndex}/${props.contract.type}`}>
			{props.contract.name} ({props.contract.index.toString()}/{props.contract.subIndex.toString()})
		</Link>
	);
}

export default function Contracts(props: Props) {
	const identityRegistries = props.contracts.filter((c) => c.type == ContractType.IdentityRegistry);

	return (
		<Stack>
			<Typography variant="h2" fontSize={20}>
				Identity Registries
			</Typography>
			<List>
				{identityRegistries.map((contract) => {
					return (
						<ListItem disablePadding key={contract.index}>
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
		</Stack>
	);
}
