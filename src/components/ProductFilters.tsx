import React from "react";
import { Filter, Star, RefreshCw } from "lucide-react";

interface ProductFiltersProps {
  selectedStock: string;
  setSelectedStock: (stock: string) => void;
  featuredOnly: boolean;
  setFeaturedOnly: (featured: boolean) => void;
  onClear: () => void;
  className?: string;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  selectedStock,
  setSelectedStock,
  featuredOnly,
  setFeaturedOnly,
  onClear,
  className = ""
}) => {
  const hasActiveFilters = selectedStock !== "all" || featuredOnly;

  return (
    <div
      className={`bg-white border border-soft-border/55 rounded-2xl shadow-3xs p-5 ${className}`}
      aria-label="Product filter options"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        
        {/* Dynamic Select Filters */}
        <div className="flex flex-wrap items-center gap-4 flex-1">
          
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-muted-text" />
            <span className="text-xs font-heading font-extrabold text-muted-text uppercase tracking-widest">
              Filters
            </span>
          </div>

          {/* Stock Status Dropdown */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="stock-select"
              className="text-[11px] font-heading font-bold text-muted-text uppercase tracking-wider"
            >
              Stock:
            </label>
            <select
              id="stock-select"
              value={selectedStock}
              onChange={(e) => setSelectedStock(e.target.value)}
              className="border border-soft-border/70 rounded-xl py-1.5 px-3 text-xs bg-soft-cream/10 text-main-text font-medium focus:outline-none focus:ring-1 focus:ring-soft-coral/50 focus:bg-white transition-all cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="inStock">In Stock</option>
              <option value="outOfStock">Out of Stock</option>
            </select>
          </div>

          {/* Featured Only Checkbox */}
          <label className="inline-flex items-center gap-2 cursor-pointer select-none py-1">
            <input
              type="checkbox"
              checked={featuredOnly}
              onChange={(e) => setFeaturedOnly(e.target.checked)}
              className="w-4 h-4 text-soft-coral rounded border-soft-border focus:ring-soft-coral/40 focus:ring-offset-0 cursor-pointer"
            />
            <span className="text-xs font-semibold text-main-text flex items-center gap-1.5">
              <Star size={13} className="text-amber-500 fill-amber-500" />
              Featured Only
            </span>
          </label>

        </div>

        {/* Clear Actions */}
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-rose-500 hover:text-white border border-rose-200 hover:bg-rose-500 rounded-xl px-4 py-2 transition-all cursor-pointer shadow-3xs"
          >
            <RefreshCw size={12} className="animate-[spin_4s_linear_infinite]" />
            <span>Clear Filters</span>
          </button>
        )}

      </div>
    </div>
  );
};

