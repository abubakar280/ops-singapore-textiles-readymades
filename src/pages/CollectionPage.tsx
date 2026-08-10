import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpDown,
  ChevronRight,
  HelpCircle,
  MessageSquare,
} from "lucide-react";

// Data & Config
import { categories } from "../data/categories";

// Reusable Components
import { CollectionHeader } from "../components/CollectionHeader";
import { ProductCard } from "../components/ProductCard";
import { ProductFilters } from "../components/ProductFilters";
import { QuickViewModal } from "../components/QuickViewModal";
import { SearchBar } from "../components/SearchBar";

// Sanity Integration
import { sanityClient } from "../lib/sanityClient";
import {
  mapSanityProductToLocal,
  PRODUCTS_BY_CATEGORY_QUERY,
  CATEGORY_BY_KEY_OR_SLUG_QUERY,
  resolveImageUrl,
} from "../lib/sanityQueries";

// Utilities
import { filterProducts } from "../utils/filterProducts";
import { searchProducts } from "../utils/searchProducts";
import { sortProducts, SortOption } from "../utils/sortProducts";
import { getGeneralWhatsAppUrl } from "../utils/whatsapp";
import { LocalProduct } from "../types/product";
import { SanityCategory } from "../types";

export const CollectionPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const localCategory = useMemo(() => {
    return categories.find(
      (category) => category.slug === slug || category.key === slug
    );
  }, [slug]);

  const [sanityCategory, setSanityCategory] = useState<SanityCategory | null>(null);
  const [sanityProducts, setSanityProducts] = useState<LocalProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStock, setSelectedStock] = useState<string>("all");
  const [featuredOnly, setFeaturedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [quickViewProduct, setQuickViewProduct] =
    useState<LocalProduct | null>(null);

  // Computed category combining Sanity & Local Fallback
  const activeCategory = useMemo(() => {
    if (sanityCategory) {
      const bannerImg = resolveImageUrl(sanityCategory.bannerImage) || resolveImageUrl(sanityCategory.coverImage);
      return {
        key: sanityCategory.categoryKey || localCategory?.key || slug || "collection",
        slug: (typeof sanityCategory.slug === "string" ? sanityCategory.slug : sanityCategory.slug?.current) || localCategory?.slug || slug || "collection",
        name: sanityCategory.name || sanityCategory.title || localCategory?.name || "Collection",
        description: sanityCategory.fullDescription || sanityCategory.shortDescription || sanityCategory.description || localCategory?.description || "",
        coverImage: bannerImg || localCategory?.coverImage,
      };
    }
    if (localCategory) {
      return {
        key: localCategory.key,
        slug: localCategory.slug,
        name: localCategory.name,
        description: localCategory.description,
        coverImage: localCategory.coverImage,
      };
    }
    return null;
  }, [sanityCategory, localCategory, slug]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });

    let isMounted = true;

    async function loadCategoryDataAndProducts() {
      setLoading(true);

      if (!sanityClient) {
        console.warn("Sanity client is not configured.");
        if (isMounted) {
          setSanityCategory(null);
          setSanityProducts([]);
          setLoading(false);
        }
        return;
      }

      try {
        // 1. Fetch matching category document
        let fetchedCat: SanityCategory | null = null;
        if (slug) {
          try {
            fetchedCat = await sanityClient.fetch(CATEGORY_BY_KEY_OR_SLUG_QUERY, {
              slug,
              categoryKey: slug,
              name: slug,
            });
            if (isMounted && fetchedCat) {
              setSanityCategory(fetchedCat);
            }
          } catch (catErr) {
            console.warn("Error fetching Sanity category document:", catErr);
          }
        }

        // 2. Fetch products matching category key, slug, or name
        const categoryKey = fetchedCat?.categoryKey || localCategory?.key || slug || "";
        const categorySlug = (typeof fetchedCat?.slug === "string" ? fetchedCat.slug : fetchedCat?.slug?.current) || localCategory?.slug || slug || "";
        const categoryName = fetchedCat?.name || fetchedCat?.title || localCategory?.name || "";

        const queryParams = {
          categoryKey,
          categorySlug,
          categoryName,
        };

        const rawItems = await sanityClient.fetch(
          PRODUCTS_BY_CATEGORY_QUERY,
          queryParams
        );

        if (!isMounted) return;

        if (Array.isArray(rawItems)) {
          const mappedProducts = rawItems.map(mapSanityProductToLocal);
          setSanityProducts(mappedProducts);
        } else {
          setSanityProducts([]);
        }
      } catch (error) {
        console.error("Error fetching Sanity category data & products:", error);
        if (isMounted) {
          setSanityProducts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadCategoryDataAndProducts();

    return () => {
      isMounted = false;
    };
  }, [slug, localCategory]);

  const processedProducts = useMemo(() => {
    let result = [...sanityProducts];

    result = searchProducts(result, searchTerm);

    result = filterProducts(result, {
      stockStatus: selectedStock,
      featuredOnly,
    });

    result = sortProducts(result, sortBy);

    return result;
  }, [
    sanityProducts,
    searchTerm,
    selectedStock,
    featuredOnly,
    sortBy,
  ]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedStock("all");
    setFeaturedOnly(false);
    setSortBy("featured");
  };

  const handleSelectQuickViewProduct = (product: LocalProduct) => {
    setQuickViewProduct(product);
  };

  if (!activeCategory) {
    return (
      <div
        id="category-not-found-view"
        className="min-h-screen bg-soft-cream flex flex-col justify-center items-center py-20"
      >
        <div className="max-w-md mx-auto px-4 text-center">
          <HelpCircle
            size={48}
            className="text-rose-500 mx-auto mb-4 animate-[pulse_2s_infinite]"
          />

          <h1 className="font-serif text-3xl font-bold text-main-text mb-2">
            Category Not Found
          </h1>

          <p className="text-muted-text text-sm mb-6 leading-relaxed">
            The collection you are trying to access does not exist or has been
            relocated.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-soft-coral text-white font-heading font-semibold text-xs px-6 py-3.5 rounded-full shadow-xs hover:shadow-sm transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-cream/30 pt-28 pb-16 flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex-1 space-y-8">
        <nav
          className="flex items-center space-x-2 text-xs font-heading font-bold text-muted-text/70 uppercase tracking-widest"
          aria-label="Breadcrumb"
        >
          <Link
            to="/"
            className="hover:text-soft-coral transition-colors"
          >
            Home
          </Link>

          <ChevronRight
            size={12}
            className="text-muted-text/40"
          />

          <span className="text-main-text select-none">
            {activeCategory.name}
          </span>
        </nav>

        <CollectionHeader
          categoryKey={activeCategory.key}
          name={activeCategory.name}
          description={activeCategory.description}
          productCount={processedProducts.length}
          coverImage={activeCategory.coverImage}
        />

        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder={`Search in ${activeCategory.name}...`}
            />

            <div className="flex items-center gap-2 shrink-0">
              <label
                htmlFor="sorting-select"
                className="text-[11px] font-heading font-extrabold text-muted-text uppercase tracking-wider flex items-center gap-1.5"
              >
                <ArrowUpDown size={12} />
                <span>Sort By:</span>
              </label>

              <select
                id="sorting-select"
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as SortOption)
                }
                className="border border-soft-border/70 rounded-xl py-2 px-3.5 text-xs bg-white text-main-text font-bold focus:outline-none focus:ring-1 focus:ring-soft-coral/40 transition-all cursor-pointer shadow-3xs"
              >
                <option value="featured">Featured First</option>
                <option value="newest">Newest Arrivals</option>
                <option value="nameAsc">Name: A to Z</option>
                <option value="nameDesc">Name: Z to A</option>
                <option value="inStockFirst">In Stock First</option>
              </select>
            </div>
          </div>

          <ProductFilters
            selectedStock={selectedStock}
            setSelectedStock={setSelectedStock}
            featuredOnly={featuredOnly}
            setFeaturedOnly={setFeaturedOnly}
            onClear={handleClearFilters}
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
              <div
                key={number}
                className="bg-white rounded-3xl border border-soft-border/40 overflow-hidden p-5 flex flex-col gap-4 animate-pulse"
              >
                <div className="bg-light-beige/40 aspect-square rounded-2xl" />
                <div className="h-4 bg-light-beige/50 rounded w-2/3" />
                <div className="h-3 bg-light-beige/30 rounded w-1/2" />

                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-soft-border/10">
                  <div className="h-9 bg-light-beige/30 rounded-xl" />
                  <div className="h-9 bg-light-beige/30 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center text-xs text-muted-text font-semibold px-1">
              <span>
                Showing <strong>{processedProducts.length}</strong>{" "}
                {processedProducts.length === 1
                  ? "garment"
                  : "garments"}

                {sanityProducts.length !== processedProducts.length &&
                  ` (filtered from ${sanityProducts.length} total)`}
              </span>

              {(searchTerm ||
                selectedStock !== "all" ||
                featuredOnly) && (
                  <button
                    onClick={handleClearFilters}
                    className="text-soft-coral font-bold hover:underline cursor-pointer"
                  >
                    Reset filters
                  </button>
                )}
            </div>

            {processedProducts.length === 0 ? (
              <div className="p-12 text-center bg-white border border-soft-border/50 rounded-3xl max-w-xl mx-auto shadow-xs my-8 select-none">
                <HelpCircle
                  size={40}
                  className="text-muted-text/30 mx-auto mb-3"
                />

                <h3 className="font-serif text-xl font-bold text-main-text mb-2">
                  {sanityProducts.length === 0
                    ? "No products have been added yet."
                    : "No Matching Products"}
                </h3>

                <p className="text-muted-text text-xs leading-relaxed mb-6">
                  {sanityProducts.length === 0
                    ? "No products have been added to this collection yet. Contact our store on WhatsApp for live stock availability and catalogue details."
                    : "No garments match your active filters or search terms. Try clearing your parameters to explore the full catalog."}
                </p>

                <div className="flex justify-center gap-3">
                  <button
                    onClick={handleClearFilters}
                    className="border border-soft-border hover:bg-light-beige/10 text-main-text font-heading font-extrabold text-xs px-5 py-3 rounded-xl transition-colors cursor-pointer"
                  >
                    Reset Search Filters
                  </button>

                  <a
                    href={getGeneralWhatsAppUrl(
                      `Hi OPS SINGAPORE TEXTILES & READYMADES, I would like to check available designs in your ${activeCategory.name} collection.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-extrabold text-xs px-5 py-3 rounded-xl transition-colors shadow-3xs"
                  >
                    <MessageSquare
                      size={14}
                      fill="currentColor"
                    />
                    <span>WhatsApp Enquiry</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {processedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    categoryName={activeCategory.name}
                    onQuickView={setQuickViewProduct}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          categoryName={activeCategory.name}
          onClose={() => setQuickViewProduct(null)}
          onSelectProduct={handleSelectQuickViewProduct}
        />
      )}
    </div>
  );
};