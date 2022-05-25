import { Box, Heading, Notification, Text } from "grommet";
import { useState } from "react";
import AsciiArt from "./AsciiArt";
import QueryBlock from "./QueryBlock";

export default function HeaderWithQueryBlock(props: {
  headerText: string;
  queryBlock: string;
  headerOverride?: JSX.Element;
}): JSX.Element {
  const [showQueryBlock, setShowQueryBlock] = useState(false);
  return (
    <Box margin={{ vertical: "24px" }}>
      <Box direction="row" align="center">
        {props.headerOverride != null ? (
          props.headerOverride
        ) : (
          <AsciiArt text={props.headerText} artStyle="1" />
        )}

        <Text
          margin={{ left: "4px" }}
          color="green"
          onClick={() => {
            setShowQueryBlock(!showQueryBlock);
          }}
          style={{
            cursor: "pointer",
            fontFamily: "papyrus",
            fontWeight: "bold",
          }}
        >
          ( i )
        </Text>
      </Box>
      {showQueryBlock && (
        <QueryBlock
          query={props.queryBlock}
          onClose={() => setShowQueryBlock(false)}
        />
      )}
    </Box>
  );
}
