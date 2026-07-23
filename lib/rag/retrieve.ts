import {
  pipeline,
  env,
  type FeatureExtractionPipeline,
} from "@huggingface/transformers";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// On Vercel, model cache must live in writable /tmp
if (process.env.VERCEL) env.cacheDir = "/tmp/transformers";

const MODEL = "Xenova/bge-small-en-v1.5";

export type Chunk = {
  id: string;
  text: string;
  metadata: Record<string, unknown>;
  vector: number[];
};

type EmbeddingIndex = {
  model: string;
  dimensions: number;
  chunks: Chunk[];
};

export type ScoredChunk = Chunk & { score: number };

// Module-scope singletons — Fluid Compute warm instances reuse these
let index: EmbeddingIndex | null = null;
let extractor: FeatureExtractionPipeline | null = null;

function getIndex(): EmbeddingIndex {
  if (!index) {
    const raw = readFileSync(
      join(process.cwd(), "data", "embeddings.json"),
      "utf-8"
    );
    index = JSON.parse(raw) as EmbeddingIndex;
    if (index.model !== MODEL) {
      throw new Error(
        `Embedding model mismatch: index uses "${index.model}", runtime uses "${MODEL}". Rebuild the index.`
      );
    }
  }
  return index;
}

async function getExtractor(): Promise<FeatureExtractionPipeline> {
  if (!extractor) {
    extractor = (await pipeline("feature-extraction", MODEL, {
      dtype: "q8",
    })) as FeatureExtractionPipeline;
  }
  return extractor;
}

// Dot product of two L2-normalized vectors == cosine similarity
function dot(a: number[], b: number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += a[i] * b[i];
  return sum;
}

export async function retrieve(
  query: string,
  topK = 8,
  threshold = 0.49
): Promise<ScoredChunk[]> {
  const idx = getIndex();
  const embed = await getExtractor();

  const out = await embed(query, { pooling: "mean", normalize: true });
  const queryVec = Array.from(out.data as Float32Array);

  return idx.chunks
    .map((chunk) => ({ ...chunk, score: dot(queryVec, chunk.vector) }))
    .filter((c) => c.score >= threshold)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}
