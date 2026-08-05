export type StockStatusType = "inStock" | "limitedStock" | "outOfStock";

export interface LocalProduct {
  id: string;
  productName: string;
  category: string; // "kids-baby" | "womens" | "mens" | "group-dresses" | "religious" | "home-essentials"
  description?: string;
  stockStatus: StockStatusType;
  featured: boolean;
  images: string[]; // [mainImage, secondImage?]
}

