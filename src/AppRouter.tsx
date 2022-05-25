import { Grommet } from "grommet";
import { Routes, Route, HashRouter } from "react-router-dom";
import { BACKGROUND_COLORS } from "./constants/base";
import {
  ATTRIBUTES_PAGE_ROUTE,
  COLLECTION_PAGE_ROUTE,
  HOME_PAGE_ROUTE,
  NFT_PAGE_ROUTE,
  TOP_OWNERS_PAGE_ROUTE,
} from "./constants/routes";
import AttributesPage from "./pages/AttributesPage";
import HomePage from "./pages/HomePage";
import NFTPage from "./pages/NftPage";
import TopOwnersPage from "./pages/TopOwnersPage";
import { getRandom } from "./utils/utils";

function AppRouter() {
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
        <Routes>
          <Route path={HOME_PAGE_ROUTE} element={<HomePage />} />
          <Route path={COLLECTION_PAGE_ROUTE} element={<HomePage />} />
          <Route path={TOP_OWNERS_PAGE_ROUTE} element={<TopOwnersPage />} />

          <Route path={ATTRIBUTES_PAGE_ROUTE} element={<AttributesPage />} />
          <Route path={NFT_PAGE_ROUTE} element={<NFTPage />} />
        </Routes>
      </HashRouter>
    </Grommet>
  );
}

export default AppRouter;
