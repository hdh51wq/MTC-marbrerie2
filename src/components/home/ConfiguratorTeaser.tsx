"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import ConfiguratorPopup from "./ConfiguratorPopup";

export default function ConfiguratorTeaser() {
  const t = useTranslations("configurator");
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <>
    <section id="configurateur" className="relative overflow-hidden py-24 md:py-32">
      {/* SWAP: Replace background with final configurator promo image */}
      <Image
        src={siteConfig.assets.configuratorBackground}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center text-white lg:px-8">
        <h2 className="font-display text-3xl font-bold md:text-5xl">{t("title")}</h2>
        <p className="mt-6 text-lg leading-relaxed text-white/85">{t("description")}</p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="mt-10 inline-block">
          <button
            type="button"
            onClick={() => setPopupOpen(true)}
            className="inline-block rounded-full bg-brand-dark px-10 py-4 text-base font-bold text-white ring-2 ring-white/20 transition hover:bg-brand-orange hover:text-brand-dark"
          >
            {t("cta")}
          </button>
        </motion.div>
      </div>
    </section>

    <ConfiguratorPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </>
  );
}
