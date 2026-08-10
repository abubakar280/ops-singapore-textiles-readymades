import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import {
  CATEGORIES_CONFIG,
  getIconForCategory,
} from "../data/categoryConfig";
import { sanityClient } from "../lib/sanityClient";
import { ALL_CATEGORIES_QUERY, resolveImageUrl } from "../lib/sanityQueries";
import { SanityCategory } from "../types";

interface DisplayCategory {
  key: string;
  slug: string;
  name: string;
  description: string;
  badgeText: string;
  cardImage?: string;
  displayOrder: number;
}

interface StyleConfig {
  bgColor: string;
  borderColor: string;
  accentColor: string;
  iconBg: string;
  gradient: string;
}

const STYLE_MAP: Record<string, StyleConfig> = {
  mens: {
    bgColor: "bg-[#EBF2F7]",
    borderColor: "border-[#D1DFEB]",
    accentColor: "text-[#3F6B8E]",
    iconBg: "bg-[#3F6B8E]/10 text-[#3F6B8E]",
    gradient: "from-[#3F6B8E]/10 to-[#D2E3F0]/20",
  },

  womens: {
    bgColor: "bg-[#FDF0EC]",
    borderColor: "border-[#F7D6CD]",
    accentColor: "text-[#D46B5A]",
    iconBg: "bg-[#D46B5A]/10 text-[#D46B5A]",
    gradient: "from-[#D46B5A]/10 to-[#F7DBD1]/20",
  },

  "kids-baby": {
    bgColor: "bg-[#FAF7E7]",
    borderColor: "border-[#EFE1B8]",
    accentColor: "text-[#A98E39]",
    iconBg: "bg-[#A98E39]/10 text-[#A98E39]",
    gradient: "from-[#A98E39]/10 to-[#EFE3BC]/20",
  },

  "group-dresses": {
    bgColor: "bg-[#F2EFF6]",
    borderColor: "border-[#DFD3ED]",
    accentColor: "text-[#7C5A9D]",
    iconBg: "bg-[#7C5A9D]/10 text-[#7C5A9D]",
    gradient: "from-[#7C5A9D]/10 to-[#E0D5ED]/20",
  },

  religious: {
    bgColor: "bg-[#EEF4EF]",
    borderColor: "border-[#D6E7D9]",
    accentColor: "text-[#51815A]",
    iconBg: "bg-[#51815A]/10 text-[#51815A]",
    gradient: "from-[#51815A]/10 to-[#D6E7DA]/20",
  },

  "home-essentials": {
    bgColor: "bg-[#F9F4EC]",
    borderColor: "border-[#EDE0CE]",
    accentColor: "text-[#9D7C51]",
    iconBg: "bg-[#9D7C51]/10 text-[#9D7C51]",
    gradient: "from-[#9D7C51]/10 to-[#EDDFC9]/20",
  },
};

export const InteractiveCollections: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [sanityCategories, setSanityCategories] = useState<SanityCategory[]>([]);
  const [loadedSanity, setLoadedSanity] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    async function loadCategories() {
      if (!sanityClient) return;
      try {
        const data = await sanityClient.fetch(ALL_CATEGORIES_QUERY);
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setSanityCategories(data);
          setLoadedSanity(true);
        }
      } catch (err) {
        console.warn("Error loading categories for InteractiveCollections:", err);
      }
    }
    loadCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  const categories: DisplayCategory[] = useMemo(() => {
    if (loadedSanity && sanityCategories.length > 0) {
      const activeCollections = sanityCategories
        .filter((c) => c.active !== false && c.showInCollections !== false)
        .sort((a, b) => (a.displayOrder ?? 99) - (b.displayOrder ?? 99));

      if (activeCollections.length > 0) {
        return activeCollections.map((cat, idx) => ({
          key: cat.categoryKey,
          slug: typeof cat.slug === "object" ? cat.slug.current : cat.slug || cat.categoryKey,
          name: cat.name || cat.title || "Category",
          description: cat.shortDescription || cat.fullDescription || cat.description || "",
          badgeText: cat.badgeText || (cat.categoryKey === "group-dresses" ? "Group Order Specialists" : "Wholesale & Retail"),
          cardImage: resolveImageUrl(cat.cardImage),
          displayOrder: cat.displayOrder ?? idx,
        }));
      }
    }

    return CATEGORIES_CONFIG.map((config, index) => ({
      key: config.key,
      slug: config.slug,
      name: config.name,
      description: config.description || "",
      badgeText: config.key === "group-dresses" ? "Group Order Specialists" : "Wholesale & Retail",
      cardImage: undefined,
      displayOrder: index,
    }));
  }, [loadedSanity, sanityCategories]);

  const headerVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1] as const,
      },
    },
  };

  const cardsContainerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section
      id="collections"
      className="py-24 bg-soft-cream/40 relative overflow-hidden"
    >
      {/* Background decorative detail */}
      <div className="absolute inset-0 opacity-[0.008] pointer-events-none bg-[radial-gradient(#292723_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
          className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
        >
          <span className="text-xs font-heading font-extrabold text-muted-blue tracking-widest uppercase bg-muted-blue/8 px-4 py-1.5 rounded-full select-none">
            Browse Catalogue
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-main-text mt-4 mb-4">
            Explore Our Collections
          </h2>

          <p className="text-muted-text text-sm sm:text-base leading-relaxed">
            Discover quality textiles and premium readymades handpicked for
            your family.
          </p>
        </motion.div>

        {/* Six-category grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={cardsContainerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full"
        >
          {categories.map((cat: DisplayCategory) => {
            const style = STYLE_MAP[cat.key] || STYLE_MAP.mens;
            const Icon = getIconForCategory(cat.key);

            return (
              <motion.article
                key={cat.key}
                variants={cardVariants}
                className={`group relative flex flex-col justify-between rounded-2xl border ${style.borderColor} bg-white overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 min-w-0`}
              >
                {/* Pastel category artwork area */}
                <div
                  className={`relative h-48 sm:h-56 w-full overflow-hidden select-none bg-gradient-to-tr ${style.gradient}`}
                >
                  <div className="absolute inset-4 border border-dashed border-main-text/[0.05] rounded-xl pointer-events-none z-10" />

                  {cat.cardImage ? (
                    <>
                      <img
                        src={cat.cardImage}
                        alt={cat.name}
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03] pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center relative p-6">
                      <div
                        className={`p-4 rounded-full ${style.iconBg} mb-3 shadow-3xs transition-transform duration-300 group-hover:scale-105`}
                      >
                        <Icon size={32} className="stroke-[1.5]" />
                      </div>

                      <span className="text-[10px] font-heading font-extrabold tracking-widest text-main-text uppercase opacity-80">
                        OPS Singapore Textiles
                      </span>
                    </div>
                  )}

                  {/* Category badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-widest ${
                        cat.cardImage
                          ? "bg-black/45 backdrop-blur-md text-white border border-white/20"
                          : `bg-white/95 shadow-3xs ${style.accentColor} border border-soft-border/10`
                      }`}
                    >
                      {cat.badgeText}
                    </span>
                  </div>
                </div>

                {/* Category information */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`p-1.5 rounded-lg ${style.iconBg} sm:hidden`}
                      >
                        <Icon size={16} />
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-main-text group-hover:text-soft-coral transition-colors duration-200">
                        {cat.name}
                      </h3>
                    </div>

                    {cat.description ? (
                      <p className="text-muted-text text-xs sm:text-sm leading-relaxed mb-6">
                        {cat.description}
                      </p>
                    ) : (
                      <div className="mb-4" />
                    )}
                  </div>

                  <Link
                    to={`/collections/${cat.slug}`}
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        behavior: prefersReducedMotion ? "auto" : "smooth",
                      });
                    }}
                    className="mt-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-soft-coral border border-soft-border/80 hover:border-soft-coral text-main-text hover:text-white font-heading font-semibold text-xs px-5 py-3.5 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-soft-coral/50 group-hover:shadow-3xs"
                    aria-label={`Show full collection of ${cat.name}`}
                  >
                    <span>Show Full Collection</span>

                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
