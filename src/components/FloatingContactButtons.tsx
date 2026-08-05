import React, { useState, useEffect } from "react";
import { Phone, MessageSquare } from "lucide-react";
import { businessInfo } from "../data";
import { motion, AnimatePresence } from "motion/react";

interface FloatingContactButtonsProps {
  show: boolean;
}

export const FloatingContactButtons: React.FC<FloatingContactButtonsProps> = ({ show }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!show) {
      setVisible(false);
      return;
    }

    // Delay showing floating buttons slightly so they don't pop up immediately
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [show]);

  return (
    <AnimatePresence>
      {visible && (
        <div
          id="floating-contact-panel"
          className="fixed bottom-6 right-6 z-30 flex flex-col gap-3 pointer-events-none"
        >
          {/* Phone Call Floating Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto"
          >
            <a
              href={businessInfo.phoneDial}
              className="flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 bg-white hover:bg-light-beige/10 border border-soft-border rounded-full shadow-md text-muted-blue transition-all hover:scale-105 active:scale-95 group relative"
              aria-label="Call Singapore Textiles &amp; Readymades Store"
            >
              <Phone size={20} className="sm:hidden" />
              <Phone size={22} className="hidden sm:block animate-[bounce_5s_infinite]" />
              
              {/* Tooltip Label */}
              <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-transform bg-main-text text-white text-[11px] font-heading font-medium px-3 py-1.5 rounded-lg whitespace-nowrap shadow-sm pointer-events-none origin-right">
                Call Store: {businessInfo.phoneRaw}
              </span>
            </a>
          </motion.div>

          {/* WhatsApp Floating Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="pointer-events-auto"
          >
            <a
              href={businessInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-md transition-all hover:scale-105 active:scale-95 group relative"
              aria-label="Chat with Singapore Textiles &amp; Readymades on WhatsApp"
            >
              <MessageSquare size={20} className="sm:hidden" fill="currentColor" />
              <MessageSquare size={22} className="hidden sm:block" fill="currentColor" />
              
              {/* Highlight Pulse Ring */}
              <span className="absolute inset-0 rounded-full bg-emerald-600/35 -z-10 animate-[ping_2s_infinite]"></span>

              {/* Tooltip Label */}
              <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-transform bg-emerald-700 text-white text-[11px] font-heading font-medium px-3 py-1.5 rounded-lg whitespace-nowrap shadow-sm pointer-events-none origin-right">
                WhatsApp Quick Chat
              </span>
            </a>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
