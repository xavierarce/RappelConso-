import { NextResponse } from "next/server";
import { mockTicketProducts } from "@/lib/mockData";

export async function POST(request: Request) {
  const agentUrl = process.env.TICKET_AGENT_URL;
  const apiKey = process.env.WATSONX_API_KEY;

  if (agentUrl && apiKey) {
    try {
      const formData = await request.formData();
      const res = await fetch(agentUrl, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}` },
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        return NextResponse.json(data);
      }
    } catch {
      // fall through to mock
    }
  }

  // Fallback: return mock extracted products
  return NextResponse.json(mockTicketProducts);
}
