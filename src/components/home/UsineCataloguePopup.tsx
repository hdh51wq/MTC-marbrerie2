"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { usineMachines } from "@/data/usine";
import type { UsineMachine } from "@/data/usine";
import type { Locale } from "@/types/content";
import { localized } from "@/types/content";

const POPUP_TRANSITION = { duration: 0.28, ease: [0.4, 0, 0.2, 1] as const };
const LAYOUT_TRANSITION = { layout: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const } };

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function ChevronUpIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}

function ImageCarousel({
  images,
  alt,
  expanded,
}: {
  images: string[];
  alt: string;
  expanded: boolean;
}) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!expanded) setIndex(0);
  }, [expanded]);

  const hasMultiple = images.length > 1;
  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);
  const next = useCallback(() => {
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || !hasMultiple) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      if (delta > 0) prev();
      else next();
    }
    touchStartX.current = null;
  };

  return (
    <div
      className={`relative overflow-hidden bg-brand-dark/5 ${
        expanded ? "aspect-[4/3] md:aspect-[16/10]" : "aspect-[3/4]"
      }`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.img
          key={`${alt}-${index}`}
          src={images[index]}
          alt={alt}
          className="h-full w-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      </AnimatePresence>

      {hasMultiple && expanded ? (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-2 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
            aria-label="Previous image"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
            aria-label="Next image"
          >
            <ChevronRightIcon />
          </button>
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-4 bg-brand-orange" : "w-1.5 bg-white/70"
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

function CatalogueCard({
  machine,
  expanded,
  onToggle,
}: {
  machine: UsineMachine;
  expanded: boolean;
  onToggle: () => void;
}) {
  const locale = useLocale() as Locale;
  const title = localized(machine.title, locale);
  const category = localized(machine.category, locale);
  const description = localized(machine.description, locale);

  return (
    <motion.article
      layout
      transition={LAYOUT_TRANSITION}
      className={`relative overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow ${
        expanded
          ? "z-10 col-span-1 row-span-1 shadow-[0_12px_40px_rgba(0,0,0,0.15)] md:col-span-2 lg:col-span-2 lg:row-span-2"
          : "cursor-pointer hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
      }`}
      onClick={() => {
        if (!expanded) onToggle();
      }}
    >
      <ImageCarousel images={machine.images} alt={title} expanded={expanded} />

      <div className={`p-4 ${expanded ? "md:p-6" : ""}`}>
        <div className="mb-2 inline-block rounded-full bg-brand-orange px-3 py-0.5 font-serif text-xs text-white">
          {category}
        </div>

        <h3
          className={`font-display font-bold text-brand-dark ${
            expanded ? "mb-3 text-xl md:text-2xl" : "mb-1 text-base md:text-lg"
          }`}
        >
          {title}
        </h3>

        {!expanded ? (
          <p className="line-clamp-2 font-serif text-sm text-text-muted">{description}</p>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.1 }}
          >
            <p className="font-serif text-sm leading-relaxed text-text-muted md:text-base">
              {description}
            </p>
          </motion.div>
        )}
      </div>

      {expanded ? (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className="absolute right-3 top-3 flex items-center justify-center rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
          aria-label="Collapse"
        >
          <ChevronUpIcon />
        </button>
      ) : null}
    </motion.article>
  );
}

export default function UsineCataloguePopup({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("usine");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleClose = useCallback(() => {
    setExpandedId(null);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) {
      setExpandedId(null);
      return;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, handleClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="usine-catalogue-popup-title"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-md sm:p-4 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={POPUP_TRANSITION}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <motion.div
            className="flex max-h-[92vh] w-full max-w-7xl flex-col overflow-hidden rounded-2xl bg-brand-light shadow-2xl md:rounded-3xl"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={POPUP_TRANSITION}
            onClick={(e) => e.stopPropagation()}
          >
            <header className="relative shrink-0 border-b border-black/5 px-5 py-5 text-center md:px-8 md:py-6">
              <button
                type="button"
                onClick={handleClose}
                className="absolute right-4 top-4 flex items-center justify-center rounded-full bg-brand-dark/10 p-2 text-brand-dark transition hover:bg-brand-dark hover:text-white md:right-6 md:top-6"
                aria-label="Close"
              >
                <CloseIcon />
              </button>
              <h2
                id="usine-catalogue-popup-title"
                className="font-display text-2xl font-bold text-brand-dark md:text-4xl"
              >
                {t("title")}
              </h2>
              <p className="mt-2 font-serif text-sm text-text-muted md:text-base">
                {t("description")}
              </p>
            </header>

            <div className="flex-1 overflow-y-auto px-4 py-5 md:px-8 md:py-6">
              <LayoutGroup>
                <div className="grid auto-rows-auto grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4 lg:gap-6">
                  {usineMachines.map((machine) => (
                    <CatalogueCard
                      key={machine.id}
                      machine={machine}
                      expanded={expandedId === machine.id}
                      onToggle={() =>
                        setExpandedId((prev) => (prev === machine.id ? null : machine.id))
                      }
                    />
                  ))}
                </div>
              </LayoutGroup>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
