import { setRequestLocale } from "next-intl/server";
import ComingSoon from "@/components/common/ComingSoon";

type Props = { params: Promise<{ locale: string }> };

export default async function AProposPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ComingSoon />;
}
