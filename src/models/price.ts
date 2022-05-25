export interface Price {
  ethPrice?: number;
  usdcPrice?: number;
}

export const decodePrice = (price: any): Price => ({
  ethPrice: price.ethPrice?.decimal,
  usdcPrice: price.usdcPrice?.decimal,
});
