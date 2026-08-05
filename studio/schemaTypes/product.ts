import { defineType, defineField } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      description: "Enter the full name of the product",
      validation: (Rule) => Rule.required().error("Product Name is required"),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "Select the category this product belongs to",
      options: {
        list: [
          { title: "Kids & Baby", value: "Kids & Baby" },
          { title: "Women's Collection", value: "Women's Collection" },
          { title: "Men's Collection", value: "Men's Collection" },
          { title: "Group Dresses", value: "Group Dresses" },
          { title: "Religious Collection", value: "Religious Collection" },
          { title: "Home Essentials", value: "Home Essentials" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required().error("Category is required"),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      description:
        "Recommended: Upload images between 300 KB and 500 KB. Keep each image below 1.5 MB for the best website performance.",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error("Main Image is required"),
    }),
    defineField({
      name: "secondImage",
      title: "Second Image",
      type: "image",
      description:
        "Recommended: Upload images between 300 KB and 500 KB. Keep each image below 1.5 MB for the best website performance.",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Optional product description",
    }),
    defineField({
      name: "stockStatus",
      title: "Stock Status",
      type: "string",
      description: "Select whether this product is in stock or out of stock",
      options: {
        list: [
          { title: "In Stock", value: "In Stock" },
          { title: "Out of Stock", value: "Out of Stock" },
        ],
        layout: "radio",
      },
      initialValue: "In Stock",
      validation: (Rule) => Rule.required().error("Stock Status is required"),
    }),
    defineField({
      name: "featured",
      title: "Featured Collection",
      type: "boolean",
      description: "Enable to display this product in the Featured Collection on the homepage",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      category: "category",
      stockStatus: "stockStatus",
      media: "mainImage",
    },
    prepare(selection) {
      const { title, category, stockStatus, media } = selection;
      const catText = category || "No Category";
      const stockText = stockStatus || "In Stock";
      return {
        title: title || "Unnamed Product",
        subtitle: `${catText} • ${stockText}`,
        media,
      };
    },
  },
});
