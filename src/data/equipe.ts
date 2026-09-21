import type { LocalizedText } from "@/types/content";

const lt = (fr: string, en: string): LocalizedText => ({ fr, en });

export interface TeamMember {
  id: string;
  name: string;
  role: LocalizedText;
  bio: LocalizedText;
  image?: string;
  initials: string;
}

// SWAP: Replace placeholder team members with actual leadership and artisan profiles
export const equipeMembers: TeamMember[] = [
  {
    id: "direction-generale",
    name: "Direction Générale",
    role: lt("Direction & Vision Stratégique", "Executive Leadership & Strategy"),
    bio: lt(
      "Garant de la vision d'excellence et du développement pérenne de la marbrerie depuis plus de 30 ans. — Profil à remplacer par le client.",
      "Guiding the vision of excellence and sustainable development of the company for over 30 years. — Profile to be replaced by the client."
    ),
    initials: "DG",
    // SWAP: temporary stock photo, replace with real client photo
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "chef-atelier",
    name: "Maître Artisan & Chef d'Atelier",
    role: lt("Supervision de la Production", "Production & Workshop Supervision"),
    bio: lt(
      "Expert en stéréotomie et taille de pierre, orchestrant le travail minutieux de nos artisans tailleurs. — Profil à remplacer par le client.",
      "Expert in stereotomy and stonecutting, orchestrating the meticulous work of our artisan stonecutters. — Profile to be replaced by the client."
    ),
    initials: "CA",
    // SWAP: temporary stock photo, replace with real client photo
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "bureau-etudes",
    name: "Responsable Bureau d'Études",
    role: lt("Conception Technique & Modélisation 3D", "Technical Design & 3D Modeling"),
    bio: lt(
      "Ingénieur spécialisé dans la modélisation numérique, le calepinage sur mesure et l'optimisation des débits. — Profil à remplacer par le client.",
      "Engineer specialized in CAD modeling, bespoke stone layout scheduling, and slab yield optimization. — Profile to be replaced by the client."
    ),
    initials: "BE",
    // SWAP: temporary stock photo, replace with real client photo
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "qualite-finitions",
    name: "Responsable Qualité & Finitions",
    role: lt("Contrôle Qualité & Traitement de Surface", "Quality Control & Surface Treatments"),
    bio: lt(
      "Veille à l'intégrité de chaque tranche, de la sélection des blocs au polissage final avant expédition. — Profil à remplacer par le client.",
      "Ensures the integrity of every slab, from quarry block inspection to the final inspection before dispatch. — Profile to be replaced by the client."
    ),
    initials: "RQ",
    // SWAP: temporary stock photo, replace with real client photo
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
  },
];
