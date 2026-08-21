import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { businessInfo } from "../data";
import { Award, Shirt } from "lucide-react";

interface IntroScreenProps {
  onComplete: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [show, setShow] = useState(true);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the intro in this session
    const hasSeenIntro = sessionStorage.getItem("singapore_textiles_intro_seen");
    
    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReducedMotion = mediaQuery.matches;

    if (hasSeenIntro || prefersReducedMotion) {
      setShow(false);
      onComplete();
      return;
    }

    // Preload the logo image to prevent flickering
    const img = new Image();
    img.src = businessInfo.logoUrl;
    img.onload = () => setLogoLoaded(true);
    img.onerror = () => setImageError(true);

    // Total intro duration (approximately 2 seconds)
    const timer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("singapore_textiles_intro_seen", "true");
      // Trigger homepage fade-in immediately when intro exit begins for a seamless crossfade
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        id="intro-screen"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-warm-ivory text-main-text select-none"
      >
        {/* Subtle textile grid background */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#292723_1px,transparent_1px)] [background-size:20px_20px]"></div>

        <div className="relative z-10 flex flex-col items-center px-6 max-w-lg text-center">
          
          {/* Logo container with scale and settle transitions */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ y: -240, scale: 0.35, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center mb-6"
          >
            {!imageError ? (
              <img
                src={businessInfo.logoUrl}
                alt="Singapore Textiles & Readymades Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain filter drop-shadow-sm transition-all"
                onError={() => setImageError(true)}
              />
            ) : (
              // Clean Text Fallback visual logo
              <div className="w-24 h-24 rounded-full bg-soft-coral/10 border border-soft-coral/30 flex flex-col items-center justify-center text-soft-coral p-3 shadow-inner">
                <Shirt size={40} strokeWidth={1.5} />
                <span className="font-heading font-extrabold text-[11px] uppercase tracking-widest mt-1">S T R</span>
              </div>
            )}
          </motion.div>

          {/* Business Name */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
            className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-main-text"
          >
            <strong>{businessInfo.name}</strong>
          </motion.h1>

          {/* Trust Line & Divider */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "60px" }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="h-[2px] bg-soft-coral/40 my-4"
          />

          {/* Trust Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
            className="flex items-center gap-1.5 text-muted-text font-medium tracking-wide text-sm"
          >
            <Award size={16} className="text-warm-yellow animate-pulse" />
            <span>{businessInfo.established}</span>
          </motion.div>

          {/* Madurai Line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.1, duration: 0.4 }}
            className="text-[11px] text-muted-text font-mono mt-6 tracking-widest uppercase"
          >
            Madurai, India
          </motion.p>
        </div>

        {/* Decorative subtle border stitching effect on the screen */}
        <div className="absolute inset-4 border border-dashed border-main-text/[0.04] pointer-events-none rounded-xl"></div>
      </motion.div>
    </AnimatePresence>
  );
};
