import React from "react";
import { Phone, MessageSquare, MapPin, Shirt, Heart, Award, Instagram } from "lucide-react";
import { businessInfo, navigationLinks } from "../data";

export const Footer: React.FC = () => {
  const [logoError, setLogoError] = React.useState(false);

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className="bg-warm-ivory text-main-text border-t border-soft-border/70 pt-16 pb-8 relative">
      {/* Decorative stitching line along the top margin of footer */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[radial-gradient(ellipse_at_center,#E8E0D5_1.5px,transparent_1.5px)] [background-size:8px_3px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-soft-border/50 text-left">
          
          {/* Column 1: Brand & Logo */}
          <div className="md:col-span-5 flex flex-col items-start">
            
            {/* Logo box */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-16 h-16 flex items-center justify-center bg-white rounded-xl p-1.5 border border-soft-border shadow-2xs overflow-hidden shrink-0">
                {!logoError ? (
                  <img
                    src={businessInfo.logoUrl}
                    alt="OPS SINGAPORE TEXTILES & READYMADES Logo"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <Shirt size={32} className="text-soft-coral" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-base tracking-tight text-main-text">
                  <strong>OPS SINGAPORE TEXTILES</strong>
                </span>
                <span className="text-xs font-mono text-muted-text uppercase tracking-widest leading-none font-bold">
                  <strong>&amp; READYMADES</strong>
                </span>
              </div>
            </div>

            <p className="text-muted-text text-sm leading-relaxed mb-6 max-w-sm">
              Your trusted family clothing partner in Madurai—serving customers since 1991, established in Madurai since 2005. Supplying wholesale and retail readymades, school uniforms, and religious collection garments across India.
            </p>

            {/* Quick established line badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-soft-coral/10 text-soft-coral text-xs font-semibold">
              <Award size={13} />
              <span>{businessInfo.established}</span>
            </div>

          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="font-heading font-extrabold text-xs uppercase tracking-widest text-main-text mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleScrollToSection(link.id)}
                    className="text-muted-text hover:text-soft-coral text-sm font-medium transition-colors cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-soft-coral"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Store Information */}
          <div className="md:col-span-4 flex flex-col">
            <h4 className="font-heading font-extrabold text-xs uppercase tracking-widest text-main-text mb-5">
              Store Information
            </h4>
            
            <ul className="space-y-4">
              {/* Address */}
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-soft-coral shrink-0 mt-0.5" />
                <span className="text-muted-text text-sm leading-relaxed">
                  {businessInfo.fullAddress}
                </span>
              </li>

              {/* Phone */}
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-muted-blue shrink-0" />
                <a
                  href={businessInfo.phoneDial}
                  className="text-muted-text hover:text-muted-blue font-mono font-medium text-sm transition-colors"
                >
                  {businessInfo.phoneRaw}
                </a>
              </li>

              {/* Action */}
              <li className="flex items-center gap-3">
                <MessageSquare size={16} fill="currentColor" className="text-emerald-600 shrink-0" />
                <a
                  href={businessInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:text-emerald-800 text-sm font-heading font-bold transition-colors"
                >
                  WhatsApp Quick Chat
                </a>
              </li>

              {/* Instagram */}
              <li className="flex items-center gap-3">
                <Instagram size={16} className="text-rose-600 shrink-0" />
                <a
                  href={businessInfo.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-text hover:text-rose-600 text-sm font-heading font-semibold transition-colors"
                >
                  {businessInfo.instagramHandle}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-muted-text">
          <p>
            &copy; {currentYear} <strong>OPS SINGAPORE TEXTILES &amp; READYMADES</strong>. All rights reserved.
          </p>
          
          <p className="flex items-center justify-center gap-1.5">
            <span>Crafted with</span>
            <Heart size={12} className="text-soft-coral fill-soft-coral animate-[pulse_2s_infinite]" />
            <span>for families &amp; resellers in Madurai.</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
