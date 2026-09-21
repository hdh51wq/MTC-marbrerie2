"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import CatalogueIntro from "./CatalogueIntro";
import CatalogueViewer from "./CatalogueViewer";
import { BookOpen, Hand, Sparkles } from "lucide-react";

type CataloguePageContentProps = {
  pdfUrl?: string;
};

export default function CataloguePageContent({
  pdfUrl = "/catalogue.pdf",
}: CataloguePageContentProps) {
  const t = useTranslations("catalogue");
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  return (
    <>
      {/* Full-screen Glowing Intro Animation Overlay */}
      <CatalogueIntro onComplete={() => setIsIntroComplete(true)} />

      {/* Main Catalogue Page Layout */}
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Subtle top hint revealed with the flipbook */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: isIntroComplete ? 1 : 0,
            y: isIntroComplete ? 0 : -10,
          }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="flex justify-center mb-3 sm:mb-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-brand-orange/20 text-xs sm:text-sm text-neutral-600 shadow-xs backdrop-blur-xs select-none">
            <Hand className="w-3.5 h-3.5 text-brand-orange animate-pulse" />
            <span>{t("instructions")}</span>
          </div>
        </motion.div>

        {/* Flipbook Showcase: sized to occupy ~70% available width */}
        <motion.section
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{
            opacity: isIntroComplete ? 1 : 0,
            scale: isIntroComplete ? 1 : 0.98,
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-center items-center my-2 sm:my-4"
        >
          <CatalogueViewer pdfUrl={pdfUrl} />
        </motion.section>

        {/* Bottom Editorial Note / Features Footer */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{
            opacity: isIntroComplete ? 1 : 0,
            y: isIntroComplete ? 0 : 15,
          }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          className="mt-8 sm:mt-10 text-center max-w-xl mx-auto"
        >
          <div className="flex items-center justify-center gap-6 text-xs text-neutral-400">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-brand-orange/80" />
              Format interactif
            </span>
            <span className="w-1 h-1 rounded-full bg-neutral-300" />
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-orange/80" />
              Effets sonores & visuels
            </span>
          </div>
        </motion.div>
      </div>
    </>
  );
}
