import { LocalProduct } from "../types/product";

/**
 * Generates a pre-filled WhatsApp click-to-chat URL for product inquiries.
 * 
 * @param product The product being inquired about
 * @param categoryName Name of the category the product belongs to
 * @returns Encoded WhatsApp chat URL
 */
export function getWhatsAppEnquiryUrl(product: LocalProduct, categoryName: string): string {
  const phoneNumber = "917200983970"; // Store phone number
  
  const message = `Hi,

I would like to enquire about:

Product: ${product.productName}
Category: ${categoryName}

Please share available stock and details.`;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates a general WhatsApp inquiry URL.
 * 
 * @param text Custom message text or fallback
 * @returns Encoded WhatsApp chat URL
 */
export function getGeneralWhatsAppUrl(text?: string): string {
  const phoneNumber = "917200983970";
  const defaultText = text || "Hi OPS SINGAPORE TEXTILES & READYMADES, I would like to know more about your collections.";
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultText)}`;
}
