/**
 * Shared TypeScript interfaces for Singapore Textiles & Readymades
 */

export interface NavigationLink {
  id: string;
  name: string;
  href: string;
}

export interface TrustPoint {
  id: string;
  title: string;
  subtitle: string;
  icon: string; // Key of lucide-react icons
}

export interface Category {
  id: string;
  name: string;
  description: string;
  tag: string;
  coverImg: string;
  itemsCount: string;
  benefits?: string[];
}

export interface ValueProp {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  priceText: string;
  features: string[];
  image: string;
  badge?: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  role: string;
  location: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
}

export interface BusinessInfo {
  name: string;
  tagline: string;
  location: string;
  addressLine1: string;
  addressLine2: string;
  fullAddress: string;
  phoneRaw: string;
  phoneDial: string;
  whatsappUrl: string;
  instagramUrl: string;
  instagramHandle: string;
  established: string;
  hours: string;
  logoUrl: string;
  googleMapsEmbedPlaceholder: string;
  googleMapsDirectionsUrl: string;
}

// ========================================================
// SANITY INTEGRATION TYPES
// ========================================================

export type ProductStockStatus = "inStock" | "limitedStock" | "outOfStock";

export interface ProductAdditionalDetail {
  label: string;
  value: string;
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  caption?: string;
}

export interface SanityCategory {
  _id: string;
  name?: string;
  title?: string;
  slug?: {
    _type: "slug";
    current: string;
  } | string;
  categoryKey: string;
  shortDescription?: string;
  fullDescription?: string;
  description?: string;
  coverImage?: SanityImage;
  heroImage?: SanityImage;
  cardImage?: SanityImage;
  bannerImage?: SanityImage;
  badgeText?: string;
  displayOrder?: number;
  showInHero?: boolean;
  showInCollections?: boolean;
  active?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface SanityProduct {
  _id: string;
  name: string;
  category: string;
  mainImage?: SanityImage;
  secondImage?: SanityImage;
  description?: string;
  stockStatus: ProductStockStatus;
  featured?: boolean;
}

export interface CollectionRouteConfig {
  key: string;
  slug: string;
  name: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
}
