import { mockRappels } from "@/lib/mockData";
import RappelCard from "@/components/RappelCard";
import Link from "next/link";

export default function HomePage() {
  const categories = [...new Set(mockRappels.map((r) => r.categorie))];

  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
        <div className="px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">RappelConso+</h1>
            <p className="text-xs text-gray-500">Rappels récents</p>
          </div>
          <Link
            href="/scan"
            className="bg-red-600 text-white text-sm font-medium px-3 py-2 rounded-lg flex items-center gap-1.5 hover:bg-red-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Zm7-3a.75.75 0 0 1 .75.75v1.5h1.5a.75.75 0 0 1 0 1.5h-1.5v1.5a.75.75 0 0 1-1.5 0v-1.5h-1.5a.75.75 0 0 1 0-1.5h1.5v-1.5A.75.75 0 0 1 8 5Zm4.5 8a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H13.25A.75.75 0 0 1 12.5 13Z"
                clipRule="evenodd"
              />
            </svg>
            Scanner
          </Link>
        </div>

        {/* Category filters */}
        <div className="px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-none">
          <button className="shrink-0 text-xs bg-red-600 text-white px-3 py-1 rounded-full font-medium">
            Tous
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className="shrink-0 text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium hover:bg-gray-200 transition-colors"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="px-4 py-2 bg-red-50 border-b border-red-100 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <p className="text-xs text-red-700 font-medium">
          {mockRappels.length} rappels actifs · Données de démonstration
        </p>
      </div>

      {/* Feed */}
      <div>
        {mockRappels.map((rappel) => (
          <RappelCard key={rappel.id} rappel={rappel} />
        ))}
      </div>
    </div>
  );
}
