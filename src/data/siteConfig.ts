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
    facebook: "https://www.facebook.com/people/Marbrerie-Tunis-Carthage/100064855083718/",
    instagram: "https://www.instagram.com/marbrerie_tunis_carthage/",
    youtube: "https://www.youtube.com/user/MTCarthage",
    linkedin: "https://www.linkedin.com/company/marbrerie-tunis-carthage",
  },
  // SWAP: Replace placeholder hours with client's confirmed opening hours
  hours: [
    {
      day: { fr: "Lundi – Vendredi", en: "Monday – Friday" },
      hours: { fr: "08h00 – 18h00", en: "08:00 AM – 06:00 PM" },
    },
    {
      day: { fr: "Samedi", en: "Saturday" },
      hours: { fr: "08h00 – 13h00", en: "08:00 AM – 01:00 PM" },
    },
    {
      day: { fr: "Dimanche", en: "Sunday" },
      hours: { fr: "Fermé", en: "Closed" },
    },
  ],
  hoursNote: {
    fr: "Lun-Ven : 8h-18h, Sam : 8h-13h — Horaires indicatifs à confirmer avec le client",
    en: "Mon-Fri: 8am-6pm, Sat: 8am-1pm — Indicative hours to be confirmed with the client",
  },
  assets: {
    logo: "/logo.png",
    productsSectionBackground: "/0.jpg",
    configuratorBackground: "/00.jpg",
    // SWAP: Replace with final client YouTube video ID
    youtubeVideoId: "r5NAR0xMqTc",
    // SWAP: Replace with precise Google Maps embed URL for the factory
    googleMapsEmbedUrl: "https://www.google.com/maps?cid=11615657281169841329&output=embed",
  },
};

export function getWhatsAppUrl(): string {
  const { number, prefilledMessage } = siteConfig.whatsapp;
  return `https://wa.me/${number}?text=${encodeURIComponent(prefilledMessage)}`;
}
