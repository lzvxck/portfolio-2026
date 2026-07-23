---
type: project
name: Trust Gate
status: production
year: 2026
tech: [TypeScript, ts-morph, Vitest, Fastify, BullMQ, PostgreSQL, Redis, Next.js, Docker, MCP]
github: github.com/lzvxck/trust-gate
---

Trust Gate is a trajectory-aware regression gate for autonomous coding agents. Agents touch code across a whole codebase, and file-proximity heuristics like "run tests near the changed files" miss regressions with indirect blast radius — a shared utility breaking something three layers away through a DI container, with nothing flagging it.

Trust Gate unions static graph analysis (diff → affected symbols → import/call graph, via ts-morph) with runtime test coverage to rank the tests actually at risk, runs them, and distinguishes a genuine pass-to-pass regression from a pre-existing failure or a merely-new test. An optional LLM judge scores the diff against an agent's own stated intent as an advisory signal.

Two entry paths land in one dataset: an agent calls it inline over MCP in its own working tree before ever opening a PR, or a GitHub App webhook runs the same engine on PR open/sync as a safety net, posting results as a GitHub Check and to a self-hosted dashboard. Benchmarked against purpose-built fixtures modeling the dynamic-import/DI blind spot: Trust Gate caught 3/3 regressions where `vitest --changed` caught 0/3. Published as `@trust-gate/cli` on npm; self-hostable via Docker Compose (dashboard, API, Postgres, Redis).
