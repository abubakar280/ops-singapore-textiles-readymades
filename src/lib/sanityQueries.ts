import { LocalProduct } from "../types/product";
import { Promotion, PromotionLinkType } from "../types/promotion";
import { GalleryItem } from "../types/gallery";
import { getProductImageUrl } from "./sanityImage";

// ========================================================
// CATEGORY QUERIES
// ========================================================

export const ALL_CATEGORIES_QUERY = `
  *[
    _type == "category" &&
    active == true &&
    !(_id in path("drafts.**"))
  ] | order(displayOrder asc) {
    _id,
    name,
    categoryKey,
    slug,
    shortDescription,
    fullDescription,
    heroImage,
    cardImage,
    bannerImage,
    badgeText,
    displayOrder,
    showInHero,
    showInCollections,
    active
  }
`;

export const CATEGORY_BY_KEY_OR_SLUG_QUERY = `
  *[
    _type == "category" &&
    active == true &&
    (
      categoryKey == $slug ||
      slug.current == $slug ||
      categoryKey == $categoryKey ||
      name == $name
    ) &&
    !(_id in path("drafts.**"))
  ][0] {
    _id,
    name,
    categoryKey,
    slug,
    shortDescription,
    fullDescription,
    heroImage,
    cardImage,
    bannerImage,
    badgeText,
    displayOrder,
    showInHero,
    showInCollections,
    active
  }
`;

// ========================================================
// PRODUCT QUERIES
// ========================================================

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

// ========================================================
// SHARED IMAGE HELPER
// ========================================================

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

// ========================================================
// PRODUCT MAPPER
// ========================================================

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

// ========================================================
// PROMOTION
// ========================================================

/**
 * Fetch active promotional campaigns ordered by
 * displayOrder asc, _createdAt desc.
 */
export const ACTIVE_PROMOTIONS_QUERY = `
  *[
    _type == "promotion" &&
    active == true &&
    !(_id in path("drafts.**"))
  ] | order(displayOrder asc, _createdAt desc) {
    _id,
    title,
    shortDescription,
    image,
    offerPercentage,
    startDate,
    endDate,
    active,
    displayOrder,
    linkType,
    linkValue
  }
`;

/**
 * Convert a Sanity promotion document into the format
 * used by the website.
 */
export function mapSanityPromotionToLocal(sp: any): Promotion {
  const imageUrl = resolveImageUrl(sp.image);

  return {
    id: sp._id || "",
    title: sp.title || "",
    shortDescription: sp.shortDescription || "",
    imageUrl,

    offerPercentage:
      typeof sp.offerPercentage === "number" &&
      sp.offerPercentage > 0
        ? sp.offerPercentage
        : undefined,

    startDate: sp.startDate || "",
    endDate: sp.endDate || "",
    active: sp.active !== false,

    displayOrder:
      typeof sp.displayOrder === "number"
        ? sp.displayOrder
        : 1,

    linkType:
      (sp.linkType as PromotionLinkType) || "none",

    linkValue: sp.linkValue || "",
  };
}

/**
 * Client-side validation for promotion date range
 * and active status.
 *
 * Valid iff:
 * - active === true
 * - current time >= startDate
 * - current time <= endDate
 */
export function isPromotionValid(
  promo: Promotion,
  nowMs: number = Date.now()
): boolean {
  if (!promo.active) {
    return false;
  }

  const now = nowMs;

  if (promo.startDate) {
    const start = new Date(promo.startDate).getTime();

    if (isNaN(start) || now < start) {
      return false;
    }
  } else {
    return false;
  }

  if (promo.endDate) {
    const end = new Date(promo.endDate).getTime();

    if (isNaN(end) || now > end) {
      return false;
    }
  } else {
    return false;
  }

  return true;
}

// ========================================================
// GALLERY
// ========================================================

/**
 * Fetch active gallery items ordered by
 * displayOrder asc, _createdAt desc.
 */
export const ACTIVE_GALLERY_ITEMS_QUERY = `
  *[
    _type == "galleryItem" &&
    active == true &&
    !(_id in path("drafts.**"))
  ] | order(displayOrder asc, _createdAt desc) {
    _id,
    title,
    image,
    category,
    shortDescription,
    displayOrder,
    active
  }
`;

const GALLERY_CATEGORY_LABELS: Record<string, string> = {
  "kids-baby": "Kids & Baby",
  womens: "Women's Collection",
  mens: "Men's Collection",
  "group-dresses": "Group Dresses",
  religious: "Religious Collection",
  "home-essentials": "Home Essentials",
  store: "Store / Showroom",
  other: "Other",
};

/**
 * Convert a Sanity gallery item document into
 * the format used by the website.
 */
export function mapSanityGalleryItemToLocal(
  item: any
): GalleryItem {
  const imageUrl = resolveImageUrl(item.image);

  const catKey = item.category || "";

  const categoryLabel =
    GALLERY_CATEGORY_LABELS[catKey] ||
    (catKey ? catKey : undefined);

  return {
    id: item._id || "",
    title: item.title || "Gallery Photo",
    imageUrl,
    category: catKey || undefined,
    categoryLabel,
    shortDescription: item.shortDescription || "",

    displayOrder:
      typeof item.displayOrder === "number"
        ? item.displayOrder
        : 1,

    active: item.active !== false,
  };
}