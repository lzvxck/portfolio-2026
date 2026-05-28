---
type: project
name: AI Portfolio (this site)
status: production
year: 2025
tech: [Next.js, TypeScript, Groq, LLaMA 3.1, bge-small-en-v1.5, ONNX, Tailwind CSS, Vercel, Framer Motion]
github: github.com/lzvxck/portfolio-2026
url: ""
---

Lionel's personal portfolio site, built in Next.js 16 (App Router) with a production-grade RAG chat interface as the primary UI. Instead of a traditional portfolio page, the site is a full-screen chat experience — visitors ask natural-language questions about his background and receive grounded, streamed answers.

The RAG pipeline is fully build-time: content is authored in Markdown with structured frontmatter, embedded at build time using a local ONNX model (bge-small-en-v1.5, 384-dim, ~32 MB), and stored as a static JSON index committed to the deploy artifact. At query time, the chat route performs in-memory cosine similarity — no vector database, no external embedding API, zero per-query cost. The same model family is used for both corpus and query embedding to guarantee vector compatibility.

The guardrail stack has six layers: per-IP in-memory rate limiting, Prompt Guard 2 injection detection (llama-prompt-guard-2-22m via Groq, $0.03/1M tokens), intent classification, similarity threshold gate (rejects off-topic queries that retrieve nothing above 0.35 cosine similarity), strict grounded system prompt, and a single canned refusal that reveals nothing about which layer fired. Streaming chat completions use llama-3.1-8b-instant via Groq's LPU inference at ~500 tokens/second.

Design: monochrome dark system (Geist fonts, Tailwind 4 CSS variables, shadcn/ui base components), with Framer Motion entrance animations. Deployed on Vercel Hobby — zero cost in normal operation; the only variable expense is Groq token usage.
