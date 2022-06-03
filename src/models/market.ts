import { decodeTransactionInfo, TransactionInfo } from "./base";
import { decodePrice, Price } from "./price";

export interface Market {
  collectionAddress: string;
  tokenId: string;
  marketType: string;
  status: string;
  price: Price;
  transactionInfo: TransactionInfo;
}

export const decodeMarket = (market: any): Market => ({
  collectionAddress: market.collectionAddress,
  tokenId: market.tokenId,
  marketType: market.marketType,
  status: market.status,
  price: decodePrice(market.price),
  transactionInfo: decodeTransactionInfo(market.transactionInfo),
});
