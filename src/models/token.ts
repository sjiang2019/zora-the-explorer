import { Attribute, decodeAttribute } from "./attribute";
import { decodeMedia, Media } from "./media";

export interface Token {
  tokenId: string;
  collectionAddress: string;
  owner: string;
  attributes?: Array<Attribute>;
  content?: Media;
  image?: Media;
  name?: string;
}

export const decodeToken = (token: any) => {
  return {
    tokenId: token.tokenId,
    collectionAddress: token.collectionAddress,
    owner: token.owner,
    image: token.image ? decodeMedia(token.image) : undefined,
    content: token.content ? decodeMedia(token.content) : undefined,
    attributes: token.attributes
      ? token.attributes.map((a: any) => decodeAttribute(a))
      : undefined,
    name: token.name,
  };
};
