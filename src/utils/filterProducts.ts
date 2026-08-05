import { LocalProduct } from "../types/product";

export interface FilterCriteria {
  category?: string;
  stockStatus?: string;
  featuredOnly?: boolean;
}

export function filterProducts(products: LocalProduct[], criteria: FilterCriteria): LocalProduct[] {
  return products.filter((product) => {
    // Category filter
    if (criteria.category && criteria.category !== "all" && product.category !== criteria.category) {
      return false;
    }

    // Stock Status filter
    if (criteria.stockStatus && criteria.stockStatus !== "all" && product.stockStatus !== criteria.stockStatus) {
      return false;
    }

    // Featured Only filter
    if (criteria.featuredOnly && !product.featured) {
      return false;
    }

    return true;
  });
}

