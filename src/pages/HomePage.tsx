import { Box, Text } from "grommet";
import StatsDashboardFetcher from "../components/StatsDashboardFetcher";
import SalesListingFetcher from "../components/SalesListingFetcher";
import { decodeCollection } from "../models/collection";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HOME_PAGE_ROUTE } from "../constants/routes";
import AsciiArt from "../components/AsciiArt";
import SearchFetcher, { SearchQuery } from "../components/SearchFetcher";
import { cleanText } from "../utils/utils";
import { SearchResult } from "../models/searchResults";
import HeaderWithQueryBlock from "../components/HeaderWithQueryBlock";
import { gql, useQuery } from "@apollo/client";

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
  const handleSelectToken = (searchResult: SearchResult) => {
    navigate(`/${searchResult.collectionAddress}/${searchResult.tokenId}`);
  };
  const indent = ">";
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
        <Box>
          <AsciiArt text={cleanText(collection.name)} artStyle="2" />
          <StatsDashboardFetcher
            collectionAddress={collection.collectionAddress}
          />
          <Box
            direction="row"
            justify="between"
            style={{ fontFamily: "papyrus" }}
          >
            <Box width="48%">
              <Link
                to={`/${collectionAddress}/owners`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    border: "dashed",
                    height: "36px",
                    textAlign: "center",
                    lineHeight: "36px",
                  }}
                >
                  owners
                </div>
              </Link>
            </Box>

            <Box width="48%">
              <Link
                to={`/${collectionAddress}/attributes`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    border: "dashed",
                    height: "36px",
                    textAlign: "center",
                    lineHeight: "36px",
                  }}
                >
                  traits and attributes
                </div>
              </Link>
            </Box>
          </Box>
          <SalesListingFetcher
            collectionAddress={collection.collectionAddress}
          />
          <HeaderWithQueryBlock
            headerText="search nfts"
            queryBlock={SearchQuery}
          />
          <SearchFetcher
            entityType="TOKEN"
            collectionAddress={collection.collectionAddress}
            placeholderText="try searching for a token by id, name, attributes, etc..."
            onSelectSearchResult={handleSelectToken}
          />
        </Box>
      ) : (
        !loading && (
          <Box
            style={{
              fontFamily: "papyrus",
              marginTop: "24px",
            }}
          >
            <Text size="large">{indent} hi </Text>
            <Text size="large">
              {indent} this is built entirely on the{" "}
              <a style={{ textDecoration: "none" }} href="https://api.zora.co/">
                zora api
              </a>
            </Text>
            <Text size="large">
              {indent} you can click the{" "}
              <span style={{ color: "green" }}>( i )</span> to see which queries
              i used
            </Text>
            <Text size="large">
              {indent} feel free to send feedback to{" "}
              <a
                style={{ textDecoration: "none" }}
                href="https://twitter.com/_s_teev"
              >
                @_s_teev
              </a>
            </Text>
            <Text size="large">{indent} ✌️</Text>
          </Box>
        )
      )}
    </Box>
  );
}
