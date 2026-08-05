import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { faqs } from "../data";
import { motion, AnimatePresence } from "motion/react";

export const FAQSection: React.FC = () => {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-soft-cream/15 relative border-b border-soft-border/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-heading font-extrabold text-muted-blue tracking-widest uppercase bg-muted-blue/10 px-3.5 py-1.5 rounded-full">
            Help &amp; Support
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-main-text mt-4 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-text text-sm sm:text-base leading-relaxed">
            Have questions about our retail pricing, bulk order tiers, or shipping? Find fast answers to our most common inquiries below.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4 text-left">
          {faqs.map((faq, idx) => {
            const isOpen = openFAQIndex === idx;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden bg-white ${
                  isOpen
                    ? "border-soft-coral shadow-xs"
                    : "border-soft-border hover:border-soft-border/90 hover:shadow-2xs"
                }`}
              >
                {/* FAQ Header Question Row */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left focus-visible:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2 rounded-xl shrink-0 transition-colors ${
                      isOpen ? "bg-soft-coral/10 text-soft-coral" : "bg-light-beige/20 text-muted-text"
                    }`}>
                      <HelpCircle size={18} />
                    </div>
                    <span className="font-heading font-bold text-main-text text-sm sm:text-base tracking-tight">
                      {faq.question}
                    </span>
                  </div>
                  
                  {/* Arrow Indicator */}
                  <div className={`text-muted-text transition-transform duration-300 ${isOpen ? "rotate-180 text-soft-coral" : ""}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                {/* FAQ Body Expandable Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-7 pl-14 sm:pl-[60px] text-muted-text text-xs sm:text-sm leading-relaxed border-t border-soft-border/20 pt-4 bg-soft-cream/10">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
