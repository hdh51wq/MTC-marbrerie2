import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/routing";
import { siteConfig } from "@/data/siteConfig";

const footerLinks = [
  { key: "usine", href: "/usine" },
  { key: "produits", href: "/produits" },
  { key: "configurateur", href: "/configurateur-3d" },
  { key: "projets", href: "/projets" },
  { key: "contact", href: "/contact" },
  { key: "catalogue", href: "/catalogue" },
] as const;

const socialItems = [
  { key: "facebook", href: siteConfig.social.facebook },
  { key: "instagram", href: siteConfig.social.instagram },
  { key: "youtube", href: siteConfig.social.youtube },
  { key: "linkedin", href: siteConfig.social.linkedin },
] as const;

export default async function Footer() {
  const tNav = await getTranslations("nav");
  const tFooter = await getTranslations("footer");
  const tSocial = await getTranslations("social");

  return (
    <footer className="bg-brand-dark text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        <div>
          <div className="mb-4 flex items-center gap-3">
            {/* SWAP: Replace with final logo variant if needed */}
            <Image
              src={siteConfig.assets.logo}
              alt={siteConfig.name}
              width={56}
              height={56}
              className="h-14 w-auto brightness-0 invert"
            />
            <div>
              <p className="flex flex-wrap items-baseline gap-x-2 font-display text-sm font-bold tracking-widest text-brand-orange">
                <span>MARBRERIE TUNIS CARTHAGE</span>
                <span className="text-[0.85em] font-semibold tracking-wide">
                  Since 1989
                </span>
              </p>
              <p className="font-arabic text-sm text-white/70" dir="rtl">
                {siteConfig.nameArabic}
              </p>
            </div>
          </div>
          <p className="mb-2 text-brand-orange">{tFooter("tagline")}</p>
          <p className="text-sm leading-relaxed text-white/70">{tFooter("blurb")}</p>
        </div>

        <div>
          <h3 className="mb-4 font-display text-lg font-bold text-brand-orange">
            {tFooter("usefulLinks")}
          </h3>
          <ul className="space-y-2">
            {footerLinks.map((link) => (
              <li key={link.key}>
                <Link
                  href={link.href}
                  className="text-sm text-white/80 transition hover:text-brand-orange"
                >
                  {tNav(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-lg font-bold text-brand-orange">
            {tFooter("contactUs")}
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-brand-orange">
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-brand-orange">
                {siteConfig.email}
              </a>
            </li>
            <li>{siteConfig.address}</li>
          </ul>
          <div className="mt-4 overflow-hidden rounded-lg">
            {/* SWAP: Replace embed URL with precise factory location */}
            <iframe
              src={siteConfig.assets.googleMapsEmbedUrl}
              title="Google Maps"
              className="h-40 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row lg:px-8">
          <div className="flex gap-4">
            {socialItems.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tSocial(key)}
                className="text-sm text-white/70 transition hover:text-brand-orange"
              >
                {tSocial(key)}
              </a>
            ))}
          </div>
          <p className="text-center text-xs text-white/50">
            {tFooter("copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
