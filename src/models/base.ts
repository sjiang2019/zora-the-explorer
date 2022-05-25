export interface TransactionInfo {
  blockNumber: number;
  blockTimestamp: Date;
  transactionHash: string;
  logIndex?: number;
}

export const decodeTransactionInfo = (
  transactionInfo: any
): TransactionInfo => ({
  blockNumber: transactionInfo.blockNumber,
  blockTimestamp: new Date(transactionInfo.blockTimestamp),
  transactionHash: transactionInfo.transactionHash,
  logIndex: transactionInfo.logIndex,
});
