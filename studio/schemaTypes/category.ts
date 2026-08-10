import { defineType, defineField } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Category Name",
      type: "string",
      description: "Enter the full display name of the category",
      validation: (Rule) => Rule.required().error("Category Name is required"),
    }),
    defineField({
      name: "categoryKey",
      title: "Category Key",
      type: "string",
      description: "Select the unique key corresponding to this category",
      options: {
        list: [
          { title: "Kids & Baby", value: "kids-baby" },
          { title: "Women's Collection", value: "womens" },
          { title: "Men's Collection", value: "mens" },
          { title: "Group Dresses", value: "group-dresses" },
          { title: "Religious Collection", value: "religious" },
          { title: "Home Essentials", value: "home-essentials" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required().error("Category Key is required"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL-friendly slug generated from category name",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error("Slug is required"),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 2,
      description: "Brief summary shown on collection cards",
    }),
    defineField({
      name: "fullDescription",
      title: "Full Description",
      type: "text",
      rows: 4,
      description: "Detailed description displayed on individual collection banners",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      description: "Recommended: 300 KB–700 KB. Keep the image below 1.5 MB for good website performance.",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "cardImage",
      title: "Card Image",
      type: "image",
      description: "Recommended: 300 KB–700 KB. Keep the image below 1.5 MB for good website performance.",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "bannerImage",
      title: "Banner Image",
      type: "image",
      description: "Recommended: 300 KB–700 KB. Keep the image below 1.5 MB for good website performance.",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "badgeText",
      title: "Badge Text",
      type: "string",
      initialValue: "Wholesale & Retail",
      description: "Optional badge label displayed on cards and banners",
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description: "Order in which categories appear (lower numbers come first)",
      validation: (Rule) => Rule.required().error("Display Order is required"),
    }),
    defineField({
      name: "showInHero",
      title: "Show in Hero Section",
      type: "boolean",
      initialValue: true,
      description: "Enable to display this category in the homepage hero grid",
    }),
    defineField({
      name: "showInCollections",
      title: "Show in Collections Grid",
      type: "boolean",
      initialValue: true,
      description: "Enable to display this category in the Explore Our Collections section",
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
      description: "Set to false to temporarily hide this category from the website",
    }),
  ],
  preview: {
    select: {
      title: "name",
      categoryKey: "categoryKey",
      active: "active",
      media: "cardImage",
    },
    prepare(selection) {
      const { title, categoryKey, active, media } = selection;
      const statusText = active !== false ? "Active" : "Inactive";
      return {
        title: title || "Unnamed Category",
        subtitle: `${categoryKey || "No Key"} • ${statusText}`,
        media,
      };
    },
  },
});
