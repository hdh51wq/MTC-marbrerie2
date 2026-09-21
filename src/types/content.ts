export type Locale = "fr" | "en";

export type LocalizedText = { fr: string; en: string };

export function localized(text: LocalizedText, locale: Locale): string {
  return text[locale];
}

export interface BusinessHoursEntry {
  day: LocalizedText;
  hours: LocalizedText | string;
}

export interface SiteConfig {
  name: string;
  nameArabic: string;
  founded: number;
  phone: string;
  email: string;
  address: string;
  whatsapp: {
    number: string;
    prefilledMessage: string;
  };
  social: {
    facebook: string;
    instagram: string;
    youtube: string;
    linkedin: string;
  };
  hours: BusinessHoursEntry[];
  hoursNote?: LocalizedText;
  assets: {
    logo: string;
    productsSectionBackground: string;
    configuratorBackground: string;
    youtubeVideoId: string;
    googleMapsEmbedUrl: string;
  };
}

export interface Product {
  id: string;
  slug: string;
  image: string;
  images: string[];
  name: LocalizedText;
  tag: LocalizedText;
  category: LocalizedText;
  description: LocalizedText;
  finish: LocalizedText;
}

export interface TestimonialClient {
  id: string;
  name: string;
  logo: string;
}

export interface NavItem {
  key: string;
  href: string;
  isExternal?: boolean;
}
