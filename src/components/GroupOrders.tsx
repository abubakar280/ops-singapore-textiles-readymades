import React from "react";
import { Users, Check, MessageSquare, ShieldCheck, Award, Smile } from "lucide-react";
import { businessInfo } from "../data";
import { PlaceholderImage } from "./PlaceholderImage";

export const GroupOrders: React.FC = () => {
  return (
    <section
      id="group-orders"
      className="py-20 bg-soft-cream/15 relative overflow-hidden border-y border-soft-border/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image/Visual Placeholder */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative">
            <PlaceholderImage
              category="Group Dress Showcase"
              iconName="Users"
              aspectRatio="aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5]"
              className="shadow-md"
            />
            {/* Visual highlight badges */}
            <div className="absolute top-4 -right-4 bg-white border border-soft-border p-3.5 rounded-xl shadow-xs max-w-[200px] flex gap-2 items-center">
              <div className="w-8 h-8 rounded-full bg-soft-coral/10 text-soft-coral flex items-center justify-center shrink-0">
                <Smile size={16} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-muted-text uppercase font-mono tracking-wider">Perfect Fit</span>
                <span className="text-xs font-heading font-semibold text-main-text">Customized Sizing</span>
              </div>
            </div>

            <div className="absolute bottom-4 -left-4 bg-white border border-soft-border p-3.5 rounded-xl shadow-xs max-w-[200px] flex gap-2 items-center">
              <div className="w-8 h-8 rounded-full bg-sage-green/10 text-sage-green flex items-center justify-center shrink-0">
                <ShieldCheck size={16} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-muted-text uppercase font-mono tracking-wider">Reliable</span>
                <span className="text-xs font-heading font-semibold text-main-text">On-Time Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column: Group Orders Content copy */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col text-left">
            <span className="text-xs font-heading font-extrabold text-muted-blue tracking-widest uppercase bg-muted-blue/10 px-3.5 py-1.5 rounded-full self-start">
              Group Dress Specialists
            </span>
            
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-main-text mt-4 mb-5 leading-tight">
              Matching Outfits For Your Events &amp; Organizations
            </h2>
            
            <p className="text-muted-text text-sm sm:text-base leading-relaxed mb-6">
              As Madurai's trusted <strong>Group Dress Specialists</strong>, we provide matching shirts, dhotis, Chudithars, salwar suits, or t-shirts for groups of all sizes. From grand temple festivals and wedding functions to schools, colleges, and business staff uniforms.
            </p>

            {/* List of Benefits */}
            <div className="space-y-3.5 mb-8">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-soft-coral/10 text-soft-coral mt-0.5">
                  <Check size={15} strokeWidth={3} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-main-text text-sm sm:text-base">No Minimum Order Volume</h4>
                  <p className="text-muted-text text-xs sm:text-sm">Whether you need 5 matching sets or 500, we supply them with consistent coloring and texture.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-soft-coral/10 text-soft-coral mt-0.5">
                  <Check size={15} strokeWidth={3} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-main-text text-sm sm:text-base">Departmental &amp; Event Coordination</h4>
                  <p className="text-muted-text text-xs sm:text-sm">We assist college departments, school groups, and event managers in choosing budget-friendly, high-quality color themes.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-soft-coral/10 text-soft-coral mt-0.5">
                  <Check size={15} strokeWidth={3} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-main-text text-sm sm:text-base">Direct Source Pricing</h4>
                  <p className="text-muted-text text-xs sm:text-sm">Because group orders are handled directly from wholesale stock, we provide significant cost savings compared to retail showrooms.</p>
                </div>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="https://wa.me/917200983970?text=Hi%20Singapore%20Textiles%20%26%20Readymades%2C%20I%20would%20like%20to%20get%20a%20pricing%20quote%20for%20a%20group%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-xs"
              >
                <MessageSquare size={16} fill="currentColor" />
                <span>Discuss Group Order Quote</span>
              </a>
              <a
                href={businessInfo.phoneDial}
                className="inline-flex items-center justify-center gap-1.5 border border-soft-border text-muted-text hover:text-main-text hover:border-soft-border/80 font-heading font-semibold text-sm px-5 py-3 rounded-xl"
              >
                <span>Call Coordinator</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
