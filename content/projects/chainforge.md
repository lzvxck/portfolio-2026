---
type: project
name: Chainforge
status: production
year: 2026
tech: [Go, LLM, MCP, Qdrant, PostgreSQL, Redis, SQLite, OpenTelemetry, Prometheus]
github: github.com/lzvxck/chainforge
---

Chainforge is a provider-agnostic Go framework for building high-performance AI agents and orchestrating LLM chains. It abstracts away direct SDK interactions so developers can swap between Anthropic, OpenAI, Ollama, and Gemini with minimal code changes.

The framework supports sequential pipelines, parallel fan-out, and LLM-driven routing — multiple tool calls execute in concurrent goroutines for maximum throughput. It integrates natively with the Model Context Protocol (MCP), connecting to both HTTP and stdio-based MCP servers. The memory subsystem is fully pluggable, with implementations for in-memory, SQLite, PostgreSQL, Redis, and Qdrant vector stores.

The middleware stack covers the full production requirements: retry logic with backoff, structured logging, OpenTelemetry distributed tracing, rate limiting, Prometheus metrics, and provider fallback chains. Streaming is handled via real-time event channels with accumulated token tracking. Tool schemas are validated through a typed builder that generates from struct tags.

The core package (`pkg/core`) has zero external dependencies — the entire provider/tool interface is defined in pure Go, with concrete adapters kept separate. Agent loop benchmarks range from ~5µs to ~264µs depending on concurrency; memory append operations achieve zero allocations.

Architecture:
- `pkg/core` — provider and tool interfaces
- `pkg/providers` — LLM adapters (Anthropic, OpenAI, Ollama, Gemini)
- `pkg/memory` — pluggable storage backends
- `pkg/middleware` — logging, retry, tracing, rate limiting
- `pkg/orchestrator` — multi-agent patterns (sequential, parallel, router)
- `pkg/server` — HTTP/SSE server for streaming
