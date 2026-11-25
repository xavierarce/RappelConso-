import { NextResponse } from "next/server";

const demoAnswers: Record<string, string> = {
  manger:
    "D'après la fiche officielle : si vous avez consommé ce produit récemment et que vous présentez des symptômes (fièvre, maux de tête, troubles gastro-intestinaux), consultez immédiatement un médecin en lui signalant votre consommation.",
  lot: "La fiche officielle ne précise pas les numéros de lots concernés. Par précaution, ne consommez pas le produit et vérifiez auprès du point de vente.",
  rapporter:
    "Selon la fiche officielle, vous pouvez rapporter le produit au point de vente où vous l'avez acheté pour obtenir un remboursement.",
  default:
    "Je suis l'assistant RappelConso+. Je réponds uniquement à partir de la fiche officielle du rappel. Reformulez votre question si nécessaire.",
};

function getLocalAnswer(question: string): string {
  const q = question.toLowerCase();
  if (q.includes("mang") || q.includes("consomm") || q.includes("risque"))
    return demoAnswers.manger;
  if (q.includes("lot") || q.includes("numéro") || q.includes("concerné"))
    return demoAnswers.lot;
  if (q.includes("rapporter") || q.includes("retourner") || q.includes("remboursement"))
    return demoAnswers.rapporter;
  return demoAnswers.default;
}

export async function POST(request: Request) {
  const agentUrl = process.env.CONSEILLER_AGENT_URL;
  const apiKey = process.env.WATSONX_API_KEY;

  const { question, fiche_rappel } = await request.json();

  if (agentUrl && apiKey) {
    try {
      const res = await fetch(agentUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question, fiche_rappel }),
      });
      if (res.ok) {
        const data = await res.json();
        return NextResponse.json(data);
      }
    } catch {
      // fall through to local answer
    }
  }

  // Fallback: keyword-based local answer
  return NextResponse.json({ answer: getLocalAnswer(question) });
}
