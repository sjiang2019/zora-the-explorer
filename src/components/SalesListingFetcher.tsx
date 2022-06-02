import { gql, useQuery } from "@apollo/client";
import Loading from "./Loading";
import SalesListing from "./SalesListing";
import { decodeSale } from "../models/sale";
import { decodeToken } from "../models/token";
import { Box } from "grommet";
import HeaderWithQueryBlock from "./HeaderWithQueryBlock";

interface TopSalesProps {
  collectionAddress: string;
}

const TopSalesQuery: string = `
    query LargestSales($collectionAddress: String!) {
        sales(
            networks: [{chain: MAINNET, network: ETHEREUM}], 
            pagination: {limit: 10}, 
            sort: {sortKey: CHAIN_TOKEN_PRICE, sortDirection: DESC}, 
            where: {collectionAddresses: [$collectionAddress]}
        ) {
            nodes {
                sale {
                    buyerAddress
                    collectionAddress
                    saleType
                    sellerAddress
                    tokenId
                    transactionInfo {
                        blockTimestamp
                    }
                    price {
                        chainTokenPrice {
                            decimal
                            currency {
                                name
                            }
                        }
                        usdcPrice {
                            decimal
                            currency {
                                name
                            }
                        }
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

export default function SalesListingFetcher(props: TopSalesProps): JSX.Element {
  const { loading, error, data } = useQuery(gql(TopSalesQuery), {
    variables: { collectionAddress: props.collectionAddress },
  });
  return (
    <Box height="100%">
      <HeaderWithQueryBlock
        queryBlock={TopSalesQuery}
        headerText="largest sales"
      />
      {loading ? (
        <Loading />
      ) : (
        <SalesListing
          saleTokens={data.sales.nodes.map(({ sale, token }: any) => ({
            sale: decodeSale(sale),
            token: decodeToken(token),
          }))}
        />
      )}
    </Box>
  );
}
