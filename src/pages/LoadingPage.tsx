import { Box } from "grommet";
import Loading from "../components/Loading";

export default function LoadingPage(): JSX.Element {
  return (
    <Box style={{ minHeight: "100vh" }}>
      <Loading />
    </Box>
  );
}
