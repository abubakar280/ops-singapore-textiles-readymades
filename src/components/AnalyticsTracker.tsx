import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  initializeAnalytics,
  trackRouteView,
  trackScrollDepth,
} from "../lib/analytics";
import { useSectionAnalytics } from "../hooks/useSectionAnalytics";

interface AnalyticsTrackerProps {
  enableSectionTracking?: boolean;
}

/**
 * AnalyticsTracker component:
 * - Bootstraps Google Analytics 4 (gtag.js)
 * - Tracks custom route views on navigation
 * - Tracks section views and engagement time (when enableSectionTracking is true)
 * - Measures 25%, 50%, and 75% scroll milestones
 */
export const AnalyticsTracker: React.FC<AnalyticsTrackerProps> = ({
  enableSectionTracking = true,
}) => {
  const location = useLocation();
  const trackedScrollMilestones = useRef<Set<number>>(new Set());

  // Activate section visibility and engagement tracking only when enabled
  useSectionAnalytics(enableSectionTracking);

  // 1. Initialize GA4 on app mount
  useEffect(() => {
    initializeAnalytics();
  }, []);

  // 2. Track Route Views
  useEffect(() => {
    const pagePath = location.pathname;
    
    // Determine collection slug if on collection page
    let collectionSlug: string | undefined = undefined;
    if (pagePath.startsWith("/collections/")) {
      collectionSlug = pagePath.replace("/collections/", "");
    }

    // Small timeout ensures document.title has updated if set by route component
    const timer = setTimeout(() => {
      const pageTitle = document.title || "OPS SINGAPORE TEXTILES & READYMADES";
      trackRouteView(pagePath, pageTitle, collectionSlug);
    }, 50);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // 3. Track Scroll Depth (25%, 50%, 75%)
  useEffect(() => {
    trackedScrollMilestones.current.clear();
    const currentPath = location.pathname;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      window.requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = window.innerHeight || document.documentElement.clientHeight;

        const totalScrollable = scrollHeight - clientHeight;
        if (totalScrollable > 0) {
          const scrollPercent = Math.round((scrollTop / totalScrollable) * 100);

          const milestones = [25, 50, 75];
          for (const milestone of milestones) {
            if (
              scrollPercent >= milestone &&
              !trackedScrollMilestones.current.has(milestone)
            ) {
              trackedScrollMilestones.current.add(milestone);
              trackScrollDepth(milestone, currentPath);
            }
          }
        }

        ticking = false;
      });

      ticking = true;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  return null;
};
