import { Address, ContractAddress, UpdateContractSummary } from "@concordium/web-sdk";
import { useWallet } from "../../WalletProvider";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { TokenId } from "../compliance/CanTransfer";
import { burn, errorString, parseEventsFromSummary } from "../../../lib/NftContract";
import { Stack, Typography } from "@mui/material";
import TokenIdField from "../../common/concordium/TokenIdField";
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
		address?: Address;
	}>({
		tokenId: "00",
	});
	const [events, setEvents] = useState<SecurityNftEventSchemaJson[]>([]);

	const setFormValue = (key: keyof typeof form, value: unknown) => {
		setForm({ ...form, [key]: value });
	};

	const isFormValid = () => {
		return form.tokenId !== undefined && form.address !== undefined;
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
				onChange={(address) => setFormValue("address", address)}
				value={form.address}
				name="from"
				helperText="The Owner of the NFT"
			/>
			<SendTransactionButton
				disabled={!isFormValid()}
				onFinalizedSuccess={handleSuccess}
				onFinalizedError={errorString}
				onDone={resetForm}
				onClick={() =>
					burn(wallet.provider!, wallet.currentAccount!, contract, {
						tokenId: form.tokenId!,
						owner: form.address!,
						amount: "1",
					})
				}>
				Burn
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
