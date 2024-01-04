import { Paper, Stack, Typography } from "@mui/material";
import { Identity } from "../../../lib/IdentityRegistryContract";
import { AccountAddress, Address, ContractAddress } from "@concordium/web-sdk";
import AttributesList from "./AttributesList";
import CredentialsList from "./CredentialsList";

export function AddressDisplay(props: { address: Address }) {
	return (
		<Stack spacing={1} direction="row">
			{
				{
					AddressAccount: <Typography>Account: {(props.address.address as AccountAddress.Type).address}</Typography>,
					AddressContract: (
						<Typography>
							Contract: {(props.address.address as ContractAddress.Type).index?.toString()}/
							{(props.address.address as ContractAddress.Type).subindex?.toString()}
						</Typography>
					),
				}[props.address.type]
			}
		</Stack>
	);
}

export default function IdentityDisplay(props: { identity: Identity }) {
	return (
		<Stack spacing={2}>
			<Paper sx={{ p: 1 }}>
				<Typography variant="h5">Identity</Typography>
				<Paper sx={{ p: 1 }} variant="outlined">
					<Typography variant="h6">Address</Typography>
					<AddressDisplay address={props.identity.address} />
				</Paper>
				<Paper sx={{ p: 1 }} variant="outlined">
					<Typography variant="h6">Attributes</Typography>
					<AttributesList value={props.identity.attributes} />
				</Paper>
				<Paper sx={{ p: 1 }} variant="outlined">
					<Typography variant="h6">Credentials</Typography>
					<CredentialsList value={props.identity.credentials} />
				</Paper>
			</Paper>
		</Stack>
	);
}
