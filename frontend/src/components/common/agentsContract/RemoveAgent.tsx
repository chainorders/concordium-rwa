import { AccountAddress, Address, ContractAddress, RejectedInit, RejectedReceive } from "@concordium/web-sdk";
import AddressField from "../concordium/AddressField";
import { useState } from "react";
import SendTransactionButton from "../SendTransactionButton";
import { useWallet } from "../../WalletProvider";
import { errorString } from "../../../lib/IdentityRegistryContract";
import { useParams } from "react-router-dom";
import { Stack } from "@mui/material";
import { Agent } from "../../../lib/common/types";
import { WalletApi } from "@concordium/browser-wallet-api-helpers";

export interface RemoveAgentProps {
	onClick: (
		provider: WalletApi,
		account: AccountAddress.Type,
		contract: ContractAddress.Type,
		agent: Address
	) => Promise<string>;
	errorString: (r: RejectedInit | RejectedReceive) => string;
	onSuccess?: (contract: ContractAddress.Type, address: Agent) => void;
}

export default function RemoveAgent(props: RemoveAgentProps) {
	const { index, subIndex } = useParams();
	const contract = ContractAddress.create(BigInt(index!), BigInt(subIndex!));
	const [agent, setAgent] = useState<Agent>();
	const isFromValid = agent !== undefined;
	const wallet = useWallet();

	return (
		<Stack spacing={2}>
			<AddressField onChange={(address) => setAgent(address)} name="AgentAddress" helperText="Agent" />
			<SendTransactionButton
				disabled={!isFromValid}
				onFinalized={() => props.onSuccess?.(contract, agent!)}
				onFinalizedError={(r) => errorString(r)}
				onClick={() => props.onClick(wallet.provider!, wallet.currentAccount!, contract, agent!)}>
				Remove Agent
			</SendTransactionButton>
		</Stack>
	);
}
