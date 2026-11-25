import { NextResponse } from "next/server";
import { mockSentinelleResult } from "@/lib/mockData";

export async function POST(request: Request) {
  const agentUrl = process.env.SENTINELLE_AGENT_URL;
  const apiKey = process.env.WATSONX_API_KEY;
  const threshold = parseInt(process.env.MATCH_THRESHOLD ?? "60");

  if (agentUrl && apiKey) {
    try {
      const body = await request.json();
      const res = await fetch(agentUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        const data = await res.json();
        return NextResponse.json(data);
      }
    } catch {
      // fall through to mock
    }
  }

  // Fallback: return mock match result if score >= threshold
  if (mockSentinelleResult.resultat.score >= threshold) {
    return NextResponse.json([mockSentinelleResult]);
  }
  return NextResponse.json([]);
}
