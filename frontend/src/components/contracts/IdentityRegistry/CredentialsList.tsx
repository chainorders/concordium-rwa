import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import { IdentityCredential } from "../../../lib/IdentityRegistryContract";
import { Delete } from "@mui/icons-material";
import CCDScanContractLink from "../../common/concordium/CCDScanContractLink";

export default function CredentialsList(props: {
	value: IdentityCredential[];
	onDelete?: (attr: IdentityCredential) => void;
}) {
	return (
		<List>
			{props.value.map((cred, i) => (
				<ListItem
					key={i}
					secondaryAction={
						props.onDelete && (
							<IconButton edge="end" aria-label="delete" onClick={() => props.onDelete?.(cred)}>
								<Delete />
							</IconButton>
						)
					}>
					<ListItemText
						primary={
							<CCDScanContractLink
								index={cred.issuer.index.toString()}
								subIndex={cred.issuer.subindex.toString()}
								text={cred.id.toString("hex").substring(0, 10)}
							/>
						}
					/>
				</ListItem>
			))}
		</List>
	);
}
