"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import ProjetsCataloguePopup from "./ProjetsCataloguePopup";

export default function ProjetsShowcase() {
  const t = useTranslations("projets");
  const [catalogueOpen, setCatalogueOpen] = useState(false);

  return (
    <>
    <section id="projets" className="relative overflow-hidden py-24 md:py-32">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-scroll md:bg-fixed"
        style={{ backgroundImage: "url(/3.jpg)" }}
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 bg-black/65" aria-hidden />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center text-white lg:px-8">
        <h2 className="font-display text-3xl font-bold md:text-5xl">{t("title")}</h2>
        <p className="mt-6 text-lg leading-relaxed text-white/85">{t("description")}</p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="mt-10 inline-block">
          <button
            type="button"
            onClick={() => setCatalogueOpen(true)}
            className="inline-block rounded-full bg-brand-dark px-10 py-4 text-base font-bold text-white ring-2 ring-white/20 transition hover:bg-brand-orange hover:text-brand-dark"
          >
            {t("cta")}
          </button>
        </motion.div>
      </div>
    </section>

    <ProjetsCataloguePopup open={catalogueOpen} onClose={() => setCatalogueOpen(false)} />
    </>
  );
}
