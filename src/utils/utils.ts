import { Media } from "../models/media";
import { Token } from "../models/token";

export const normalizeNumber = (num?: number): string => {
  if (num != null) {
    return (Math.round(num * 100) / 100).toLocaleString("en-US");
  }
  return "N/A";
};

export const getRandom = (array: Array<any>): any => {
  return array[Math.floor(Math.random() * array.length)];
};

export const cleanText = (text?: string) => {
  return (text ?? "").replace(/[^a-z0-9]/gi, "");
};

export const getImageUrlFromToken = (
  token: Token,
  size?: string
): string | undefined => {
  if (token?.image?.url != null && token?.image?.url.startsWith("data")) {
    return token?.image?.url;
  }
  if (size != null) {
    if (token?.image != null && Object.hasOwn(token?.image, size)) {
      return token?.image[size as keyof Media];
    }
  }
  return token?.image?.url;
};
