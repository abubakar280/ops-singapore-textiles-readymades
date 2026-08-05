import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Tag } from "lucide-react";

interface CollectionHeaderProps {
  categoryKey: string;
  name: string;
  description: string;
  productCount: number;
  coverImage?: string;
}

const STYLE_MAP: Record<string, { gradient: string; accentColor: string; bgBadge: string; textBadge: string }> = {
  mens: {
    gradient: "from-[#3F6B8E]/5 to-[#D2E3F0]/20",
    accentColor: "text-[#3F6B8E]",
    bgBadge: "bg-[#3F6B8E]/8",
    textBadge: "text-[#3F6B8E]",
  },
  womens: {
    gradient: "from-[#D46B5A]/5 to-[#F7DBD1]/20",
    accentColor: "text-[#D46B5A]",
    bgBadge: "bg-[#D46B5A]/8",
    textBadge: "text-[#D46B5A]",
  },
  "kids-baby": {
    gradient: "from-[#A98E39]/5 to-[#EFE3BC]/20",
    accentColor: "text-[#A98E39]",
    bgBadge: "bg-[#A98E39]/8",
    textBadge: "text-[#A98E39]",
  },
  "group-dresses": {
    gradient: "from-[#7C5A9D]/5 to-[#E0D5ED]/20",
    accentColor: "text-[#7C5A9D]",
    bgBadge: "bg-[#7C5A9D]/8",
    textBadge: "text-[#7C5A9D]",
  },
  religious: {
    gradient: "from-[#51815A]/5 to-[#D6E7DA]/20",
    accentColor: "text-[#51815A]",
    bgBadge: "bg-[#51815A]/8",
    textBadge: "text-[#51815A]",
  },
  islamic: {
    gradient: "from-[#51815A]/5 to-[#D6E7DA]/20",
    accentColor: "text-[#51815A]",
    bgBadge: "bg-[#51815A]/8",
    textBadge: "text-[#51815A]",
  },
  "home-essentials": {
    gradient: "from-[#9D7C51]/5 to-[#EDDFC9]/20",
    accentColor: "text-[#9D7C51]",
    bgBadge: "bg-[#9D7C51]/8",
    textBadge: "text-[#9D7C51]",
  }
};

export const CollectionHeader: React.FC<CollectionHeaderProps> = ({
  categoryKey,
  name,
  description,
  productCount,
  coverImage
}) => {
  const styles = STYLE_MAP[categoryKey] || STYLE_MAP.mens;

  return (
    <div className="space-y-6">
      {/* Back to Home CTA Link */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-heading font-extrabold text-muted-text hover:text-soft-coral transition-colors"
        >
          <ArrowLeft size={14} className="stroke-[2.5]" />
          <span>Back to All Collections</span>
        </Link>
      </div>

      {/* Primary Banner Header Card */}
      <header className="rounded-2xl border border-soft-border/55 bg-white overflow-hidden shadow-2xs">
        <div className="flex flex-col md:flex-row justify-between items-stretch">
          
          {/* Banner Title & Description Detail Area */}
          <div className={`p-8 sm:p-10 md:p-12 flex-1 flex flex-col justify-center bg-gradient-to-r ${styles.gradient}`}>
            <div className="flex flex-wrap gap-2.5 mb-4">
              {/* Wholesale and Retail Badge */}
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-white shadow-3xs ${styles.accentColor} border border-soft-border/15`}>
                <Tag size={10} className="fill-current" />
                <span>Wholesale &amp; Retail</span>
              </span>
              {/* Item Count Pill */}
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-white shadow-3xs text-muted-text border border-soft-border/15">
                {productCount} {productCount === 1 ? "Product" : "Products"} Available
              </span>
            </div>
            
            {/* Title */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-main-text mb-4 leading-tight">
              {name}
            </h1>
            
            {/* Description */}
            {description ? (
              <p className="text-muted-text text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl font-normal">
                {description}
              </p>
            ) : null}
          </div>

          {/* Banner Graphic Illustration / Cover Photo */}
          <div className="w-full md:w-[320px] lg:w-[380px] shrink-0 border-t md:border-t-0 md:border-l border-soft-border/30 h-44 sm:h-52 md:h-auto select-none bg-light-beige/10 flex items-center justify-center relative overflow-hidden">
            {coverImage ? (
              <img
                src={coverImage}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="text-center p-8 flex flex-col items-center">
                <span className="font-serif font-extrabold text-5xl sm:text-6xl text-main-text/[0.04] select-none">
                  OPS
                </span>
                <p className="text-[10px] font-mono text-muted-text/50 uppercase tracking-widest mt-2 font-bold">
                  OPS SINGAPORE TEXTILES
                </p>
              </div>
            )}
          </div>

        </div>
      </header>
    </div>
  );
};
