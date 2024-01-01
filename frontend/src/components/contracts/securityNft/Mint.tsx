import { ContractAddress, UpdateContractSummary } from "@concordium/web-sdk";
import { useWallet } from "../../WalletProvider";
import { useState } from "react";
import { Stack, TextField, Typography } from "@mui/material";
import SendTransactionButton from "../../common/SendTransactionButton";
import { Receiver, errorString, mint, parseEventsFromSummary } from "../../../lib/NftContract";
import { useParams } from "react-router-dom";
import { SecurityNftEventSchemaJson } from "../../../lib/ts-types";
import EventDisplay from "./EventDisplay";
import ReceiverField from "../../common/concordium/RecieverField";

interface State {
	owner?: Receiver;
	url: string;
	hash?: string;
}
export default function Mint() {
	const wallet = useWallet();
	const { index, subIndex } = useParams();
	const contract = ContractAddress.create(BigInt(index!), BigInt(subIndex!));

	const [form, setForm] = useState<State>({
		url: "",
		hash: "",
	});
	const [events, setEvents] = useState<SecurityNftEventSchemaJson[]>([]);

	const setFormValue = (key: keyof typeof form, value: unknown) => {
		console.log(key, value);
		setForm((prev) => ({ ...prev, [key]: value }));
	};
	const isFormValid = () => {
		if (!form.url || !form.owner) {
			return false;
		}

		return true;
	};

	const resetForm = () => {
		setEvents([]);
	};

	const handleSuccess = async (summary: UpdateContractSummary) => {
		setEvents(parseEventsFromSummary(summary));
	};

	return (
		<Stack spacing={2}>
			<Typography variant="caption">Owner</Typography>
			<ReceiverField
				onChange={(owner) => setFormValue("owner", owner)}
				value={form.owner}
				name="nftOwner"
				helperText="The owner of the NFT"
			/>
			<TextField
				label="Metadata URL"
				onChange={(e) => setFormValue("url", e.target.value)}
				value={form.url}
				id="nftMetadataUrl"
				name="nftMetadataUrl"
				helperText="ipfs:<hash>"
				required
			/>
			<TextField
				label="Metadata Hash"
				onChange={(e) => setFormValue("hash", e.target.value)}
				value={form.hash}
				id="nftMetadataHash"
				name="nftMetadataHash"
				helperText="Optional"
			/>
			<SendTransactionButton
				disabled={!isFormValid()}
				onFinalizedSuccess={handleSuccess}
				onFinalizedError={errorString}
				onDone={resetForm}
				onClick={() =>
					mint(wallet.provider!, wallet.currentAccount!, contract, {
						owner: form.owner!,
						tokens: [
							{
								metadataUrl: {
									url: form.url,
									hash: form.hash,
								},
							},
						],
					})
				}>
				Mint
			</SendTransactionButton>
			{events && events.length > 0 && (
				<>
					<Typography variant="caption">Events</Typography>
					{events.map((event, i) => (
						<EventDisplay key={i} event={event} />
					))}
				</>
			)}
		</Stack>
	);
}
