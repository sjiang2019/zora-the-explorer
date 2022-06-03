import { Box, Grid, Image, Layer, Text } from "grommet";
import { useNavigate } from "react-router-dom";
import { Market } from "../models/market";
import { Token } from "../models/token";
import { getImageUrlFromToken, normalizeNumber } from "../utils/utils";
import zorb from "../assets/zorb.png";
import { useState } from "react";

interface MarketToken {
  market: Market;
  token: Token;
}

interface MarketsListingProps {
  marketTokens: Array<MarketToken>;
}

export default function MarketsListing(
  props: MarketsListingProps
): JSX.Element {
  let navigate = useNavigate();
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  return (
    <Grid columns="small" gap="small" style={{ fontFamily: "papyrus" }}>
      {props.marketTokens.map(
        ({ market, token }: { market: Market; token: Token }, idx: number) => {
          return (
            <Box key={token.tokenId}>
              <Box justify="between" direction="row">
                <Box
                  height="small"
                  width="small"
                  key={token.tokenId}
                  onClick={() => {
                    navigate(`/${token.collectionAddress}/${token.tokenId}`);
                  }}
                >
                  <Image
                    fit="cover"
                    src={getImageUrlFromToken(token, "thumbnail")}
                  />
                </Box>
                <Box>
                  <Image
                    height="32px"
                    width="32px"
                    onClick={() => {
                      window.open(
                        `https://zora.co/collections/${token.collectionAddress}/${token.tokenId}`,
                        "_blank"
                      );
                    }}
                    style={{
                      transform:
                        hoverIdx === idx
                          ? "translate(-42px, 8px) scale(1.1)"
                          : "translate(-42px, 8px)",
                      cursor: "pointer",
                    }}
                    src={zorb}
                    onMouseEnter={() => setHoverIdx(idx)}
                    onMouseLeave={() => setHoverIdx(null)}
                  />
                </Box>
              </Box>
              <Box margin={{ top: "12px" }}>
                <Text>
                  <strong>#{token.tokenId}</strong>
                </Text>
                <Text>
                  {normalizeNumber(market.price.chainTokenPrice)}Ξ ($
                  {normalizeNumber(market.price.usdcPrice)})
                </Text>
                <Text color="dark-3">
                  {new Date(
                    market.transactionInfo.blockTimestamp
                  ).toDateString()}
                </Text>
              </Box>
            </Box>
          );
        }
      )}
    </Grid>
  );
}
