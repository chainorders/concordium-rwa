import { useState } from "react";
import {
	Identity,
	IdentityAttribute,
	IdentityCredential,
	errorString,
	registerIdentities,
} from "../../../lib/IdentityRegistryContract";
import { Button, Paper, Stack, Typography } from "@mui/material";
import AttributeField from "./AttributeField";
import CredentialField from "./CredentialField";
import AddressField from "../../common/concordium/AddressField";
import { Address, ContractAddress } from "@concordium/web-sdk";
import SendTransactionButton from "../../common/SendTransactionButton";
import { useParams } from "react-router-dom";
import { useWallet } from "../../WalletProvider";
import AttributesList from "./AttributesList";
import CredentialsList from "./CredentialsList";

export default function RegisterIdentity() {
	const { index, subIndex } = useParams();
	const contract = ContractAddress.create(BigInt(index!), BigInt(subIndex!));
	const wallet = useWallet();

	const [identity, setIdentity] = useState<{
		attributes: IdentityAttribute[];
		credentials: IdentityCredential[];
		address?: Address;
	}>({ attributes: [], credentials: [], address: undefined });
	const [newAttribute, setNewAttribute] = useState<IdentityAttribute | undefined>();
	const handleAttrChanged = (attribute: IdentityAttribute) => {
		if (isAttributeValid(attribute)) {
			setNewAttribute(attribute);
		}
	};
	const removeAttribute = (attribute: IdentityAttribute) => {
		setIdentity({
			...identity!,
			attributes: identity!.attributes.filter((a) => a.key !== attribute.key),
		});
	};
	const addAttribute = (attribute: IdentityAttribute) => {
		setIdentity({
			...identity!,
			attributes: [...identity!.attributes, attribute],
		});
		setNewAttribute(undefined);
	};
	const isAttributeValid = (attribute?: IdentityAttribute) => {
		if (!attribute || !attribute.key || !attribute.value || identity.attributes.find((a) => a.key === attribute.key)) {
			return false;
		}

		return true;
	};

	const [newCredential, setNewCredential] = useState<IdentityCredential | undefined>();
	const handleCredChanged = (credential: IdentityCredential) => {
		if (isCredentialValid(credential)) {
			setNewCredential(credential);
		}
	};
	const removeCredential = (credential: IdentityCredential) => {
		console.log("removeCredential", credential.id.toString("hex"));
		setIdentity({
			...identity!,
			credentials: identity!.credentials.filter((c) => !c.id.equals(credential.id)),
		});
	};
	const addCredential = (credential: IdentityCredential) => {
		setIdentity({
			...identity!,
			credentials: [...identity!.credentials, credential],
		});
		setNewCredential(undefined);
	};
	const isCredentialValid = (credential?: IdentityCredential) => {
		if (
			!credential ||
			!credential.id ||
			!credential.issuer ||
			identity.credentials.find((c) => c.id.equals(credential.id))
		) {
			return false;
		}

		return true;
	};

	const handleAddressChanged = (address?: Address) => {
		address &&
			setIdentity({
				...identity!,
				address,
			});
	};

	const isIdentityValid = () => {
		if (!identity?.address || !identity?.attributes || !identity?.attributes.length) {
			return false;
		}

		return true;
	};

	return (
		<Stack>
			<Typography variant="h5">Register Identity</Typography>
			<Typography variant="h6">Address</Typography>
			<AddressField value={identity?.address} onChange={handleAddressChanged} />
			<Typography variant="h6">Attributes</Typography>
			{identity?.attributes && <AttributesList value={identity!.attributes} onDelete={removeAttribute} />}
			<Paper sx={{ p: 1 }} variant="outlined">
				<AttributeField value={newAttribute} onChange={handleAttrChanged} />
				<Button fullWidth onClick={() => addAttribute(newAttribute!)} disabled={!isAttributeValid(newAttribute)}>
					Add attribute
				</Button>
			</Paper>
			<Typography variant="h6">Credentials</Typography>
			{identity?.credentials && <CredentialsList value={identity!.credentials} onDelete={removeCredential} />}
			<Paper sx={{ p: 1 }} variant="outlined">
				<CredentialField value={newCredential} onChange={handleCredChanged} />
				<Button fullWidth onClick={() => addCredential(newCredential!)} disabled={!isCredentialValid(newCredential)}>
					Add credential
				</Button>
			</Paper>
			<SendTransactionButton
				disabled={!isIdentityValid()}
				onFinalizedError={errorString}
				onClick={() => registerIdentities(wallet.provider!, wallet.currentAccount!, contract, [identity! as Identity])}
				onFinalized={console.log}>
				Register Identity
			</SendTransactionButton>
		</Stack>
	);
}
