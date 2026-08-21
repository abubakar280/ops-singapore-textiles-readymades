import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Phone, Shirt, MessageSquare, Instagram } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { businessInfo, navigationLinks } from "../data";
import { trackPhoneClick, trackWhatsAppClick } from "../lib/analytics";

export const StickyNavigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const isHomepage = location.pathname === "/";

  // Monitor scroll to change navigation background styling and active section
  useEffect(() => {
    if (!isHomepage) {
      setActiveSection("");
      return;
    }

    const handleScroll = () => {
      // Background styling
      setScrolled(window.scrollY > 50);

      // Current active section tracking using scroll positions
      const scrollPosition = window.scrollY + 200;
      
      for (const link of navigationLinks) {
        const element = document.getElementById(link.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomepage]);

  // Handle smooth scroll to section
  const handleScrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    
    if (isHomepage) {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80; // height of sticky nav
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    } else {
      // Navigate to homepage with scroll target state
      navigate("/", { state: { scrollToId: id } });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-soft-border shadow-sm py-2.5"
          : "bg-soft-cream/80 border-b border-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 xl:gap-4">
          
          {/* Logo & Business Name */}
          <button
            onClick={() => handleScrollToSection("home")}
            className="flex items-center gap-2 sm:gap-2.5 focus-visible:outline-2 focus-visible:outline-soft-coral rounded-lg group text-left cursor-pointer shrink-0"
            aria-label="OPS SINGAPORE TEXTILES & READYMADES Home"
          >
            <div className="w-12 h-12 sm:w-[60px] sm:h-[60px] flex items-center justify-center bg-white rounded-lg p-1 border border-soft-border/50 shadow-xs overflow-hidden transition-all group-hover:scale-105 shrink-0">
              {!logoError ? (
                <img
                  src={businessInfo.logoUrl}
                  alt="OPS SINGAPORE TEXTILES & READYMADES Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <Shirt size={28} className="text-soft-coral" />
              )}
            </div>
            <div className="flex flex-col text-left font-heading font-bold text-xs sm:text-sm leading-tight tracking-tight text-main-text group-hover:text-soft-coral transition-colors">
              <span>OPS SINGAPORE TEXTILES</span>
              <span>&amp; READYMADES</span>
            </div>
          </button>

          {/* Desktop Navigation Menu Links */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-2 shrink-0" aria-label="Desktop Navigation">
            {navigationLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleScrollToSection(link.id)}
                className={`px-3 py-1.5 text-xs xl:text-sm font-heading font-medium tracking-wide rounded-full transition-all cursor-pointer ${
                  activeSection === link.id
                    ? "bg-soft-coral/10 text-soft-coral font-semibold"
                    : "text-muted-text hover:text-main-text hover:bg-light-beige/30"
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Quick Contact Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={businessInfo.phoneDial}
              onClick={() => trackPhoneClick("header")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-soft-border hover:border-muted-blue/50 text-xs font-medium text-muted-text hover:text-muted-blue transition-all"
              aria-label={`Call us at ${businessInfo.phoneRaw}`}
            >
              <Phone size={14} className="text-muted-blue animate-[bounce_3s_infinite]" />
              <span>Call Store</span>
            </a>
            
            <a
              href={businessInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("header")}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs px-4 py-2 rounded-full shadow-xs hover:shadow-sm transition-all hover:scale-[1.02]"
              aria-label="Chat with us on WhatsApp"
            >
              <MessageSquare size={14} fill="currentColor" />
              <span>WhatsApp Chat</span>
            </a>
          </div>

          {/* Mobile Menu Button Controls */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Quick mobile-only Call icon */}
            <a
              href={businessInfo.phoneDial}
              onClick={() => trackPhoneClick("header_mobile_icon")}
              className="p-2 text-muted-text hover:text-muted-blue rounded-full bg-white border border-soft-border sm:hidden"
              aria-label="Call Store"
            >
              <Phone size={18} />
            </a>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-main-text hover:text-soft-coral rounded-lg bg-light-beige/20 border border-soft-border/50 focus-visible:ring-2 focus-visible:ring-soft-coral cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-b border-soft-border overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-2 max-w-7xl mx-auto">
              <div className="grid grid-cols-2 gap-2 pb-4 border-b border-dashed border-soft-border">
                {navigationLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleScrollToSection(link.id)}
                    className={`px-3 py-2.5 text-left text-sm font-heading font-medium rounded-lg transition-all cursor-pointer ${
                      activeSection === link.id
                        ? "bg-soft-coral/10 text-soft-coral font-bold"
                        : "text-muted-text hover:bg-light-beige/20 hover:text-main-text"
                    }`}
                  >
                    {link.name}
                  </button>
                ))}
              </div>

              {/* Mobile CTA Buttons */}
              <div className="flex flex-col sm:hidden gap-2 pt-3">
                <a
                  href={businessInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("mobile_nav_menu")}
                  className="flex items-center justify-center gap-2 bg-emerald-600 text-white font-heading font-medium py-3 rounded-xl shadow-xs"
                >
                  <MessageSquare size={16} fill="currentColor" />
                  <span>Chat on WhatsApp</span>
                </a>
                
                <a
                  href={businessInfo.phoneDial}
                  onClick={() => trackPhoneClick("mobile_nav_menu")}
                  className="flex items-center justify-center gap-2 border border-soft-border text-muted-text hover:text-main-text font-heading font-medium py-3 rounded-xl bg-light-beige/10"
                >
                  <Phone size={16} />
                  <span>Call Store</span>
                </a>

                <a
                  href={businessInfo.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border border-soft-border text-rose-700 hover:text-rose-800 font-heading font-medium py-3 rounded-xl bg-rose-50/40"
                >
                  <Instagram size={16} />
                  <span>{businessInfo.instagramHandle}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
