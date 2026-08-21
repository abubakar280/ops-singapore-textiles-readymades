import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackSectionView, trackSectionEngagement } from "../lib/analytics";

interface TrackedSectionConfig {
  id: string;
  name: string;
}

const HOMEPAGE_SECTIONS: TrackedSectionConfig[] = [
  { id: "home", name: "hero" },
  { id: "trust-highlights", name: "trust_highlights" },
  { id: "seasonal-promotions", name: "seasonal_promotions" },
  { id: "collections", name: "collections" },
  { id: "featured-products", name: "featured_products" },
  { id: "value-proposition", name: "value_proposition" },
  { id: "group-orders", name: "group_orders" },
  { id: "wholesale", name: "wholesale" },
  { id: "gallery", name: "gallery" },
  { id: "about", name: "about" },
  { id: "faq", name: "faq" },
  { id: "contact", name: "contact" },
];

/**
 * Hook to automatically track section visibility (section_view) and
 * active section engagement time (section_engagement) for key homepage sections.
 */
export function useSectionAnalytics(enabled = true) {
  const location = useLocation();
  const viewedSectionsRef = useRef<Set<string>>(new Set());
  const engagementStartTimesRef = useRef<Map<string, number>>(new Map());
  const viewTimersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Flush active engagement durations to GA4
  const flushEngagements = (path: string) => {
    const now = Date.now();
    engagementStartTimesRef.current.forEach((startTime, sectionName) => {
      const elapsedSeconds = Math.round((now - startTime) / 1000);
      if (elapsedSeconds >= 2) {
        trackSectionEngagement(sectionName, elapsedSeconds, path);
      }
    });
    engagementStartTimesRef.current.clear();
  };

  useEffect(() => {
    // If section tracking is disabled (e.g. intro screen still displaying), do nothing
    if (!enabled) {
      return;
    }

    // Reset viewed sections on location change
    viewedSectionsRef.current.clear();
    const currentPath = location.pathname;

    // Check for window/IntersectionObserver availability
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const observerCallback: IntersectionObserverCallback = (entries) => {
      // If tab is currently hidden, do not measure visibility or engagement
      if (document.visibilityState === "hidden") {
        return;
      }

      entries.forEach((entry) => {
        const sectionId = entry.target.id;
        const config = HOMEPAGE_SECTIONS.find((s) => s.id === sectionId);
        if (!config) return;

        const sectionName = config.name;
        const isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.5;

        if (isVisible) {
          // 1. Start engagement timing if not already running
          if (!engagementStartTimesRef.current.has(sectionName)) {
            engagementStartTimesRef.current.set(sectionName, Date.now());
          }

          // 2. Schedule section_view event (requires remaining visible at >= 50% for ~1.2s)
          if (!viewedSectionsRef.current.has(sectionName) && !viewTimersRef.current.has(sectionName)) {
            const timer = setTimeout(() => {
              if (!viewedSectionsRef.current.has(sectionName)) {
                viewedSectionsRef.current.add(sectionName);
                trackSectionView(sectionName, currentPath);
              }
              viewTimersRef.current.delete(sectionName);
            }, 1200);

            viewTimersRef.current.set(sectionName, timer);
          }
        } else {
          // Section left visibility (< 50% visible)
          // 1. Cancel pending view timer if section was scrolled past too quickly
          const pendingTimer = viewTimersRef.current.get(sectionName);
          if (pendingTimer) {
            clearTimeout(pendingTimer);
            viewTimersRef.current.delete(sectionName);
          }

          // 2. End engagement and record time if >= 2 seconds
          const startTime = engagementStartTimesRef.current.get(sectionName);
          if (startTime) {
            const elapsedSeconds = Math.round((Date.now() - startTime) / 1000);
            if (elapsedSeconds >= 2) {
              trackSectionEngagement(sectionName, elapsedSeconds, currentPath);
            }
            engagementStartTimesRef.current.delete(sectionName);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: [0, 0.5, 0.75, 1.0],
    });

    // Observe all defined sections that exist in the DOM
    const observedElements: HTMLElement[] = [];
    HOMEPAGE_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        observedElements.push(el);
      }
    });

    // Handle tab visibility changes (flush active engagement & cancel pending timers in background tabs)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        flushEngagements(currentPath);

        // Cancel all pending section view timers so they don't fire in background
        viewTimersRef.current.forEach((t) => clearTimeout(t));
        viewTimersRef.current.clear();
      } else {
        // When tab is reopened, recheck observed elements to restart engagement
        observedElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const windowHeight = window.innerHeight || document.documentElement.clientHeight;
          const isVisible = rect.top < windowHeight && rect.bottom > 0;
          if (isVisible) {
            const config = HOMEPAGE_SECTIONS.find((s) => s.id === el.id);
            if (config) {
              engagementStartTimesRef.current.set(config.name, Date.now());
            }
          }
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      // Cleanup on unmount or route change
      flushEngagements(currentPath);

      // Clear all timers
      viewTimersRef.current.forEach((t) => clearTimeout(t));
      viewTimersRef.current.clear();

      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
    };
  }, [location.pathname, enabled]);
}
