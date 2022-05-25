import { decodeTransactionInfo, TransactionInfo } from "./base";
import { decodePrice, Price } from "./price";

export interface Sale {
  buyerAddress: string;
  sellerAddress: string;
  saleType: string;
  tokenId: string;
  price: Price;
  transactionInfo: TransactionInfo;
}

export const decodeSale = (sale: any): Sale => ({
  buyerAddress: sale.buyerAddress,
  sellerAddress: sale.sellerAddress,
  saleType: sale.saleType,
  tokenId: sale.tokenId,
  price: decodePrice(sale.price),
  transactionInfo: decodeTransactionInfo(sale.transactionInfo),
});

export const isSale = (maybeSale: any): maybeSale is Sale => {
  return (maybeSale as Sale).saleType !== undefined;
};
