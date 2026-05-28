---
type: project
name: Agent Arena
status: production
year: 2025
tech: [Python, LangGraph, Benchmarking, Autonomous Agents]
github: github.com/lzvxck/agent-arena
---

Agent Arena is a benchmarking platform for autonomous coding agents. It provides a structured environment for evaluating agent performance across standardized tasks — measuring capabilities like code generation correctness, multi-step reasoning, tool use accuracy, and task completion rate under controlled conditions.

The platform is designed to make agent evaluation reproducible and comparable: the same task suite runs against different agent architectures (LangGraph-based, raw API loop, custom orchestrators) and different underlying models, producing metrics that can be tracked over time. This is useful both for selecting the right agent design for a specific use case and for tracking regression as models or prompts change.

Related projects include `autonomous-ml-researcher`, an agentic framework that runs autonomous research cycles — literature search, hypothesis generation, experiment design, and synthesis — and `websearch-ng`, a self-hosted AI search engine with parallel web search and semantic reranking.
