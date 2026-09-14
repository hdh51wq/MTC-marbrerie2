"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import gsap from "gsap";

const HERO_SLIDES = ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg"] as const;
const SLIDE_INTERVAL = 5000;

export default function Hero() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-animate", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="accueil"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        {HERO_SLIDES.map((src, index) => (
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
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-32 text-center text-white md:px-6">
        <h1 className="hero-animate font-display text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
          {t("title")}
        </h1>
        <p className="hero-animate mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
          {t("subtitle")}
        </p>
        <a
          href="#produits"
          className="hero-animate mt-10 inline-block rounded-full bg-brand-orange px-8 py-4 text-base font-bold text-brand-dark transition hover:bg-orange-400 hover:shadow-lg"
        >
          {t("cta")}
        </a>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <div className="h-10 w-6 rounded-full border-2 border-white/50 p-1">
          <div className="mx-auto h-2 w-1 rounded-full bg-white/80" />
        </div>
      </div>
    </section>
  );
}
