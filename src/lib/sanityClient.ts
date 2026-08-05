import { createClient } from "@sanity/client";

const projectId = (import.meta as any).env?.VITE_SANITY_PROJECT_ID;
const dataset = (import.meta as any).env?.VITE_SANITY_DATASET || "production";
const apiVersion = (import.meta as any).env?.VITE_SANITY_API_VERSION || "2025-07-01";
const useCdn = (import.meta as any).env?.VITE_SANITY_USE_CDN !== "false"; // Default to true

export const isSanityConfigured = !!projectId;

if (!isSanityConfigured) {
  console.warn(
    "Sanity CMS project ID is missing! Please configure VITE_SANITY_PROJECT_ID in your environment. " +
    "The website will gracefully fall back to default metadata or show helpful messages."
  );
}

export const sanityClient = isSanityConfigured && projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
    })
  : null;
