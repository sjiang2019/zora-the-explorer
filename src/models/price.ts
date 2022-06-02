export interface Price {
  chainTokenPrice?: number;
  usdcPrice?: number;
}

export const decodePrice = (price: any): Price => ({
  chainTokenPrice: price.chainTokenPrice?.decimal,
  usdcPrice: price.usdcPrice?.decimal,
});
