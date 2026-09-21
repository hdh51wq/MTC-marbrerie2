"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@/lib/i18n/routing";
import { siteConfig } from "@/data/siteConfig";
import LanguageSwitcher from "./LanguageSwitcher";

const navItems = [
  { key: "accueil", href: "/" },
  { key: "apropos", href: "/a-propos" },
  { key: "usine", href: "#usine" },
  { key: "produits", href: "#produits" },
  { key: "configurateur", href: "#configurateur" },
  { key: "projets", href: "#projets" },
  { key: "devis", href: "/devis" },
  { key: "contact", href: "/contact" },
] as const;

const blackAtTopRoutes = ["/devis", "/contact", "/a-propos", "/catalogue"];

export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const isHomePage =
    !pathname ||
    pathname === "/" ||
    pathname === "/fr" ||
    pathname === "/en" ||
    pathname === "/fr/" ||
    pathname === "/en/";
  const isCataloguePage = Boolean(
    pathname &&
      (pathname === "/catalogue" ||
        pathname.endsWith("/catalogue") ||
        pathname.endsWith("/catalogue/")),
  );
  const useBlackAtTop = Boolean(
    pathname &&
      blackAtTopRoutes.some(
        (route) =>
          pathname === route ||
          pathname.endsWith(route) ||
          pathname.endsWith(`${route}/`),
      ),
  );
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinkClass =
    scrolled || useBlackAtTop
      ? "text-brand-dark/80 hover:text-brand-orange"
      : "text-white/90 hover:text-brand-orange";

  const brandTextColor =
    scrolled || useBlackAtTop ? "text-black" : "text-brand-orange";

  if (isCataloguePage) {
    return (
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 shadow-md backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6 lg:px-8">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <Image
              src={siteConfig.assets.logo}
              alt={siteConfig.name}
              width={48}
              height={48}
              className={`h-10 w-auto shrink-0 md:h-12 ${scrolled || useBlackAtTop ? "" : "brightness-0 invert"}`}
              priority
            />
            <div className="min-w-0">
              <p
                className={`flex min-w-0 flex-wrap items-baseline gap-x-2 font-display text-xs font-bold tracking-widest transition-colors md:text-sm ${brandTextColor}`}
              >
                <span className="truncate">MARBRERIE TUNIS CARTHAGE</span>
                <span className="shrink-0 text-[0.7em] font-semibold tracking-wide">
                  Since 1989
                </span>
              </p>
              <p
                className={`truncate font-arabic text-xs transition-colors md:text-sm ${brandTextColor}`}
                dir="rtl"
              >
                {siteConfig.nameArabic}
              </p>
            </div>
          </Link>
        </div>
      </header>
    );
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 shadow-md backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6 lg:px-8">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <Image
              src={siteConfig.assets.logo}
              alt={siteConfig.name}
              width={48}
              height={48}
              className={`h-10 w-auto shrink-0 md:h-12 ${scrolled || useBlackAtTop ? "" : "brightness-0 invert"}`}
              priority
            />
            <div className="hidden min-w-0 sm:block">
              <p
                className={`flex min-w-0 flex-wrap items-baseline gap-x-2 font-display text-xs font-bold tracking-widest transition-colors md:text-sm ${brandTextColor}`}
              >
                <span className="truncate">MARBRERIE TUNIS CARTHAGE</span>
                <span className="shrink-0 text-[0.7em] font-semibold tracking-wide">
                  Since 1989
                </span>
              </p>
              <p
                className={`truncate font-arabic text-xs transition-colors md:text-sm ${brandTextColor}`}
                dir="rtl"
              >
                {siteConfig.nameArabic}
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-5 xl:flex" aria-label="Main">
            {navItems.map((item) =>
              item.href.startsWith("#") ? (
                isHomePage ? (
                  <a
                    key={item.key}
                    href={item.href}
                    className={`text-sm font-semibold transition-colors ${navLinkClass}`}
                  >
                    {t(item.key)}
                  </a>
                ) : (
                  <Link
                    key={item.key}
                    href={`/${item.href}`}
                    className={`text-sm font-semibold transition-colors ${navLinkClass}`}
                  >
                    {t(item.key)}
                  </Link>
                )
              ) : (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`text-sm font-semibold transition-colors ${navLinkClass}`}
                >
                  {t(item.key)}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href="/catalogue"
              className="hidden rounded-full bg-brand-orange px-4 py-2 text-sm font-bold text-brand-dark transition hover:bg-orange-400 md:inline-block"
            >
              {t("catalogue")}
            </Link>
            <button
              type="button"
              className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 xl:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? t("menuClose") : t("menuOpen")}
              aria-expanded={mobileOpen}
            >
              <span
                className={`block h-0.5 w-6 transition-all ${scrolled || mobileOpen || useBlackAtTop ? "bg-brand-dark" : "bg-white"} ${mobileOpen ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 transition-all ${scrolled || mobileOpen || useBlackAtTop ? "bg-brand-dark" : "bg-white"} ${mobileOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 transition-all ${scrolled || mobileOpen || useBlackAtTop ? "bg-brand-dark" : "bg-white"} ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 xl:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 right-0 z-40 flex w-[min(100%,20rem)] flex-col bg-brand-dark p-6 pt-20 xl:hidden"
              aria-label="Mobile"
            >
              {navItems.map((item, i) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {item.href.startsWith("#") ? (
                    isHomePage ? (
                      <a
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block border-b border-white/10 py-4 text-lg text-white hover:text-brand-orange"
                      >
                        {t(item.key)}
                      </a>
                    ) : (
                      <Link
                        href={`/${item.href}`}
                        onClick={() => setMobileOpen(false)}
                        className="block border-b border-white/10 py-4 text-lg text-white hover:text-brand-orange"
                      >
                        {t(item.key)}
                      </Link>
                    )
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block border-b border-white/10 py-4 text-lg text-white hover:text-brand-orange"
                    >
                      {t(item.key)}
                    </Link>
                  )}
                </motion.div>
              ))}
              <Link
                href="/catalogue"
                onClick={() => setMobileOpen(false)}
                className="mt-6 rounded-full bg-brand-orange px-6 py-3 text-center font-bold text-brand-dark"
              >
                {t("catalogue")}
              </Link>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
