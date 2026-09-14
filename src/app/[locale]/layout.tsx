import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import FloatingSocialBar from "@/components/layout/FloatingSocialBar";
import Footer from "@/components/layout/Footer";
import { routing } from "@/lib/i18n/routing";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "fr" | "en")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Navbar />
      <main>{children}</main>
      <FloatingSocialBar />
      <Footer />
    </NextIntlClientProvider>
  );
}
