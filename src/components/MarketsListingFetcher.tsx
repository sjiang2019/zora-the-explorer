import { gql, useQuery } from "@apollo/client";
import Loading from "./Loading";
import MarketsListing from "./MarketsListing";
import { decodeToken } from "../models/token";
import { Box } from "grommet";
import HeaderWithQueryBlock from "./HeaderWithQueryBlock";
import { decodeMarket } from "../models/market";

interface MarketsListingFetcherProps {
  collectionAddress: string;
}

const MarketsQuery: string = `
    query LowestOnchainAsks($collectionAddress: String!) {
        markets(
            where: {collectionAddresses: [$collectionAddress]}, 
            filter: {
                marketFilters: [
                    {marketType: V1_ASK, statuses: [ACTIVE]}, 
                    {marketType: V3_ASK, statuses: [ACTIVE]}
                ]
            }, 
            sort: {sortKey: CHAIN_TOKEN_PRICE, sortDirection: ASC}
        ) {
            nodes {
                market {
                collectionAddress
                tokenId
                marketType
                status
                price {
                    chainTokenPrice {
                    decimal
                    }
                    usdcPrice {
                    decimal
                    }
                }
                transactionInfo {
                    blockNumber
                    blockTimestamp
                    logIndex
                    transactionHash
                }
                }
                token {
                    tokenId
                    collectionAddress
                    image {
                        mediaEncoding {
                        ... on ImageEncodingTypes {
                            thumbnail
                        }
                        }
                        url
                    }
                }
            }
        }
    }
`;

export default function MarketsListingFetcher(
  props: MarketsListingFetcherProps
): JSX.Element {
  const { loading, error, data } = useQuery(gql(MarketsQuery), {
    variables: { collectionAddress: props.collectionAddress },
  });
  return (
    <Box>
      {data?.markets?.nodes != null && data?.markets?.nodes.length > 0 && (
        <Box height="100%">
          <HeaderWithQueryBlock
            queryBlock={MarketsQuery}
            headerText="active onchain markets"
          />
          {loading ? (
            <Loading />
          ) : (
            <MarketsListing
              marketTokens={data.markets.nodes.map(
                ({ market, token }: any) => ({
                  market: decodeMarket(market),
                  token: decodeToken(token),
                })
              )}
            />
          )}
        </Box>
      )}
    </Box>
  );
}
