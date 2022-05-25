import { Box } from "grommet";
import Ticker from "react-ticker";
import { Price } from "../models/price";
import { normalizeNumber } from "../utils/utils";

function Stat({
  statName,
  statValue,
}: {
  statName: string;
  statValue: string;
}): JSX.Element {
  return (
    <div
      style={{
        paddingRight: "32px",
        borderTop: "dashed 1px",
        borderBottom: "dashed 1px",
      }}
    >
      <p>
        <strong> {statName}: </strong> {statValue}
      </p>
    </div>
  );
}

interface StatsDashboardProps {
  nftCount: number;
  ownerCount: number;
  lastYearSalesCount: number;
  totalSalesVolume: Price;
  lastDaySalesVolume: Price;
  lastWeekSalesVolume: Price;
  lastFourWeeksSalesVolume: Price;
  lowestOnchainAskPrice?: Price;
}

export default function StatsListing(props: StatsDashboardProps): JSX.Element {
  const lowestOnchainAskPrice = props.lowestOnchainAskPrice
    ? `${normalizeNumber(
        props.lowestOnchainAskPrice.ethPrice
      )}Ξ ($${normalizeNumber(props.lowestOnchainAskPrice.usdcPrice)})`
    : "N/A";
  const statsList = [
    <Stat
      statName="number of NFTs"
      statValue={normalizeNumber(props.nftCount)}
    />,
    <Stat
      statName="number of owners"
      statValue={normalizeNumber(props.ownerCount)}
    />,
    <Stat statName="lowest on-chain price" statValue={lowestOnchainAskPrice} />,
    <Stat
      statName="number of sales (last 12 months)"
      statValue={normalizeNumber(props.lastYearSalesCount)}
    />,
    <Stat
      statName="total value of all sales (lifetime)"
      statValue={`${normalizeNumber(
        props.totalSalesVolume.ethPrice
      )}Ξ ($${normalizeNumber(props.totalSalesVolume.usdcPrice)})`}
    />,
    <Stat
      statName="value of sales (24 hours)"
      statValue={`${normalizeNumber(
        props.lastDaySalesVolume.ethPrice
      )}Ξ ($${normalizeNumber(props.lastDaySalesVolume.usdcPrice)})`}
    />,
    <Stat
      statName="value of sales (week)"
      statValue={`${normalizeNumber(
        props.lastWeekSalesVolume.ethPrice
      )}Ξ ($${normalizeNumber(props.lastWeekSalesVolume.usdcPrice)})`}
    />,
    <Stat
      statName="value of sales (4 weeks)"
      statValue={`
        ${normalizeNumber(
          props.lastFourWeeksSalesVolume.ethPrice
        )}Ξ ($${normalizeNumber(props.lastFourWeeksSalesVolume.usdcPrice)})`}
    />,
  ];
  return (
    <Box>
      <Ticker direction="toLeft" mode="chain">
        {({ index }) => statsList[index % statsList.length]}
      </Ticker>
    </Box>
  );
}
