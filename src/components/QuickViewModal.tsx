import React, { useState, useEffect, useRef } from "react";
import { X, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { LocalProduct } from "../types/product";
import { products } from "../data/products";
import { StockBadge } from "./StockBadge";
import { getWhatsAppEnquiryUrl } from "../utils/whatsapp";

interface QuickViewModalProps {
  product: LocalProduct;
  categoryName: string;
  onClose: () => void;
  onSelectProduct: (product: LocalProduct) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  categoryName,
  onClose,
  onSelectProduct
}) => {
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Set active image back to 0 if the product changes
  useEffect(() => {
    setActiveImgIndex(0);
  }, [product]);

  // Handle keyboard events: Escape to close, tab trapping for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0] as HTMLElement;
        const last = focusable[focusable.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };

    // Lock background scroll
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    // Focus close button on mount
    setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // Handle clicking outside the modal content container
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const isOutOfStock = product.stockStatus === "outOfStock";
  const whatsappUrl = getWhatsAppEnquiryUrl(product, categoryName);

  // Filter 4 similar products from the same category (excluding current product)
  const similarProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Carousel controls
  const handlePrevImg = () => {
    setActiveImgIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImg = () => {
    setActiveImgIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-xl animate-fade-in flex flex-col max-h-[90vh] md:max-h-none md:h-auto"
      >
        {/* Absolute Close button */}
        <button
          ref={closeBtnRef}
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-muted-text hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} className="stroke-[2.5]" />
        </button>

        {/* Modal Main Body Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 h-full overflow-y-auto md:overflow-visible">
          
          {/* Column 1: Image Showcase */}
          <div className="p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-soft-border/30 bg-soft-cream/10 select-none">
            <div className="space-y-4">
              
              {/* Main Image Container */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-soft-border/30 bg-white">
                <img
                  src={product.images[activeImgIndex]}
                  alt={`${product.productName} preview`}
                  className="w-full h-full object-cover transition-all"
                  referrerPolicy="no-referrer"
                />

                {/* Left Carousel Arrow */}
                {product.images.length > 1 && (
                  <button
                    onClick={handlePrevImg}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 bg-white/95 hover:bg-soft-coral hover:text-white text-main-text rounded-full shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-soft-coral cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={16} className="stroke-[2.5]" />
                  </button>
                )}

                {/* Right Carousel Arrow */}
                {product.images.length > 1 && (
                  <button
                    onClick={handleNextImg}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-white/95 hover:bg-soft-coral hover:text-white text-main-text rounded-full shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-soft-coral cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight size={16} className="stroke-[2.5]" />
                  </button>
                )}

                {/* Image Dots Index indicator */}
                {product.images.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-black/20 px-2 py-1 rounded-full">
                    {product.images.map((_, idx) => (
                      <span
                        key={idx}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          idx === activeImgIndex ? "bg-white scale-110" : "bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Auxiliary Supplementary Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex flex-wrap gap-2 justify-center">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImgIndex(idx)}
                      className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        idx === activeImgIndex ? "border-soft-coral shadow-2xs scale-95" : "border-soft-border/50 opacity-70"
                      }`}
                      aria-label={`View thumbnail ${idx + 1}`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}

            </div>
          </div>

          {/* Column 2: Information Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Stock Badge & Category */}
              <div className="flex flex-wrap items-center justify-between gap-2.5">
                <span className="text-[11px] font-heading font-extrabold text-muted-text uppercase tracking-widest bg-light-beige/30 px-2.5 py-1 rounded-lg">
                  {categoryName}
                </span>
                <StockBadge status={product.stockStatus} />
              </div>

              {/* Title name */}
              <h2 id="quick-view-title" className="font-serif text-2xl sm:text-3xl font-bold text-main-text leading-tight">
                {product.productName}
              </h2>

              {/* Description */}
              {product.description && (
                <p className="text-muted-text text-xs sm:text-sm leading-relaxed font-normal">
                  {product.description}
                </p>
              )}
            </div>

            {/* WhatsApp Enquiry Button */}
            <div className="pt-4 border-t border-soft-border/30">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full inline-flex items-center justify-center gap-2 font-heading font-extrabold text-xs sm:text-sm py-3.5 rounded-xl shadow-2xs hover:shadow-xs transition-colors duration-150 ${
                  isOutOfStock
                    ? "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-100"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                }`}
                aria-label="Ask about sizes and details on WhatsApp"
              >
                <MessageSquare size={16} fill={isOutOfStock ? "none" : "currentColor"} />
                <span>{isOutOfStock ? "Enquire on Next Batch" : "Enquire on WhatsApp"}</span>
              </a>
            </div>

            {/* Column Similar / Related Products Section */}
            {similarProducts.length > 0 && (
              <div className="pt-4 border-t border-soft-border/30 space-y-3">
                <h3 className="text-xs font-heading font-extrabold text-main-text uppercase tracking-wider">
                  Similar Products
                </h3>
                
                <div className="grid grid-cols-4 gap-2">
                  {similarProducts.map((simProduct) => (
                    <button
                      key={simProduct.id}
                      onClick={() => onSelectProduct(simProduct)}
                      className="group/sim text-left flex flex-col gap-1 border border-soft-border/40 hover:border-soft-coral/50 rounded-xl p-1.5 bg-soft-cream/10 transition-all cursor-pointer"
                      title={`Switch to ${simProduct.productName}`}
                    >
                      <div className="aspect-square rounded-lg overflow-hidden bg-white">
                        <img
                          src={simProduct.images[0]}
                          alt={simProduct.productName}
                          className="w-full h-full object-cover group-hover/sim:scale-105 transition-all"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="px-0.5">
                        <h4 className="text-[10px] font-bold text-main-text leading-tight truncate group-hover/sim:text-soft-coral">
                          {simProduct.productName}
                        </h4>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
