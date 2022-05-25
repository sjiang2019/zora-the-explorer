import { Box, Text } from "grommet";
import StatsDashboardFetcher from "../components/StatsDashboardFetcher";
import SalesListingFetcher from "../components/SalesListingFetcher";
import { Collection } from "../models/collection";
import { Link, useNavigate } from "react-router-dom";
import {
  ATTRIBUTES_PAGE_ROUTE,
  TOP_OWNERS_PAGE_ROUTE,
} from "../constants/routes";
import AsciiArt from "../components/AsciiArt";
import SearchFetcher, { SearchQuery } from "../components/SearchFetcher";
import { cleanText } from "../utils/utils";
import { SearchResult } from "../models/searchResults";
import HeaderWithQueryBlock from "../components/HeaderWithQueryBlock";

interface HomePageProps {
  onChangeCollectionAddress: (address: string) => void;
  collection?: Collection;
  isLoading: boolean;
  onReset: () => void;
}

export default function HomePage(props: HomePageProps): JSX.Element {
  let navigate = useNavigate();
  const handleSelectToken = (searchResult: SearchResult) => {
    navigate(`/nft/${searchResult.tokenId!}`);
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
      <Box style={{ outline: "none" }} onClick={() => props.onReset()}>
        <HeaderWithQueryBlock
          headerText="zora the explorer"
          queryBlock={SearchQuery}
        />
      </Box>
      <SearchFetcher
        entityType="COLLECTION"
        placeholderText="try searching for a collection by name or address..."
        onSelectSearchResult={(searchResult: SearchResult) =>
          props.onChangeCollectionAddress(searchResult.collectionAddress)
        }
      />
      {props.collection ? (
        <Box>
          <AsciiArt text={cleanText(props.collection.name)} artStyle="2" />
          <StatsDashboardFetcher
            collectionAddress={props.collection.collectionAddress}
          />
          <Box
            direction="row"
            justify="between"
            style={{ fontFamily: "papyrus" }}
          >
            <Box width="48%">
              <Link
                to={TOP_OWNERS_PAGE_ROUTE}
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
                to={ATTRIBUTES_PAGE_ROUTE}
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
            collectionAddress={props.collection.collectionAddress}
          />
          <HeaderWithQueryBlock
            headerText="search nfts"
            queryBlock={SearchQuery}
          />
          <SearchFetcher
            entityType="TOKEN"
            collectionAddress={props.collection.collectionAddress}
            placeholderText="try searching for a token by id, name, attributes, etc..."
            onSelectSearchResult={handleSelectToken}
          />
        </Box>
      ) : (
        !props.isLoading && (
          <Box
            style={{
              fontFamily: "papyrus",
              marginTop: "24px",
            }}
          >
            <Text size="large">{indent} hi </Text>
            <Text size="large">
              {indent} i made this to test out the zora api
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
