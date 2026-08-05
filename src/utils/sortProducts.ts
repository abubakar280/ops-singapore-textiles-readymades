import { LocalProduct } from "../types/product";

export type SortOption = "featured" | "newest" | "nameAsc" | "nameDesc" | "inStockFirst";

export function sortProducts(products: LocalProduct[], sortOption: SortOption): LocalProduct[] {
  const result = [...products];

  switch (sortOption) {
    case "featured":
      // Sort featured products first, then by name
      return result.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.productName.localeCompare(b.productName);
      });

    case "newest":
      return result;

    case "nameAsc":
      // Name A-Z
      return result.sort((a, b) => a.productName.localeCompare(b.productName));

    case "nameDesc":
      // Name Z-A
      return result.sort((a, b) => b.productName.localeCompare(a.productName));

    case "inStockFirst":
      // In Stock -> Out of Stock
      const stockWeight = {
        inStock: 0,
        limitedStock: 1,
        outOfStock: 2,
      };
      return result.sort((a, b) => stockWeight[a.stockStatus] - stockWeight[b.stockStatus]);

    default:
      return result;
  }
}

