import React from "react";
import { MapPin, Phone, MessageSquare, Clock, Navigation, CornerUpRight, Map, Instagram } from "lucide-react";
import { businessInfo } from "../data";

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-heading font-extrabold text-soft-coral tracking-widest uppercase bg-soft-coral/10 px-3.5 py-1.5 rounded-full">
            Contact Us
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-main-text mt-4 mb-3">
            Visit Our Store or Inquire Online
          </h2>
          <p className="text-muted-text text-sm sm:text-base leading-relaxed">
            Have any questions or want to check on catalog stocks? Reach out via phone or WhatsApp, or step directly into our wholesale showroom in Madurai Main.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Interactive Info Cards */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            
            {/* Address Card */}
            <div className="flex items-start gap-4 p-6 rounded-2xl border border-soft-border/50 bg-soft-cream/10 text-left">
              <div className="p-3 rounded-xl bg-white text-soft-coral border border-soft-border/30 shrink-0 shadow-2xs">
                <MapPin size={22} />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-[10px] tracking-wider text-muted-text uppercase">Store Location</span>
                <h3 className="font-heading font-bold text-main-text text-base sm:text-lg mt-0.5">Physical Showroom</h3>
                <p className="text-muted-text text-sm leading-relaxed mt-2">
                  {businessInfo.addressLine1} <br />
                  {businessInfo.addressLine2}
                </p>
                <div className="mt-4 flex gap-2">
                  <a
                    href={businessInfo.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-soft-coral hover:text-soft-coral/80 bg-soft-coral/10 py-2 px-4 rounded-lg transition-colors"
                  >
                    <Navigation size={12} fill="currentColor" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Phone & WhatsApp Card */}
            <div className="flex items-start gap-4 p-6 rounded-2xl border border-soft-border/50 bg-soft-cream/10 text-left">
              <div className="p-3 rounded-xl bg-white text-muted-blue border border-soft-border/30 shrink-0 shadow-2xs">
                <Phone size={22} />
              </div>
              <div className="flex flex-col w-full">
                <span className="font-heading font-extrabold text-[10px] tracking-wider text-muted-text uppercase">Direct Hotline</span>
                <h3 className="font-heading font-bold text-main-text text-base sm:text-lg mt-0.5">Phone &amp; WhatsApp</h3>
                <p className="text-muted-text text-sm leading-relaxed mt-2">
                  Call us or chat directly for bulk orders, price quotes, and dealer inquiries.
                </p>
                <span className="text-main-text font-mono font-bold text-base sm:text-lg mt-2">
                  {businessInfo.phoneRaw}
                </span>
                
                <div className="mt-4 flex flex-wrap gap-2.5">
                  <a
                    href={businessInfo.phoneDial}
                    className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-muted-blue hover:text-muted-blue/80 bg-muted-blue/10 py-2.5 px-4 rounded-lg transition-colors"
                  >
                    <Phone size={12} />
                    <span>Call Store</span>
                  </a>
                  <a
                    href={businessInfo.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-500/10 py-2.5 px-4 rounded-lg transition-colors"
                  >
                    <MessageSquare size={12} fill="currentColor" />
                    <span>Chat WhatsApp</span>
                  </a>
                  <a
                    href={businessInfo.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-rose-700 hover:text-rose-800 bg-rose-500/10 py-2.5 px-4 rounded-lg transition-colors"
                  >
                    <Instagram size={12} />
                    <span>{businessInfo.instagramHandle}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="flex items-start gap-4 p-6 rounded-2xl border border-soft-border/50 bg-soft-cream/10 text-left">
              <div className="p-3 rounded-xl bg-white text-sage-green border border-soft-border/30 shrink-0 shadow-2xs">
                <Clock size={22} />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-[10px] tracking-wider text-muted-text uppercase">Store Timings</span>
                <h3 className="font-heading font-bold text-main-text text-base sm:text-lg mt-0.5">Opening Hours</h3>
                <p className="text-muted-text text-sm mt-2 font-medium">
                  {businessInfo.hours}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps Placeholder Area */}
          <div className="lg:col-span-6 flex flex-col justify-stretch">
            <div className="relative w-full h-full min-h-[350px] rounded-3xl border border-soft-border bg-pale-grey overflow-hidden flex flex-col items-center justify-center text-center p-8 group">
              {/* Fake abstract cartography background styling */}
              <div className="absolute inset-0 opacity-[0.15] pointer-events-none bg-[radial-gradient(#292723_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
              
              {/* Fake roads representational vectors */}
              <div className="absolute top-[20%] left-0 right-0 h-[3px] bg-white transform rotate-6"></div>
              <div className="absolute bottom-[30%] left-0 right-0 h-[4px] bg-white transform -rotate-12"></div>
              <div className="absolute top-0 bottom-0 left-[40%] w-[4px] bg-white transform rotate-3"></div>
              <div className="absolute top-0 bottom-0 left-[70%] w-[3px] bg-white transform -rotate-6"></div>
              
              {/* Fake River / Park */}
              <div className="absolute top-10 right-10 w-24 h-24 rounded-full bg-muted-blue/10 filter blur-xl"></div>
              <div className="absolute bottom-10 left-10 w-32 h-20 bg-sage-green/10 rounded-full filter blur-xl"></div>

              {/* Central Map Pin Mock */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-white border border-soft-border flex items-center justify-center text-soft-coral shadow-sm transition-all group-hover:scale-110 mb-4 relative">
                  <MapPin size={28} className="animate-[bounce_2.5s_infinite]" />
                  <div className="absolute -bottom-1 w-6 h-1 bg-main-text/10 rounded-full blur-2xs"></div>
                </div>

                <h3 className="font-heading font-bold text-main-text text-base sm:text-lg mb-1">
                  <strong>{businessInfo.name}</strong>
                </h3>
                <p className="text-muted-text text-xs max-w-xs leading-relaxed mb-6">
                  Mahal Vadampokki Street, near historic Thirumalai Nayakkar Palace area, Madurai.
                </p>

                <a
                  href={businessInfo.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-main-text hover:bg-main-text/90 text-white font-heading font-semibold text-xs px-6 py-3.5 rounded-xl shadow-xs transition-all hover:scale-[1.02]"
                >
                  <CornerUpRight size={14} />
                  <span>Open in Google Maps</span>
                </a>
              </div>

              {/* Decorative Compass Rose Detail */}
              <div className="absolute bottom-4 right-4 flex items-center gap-1.5 text-[10px] font-mono text-muted-text bg-white/80 border border-soft-border/50 px-2 py-1 rounded-md">
                <Map size={10} />
                <span>MAP PREVIEW</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
