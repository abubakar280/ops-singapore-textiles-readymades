import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "motion/react";
import {
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ExternalLink,
  Clock,
} from "lucide-react";
import { sanityClient } from "../lib/sanityClient";
import {
  ACTIVE_PROMOTIONS_QUERY,
  mapSanityPromotionToLocal,
  isPromotionValid,
} from "../lib/sanityQueries";
import { Promotion } from "../types/promotion";
import { getGeneralWhatsAppUrl } from "../utils/whatsapp";
import {
  trackPromotionView,
  trackPromotionClick,
  trackWhatsAppClick,
} from "../lib/analytics";

export const SeasonalPromotions: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(Date.now());
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Fetch promotions from Sanity
  useEffect(() => {
    let isMounted = true;

    async function fetchPromotions() {
      if (!sanityClient) {
        setIsLoading(false);
        return;
      }

      try {
        const rawData = await sanityClient.fetch(ACTIVE_PROMOTIONS_QUERY);
        if (isMounted && Array.isArray(rawData)) {
          const mapped = rawData.map(mapSanityPromotionToLocal);
          setPromotions(mapped);
        }
      } catch (err) {
        console.warn("SeasonalPromotions: Could not fetch promotions from Sanity", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchPromotions();

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Periodic Live Date Expiry ticker (updates currentTime every 30 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 30000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Filter valid promotions reactively against the live currentTime state
  const validPromotions = promotions.filter((p) => isPromotionValid(p, currentTime));
  const promoCount = validPromotions.length;


  const firstDuplicateRef = useRef<HTMLDivElement>(null);

  // Temporarily pause auto-scrolling (e.g., when user clicks manual arrows)
  const pauseTemporarily = () => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 3500);
  };

  // 3. Smooth Auto-Scroll Loop for 4+ promotions on desktop
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || promoCount < 4 || prefersReducedMotion || isPaused) {
      return;
    }

    // Disable auto-scrolling on touch/mobile screens to preserve natural touch UX
    const isMobile = window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) {
      return;
    }

    let animationId: number;
    const speed = 0.6; // Gentle, smooth continuous pixel step per frame

    const step = () => {
      if (container) {
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        const sequenceWidth = firstDuplicateRef.current ? firstDuplicateRef.current.offsetLeft : 0;
        if (maxScrollLeft > 0 && sequenceWidth > 0) {
          if (container.scrollLeft >= sequenceWidth) {
            // Seamless loop: subtract exact measured distance to first duplicate card
            container.scrollLeft -= sequenceWidth;
          }
          container.scrollLeft += speed;
        }
      }
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [promoCount, prefersReducedMotion, isPaused]);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  // If loading or no valid promotions exist, render nothing (0 margin, 0 height)
  if (isLoading || promoCount === 0) {
    return null;
  }

  // Scroll controls for manual navigation (4+ items)
  const handleScrollLeft = () => {
    pauseTemporarily();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    pauseTemporarily();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  return (
    <section
      id="seasonal-promotions"
      aria-label="Seasonal & Trending Promotions"
      className="py-12 sm:py-16 bg-gradient-to-b from-white via-warm-ivory/50 to-white border-y border-soft-border/40 relative overflow-hidden select-none"
    >
      {/* Background subtle pattern */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[radial-gradient(#E37C6D_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-soft-coral/10 text-soft-coral text-xs font-heading font-extrabold uppercase tracking-widest mb-3">
              <Sparkles size={14} className="animate-pulse" />
              <span>Special Offers & Highlights</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-main-text">
              Seasonal & Trending Offers
            </h2>
            <p className="text-muted-text text-xs sm:text-sm mt-1.5 max-w-xl">
              Exclusive festival deals, wholesale specials, and limited-time collections direct from our Madurai showroom.
            </p>
          </div>

          {/* Navigation Controls when 4+ items exist */}
          {promoCount >= 4 && (
            <div className="hidden sm:flex items-center gap-3 self-end">
              <span className="text-xs text-muted-text font-heading font-medium">
                Swipe / Browse offers
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleScrollLeft}
                  className="p-2.5 rounded-full border border-soft-border bg-white text-main-text hover:bg-soft-coral hover:text-white hover:border-soft-coral transition-all shadow-3xs cursor-pointer focus:outline-none"
                  aria-label="Scroll left promotions"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={handleScrollRight}
                  className="p-2.5 rounded-full border border-soft-border bg-white text-main-text hover:bg-soft-coral hover:text-white hover:border-soft-coral transition-all shadow-3xs cursor-pointer focus:outline-none"
                  aria-label="Scroll right promotions"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* CASE 1: EXACTLY 1 VALID PROMOTION (Single Featured Banner)     */}
        {/* ============================================================== */}
        {promoCount === 1 && (
          <div className="max-w-4xl mx-auto">
            <PromotionCard promotion={validPromotions[0]} isSingleBanner />
          </div>
        )}

        {/* ============================================================== */}
        {/* CASE 2: 2 OR 3 VALID PROMOTIONS (Touch Swipe on Mobile, Grid on Desktop) */}
        {/* ============================================================== */}
        {(promoCount === 2 || promoCount === 3) && (
          <div
            className={`flex overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none gap-6 md:grid md:overflow-visible md:pb-0 ${
              promoCount === 2
                ? "md:grid-cols-2 max-w-5xl mx-auto"
                : "md:grid-cols-3"
            }`}
          >
            {validPromotions.map((promo) => (
              <div
                key={promo.id}
                className="w-[280px] sm:w-[320px] flex-shrink-0 snap-start md:w-full md:flex-shrink"
              >
                <PromotionCard promotion={promo} />
              </div>
            ))}
          </div>
        )}

        {/* ============================================================== */}
        {/* CASE 3: 4 OR MORE VALID PROMOTIONS (Auto-Scrolling Strip)      */}
        {/* ============================================================== */}
        {promoCount >= 4 && (
          <div
            className="relative group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => pauseTemporarily()}
          >
            {/* Subtle right edge fade indicating more content */}
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-white/90 via-white/40 to-transparent z-10" />

            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory md:snap-none scrollbar-none"
              style={{
                scrollBehavior: "auto", // Allow smooth pixel stepping via RAF
              }}
            >
              {/* Original Track */}
              {validPromotions.map((promo) => (
                <div
                  key={promo.id}
                  className="w-[280px] sm:w-[340px] md:w-[380px] flex-shrink-0 snap-start md:snap-align-none"
                >
                  <PromotionCard promotion={promo} />
                </div>
              ))}

              {/* Duplicated Track for Seamless Loop */}
              {validPromotions.map((promo, idx) => (
                <div
                  key={`${promo.id}-dup`}
                  ref={idx === 0 ? firstDuplicateRef : undefined}
                  className="w-[280px] sm:w-[340px] md:w-[380px] flex-shrink-0 snap-start md:snap-align-none pointer-events-none select-none"
                  aria-hidden="true"
                  inert
                >
                  <PromotionCard promotion={promo} isDuplicate />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

// ============================================================================
// REUSABLE PROMOTION CARD COMPONENT
// ============================================================================

interface PromotionCardProps {
  promotion: Promotion;
  isSingleBanner?: boolean;
  isDuplicate?: boolean;
}

const PromotionCard: React.FC<PromotionCardProps> = ({
  promotion,
  isSingleBanner = false,
  isDuplicate = false,
}) => {
  const [imageError, setImageError] = useState(false);

  // Link attributes decision
  const hasLink = Boolean(promotion.linkValue) && promotion.linkType !== "none";

  // Calculate days remaining or badge text
  const endDateObj = promotion.endDate ? new Date(promotion.endDate) : null;
  const isExpiringSoon =
    endDateObj &&
    endDateObj.getTime() - Date.now() < 3 * 24 * 60 * 60 * 1000 &&
    endDateObj.getTime() - Date.now() > 0;

  // Track promotion view for original (non-duplicate) promotion cards
  useEffect(() => {
    if (!isDuplicate) {
      trackPromotionView(
        promotion.id,
        promotion.title,
        promotion.offerPercentage,
        promotion.linkType
      );
    }
  }, [isDuplicate, promotion.id, promotion.title, promotion.offerPercentage, promotion.linkType]);

  const handlePromoClick = () => {
    trackPromotionClick(
      promotion.id,
      promotion.title,
      promotion.offerPercentage,
      promotion.linkType
    );
    if (promotion.linkType === "whatsapp") {
      trackWhatsAppClick("promotion");
    }
  };

  // Render Inner Card Content
  const renderCardContent = () => {
    return (
      <div
        className={`group relative h-full flex flex-col ${
          isSingleBanner ? "md:flex-row" : ""
        } bg-white rounded-2xl border border-soft-border/70 overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300`}
      >
        {/* Image Container */}
        <div
          className={`relative overflow-hidden bg-light-beige/40 ${
            isSingleBanner
              ? "md:w-1/2 h-64 sm:h-72 md:h-auto min-h-[260px]"
              : "h-52 sm:h-60 w-full"
          }`}
        >
          {promotion.imageUrl && !imageError ? (
            <img
              src={promotion.imageUrl}
              alt={promotion.title || "OPS Singapore Textiles Promotion"}
              loading="lazy"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-warm-ivory to-light-beige/60">
              <Sparkles size={36} className="text-soft-coral mb-2 opacity-80" />
              <span className="font-serif text-lg font-bold text-main-text">
                OPS Singapore Textiles
              </span>
              <span className="text-xs text-muted-text mt-1 uppercase tracking-wider font-heading">
                Special Collection
              </span>
            </div>
          )}

          {/* Dark subtle gradient overlay at top/bottom for badges */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

          {/* Offer Percentage Badge (Circular / Sticker Style) */}
          {typeof promotion.offerPercentage === "number" &&
            promotion.offerPercentage > 0 && (
              <div className="absolute top-4 left-4 z-20">
                <div className="relative group-hover:scale-110 transition-transform duration-300">
                  <div className="px-3.5 py-1.5 rounded-full bg-soft-coral text-white font-heading font-extrabold text-xs sm:text-sm tracking-wide shadow-md flex items-center gap-1">
                    <span>{promotion.offerPercentage}% OFF</span>
                  </div>
                </div>
              </div>
            )}

          {/* Limited Time Indicator */}
          {isExpiringSoon && (
            <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md text-white text-[10px] font-heading font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/20">
              <Clock size={11} className="text-warm-yellow animate-spin" />
              <span>Ending Soon</span>
            </div>
          )}
        </div>

        {/* Content Container */}
        <div
          className={`p-6 sm:p-7 flex-1 flex flex-col justify-between bg-white ${
            isSingleBanner ? "md:w-1/2 md:p-8" : ""
          }`}
        >
          <div>
            <div className="flex items-center gap-2 text-[11px] font-heading font-extrabold text-soft-coral uppercase tracking-widest mb-2">
              <span>Limited Time Offer</span>
            </div>

            <h3
              className={`font-serif font-bold text-main-text group-hover:text-soft-coral transition-colors leading-snug ${
                isSingleBanner ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
              }`}
            >
              {promotion.title}
            </h3>

            {promotion.shortDescription && (
              <p className="text-muted-text text-xs sm:text-sm mt-2.5 leading-relaxed">
                {promotion.shortDescription}
              </p>
            )}
          </div>

          {/* Action Link Button / Badge Indicator */}
          {hasLink && (
            <div className="mt-6 pt-4 border-t border-soft-border/40 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-xs font-heading font-bold text-main-text group-hover:text-soft-coral transition-colors">
                {promotion.linkType === "whatsapp" && (
                  <>
                    <MessageCircle size={15} className="text-emerald-600" />
                    <span>Inquire via WhatsApp</span>
                  </>
                )}
                {promotion.linkType === "collection" && (
                  <>
                    <span>View Collection</span>
                  </>
                )}
                {promotion.linkType === "external" && (
                  <>
                    <span>Explore Offer</span>
                    <ExternalLink size={14} />
                  </>
                )}
              </span>

              <div className="w-8 h-8 rounded-full bg-soft-cream group-hover:bg-soft-coral text-main-text group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs">
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // If this card is a duplicate copy for seamless visual looping, disable interaction and tabIndex
  if (isDuplicate) {
    return (
      <div
        className="h-full pointer-events-none"
        aria-hidden="true"
        tabIndex={-1}
      >
        {renderCardContent()}
      </div>
    );
  }

  // Wrap in appropriate anchor or link tag based on linkType
  if (hasLink && promotion.linkValue) {
    if (promotion.linkType === "collection") {
      return (
        <Link
          to={promotion.linkValue}
          onClick={() => {
            handlePromoClick();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="block h-full focus:outline-none focus:ring-2 focus:ring-soft-coral/50 rounded-2xl"
          aria-label={`Explore promotion: ${promotion.title}`}
        >
          {renderCardContent()}
        </Link>
      );
    }

    if (promotion.linkType === "whatsapp") {
      const waUrl = getGeneralWhatsAppUrl(
        promotion.linkValue ||
          `Hi, I would like to inquire about the "${promotion.title}" offer at OPS Singapore Textiles.`
      );
      return (
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handlePromoClick}
          className="block h-full focus:outline-none focus:ring-2 focus:ring-soft-coral/50 rounded-2xl"
          aria-label={`Inquire about ${promotion.title} on WhatsApp`}
        >
          {renderCardContent()}
        </a>
      );
    }

    if (promotion.linkType === "external") {
      return (
        <a
          href={promotion.linkValue}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handlePromoClick}
          className="block h-full focus:outline-none focus:ring-2 focus:ring-soft-coral/50 rounded-2xl"
          aria-label={`Open link for ${promotion.title}`}
        >
          {renderCardContent()}
        </a>
      );
    }
  }

  // Non-clickable promo card when linkType is 'none' or no linkValue
  return <div className="h-full">{renderCardContent()}</div>;
};
