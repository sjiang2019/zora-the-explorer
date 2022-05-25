import { Box } from "grommet";
import AsciiArt from "../components/AsciiArt";

export default function ErrorPage(props: { onReset: () => void }): JSX.Element {
  return (
    <Box
      pad="large"
      height="100vh"
      margin={{
        horizontal: "15%",
      }}
    >
      <AsciiArt text="something went wrong" artStyle="1" />
      <Box width="50%" alignSelf="center">
        <div
          onClick={props.onReset}
          style={{
            border: "dashed",
            height: "36px",
            textAlign: "center",
            lineHeight: "36px",
            textDecoration: "none",
            marginTop: "32px",
            cursor: "pointer",
          }}
        >
          go back
        </div>
      </Box>
    </Box>
  );
}
