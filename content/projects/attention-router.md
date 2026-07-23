---
type: project
name: PR Attention Router
status: production
year: 2026
tech: [TypeScript, Next.js, Groq, LLM, GitHub Apps, PostgreSQL, GitHub Actions]
github: github.com/lzvxck/attention-router
---

PR Attention Router is a GitHub App that scores every pull request into a risk tier — auto-mergeable, quick-glance, or deep-review — with a rationale, calibrated against that specific repository's real revert history. Rather than another generic diff-reading review bot, it routes reviewer attention based on where a repo's own revert history shows review time actually matters.

On every PR open or update, it fetches the changed files, pulls the repo's historical revert rate for matching file-path patterns, and asks an LLM (via Groq) for a structured verdict — tier, confidence, rationale, and key risk factors — posted directly as a GitHub Check. When a PR is later reverted through GitHub's native revert flow, the original PR is marked reverted and the file-pattern calibration updates, so a similar change is judged with that history in mind next time.

Ships a public dashboard with a curated demo repository, and a signed-in view scoped to whichever repos a user has installed the App on via GitHub OAuth. Built using a structured agentic development loop (explore → plan → execute → verify) with custom subagents for implementation and review.
