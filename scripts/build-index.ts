import { pipeline } from "@huggingface/transformers";
import matter from "gray-matter";
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join, relative, extname } from "node:path";

const CONTENT_DIR = join(process.cwd(), "content");
const OUTPUT_FILE = join(process.cwd(), "data", "embeddings.json");
const MODEL = "Xenova/bge-small-en-v1.5";
const DIMENSIONS = 384;

// ─── Types ────────────────────────────────────────────────────────────────────

type FrontMatter = Record<string, unknown>;

type Chunk = {
  id: string;
  text: string;
  metadata: FrontMatter & { source: string };
  vector: number[];
};

type EmbeddingIndex = {
  model: string;
  dimensions: number;
  created: string;
  chunks: Chunk[];
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function walkMd(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) results.push(...walkMd(full));
    else if (extname(entry.name) === ".md") results.push(full);
  }
  return results;
}

function buildHeader(data: FrontMatter): string {
  switch (data.type) {
    case "profile":
      return `Profile > ${data.name}`;
    case "experience":
      return `Experience > ${data.company} > ${data.title}`;
    case "project":
      return `Projects > ${data.name}`;
    case "skills":
      return `Skills > ${data.category}`;
    case "education":
      return `Education > ${data.institution} > ${data.degree}`;
    case "certification":
      return `Certifications > ${data.name} (${data.issuer})`;
    default:
      return String(data.type ?? "Unknown");
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  // 1. Discover files
  const files = walkMd(CONTENT_DIR);
  console.log(`\nFound ${files.length} markdown files in content/\n`);

  // 2. Load model (downloads ~32 MB on first run, cached afterwards)
  console.log(`Loading model: ${MODEL}`);
  const extractor = await pipeline("feature-extraction", MODEL, {
    dtype: "q8",
  });
  console.log("Model ready\n");

  // 3. Embed each file
  const chunks: Chunk[] = [];

  for (const file of files) {
    const id = relative(CONTENT_DIR, file)
      .replace(/\\/g, "/")
      .replace(/\.md$/, "");

    const raw = readFileSync(file, "utf-8");
    const { data, content } = matter(raw);
    const body = content.trim();

    if (!body) {
      console.warn(`  skip (no body): ${id}`);
      continue;
    }

    const header = buildHeader(data);
    const text = `${header}\n\n${body}`;

    process.stdout.write(`  [${id}] ... `);

    const output = await extractor(text, { pooling: "mean", normalize: true });
    const vector = Array.from(output.data as Float32Array);

    if (vector.length !== DIMENSIONS) {
      throw new Error(
        `Expected ${DIMENSIONS}-dim vector for ${id}, got ${vector.length}`
      );
    }

    console.log(`✓ (${vector.length}d)`);
    chunks.push({
      id,
      text,
      metadata: { ...data, source: relative(CONTENT_DIR, file).replace(/\\/g, "/") },
      vector,
    });
  }

  // 4. Write index
  mkdirSync("data", { recursive: true });

  const index: EmbeddingIndex = {
    model: MODEL,
    dimensions: DIMENSIONS,
    created: new Date().toISOString(),
    chunks,
  };

  writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2));

  const sizeKb = Math.round(
    Buffer.byteLength(JSON.stringify(index)) / 1024
  );
  console.log(
    `\n✅ ${chunks.length} chunks → data/embeddings.json (${sizeKb} KB)\n`
  );
}

main().catch((err) => {
  console.error("\n❌ build-index failed:", err);
  process.exit(1);
});
