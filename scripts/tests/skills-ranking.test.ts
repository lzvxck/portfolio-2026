import assert from "node:assert";
import { retrieve } from "../../lib/rag/retrieve";

// Same env-driven fallback as app/api/chat/route.ts:77-78, so this test stays
// in sync with Bug 1's threshold fix and the production defaults.
const threshold = parseFloat(process.env.SIMILARITY_THRESHOLD ?? "0.49");
const topK = parseInt(process.env.RAG_TOP_K ?? "8");

async function main() {
  const results = await retrieve(
    "What programming languages does Lionel know?",
    topK,
    threshold
  );

  assert.ok(
    results.some((c) => c.id === "skills/languages-frameworks"),
    `Expected "skills/languages-frameworks" to be in the top ${topK} results, got: ${results.map((c) => c.id).join(", ")}`
  );

  console.log("PASS: skills/languages-frameworks ranks within RAG_TOP_K");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
