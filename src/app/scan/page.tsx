"use client";

import { useState } from "react";
import { mockTicketProducts } from "@/lib/mockData";
import type { ProduitPlacard } from "@/types";
import { addToPlacard } from "@/lib/placard";
import { useRouter } from "next/navigation";

export default function ScanPage() {
  const router = useRouter();
  const [step, setStep] = useState<"capture" | "review">("capture");
  const [preview, setPreview] = useState<string | null>(null);
  const [products, setProducts] = useState<ProduitPlacard[]>([]);
  const [loading, setLoading] = useState(false);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  async function handleAnalyze() {
    setLoading(true);
    // Simulate API call to Ticket-to-Data agent
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // For now, use mock data
    setProducts(mockTicketProducts);
    setStep("review");
    setLoading(false);
  }

  function handleAddToPlacard() {
    addToPlacard(products);
    router.push("/placard?from=scan");
  }

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-900">Scanner mon ticket</h1>
        <p className="text-sm text-gray-500">
          Photographiez votre ticket de caisse pour suivre vos produits
        </p>
      </div>

      {step === "capture" && (
        <>
          {/* Camera capture */}
          <div className="mb-4">
            <label
              htmlFor="camera-input"
              className="block w-full aspect-[4/5] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors bg-gray-50"
            >
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview}
                  alt="Aperçu du ticket"
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-12 h-12 text-gray-400 mb-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                    />
                  </svg>
                  <p className="text-sm text-gray-600 font-medium">
                    Prendre une photo
                  </p>
                  <p className="text-xs text-gray-400">ou choisir un fichier</p>
                </>
              )}
              <input
                id="camera-input"
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleFileSelect}
              />
            </label>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!preview || loading}
            className="w-full bg-red-600 text-white font-medium py-3 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-red-700 transition-colors"
          >
            {loading ? "Analyse en cours..." : "Analyser le ticket"}
          </button>
        </>
      )}

      {step === "review" && (
        <>
          <p className="text-sm text-gray-600 mb-3">
            {products.length} produits détectés — vérifiez la liste ci-dessous
          </p>

          <div className="space-y-2 mb-4">
            {products.map((p, i) => (
              <div key={i} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <p className="text-sm font-medium text-gray-900">
                  {p.produit_normalise}
                </p>
                <p className="text-xs text-gray-500">
                  {p.marque_probable} · {p.categorie}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Ticket brut : {p.libelle_brut}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={handleAddToPlacard}
            className="w-full bg-red-600 text-white font-medium py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            Ajouter à Mon Placard
          </button>

          <button
            onClick={() => {
              setStep("capture");
              setPreview(null);
              setProducts([]);
            }}
            className="w-full mt-2 bg-gray-100 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Scanner un autre ticket
          </button>
        </>
      )}
    </div>
  );
}
