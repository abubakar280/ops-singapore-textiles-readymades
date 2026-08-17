import { SanityImage } from "../types";

export type PromotionLinkType = "none" | "collection" | "whatsapp" | "external";

export interface SanityPromotion {
  _id: string;
  title: string;
  shortDescription?: string;
  image?: SanityImage;
  imageUrl?: string;
  offerPercentage?: number;
  startDate: string;
  endDate: string;
  active: boolean;
  displayOrder: number;
  linkType?: PromotionLinkType;
  linkValue?: string;
}

export interface Promotion {
  id: string;
  title: string;
  shortDescription?: string;
  imageUrl: string;
  offerPercentage?: number;
  startDate: string;
  endDate: string;
  active: boolean;
  displayOrder: number;
  linkType: PromotionLinkType;
  linkValue?: string;
}
