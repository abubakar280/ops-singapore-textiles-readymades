import React, { useState, useEffect } from "react";
import { LocalProduct } from "../types/product";
import { categories } from "../data/categories";
import { ProductCard } from "./ProductCard";
import { QuickViewModal } from "./QuickViewModal";
import { sanityClient } from "../lib/sanityClient";
import { FEATURED_PRODUCTS_QUERY, mapSanityProductToLocal } from "../lib/sanityQueries";

export const FeaturedProducts: React.FC = () => {
  const [featuredList, setFeaturedList] = useState<LocalProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProduct, setSelectedProduct] = useState<LocalProduct | null>(null);

  // Map category key to category name
  const getCategoryName = (catKey: string) => {
    const found = categories.find((c) => c.key === catKey || c.slug === catKey);
    return found ? found.name : "Garments";
  };

  useEffect(() => {
    let isMounted = true;

    async function loadFeaturedProducts() {
      setLoading(true);
      if (sanityClient) {
        try {
          const rawItems = await sanityClient.fetch(FEATURED_PRODUCTS_QUERY);
          console.log("SANITY FEATURED PRODUCTS:", rawItems);
          if (isMounted) {
            if (Array.isArray(rawItems) && rawItems.length > 0) {
              const mapped = rawItems.map(mapSanityProductToLocal);
              setFeaturedList(mapped);
            } else {
              setFeaturedList([]);
            }
          }
        } catch (error) {
          console.warn("Error fetching featured products from Sanity:", error);
          if (isMounted) {
            setFeaturedList([]);
          }
        }
      } else {
        if (isMounted) {
          setFeaturedList([]);
        }
      }
      if (isMounted) {
        setLoading(false);
      }
    }

    loadFeaturedProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="featured-products" className="py-24 bg-soft-cream/45 relative border-b border-soft-border/30 overflow-hidden">
      {/* Background decoration threads */}
      <div className="absolute inset-0 opacity-[0.005] pointer-events-none bg-[radial-gradient(#292723_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-heading font-extrabold text-soft-coral tracking-widest uppercase bg-soft-coral/8 px-4 py-1.5 rounded-full select-none">
            Featured Showcase
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-main-text mt-4 mb-4">
            Featured Collection
          </h2>
          <p className="text-muted-text text-sm sm:text-base leading-relaxed">
            Explore our highlighted garments and collections, handpicked directly from our catalog.
          </p>
        </div>

        {/* Featured Products Display Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-3xl border border-soft-border/40 p-5 flex flex-col gap-4 animate-pulse">
                <div className="bg-light-beige/40 aspect-square rounded-2xl" />
                <div className="h-5 bg-light-beige/50 rounded w-3/4" />
                <div className="h-4 bg-light-beige/30 rounded w-1/3" />
                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-soft-border/10">
                  <div className="h-9 bg-light-beige/30 rounded-xl" />
                  <div className="h-9 bg-light-beige/30 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : featuredList.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white/60 rounded-3xl border border-dashed border-soft-border/60 max-w-md mx-auto">
            <p className="text-muted-text text-sm font-heading font-medium">
              No products have been added yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredList.map((product) => {
              const categoryName = getCategoryName(product.category);
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  categoryName={categoryName}
                  onQuickView={setSelectedProduct}
                />
              );
            })}
          </div>
        )}

      </div>

      {/* Homepage Quick View Modal Portal */}
      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          categoryName={getCategoryName(selectedProduct.category)}
          onClose={() => setSelectedProduct(null)}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />
      )}
    </section>
  );
};

