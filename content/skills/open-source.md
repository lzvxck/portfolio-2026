---
type: skills
category: Open Source Contributions
---

Lionel contributes to open-source AI infrastructure projects outside his own repositories.

xmcp (basement.studio's TypeScript framework for building MCP servers): fixed ambient injected global type declarations, added a `validate` CLI command for static linting of tool/resource/prompt files, and added a compiler warning for a missing default export.

Unsloth AI: added DoRA (weight-decomposed LoRA) as a fourth training variant in Unsloth's Studio fine-tuning UI, alongside LoRA, RS-LoRA, and LoftQ.

Vercel: fixed a request-time module-path resolution bug causing a 500 on eve's schedule-dispatch route, and centralized configuration handling in next-devtools-mcp.

Model Context Protocol (Anthropic's official reference servers repository): implemented read-write query support for the Postgres MCP server.

OpenAgents: fixed missing authentication on the workspace-delete endpoint and a file path traversal vulnerability in the workspace backend.
