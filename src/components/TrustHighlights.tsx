import React from "react";
import * as Icons from "lucide-react";
import { trustPoints } from "../data";

export const TrustHighlights: React.FC = () => {
  return (
    <section
      id="trust-highlights"
      className="py-12 bg-white border-y border-soft-border/50 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Strength Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((point) => {
            // Retrieve the correct Lucide icon dynamically
            const IconComponent = (Icons as any)[point.icon] || Icons.HelpCircle;

            return (
              <div
                key={point.id}
                className="flex items-start gap-4 p-5 rounded-2xl border border-soft-border/50 bg-soft-cream/40 transition-all duration-300 hover:bg-soft-cream/80 hover:shadow-xs group"
              >
                {/* Icon Container with responsive colors */}
                <div className="p-3.5 rounded-xl bg-white text-soft-coral border border-soft-border/40 transition-all group-hover:scale-105 shadow-2xs group-hover:text-muted-blue">
                  <IconComponent strokeWidth={1.5} size={24} />
                </div>
                
                {/* Content */}
                <div className="flex flex-col text-left">
                  <h3 className="font-heading font-semibold text-main-text text-sm sm:text-base leading-snug">
                    {point.title}
                  </h3>
                  <p className="text-muted-text text-xs sm:text-sm mt-1 leading-relaxed">
                    {point.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
