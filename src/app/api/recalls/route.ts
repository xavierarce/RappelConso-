import { NextResponse } from "next/server";
import { mockRappels } from "@/lib/mockData";
import type { Rappel } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categorie = searchParams.get("categorie");
  const limit = parseInt(searchParams.get("limit") ?? "50");

  // Try real API first
  const apiUrl = process.env.RAPPELCONSO_API_URL;

  if (apiUrl) {
    try {
      const params = new URLSearchParams({ limit: String(limit) });
      if (categorie) params.set("categorie", categorie);
      const res = await fetch(`${apiUrl}?${params}`, { next: { revalidate: 300 } });
      if (res.ok) {
        const data = await res.json();
        return NextResponse.json(data);
      }
    } catch {
      // fall through to offline fallback
    }
  }

  // Offline fallback: mock / local data
  let recalls: Rappel[] = mockRappels;
  if (categorie) recalls = recalls.filter((r) => r.categorie === categorie);
  recalls = recalls.slice(0, limit);

  return NextResponse.json(recalls);
}
