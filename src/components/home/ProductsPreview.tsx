"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import FadeInSection from "@/components/common/FadeInSection";
import { siteConfig } from "@/data/siteConfig";
import ProductsCataloguePopup from "./ProductsCataloguePopup";

export default function ProductsPreview() {
  const t = useTranslations("products");
  const [catalogueOpen, setCatalogueOpen] = useState(false);
  const bgUrl = siteConfig.assets.productsSectionBackground;

  return (
    <>
      <FadeInSection>
      <section
        id="produits"
        className="relative overflow-hidden py-24 max-md:py-16 max-[480px]:py-12"
      >
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center bg-scroll md:bg-fixed"
          style={{ backgroundImage: `url(${bgUrl})` }}
          aria-hidden
        />

        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.7) 100%)",
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center lg:px-8">
          <h2
            className="mb-6 font-display text-5xl font-bold text-white max-md:text-4xl max-[480px]:text-3xl"
            style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.3)" }}
          >
            {t("title")}
          </h2>
          <p
            className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-white max-md:mb-8 max-md:text-base max-[480px]:mb-8 max-[480px]:text-[0.9rem] md:mb-12"
            style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)" }}
          >
            {t("description")}
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="mt-10 inline-block">
            <button
              type="button"
              onClick={() => setCatalogueOpen(true)}
              className="inline-block rounded-full bg-brand-dark px-10 py-4 text-base font-bold text-white ring-2 ring-white/20 transition hover:bg-brand-orange hover:text-brand-dark"
            >
              {t("viewAll")}
            </button>
          </motion.div>
        </div>
      </section>
      </FadeInSection>

      <ProductsCataloguePopup open={catalogueOpen} onClose={() => setCatalogueOpen(false)} />
    </>
  );
}
