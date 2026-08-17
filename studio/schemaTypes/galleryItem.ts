import { defineType, defineField } from "sanity";

export const galleryItemType = defineType({
  name: "galleryItem",
  title: "Gallery Item",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Example: Kids & Baby Section",
      validation: (Rule) => Rule.required().error("Title is required"),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "Upload a clear showroom, collection, product display, event, or store photo.",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error("Image is required"),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Kids & Baby", value: "kids-baby" },
          { title: "Women's Collection", value: "womens" },
          { title: "Men's Collection", value: "mens" },
          { title: "Group Dresses", value: "group-dresses" },
          { title: "Religious Collection", value: "religious" },
          { title: "Home Essentials", value: "home-essentials" },
          { title: "Store / Showroom", value: "store" },
          { title: "Other", value: "other" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      initialValue: 1,
      description: "Lower numbers appear first",
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
      description: "When OFF, item disappears from website immediately",
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      active: "active",
      media: "image",
    },
    prepare(selection) {
      const { title, category, active, media } = selection;
      const categoryLabels: Record<string, string> = {
        "kids-baby": "Kids & Baby",
        womens: "Women's Collection",
        mens: "Men's Collection",
        "group-dresses": "Group Dresses",
        religious: "Religious Collection",
        "home-essentials": "Home Essentials",
        store: "Store / Showroom",
        other: "Other",
      };
      const catLabel = category ? categoryLabels[category] || category : "No Category";
      const statusText = active !== false ? "Active" : "Inactive";
      return {
        title: title || "Unnamed Gallery Item",
        subtitle: `${catLabel} • ${statusText}`,
        media,
      };
    },
  },
});
