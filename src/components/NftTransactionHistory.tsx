import { Table, TableBody, TableCell, TableHeader, TableRow } from "grommet";
import { NULL_ADDRESS } from "../constants/ethereum";
import { Event, EventType, isEvent } from "../models/event";
import { isSale, Sale } from "../models/sale";
import { normalizeNumber } from "../utils/utils";

export default function NFTTransactionHistory(props: {
  eventsAndSales: Array<Event | Sale>;
}): JSX.Element {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell scope="col" border="bottom">
            Event
          </TableCell>
          <TableCell scope="col" border="bottom">
            Price
          </TableCell>
          <TableCell scope="col" border="bottom">
            From
          </TableCell>
          <TableCell scope="col" border="bottom">
            To
          </TableCell>
          <TableCell scope="col" border="bottom">
            Date
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.eventsAndSales.map((eventOrSale: Event | Sale) => {
          if (isEvent(eventOrSale)) {
            const fromAddress =
              eventOrSale.eventType === EventType.MINT_EVENT
                ? NULL_ADDRESS
                : eventOrSale.properties.fromAddress;
            return (
              <TableRow>
                <TableCell scope="row">{eventOrSale.eventType}</TableCell>
                <TableCell></TableCell>
                <TableCell>{fromAddress}</TableCell>
                <TableCell>{eventOrSale.properties.toAddress}</TableCell>
                <TableCell>
                  {eventOrSale.transactionInfo.blockTimestamp.toDateString()}
                </TableCell>
              </TableRow>
            );
          } else if (isSale(eventOrSale)) {
            return (
              <TableRow>
                <TableCell scope="row">Sale</TableCell>
                <TableCell>
                  ${normalizeNumber(eventOrSale.price.usdcPrice)} (
                  {eventOrSale.price.ethPrice}Ξ)
                </TableCell>
                <TableCell>{eventOrSale.sellerAddress}</TableCell>
                <TableCell>{eventOrSale.buyerAddress}</TableCell>
                <TableCell>
                  {eventOrSale.transactionInfo.blockTimestamp.toDateString()}
                </TableCell>
              </TableRow>
            );
          }
        })}
      </TableBody>
    </Table>
  );
}
