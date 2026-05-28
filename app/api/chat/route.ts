// Phase 3: full implementation — RAG retrieval + Groq streaming + guardrails
export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST() {
  return new Response(JSON.stringify({ error: "Not yet implemented" }), {
    status: 503,
    headers: { "Content-Type": "application/json" },
  });
}
