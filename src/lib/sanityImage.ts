import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./sanityClient";
import { SanityImage } from "../types";

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlFor(source: SanityImage | any) {
  if (!builder || !source) {
    return null;
  }
  return builder.image(source);
}

/**
 * Returns a secure, optimized URL for a given image, or a fallback empty string if the config is not present.
 */
export function getProductImageUrl(image: SanityImage | any, width?: number): string {
  const urlBuilder = urlFor(image);
  if (!urlBuilder) {
    return "";
  }
  
  if (width) {
    return urlBuilder.width(width).auto("format").url();
  }
  
  return urlBuilder.auto("format").url();
}
