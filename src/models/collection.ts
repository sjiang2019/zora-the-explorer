import { AggregateAttribute } from "./aggregateAttribute";

export interface Collection {
  collectionAddress: string;
  symbol: string;
  name?: string;
  totalSupply?: number;
  attributes?: Array<AggregateAttribute>;
}

export const decodeCollection = (collection: any): Collection => ({
  collectionAddress: collection.address,
  symbol: collection.symbol,
  name: collection.name,
  totalSupply: collection.totalSupply,
  attributes: collection.attributes,
});
