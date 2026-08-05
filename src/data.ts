import {
  NavigationLink,
  TrustPoint,
  Category,
  ValueProp,
  Product,
  Review,
  FAQItem,
  GalleryItem,
  BusinessInfo
} from "./types";

export const businessInfo: BusinessInfo = {
  name: "OPS SINGAPORE TEXTILES & READYMADES",
  tagline: "Everything Your Family Needs. Under One Roof.",
  location: "Madurai, Tamil Nadu, India",
  addressLine1: "12/65C, Mahal Vadampokki Street,",
  addressLine2: "Mahal Area, Madurai Main, Madurai, Tamil Nadu 625001",
  fullAddress: "12/65C, Mahal Vadampokki Street, Mahal Area, Madurai Main, Madurai, Tamil Nadu 625001",
  phoneRaw: "+91 72009 83970",
  phoneDial: "tel:+917200983970",
  whatsappUrl: "https://wa.me/917200983970?text=Hi%20OPS%20SINGAPORE%20TEXTILES%20%26%20READYMADES%2C%20I%20would%20like%20to%20know%20more%20about%20your%20collections.",
  instagramUrl: "https://www.instagram.com/singapore_tex_mdu?igsh=YW5wZThjbm52cHdh",
  instagramHandle: "@singapore_tex_mdu",
  established: "Serving Customers Since 1991 | Established in Madurai Since 2005",
  hours: "10:30 AM – 8:30 PM, Open All Days",
  logoUrl: "https://i.ibb.co/35T4GbGH/ops.png", // Direct image hotlink from ImgBB
  googleMapsEmbedPlaceholder: "Madurai Mahal Vadampokki Street Area",
  googleMapsDirectionsUrl: "https://maps.google.com/?q=OPS+SINGAPORE+Textiles+and+Readymades+Mahal+Vadampokki+Street+Madurai"
};

export const navigationLinks: NavigationLink[] = [
  { id: "home", name: "Home", href: "#home" },
  { id: "collections", name: "Collections", href: "#collections" },
  { id: "group-orders", name: "Group Orders", href: "#group-orders" },
  { id: "wholesale", name: "Wholesale", href: "#wholesale" },
  { id: "gallery", name: "Gallery", href: "#gallery" },
  { id: "about", name: "About", href: "#about" },
  { id: "contact", name: "Contact", href: "#contact" }
];

export const trustPoints: TrustPoint[] = [
  {
    id: "trust-1",
    title: "Serving Customers Since 1991",
    subtitle: "Established in Madurai Since 2005",
    icon: "Award"
  },
  {
    id: "trust-2",
    title: "Wholesale & Retail Under One Roof",
    subtitle: "Retail buyers get access to near-wholesale prices",
    icon: "Sparkles"
  },
  {
    id: "trust-3",
    title: "Pan-India Wholesale Shipping",
    subtitle: "Fast and reliable shipping to clothing resellers nationwide",
    icon: "Truck"
  },
  {
    id: "trust-4",
    title: "Group Dress Specialists",
    subtitle: "Custom sets for schools, colleges, events & organizations",
    icon: "Users"
  }
];

export const categories: Category[] = [
  {
    id: "kids-baby",
    name: "Kids & Baby",
    description: "",
    tag: "Extra Soft Quality",
    coverImg: "bg-gradient-to-tr from-warm-yellow/10 to-pastel-peach/15",
    itemsCount: "350+ Varieties",
    benefits: ["Newborn Baby Sets", "Kids Party Wear", "Vibrant Playwear", "100% Cotton Innerwear"]
  },
  {
    id: "womens-wear",
    name: "Women’s Collection",
    description: "",
    tag: "Trending Styles",
    coverImg: "bg-gradient-to-tr from-soft-coral/10 to-soft-lavender/15",
    itemsCount: "600+ Varieties",
    benefits: ["Premium Chudithars", "Comfortable Nightwear", "Leggings & Dupattas", "Traditional Pattu Pavadai"]
  },
  {
    id: "mens-wear",
    name: "Men’s Collection",
    description: "",
    tag: "Wholesale & Retail",
    coverImg: "bg-gradient-to-tr from-muted-blue/10 to-sage-green/15",
    itemsCount: "450+ Varieties",
    benefits: ["Pure Cotton Shirts", "Traditional & Fancy Dhotis", "Premium Fit Trousers", "Lungi & Innerwear Sets"]
  },
  {
    id: "group-dresses",
    name: "Group Dresses",
    description: "",
    tag: "Special Pricing",
    coverImg: "bg-gradient-to-tr from-muted-blue/10 to-soft-coral/15",
    itemsCount: "Custom Tailored Sets",
    benefits: ["School & College Uniforms", "Traditional Temple Group Sets", "Corporate & Event Clothing", "No Minimum Order Restrictions"]
  },
  {
    id: "religious-collection",
    name: "Religious Collection",
    description: "",
    tag: "Specialists",
    coverImg: "bg-gradient-to-tr from-sage-green/10 to-soft-lavender/15",
    itemsCount: "200+ Designs",
    benefits: ["Ethnic Wear", "Prayer Shawls & Accessories", "Traditional Apparel", "Quality Fabrics"]
  },
  {
    id: "home-essentials",
    name: "Home Essentials",
    description: "",
    tag: "Household Favorites",
    coverImg: "bg-gradient-to-tr from-pastel-peach/10 to-warm-yellow/15",
    itemsCount: "150+ Varieties",
    benefits: ["Double Bedsheets", "100% Cotton Bath Towels", "Vibrant Window Curtains", "Comfortable Pillows & Covers"]
  }
];

export const valueProps: ValueProp[] = [
  {
    id: "val-1",
    title: "Wholesale Rates for Everyone",
    description: "We bypass middlemen. Even if you purchase a single item for your personal use, we offer pricing very close to wholesale market rates.",
    icon: "TrendingDown"
  },
  {
    id: "val-2",
    title: "No Minimum Order Quantity",
    description: "Unlike traditional wholesalers who force bulk buying, retail customers can purchase exactly what they need without minimum constraints.",
    icon: "ShoppingBag"
  },
  {
    id: "val-3",
    title: "Clothing Reseller Support",
    description: "Are you running an online clothing store or a small home boutique? Get exclusive dealer pricing, catalogues, and high-margin stocks.",
    icon: "Store"
  },
  {
    id: "val-4",
    title: "Group Order Specialization",
    description: "We are Madurai's trusted partner for matching outfits. Whether for 10 or 1000 people, we coordinate perfect colors, sizes, and supply fast.",
    icon: "CheckSquare"
  }
];

export const products: Product[] = [
  {
    id: "p-1",
    name: "Premium Cotton Men's Shirt",
    category: "Men’s Collection",
    priceText: "Wholesale Price Match",
    features: ["100% Premium Giza Cotton", "Breathable & Color-fast", "Available in 12 pastel shades"],
    image: "men_shirt",
    badge: "Best Seller"
  },
  {
    id: "p-2",
    name: "Premium Cotton Chudithar Set",
    category: "Women’s Collection",
    priceText: "Wholesale Price Match",
    features: ["Soft breathable fabric", "Vibrant modern designs", "Perfect for daily & office wear"],
    image: "woman_chudithar",
    badge: "Best Seller"
  },
  {
    id: "p-3",
    name: "Soft Cotton Baby Rompers (Set of 3)",
    category: "Kids & Baby",
    priceText: "Reseller Favorite",
    features: ["Organic combed cotton", "Anti-allergy nickel-free snaps", "Gentle on newborn skin"],
    image: "baby_romper",
    badge: "Newborn Friendly"
  },
  {
    id: "p-4",
    name: "College Event Matching Shirts & Dhoti Set",
    category: "Group Dresses",
    priceText: "Special Bulk Discount",
    features: ["Perfect color matching", "Available in large quantities", "Custom sizing coordination"],
    image: "group_dress",
    badge: "Group Favorite"
  },
  {
    id: "p-5",
    name: "Modest Premium Ethnic Wear",
    category: "Religious Collection",
    priceText: "Import Quality",
    features: ["Ultra-soft breathable fabric", "Fine embroidery detailing", "Includes matching shawl"],
    image: "abaya",
    badge: "Modest Elegant"
  },
  {
    id: "p-6",
    name: "Premium Cotton Double Bedsheet",
    category: "Home Essentials",
    priceText: "Direct from Mill",
    features: ["Includes 2 matching pillow covers", "Durability tested for 100+ washes", "Vibrant floral & modern geometric prints"],
    image: "bedsheet",
    badge: "Home Essential"
  }
];

export const reviews: Review[] = [];

export const faqs: FAQItem[] = [
  {
    id: "faq-1",
    question: "Do retail buyers really get wholesale pricing?",
    answer: "Yes! At OPS SINGAPORE TEXTILES & READYMADES, our business model relies on large sales volume. This allows us to keep retail markup extremely thin, giving everyday families and single-item buyers access to rates very close to wholesale pricing."
  },
  {
    id: "faq-2",
    question: "What is your Minimum Order Quantity (MOQ)?",
    answer: "For general retail purchases, there is absolutely no minimum order quantity. You can purchase a single T-shirt, a single shirt, or a single bath towel at our highly competitive rates. Special pricing tiers apply when ordering in bulk for resale or group events."
  },
  {
    id: "faq-3",
    question: "How do I place a bulk order or request dealer pricing?",
    answer: "Simply contact us via phone or WhatsApp at +91 72009 83970. We will share our latest catalogues, price lists, and arrange shipping. You can also visit our physical store in Madurai Main to touch and inspect the fabrics in person."
  },
  {
    id: "faq-4",
    question: "Do you ship garments across India?",
    answer: "Yes, we ship wholesale consignments across Tamil Nadu and all other states in India via trusted transport and courier networks. Tracking details are shared promptly upon dispatch."
  },
  {
    id: "faq-5",
    question: "Can we order custom uniform sets for schools, businesses or temple events?",
    answer: "Absolutely! We are known as group dress specialists in Madurai. We supply matching shirts, dhotis, Chudithars, salwars, or t-shirts for any count. Contact us early with your colors and quantity for best custom pricing."
  }
];

export const galleryItems: GalleryItem[] = [
  {
    id: "g-1",
    title: "Elegant Chudithar Section",
    subtitle: "Wide range of cotton and designer Chudithars and materials",
    category: "Women's Collection",
    image: "gallery_chudithar"
  },
  {
    id: "g-2",
    title: "Wholesale Stockroom",
    subtitle: "High-volume garments ready for pan-India shipping",
    category: "Wholesale",
    image: "gallery_wholesale"
  },
  {
    id: "g-3",
    title: "Men's Ethic & Casuals",
    subtitle: "Premium cotton shirts, traditional dhotis, and innerwear",
    category: "Men's Collection",
    image: "gallery_men"
  },
  {
    id: "g-4",
    title: "Religious Collection",
    subtitle: "In-store showcase of ethnic and religious garments",
    category: "Religious Collection",
    image: "gallery_islamic"
  }
];
