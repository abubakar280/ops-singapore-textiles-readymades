import React from "react";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { StockStatusType } from "../types/product";

interface StockBadgeProps {
  status: StockStatusType;
  className?: string;
}

export const StockBadge: React.FC<StockBadgeProps> = ({ status, className = "" }) => {
  switch (status) {
    case "inStock":
      return (
        <span
          id="stock-badge-instock"
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-heading font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 ${className}`}
          role="status"
          aria-label="In Stock Status"
        >
          <CheckCircle2 size={12} className="stroke-[2.5]" />
          <span>In Stock</span>
        </span>
      );
    case "limitedStock":
      return (
        <span
          id="stock-badge-limited"
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-heading font-semibold bg-amber-50 text-amber-700 border border-amber-200/60 ${className}`}
          role="status"
          aria-label="Limited Stock Status"
        >
          <AlertTriangle size={12} className="stroke-[2.5]" />
          <span>Limited Stock</span>
        </span>
      );
    case "outOfStock":
      return (
        <span
          id="stock-badge-outofstock"
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-heading font-semibold bg-rose-50 text-rose-700 border border-rose-200/60 ${className}`}
          role="status"
          aria-label="Out of Stock Status"
        >
          <XCircle size={12} className="stroke-[2.5]" />
          <span>Out of Stock</span>
        </span>
      );
    default:
      return null;
  }
};
