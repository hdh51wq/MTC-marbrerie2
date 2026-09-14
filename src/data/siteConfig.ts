import type { SiteConfig } from "@/types/content";

// SWAP: Update all placeholder asset paths when real client media is delivered
export const siteConfig: SiteConfig = {
  name: "Marbrerie Tunis Carthage",
  nameArabic: "معمل الرخام تونس قرطاج",
  founded: 1989,
  phone: "+216 29 081 822",
  email: "contact@marbrerietuniscarthage.com",
  address: "Zone Industrielle, Carthage",
  whatsapp: {
    number: "21629081822",
    prefilledMessage:
      "Bonjour, je souhaite obtenir des informations sur vos produits en marbre.",
  },
  social: {
    facebook: "#",
    instagram: "#",
    youtube: "#",
    linkedin: "#",
  },
  assets: {
    logo: "/logo.png",
    productsSectionBackground: "/0.jpg",
    configuratorBackground: "/00.jpg",
    // SWAP: Replace with final client YouTube video ID
    youtubeVideoId: "r5NAR0xMqTc",
    // SWAP: Replace with precise Google Maps embed URL for the factory
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3190.0!2d10.331!3d36.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDUxJzAwLjAiTiAxMMKwMTknNTEuNiJF!5e0!3m2!1sfr!2stn!4v1",
  },
};

export function getWhatsAppUrl(): string {
  const { number, prefilledMessage } = siteConfig.whatsapp;
  return `https://wa.me/${number}?text=${encodeURIComponent(prefilledMessage)}`;
}
