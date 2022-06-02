import { gql, useQuery } from "@apollo/client";
import { Box } from "grommet";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import HeaderWithQueryBlock from "../components/HeaderWithQueryBlock";
import OwnersListing from "../components/OwnersListing";
import LoadingPage from "./LoadingPage";

const LIMIT = 20;

const TopOwnersPageQuery: string = `
    query TopOwners($collectionAddress: String!, $limit: Int!, $after: String) {
        aggregateStat {
            ownersByCount(networks: [{chain: MAINNET, network: ETHEREUM}], pagination: {limit: $limit, after: $after}, where: {collectionAddresses: [$collectionAddress]}) {
                nodes {
                    owner
                    count
                }
                pageInfo {
                  hasNextPage
                  endCursor
                }
            }
        }
    }
`;

export default function TopOwnersPage(): JSX.Element {
  let { collectionAddress } = useParams();
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [seenCursors, setSeenCursors] = useState<Array<string>>([]);
  const { loading, data } = useQuery(gql(TopOwnersPageQuery), {
    variables: {
      collectionAddress: collectionAddress,
      after: endCursor,
      limit: LIMIT,
    },
  });
  const handleClickPrevPage = () => {
    if (endCursor != null) {
      const cursorIndex = seenCursors.indexOf(endCursor);
      if (cursorIndex >= 0) {
        if (cursorIndex === 0) {
          setEndCursor(null);
        } else {
          setEndCursor(seenCursors[cursorIndex - 1]);
        }
      }
    }
  };
  const handleClickNextPage = () => {
    if (data.aggregateStat.ownersByCount.pageInfo.hasNextPage) {
      setEndCursor(data.aggregateStat.ownersByCount.pageInfo.endCursor);
    }
  };
  useEffect(() => {
    if (endCursor != null && !seenCursors.includes(endCursor)) {
      setSeenCursors((seenCursors) => [...seenCursors, endCursor]);
    }
  }, [endCursor, seenCursors]);
  const startIndex =
    endCursor == null ? 0 : (seenCursors.indexOf(endCursor) + 1) * LIMIT;
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
          startIndex={startIndex}
          ownerCounts={data.aggregateStat.ownersByCount.nodes}
          hasNextPage={data.aggregateStat.ownersByCount.pageInfo.hasNextPage}
          onClickNextPage={handleClickNextPage}
          onClickPrevPage={handleClickPrevPage}
        />
      )}
    </Box>
  );
}
