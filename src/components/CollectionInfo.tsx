import { Box } from "grommet";
import { Link, useNavigate } from "react-router-dom";
import { Collection } from "../models/collection";
import { SearchResult } from "../models/searchResults";
import { cleanText } from "../utils/utils";
import AsciiArt from "./AsciiArt";
import HeaderWithQueryBlock from "./HeaderWithQueryBlock";
import MarketsListingFetcher from "./MarketsListingFetcher";
import SalesListingFetcher from "./SalesListingFetcher";
import SearchFetcher, { SearchQuery } from "./SearchFetcher";
import StatsDashboardFetcher from "./StatsDashboardFetcher";

interface CollectionInfoProps {
  collection: Collection;
}

export default function CollectionInfo({
  collection,
}: CollectionInfoProps): JSX.Element {
  let navigate = useNavigate();
  const handleSelectToken = (searchResult: SearchResult) => {
    navigate(`/${searchResult.collectionAddress}/${searchResult.tokenId}`);
  };
  return (
    <Box>
      <AsciiArt text={cleanText(collection.name)} artStyle="2" />
      <StatsDashboardFetcher collectionAddress={collection.collectionAddress} />
      <Box direction="row" justify="between" style={{ fontFamily: "papyrus" }}>
        <Box width="48%">
          <Link
            to={`/${collection.collectionAddress}/owners`}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                border: "dashed",
                height: "48px",
                textAlign: "center",
                lineHeight: "48px",
              }}
            >
              owners
            </div>
          </Link>
        </Box>

        <Box width="48%">
          <Link
            to={`/${collection.collectionAddress}/attributes`}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                border: "dashed",
                height: "48px",
                textAlign: "center",
                lineHeight: "48px",
              }}
            >
              traits and attributes
            </div>
          </Link>
        </Box>
      </Box>
      <SalesListingFetcher collectionAddress={collection.collectionAddress} />
      <MarketsListingFetcher collectionAddress={collection.collectionAddress} />
      <HeaderWithQueryBlock headerText="search nfts" queryBlock={SearchQuery} />
      <SearchFetcher
        entityType="TOKEN"
        collectionAddress={collection.collectionAddress}
        placeholderText="try searching for a token by id, name, attributes, etc..."
        onSelectSearchResult={handleSelectToken}
      />
    </Box>
  );
}
