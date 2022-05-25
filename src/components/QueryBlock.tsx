import { Box, Layer, TextArea } from "grommet";
import { Clipboard } from "grommet-icons";
import { BACKGROUND_COLORS } from "../constants/base";
import { getRandom } from "../utils/utils";

export default function QueryBlock(props: {
  query: string;
  onClose: () => void;
}): JSX.Element {
  return (
    <Layer
      style={{ width: "70%", height: "70%" }}
      onEsc={() => props.onClose()}
      onClickOutside={() => props.onClose()}
    >
      <Box direction="row" style={{ width: "100%", height: "100%" }}>
        <TextArea
          style={{
            fontFamily: "Consolas, 'courier new'",
            background: getRandom(BACKGROUND_COLORS),
          }}
          value={props.query}
          resize={false}
          plain={true}
        />
        <Clipboard
          style={{
            marginLeft: "-30px",
            marginTop: "8px",
            cursor: "pointer",
          }}
          onClick={() => {
            navigator.clipboard.writeText(props.query);
            props.onClose();
          }}
        />
      </Box>
    </Layer>
  );
}
