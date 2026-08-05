import React from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search products by name, type, or code...",
  className = ""
}) => {
  return (
    <div className={`relative flex-1 min-w-[240px] max-w-md ${className}`}>
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-text">
        <Search size={16} strokeWidth={2} />
      </div>

      {/* Input Element */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-9 py-2.5 bg-soft-cream/10 hover:bg-soft-cream/20 focus:bg-white text-xs sm:text-sm font-medium text-main-text placeholder-muted-text border border-soft-border/70 rounded-xl focus:outline-none focus:ring-1 focus:ring-soft-coral/50 shadow-3xs transition-all"
        aria-label="Instant search box"
      />

      {/* Clear Button */}
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-text/60 hover:text-rose-500 transition-colors"
          aria-label="Clear search terms"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
