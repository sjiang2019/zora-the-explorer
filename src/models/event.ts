import { decodeTransactionInfo, TransactionInfo } from "./base";

export enum EventType {
  TRANSFER_EVENT = "Transfer",
  MINT_EVENT = "Mint",
}

const EVENT_TO_TYPE_ENUM: { [eventString: string]: EventType } = {
  TRANSFER_EVENT: EventType.TRANSFER_EVENT,
  MINT_EVENT: EventType.MINT_EVENT,
};

export interface Event {
  collectionAddress: string;
  transactionInfo: TransactionInfo;
  eventType: string;
  properties: { [key: string]: string };
}

export const decodeEvent = (event: any): Event => ({
  collectionAddress: event.collectionAddress,
  eventType: EVENT_TO_TYPE_ENUM[event.eventType],
  transactionInfo: decodeTransactionInfo(event.transactionInfo),
  properties: event.properties,
});

export const isEvent = (maybeEvent: any): maybeEvent is Event => {
  return (maybeEvent as Event).eventType !== undefined;
};
