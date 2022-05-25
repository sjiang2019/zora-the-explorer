import { gql, useQuery } from "@apollo/client";
import { Grommet } from "grommet";
import { useState } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import { BACKGROUND_COLORS } from "./constants/base";
import {
  ATTRIBUTES_PAGE_ROUTE,
  HOME_PAGE_ROUTE,
  NFT_PAGE_ROUTE,
  TOP_OWNERS_PAGE_ROUTE,
} from "./constants/routes";
import { decodeCollection } from "./models/collection";
import AttributesPage from "./pages/AttributesPage";
import HomePage from "./pages/HomePage";
import NFTPage from "./pages/NftPage";
import TopOwnersPage from "./pages/TopOwnersPage";
import { getRandom } from "./utils/utils";

const CollectionQuery = (collectionAddress: string): string => {
  return `
    query CollectionInfo {
        collections(
            networks: [{chain: MAINNET, network: ETHEREUM}], 
            pagination: {limit: 10, offset: 0}, 
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

function AppRouter() {
  const [collectionAddress, setCollectionAddress] = useState<string | null>(
    null
  );

  const { loading, error, data } = useQuery(
    gql(CollectionQuery(collectionAddress ?? "")),
    {
      skip: collectionAddress === null,
    }
  );

  const handleChangeCollectionAddress = (collectionAddress: string) => {
    setCollectionAddress(collectionAddress);
  };

  let collection = undefined;
  if (data?.collections?.nodes != null && data?.collections?.nodes.length > 0) {
    collection = decodeCollection(data.collections.nodes[0]);
  }
  const background = getRandom(BACKGROUND_COLORS);
  return (
    <Grommet
      background={{ color: background }}
      theme={{
        global: {
          focus: { outline: { color: "#7D4CDB", size: "1px" } },
        },
      }}
    >
      <HashRouter>
        {collection != null && !error && !loading ? (
          <Routes>
            <Route
              path={HOME_PAGE_ROUTE}
              element={
                <HomePage
                  collection={collection}
                  onChangeCollectionAddress={handleChangeCollectionAddress}
                  isLoading={loading}
                  onReset={() => setCollectionAddress(null)}
                />
              }
            />
            <Route
              path={TOP_OWNERS_PAGE_ROUTE}
              element={<TopOwnersPage collection={collection!} />}
            />
            <Route
              path={ATTRIBUTES_PAGE_ROUTE}
              element={<AttributesPage collection={collection!} />}
            />
            <Route
              path={NFT_PAGE_ROUTE}
              element={<NFTPage collection={collection!} />}
            />
          </Routes>
        ) : (
          <HomePage
            onChangeCollectionAddress={handleChangeCollectionAddress}
            isLoading={loading}
            onReset={() => setCollectionAddress(null)}
          />
        )}
      </HashRouter>
    </Grommet>
  );
}

export default AppRouter;
