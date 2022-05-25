import { Box } from "grommet";
import Ticker from "react-ticker";

export default function Loading(): JSX.Element {
  const loading = "*******";

  return (
    <Box>
      <Ticker direction="toLeft" mode="chain">
        {({ index }) => (
          <>
            <div style={{ paddingLeft: "72px", fontSize: "36px" }}>
              {loading[index % loading.length]}
            </div>
          </>
        )}
      </Ticker>
    </Box>
  );
}
