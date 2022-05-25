import { gql, useQuery } from "@apollo/client";
import { Box } from "grommet";
import { useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import HeaderWithQueryBlock from "../components/HeaderWithQueryBlock";
import OwnersListing from "../components/OwnersListing";
import { HOME_PAGE_ROUTE } from "../constants/routes";
import { Collection } from "../models/collection";
import LoadingPage from "./LoadingPage";

const LIMIT = 20;

const TopOwnersPageQuery: string = `
    query TopOwners($collectionAddress: String!, $limit: Int!, $offset: Int!) {
        aggregateStat {
            ownersByCount(networks: [{chain: MAINNET, network: ETHEREUM}], pagination: {limit: $limit, offset: $offset}, where: {collectionAddresses: [$collectionAddress]}) {
                nodes {
                    owner
                    count
                }
                hasNextPage
            }
        }
    }
`;

export default function TopOwnersPage(): JSX.Element {
  let { collectionAddress } = useParams();
  const [offset, setOffset] = useState(0);
  const { loading, data } = useQuery(gql(TopOwnersPageQuery), {
    variables: {
      collectionAddress: collectionAddress,
      offset: offset,
      limit: LIMIT,
    },
  });
  const handleClickPrevPage = () => {
    if (offset - LIMIT >= 0) {
      setOffset(offset - LIMIT);
    }
  };
  const handleClickNextPage = () => {
    if (data.aggregateStat.ownersByCount.hasNextPage) {
      setOffset(offset + LIMIT);
    }
  };
  return (
    <Box
      pad="large"
      height="100"
      margin={{
        horizontal: "15%",
      }}
    >
      <BreadCrumb
        prevPageName={collectionAddress ?? "collection"}
        currentPageName="owners"
        prevPageLink={`/${collectionAddress}`}
      />
      <HeaderWithQueryBlock
        headerText="owners"
        queryBlock={TopOwnersPageQuery}
      />
      {loading ? (
        <LoadingPage />
      ) : (
        <OwnersListing
          startIndex={offset}
          ownerCounts={data.aggregateStat.ownersByCount.nodes}
          hasNextPage={data.aggregateStat.ownersByCount.hasNextPage}
          onClickNextPage={handleClickNextPage}
          onClickPrevPage={handleClickPrevPage}
        />
      )}
    </Box>
  );
}
