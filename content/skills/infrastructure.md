---
type: skills
category: Infrastructure & Systems
---

Cloud and deployment: AWS (Lambda, S3, RDS, DynamoDB, SQS — intermediate), Cloudflare Workers (deployed MCP servers in production), Vercel (Next.js deployments). Docker (proficient), Kubernetes (familiar — can read and modify manifests, understand pod lifecycle and resource management).

Databases: PostgreSQL (advanced — query optimization, indexing, Row-Level Security for multi-tenancy, migrations), Qdrant (vector search — deployed in ETIP and Chainforge), Redis (caching, task queuing, pub/sub), MongoDB (familiar), DynamoDB (familiar). pgvector for vector workloads where a dedicated vector DB is overkill.

Observability: OpenTelemetry distributed tracing (implemented in Chainforge middleware), Prometheus metrics, structured logging. Experience building application-level cost and latency dashboards for LLM workloads — tracking token spend, P95 latency, and per-model costs.

Message queues and workers: Celery with Redis broker (production use in ETIP for async connector synchronization). Familiar with SQS for cloud-native async patterns.

Systems thinking: idempotent writes, retry with exponential backoff and jitter, circuit breakers, provider fallback chains (implemented in Chainforge middleware). Comfortable reasoning about consistency trade-offs in distributed systems.
