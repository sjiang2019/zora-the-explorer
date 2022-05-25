import { gql, useQuery } from "@apollo/client";
import { Box, Heading } from "grommet";
import { useParams } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import HeaderWithQueryBlock from "../components/HeaderWithQueryBlock";
import NFTView from "../components/NftView";
import { HOME_PAGE_ROUTE } from "../constants/routes";
import { Collection, decodeCollection } from "../models/collection";
import { decodeEvent } from "../models/event";
import { decodeSale } from "../models/sale";
import { decodeToken, Token } from "../models/token";
import LoadingPage from "./LoadingPage";

const TokenQuery: string = `
    query Token($collectionAddress: String!, $tokenId: String!) {
        token(
            network: {chain: MAINNET, network: ETHEREUM}, 
            token: {address: $collectionAddress, tokenId: $tokenId}
        ) {
            token {
                collectionAddress
                tokenId
                owner
                name
                image {
                    url
                    mediaEncoding {
                      ... on ImageEncodingTypes {
                        large
                        poster
                        thumbnail
                      }
                    }
                }
                content {
                    url
                    mediaEncoding {
                        ... on ImageEncodingTypes {
                          large
                          poster
                          thumbnail
                        }
                    }
                }
                attributes {
                    displayType
                    traitType
                    value
                }
            }
            events(
                pagination: {limit: 10, offset: 0}, 
                sort: {sortKey: CREATED, sortDirection: DESC}, 
                filter: {eventTypes: [MINT_EVENT, TRANSFER_EVENT]}
            ) {
                collectionAddress
                eventType
                transactionInfo {
                  blockTimestamp
                }
                properties {
                    ... on MintEvent {
                        collectionAddress
                        tokenId
                        originatorAddress
                        toAddress
                        fee {
                            ethPrice {
                                decimal
                            }
                            usdcPrice {
                                decimal
                            }
                        }
                    }
                    ... on TransferEvent {
                        collectionAddress
                        tokenId
                        fromAddress
                        toAddress
                    }
                }
            }
        }
            sales(where: {tokens: [{address: $collectionAddress, tokenId: $tokenId}]}) {
              nodes {
                sale {
                  saleType
                  price {
                    ethPrice {
                      decimal
                    }
                    usdcPrice {
                      decimal
                    }
                  }
                  buyerAddress
                  sellerAddress
                  transactionInfo {
                    blockTimestamp
                  }
                }
              }
            }
            collections(
              networks: [{chain: MAINNET, network: ETHEREUM}], 
              pagination: {limit: 10, offset: 0}, 
              sort: {sortKey: NAME, sortDirection: ASC}, 
              where: {collectionAddresses: [$collectionAddress]}
          ) {
              nodes {
                  address
                  name
                  symbol
                  totalSupply
                  attributes {
                      traitType
                      valueMetrics {
                          count
                          percent
                          value
                      }
                  }
              }
          }
    }
`;

const makeNFTName = (
  collectionName?: string,
  tokenId?: string,
  tokenName?: string
): string => {
  let name = "";
  if (collectionName) {
    name += collectionName;
  }
  if (tokenId != null) {
    name += ` #${tokenId}`;
  }
  if (tokenName != null) {
    name += ` - ${tokenName}`;
  }
  return name;
};

function NFTPageHeader(props: {
  collection: Collection;
  token: Token;
}): JSX.Element {
  return (
    <Box margin={{ vertical: "24px" }}>
      <BreadCrumb
        prevPageName={props.collection.name ?? "Collection"}
        currentPageName={props.token.tokenId}
        prevPageLink={`/${props.collection.collectionAddress}`}
      />
      <Box direction="row" align="center">
        <HeaderWithQueryBlock
          headerOverride={
            <Heading level={2} style={{ fontFamily: "papyrus" }}>
              {makeNFTName(
                props.collection.name,
                props.token.tokenId,
                props.token.name
              )}
            </Heading>
          }
          headerText=""
          queryBlock={TokenQuery}
        />
      </Box>
    </Box>
  );
}

export default function NFTPage(): JSX.Element {
  let { collectionAddress, id } = useParams();
  const { loading, error, data } = useQuery(gql(TokenQuery), {
    variables: {
      collectionAddress: collectionAddress,
      tokenId: id,
    },
  });
  return (
    <Box
      pad="large"
      height="100"
      margin={{
        horizontal: "15%",
      }}
    >
      {loading ? (
        <LoadingPage />
      ) : (
        <Box>
          <NFTPageHeader
            collection={decodeCollection(data.collections.nodes[0])}
            token={decodeToken(data.token.token)}
          />
          <NFTView
            collection={decodeCollection(data.collections.nodes[0])}
            token={decodeToken(data.token.token)}
            events={data.token.events.map((event: any) => decodeEvent(event))}
            sales={data.sales.nodes.map((node: any) => decodeSale(node.sale))}
          />
        </Box>
      )}
    </Box>
  );
}
