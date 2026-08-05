import { LocalProduct } from "../types/product";
import { getProductImageUrl } from "./sanityImage";

export const ALL_CATEGORIES_QUERY = `
  *[
    _type == "category" &&
    active != false &&
    !(_id in path("drafts.**"))
  ] | order(displayOrder asc, title asc) {
    _id,
    title,
    slug,
    categoryKey,
    description,
    coverImage,
    displayOrder
  }
`;

/**
 * Fetch products belonging to a selected category.
 *
 * Supports:
 * - category key, for example: kids-baby
 * - category slug
 * - category display name, for example: Kids & Baby
 */
export const PRODUCTS_BY_CATEGORY_QUERY = `
  *[
    _type == "product" &&
    (
      category == $categoryKey ||
      category == $categorySlug ||
      category == $categoryName
    ) &&
    !(_id in path("drafts.**"))
  ] | order(featured desc, _createdAt desc, name asc) {
    _id,
    name,
    category,
    mainImage,
    secondImage,
    description,
    stockStatus,
    featured
  }
`;

/**
 * Fetch only products enabled for the Featured Collection.
 */
export const FEATURED_PRODUCTS_QUERY = `
  *[
    _type == "product" &&
    featured == true &&
    !(_id in path("drafts.**"))
  ] | order(_createdAt desc, name asc) {
    _id,
    name,
    category,
    mainImage,
    secondImage,
    description,
    stockStatus,
    featured
  }
`;

/**
 * Fetch every published product.
 */
export const ALL_PRODUCTS_QUERY = `
  *[
    _type == "product" &&
    !(_id in path("drafts.**"))
  ] | order(featured desc, _createdAt desc, name asc) {
    _id,
    name,
    category,
    mainImage,
    secondImage,
    description,
    stockStatus,
    featured
  }
`;

/**
 * Convert a Sanity image object or normal URL into a usable image URL.
 */
export function resolveImageUrl(img: any): string {
  if (!img) {
    return "";
  }

  if (typeof img === "string") {
    return img;
  }

  if (img._type === "image" || img.asset) {
    return getProductImageUrl(img) || "";
  }

  return "";
}

/**
 * Convert a Sanity product into the format used by the website.
 */
export function mapSanityProductToLocal(sp: any): LocalProduct {
  const mainUrl = resolveImageUrl(sp.mainImage);
  const secondUrl = resolveImageUrl(sp.secondImage);

  const images = [mainUrl, secondUrl].filter(
    (image): image is string => Boolean(image)
  );

  if (images.length === 0) {
    images.push(
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600"
    );
  }

  return {
    id: sp._id,
    productName: sp.name || "Untitled Product",
    category: sp.category || "mens",
    description: sp.description || "",
    stockStatus:
      sp.stockStatus === "outOfStock" ? "outOfStock" : "inStock",
    featured: Boolean(sp.featured),
    images,
  };
}