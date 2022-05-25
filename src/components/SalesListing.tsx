import { Box, Grid, Image, Text } from "grommet";
import { useNavigate } from "react-router-dom";
import { Sale } from "../models/sale";
import { Token } from "../models/token";
import { getImageUrlFromToken, normalizeNumber } from "../utils/utils";

interface SaleToken {
  sale: Sale;
  token: Token;
}

interface SalesListingProps {
  saleTokens: Array<SaleToken>;
}

export default function SalesListing(props: SalesListingProps): JSX.Element {
  let navigate = useNavigate();
  return (
    <Grid columns="small" gap="small" style={{ fontFamily: "papyrus" }}>
      {props.saleTokens.map(({ sale, token }: { sale: Sale; token: Token }) => {
        return (
          <Box key={token.tokenId}>
            <Box
              height="small"
              width="small"
              key={token.tokenId}
              onClick={() => {
                navigate(`/nft/${token.tokenId}`);
              }}
            >
              <Image
                fit="cover"
                src={getImageUrlFromToken(token, "thumbnail")}
              />
            </Box>
            <Box margin={{ top: "12px" }}>
              <Text>
                <strong>#{token.tokenId}</strong>
              </Text>
              <Text>
                {normalizeNumber(sale.price.ethPrice)}Ξ ($
                {normalizeNumber(sale.price.usdcPrice)})
              </Text>
              <Text color="dark-3">
                {new Date(sale.transactionInfo.blockTimestamp).toDateString()}
              </Text>
            </Box>
          </Box>
        );
      })}
    </Grid>
  );
}
