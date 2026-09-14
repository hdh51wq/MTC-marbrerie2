import type { LocalizedText } from "@/types/content";

const lt = (fr: string, en: string): LocalizedText => ({ fr, en });

export interface Project {
  id: string;
  title: LocalizedText;
  category: LocalizedText;
  images: string[];
  description: LocalizedText;
}

// SWAP: Replace placeholder data with real project portfolio from client/CMS
export const projects: Project[] = [
  {
    id: "1",
    title: lt("Villa Les Palmiers", "Villa Les Palmiers"),
    category: lt("Résidentiel", "Residential"),
    images: [
      "/1.jpg",
      "/0.jpg",
      "https://placehold.co/800x600/2a2a2a/ef5d36?text=Projet+R%C3%A9sidentiel+%E2%80%94+Salon",
    ],
    description: lt(
      "Projet Résidentiel — Lorem ipsum, à remplacer par le client. Villa contemporaine à Gammarth avec revêtements en marbre blanc Carrare, escaliers suspendus et salle de bain spa entièrement habillée en pierre naturelle.",
      "Residential Project — Placeholder to be replaced by the client. Contemporary villa in Gammarth with Carrara white marble cladding, floating stairs, and a spa bathroom fully dressed in natural stone.",
    ),
  },
  {
    id: "2",
    title: lt("Résidence Azur", "Résidence Azur"),
    category: lt("Résidentiel", "Residential"),
    images: [
      "/2.jpg",
      "/3.jpg",
      "https://placehold.co/800x600/1a1a1a/ffffff?text=Projet+R%C3%A9sidentiel+%E2%80%94+Cuisine",
    ],
    description: lt(
      "Projet Résidentiel — Lorem ipsum, à remplacer par le client. Appartement de standing à La Marsa : plans de travail en granit noir, sols en travertin beige et murs d'accent en marbre Marquina.",
      "Residential Project — Placeholder to be replaced by the client. Premium apartment in La Marsa: black granite countertops, beige travertine floors, and Marquina marble accent walls.",
    ),
  },
  {
    id: "3",
    title: lt("Maison d'Architecte Sidi Bou Saïd", "Architect's House Sidi Bou Said"),
    category: lt("Résidentiel", "Residential"),
    images: [
      "/3.jpg",
      "/4.jpg",
      "https://placehold.co/800x600/3d3d3d/ef5d36?text=Projet+R%C3%A9sidentiel+%E2%80%94+Terrasse",
    ],
    description: lt(
      "Projet Résidentiel — Lorem ipsum, à remplacer par le client. Rénovation complète d'une maison traditionnelle avec terrasses en pierre locale, piscine habillée en travertin et cheminées en marbre poli.",
      "Residential Project — Placeholder to be replaced by the client. Full renovation of a traditional home with local stone terraces, travertine pool cladding, and polished marble fireplaces.",
    ),
  },
  {
    id: "4",
    title: lt("Penthouse Carthage", "Penthouse Carthage"),
    category: lt("Résidentiel", "Residential"),
    images: [
      "/4.jpg",
      "/00.jpg",
      "https://placehold.co/800x600/252525/ffffff?text=Projet+R%C3%A9sidentiel+%E2%80%94+Suite",
    ],
    description: lt(
      "Projet Résidentiel — Lorem ipsum, à remplacer par le client. Penthouse avec vue mer : sols en marbre Calacatta, cloisons en onyx rétro-éclairé et salle de bain master en marbre vert Alpi.",
      "Residential Project — Placeholder to be replaced by the client. Sea-view penthouse: Calacatta marble floors, backlit onyx partitions, and master bath in Verde Alpi marble.",
    ),
  },
  {
    id: "5",
    title: lt("Villa Méditerranée Hammamet", "Mediterranean Villa Hammamet"),
    category: lt("Résidentiel", "Residential"),
    images: [
      "/0.jpg",
      "/1.jpg",
      "https://placehold.co/800x600/2e4a3e/ffffff?text=Projet+R%C3%A9sidentiel+%E2%80%94+Piscine",
    ],
    description: lt(
      "Projet Résidentiel — Lorem ipsum, à remplacer par le client. Villa balnéaire avec plage de marbre autour de la piscine, pergola en pierre de Tunisie et aménagement paysager minéral.",
      "Residential Project — Placeholder to be replaced by the client. Coastal villa with marble pool deck, Tunisian stone pergola, and mineral landscape design.",
    ),
  },
  {
    id: "6",
    title: lt("Siège Attijari Bank", "Attijari Bank Headquarters"),
    category: lt("Commercial", "Commercial"),
    images: [
      "/00.jpg",
      "/2.jpg",
      "https://placehold.co/800x600/1a1a1a/ef5d36?text=Projet+Commercial+%E2%80%94+Hall",
    ],
    description: lt(
      "Projet Commercial — Lorem ipsum, à remplacer par le client. Hall d'accueil et espaces de réunion d'un siège bancaire : sols en marbre noir Marquina, comptoirs en granit poli et murs en travertin silver.",
      "Commercial Project — Placeholder to be replaced by the client. Reception and meeting areas at a bank headquarters: Marquina black marble floors, polished granite counters, and silver travertine walls.",
    ),
  },
  {
    id: "7",
    title: lt("Agence BIAT Tunis", "BIAT Agency Tunis"),
    category: lt("Commercial", "Commercial"),
    images: [
      "/1.jpg",
      "/2.jpg",
      "https://placehold.co/800x600/333333/ffffff?text=Projet+Commercial+%E2%80%94+Accueil",
    ],
    description: lt(
      "Projet Commercial — Lorem ipsum, à remplacer par le client. Réaménagement d'agences bancaires : guichets en marbre blanc, sols antidérapants en granit et signalétique intégrée en pierre naturelle.",
      "Commercial Project — Placeholder to be replaced by the client. Bank branch refurbishment: white marble counters, slip-resistant granite floors, and integrated natural stone signage.",
    ),
  },
  {
    id: "8",
    title: lt("Centre UIB Lac 1", "UIB Center Lac 1"),
    category: lt("Commercial", "Commercial"),
    images: [
      "/2.jpg",
      "/3.jpg",
      "https://placehold.co/800x600/444444/ef5d36?text=Projet+Commercial+%E2%80%94+Open+Space",
    ],
    description: lt(
      "Projet Commercial — Lorem ipsum, à remplacer par le client. Open space et salles de conseil : revêtements muraux en marbre rose Portugal, sols en quartzite Taj Mahal et cloisons vitrées avec socles en pierre.",
      "Commercial Project — Placeholder to be replaced by the client. Open plan and meeting rooms: Rosa Portugal marble wall cladding, Taj Mahal quartzite floors, and glass partitions with stone bases.",
    ),
  },
  {
    id: "9",
    title: lt("Showroom Marbre & Design", "Marble & Design Showroom"),
    category: lt("Commercial", "Commercial"),
    images: [
      "/3.jpg",
      "/4.jpg",
      "https://placehold.co/800x600/2d2d2d/ffffff?text=Projet+Commercial+%E2%80%94+Exposition",
    ],
    description: lt(
      "Projet Commercial — Lorem ipsum, à remplacer par le client. Showroom d'exposition avec murs modulables en dalles de marbre, présentoirs sur mesure et éclairage mettant en valeur les veines naturelles.",
      "Commercial Project — Placeholder to be replaced by the client. Exhibition showroom with modular marble slab walls, custom displays, and lighting that highlights natural veining.",
    ),
  },
  {
    id: "10",
    title: lt("Banque de Tunisie — Rénovation", "Bank of Tunisia — Renovation"),
    category: lt("Commercial", "Commercial"),
    images: [
      "/4.jpg",
      "/0.jpg",
      "https://placehold.co/800x600/1e1e1e/ef5d36?text=Projet+Commercial+%E2%80%94+Fa%C3%A7ade",
    ],
    description: lt(
      "Projet Commercial — Lorem ipsum, à remplacer par le client. Rénovation de façades et halls : habillage en pierre de Tunisie, escaliers monumentaux en marbre Botticino et finitions haute résistance pour flux intensifs.",
      "Commercial Project — Placeholder to be replaced by the client. Façade and lobby renovation: Tunisian stone cladding, monumental Botticino marble stairs, and heavy-traffic durable finishes.",
    ),
  },
  {
    id: "11",
    title: lt("Hôtel Mövenpick Sousse", "Mövenpick Hotel Sousse"),
    category: lt("Hôtellerie", "Hospitality"),
    images: [
      "/0.jpg",
      "/00.jpg",
      "https://placehold.co/800x600/4a6741/ffffff?text=Projet+H%C3%B4tellerie+%E2%80%94+Lobby",
    ],
    description: lt(
      "Projet Hôtellerie — Lorem ipsum, à remplacer par le client. Lobby et espaces communs : sols en travertin beige, colonnes en marbre émeraude et bar central en onyx honey rétro-éclairé.",
      "Hospitality Project — Placeholder to be replaced by the client. Lobby and common areas: beige travertine floors, emerald marble columns, and a backlit honey onyx central bar.",
    ),
  },
  {
    id: "12",
    title: lt("Resort Djerba Palace", "Djerba Palace Resort"),
    category: lt("Hôtellerie", "Hospitality"),
    images: [
      "/1.jpg",
      "/3.jpg",
      "https://placehold.co/800x600/3d5c4a/ef5d36?text=Projet+H%C3%B4tellerie+%E2%80%94+Spa",
    ],
    description: lt(
      "Projet Hôtellerie — Lorem ipsum, à remplacer par le client. Spa et piscines du resort : hammam en marbre blanc, bassins en pierre locale et terrasses en travertin adouci résistant au sel marin.",
      "Hospitality Project — Placeholder to be replaced by the client. Resort spa and pools: white marble hammam, local stone basins, and salt-resistant honed travertine terraces.",
    ),
  },
  {
    id: "13",
    title: lt("Hôtel Boutique La Medina", "La Medina Boutique Hotel"),
    category: lt("Hôtellerie", "Hospitality"),
    images: [
      "/2.jpg",
      "/4.jpg",
      "https://placehold.co/800x600/2a2a2a/ffffff?text=Projet+H%C3%B4tellerie+%E2%80%94+Chambre",
    ],
    description: lt(
      "Projet Hôtellerie — Lorem ipsum, à remplacer par le client. Chambres et suites d'un hôtel boutique : salles de bain en marbre noir, têtes de lit en pierre sculptée et patios en dalles traditionnelles.",
      "Hospitality Project — Placeholder to be replaced by the client. Boutique hotel rooms and suites: black marble bathrooms, sculpted stone headboards, and traditional slab patios.",
    ),
  },
  {
    id: "14",
    title: lt("Restaurant Gastronomique Le Carthage", "Le Carthage Fine Dining Restaurant"),
    category: lt("Hôtellerie", "Hospitality"),
    images: [
      "/3.jpg",
      "/1.jpg",
      "https://placehold.co/800x600/333333/ef5d36?text=Projet+H%C3%B4tellerie+%E2%80%94+Salle",
    ],
    description: lt(
      "Projet Hôtellerie — Lorem ipsum, à remplacer par le client. Salle de restaurant étoilé : comptoir en marbre Calacatta oro, sols en granit kashmir white et mur feature en onyx vert translucide.",
      "Hospitality Project — Placeholder to be replaced by the client. Michelin-star dining room: Calacatta Oro marble counter, Kashmir White granite floors, and a translucent green onyx feature wall.",
    ),
  },
  {
    id: "15",
    title: lt("Spa Thalasso Hammamet", "Hammamet Thalasso Spa"),
    category: lt("Hôtellerie", "Hospitality"),
    images: [
      "/4.jpg",
      "/2.jpg",
      "https://placehold.co/800x600/1a1a1a/ffffff?text=Projet+H%C3%B4tellerie+%E2%80%94+Hammam",
    ],
    description: lt(
      "Projet Hôtellerie — Lorem ipsum, à remplacer par le client. Centre thalasso : hammam traditionnel en marbre blanc, bains en travertin et cabines de soin avec revêtements antidérapants premium.",
      "Hospitality Project — Placeholder to be replaced by the client. Thalasso center: traditional white marble hammam, travertine baths, and treatment rooms with premium slip-resistant finishes.",
    ),
  },
  {
    id: "16",
    title: lt("Hôtel Business Tunis Centre", "Tunis Centre Business Hotel"),
    category: lt("Hôtellerie", "Hospitality"),
    images: [
      "/00.jpg",
      "/0.jpg",
      "https://placehold.co/800x600/444444/ef5d36?text=Projet+H%C3%B4tellerie+%E2%80%94+R%C3%A9ception",
    ],
    description: lt(
      "Projet Hôtellerie — Lorem ipsum, à remplacer par le client. Réception et salles de conférence d'un hôtel business : sols en marbre gris veiné, murs d'accent en granit rouge impérial et finitions acoustiques intégrées.",
      "Hospitality Project — Placeholder to be replaced by the client. Business hotel reception and conference rooms: grey veined marble floors, imperial red granite accent walls, and integrated acoustic finishes.",
    ),
  },
];
