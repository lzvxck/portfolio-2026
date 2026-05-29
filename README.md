# portfolio-2026

AI-powered personal portfolio for [Lionel Arce](https://github.com/lzvxck). The entire site is a full-screen RAG chat — ask anything about his experience, projects, or skills and get grounded, streaming answers.

## Stack

- **Next.js 16** (App Router, Node runtime for the chat route)
- **Groq** — `llama-3.1-8b-instant` for streaming chat completions
- **Build-time RAG** — `bge-small-en-v1.5` ONNX model embeds the Markdown knowledge base at build time into `data/embeddings.json`; in-memory cosine similarity at runtime
- **Tailwind CSS v4** + **shadcn/ui** — monochrome dark design system
- **Framer Motion** — entrance animations, composer position transition
- **react-markdown** + **remark-gfm** — renders assistant responses as formatted Markdown
- **bun** — package manager and script runner

## How it works

```
content/**/*.md  →  scripts/build-index.ts  →  data/embeddings.json
                                                        ↓
POST /api/chat  →  rate limit  →  intent gate  →  cosine retrieval
                →  threshold gate  →  Groq streamText  →  text stream
```

**Build time:** Markdown files are parsed with `gray-matter`, embedded with `bge-small-en-v1.5` (384-dim, int8 ONNX, ~32 MB), L2-normalized, and written to `data/embeddings.json`.

**Runtime (per request):**
1. Rate limit (in-memory sliding window per IP)
2. Injection/jailbreak heuristic gate (18 regex patterns)
3. Embed query with the same model
4. Cosine similarity over in-memory index → top-8 chunks
5. Similarity threshold gate (≥ 0.35) — off-topic queries return a canned refusal without calling Groq
6. Grounded `streamText` → manual `ReadableStream` with `X-Accel-Buffering: no`

The client reveals responses character by character via `setInterval` to simulate real token streaming.

## Guardrails

All free-tier, no external services:

| Layer | Mechanism |
|---|---|
| Rate limit | In-memory sliding window per IP |
| Injection detection | Regex heuristics (18 patterns) |
| Off-topic gate | Cosine similarity threshold |
| Grounding | System prompt with strict context boundary |
| Refusal | Static canned response — no Groq call |

## Local development

```bash
# 1. Install dependencies
bun install

# 2. Set environment variables
cp .env.example .env
# Add your GROQ_API_KEY

# 3. Build the embedding index
bun run build:index

# 4. Start the dev server
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `GROQ_API_KEY` | Yes | — | Groq API key |
| `SIMILARITY_THRESHOLD` | No | `0.35` | Minimum cosine score to pass the retrieval gate |
| `RAG_TOP_K` | No | `8` | Number of chunks retrieved per query |
| `RATE_LIMIT_MAX` | No | `20` | Max requests per window per IP |
| `RATE_LIMIT_WINDOW_MS` | No | `60000` | Rate limit window in milliseconds |

## Content

The knowledge base lives in `content/` as Markdown files with YAML frontmatter:

```
content/
├── profile.md
├── experience/
├── projects/
├── skills/
├── education/
└── certifications/
```

To update content: edit or add Markdown files, then run `bun run build:index` to rebuild the embedding index. On Vercel, the `prebuild` hook does this automatically on every deploy.

## Deployment

Deploy to Vercel. Set `GROQ_API_KEY` in environment variables. Everything else is zero-config — the embedding index is a static artifact bundled with the deployment.
