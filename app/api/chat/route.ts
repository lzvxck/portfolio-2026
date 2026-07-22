import { streamText } from "ai";
import { createGroq } from "@ai-sdk/groq";
import { z } from "zod";
import { headers } from "next/headers";
import { retrieve } from "@/lib/rag/retrieve";
import { buildSystemPrompt, REFUSAL } from "@/lib/rag/prompt";
import { checkRateLimit } from "@/lib/ratelimit";
import { checkIntent } from "@/lib/guardrails/intent";

export const runtime = "nodejs";
export const maxDuration = 60;

const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

const bodySchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(4000),
      })
    )
    .min(1)
    .max(20),
});

const STREAM_HEADERS = {
  "Content-Type": "text/plain; charset=utf-8",
  "X-Accel-Buffering": "no",
  "Cache-Control": "no-cache, no-transform",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// Canned refusal — no Groq call, just stream the static string
function refusalStream() {
  return new Response(
    new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(REFUSAL));
        controller.close();
      },
    }),
    { headers: STREAM_HEADERS }
  );
}

export async function POST(req: Request) {
  // ── 1. Rate limit ──────────────────────────────────────────────────────────
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const limit = checkRateLimit(ip);
  if (!limit.ok) return json({ error: "Too many requests" }, 429);

  // ── 2. Parse & validate body ───────────────────────────────────────────────
  let body: z.infer<typeof bodySchema>;
  try {
    body = bodySchema.parse(await req.json());
  } catch {
    return json({ error: "Invalid request body" }, 400);
  }

  const lastUser = [...body.messages].reverse().find((m) => m.role === "user");
  if (!lastUser) return json({ error: "No user message" }, 400);

  // ── 3. Intent gate — injection / jailbreak heuristic ──────────────────────
  const intent = checkIntent(lastUser.content);
  if (!intent.ok) return refusalStream();

  // ── 4. Retrieve relevant chunks ────────────────────────────────────────────
  const threshold = parseFloat(process.env.SIMILARITY_THRESHOLD ?? "0.49");
  const topK = parseInt(process.env.RAG_TOP_K ?? "8");

  let chunks;
  try {
    chunks = await retrieve(lastUser.content, topK, threshold);
  } catch (err) {
    console.error("[chat] retrieval error:", err);
    return json({ error: "Service temporarily unavailable" }, 503);
  }

  // ── 5. Similarity threshold gate — off-topic → canned refusal ─────────────
  if (chunks.length === 0) return refusalStream();

  // ── 6. Grounded generation — manual ReadableStream for real-time flushing ──
  const system = buildSystemPrompt(chunks);
  let textStream: AsyncIterable<string>;
  try {
    ({ textStream } = streamText({
      model: groq("llama-3.1-8b-instant"),
      system,
      messages: body.messages,
      temperature: 0.2,
      maxOutputTokens: 512,
    }));
  } catch (err) {
    console.error("[chat] streamText init error:", err);
    return json({ error: "Service temporarily unavailable" }, 503);
  }

  return new Response(
    new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of textStream) {
            controller.enqueue(encoder.encode(chunk));
          }
        } catch (err) {
          console.error("[chat] stream error:", err);
        } finally {
          controller.close();
        }
      },
    }),
    { headers: STREAM_HEADERS }
  );
}
