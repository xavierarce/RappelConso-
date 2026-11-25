import type { Rappel } from "@/types";

export const mockRappels: Rappel[] = [
  {
    id: "2026-11-0001",
    gtin: "3250391234567",
    produit: "Camembert de Normandie AOP 250g",
    marque: "Président",
    categorie: "Alimentation",
    risque: "Listeria monocytogenes",
    conduite_a_tenir: "Ne plus consommer ce produit. Le rapporter au point de vente pour remboursement.",
    preconisations_sanitaires:
      "Les personnes ayant consommé ce produit et présentant des symptômes (fièvre, maux de tête, troubles gastro-intestinaux) doivent consulter un médecin.",
    image_url: "https://placehold.co/400x300/dc2626/white?text=Camembert",
    date_publication: "2026-11-20",
    lien_fiche: "https://rappel.conso.gouv.fr/fiche-rappel/mock-001",
  },
  {
    id: "2026-11-0002",
    produit: "Steak haché surgelé 5% MG",
    marque: "Charal",
    categorie: "Viandes",
    risque: "E. coli producteurs de Shigatoxines (STEC)",
    conduite_a_tenir: "Ne pas consommer. Jeter ou retourner en magasin.",
    preconisations_sanitaires:
      "En cas de diarrhées sanglantes, consulter immédiatement un médecin.",
    image_url: "https://placehold.co/400x300/b91c1c/white?text=Steak+Haché",
    date_publication: "2026-11-22",
    lien_fiche: "https://rappel.conso.gouv.fr/fiche-rappel/mock-002",
  },
  {
    id: "2026-11-0003",
    gtin: "3011360027004",
    produit: "Saumon fumé tranché Label Rouge",
    marque: "Labeyrie",
    categorie: "Poissons / produits de la mer",
    risque: "Listeria monocytogenes",
    conduite_a_tenir: "Ne plus consommer. Retourner en magasin.",
    preconisations_sanitaires:
      "Consulter un médecin en cas de fièvre ou troubles gastro-intestinaux.",
    image_url: "https://placehold.co/400x300/ea580c/white?text=Saumon+Fumé",
    date_publication: "2026-11-23",
    lien_fiche: "https://rappel.conso.gouv.fr/fiche-rappel/mock-003",
  },
  {
    id: "2026-11-0004",
    produit: "Jus de pomme cloudy 1L",
    marque: "Innocent",
    categorie: "Boissons",
    risque: "Présence de corps étrangers (éclats de verre)",
    conduite_a_tenir: "Ne pas consommer. Jeter le produit sans le déboucher.",
    preconisations_sanitaires:
      "En cas de blessure, consulter un médecin ou appeler le 15.",
    image_url: "https://placehold.co/400x300/ca8a04/white?text=Jus+Pomme",
    date_publication: "2026-11-24",
    lien_fiche: "https://rappel.conso.gouv.fr/fiche-rappel/mock-004",
  },
  {
    id: "2026-11-0005",
    produit: "Yaourt nature brassé x8",
    marque: "Danone",
    categorie: "Produits laitiers",
    risque: "Contamination microbiologique (moisissures)",
    conduite_a_tenir: "Ne plus consommer. Retourner en magasin pour remboursement.",
    preconisations_sanitaires: "Pas de risque grave pour les personnes en bonne santé.",
    image_url: "https://placehold.co/400x300/16a34a/white?text=Yaourt",
    date_publication: "2026-11-24",
    lien_fiche: "https://rappel.conso.gouv.fr/fiche-rappel/mock-005",
  },
];

// Demo: pre-extracted ticket products that match mock recall #0001 (Camembert Président)
export const mockTicketProducts = [
  {
    libelle_brut: "CAMEMBERT PRES 250G",
    produit_normalise: "Camembert de Normandie AOP 250g",
    marque_probable: "Président",
    categorie: "Alimentation",
    date_achat: "2026-11-24",
    magasin: "Carrefour Market",
  },
  {
    libelle_brut: "LAIT DEMI EC 1L X6",
    produit_normalise: "Lait demi-écrémé 1L",
    marque_probable: "Lactel",
    categorie: "Produits laitiers",
    date_achat: "2026-11-24",
    magasin: "Carrefour Market",
  },
  {
    libelle_brut: "PAIN DE MIE NATURE",
    produit_normalise: "Pain de mie nature",
    marque_probable: "Harry's",
    categorie: "Boulangerie / pâtisserie",
    date_achat: "2026-11-24",
    magasin: "Carrefour Market",
  },
];

// Demo: Sentinelle result for Camembert Président matching recall #0001
export const mockSentinelleResult = {
  produit_placard: mockTicketProducts[0],
  rappel: mockRappels[0],
  resultat: {
    score: 85,
    alerte: true,
    justification_courte: "Même marque et catégorie — lot à vérifier",
  },
};
