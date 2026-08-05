import React from "react";
import * as Icons from "lucide-react";

interface PlaceholderImageProps {
  category: string;
  className?: string;
  iconName?: string;
  aspectRatio?: string;
}

export const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  category,
  className = "",
  iconName = "Shirt",
  aspectRatio = "aspect-4/3"
}) => {
  // Get corresponding icon safely
  const IconComponent = (Icons as any)[iconName] || Icons.Shirt;

  // Set distinct warm pastel colors depending on category for premium visual interest
  const getColors = (cat: string) => {
    const name = cat.toLowerCase();
    if (name.includes("men")) {
      return {
        bg: "from-muted-blue/10 to-sage-green/15",
        border: "border-muted-blue/20",
        text: "text-muted-blue",
        accent: "bg-muted-blue/10"
      };
    }
    if (name.includes("women") || name.includes("chudithar")) {
      return {
        bg: "from-soft-coral/10 to-soft-lavender/15",
        border: "border-soft-coral/20",
        text: "text-soft-coral",
        accent: "bg-soft-coral/10"
      };
    }
    if (name.includes("kid") || name.includes("baby") || name.includes("romper")) {
      return {
        bg: "from-warm-yellow/10 to-pastel-peach/15",
        border: "border-pastel-peach/25",
        text: "text-pastel-peach",
        accent: "bg-pastel-peach/10"
      };
    }
    if (name.includes("group") || name.includes("uniform")) {
      return {
        bg: "from-muted-blue/15 to-soft-coral/15",
        border: "border-soft-border",
        text: "text-muted-blue",
        accent: "bg-soft-coral/10"
      };
    }
    if (name.includes("islamic") || name.includes("abaya")) {
      return {
        bg: "from-sage-green/15 to-soft-lavender/10",
        border: "border-sage-green/20",
        text: "text-sage-green",
        accent: "bg-sage-green/10"
      };
    }
    return {
      bg: "from-pastel-peach/10 to-warm-yellow/15",
      border: "border-soft-border",
      text: "text-muted-text",
      accent: "bg-light-beige/30"
    };
  };

  const colors = getColors(category);

  return (
    <div
      className={`relative w-full ${aspectRatio} rounded-2xl border ${colors.border} bg-gradient-to-br ${colors.bg} overflow-hidden flex flex-col items-center justify-center p-6 text-center select-none group transition-all duration-300 hover:shadow-sm ${className}`}
    >
      {/* Soft background design detail representing textile threads */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#292723_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      {/* Elegant concentric circles */}
      <div className="absolute w-32 h-32 rounded-full border border-dashed border-main-text/[0.04] animate-[spin_120s_linear_infinite]"></div>
      <div className="absolute w-24 h-24 rounded-full border border-main-text/[0.02]"></div>

      {/* Center Icon and Text */}
      <div className="relative z-10 flex flex-col items-center">
        <div className={`p-4 rounded-full ${colors.accent} ${colors.text} mb-3 transition-transform duration-300 group-hover:scale-110`}>
          <IconComponent strokeWidth={1.5} size={32} />
        </div>
        <p className="font-heading font-medium text-main-text text-sm tracking-wide uppercase">
          {category}
        </p>
        <span className="text-muted-text text-[11px] font-mono mt-1 tracking-wider uppercase opacity-80">
          In-Store Showcase
        </span>
      </div>

      {/* Decorative corner borders representing stitching */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-main-text/10 rounded-tl-md"></div>
      <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-main-text/10 rounded-tr-md"></div>
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-main-text/10 rounded-bl-md"></div>
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-main-text/10 rounded-br-md"></div>
    </div>
  );
};
