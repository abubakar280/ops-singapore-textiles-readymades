import { CollectionRouteConfig } from "../types";
import { Shirt, Sparkles, Baby, Users, BookOpen, Home } from "lucide-react";

export const CATEGORIES_CONFIG: CollectionRouteConfig[] = [
  {
    key: "kids-baby",
    slug: "kids-baby",
    name: "Kids & Baby",
    description: "",
    metaTitle: "Kids & Baby Clothing in Madurai | OPS SINGAPORE TEXTILES & READYMADES",
    metaDescription: "Skin-friendly combed cotton baby rompers, kids clothing, boys & girls wear, and newborn dress sets in Madurai at wholesale prices."
  },
  {
    key: "womens",
    slug: "womens",
    name: "Women’s Collection",
    description: "",
    metaTitle: "Women’s Collection in Madurai | OPS SINGAPORE TEXTILES & READYMADES",
    metaDescription: "Elegant Chudithars, fancy chudi materials, leggings, comfortable nightwear, and traditional styles at wholesale and retail rates in Madurai."
  },
  {
    key: "mens",
    slug: "mens",
    name: "Men’s Collection",
    description: "",
    metaTitle: "Men’s Collection in Madurai | OPS SINGAPORE TEXTILES & READYMADES",
    metaDescription: "Discover quality men's clothing at OPS SINGAPORE TEXTILES & READYMADES in Madurai. Premium cotton shirts, traditional dhotis, fancy casuals and wholesale dealer prices."
  },
  {
    key: "group-dresses",
    slug: "group-dresses",
    name: "Group Dresses",
    description: "",
    metaTitle: "Group Dresses in Madurai | OPS SINGAPORE TEXTILES & READYMADES",
    metaDescription: "Group dress specialists in Madurai. Custom matching uniforms for schools, colleges, temple gatherings, businesses and special occasions."
  },
  {
    key: "religious",
    slug: "religious",
    name: "Religious Collection",
    description: "",
    metaTitle: "Religious Collection in Madurai | OPS SINGAPORE TEXTILES & READYMADES",
    metaDescription: "Religious wear, shawls, prayer accessories, and traditional ethnic garments at competitive prices in Madurai."
  },
  {
    key: "home-essentials",
    slug: "home-essentials",
    name: "Home Essentials",
    description: "",
    metaTitle: "Home Essentials in Madurai | OPS SINGAPORE TEXTILES & READYMADES",
    metaDescription: "Shop premium double bedsheets, pure cotton bath towels, Curtains & covers, and household textiles directly from mill rates."
  }
];

export const getIconForCategory = (key: string) => {
  switch (key) {
    case "kids-baby": return Baby;
    case "womens": return Sparkles;
    case "mens": return Shirt;
    case "group-dresses": return Users;
    case "religious": return BookOpen;
    case "islamic": return BookOpen;
    case "home-essentials": return Home;
    default: return Shirt;
  }
};
