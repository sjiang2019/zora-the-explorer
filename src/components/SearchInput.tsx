import { Box, Button, Drop, Text, TextInput } from "grommet";
import { Search } from "grommet-icons";
import { useRef, useState } from "react";
import { BACKGROUND_COLORS } from "../constants/base";
import { SearchResult } from "../models/searchResults";
import { getRandom } from "../utils/utils";
import Loading from "./Loading";

export function SearchResultsDropdown(props: {
  results: Array<SearchResult>;
  target: any;
  isLoading: boolean;
  onSelect: (result: SearchResult) => void;
}): JSX.Element {
  if (props.isLoading) {
    return <Loading />;
  }
  return (
    <Drop
      align={{ top: "bottom" }}
      target={props.target}
      style={{ background: getRandom(BACKGROUND_COLORS) }}
    >
      {props.results.map((res: SearchResult) => (
        <Box
          pad="small"
          justify="between"
          direction="row"
          style={{ border: "dashed", fontFamily: "papyrus", cursor: "pointer" }}
          onClick={() => props.onSelect(res)}
        >
          <Box>
            {res.name} {res.description}
          </Box>
          <Box>{res.collectionAddress}</Box>
        </Box>
      ))}
    </Drop>
  );
}
interface SearchInputProps {
  placeholder: string;
  results: Array<SearchResult>;
  isLoading: boolean;
  onSelectSearchResult: (res: SearchResult) => void;
  onSearch: (searchQuery: string) => void;
}

export default function SearchInput(props: SearchInputProps): JSX.Element {
  const [searchText, setSearchText] = useState<string>("");
  const targetRef = useRef();

  return (
    <Box>
      <Box
        direction="row"
        margin={{ bottom: "24px" }}
        style={{ fontFamily: "papyrus" }}
        ref={targetRef as any}
      >
        <TextInput
          placeholder={<Text color="dark gray">{props.placeholder}</Text>}
          value={searchText.length > 0 ? searchText : undefined}
          onChange={(event) => setSearchText(event.target.value)}
          style={{
            border: "dotted",
            borderRadius: 0,
            paddingTop: "18px",
            lineHeight: "18px",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              props.onSearch(searchText);
            }
          }}
        />
        <Button
          icon={<Search />}
          disabled={searchText.length === 0}
          label="Search"
          onClick={() => props.onSearch(searchText)}
          style={{ borderRadius: 0, border: "dotted" }}
        />
      </Box>
      {(props.results.length > 0 || props.isLoading) && (
        <SearchResultsDropdown
          results={props.results}
          isLoading={props.isLoading}
          onSelect={props.onSelectSearchResult}
          target={targetRef.current}
        />
      )}
    </Box>
  );
}
