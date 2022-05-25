export interface Media {
  url?: string;
  large?: string;
  poster?: string;
  preview?: string;
  thumbnail?: string;
}

export const decodeMedia = (media: any) => ({
  url: media.url,
  large: media.mediaEncoding.large,
  poster: media.mediaEncoding.poster,
  preview: media.mediaEncoding.preview,
  thumbnail: media.mediaEncoding.thumbnail,
});
