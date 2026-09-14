import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import FadeInSection from "@/components/common/FadeInSection";
import LoadingScreen from "@/components/home/LoadingScreen";
import Hero from "@/components/home/Hero";
import VideoShowcase from "@/components/home/VideoShowcase";
import UsineShowcase from "@/components/home/UsineShowcase";
import ProductsPreview from "@/components/home/ProductsPreview";
import ConfiguratorTeaser from "@/components/home/ConfiguratorTeaser";
import ProjetsShowcase from "@/components/home/ProjetsShowcase";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <LoadingScreen />
      <Hero />
      <FadeInSection>
        <VideoShowcase />
      </FadeInSection>
      <FadeInSection>
        <UsineShowcase />
      </FadeInSection>
      <ProductsPreview />
      <FadeInSection>
        <ConfiguratorTeaser />
      </FadeInSection>
      <FadeInSection>
        <ProjetsShowcase />
      </FadeInSection>
    </>
  );
}
