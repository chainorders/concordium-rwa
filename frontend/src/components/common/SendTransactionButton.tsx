import {
	BaseAccountTransactionSummary,
	BlockItemSummaryInBlock,
	RejectReasonTag,
	RejectedInit,
	RejectedReceive,
	TransactionHash,
	TransactionKindString,
	TransactionStatusEnum,
	TransactionSummaryType,
	UpdateContractSummary,
} from "@concordium/web-sdk";
import { useEffect, useState } from "react";
import { useNodeClient } from "../NodeClientProvider";
import { Button, CircularProgress, Icon, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import CCDScanTransactionLink from "./concordium/CCDScanTransactionLink";

type InitState = {
	type: "init";
	error: string;
	status: undefined;
	txnHash: undefined;
};

type SentState = {
	type: "sent";
	status: TransactionStatusEnum.Received | TransactionStatusEnum.Committed;
	txnHash: TransactionHash.Type;
	error: string;
};

type FinalizedState = {
	type: "finalized";
	status: TransactionStatusEnum.Finalized;
	txnHash: TransactionHash.Type;
	error: string;
};

export interface SendTransactionButtonProps {
	onClick: () => Promise<string>;
	children: React.ReactNode;
	disabled?: boolean;
	onFinalized?: (outcome: BlockItemSummaryInBlock, txnHash: TransactionHash.Type) => void;
	onFinalizedError?: (reason: RejectedInit | RejectedReceive) => string;
	/// This will only be called when the transaction is an update contract transaction
	onFinalizedSuccess?: (
		summary: BaseAccountTransactionSummary & UpdateContractSummary,
		txnHash: TransactionHash.Type
	) => void;
	// Called after final click after transaction is finalized
	onDone?: () => void;
}
export default function SendTransactionButton(props: SendTransactionButtonProps) {
	const nodeClient = useNodeClient();
	const [state, setState] = useState<InitState | SentState | FinalizedState>({
		type: "init",
		error: "",
		status: undefined,
		txnHash: undefined,
	});

	const processFinalized = (txnHash: TransactionHash.Type, outcome: BlockItemSummaryInBlock) => {
		let error = "";

		switch (outcome.summary.type) {
			case TransactionSummaryType.AccountTransaction:
				switch (outcome.summary.transactionType) {
					case TransactionKindString.Failed:
						switch (outcome.summary.rejectReason.tag) {
							case RejectReasonTag.RejectedInit:
							case RejectReasonTag.RejectedReceive: {
								console.error(outcome.summary.rejectReason);
								error =
									props.onFinalizedError?.(outcome.summary.rejectReason) ||
									`${outcome.summary.rejectReason.tag}: ${outcome.summary.rejectReason.rejectReason}`;
								break;
							}
							default:
								error = outcome.summary.rejectReason.tag;
						}
						break;
					case TransactionKindString.Update: {
						error = "";
						props.onFinalizedSuccess && props.onFinalizedSuccess(outcome.summary, txnHash);
						break;
					}
					default:
						error = "";
				}
				break;
			default:
				error = "";
		}

		setState({
			type: "finalized",
			status: TransactionStatusEnum.Finalized,
			txnHash: txnHash,
			error,
		});
		props.onFinalized && props.onFinalized(outcome, txnHash!);
	};

	useEffect(() => {
		switch (state.type) {
			case "init":
			case "finalized":
			default:
				return;
			case "sent": {
				const interval = setInterval(async () => {
					try {
						const status = await nodeClient.provider.getBlockItemStatus(state.txnHash);
						switch (status.status) {
							case TransactionStatusEnum.Received:
							case TransactionStatusEnum.Committed: {
								setState({
									type: "sent",
									status: status.status,
									txnHash: state.txnHash,
									error: "",
								});
								break;
							}
							case TransactionStatusEnum.Finalized: {
								clearInterval(interval);
								processFinalized(state.txnHash, status.outcome);
								break;
							}
						}
					} catch (error) {
						const errorString = error instanceof Error ? error.message : "Unknown error";
						setState({ ...state, error: errorString });
						clearInterval(interval);
						return;
					}
				}, 500);
				return () => clearInterval(interval);
			}
		}
	});

	const onClick = async () => {
		try {
			const txnHash = await props.onClick().then(TransactionHash.fromHexString);
			setState({
				type: "sent",
				status: TransactionStatusEnum.Received,
				txnHash,
				error: "",
			});
		} catch (error) {
			const errorString = error instanceof Error ? error.message : "Unknown error";
			setState({ ...state, error: errorString });
		}
	};

	const onDone = () => {
		setState({
			type: "init",
			error: "",
			status: undefined,
			txnHash: undefined,
		});
		props.onDone?.();
	};

	return (
		<>
			{
				{
					init: (
						<Button variant="contained" onClick={onClick} disabled={props.disabled}>
							{props.children}
						</Button>
					),
					sent: (
						<>
							<Typography>
								Transaction Hash: <CCDScanTransactionLink transactionHash={state.txnHash!} />
							</Typography>
							<Button variant="contained" disabled>
								<Typography pr={1}>Transaction {state.status!}</Typography>
								<CircularProgress size={10} />
							</Button>
						</>
					),
					finalized: (
						<>
							<Typography>
								Transaction Hash: <CCDScanTransactionLink transactionHash={state.txnHash!} />
							</Typography>
							<Button variant="contained" onClick={onDone}>
								<Typography pr={1}>Transaction {state.status!}</Typography>
								<Icon sx={{ ml: "1em" }}>
									<CheckCircle />
								</Icon>
							</Button>
						</>
					),
				}[state.type]
			}
			{state.error && <Typography color="error">{state.error}</Typography>}
		</>
	);
}
