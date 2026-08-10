import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, MessageSquare, Award, Shirt, Sparkles, Baby, Users } from "lucide-react";
import { businessInfo } from "../data";
import { sanityClient } from "../lib/sanityClient";
import { ALL_CATEGORIES_QUERY, resolveImageUrl } from "../lib/sanityQueries";
import { SanityCategory } from "../types";

export const HeroSection: React.FC = () => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [sanityCategories, setSanityCategories] = useState<SanityCategory[]>([]);
  const prefersReducedMotion = useReducedMotion();

  const handleImageError = (id: string) => {
    console.warn(`Hero image failed to load for ${id}, falling back to placeholder.`);
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  useEffect(() => {
    // Coordinate with the intro screen to delay animation until intro is done
    const hasSeenIntro = sessionStorage.getItem("singapore_textiles_intro_seen");
    if (hasSeenIntro) {
      setShouldAnimate(true);
    } else {
      const timer = setTimeout(() => {
        setShouldAnimate(true);
      }, 2200); // 2000ms intro + 200ms buffer
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function loadSanityCategories() {
      if (!sanityClient) return;
      try {
        const rawCats = await sanityClient.fetch(ALL_CATEGORIES_QUERY);
        if (isMounted && Array.isArray(rawCats)) {
          setSanityCategories(rawCats);
        }
      } catch (err) {
        console.warn("Could not fetch Sanity categories for Hero:", err);
      }
    }
    loadSanityCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  const getHeroSlotData = (
    key: string,
    defaultName: string,
    defaultImage: string,
    defaultBadge: string
  ) => {
    const cat = sanityCategories.find((c) => {
      const slugValue =
        typeof c.slug === "string"
          ? c.slug
          : c.slug?.current || "";

      const matchesCategory =
        c.categoryKey === key || slugValue === key;

      const isActive = c.active !== false;
      const canShowInHero = c.showInHero !== false;

      return matchesCategory && isActive && canShowInHero;
    });

    if (!cat) {
      return {
        name: defaultName,
        imageUrl: defaultImage,
        badgeText: defaultBadge,
      };
    }

    const resolvedImg = resolveImageUrl(cat.heroImage);

    return {
      name: cat.name || cat.title || defaultName,
      imageUrl: resolvedImg || defaultImage,
      badgeText: cat.badgeText || defaultBadge,
    };
  };
  const slotKids = getHeroSlotData("kids-baby", "Kids & Baby", "https://i.ibb.co/jPDcKH23/kids.webp", "Extra Soft Cotton");
  const slotWomens = getHeroSlotData("womens", "Women's Collection", "https://i.ibb.co/0g3HkQr/singapore.webp", "Trending Styles");
  const slotMens = getHeroSlotData("mens", "Men's Collection", "https://i.ibb.co/BHxDD9b4/mens.jpg", "Wholesale & Retail");
  const slotGroup = getHeroSlotData("group-dresses", "Group Dresses", "https://i.ibb.co/Q3dhkGx5/group.jpg", "Special Pricing");

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const customY = prefersReducedMotion ? 0 : 16;
  const customScale = prefersReducedMotion ? 1 : 0.98;

  const childVariants = {
    hidden: { opacity: 0, y: customY, scale: customScale },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "tween" as const,
        duration: prefersReducedMotion ? 0.35 : 0.65,
        ease: [0.215, 0.61, 0.355, 1] as const, // Smooth custom ease-out
      },
    },
  };

  return (
    <section
      id="home"
      className="relative pt-24 pb-20 lg:pt-36 lg:pb-28 bg-gradient-to-b from-warm-ivory via-soft-cream to-white overflow-hidden"
    >
      {/* 1. Light Textile Thread Background Pattern */}
      <div className="absolute inset-0 opacity-[0.012] pointer-events-none bg-[linear-gradient(to_right,#292723_1px,transparent_1px),linear-gradient(to_bottom,#292723_1px,transparent_1px)] [background-size:32px_32px]"></div>

      {/* 2. Slow Organic Floating Background Blobs */}
      <motion.div
        animate={prefersReducedMotion ? {} : {
          x: [0, 20, -10, 0],
          y: [0, -30, 15, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -left-20 top-10 w-[450px] h-[450px] bg-pastel-peach/8 rounded-full filter blur-[80px] pointer-events-none -z-10"
      />
      
      <motion.div
        animate={prefersReducedMotion ? {} : {
          x: [0, -25, 15, 0],
          y: [0, 25, -20, 0],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute right-10 bottom-20 w-[400px] h-[400px] bg-muted-blue/6 rounded-full filter blur-[90px] pointer-events-none -z-10"
      />

      <motion.div
        animate={prefersReducedMotion ? {} : {
          x: [0, 15, -20, 0],
          y: [0, 20, -10, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute left-1/3 top-1/4 w-[300px] h-[300px] bg-warm-yellow/5 rounded-full filter blur-[70px] pointer-events-none -z-10"
      />

      {/* 3. Main Split Layout Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        >
          {/* LEFT COLUMN: Confident Copy & Actions (Stretched dynamically with premium padding) */}
          <div className="lg:col-span-5 flex flex-col text-left">
            
            {/* Elegant Established Tag */}
            <motion.div
              variants={childVariants}
              className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-soft-coral/10 text-soft-coral text-xs sm:text-sm font-semibold tracking-wide mb-6 max-w-full"
            >
              <Award size={15} className="text-soft-coral shrink-0" />
              <span>Serving Customers Since 1991 • Established in Madurai Since 2005</span>
            </motion.div>

            {/* Confidently sized, balanced display headline */}
            <motion.h1
              variants={childVariants}
              className="font-heading font-bold text-3xl sm:text-4xl lg:text-[46px] xl:text-[52px] leading-[1.15] tracking-tight text-main-text mb-6"
            >
              Everything Your Family Needs.<br className="hidden sm:inline" /> Under One Roof.
            </motion.h1>

            {/* Supporting paragraph text (readable line height and line width) */}
            <motion.p
              variants={childVariants}
              className="text-base sm:text-lg text-muted-text max-w-xl leading-relaxed mb-8"
            >
              Discover quality clothing for kids, women, men, group dresses, religious collection, and home essentials at <strong>OPS SINGAPORE TEXTILES &amp; READYMADES</strong>—serving customers since 1991, established in Madurai since 2005.
            </motion.p>

            {/* Premium CTA Buttons Container */}
            <motion.div
              variants={childVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10"
            >
              <button
                onClick={() => handleScrollToSection("collections")}
                className="group relative inline-flex items-center justify-center gap-2 bg-soft-coral text-white font-heading font-semibold text-sm px-8 py-4 rounded-full shadow-[0_4px_14px_rgba(227,124,109,0.25)] hover:shadow-[0_6px_20px_rgba(227,124,109,0.35)] transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer overflow-hidden"
              >
                <span>Explore Collections</span>
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <a
                href={businessInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-soft-border hover:border-soft-coral bg-white hover:bg-warm-ivory text-main-text font-heading font-semibold text-sm px-8 py-4 rounded-full shadow-2xs hover:shadow-xs transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <MessageSquare size={16} className="text-soft-coral fill-soft-coral/10" />
                <span>WhatsApp Us</span>
              </a>
            </motion.div>

            {/* Elegant Trust Badges (Capsule shapes in non-loud neutral colors) */}
            <motion.div
              variants={childVariants}
              className="flex flex-wrap gap-2.5 max-w-xl"
            >
              <div className="px-3.5 py-1.5 rounded-full border border-soft-border/80 bg-white/70 text-muted-text text-xs font-medium flex items-center gap-1.5 shadow-2xs hover:bg-white/90 transition-colors">
                <span className="text-soft-coral font-bold">✓</span>
                <span>Serving Customers Since 1991</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-full border border-soft-border/80 bg-white/70 text-muted-text text-xs font-medium flex items-center gap-1.5 shadow-2xs hover:bg-white/90 transition-colors">
                <span className="text-soft-coral font-bold">✓</span>
                <span>Established in Madurai Since 2005</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-full border border-soft-border/80 bg-white/70 text-muted-text text-xs font-medium flex items-center gap-1.5 shadow-2xs hover:bg-white/90 transition-colors">
                <span className="text-soft-coral font-bold">✓</span>
                <span>Wholesale &amp; Retail</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-full border border-soft-border/80 bg-white/70 text-muted-text text-xs font-medium flex items-center gap-1.5 shadow-2xs hover:bg-white/90 transition-colors">
                <span className="text-soft-coral font-bold">✓</span>
                <span>No Minimum Order</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-full border border-soft-border/80 bg-white/70 text-muted-text text-xs font-medium flex items-center gap-1.5 shadow-2xs hover:bg-white/90 transition-colors">
                <span className="text-soft-coral font-bold">✓</span>
                <span>Group Dress Specialists</span>
              </div>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Premium Layered Visual Collage (55% desktop width allocation) */}
          <motion.div
            variants={childVariants}
            className="lg:col-span-7 relative flex items-center justify-center mt-8 lg:mt-0"
          >
            {/* Grid container representing the family departments with staggered absolute placements */}
            <div className="relative w-full max-w-[560px] aspect-[1.12] sm:aspect-[1.18] md:aspect-[1.24] lg:aspect-[1.02] xl:aspect-[1.1]">
              
              {/* Central Premium Emblem Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 border border-soft-border shadow-md rounded-full px-5 py-2.5 z-20 flex items-center gap-2 select-none whitespace-nowrap">
                <div className="w-2.5 h-2.5 rounded-full bg-soft-coral animate-ping" />
                <span className="font-heading font-semibold text-xs tracking-wider text-main-text uppercase">
                  Family Wardrobe
                </span>
              </div>

              {/* Card 1: Kids & Baby */}
              <motion.div
                whileHover={prefersReducedMotion ? {} : { y: -5, rotate: -1, scale: 1.01, boxShadow: "0 12px 30px -8px rgba(41, 39, 35, 0.08)" }}
                className="absolute top-0 left-0 w-[47%] h-[46%] rounded-3xl border border-pastel-peach/30 bg-gradient-to-br from-[#FFFDF3] to-[#FFFDF9] p-5 flex flex-col justify-between transition-shadow duration-300 group shadow-xs cursor-pointer select-none overflow-hidden"
                onClick={() => handleScrollToSection("collections")}
              >
                {!imageErrors["kids-baby"] ? (
                  <>
                    <img
                      src={slotKids.imageUrl}
                      alt={slotKids.name}
                      referrerPolicy="no-referrer"
                      onError={() => handleImageError("kids-baby")}
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03] pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />
                  </>
                ) : null}

                <div className="relative z-10 flex items-start justify-between">
                  <div className={`p-2.5 rounded-2xl transition-transform duration-300 group-hover:scale-110 ${!imageErrors["kids-baby"] ? 'bg-black/35 backdrop-blur-md text-white border border-white/20' : 'bg-pastel-peach/10 text-pastel-peach'}`}>
                    <Baby strokeWidth={1.5} size={22} />
                  </div>
                  <span className={`text-[9px] font-mono tracking-wider px-2 py-0.5 rounded-full font-semibold uppercase ${!imageErrors["kids-baby"] ? 'bg-black/35 backdrop-blur-md text-white border border-white/20' : 'text-pastel-peach bg-white/60'}`}>
                    {slotKids.badgeText}
                  </span>
                </div>
                <div className="relative z-10">
                  <h3 className={`font-heading font-semibold text-sm sm:text-base leading-tight ${!imageErrors["kids-baby"] ? 'text-white drop-shadow-sm' : 'text-main-text'}`}>
                    {slotKids.name}
                  </h3>
                </div>
              </motion.div>

              {/* Card 2: Women's Collection */}
              <motion.div
                whileHover={prefersReducedMotion ? {} : { y: -5, rotate: 1, scale: 1.01, boxShadow: "0 12px 30px -8px rgba(41, 39, 35, 0.08)" }}
                className="absolute top-[4%] right-0 w-[49%] h-[48%] rounded-3xl border border-soft-coral/20 bg-gradient-to-br from-[#FDF2F0] to-[#FEFAF9] p-5 flex flex-col justify-between transition-shadow duration-300 group shadow-xs cursor-pointer select-none overflow-hidden"
                onClick={() => handleScrollToSection("collections")}
              >
                {!imageErrors["womens"] ? (
                  <>
                    <img
                      src={slotWomens.imageUrl}
                      alt={slotWomens.name}
                      referrerPolicy="no-referrer"
                      onError={() => handleImageError("womens")}
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03] pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />
                  </>
                ) : null}

                <div className="relative z-10 flex items-start justify-between">
                  <div className={`p-2.5 rounded-2xl transition-transform duration-300 group-hover:scale-110 ${!imageErrors["womens"] ? 'bg-black/35 backdrop-blur-md text-white border border-white/20' : 'bg-[#E37C6D]/10 text-soft-coral'}`}>
                    <Sparkles strokeWidth={1.5} size={22} />
                  </div>
                  <span className={`text-[9px] font-mono tracking-wider px-2 py-0.5 rounded-full font-semibold uppercase ${!imageErrors["womens"] ? 'bg-black/35 backdrop-blur-md text-white border border-white/20' : 'text-soft-coral bg-white/60'}`}>
                    {slotWomens.badgeText}
                  </span>
                </div>
                <div className="relative z-10">
                  <h3 className={`font-heading font-semibold text-sm sm:text-base leading-tight ${!imageErrors["womens"] ? 'text-white drop-shadow-sm' : 'text-main-text'}`}>
                    {slotWomens.name}
                  </h3>
                </div>
              </motion.div>

              {/* Card 3: Men's Collection */}
              <motion.div
                whileHover={prefersReducedMotion ? {} : { y: -5, rotate: -1, scale: 1.01, boxShadow: "0 12px 30px -8px rgba(41, 39, 35, 0.08)" }}
                className="absolute bottom-[4%] left-0 w-[48%] h-[46%] rounded-3xl border border-muted-blue/20 bg-gradient-to-br from-[#EBF2F7] to-[#F5F8FA] p-5 flex flex-col justify-between transition-shadow duration-300 group shadow-xs cursor-pointer select-none overflow-hidden"
                onClick={() => handleScrollToSection("collections")}
              >
                {!imageErrors["mens"] ? (
                  <>
                    <img
                      src={slotMens.imageUrl}
                      alt={slotMens.name}
                      referrerPolicy="no-referrer"
                      onError={() => handleImageError("mens")}
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03] pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />
                  </>
                ) : null}

                <div className="relative z-10 flex items-start justify-between">
                  <div className={`p-2.5 rounded-2xl transition-transform duration-300 group-hover:scale-110 ${!imageErrors["mens"] ? 'bg-black/35 backdrop-blur-md text-white border border-white/20' : 'bg-[#5C839B]/10 text-muted-blue'}`}>
                    <Shirt strokeWidth={1.5} size={22} />
                  </div>
                  <span className={`text-[9px] font-mono tracking-wider px-2 py-0.5 rounded-full font-semibold uppercase ${!imageErrors["mens"] ? 'bg-black/35 backdrop-blur-md text-white border border-white/20' : 'text-muted-blue bg-white/60'}`}>
                    {slotMens.badgeText}
                  </span>
                </div>
                <div className="relative z-10">
                  <h3 className={`font-heading font-semibold text-sm sm:text-base leading-tight ${!imageErrors["mens"] ? 'text-white drop-shadow-sm' : 'text-main-text'}`}>
                    {slotMens.name}
                  </h3>
                </div>
              </motion.div>

              {/* Card 4: Group Dresses */}
              <motion.div
                whileHover={prefersReducedMotion ? {} : { y: -5, rotate: 1, scale: 1.01, boxShadow: "0 12px 30px -8px rgba(41, 39, 35, 0.08)" }}
                className="absolute bottom-0 right-0 w-[48%] h-[44%] rounded-3xl border border-sage-green/20 bg-gradient-to-br from-[#F1F6F2] to-[#F8FAF8] p-5 flex flex-col justify-between transition-shadow duration-300 group shadow-xs cursor-pointer select-none overflow-hidden"
                onClick={() => handleScrollToSection("group-orders")}
              >
                {!imageErrors["group-dresses"] ? (
                  <>
                    <img
                      src={slotGroup.imageUrl}
                      alt={slotGroup.name}
                      referrerPolicy="no-referrer"
                      onError={() => handleImageError("group-dresses")}
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03] pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />
                  </>
                ) : null}

                <div className="relative z-10 flex items-start justify-between">
                  <div className={`p-2.5 rounded-2xl transition-transform duration-300 group-hover:scale-110 ${!imageErrors["group-dresses"] ? 'bg-black/35 backdrop-blur-md text-white border border-white/20' : 'bg-sage-green/10 text-sage-green'}`}>
                    <Users strokeWidth={1.5} size={22} />
                  </div>
                  <span className={`text-[9px] font-mono tracking-wider px-2 py-0.5 rounded-full font-semibold uppercase ${!imageErrors["group-dresses"] ? 'bg-black/35 backdrop-blur-md text-white border border-white/20' : 'text-sage-green bg-white/60'}`}>
                    {slotGroup.badgeText}
                  </span>
                </div>
                <div className="relative z-10">
                  <h3 className={`font-heading font-semibold text-sm sm:text-base leading-tight ${!imageErrors["group-dresses"] ? 'text-white drop-shadow-sm' : 'text-main-text'}`}>
                    {slotGroup.name}
                  </h3>
                </div>
              </motion.div>


            </div>

            {/* Subtle decorative outer stitching framing line */}
            <div className="absolute -inset-4 border border-dashed border-main-text/[0.03] rounded-[40px] pointer-events-none -z-10 transform rotate-1"></div>
          </motion.div>

        </motion.div>
      </div>

      {/* 4. Minimal Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity z-10 select-none">
        <span className="font-sans text-[9px] uppercase tracking-widest text-muted-text font-semibold">
          Scroll to explore
        </span>
        <div className="w-5 h-8 rounded-full border border-muted-text/30 flex justify-center p-1">
          <motion.div
            animate={prefersReducedMotion ? {} : {
              y: [0, 8, 0]
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-1 h-1.5 bg-soft-coral rounded-full"
          />
        </div>
      </div>
    </section>
  );
};

   