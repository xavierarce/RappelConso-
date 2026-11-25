import { mockRappels } from "@/lib/mockData";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function FichePage({ params }: Props) {
  const { id } = await params;
  const rappel = mockRappels.find((r) => r.id === id);

  if (!rappel) notFound();

  return (
    <div>
      {/* Back */}
      <div className="sticky top-0 bg-white z-10 px-4 py-3 border-b border-gray-200 flex items-center gap-3">
        <Link href="/" className="text-gray-600 hover:text-gray-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
        <h1 className="text-base font-semibold text-gray-900 truncate flex-1">
          Fiche rappel
        </h1>
      </div>

      {/* Alert banner */}
      <div className="bg-red-600 text-white px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">⚠️</span>
          <div>
            <p className="font-bold text-sm">Rappel de produit</p>
            <p className="text-xs opacity-90">{rappel.risque}</p>
          </div>
        </div>
      </div>

      {/* Product image */}
      {rappel.image_url && (
        <div className="bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={rappel.image_url}
            alt={rappel.produit}
            className="w-full max-h-48 object-contain"
          />
        </div>
      )}

      {/* Details */}
      <div className="px-4 py-4 space-y-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">{rappel.produit}</h2>
          <p className="text-sm text-gray-600">{rappel.marque}</p>
          <p className="text-xs text-gray-400 mt-1">
            Publié le {new Date(rappel.date_publication).toLocaleDateString("fr-FR")} ·{" "}
            {rappel.categorie}
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-xs font-semibold text-red-700 uppercase tracking-wide mb-1">
            Conduite à tenir
          </p>
          <p className="text-sm text-red-900">{rappel.conduite_a_tenir}</p>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
          <p className="text-xs font-semibold text-orange-700 uppercase tracking-wide mb-1">
            Préconisations sanitaires
          </p>
          <p className="text-sm text-orange-900">{rappel.preconisations_sanitaires}</p>
        </div>

        <a
          href={rappel.lien_fiche}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-blue-600 font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
            <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
          </svg>
          Voir la fiche officielle
        </a>

        {/* CTA to Assistant */}
        <Link
          href={`/assistant?rappelId=${rappel.id}`}
          className="block w-full bg-red-600 text-white text-center font-medium py-3 rounded-lg hover:bg-red-700 transition-colors"
        >
          Demander à l&apos;assistant
        </Link>
      </div>
    </div>
  );
}
