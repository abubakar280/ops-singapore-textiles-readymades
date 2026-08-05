import { LocalProduct } from "../types/product";

export function searchProducts(products: LocalProduct[], searchTerm: string): LocalProduct[] {
  const term = searchTerm.trim().toLowerCase();
  if (!term) return products;

  return products.filter((product) => {
    return (
      product.productName.toLowerCase().includes(term) ||
      (product.description && product.description.toLowerCase().includes(term))
    );
  });
}

