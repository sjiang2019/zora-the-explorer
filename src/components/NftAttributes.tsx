import { Table, TableBody, TableCell, TableHeader, TableRow } from "grommet";
import { Attribute } from "../models/attribute";

export default function NFTAttributes(props: {
  attributes: Array<Attribute>;
}): JSX.Element {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell scope="col" border="bottom">
            Trait Type
          </TableCell>
          <TableCell scope="col" border="bottom">
            Attribute
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.attributes?.map((attribute: Attribute) => (
          <TableRow>
            <TableCell scope="row">{attribute.traitType}</TableCell>
            <TableCell>
              <strong>{attribute.value}</strong>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
