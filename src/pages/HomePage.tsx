import { Box } from "grommet";
import { decodeCollection } from "../models/collection";
import { useNavigate, useParams } from "react-router-dom";
import { HOME_PAGE_ROUTE } from "../constants/routes";
import SearchFetcher, { SearchQuery } from "../components/SearchFetcher";
import { SearchResult } from "../models/searchResults";
import HeaderWithQueryBlock from "../components/HeaderWithQueryBlock";
import { gql, useQuery } from "@apollo/client";
import NoCollectionPage from "../components/NoCollectionPage";
import CollectionInfo from "../components/CollectionInfo";

export const CollectionQuery = (collectionAddress: string): string => {
  return `
    query CollectionInfo {
        collections(
            networks: [{chain: MAINNET, network: ETHEREUM}], 
            pagination: {limit: 10}, 
            sort: {sortKey: NAME, sortDirection: ASC}, 
            where: {collectionAddresses: ["${collectionAddress}"]}
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
};

export default function HomePage(): JSX.Element {
  let { collectionAddress } = useParams();
  let navigate = useNavigate();
  const { loading, error, data } = useQuery(
    gql(CollectionQuery(collectionAddress ?? "")),
    {
      skip: collectionAddress === null,
    }
  );
  let collection = undefined;
  if (data?.collections?.nodes != null && data?.collections?.nodes.length > 0) {
    collection = decodeCollection(data.collections.nodes[0]);
  }
  return (
    <Box
      pad="large"
      style={{ minHeight: "100vh" }}
      margin={{
        horizontal: "15%",
      }}
    >
      <Box
        style={{ outline: "none" }}
        onClick={() => navigate(HOME_PAGE_ROUTE)}
      >
        <HeaderWithQueryBlock
          headerText="zora the explorer"
          queryBlock={SearchQuery}
        />
      </Box>
      <SearchFetcher
        entityType="COLLECTION"
        placeholderText="try searching for a collection by name or address..."
        onSelectSearchResult={(searchResult: SearchResult) =>
          navigate(`/${searchResult.collectionAddress}`)
        }
      />
      {collection ? (
        <CollectionInfo collection={collection} />
      ) : (
        !loading && <NoCollectionPage />
      )}
    </Box>
  );
}
