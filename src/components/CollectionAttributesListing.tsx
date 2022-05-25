import {
  Box,
  Menu,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "grommet";
import { useState } from "react";
import { BACKGROUND_COLORS } from "../constants/base";
import { AggregateAttribute, ValueMetric } from "../models/aggregateAttribute";
import { getRandom } from "../utils/utils";

interface CollectionAttributesListingProps {
  attributes: Array<AggregateAttribute>;
}

function TraitTypeDropdown(props: {
  selectedTraitType: string | null;
  possibleTraitTypes: Array<string>;
  onSelect: (traitType: string | null) => void;
}): JSX.Element {
  const menuItems = [
    {
      label: "All",
      onClick: () => props.onSelect(null),
      style: { fontFamily: "papyrus", border: "dotted" },
    },
  ].concat(
    props.possibleTraitTypes.map((traitType: string) => ({
      style: { fontFamily: "papyrus", border: "dotted" },
      label: traitType,
      onClick: () => props.onSelect(traitType),
    }))
  );
  return (
    <Box>
      <Menu
        dropProps={{
          align: { top: "bottom", left: "left" },
          elevation: "xlarge",
          background: { color: getRandom(BACKGROUND_COLORS) },
        }}
        label={
          props.selectedTraitType != null
            ? `Trait Type: ${props.selectedTraitType}`
            : "Trait Type: All"
        }
        items={menuItems}
      />
    </Box>
  );
}

export default function CollectionAttributesListing(
  props: CollectionAttributesListingProps
): JSX.Element {
  const sortedAttributes = props.attributes
    .slice()
    .sort((a: AggregateAttribute, b: AggregateAttribute) => {
      return a.traitType < b.traitType ? -1 : 1;
    });
  const [selectedTraitType, setSelectedTraitType] = useState<string | null>(
    null
  );

  const attributes =
    selectedTraitType != null
      ? sortedAttributes.filter(
          (attribute: AggregateAttribute) =>
            attribute.traitType === selectedTraitType
        )
      : sortedAttributes;

  return (
    <Box>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell scope="col" border="bottom">
              <TraitTypeDropdown
                selectedTraitType={selectedTraitType}
                possibleTraitTypes={sortedAttributes.map(
                  (attribute: AggregateAttribute) => attribute.traitType
                )}
                onSelect={setSelectedTraitType}
              />
            </TableCell>
            <TableCell scope="col" border="bottom">
              Attribute
            </TableCell>
            <TableCell scope="col" border="bottom">
              Rarity (percent & count)
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attributes.map((attribute: AggregateAttribute) => {
            const sortedValueMetrics = attribute.valueMetrics
              .slice()
              .sort((a: ValueMetric, b: ValueMetric) => {
                return a.percent - b.percent;
              });
            return sortedValueMetrics.map(
              (valueMetric: ValueMetric, i: number) => {
                const border =
                  i === attribute.valueMetrics.length - 1
                    ? "bottom"
                    : undefined;
                return (
                  <TableRow>
                    <TableCell scope="row" border={border}>
                      {i === 0 ? attribute.traitType : ""}
                    </TableCell>
                    <TableCell border={border}>
                      <strong>{valueMetric.value}</strong>
                    </TableCell>
                    <TableCell border={border}>
                      {valueMetric.percent}% ({valueMetric.count})
                    </TableCell>
                  </TableRow>
                );
              }
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
}
