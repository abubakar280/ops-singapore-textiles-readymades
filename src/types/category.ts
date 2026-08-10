export interface LocalCategory {
  key: string;
  slug: string;
  name: string;
  description: string;
  shortDescription?: string;
  fullDescription?: string;
  metaTitle?: string;
  metaDescription?: string;
  coverImage?: string;
  heroImage?: string;
  cardImage?: string;
  bannerImage?: string;
  badgeText?: string;
  displayOrder?: number;
  showInHero?: boolean;
  showInCollections?: boolean;
  active?: boolean;
}
