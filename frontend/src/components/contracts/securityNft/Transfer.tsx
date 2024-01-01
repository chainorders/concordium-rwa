import { Address, ContractAddress, UpdateContractSummary } from "@concordium/web-sdk";
import { useWallet } from "../../WalletProvider";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { TokenId } from "../compliance/CanTransfer";
import { Receiver, errorString, parseEventsFromSummary, transfer } from "../../../lib/NftContract";
import { Stack, Typography } from "@mui/material";
import TokenIdField from "../../common/concordium/TokenIdField";
import ReceiverField from "../../common/concordium/RecieverField";
import AddressField from "../../common/concordium/AddressField";
import SendTransactionButton from "../../common/SendTransactionButton";
import { SecurityNftEventSchemaJson } from "../../../lib/ts-types";
import EventDisplay from "./EventDisplay";

export default function Transfer() {
	const wallet = useWallet();
	const { index, subIndex } = useParams();
	const contract = ContractAddress.create(BigInt(index!), BigInt(subIndex!));

	const [form, setForm] = useState<{
		tokenId?: TokenId;
		to?: Receiver;
		from?: Address;
	}>({
		tokenId: "00",
	});
	const [events, setEvents] = useState<SecurityNftEventSchemaJson[]>([]);

	const setFormValue = (key: keyof typeof form, value: unknown) => {
		setForm({ ...form, [key]: value });
	};

	const isFormValid = () => {
		return form.tokenId !== undefined && form.to !== undefined && form.from !== undefined;
	};

	const resetForm = () => {
		setEvents([]);
	};

	const handleSuccess = async (summary: UpdateContractSummary) => {
		setEvents(parseEventsFromSummary(summary));
	};

	return (
		<Stack spacing={2}>
			<TokenIdField
				onChange={(tokenId) => setFormValue("tokenId", tokenId)}
				value={form.tokenId}
				name="tokenId"
				sizeByte={1}
			/>
			<AddressField
				onChange={(from) => setFormValue("from", from)}
				value={form.from}
				name="from"
				helperText="The sender of the NFT"
			/>
			<ReceiverField
				onChange={(to) => setFormValue("to", to)}
				value={form.to}
				name="to"
				helperText="The receiver of the NFT"
			/>
			<SendTransactionButton
				disabled={!isFormValid()}
				onFinalizedSuccess={handleSuccess}
				onFinalizedError={errorString}
				onDone={resetForm}
				onClick={() =>
					transfer(wallet.provider!, wallet.currentAccount!, contract, {
						tokenId: form.tokenId!,
						to: form.to!,
						from: form.from!,
						amount: "1",
					})
				}>
				Transfer
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
