import { ContractAddress } from "@concordium/web-sdk";
import AddressField from "../../common/concordium/AddressField";
import { useState } from "react";
import SendTransactionButton from "../../common/SendTransactionButton";
import { useWallet } from "../../WalletProvider";
import { errorString, removeAgent } from "../../../lib/IdentityRegistryContract";
import { useParams } from "react-router-dom";
import { Stack } from "@mui/material";
import { Agent } from "../../../lib/common/types";

export interface IdentityRegistryAddAgentProps {
	onSuccess?: (contract: ContractAddress.Type, address: Agent) => void;
}

export default function RemoveAgent(props: IdentityRegistryAddAgentProps) {
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
				onSuccess={() => props.onSuccess?.(contract, agent!)}
				toContractError={(r) => errorString(r)}
				onClick={() => removeAgent(wallet.provider!, wallet.currentAccount!, contract, agent!)}>
				Remove Agent
			</SendTransactionButton>
		</Stack>
	);
}
