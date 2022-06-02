import { gql, useQuery } from "@apollo/client";
import Loading from "./Loading";
import { decodePrice } from "../models/price";
import { Box } from "grommet";
import StatsListing from "./StatsListing";
import HeaderWithQueryBlock from "./HeaderWithQueryBlock";

interface OverallStatsProps {
  collectionAddress: string;
}

const OverallStatsQuery: string = `
    query TotalSalesVolume($collectionAddress: String!) {
        aggregateStat {
            nftCount: nftCount(
                networks: [{network: ETHEREUM, chain: MAINNET}], 
                where: {collectionAddresses: [$collectionAddress]}
            )
            ownerCount: ownerCount(
              networks: [{network: ETHEREUM, chain: MAINNET}], 
              where: {collectionAddresses: [$collectionAddress]}
            )
            totalSalesVolume: salesVolume(
                networks: [{network: ETHEREUM, chain: MAINNET}], 
                where: {collectionAddresses: [$collectionAddress]}
            ) {
                chainTokenPrice
                usdcPrice
            }
            lastDaySalesVolume: salesVolume(
                networks: [{network: ETHEREUM, chain: MAINNET}], 
                where: {collectionAddresses: [$collectionAddress]},
                timeFilter: {lookbackHours: 24}
            ) {
                chainTokenPrice
                usdcPrice
            }
            lastWeekSalesVolume: salesVolume(
                networks: [{network: ETHEREUM, chain: MAINNET}], 
                where: {collectionAddresses: [$collectionAddress]},
                timeFilter: {lookbackHours: 168}
            ) {
                chainTokenPrice
                usdcPrice
            }
            lastFourWeeksSalesVolume: salesVolume(
                networks: [{network: ETHEREUM, chain: MAINNET}], 
                where: {collectionAddresses: [$collectionAddress]},
                timeFilter: {lookbackHours: 672}
            ) {
                chainTokenPrice
                usdcPrice
            }
            lastYearSalesCount: salesVolume(
                networks: [{network: ETHEREUM, chain: MAINNET}], 
                where: {collectionAddresses: [$collectionAddress]},
                timeFilter: {lookbackHours: 8760}
            ) {
                totalCount
            }
        }
        markets(
            networks: [{network: ETHEREUM, chain: MAINNET}], 
            pagination: {limit: 1}, 
            sort: {sortKey: CHAIN_TOKEN_PRICE, sortDirection: ASC}, 
            filter: {marketFilters: [
                {marketType: V1_ASK, statuses: [ACTIVE]}, 
                {marketType: V3_ASK, statuses: [ACTIVE]}
            ]}, 
            where: {collectionAddresses: [$collectionAddress]}
        ) {
            nodes {
                market {
                    price {
                        chainTokenPrice {
                            decimal
                        }
                        usdcPrice {
                            decimal
                        }
                    }
                }
            }
        }
    }
`;

export default function StatsDashboardFetcher(
  props: OverallStatsProps
): JSX.Element {
  const { loading, error, data } = useQuery(gql(OverallStatsQuery), {
    variables: { collectionAddress: props.collectionAddress },
  });
  console.log(data);
  return (
    <Box
      height="100%"
      margin={{ bottom: "48px" }}
      style={{ fontFamily: "copperplate" }}
    >
      <HeaderWithQueryBlock headerText="stats" queryBlock={OverallStatsQuery} />
      {data ? (
        <StatsListing
          nftCount={data.aggregateStat.nftCount}
          ownerCount={data.aggregateStat.ownerCount}
          lowestOnchainAskPrice={
            data.markets.nodes.length === 1
              ? decodePrice(data.markets.nodes[0].market.price)
              : undefined
          }
          lastYearSalesCount={data.aggregateStat.lastYearSalesCount.totalCount}
          totalSalesVolume={data.aggregateStat.totalSalesVolume}
          lastDaySalesVolume={data.aggregateStat.lastDaySalesVolume}
          lastWeekSalesVolume={data.aggregateStat.lastWeekSalesVolume}
          lastFourWeeksSalesVolume={data.aggregateStat.lastFourWeeksSalesVolume}
        />
      ) : (
        <Loading />
      )}
    </Box>
  );
}
