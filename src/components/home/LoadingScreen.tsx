"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { siteConfig } from "@/data/siteConfig";

const SESSION_KEY = "mtc-loading-shown";

export default function LoadingScreen() {
  const t = useTranslations("loading");
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(SESSION_KEY);
    if (alreadyShown) return;

    setShow(true);
    sessionStorage.setItem(SESSION_KEY, "true");

    const counter = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => setShow(false),
        });
      },
    });

    tl.to(counter, {
      value: 100,
      duration: 2.2,
      ease: "power1.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = `${Math.round(counter.value)}%`;
        }
      },
    });

    return () => {
      tl.kill();
    };
  }, []);

  if (!show) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-brand-dark to-brand-dark-alt"
      role="status"
      aria-live="polite"
      aria-label={t("text")}
    >
      <div className="max-w-sm px-8 text-center text-white">
        <div className="mb-8 animate-pulse">
          {/* SWAP: Replace with final loading animation / logo treatment */}
          <Image
            src={siteConfig.assets.logo}
            alt={siteConfig.name}
            width={80}
            height={80}
            className="mx-auto h-20 w-auto brightness-0 invert"
            priority
          />
        </div>
        <div className="mx-auto mb-6 h-14 w-14 animate-spin rounded-full border-[3px] border-white/30 border-t-brand-orange" />
        <p className="mb-6 text-lg tracking-wide">{t("text")}</p>
        <div className="mx-auto h-1 max-w-xs overflow-hidden rounded-full bg-white/20">
          <div className="h-full w-full origin-left scale-x-0 animate-[loading-bar_2.2s_ease-in-out_forwards] bg-brand-orange" />
        </div>
        <span ref={counterRef} className="mt-3 block text-sm text-white/70">
          0%
        </span>
      </div>
    </div>
  );
}
