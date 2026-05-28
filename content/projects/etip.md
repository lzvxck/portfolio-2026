---
type: project
name: ETIP — Enterprise Talent Intelligence Platform
status: production
year: 2025
tech: [Python, FastAPI, Next.js, TypeScript, PostgreSQL, Qdrant, Redis, Celery, LiteLLM, fastembed, flashrank]
github: github.com/lzvxck/etip
---

ETIP is a talent management platform that matches engineering professionals to projects by inferring skills from actual work history rather than self-assessment. It consolidates employee data from GitHub (repositories, languages, pull request activity) and Jira (issue assignments, labels, components) into a connected employee-skill graph aligned to the ESCO taxonomy.

The matching pipeline is multi-stage: project managers specify required competencies, and the system returns ranked candidates using vector similarity search (Qdrant + fastembed), skill overlap scoring, cross-encoder reranking (ms-marco-MiniLM), and LLM-generated natural-language justifications via LiteLLM. Recommendations are also allocation-aware — availability is calculated from current assignments with business-day overlap, so the system filters out overallocated engineers automatically.

The architecture is multi-tenant from the ground up: PostgreSQL Row-Level Security provides complete data isolation between organizations in a single deployment. Celery workers handle connector synchronization (GitHub/Jira ingestion) asynchronously, keeping the FastAPI backend responsive. The frontend is Next.js 15 with TanStack Query for data fetching.

Tech stack: Python 3.12, FastAPI, SQLAlchemy, Celery, fastembed, Qdrant, flashrank, LiteLLM, PostgreSQL 16 + pgvector, Redis, Next.js 15, TypeScript, Tailwind CSS.
