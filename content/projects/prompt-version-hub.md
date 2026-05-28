---
type: project
name: Prompt Version Hub
status: production
year: 2024
tech: [TypeScript, Next.js, PostgreSQL, REST API]
github: github.com/lzvxck/prompt-version-hub
---

Prompt Version Hub is a platform for prompt lifecycle management: building, versioning, testing, and deploying prompts across LLM-powered applications. It treats prompts as first-class software artifacts with version history, diff views, rollback, and environment promotion (dev → staging → production).

The core insight is that prompt engineering at scale has the same problems as software engineering — you need version control, change review, and safe deployment workflows. Without tooling, teams end up with prompts hardcoded in application code or stored informally in documents, making it impossible to audit what changed when a model's behavior shifts.
