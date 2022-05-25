import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "grommet";

interface OwnerCount {
  owner: string;
  count: number;
}

interface OwnersListingProps {
  startIndex: number;
  ownerCounts: Array<OwnerCount>;
  hasNextPage: boolean;
  onClickNextPage: () => void;
  onClickPrevPage: () => void;
}

export default function OwnersListing(props: OwnersListingProps): JSX.Element {
  return (
    <Box style={{ fontFamily: "papyrus", minHeight: "100vh" }}>
      <Table margin={{ bottom: "24px" }}>
        <TableHeader>
          <TableRow>
            <TableCell scope="col" border="bottom">
              <strong>#</strong>
            </TableCell>
            <TableCell scope="col" border="bottom">
              <strong>Account</strong>
            </TableCell>
            <TableCell scope="col" border="bottom">
              <strong>Number Owned</strong>
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.ownerCounts.map((ownerCount: OwnerCount, i: number) => (
            <TableRow>
              <TableCell scope="row">{props.startIndex + i + 1}</TableCell>
              <TableCell scope="row">{ownerCount.owner}</TableCell>
              <TableCell>{ownerCount.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box direction="row" justify="between">
        <div
          style={{
            border: "dashed",
            height: "36px",
            textAlign: "center",
            lineHeight: "36px",
            paddingLeft: "18px",
            paddingRight: "18px",
            cursor: "pointer",
          }}
          onClick={() => props.onClickPrevPage()}
        >
          Prev
        </div>

        <div
          style={{
            border: "dashed",
            height: "36px",
            textAlign: "center",
            lineHeight: "36px",
            paddingLeft: "18px",
            paddingRight: "18px",
            cursor: "pointer",
          }}
          onClick={() => props.onClickNextPage()}
        >
          Next
        </div>
      </Box>
    </Box>
  );
}
