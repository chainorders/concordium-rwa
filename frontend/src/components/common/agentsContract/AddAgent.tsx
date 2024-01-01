import { AccountAddress, Address, ContractAddress, RejectedInit, RejectedReceive } from "@concordium/web-sdk";
import AddressField from "../concordium/AddressField";
import { useState } from "react";
import SendTransactionButton from "../SendTransactionButton";
import { useWallet } from "../../WalletProvider";
import { useParams } from "react-router-dom";
import { Stack } from "@mui/material";
import { Agent } from "../../../lib/common/types";
import { WalletApi } from "@concordium/browser-wallet-api-helpers";

export interface AddAgentProps {
	onClick: (
		provider: WalletApi,
		account: AccountAddress.Type,
		contract: ContractAddress.Type,
		agent: Address
	) => Promise<string>;
	errorString: (r: RejectedInit | RejectedReceive) => string;
	onSuccess?: (contract: ContractAddress.Type, address: Agent) => void;
}

export default function AddAgent(props: AddAgentProps) {
	const { index, subIndex } = useParams();
	const contract = ContractAddress.create(BigInt(index!), BigInt(subIndex!));
	const wallet = useWallet();

	const [agent, setAgent] = useState<Agent>();
	const isFromValid = agent !== undefined;

	return (
		<Stack spacing={2}>
			<AddressField onChange={(address) => setAgent(address)} name="AgentAddress" helperText="Agent" />
			<SendTransactionButton
				disabled={!isFromValid}
				onFinalized={() => props.onSuccess?.(contract, agent!)}
				onFinalizedError={(r) => props.errorString(r)}
				onClick={() => props.onClick(wallet.provider!, wallet.currentAccount!, contract, agent!)}>
				Add Agent
			</SendTransactionButton>
		</Stack>
	);
}
