import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { MapPin, Phone, Mail, ArrowUpRight, MessageCircle } from "lucide-react";
import { siteConfig, getWhatsAppUrl } from "@/data/siteConfig";

type CoordonneesSectionProps = {
  locale: string;
};

export default async function CoordonneesSection({
  locale,
}: CoordonneesSectionProps) {
  const t = await getTranslations({ locale, namespace: "apropos.coordonnees" });
  const whatsappUrl = getWhatsAppUrl();

  return (
    <section
      id="coordonnees"
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
      aria-label={t("title")}
    >
      <div className="relative rounded-3xl bg-white border border-black/[0.06] shadow-[0_8px_40px_-10px_rgba(0,0,0,0.03)] p-8 sm:p-12 md:p-16 text-center">
        {/* Kicker label */}
        <span className="block text-xs font-semibold uppercase tracking-[0.28em] text-brand-orange mb-3">
          {t("kicker")}
        </span>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-brand-dark tracking-tight max-w-2xl mx-auto mb-6">
          {t("title")}
        </h2>

        {/* Lead paragraph */}
        <p className="text-neutral-600 font-light text-base sm:text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
          {t("description")}
        </p>

        {/* 3 Contact Detail Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-3xl mx-auto mb-12 text-left">
          {/* Address */}
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-neutral-50/60 border border-black/[0.04]">
            <div className="w-10 h-10 rounded-xl bg-white border border-black/[0.06] flex items-center justify-center text-brand-orange shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[11px] uppercase tracking-widest text-neutral-400 font-medium mb-1">
                {t("addressLabel")}
              </span>
              <p className="text-sm font-medium text-brand-dark leading-snug">
                {siteConfig.address}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-neutral-50/60 border border-black/[0.04]">
            <div className="w-10 h-10 rounded-xl bg-white border border-black/[0.06] flex items-center justify-center text-brand-orange shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[11px] uppercase tracking-widest text-neutral-400 font-medium mb-1">
                {t("phoneLabel")}
              </span>
              <a
                href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                className="text-sm font-medium text-brand-dark hover:text-brand-orange transition-colors leading-snug"
              >
                {siteConfig.phone}
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-neutral-50/60 border border-black/[0.04]">
            <div className="w-10 h-10 rounded-xl bg-white border border-black/[0.06] flex items-center justify-center text-brand-orange shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[11px] uppercase tracking-widest text-neutral-400 font-medium mb-1">
                {t("emailLabel")}
              </span>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm font-medium text-brand-dark hover:text-brand-orange transition-colors leading-snug break-all"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand-dark text-white text-xs sm:text-sm uppercase tracking-[0.2em] font-medium hover:bg-brand-orange transition-colors duration-300 shadow-xs"
          >
            <span>{t("ctaContact")}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white border border-black/[0.1] text-brand-dark text-xs sm:text-sm uppercase tracking-[0.2em] font-medium hover:border-brand-orange hover:text-brand-orange hover:bg-neutral-50 transition-all duration-300"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>{t("ctaWhatsApp")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
