import type { ProduitPlacard } from "@/types";

const STORAGE_KEY = "rappelconso_placard";

export function getPlacard(): ProduitPlacard[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProduitPlacard[]) : [];
  } catch {
    return [];
  }
}

export function savePlacard(items: ProduitPlacard[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function addToPlacard(items: ProduitPlacard[]): void {
  const existing = getPlacard();
  savePlacard([...existing, ...items]);
}

export function removeFromPlacard(index: number): void {
  const existing = getPlacard();
  existing.splice(index, 1);
  savePlacard(existing);
}
