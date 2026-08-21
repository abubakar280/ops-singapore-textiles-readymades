import React from "react";
import { Truck, MessageSquare, Phone, CheckCircle, Package, ArrowUpRight } from "lucide-react";
import { businessInfo } from "../data";
import { PlaceholderImage } from "./PlaceholderImage";
import { trackPhoneClick, trackWhatsAppClick } from "../lib/analytics";

export const WholesaleSupply: React.FC = () => {
  return (
    <section
      id="wholesale"
      className="py-20 bg-white relative border-b border-soft-border/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-heading font-extrabold text-soft-coral tracking-widest uppercase bg-soft-coral/10 px-3.5 py-1.5 rounded-full">
            B2B &amp; Wholesale
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-main-text mt-4 mb-3">
            Pan-India Wholesale Supply &amp; Reseller Support
          </h2>
          <p className="text-muted-text text-sm sm:text-base leading-relaxed">
            We are the trusted primary partner for hundreds of retail shop owners, home clothing resellers, and boutique entrepreneurs across Tamil Nadu and beyond.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Side: Text and Core Elements */}
          <div className="lg:col-span-7 flex flex-col text-left">
            <h3 className="font-heading font-bold text-main-text text-xl sm:text-2xl mb-4">
              Expand Your Clothing Business with Dealer-Tier Pricing
            </h3>
            <p className="text-muted-text text-sm sm:text-base leading-relaxed mb-6">
              Are you looking to start your own home boutique? Or already operating a clothing store and need reliable, low-cost supply channels? We offer comprehensive catalog access and premium dealer pricing with no massive minimum purchase requirements.
            </p>

            {/* Grid of Key Features */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl border border-soft-border/50 bg-soft-cream/10">
                <div className="text-soft-coral font-bold font-heading text-sm flex items-center gap-1.5 mb-1.5">
                  <Package size={16} />
                  <span>Curated Catalogs</span>
                </div>
                <p className="text-muted-text text-xs leading-relaxed">Regular digital catalog updates via WhatsApp for easy customer pre-ordering and stock selection.</p>
              </div>

              <div className="p-4 rounded-xl border border-soft-border/50 bg-soft-cream/10">
                <div className="text-soft-coral font-bold font-heading text-sm flex items-center gap-1.5 mb-1.5">
                  <Truck size={16} />
                  <span>Pan-India Transport</span>
                </div>
                <p className="text-muted-text text-xs leading-relaxed">We coordinate with major transport networks and couriers to ship bundles securely to any town in India.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <a
                href="https://wa.me/917200983970?text=Hi%20Singapore%20Textiles%20%26%20Readymades%2C%20I%20am%20a%20clothing%20reseller.%20I%20would%20like%20to%20receive%20wholesale%20catalogs%20and%20pricing."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("wholesale_supply")}
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-xs"
              >
                <MessageSquare size={16} fill="currentColor" />
                <span>Join Reseller WhatsApp Group</span>
              </a>
              <a
                href={businessInfo.phoneDial}
                onClick={() => trackPhoneClick("wholesale_supply")}
                className="inline-flex items-center justify-center gap-1 text-xs font-heading font-bold text-muted-text hover:text-soft-coral transition-colors py-2 px-3 self-center cursor-pointer"
              >
                <span>Call Wholesale Manager</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Right Side: Image Placeholder */}
          <div className="lg:col-span-5 relative">
            <PlaceholderImage
              category="Wholesale Bundles &amp; Logistics"
              iconName="Truck"
              aspectRatio="aspect-[4/3] sm:aspect-[16/11]"
              className="shadow-md"
            />
            {/* Thread pattern detail */}
            <div className="absolute -inset-4 border border-dashed border-main-text/[0.04] rounded-3xl pointer-events-none -z-10"></div>
          </div>

        </div>

        {/* Dynamic Flowchart - Steps */}
        <div className="border-t border-soft-border/50 pt-12">
          <h4 className="font-heading font-bold text-main-text text-base sm:text-lg mb-8 text-center">
            How to Order Wholesale in 3 Easy Steps
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center relative">
              <div className="w-12 h-12 rounded-full bg-soft-coral/10 text-soft-coral font-heading font-extrabold flex items-center justify-center mb-4 border border-soft-coral/20">
                1
              </div>
              <h5 className="font-heading font-bold text-main-text text-sm sm:text-base mb-1">Select Garments</h5>
              <p className="text-muted-text text-xs sm:text-sm max-w-xs">
                Request our active digital catalogs on WhatsApp, and choose your color ranges, sizes, and quantities.
              </p>
              {/* Connector arrow (desktop only) */}
              <div className="hidden md:block absolute top-6 left-[65%] w-[70%] border-t border-dashed border-soft-border pointer-events-none -z-10"></div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center relative">
              <div className="w-12 h-12 rounded-full bg-muted-blue/10 text-muted-blue font-heading font-extrabold flex items-center justify-center mb-4 border border-muted-blue/20">
                2
              </div>
              <h5 className="font-heading font-bold text-main-text text-sm sm:text-base mb-1">Confirm Quote &amp; Pay</h5>
              <p className="text-muted-text text-xs sm:text-sm max-w-xs">
                Our team verifies in-store inventory, provides a final competitive wholesale quote, and handles packaging.
              </p>
              {/* Connector arrow (desktop only) */}
              <div className="hidden md:block absolute top-6 left-[65%] w-[70%] border-t border-dashed border-soft-border pointer-events-none -z-10"></div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-sage-green/10 text-sage-green font-heading font-extrabold flex items-center justify-center mb-4 border border-sage-green/20">
                3
              </div>
              <h5 className="font-heading font-bold text-main-text text-sm sm:text-base mb-1">Secure Dispatch</h5>
              <p className="text-muted-text text-xs sm:text-sm max-w-xs">
                Your bundle is dispatched securely via premier transport agencies. Live tracking numbers are sent directly to your mobile.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
