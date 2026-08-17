import { defineType, defineField } from "sanity";

export const promotionType = defineType({
  name: "promotion",
  title: "Promotion",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Promotion Title",
      type: "string",
      description: "Example: Independence Day Collection",
      validation: (Rule) => Rule.required().error("Promotion Title is required"),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
      description: "Shown under the title on the promotional strip",
    }),
    defineField({
      name: "image",
      title: "Promotional Image",
      type: "image",
      description: "Promotional image used in the homepage strip",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error("Promotional Image is required"),
    }),
    defineField({
      name: "offerPercentage",
      title: "Offer Percentage",
      type: "number",
      description: "Optional. Example: 30 for 30% OFF. Leave empty if no percentage badge is needed.",
      validation: (Rule) =>
        Rule.min(1).max(100).warning("Offer percentage must be between 1 and 100"),
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "datetime",
      description: "Promotion must not appear before this date",
      validation: (Rule) => Rule.required().error("Start Date is required"),
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "datetime",
      description: "Promotion must automatically disappear after this date",
      validation: (Rule) => Rule.required().error("End Date is required"),
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
      description: "Manual master toggle. When OFF, promotion disappears immediately.",
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      initialValue: 1,
      description: "Lower numbers appear first",
    }),
    defineField({
      name: "linkType",
      title: "Link Type",
      type: "string",
      options: {
        list: [
          { title: "None", value: "none" },
          { title: "Collection", value: "collection" },
          { title: "WhatsApp", value: "whatsapp" },
          { title: "External Link", value: "external" },
        ],
        layout: "dropdown",
      },
      initialValue: "none",
    }),
    defineField({
      name: "linkValue",
      title: "Link Value",
      type: "string",
      description:
        "Examples: /collections/mens, /collections/kids-baby, custom WhatsApp text or external URL depending on Link Type",
    }),
  ],
  preview: {
    select: {
      title: "title",
      offerPercentage: "offerPercentage",
      active: "active",
      media: "image",
    },
    prepare(selection) {
      const { title, offerPercentage, active, media } = selection;
      const offerText = offerPercentage ? `${offerPercentage}% OFF` : "No Offer";
      const statusText = active !== false ? "Active" : "Inactive";
      return {
        title: title || "Unnamed Promotion",
        subtitle: `${offerText} • ${statusText}`,
        media,
      };
    },
  },
});
