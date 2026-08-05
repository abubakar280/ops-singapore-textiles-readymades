import React from "react";
import * as Icons from "lucide-react";
import { valueProps } from "../data";

export const ValueProposition: React.FC = () => {
  return (
    <section id="value-proposition" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-heading font-extrabold text-soft-coral tracking-widest uppercase bg-soft-coral/10 px-3.5 py-1.5 rounded-full">
            Our Business Core
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-main-text mt-4 mb-3">
            Why Choose Singapore Textiles &amp; Readymades?
          </h2>
          <p className="text-muted-text text-sm sm:text-base leading-relaxed">
            We are built on trust, quality, and fair pricing. Here is how we redefine the clothing shopping experience for families and business buyers alike.
          </p>
        </div>

        {/* Value Proposition Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {valueProps.map((prop) => {
            // Dynamically load the icon component
            const IconComponent = (Icons as any)[prop.icon] || Icons.CheckSquare;

            return (
              <div
                key={prop.id}
                className="flex flex-col sm:flex-row items-start gap-5 p-6 sm:p-8 rounded-3xl border border-soft-border/50 bg-soft-cream/10 transition-all duration-300 hover:bg-soft-cream/35 hover:shadow-xs group text-left"
              >
                {/* Icon Circle */}
                <div className="p-4 rounded-2xl bg-white text-soft-coral border border-soft-border/40 shrink-0 group-hover:scale-105 transition-transform shadow-3xs group-hover:bg-soft-coral group-hover:text-white">
                  <IconComponent strokeWidth={1.5} size={26} />
                </div>

                {/* Content */}
                <div className="flex flex-col">
                  <h3 className="font-heading font-bold text-main-text text-lg tracking-tight mb-2">
                    {prop.title}
                  </h3>
                  <p className="text-muted-text text-sm leading-relaxed">
                    {prop.description}
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
