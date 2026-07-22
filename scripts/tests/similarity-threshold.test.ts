import assert from "node:assert";
import { retrieve } from "../../lib/rag/retrieve";

// Same env-driven fallback as app/api/chat/route.ts:77-78.
const threshold = parseFloat(process.env.SIMILARITY_THRESHOLD ?? "0.49");
const topK = parseInt(process.env.RAG_TOP_K ?? "8");

// Off-topic / unrelated queries — must be refused (empty retrieve() result).
const OFF_TOPIC = [
  "What is the capital of France?",
  "Can you write me a python function to sort a list?",
  "What's 2+2?",
  "Write me a poem about the ocean",
  "Who won the last World Cup?",
  "asdkjfh qwoeiur zznnm qwerty",
];

// One natural-phrasing on-topic query per content category, mapped to the
// expected top-ranked source chunk id (derived empirically from
// data/embeddings.json, not guessed).
const ON_TOPIC: [string, string][] = [
  ["Who is Lionel Arce and what does he do?", "profile"],
  ["What did Lionel do as a freelance developer?", "experience/2022-freelance"],
  [
    "What is Lionel's current role at Huenei IT Services?",
    "experience/2025-huenei",
  ],
  ["What did Lionel work on at Laburen?", "experience/2025-laburen"],
  ["Tell me about the Agent Arena project", "projects/agent-arena"],
  ["What is Chainforge?", "projects/chainforge"],
  [
    "Tell me about the ETIP talent intelligence platform",
    "projects/etip",
  ],
  ["What is the Prompt Shield project about?", "projects/prompt-shield"],
  ["What is Prompt Version Hub?", "projects/prompt-version-hub"],
  ["How was this portfolio site built?", "projects/rag-portfolio"],
  ["Tell me about the Tiny GPT SOTA project", "projects/tiny-gpt-sota"],
  [
    "What AI and machine learning skills does Lionel have?",
    "skills/ai-ml",
  ],
  [
    "What cloud and infrastructure experience does he have?",
    "skills/infrastructure",
  ],
  ["What programming languages does Lionel know?", "skills/languages-frameworks"],
  ["Where did Lionel study?", "education/computer-engineering-unlam"],
  [
    "What AWS machine learning certification does Lionel have?",
    "certifications/aws-ml-foundations",
  ],
];

async function main() {
  for (const q of OFF_TOPIC) {
    const results = await retrieve(q, topK, threshold);
    assert.strictEqual(
      results.length,
      0,
      `Expected OFF_TOPIC query to be refused (empty retrieve()), got ${results.length} result(s) for: "${q}" (top: ${results[0]?.id} @ ${results[0]?.score})`
    );
  }

  for (const [q, expectedId] of ON_TOPIC) {
    const results = await retrieve(q, topK, threshold);
    assert.ok(
      results.length > 0,
      `Expected ON_TOPIC query to retrieve results, got none for: "${q}"`
    );
    assert.strictEqual(
      results[0].id,
      expectedId,
      `Expected top chunk "${expectedId}" for "${q}", got "${results[0].id}"`
    );
  }

  console.log(
    `PASS: all ${OFF_TOPIC.length} OFF_TOPIC queries refused, all ${ON_TOPIC.length} ON_TOPIC queries retrieve their expected chunk (threshold=${threshold}, topK=${topK})`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
