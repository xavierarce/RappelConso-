"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { mockRappels } from "@/lib/mockData";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const demoAnswers: Record<string, string> = {
  default:
    "Je suis l'assistant RappelConso+. Je réponds uniquement à partir de la fiche officielle du rappel. Posez-moi une question sur ce produit.",
  manger:
    "D'après la fiche officielle : si vous avez consommé ce produit récemment et que vous présentez des symptômes (fièvre, maux de tête, troubles gastro-intestinaux), consultez immédiatement un médecin en lui signalant votre consommation.",
  lot: "La fiche officielle ne précise pas les numéros de lots concernés pour ce rappel. Par précaution, ne consommez pas le produit et vérifiez auprès du point de vente.",
  rapporter:
    "Selon la fiche officielle, vous pouvez rapporter le produit au point de vente où vous l'avez acheté pour obtenir un remboursement. Conservez votre ticket de caisse si possible.",
};

function getAutoResponse(question: string): string {
  const q = question.toLowerCase();
  if (q.includes("mang") || q.includes("consomm") || q.includes("risque"))
    return demoAnswers.manger;
  if (q.includes("lot") || q.includes("numéro") || q.includes("concerné"))
    return demoAnswers.lot;
  if (q.includes("rapporter") || q.includes("retourner") || q.includes("remboursement"))
    return demoAnswers.rapporter;
  return demoAnswers.default;
}

function AssistantContent() {
  const searchParams = useSearchParams();
  const rappelId = searchParams.get("rappelId");
  const rappel = rappelId ? mockRappels.find((r) => r.id === rappelId) : null;

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: rappel
        ? `Je suis l'assistant RappelConso+. J'ai accès à la fiche officielle du rappel "${rappel.produit}" (${rappel.marque}). Quelle est votre question ?`
        : demoAnswers.default,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    if (!input.trim() || loading) return;
    const question = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setLoading(true);

    // Simulate agent response
    await new Promise((resolve) => setTimeout(resolve, 1200));
    const answer = getAutoResponse(question);
    setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
    setLoading(false);
  }

  const demoQuestions = [
    "J'en ai mangé hier soir, je risque quelque chose ?",
    "Est-ce que tous les lots sont concernés ?",
    "Où est-ce que je peux rapporter le produit ?",
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-3 border-b border-gray-200 flex items-center gap-3">
        {rappelId ? (
          <Link href={`/fiche/${rappelId}`} className="text-gray-600 hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
            </svg>
          </Link>
        ) : null}
        <div className="flex-1">
          <h1 className="text-base font-semibold text-gray-900">Assistant</h1>
          {rappel && <p className="text-xs text-gray-500 truncate">{rappel.produit}</p>}
        </div>
        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
          watsonx
        </span>
      </div>

      {/* Context chip */}
      {rappel && (
        <div className="px-4 py-2 bg-orange-50 border-b border-orange-100">
          <p className="text-xs text-orange-700">
            🔒 L&apos;assistant répond uniquement à partir de la fiche officielle
          </p>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                msg.role === "user"
                  ? "bg-red-600 text-white rounded-br-sm"
                  : "bg-gray-100 text-gray-900 rounded-bl-sm"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Demo quick questions */}
      {messages.length <= 1 && (
        <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-none border-t border-gray-100">
          {demoQuestions.map((q) => (
            <button
              key={q}
              onClick={() => setInput(q)}
              className="shrink-0 text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-4 py-3 border-t border-gray-200 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Posez votre question…"
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-red-300"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className="bg-red-600 text-white w-9 h-9 rounded-full flex items-center justify-center disabled:bg-gray-300 hover:bg-red-700 transition-colors shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.154.75.75 0 0 0 0-1.115A28.897 28.897 0 0 0 3.105 2.288Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function AssistantPage() {
  return (
    <Suspense>
      <AssistantContent />
    </Suspense>
  );
}
