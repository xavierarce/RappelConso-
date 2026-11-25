// Shared data formats — see docs/DATA_FORMATS.md

export interface Rappel {
  id: string;
  gtin?: string;
  produit: string;
  marque: string;
  categorie: string;
  risque: string;
  conduite_a_tenir: string;
  preconisations_sanitaires: string;
  image_url?: string;
  date_publication: string;
  lien_fiche: string;
}

export interface ProduitPlacard {
  libelle_brut: string;
  produit_normalise: string;
  marque_probable: string;
  categorie: string;
  date_achat: string;
  magasin: string;
}

export interface ResultatSentinelle {
  score: number;
  alerte: boolean;
  justification_courte: string;
}

export interface MatchResult {
  produit_placard: ProduitPlacard;
  rappel: Rappel;
  resultat: ResultatSentinelle;
}
