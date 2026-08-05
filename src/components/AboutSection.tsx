import React from "react";
import { Award, ShieldCheck, Heart, Sparkles, MapPin, CheckCircle2 } from "lucide-react";
import { businessInfo } from "../data";

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden border-b border-soft-border/30">
      {/* Visual background decorations */}
      <div className="absolute top-1/2 -left-48 w-80 h-80 bg-soft-coral/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Milestones & Stats */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative p-6 sm:p-8 rounded-3xl border border-soft-border bg-soft-cream/20 shadow-2xs">
              <div className="absolute top-4 right-4 text-soft-coral/20">
                <Award size={64} strokeWidth={1} />
              </div>
              
              <h3 className="font-serif text-2xl font-bold text-main-text mb-6">
                Our Milestones
              </h3>

              {/* Timeline Items */}
              <div className="space-y-6 relative before:absolute before:top-2 before:bottom-2 before:left-[11px] before:w-[2px] before:bg-soft-border text-left">
                {/* Year 1991 */}
                <div className="flex gap-4 items-start relative pl-8">
                  <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-soft-coral border-4 border-white shadow-2xs z-10"></div>
                  <div>
                    <span className="font-heading font-extrabold text-sm text-soft-coral">1991</span>
                    <h4 className="font-heading font-bold text-main-text text-sm sm:text-base mt-0.5">Initial Beginnings</h4>
                    <p className="text-muted-text text-xs leading-relaxed">Started serving valued textile customers with quality and trusted garments in 1991.</p>
                  </div>
                </div>

                {/* Year 2005 */}
                <div className="flex gap-4 items-start relative pl-8">
                  <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-muted-blue border-4 border-white shadow-2xs z-10"></div>
                  <div>
                    <span className="font-heading font-extrabold text-sm text-muted-blue">2005</span>
                    <h4 className="font-heading font-bold text-main-text text-sm sm:text-base mt-0.5">Established in Madurai</h4>
                    <p className="text-muted-text text-xs leading-relaxed">Established our physical storefront on Mahal Vadampokki Street, Madurai Main in 2005.</p>
                  </div>
                </div>

                {/* Year 2018 */}
                <div className="flex gap-4 items-start relative pl-8">
                  <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-sage-green border-4 border-white shadow-2xs z-10"></div>
                  <div>
                    <span className="font-heading font-extrabold text-sm text-sage-green">2018</span>
                    <h4 className="font-heading font-bold text-main-text text-sm sm:text-base mt-0.5">Group Dress Specialization</h4>
                    <p className="text-muted-text text-xs leading-relaxed">Formed a dedicated team to manage uniform sets and matching traditional clothing for temple events and universities.</p>
                  </div>
                </div>

                {/* Present Day */}
                <div className="flex gap-4 items-start relative pl-8">
                  <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-warm-yellow border-4 border-white shadow-2xs z-10"></div>
                  <div>
                    <span className="font-heading font-extrabold text-sm text-warm-yellow">Present Day</span>
                    <h4 className="font-heading font-bold text-main-text text-sm sm:text-base mt-0.5">Established Heritage</h4>
                    <p className="text-muted-text text-xs leading-relaxed">Serving Customers Since 1991 | Established in Madurai Since 2005.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: About Content Story */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col text-left">
            <span className="text-xs font-heading font-extrabold text-muted-blue tracking-widest uppercase bg-muted-blue/10 px-3.5 py-1.5 rounded-full self-start">
              Our Legacy
            </span>
            
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-main-text mt-4 mb-5 leading-tight">
              <strong>OPS SINGAPORE TEXTILES &amp; READYMADES</strong>: A Legacy of Trust
            </h2>
            
            <p className="text-muted-text text-sm sm:text-base leading-relaxed mb-4">
              Located in the historic heart of Madurai, Tamil Nadu, <strong>OPS SINGAPORE TEXTILES &amp; READYMADES</strong> has been serving customers since 1991 and established in Madurai since 2005, setting a higher standard for the garments trade. We started with a simple belief: <em>that premium clothing shouldn't carry a luxury premium price tag.</em>
            </p>

            <p className="text-muted-text text-sm sm:text-base leading-relaxed mb-6">
              Our unique business model unites <strong>Wholesale and Retail under one roof</strong>. By bypassing traditional multi-tier distributors and buying direct from mills, we offer our local retail families and walk-in buyers the exact same low rates that big businesses enjoy.
            </p>

            {/* Core Values / Strengths list */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-soft-border/50">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-soft-coral shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-main-text text-xs sm:text-sm">Wholesale Pricing for Families</h4>
                  <p className="text-muted-text text-xs leading-relaxed">Save up to 35% compared to commercial showroom retail rates.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-soft-coral shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-main-text text-xs sm:text-sm">Strict Quality Assurance</h4>
                  <p className="text-muted-text text-xs leading-relaxed">Every thread, stitch, and color range is curated for maximum comfort and durability.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-soft-coral shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-main-text text-xs sm:text-sm">Madurai Heritage Shop</h4>
                  <p className="text-muted-text text-xs leading-relaxed">Located near Madurai Main, serving customers since 1991 and established in Madurai since 2005.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-soft-coral shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-main-text text-xs sm:text-sm">Flexible Reseller Channels</h4>
                  <p className="text-muted-text text-xs leading-relaxed">No strict MOQs, simple WhatsApp ordering, and fast pan-India shipping.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
