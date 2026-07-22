import assert from "node:assert";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { buildSystemPrompt } from "../../lib/rag/prompt";
import type { ScoredChunk } from "../../lib/rag/retrieve";

// Build a synthetic ScoredChunk from the real experience/2025-laburen entry
// in data/embeddings.json, so the test can't drift from the actual data.
const index = JSON.parse(
  readFileSync(join(process.cwd(), "data", "embeddings.json"), "utf-8")
);
const laburen = index.chunks.find(
  (c: { id: string }) => c.id === "experience/2025-laburen"
);
assert.ok(laburen, "experience/2025-laburen not found in data/embeddings.json");

const chunk: ScoredChunk = { ...laburen, score: 1 };

function main() {
  const prompt = buildSystemPrompt([chunk]);

  assert.ok(
    prompt.includes("Jul 2025"),
    `Expected prompt to contain "Jul 2025" (start date), got:\n${prompt}`
  );
  assert.ok(
    prompt.includes("Sep 2025"),
    `Expected prompt to contain "Sep 2025" (end date), got:\n${prompt}`
  );

  console.log("PASS: buildSystemPrompt renders the experience date range");
}

main();
