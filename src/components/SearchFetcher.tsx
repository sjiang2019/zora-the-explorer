import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  decodeSearchResult,
  EntityType,
  SearchResult,
} from "../models/searchResults";
import SearchInput from "./SearchInput";

export const SearchQuery: string = `
    query Search($query: String!, $entityType: SearchableEntity!, $collectionAddresses: [String!]) {
      search(pagination: {limit: 10}, query: {text: $query}, filter: {entityType: $entityType, collectionAddresses: $collectionAddresses}) {
        nodes {
          collectionAddress
          tokenId
          description
          entityType
          name
        }
      }
    }
`;

export default function SearchFetcher(props: {
  entityType: EntityType;
  placeholderText: string;
  onSelectSearchResult: (searchResult: SearchResult) => void;
  collectionAddress?: string;
}): JSX.Element {
  const [query, setQuery] = useState<string | null>(null);
  const [results, setResults] = useState<Array<SearchResult>>([]);
  const { loading, error, data } = useQuery(gql(SearchQuery), {
    variables: {
      query: query,
      entityType: props.entityType,
      collectionAddresses:
        props.collectionAddress != null ? [props.collectionAddress] : null,
    },
    skip: query == null || query.length === 0,
  });

  const handleSetQuery = (query: string) => {
    setResults([]);
    if (query != null) {
      setQuery(query);
    }
  };

  useEffect(() => {
    if (data) {
      setResults(data.search.nodes.map((res: any) => decodeSearchResult(res)));
    }
  }, [data]);

  const handleSelectCollection = (searchResult: SearchResult) => {
    props.onSelectSearchResult(searchResult);
    setResults([]);
  };

  return (
    <SearchInput
      placeholder={props.placeholderText}
      onSelectSearchResult={handleSelectCollection}
      onSearch={handleSetQuery}
      isLoading={loading}
      results={results}
    />
  );
}
