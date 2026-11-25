import Link from "next/link";
import type { Rappel } from "@/types";

interface Props {
  rappel: Rappel;
  highlight?: boolean;
}

const riskColor: Record<string, string> = {
  "Listeria monocytogenes": "bg-red-100 text-red-700",
  "E. coli producteurs de Shigatoxines (STEC)": "bg-red-100 text-red-700",
  "Salmonella": "bg-orange-100 text-orange-700",
};

function getRiskClass(risque: string): string {
  return riskColor[risque] ?? "bg-yellow-100 text-yellow-700";
}

export default function RappelCard({ rappel, highlight = false }: Props) {
  return (
    <Link href={`/fiche/${rappel.id}`}>
      <div
        className={`flex gap-3 p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
          highlight ? "border-l-4 border-l-red-500" : ""
        }`}
      >
        {/* Image */}
        <div className="shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
          {rappel.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={rappel.image_url}
              alt={rappel.produit}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs text-center px-1">
              Pas d&apos;image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">
            {rappel.produit}
          </p>
          <p className="text-xs text-gray-500 truncate">{rappel.marque}</p>
          <span
            className={`mt-1 inline-block text-xs px-2 py-0.5 rounded-full font-medium ${getRiskClass(
              rappel.risque
            )}`}
          >
            {rappel.risque}
          </span>
          <p className="text-xs text-gray-400 mt-1">
            {new Date(rappel.date_publication).toLocaleDateString("fr-FR")}
          </p>
        </div>

        {/* Arrow */}
        <div className="shrink-0 flex items-center text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
