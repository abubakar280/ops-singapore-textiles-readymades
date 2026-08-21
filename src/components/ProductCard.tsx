import React, { useState } from "react";
import { Eye, MessageSquare, Star } from "lucide-react";
import { LocalProduct } from "../types/product";
import { StockBadge } from "./StockBadge";
import { getWhatsAppEnquiryUrl } from "../utils/whatsapp";
import {
  trackProductClick,
  trackProductEnquiry,
  trackWhatsAppClick,
} from "../lib/analytics";

interface ProductCardProps {
  product: LocalProduct;
  categoryName: string;
  onQuickView: (product: LocalProduct) => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  categoryName,
  onQuickView,
  className = ""
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isOutOfStock = product.stockStatus === "outOfStock";
  const primaryImage = product.images[0] || "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=400";
  const secondImage = product.images[1];
  const displayImage = (isHovered && secondImage) ? secondImage : primaryImage;
  const whatsappUrl = getWhatsAppEnquiryUrl(product, categoryName);

  return (
    <article
      id={`product-card-${product.id}`}
      className={`group flex flex-col justify-between bg-white rounded-3xl border border-soft-border/50 overflow-hidden shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 min-w-0 h-full ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative aspect-square w-full bg-soft-cream/30 overflow-hidden select-none border-b border-soft-border/15">
        <img
          src={displayImage}
          alt={product.productName}
          loading="lazy"
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.03]"
          referrerPolicy="no-referrer"
        />

        {/* Featured Star Corner Badge */}
        {product.featured && (
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-[10px] font-heading font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-3xs">
              <Star size={10} className="fill-white stroke-none" />
              <span>Featured</span>
            </span>
          </div>
        )}

        {/* Stock Status Badge on Image */}
        <div className="absolute top-4 right-4 z-10">
          <StockBadge status={product.stockStatus} />
        </div>
      </div>

      {/* Product Information - Only Product Name and Stock Status beneath image */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Product Name */}
          <h3 className="font-serif text-base sm:text-lg font-bold text-main-text group-hover:text-soft-coral transition-colors leading-snug line-clamp-2">
            {product.productName}
          </h3>

          {/* Stock Status Badge beneath title for clear visibility */}
          <div>
            <StockBadge status={product.stockStatus} />
          </div>
        </div>

        {/* Interactive Action CTA Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-6 pt-4 border-t border-soft-border/30">
          {/* Quick View Button */}
          <button
            onClick={() => {
              trackProductClick(product.id, product.productName, categoryName, "product_card");
              onQuickView(product);
            }}
            className="inline-flex items-center justify-center gap-1.5 border border-soft-border/80 hover:bg-light-beige/25 hover:border-soft-border text-main-text font-heading font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer"
            aria-label={`Quick view details of ${product.productName}`}
          >
            <Eye size={13} strokeWidth={2.5} />
            <span>Quick View</span>
          </button>

          {/* WhatsApp Enquiry Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackProductEnquiry(product.id, product.productName, categoryName, "whatsapp");
              trackWhatsAppClick("product_card", {
                productId: product.id,
                productName: product.productName,
                category: categoryName,
              });
            }}
            className={`inline-flex items-center justify-center gap-1.5 font-heading font-bold text-xs py-2.5 rounded-xl shadow-3xs hover:shadow-xs transition-colors duration-150 ${
              isOutOfStock
                ? "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-100"
                : "bg-emerald-600 hover:bg-emerald-700 text-white"
            }`}
            aria-label={`Enquire about ${product.productName} on WhatsApp`}
          >
            <MessageSquare size={13} fill={isOutOfStock ? "none" : "currentColor"} />
            <span>Enquire</span>
          </a>
        </div>
      </div>
    </article>
  );
};

