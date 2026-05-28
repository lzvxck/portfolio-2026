---
type: skills
category: AI & Machine Learning
---

Lionel's core expertise is applied AI engineering — building production systems around language models, retrieval pipelines, and autonomous agents.

LLM integration and orchestration: experience with OpenAI, Anthropic, Groq, Ollama, and open-weight models (LLaMA 3, Mistral, Qwen). Comfortable with the Vercel AI SDK, LangChain, LangGraph, and LiteLLM for provider-agnostic orchestration. Designed and implemented multi-agent systems with sequential, parallel, and LLM-driven routing patterns (see Chainforge).

Retrieval-augmented generation (RAG): end-to-end RAG system design — chunking strategy selection, embedding model evaluation, vector database trade-offs (Qdrant, pgvector, Chroma, in-memory cosine), hybrid retrieval (dense + BM25), cross-encoder reranking (ms-marco-MiniLM), and grounded prompting to prevent hallucination. Built both build-time static RAG indexes and live ingestion pipelines.

Embedding models: hands-on experience with bge-small/large, fastembed, all-MiniLM, OpenAI text-embedding-3, and running quantized ONNX models locally via @huggingface/transformers.

Agent systems: designed and benchmarked autonomous coding agents (Agent Arena), built agentic research frameworks (autonomous-ml-researcher), and deployed tool-using MCP-integrated agents in production (Chainforge, Laburen).

Security: prompt injection detection and defense — input sanitization, hierarchical instruction guards, classifier-based detection (Prompt Guard 2, Prompt Shield), and output validation. Direct production experience implementing these at Laburen.

Model internals: trained GPT-architecture models from scratch (tiny-gpt-sota), implemented GQA and FlashAttention-2, built KV cache compression with custom Triton kernels (turboquant-implementation). This depth informs how he reasons about inference cost and architecture trade-offs.

Frameworks and libraries: PyTorch, Hugging Face Transformers, LangChain, LangGraph, LiteLLM, fastembed, flashrank, Triton.
