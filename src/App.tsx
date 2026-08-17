import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom";
import { ArrowLeft, HelpCircle } from "lucide-react";

import { IntroScreen } from "./components/IntroScreen";
import { StickyNavigation } from "./components/StickyNavigation";
import { HeroSection } from "./components/HeroSection";
import { TrustHighlights } from "./components/TrustHighlights";
import { SeasonalPromotions } from "./components/SeasonalPromotions";
import { InteractiveCollections } from "./components/InteractiveCollections";
import { ValueProposition } from "./components/ValueProposition";
import { GroupOrders } from "./components/GroupOrders";
import { WholesaleSupply } from "./components/WholesaleSupply";
import { FeaturedProducts } from "./components/FeaturedProducts";
import { StoreGallery } from "./components/StoreGallery";
import { AboutSection } from "./components/AboutSection";
import { FAQSection } from "./components/FAQSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { FloatingContactButtons } from "./components/FloatingContactButtons";
import { CollectionPage } from "./pages/CollectionPage";

// Scroll to top of viewport on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Homepage layout with dynamic state-based section scrolling
const Homepage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (
      location.state &&
      (location.state as any).scrollToId
    ) {
      const targetId = (location.state as any).scrollToId;

      // Clear state so scrolling doesn't re-trigger
      // on subsequent updates/refreshes
      window.history.replaceState(
        {},
        document.title
      );

      const timer = setTimeout(() => {
        const element =
          document.getElementById(targetId);

        if (element) {
          const offset = 80;

          const bodyRect =
            document.body.getBoundingClientRect().top;

          const elementRect =
            element.getBoundingClientRect().top;

          const elementPosition =
            elementRect - bodyRect;

          const offsetPosition =
            elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <>
      {/* 3. Hero Section */}
      <HeroSection />

      {/* 4. Trust Highlights */}
      <TrustHighlights />

      {/* 4.5. Seasonal / Trending Promotions */}
      <SeasonalPromotions />

      {/* 5. Interactive Collections Grid */}
      <InteractiveCollections />

      {/* 9. Featured Products */}
      <FeaturedProducts />

      {/* 6. Value Proposition */}
      <ValueProposition />

      {/* 7. Group Orders */}
      <GroupOrders />

      {/* 8. Wholesale Supply */}
      <WholesaleSupply />

      {/* 10. Dynamic Sanity Store Gallery */}
      <StoreGallery />

      {/* 12. About Section */}
      <AboutSection />

      {/* 13. FAQ Section */}
      <FAQSection />

      {/* 14. Contact Section */}
      <ContactSection />
    </>
  );
};

// Friendly Not Found 404 View
const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-soft-cream flex flex-col justify-between pt-36 pb-16">
      <div className="max-w-md mx-auto px-4 py-16 text-center relative z-10">
        <HelpCircle
          size={48}
          className="text-rose-500 mx-auto mb-4 animate-[pulse_2s_infinite]"
        />

        <h1 className="font-serif text-3xl font-bold text-main-text mb-2">
          Page Not Found
        </h1>

        <p className="text-muted-text text-sm mb-6 leading-relaxed">
          The link you followed might be broken,
          or the page may have been removed. Let's
          get you back to the catalog.
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
};

export default function App() {
  const [introCompleted, setIntroCompleted] =
    useState(false);

  return (
    <Router>
      <ScrollToTop />

      <div className="relative min-h-screen bg-soft-cream text-main-text selection:bg-soft-coral/20 selection:text-soft-coral overflow-x-hidden">

        {/* 1. Intro Screen Transition Overlay */}
        <IntroScreen
          onComplete={() =>
            setIntroCompleted(true)
          }
        />

        {/* Website Body Contents */}
        <div
          className={`transition-opacity duration-700 ${
            introCompleted
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {/* 2. Header / Sticky Navigation */}
          <StickyNavigation />

          {/* Main Content Router Switch */}
          <main id="main-content">
            <Routes>
              {/* Homepage */}
              <Route
                path="/"
                element={<Homepage />}
              />

              {/* Dynamic Collection Page */}
              <Route
                path="/collections/:slug"
                element={<CollectionPage />}
              />

              {/* Fallback 404 */}
              <Route
                path="*"
                element={<NotFoundPage />}
              />
            </Routes>
          </main>

          {/* 15. Footer */}
          <Footer />

          {/* 16. Floating Contact Buttons */}
          <FloatingContactButtons
            show={introCompleted}
          />
        </div>
      </div>
    </Router>
  );
}