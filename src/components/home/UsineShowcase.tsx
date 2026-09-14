"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import UsineCataloguePopup from "./UsineCataloguePopup";

gsap.registerPlugin(ScrollTrigger);

const USINE_SLIDES = ["/0.jpg", "/00.jpg", "/1.jpg", "/2.jpg"] as const;
const SLIDE_INTERVAL = 5000;

export default function UsineShowcase() {
  const t = useTranslations("usine");
  const sectionRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [catalogueOpen, setCatalogueOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % USINE_SLIDES.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".usine-animate", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
    <section id="usine" ref={sectionRef} className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div className="usine-animate relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
            {USINE_SLIDES.map((src, index) => (
              <div
                key={src}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <div className="usine-animate flex flex-col justify-center">
            <h2 className="font-display text-3xl font-bold text-brand-dark md:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-text-muted md:mt-6">
              {t("description")}
            </p>
            <button
              type="button"
              onClick={() => setCatalogueOpen(true)}
              className="mt-8 inline-block w-fit rounded-full bg-brand-orange px-8 py-4 text-base font-bold text-brand-dark transition hover:bg-orange-400 hover:shadow-lg"
            >
              {t("cta")}
            </button>
          </div>
        </div>
      </div>
    </section>

    <UsineCataloguePopup open={catalogueOpen} onClose={() => setCatalogueOpen(false)} />
    </>
  );
}
