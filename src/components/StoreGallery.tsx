import React from "react";
import { Camera, Image as ImageIcon } from "lucide-react";
import { galleryItems } from "../data";
import { PlaceholderImage } from "./PlaceholderImage";

export const StoreGallery: React.FC = () => {
  return (
    <section id="gallery" className="py-20 bg-white relative border-b border-soft-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-heading font-extrabold text-soft-coral tracking-widest uppercase bg-soft-coral/10 px-3.5 py-1.5 rounded-full">
            In-Store Gallery
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-main-text mt-4 mb-3">
            Our Madurai Store Showcase
          </h2>
          <p className="text-muted-text text-sm sm:text-base leading-relaxed">
            Take a virtual tour of Singapore Textiles &amp; Readymades. We invite you to visit our physical store on Mahal Vadampokki Street to experience our high-quality fabrics first-hand.
          </p>
        </div>

        {/* Asymmetrical Bento Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, idx) => {
            // Apply unique aspects for layout rhythm
            const aspectClass =
              idx === 0 ? "aspect-[4/5]" :
              idx === 1 ? "aspect-[4/3] lg:aspect-[4/5] lg:translate-y-6" :
              idx === 2 ? "aspect-[4/5]" : "aspect-[4/3] lg:aspect-[4/5] lg:translate-y-6";

            return (
              <div
                key={item.id}
                className="group flex flex-col rounded-3xl overflow-hidden border border-soft-border/40 bg-soft-cream/10 transition-all duration-300 hover:shadow-xs hover:border-soft-border"
              >
                {/* Photo Placeholder */}
                <div className="overflow-hidden relative">
                  <PlaceholderImage
                    category={item.title}
                    iconName="Camera"
                    aspectRatio={aspectClass}
                    className="rounded-b-none border-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-main-text/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-xs font-heading font-semibold flex items-center gap-1.5">
                      <ImageIcon size={14} />
                      <span>Click to view on WhatsApp</span>
                    </span>
                  </div>
                </div>

                {/* Info Footer */}
                <div className="p-5 text-left border-t border-soft-border/40 bg-white">
                  <span className="text-[9px] font-mono tracking-wider text-muted-blue uppercase font-bold">
                    {item.category}
                  </span>
                  <h3 className="font-heading font-bold text-main-text text-sm sm:text-base mt-1">
                    {item.title}
                  </h3>
                  <p className="text-muted-text text-xs mt-1 leading-relaxed">
                    {item.subtitle}
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
