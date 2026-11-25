"use client";

import { useEffect, useState } from "react";
import { getPlacard, removeFromPlacard } from "@/lib/placard";
import { mockSentinelleResult } from "@/lib/mockData";
import type { ProduitPlacard, MatchResult } from "@/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function PlacardContent() {
  const searchParams = useSearchParams();
  const fromScan = searchParams.get("from") === "scan";
  const [products, setProducts] = useState<ProduitPlacard[]>([]);
  const [alertMatch, setAlertMatch] = useState<MatchResult | null>(null);

  useEffect(() => {
    setProducts(getPlacard());
    // Check for alert in sessionStorage
    const hasAlert = sessionStorage.getItem("rappelconso_alert");
    if (hasAlert) {
      setAlertMatch(mockSentinelleResult);
    }
  }, []);

  function handleRemove(index: number) {
    removeFromPlacard(index);
    setProducts(getPlacard());
  }

  // Demo: simulate an alert
  function simulateAlert() {
    sessionStorage.setItem("rappelconso_alert", "1");
    setAlertMatch(mockSentinelleResult);
  }

  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-3 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Mon Placard</h1>
        <p className="text-sm text-gray-500">Produits que je surveille</p>
      </div>

      {fromScan && (
        <div className="mx-4 mt-3 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
          <p className="text-sm text-green-700 font-medium">
            ✓ Produits ajoutés depuis votre ticket
          </p>
        </div>
      )}

      {/* Alert banner */}
      {alertMatch && (
        <Link href={`/fiche/${alertMatch.rappel.id}`}>
          <div className="mx-4 mt-3 bg-red-50 border border-red-300 rounded-lg p-3 cursor-pointer hover:bg-red-100 transition-colors">
            <div className="flex items-start gap-2">
              <span className="text-lg">🚨</span>
              <div>
                <p className="text-sm font-bold text-red-700">
                  Alerte rappel !
                </p>
                <p className="text-xs text-red-600">
                  {alertMatch.rappel.produit} — score{" "}
                  {alertMatch.resultat.score}/100
                </p>
                <p className="text-xs text-red-500">
                  {alertMatch.resultat.justification_courte}
                </p>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Product list */}
      <div className="px-4 mt-3 space-y-2">
        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-sm">Aucun produit dans le placard</p>
            <Link
              href="/scan"
              className="mt-3 inline-block text-sm text-red-600 font-medium underline"
            >
              Scanner un ticket
            </Link>
          </div>
        ) : (
          products.map((p, i) => {
            const isMatch =
              alertMatch &&
              p.marque_probable === alertMatch.produit_placard.marque_probable &&
              p.produit_normalise === alertMatch.produit_placard.produit_normalise;

            return (
              <div
                key={i}
                className={`flex items-start gap-3 p-3 rounded-lg border ${
                  isMatch ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {p.produit_normalise}
                  </p>
                  <p className="text-xs text-gray-500">
                    {p.marque_probable} · {p.categorie}
                  </p>
                  <p className="text-xs text-gray-400">
                    {p.magasin} · {new Date(p.date_achat).toLocaleDateString("fr-FR")}
                  </p>
                  {isMatch && (
                    <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                      🚨 Rappelé · score {alertMatch.resultat.score}/100
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleRemove(i)}
                  className="shrink-0 text-gray-400 hover:text-red-500 transition-colors p-1"
                  aria-label="Supprimer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Demo button */}
      <div className="px-4 mt-6 pb-4">
        <button
          onClick={simulateAlert}
          className="w-full border border-dashed border-gray-300 text-gray-500 text-xs py-2 rounded-lg hover:bg-gray-50"
        >
          🧪 [DÉMO] Simuler un rappel
        </button>
      </div>
    </div>
  );
}

export default function PlacardPage() {
  return (
    <Suspense>
      <PlacardContent />
    </Suspense>
  );
}
