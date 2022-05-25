export type EntityType = "COLLECTION" | "TOKEN";

export interface SearchResult {
  collectionAddress: string;
  entityType: EntityType;
  tokenId?: string;
  name?: string;
  description?: string;
}

export const decodeSearchResult = (result: any) => {
  return {
    collectionAddress: result.collectionAddress,
    entityType: result.entityType,
    tokenId: result.tokenId,
    name: result.name,
    description: result.description,
  };
};
