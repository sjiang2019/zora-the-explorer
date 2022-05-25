import { Box, Heading, Image } from "grommet";
import { Collection } from "../models/collection";
import { Event } from "../models/event";
import { Sale } from "../models/sale";
import { Token } from "../models/token";
import { getImageUrlFromToken } from "../utils/utils";
import NFTAttributes from "./NftAttributes";
import NFTTransactionHistory from "./NftTransactionHistory";

interface NFTViewProps {
  collection: Collection;
  token: Token;
  events: Array<Event>;
  sales: Array<Sale>;
}

export default function NFTView(props: NFTViewProps): JSX.Element {
  const eventsAndSales: Array<Event | Sale> = [
    ...props.events,
    ...props.sales,
  ].sort(
    (a, b) =>
      b.transactionInfo.blockTimestamp.getTime() -
      a.transactionInfo.blockTimestamp.getTime()
  );

  return (
    <Box justify="center" style={{ fontFamily: "papyrus" }}>
      <Box direction="row" justify="between">
        <Box height="large" width="large">
          <Image fit="cover" src={getImageUrlFromToken(props.token, "large")} />
        </Box>
        <Box height="large" overflow="scroll" style={{ marginLeft: "24px" }}>
          {props.token.attributes != null && props.token.attributes.length > 0 && (
            <>
              <Heading level={3}>Metadata</Heading>
              <NFTAttributes attributes={props.token.attributes} />
            </>
          )}
        </Box>
      </Box>
      <Box>
        <Heading level={3}>Transaction History</Heading>
        <NFTTransactionHistory eventsAndSales={eventsAndSales} />
      </Box>
    </Box>
  );
}
