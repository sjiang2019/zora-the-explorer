import { gql, useQuery } from "@apollo/client";
import { Box, Heading } from "grommet";
import BreadCrumb from "../components/BreadCrumb";
import CollectionAttributesListing from "../components/CollectionAttributesListing";
import HeaderWithQueryBlock from "../components/HeaderWithQueryBlock";
import Loading from "../components/Loading";
import { HOME_PAGE_ROUTE } from "../constants/routes";
import { Collection } from "../models/collection";

interface AttributesProps {
  collection: Collection;
}

const AttributesQuery: string = `
    query AggregateAttributes($collectionAddress: String!) {
        collections(
            networks: [{chain: MAINNET, network: ETHEREUM}], 
            pagination: {limit: 10, offset: 0}, 
            sort: {sortKey: NAME, sortDirection: ASC}, 
            where: {collectionAddresses: [$collectionAddress]}
        ) {
            nodes {
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

export default function AttributesPage(props: AttributesProps): JSX.Element {
  const { loading, error, data } = useQuery(gql(AttributesQuery), {
    variables: { collectionAddress: props.collection.collectionAddress },
  });
  return (
    <Box
      pad="large"
      margin={{
        horizontal: "15%",
      }}
      style={{ fontFamily: "papyrus", minHeight: "100vh" }}
    >
      <BreadCrumb
        prevPageName={props.collection.name ?? "Collection"}
        currentPageName="traits and attributes"
        prevPageLink={HOME_PAGE_ROUTE}
      />
      <HeaderWithQueryBlock
        headerText="traits and attributes"
        queryBlock={AttributesQuery}
      />
      {loading ? (
        <Loading />
      ) : data?.collections?.nodes != null &&
        data?.collections?.nodes[0].attributes != null ? (
        <CollectionAttributesListing
          attributes={data.collections.nodes[0].attributes}
        />
      ) : (
        <Box height="100vh">
          <Heading level={3}>
            No attributes found for {props.collection.name}.
          </Heading>
        </Box>
      )}
    </Box>
  );
}
