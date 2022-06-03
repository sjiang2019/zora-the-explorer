import { Box, Text } from "grommet";

export default function NoCollectionPage(): JSX.Element {
  const indent = ">";
  return (
    <Box
      style={{
        fontFamily: "papyrus",
        marginTop: "24px",
      }}
    >
      <Text size="large">{indent} hi </Text>
      <Text size="large">
        {indent} this is built entirely on the{" "}
        <a style={{ textDecoration: "none" }} href="https://api.zora.co/">
          zora api
        </a>
      </Text>
      <Text size="large">
        {indent} you can click the <span style={{ color: "green" }}>( i )</span>{" "}
        to see which queries i used
      </Text>
      <Text size="large">
        {indent} feel free to send feedback to{" "}
        <a
          style={{ textDecoration: "none" }}
          href="https://twitter.com/_s_teev"
        >
          @_s_teev
        </a>
      </Text>
      <Text size="large">{indent} ✌️</Text>
    </Box>
  );
}
