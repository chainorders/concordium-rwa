import { Address, ContractAddress } from "@concordium/web-sdk";
import AddressField from "../../common/concordium/AddressField";
import { useState } from "react";
import SendTransactionButton from "../../common/SendTransactionButton";
import { useWallet } from "../../WalletProvider";
import { deleteIdentities, errorString } from "../../../lib/IdentityRegistryContract";
import { useParams } from "react-router-dom";
import { Stack } from "@mui/material";

export interface IdentityRegistryAddAgentProps {
	onSuccess?: (contract: ContractAddress.Type, address: Address) => void;
}

export default function DeleteIdentity(props: IdentityRegistryAddAgentProps) {
	const { index, subIndex } = useParams();
	const contract = ContractAddress.create(BigInt(index!), BigInt(subIndex!));
	const [identity, setIdentity] = useState<Address>();
	const isFromValid = identity !== undefined;
	const wallet = useWallet();

	return (
		<Stack spacing={2}>
			<AddressField onChange={(address) => setIdentity(address)} name="Identity" helperText="Identity" />
			<SendTransactionButton
				disabled={!isFromValid}
				onFinalized={() => props.onSuccess?.(contract, identity!)}
				onFinalizedError={(r) => errorString(r)}
				onClick={() => deleteIdentities(wallet.provider!, wallet.currentAccount!, contract, [identity!])}>
				Delete Identity
			</SendTransactionButton>
		</Stack>
	);
}
