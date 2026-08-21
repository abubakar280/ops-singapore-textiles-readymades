/**
 * Google Analytics 4 (GA4) Analytics Module
 * Direct gtag.js integration without GTM or heavy third-party libraries.
 * Safely guards against missing measurement IDs and SSR/preview environments.
 */

// Extend the Window interface for dataLayer and gtag
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

// Google Analytics 4 (GA4) Measurement ID constant (public client-side configuration)
const GA_MEASUREMENT_ID = "G-BWGQ921KVD";

// Blocked customer PII parameter keys to prevent accidental transmission
const BLOCKED_PII_KEYS = new Set([
  "email",
  "email_address",
  "phone",
  "phone_number",
  "telephone",
  "customer_name",
  "full_name",
  "address",
  "full_address",
  "whatsapp_message",
  "message_text",
]);

// Internal state tracking
let isInitialized = false;
let isScriptInjected = false;

/**
 * Initializes Google Analytics 4 (gtag.js) asynchronously and configures the web stream.
 * Ensures single initialization and prevents duplicate script injection.
 */
export function initializeAnalytics(customMeasurementId?: string): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  if (isInitialized) {
    return true;
  }

  const measurementId = customMeasurementId || GA_MEASUREMENT_ID;

  try {
    // 1. Initialize dataLayer safely
    window.dataLayer = window.dataLayer || [];

    // 2. Define global gtag function matching Google's official gtag.js implementation
    if (typeof window.gtag !== "function") {
      window.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer?.push(arguments);
      };
    }

    // 3. Inject gtag.js script asynchronously if not already present in DOM
    const existingScript = document.querySelector(
      `script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`
    );

    if (!existingScript && !isScriptInjected) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
        measurementId
      )}`;
      script.id = "ga4-gtag-script";

      // Append to document head
      document.head.appendChild(script);
      isScriptInjected = true;
    }

    // 4. Initial gtag setup
    window.gtag("js", new Date());

    // Configure GA4 Measurement ID
    // Note: Enhanced measurement automatically tracks SPA history page changes.
    window.gtag("config", measurementId, {
      send_page_view: true, // Let GA4 Enhanced Measurement manage history page_view events
    });

    isInitialized = true;
    return true;
  } catch (error) {
    console.error("[Analytics] Failed to initialize Google Analytics 4:", error);
    return false;
  }
}

/**
 * Generic event tracker for GA4.
 * Safeguards data to ensure no PII or undefined values are transmitted.
 */
export function trackEvent(
  eventName: string,
  parameters?: Record<string, string | number | boolean | undefined | null>
): void {
  if (typeof window === "undefined" || !isInitialized || typeof window.gtag !== "function") {
    return;
  }

  try {
    // Sanitize parameters: remove blocked PII keys, remove undefined/null and trim strings
    const sanitizedParams: Record<string, string | number | boolean> = {};

    if (parameters) {
      for (const [key, value] of Object.entries(parameters)) {
        if (BLOCKED_PII_KEYS.has(key.toLowerCase())) {
          continue;
        }

        if (value !== undefined && value !== null) {
          if (typeof value === "string") {
            sanitizedParams[key] = value.trim();
          } else {
            sanitizedParams[key] = value;
          }
        }
      }
    }

    window.gtag("event", eventName, sanitizedParams);
  } catch (err) {
    console.warn(`[Analytics] Error dispatching event "${eventName}":`, err);
  }
}

// ============================================================================
// TYPED ANALYTICS HELPERS (NO PII)
// ============================================================================

/**
 * Track route changes via custom event to avoid duplicate standard page_view events.
 */
export function trackRouteView(pagePath: string, pageTitle: string, collectionSlug?: string): void {
  trackEvent("route_view", {
    page_path: pagePath,
    page_title: pageTitle,
    collection_slug: collectionSlug || undefined,
  });
}

/**
 * Track when a homepage section reaches view visibility threshold (>=50% for 1-2s).
 */
export function trackSectionView(sectionName: string, pagePath: string): void {
  trackEvent("section_view", {
    section_name: sectionName,
    page_path: pagePath,
  });
}

/**
 * Track user active engagement time within a visible section.
 */
export function trackSectionEngagement(
  sectionName: string,
  engagementSeconds: number,
  pagePath: string
): void {
  if (engagementSeconds < 2) return; // Only meaningful engagement
  trackEvent("section_engagement", {
    section_name: sectionName,
    engagement_seconds: engagementSeconds,
    page_path: pagePath,
  });
}

/**
 * Track homepage collection card click.
 */
export function trackCollectionClick(
  collectionKey: string,
  collectionName: string,
  source = "homepage_collections"
): void {
  trackEvent("select_collection", {
    collection_key: collectionKey,
    collection_name: collectionName,
    source,
  });
}

/**
 * Track when a collection page is loaded and data is ready.
 */
export function trackCollectionView(
  collectionKey: string,
  collectionName: string,
  pagePath: string
): void {
  trackEvent("view_collection", {
    collection_key: collectionKey,
    collection_name: collectionName,
    page_path: pagePath,
  });
}

/**
 * Track product selection / click from card or list.
 */
export function trackProductClick(
  productId: string,
  productName: string,
  category: string,
  source = "product_card"
): void {
  trackEvent("select_product", {
    product_id: productId,
    product_name: productName,
    category,
    source,
  });
}

/**
 * Track product quick view or detail modal opened.
 */
export function trackProductView(productId: string, productName: string, category: string): void {
  trackEvent("view_product", {
    product_id: productId,
    product_name: productName,
    category,
  });
}

/**
 * Track product enquiry button click (WhatsApp).
 * NOTE: Never transmits customer phone number or customized message text.
 */
export function trackProductEnquiry(
  productId: string,
  productName: string,
  category: string,
  method = "whatsapp"
): void {
  trackEvent("product_enquiry", {
    product_id: productId,
    product_name: productName,
    category,
    method,
  });
}

/**
 * Track promotion card visible impression.
 */
export function trackPromotionView(
  promotionId: string,
  promotionTitle: string,
  offerPercentage?: number,
  linkType?: string
): void {
  trackEvent("promotion_view", {
    promotion_id: promotionId,
    promotion_title: promotionTitle,
    offer_percentage: offerPercentage ?? undefined,
    link_type: linkType ?? undefined,
  });
}

/**
 * Track promotion card click.
 */
export function trackPromotionClick(
  promotionId: string,
  promotionTitle: string,
  offerPercentage?: number,
  linkType?: string
): void {
  trackEvent("promotion_click", {
    promotion_id: promotionId,
    promotion_title: promotionTitle,
    offer_percentage: offerPercentage ?? undefined,
    link_type: linkType ?? undefined,
  });
}

/**
 * Track gallery section reached.
 */
export function trackGalleryView(pagePath: string): void {
  trackEvent("gallery_view", {
    page_path: pagePath,
  });
}

/**
 * Track gallery photo modal / lightbox opened.
 */
export function trackGalleryOpen(
  galleryId: string,
  galleryTitle: string,
  category?: string
): void {
  trackEvent("gallery_open", {
    gallery_id: galleryId,
    gallery_title: galleryTitle,
    category: category || undefined,
  });
}

/**
 * Track WhatsApp enquiry initiated from within the gallery lightbox modal.
 */
export function trackGalleryEnquiry(
  galleryId: string,
  galleryTitle: string,
  category?: string,
  method = "whatsapp"
): void {
  trackEvent("gallery_enquiry", {
    gallery_id: galleryId,
    gallery_title: galleryTitle,
    category: category || undefined,
    method,
  });
}

/**
 * Track WhatsApp CTA clicks across the site.
 * Does NOT send phone numbers or message contents.
 */
export function trackWhatsAppClick(
  source: string,
  productData?: {
    productId?: string;
    productName?: string;
    category?: string;
  }
): void {
  trackEvent("whatsapp_click", {
    source,
    product_id: productData?.productId,
    product_name: productData?.productName,
    category: productData?.category,
  });
}

/**
 * Track telephone call button clicks.
 * Does NOT send the user's phone number.
 */
export function trackCallClick(source: string): void {
  trackEvent("call_click", {
    source,
  });
}

/**
 * Track telephone call button clicks (alias for trackCallClick).
 */
export const trackPhoneClick = trackCallClick;

/**
 * Track Google Maps directions clicks.
 */
export function trackDirectionsClick(source: string): void {
  trackEvent("directions_click", {
    source,
  });
}

/**
 * Track gallery card click.
 */
export function trackGalleryClick(
  galleryId: string,
  galleryTitle: string,
  category?: string
): void {
  trackEvent("gallery_click", {
    gallery_id: galleryId,
    gallery_title: galleryTitle,
    category: category || undefined,
  });
}

/**
 * Track Hero CTA buttons (e.g. "Explore Collections").
 */
export function trackHeroCtaClick(ctaName = "explore_collections"): void {
  trackEvent("hero_cta_click", {
    cta_name: ctaName,
  });
}

/**
 * Track scroll depth milestones (25%, 50%, 75%).
 * Skips 90% since GA4 Enhanced Measurement tracks ~90% natively.
 */
export function trackScrollDepth(percent: number, pagePath: string): void {
  trackEvent("scroll_depth", {
    percent,
    page_path: pagePath,
  });
}
