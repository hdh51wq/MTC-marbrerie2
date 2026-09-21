import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { UserCheck } from "lucide-react";
import { equipeMembers, type TeamMember } from "@/data/equipe";
import { localized, type Locale } from "@/types/content";

type EquipeSectionProps = {
  locale: string;
};

export default async function EquipeSection({ locale }: EquipeSectionProps) {
  const t = await getTranslations({ locale, namespace: "apropos.equipe" });
  const currentLocale = (locale === "en" ? "en" : "fr") as Locale;

  return (
    <section
      id="equipe"
      className="py-16 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-label={t("title")}
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
        <span className="block text-xs font-semibold uppercase tracking-[0.28em] text-brand-orange mb-3">
          {t("kicker")}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-brand-dark tracking-tight">
          {t("title")}
        </h2>
      </div>

      {/* Team Member Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
        {equipeMembers.map((member: TeamMember) => {
          return (
            <div
              key={member.id}
              className="group flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl bg-white border border-black/[0.05] shadow-[0_2px_20px_-4px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-black/[0.12] hover:shadow-[0_10px_35px_-8px_rgba(0,0,0,0.06)]"
            >
              {/* Refined Portrait / Headshot */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-6 bg-gradient-to-tr from-neutral-100 via-stone-50 to-neutral-200 border-2 border-white shadow-md flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 112px, 128px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-brand-orange/[0.03] group-hover:bg-brand-orange/[0.08] transition-colors duration-300" />
                    <span className="font-serif text-3xl sm:text-4xl font-light text-brand-dark/70 tracking-wider">
                      {member.initials}
                    </span>
                  </>
                )}
                <div className="absolute bottom-1 right-1 p-1.5 rounded-full bg-white shadow-xs border border-black/[0.06] text-brand-orange z-10">
                  <UserCheck className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Member Details */}
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-brand-dark mb-1">
                {member.name}
              </h3>

              <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-brand-orange font-semibold mb-3">
                {localized(member.role, currentLocale)}
              </p>

              <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed">
                {localized(member.bio, currentLocale)}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
