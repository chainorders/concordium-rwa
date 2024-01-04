import {
	BlockItemSummaryInBlock,
	ContractAddress,
	TransactionKindString,
	TransactionSummaryType,
} from "@concordium/web-sdk";

export function parseContractAddress(outcome: BlockItemSummaryInBlock): ContractAddress.Type {
	switch (outcome.summary.type) {
		case TransactionSummaryType.AccountTransaction:
			switch (outcome.summary.transactionType) {
				case TransactionKindString.InitContract:
					return outcome.summary.contractInitialized.address;
				default:
					throw new Error(`Unknown account transaction type: ${outcome.summary.transactionType}`);
			}
		default:
			throw new Error(`Unknown transaction type: ${outcome.summary.type}`);
	}
}

export function contractAddToString(contractAddress: ContractAddress.Type): string {
	return `${contractAddress.index.toString()}/${contractAddress.subindex.toString()}`;
}
