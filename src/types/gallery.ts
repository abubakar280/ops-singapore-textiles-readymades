import { SanityImage } from "../types";

export type GalleryCategoryValue =
  | "kids-baby"
  | "womens"
  | "mens"
  | "group-dresses"
  | "religious"
  | "home-essentials"
  | "store"
  | "other";

export interface SanityGalleryItem {
  _id: string;
  title: string;
  image?: SanityImage;
  category?: string;
  shortDescription?: string;
  displayOrder?: number;
  active?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  category?: string;
  categoryLabel?: string;
  shortDescription?: string;
  displayOrder: number;
  active: boolean;
}
