import type { LocalizedText } from "@/types/content";

const lt = (fr: string, en: string): LocalizedText => ({ fr, en });

export interface UsineMachine {
  id: string;
  title: LocalizedText;
  category: LocalizedText;
  images: string[];
  description: LocalizedText;
}

// SWAP: Replace placeholder data with real factory/machine photos from client/CMS
export const usineMachines: UsineMachine[] = [
  {
    id: "1",
    title: lt("Machine de découpe CNC", "CNC Cutting Machine"),
    category: lt("Découpe", "Cutting"),
    images: [
      "/0.jpg",
      "/1.jpg",
      "https://placehold.co/800x600/2a2a2a/ef5d36?text=Machine+de+d%C3%A9coupe+CNC",
    ],
    description: lt(
      "Machine de découpe CNC — Lorem ipsum, à remplacer par le client. Pont numérique 5 axes pour la découpe précise de dalles et plans de travail en marbre et granit.",
      "CNC Cutting Machine — Placeholder to be replaced by the client. 5-axis CNC bridge for precise cutting of marble and granite slabs and countertops.",
    ),
  },
  {
    id: "2",
    title: lt("Zone de polissage", "Polishing Area"),
    category: lt("Polissage", "Polishing"),
    images: [
      "/2.jpg",
      "/3.jpg",
      "https://placehold.co/800x600/1a1a1a/ffffff?text=Zone+de+polissage",
    ],
    description: lt(
      "Zone de polissage — Lorem ipsum, à remplacer par le client. Atelier dédié au polissage et à l'adoucissage des surfaces, avec contrôle qualité à chaque étape.",
      "Polishing Area — Placeholder to be replaced by the client. Workshop dedicated to polishing and honing surfaces, with quality control at every step.",
    ),
  },
  {
    id: "3",
    title: lt("Scie à fil diamanté", "Diamond Wire Saw"),
    category: lt("Découpe", "Cutting"),
    images: [
      "/00.jpg",
      "/4.jpg",
      "https://placehold.co/800x600/333333/ef5d36?text=Scie+%C3%A0+fil+diamant%C3%A9",
    ],
    description: lt(
      "Scie à fil diamanté — Lorem ipsum, à remplacer par le client. Découpe de blocs bruts et dalles épaisses avec fil diamanté pour minimiser les pertes de matière.",
      "Diamond Wire Saw — Placeholder to be replaced by the client. Cuts raw blocks and thick slabs with diamond wire to minimize material waste.",
    ),
  },
  {
    id: "4",
    title: lt("Pont roulant", "Overhead Crane"),
    category: lt("Manutention", "Handling"),
    images: [
      "/1.jpg",
      "/0.jpg",
      "https://placehold.co/800x600/444444/ffffff?text=Pont+roulant",
    ],
    description: lt(
      "Pont roulant — Lorem ipsum, à remplacer par le client. Manutention sécurisée des blocs et dalles lourdes dans l'atelier de production.",
      "Overhead Crane — Placeholder to be replaced by the client. Safe handling of heavy blocks and slabs in the production workshop.",
    ),
  },
  {
    id: "5",
    title: lt("Polisseuse automatique", "Automatic Polishing Line"),
    category: lt("Polissage", "Polishing"),
    images: [
      "/3.jpg",
      "/2.jpg",
      "https://placehold.co/800x600/2d2d2d/ef5d36?text=Polisseuse+automatique",
    ],
    description: lt(
      "Polisseuse automatique — Lorem ipsum, à remplacer par le client. Ligne automatisée pour finitions poli brillant, adouci et brossé sur grandes surfaces.",
      "Automatic Polishing Line — Placeholder to be replaced by the client. Automated line for high-gloss, honed, and brushed finishes on large surfaces.",
    ),
  },
  {
    id: "6",
    title: lt("Atelier de finition", "Finishing Workshop"),
    category: lt("Atelier", "Workshop"),
    images: [
      "/4.jpg",
      "/00.jpg",
      "https://placehold.co/800x600/252525/ffffff?text=Atelier+de+finition",
    ],
    description: lt(
      "Atelier de finition — Lorem ipsum, à remplacer par le client. Finitions manuelles, chanfreins, bords arrondis et détails sur mesure par nos artisans.",
      "Finishing Workshop — Placeholder to be replaced by the client. Manual finishes, chamfers, rounded edges, and custom details by our craftspeople.",
    ),
  },
  {
    id: "7",
    title: lt("Zone de stockage", "Storage Area"),
    category: lt("Manutention", "Handling"),
    images: [
      "/0.jpg",
      "/2.jpg",
      "https://placehold.co/800x600/3d3d3d/ef5d36?text=Zone+de+stockage",
    ],
    description: lt(
      "Zone de stockage — Lorem ipsum, à remplacer par le client. Entrepôt couvert pour le stockage sécurisé des dalles, blocs et produits finis.",
      "Storage Area — Placeholder to be replaced by the client. Covered warehouse for secure storage of slabs, blocks, and finished products.",
    ),
  },
  {
    id: "8",
    title: lt("Bridge Saw", "Bridge Saw"),
    category: lt("Découpe", "Cutting"),
    images: [
      "/1.jpg",
      "/3.jpg",
      "https://placehold.co/800x600/1e1e1e/ffffff?text=Bridge+Saw",
    ],
    description: lt(
      "Bridge Saw — Lorem ipsum, à remplacer par le client. Scie à pont pour la découpe rapide et précise de dalles standard et formats sur mesure.",
      "Bridge Saw — Placeholder to be replaced by the client. Bridge saw for fast, precise cutting of standard slabs and custom formats.",
    ),
  },
  {
    id: "9",
    title: lt("Contrôle qualité", "Quality Control"),
    category: lt("Atelier", "Workshop"),
    images: [
      "/2.jpg",
      "/4.jpg",
      "https://placehold.co/800x600/2a2a2a/ef5d36?text=Contr%C3%B4le+qualit%C3%A9",
    ],
    description: lt(
      "Contrôle qualité — Lorem ipsum, à remplacer par le client. Inspection visuelle et dimensionnelle de chaque pièce avant expédition vers le chantier.",
      "Quality Control — Placeholder to be replaced by the client. Visual and dimensional inspection of every piece before shipment to the job site.",
    ),
  },
  {
    id: "10",
    title: lt("Atelier de sculpture", "Sculpture Workshop"),
    category: lt("Atelier", "Workshop"),
    images: [
      "/00.jpg",
      "/1.jpg",
      "https://placehold.co/800x600/4a6741/ffffff?text=Atelier+de+sculpture",
    ],
    description: lt(
      "Atelier de sculpture — Lorem ipsum, à remplacer par le client. Création de pièces décoratives, colonnes, moulures et éléments architecturaux sculptés.",
      "Sculpture Workshop — Placeholder to be replaced by the client. Creation of decorative pieces, columns, moldings, and sculpted architectural elements.",
    ),
  },
  {
    id: "11",
    title: lt("Ligne de traitement surface", "Surface Treatment Line"),
    category: lt("Polissage", "Polishing"),
    images: [
      "/3.jpg",
      "/0.jpg",
      "https://placehold.co/800x600/333333/ef5d36?text=Traitement+surface",
    ],
    description: lt(
      "Ligne de traitement surface — Lorem ipsum, à remplacer par le client. Traitements hydrofuges, antitaches et protection des surfaces polies.",
      "Surface Treatment Line — Placeholder to be replaced by the client. Water-repellent, stain-resistant treatments and protection for polished surfaces.",
    ),
  },
  {
    id: "12",
    title: lt("Hall de production", "Production Hall"),
    category: lt("Atelier", "Workshop"),
    images: [
      "/4.jpg",
      "/2.jpg",
      "https://placehold.co/800x600/444444/ffffff?text=Hall+de+production",
    ],
    description: lt(
      "Hall de production — Lorem ipsum, à remplacer par le client. Vue d'ensemble de l'usine : découpe, polissage et expédition sous un même toit depuis 1989.",
      "Production Hall — Placeholder to be replaced by the client. Overview of the factory: cutting, polishing, and shipping under one roof since 1989.",
    ),
  },
];
