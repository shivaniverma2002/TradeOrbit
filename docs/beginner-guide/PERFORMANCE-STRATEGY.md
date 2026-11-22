# PERFORMANCE-STRATEGY.md — Beginner-Friendly Copy

> **Learning copy notice.** This is a learning copy. No architecture decision, ID, API contract, database entity, security control, status, or requirement was changed. The current canonical document is linked at the end of this guide.

## How to use this guide

- Read the beginner explanations first, then the canonical document linked at the end of this guide.
- A status of **Decision required** means the numeric target is not agreed yet. Do not invent one.
- Performance work is measured. If there is no agreed target, you can build the mechanism but cannot claim a final pass.

## How to read the IDs in this document

| ID pattern | Plain-English meaning | What it means as development work |
|---|---|---|
| `PERF-*` | Performance/reliability requirements | Build the capability named in the row. |
| `PERF-TGT-*` | Targets framework | Ask for and record the agreed metric/target. |
| `PERF-CAP-*` | Capacity inputs | Collect vendor/SKU/order/peak numbers before load testing. |
| `PERF-FE-*` | Frontend | Optimize pages, images, bundles, feedback, accessibility. |
| `PERF-CACHE-*` | Cache/API | Cache safe reads, add rate limits, keep idempotency durable. |
| `PERF-DB-*` | Database | Add indexes, review plans, bound queries, shorten transactions. |
| `PERF-SEARCH-*` | Search | Start with full-text; add a search index after threshold. |
| `PERF-CHK-*` | Checkout | Prevent duplicate submits, handle stock contention and spikes. |
| `PERF-ASYNC-*` | Background throughput | Monitor queues, retries, dead letters, webhook volume. |
| `PERF-AVAIL-*` | Availability/recovery | Define uptime, failover, backups, PITR, restore drills. |
| `PERF-OBS-*` | Observability | Add logs, metrics, traces, dashboards, alerts. |
| `PERF-TEST-*` | Testing | Run baseline, load, stress, spike, concurrency, failover tests. |
| `PERF-SCALE-*` | Scaling triggers | Document when to scale or extract; do not build early. |
| `DEC-*` | Unresolved decisions | Blocking questions such as DEC-020 numeric targets. |

## Beginner explanations by topic

### 1. Performance and reliability requirements

**What is it?**  
Ten requirements covering speed, capacity, efficiency, observability, and recovery.

**Why do we need it?**  
A slow or unreliable marketplace loses orders and trust.

**How does it work?**  
Each row has an ID, requirement, status, and cross-reference.

**Example.**  
Checkout must stay correct when many shoppers reserve the same SKU.

**What do I need to build?**  
Targets, fast queries, caches, queues, monitoring, transactions, load tests.

**How do I test it?**  
Run the relevant test type once targets exist.

| ID | Development work |
|---|---|
| PERF-001 | Define measurable page/API latency targets. |
| PERF-002 | Optimize Core Web Vitals, caching, images, queries. |
| PERF-003 | Define capacity inputs before load testing. |
| PERF-004 | Keep search responsive and define quality/latency targets. |
| PERF-005 | Support growth with scalable architecture and capacity plans. |
| PERF-006 | Index filters/joins, review plans, bound endpoints, short transactions. |
| PERF-007 | Define uptime, failover, backups, RPO/RTO. |
| PERF-008 | Centralize logs, metrics, traces, dashboards, alerts. |
| PERF-009 | Use transactions, retries, idempotency, queue monitoring, degradation, DLQ. |
| PERF-010 | Load test browse/search/checkout/flash-sale/concurrency paths. |

### 2. Strategy overview

**What is it?**  
A picture of how a request flows through CDN, cache, database, queues, and monitoring.

**Why do we need it?**  
It shows where speed comes from and where problems can hide.

**How does it work?**  
Public files come from CDN; safe reads from Redis; authoritative data from PostgreSQL; side effects via workers.

**Example.**  
A product page image comes from CDN; price comes from a server calculation, not cache guesswork.

**What do I need to build?**  
Each layer in the diagram with its stated treatment.

**How do I test it?**  
Trace one request and confirm cache hits/misses, query plan, and metrics are visible.

### 3. Performance targets framework

**What is it?**  
A list of metrics that need agreed numbers.

**Why do we need it?**  
Without numbers, “fast enough” cannot be tested.

**How does it work?**  
Each metric area has a target-setting requirement and a decision dependency.

**Example.**  
API latency percentiles for product listing, quote, and order creation.

**What do I need to build?**  
A targets register filled after DEC-008/009/020/023.

**How do I test it?**  
Check each target has an owner, value, measurement method, and alert.

| ID | Development work |
|---|---|
| PERF-TGT-001 | Define storefront page responsiveness targets. |
| PERF-TGT-002 | Define API latency percentiles. |
| PERF-TGT-003 | Define search quality/speed thresholds. |
| PERF-TGT-004 | Define checkout throughput and degradation behaviour. |
| PERF-TGT-005 | Define inventory contention behaviour; no oversell beyond rules. |
| PERF-TGT-006 | Define queue backlog/staleness limits. |
| PERF-TGT-007 | Define availability objectives. |
| PERF-TGT-008 | Define RPO/RTO, backup frequency, restore cadence. |
| PERF-TGT-009 | Define browsers, breakpoints, device expectations. |

### 4. Capacity planning

**What is it?**  
Collecting the numbers needed to size the system.

**Why do we need it?**  
Load tests and scaling plans need realistic inputs.

**How does it work?**  
Gather vendors, SKUs, orders, peak users, growth, hosting preference, topology.

**Example.**  
Peak concurrent shoppers during a flash sale drives web/API scaling.

**What do I need to build?**  
A capacity document and derived scenarios/sizing assumptions.

**How do I test it?**  
Compare test load to the agreed capacity inputs.

| ID | Development work |
|---|---|
| PERF-CAP-001 | Collect expected vendors, SKUs, catalogue growth. |
| PERF-CAP-002 | Collect monthly orders and peak order rate. |
| PERF-CAP-003 | Collect peak concurrent users. |
| PERF-CAP-004 | Collect growth forecast. |
| PERF-CAP-005 | Collect hosting preference, budget, team, timeline, support model. |
| PERF-CAP-006 | Collect load balancer/autoscaling/failover topology. |

### 5. Frontend and storefront performance

**What is it?**  
Making pages feel quick and accessible.

**Why do we need it?**  
Shoppers leave slow pages; accessibility must survive slow conditions.

**How does it work?**  
Track Core Web Vitals, optimize images, split bundles, set cache headers, show immediate feedback.

**Example.**  
Add to cart responds instantly in UI while totals still come from the server.

**What do I need to build?**  
LCP/INP/CLS instrumentation, responsive images, lazy loading, route splitting, clear loading/error states.

**How do I test it?**  
Run frontend Core Web Vitals and accessibility tests at agreed breakpoints.

| ID | Development work |
|---|---|
| PERF-FE-001 | Instrument Core Web Vitals for key pages. |
| PERF-FE-002 | Use optimized formats, responsive sizes, lazy loading, CDN, alt text. |
| PERF-FE-003 | Use server rendering/static generation where useful. |
| PERF-FE-004 | Split code by route/feature; keep admin code off public storefront. |
| PERF-FE-005 | Define public/private cache headers. |
| PERF-FE-006 | Show immediate feedback but rely on server totals/idempotent submit. |
| PERF-FE-007 | Keep accessible loading/error/focus/validation states under slow conditions. |

### 6. API and caching strategy

**What is it?**  
Reusing safe results and protecting APIs from overload.

**Why do we need it?**  
Fewer repeated queries means faster responses and less database load.

**How does it work?**  
Cache safe public reads; invalidate on status changes; keep idempotency records durable.

**Example.**  
A product publish change clears product detail, listing, search, and homepage groupings caches.

**What do I need to build?**  
Cache keys, invalidation triggers, Redis rate limits, durable idempotency store, signed URLs.

**How do I test it?**  
Publish a product and confirm stale cache is gone; replay cart request and confirm no cached authoritative total.

| ID | Development work |
|---|---|
| PERF-CACHE-001 | Cache safe public catalogue/category/content reads. |
| PERF-CACHE-002 | Cache common search shapes only where correctness permits. |
| PERF-CACHE-003 | Use secure short-lived session/token state. |
| PERF-CACHE-004 | Redis-backed rate limiting once limits agreed. |
| PERF-CACHE-005 | Store idempotency records durably, not only in cache. |
| PERF-CACHE-006 | Do not cache authoritative availability without freshness strategy. |
| PERF-CACHE-007 | Cache only non-authoritative cart/checkout UI state. |
| PERF-CACHE-008 | Public media through CDN; private documents by signed URLs. |

### 7. Database performance

**What is it?**  
Keeping queries and transactions efficient.

**Why do we need it?**  
A slow query or long transaction can block checkout.

**How does it work?**  
Use the ERD index intents, review plans, bound lists, keep transactions short, monitor health.

**Example.**  
Order lookup by user, order number, status, vendor, placed date uses a composite index.

**What do I need to build?**  
Indexes, pagination/filters, short transactions, decimal money columns, monitoring, restore timing.

**How do I test it?**  
Run `EXPLAIN`/query plan reviews and slow-query checks.

| ID | Development work |
|---|---|
| PERF-DB-001 | Index common filters/joins using DB-IDX-* intents. |
| PERF-DB-002 | Review plans for search, order queues, inventory, ledger, audit. |
| PERF-DB-003 | Avoid unbounded endpoints; require pagination and allow-listed filters. |
| PERF-DB-004 | Keep checkout/reservation/payment/refund/ledger transactions short. |
| PERF-DB-005 | Use fixed-precision decimal money columns and explicit currency codes. |
| PERF-DB-006 | Keep immutable ledger appends efficient and protected. |
| PERF-DB-007 | Separate/index reporting reads if dashboards impact transactions. |
| PERF-DB-008 | Monitor connections, slow queries, locks, replication lag, health. |
| PERF-DB-009 | Test backup/restore performance once RPO/RTO agreed. |

### 8. Search performance and scaling

**What is it?**  
Finding products quickly and correctly.

**Why do we need it?**  
Catalogue growth makes naive search slow.

**How does it work?**  
Start with PostgreSQL full-text; move to OpenSearch/Elasticsearch after agreed threshold.

**Example.**  
After moderation hides a product, search must not keep showing it.

**What do I need to build?**  
Full-text search, visibility-triggered indexing, aligned facets, quality targets.

**How do I test it?**  
Moderate a product and confirm it disappears from search.

| ID | Development work |
|---|---|
| PERF-SEARCH-001 | Start with PostgreSQL full-text where sufficient. |
| PERF-SEARCH-002 | Move to dedicated index only after threshold. |
| PERF-SEARCH-003 | Update search documents on approved visibility changes. |
| PERF-SEARCH-004 | Keep facets/filters aligned with API contracts/indexed fields. |
| PERF-SEARCH-005 | Define typo/synonym/relevance targets. |
| PERF-SEARCH-006 | Avoid stale product visibility after moderation/suspension. |

### 9. Checkout, inventory and flash-sale resilience

**What is it?**  
Keeping checkout correct under pressure.

**Why do we need it?**  
Duplicate clicks and stock races cause real business errors.

**How does it work?**  
Idempotency keys, atomic reservation, timeouts, queue side effects after commit, accurate states.

**Example.**  
Two requests with the same key create one order and one reservation.

**What do I need to build?**  
Duplicate-click protection, atomic stock reservation, expiry release, verified webhooks, load scenarios.

**How do I test it?**  
Concurrent reserve/submit tests and flash-sale spike tests.

| ID | Development work |
|---|---|
| PERF-CHK-001 | Require idempotency keys and duplicate-click protection. |
| PERF-CHK-002 | Atomic reservation, expiry/release, controlled oversell rules. |
| PERF-CHK-003 | Timeouts, bounded retries, status polling, verified webhooks. |
| PERF-CHK-004 | Queue non-critical side effects after commit; monitor backlog. |
| PERF-CHK-005 | Show accurate pending/failed states; no early success claim. |
| PERF-CHK-006 | Define flash-sale load scenarios/degradation after capacity inputs. |
| PERF-CHK-007 | Clean stale carts/reservations on schedule. |

### 10. Asynchronous throughput and reliability

**What is it?**  
Keeping background work healthy.

**Why do we need it?**  
A growing queue can delay notifications and exports.

**How does it work?**  
Monitor depth/age/rate, bounded retries with backoff, dead-letter queue, dedupe webhooks.

**Example.**  
A bad export job goes to DLQ and can be replayed safely after a fix.

**What do I need to build?**  
Queue metrics, retry policy, DLQ, webhook persistence, consent-aware channel queues, scheduling locks.

**How do I test it?**  
Force repeated failures and confirm DLQ routing and replay.

| ID | Development work |
|---|---|
| PERF-ASYNC-001 | Monitor depth, age, processing rate, oldest job age. |
| PERF-ASYNC-002 | Bounded retries with exponential backoff and jitter. |
| PERF-ASYNC-003 | Route unprocessable jobs to inspectable DLQ with safe replay. |
| PERF-ASYNC-004 | Persist webhook event first; dedupe by provider event ID. |
| PERF-ASYNC-005 | Queue notifications by channel/provider; respect consent/limits. |
| PERF-ASYNC-006 | Run exports/invoices/status jobs asynchronously with references. |
| PERF-ASYNC-007 | Coordinate scheduled tasks to avoid duplicates. |

### 11. Availability, failover and recovery

**What is it?**  
Staying usable and recovering after failure.

**Why do we need it?**  
Providers and infrastructure can fail.

**How does it work?**  
Define SLO, maintenance, failover; degrade safely; back up; test restore.

**Example.**  
If email provider is down, orders still place and notifications queue.

**What do I need to build?**  
Backups, encrypted storage, failover design, PITR if agreed, restore drills, RPO/RTO verification.

**How do I test it?**  
Run restore drill and simulate dependency failure.

| ID | Development work |
|---|---|
| PERF-AVAIL-001 | Define uptime SLO after review. |
| PERF-AVAIL-002 | Agree maintenance windows and communication. |
| PERF-AVAIL-003 | Decide load balancer/autoscaling/failover topology. |
| PERF-AVAIL-004 | Continue safe browsing; queue notifications; expose outages accurately. |
| PERF-AVAIL-005 | Automated encrypted backups with controlled retention. |
| PERF-AVAIL-006 | PITR where supported and decided. |
| PERF-AVAIL-007 | Restore drills before launch and on agreed cadence. |
| PERF-AVAIL-008 | Define and verify RPO/RTO. |

### 12. Observability and alerting

**What is it?**  
Signals that tell you how the system behaves.

**Why do we need it?**  
You cannot fix what you cannot see.

**How does it work?**  
Track latency, errors, saturation, traffic, provider health, business events; propagate correlation IDs.

**Example.**  
Alert on payment failures, webhook failures, stuck orders, oversell conflicts, queue backlog.

**What do I need to build?**  
Structured logs, metrics, traces, dashboards, alerts, correlation propagation.

**How do I test it?**  
Trigger a test failure and confirm the right alert fires with a correlation ID.

| ID | Development work |
|---|---|
| PERF-OBS-001 | Track latency by endpoint/journey. |
| PERF-OBS-002 | Track HTTP errors, validation/business failures, exceptions. |
| PERF-OBS-003 | Track CPU/memory, DB connections, queue depth, cache health, provider limits. |
| PERF-OBS-004 | Track requests/search/checkout rates by surface. |
| PERF-OBS-005 | Track provider success/failure and latency. |
| PERF-OBS-006 | Alert on payment/webhook failures, stuck orders, oversell, backlog, reconciliation exceptions. |
| PERF-OBS-007 | Propagate correlation IDs through APIs/logs/traces/queues/adapters. |
| PERF-OBS-008 | Provide operational dashboards. |
| PERF-OBS-009 | Alert against agreed SLOs after decisions. |

### 13. Testing strategy

**What is it?**  
Different tests for different performance risks.

**Why do we need it?**  
Average load, sudden spikes, and long runs reveal different problems.

**How does it work?**  
Run baseline, load, stress, spike, concurrency, endurance, failover, frontend tests.

**Example.**  
Concurrency test: two users reserve the last unit; only one succeeds.

**What do I need to build?**  
Test scripts, environments, target thresholds, evidence reports.

**How do I test it?**  
Execute the tests; final pass/fail waits for DEC-008/009/020/023 targets.

| ID | Development work |
|---|---|
| PERF-TEST-001 | Baseline key page/API timings. |
| PERF-TEST-002 | Load test expected concurrent users/journeys. |
| PERF-TEST-003 | Stress test beyond expected load. |
| PERF-TEST-004 | Spike/flash-sale test where in scope. |
| PERF-TEST-005 | Concurrency: reservation, idempotent submit, webhook duplicates. |
| PERF-TEST-006 | Endurance test for leaks/queue growth. |
| PERF-TEST-007 | Failover/restore test. |
| PERF-TEST-008 | Frontend Core Web Vitals/responsive/browser test. |

### 14. Scaling and extraction triggers

**What is it?**  
Conditions that may justify changing the deployment shape later.

**Why do we need it?**  
It avoids premature complexity while planning for growth.

**How does it work?**  
Each trigger names a candidate response and a status.

**Example.**  
If reporting queries hurt transactions, introduce read models/reporting store.

**What do I need to build?**  
Nothing yet. Record triggers in ADRs.

**How do I test it?**  
During reviews, check whether a trigger was reached before extracting.

| ID | Development work |
|---|---|
| PERF-SCALE-001 | Future dedicated search index and async indexing. |
| PERF-SCALE-002 | Future read models/reporting store. |
| PERF-SCALE-003 | Future independent notification scaling/extraction. |
| PERF-SCALE-004 | Future separate webhook processing unit. |
| PERF-SCALE-005 | Future checkout/order extraction behind stable APIs. |
| PERF-SCALE-006 | Future multi-region evaluation. |

### 15. Performance decision gates

**What is it?**  
Decisions that block final targets and plans.

**Why do we need it?**  
They stop teams from guessing numbers or topology.

**How does it work?**  
Each `DEC-*` row names what is needed and what it blocks.

**Example.**  
DEC-020 blocks final acceptance thresholds.

**What do I need to build?**  
Decision log and blocked tickets.

**How do I test it?**  
Confirm no test asserts an invented numeric target.

### 16. Traceability

**What is it?**  
A map from source sections to performance IDs.

**Why do we need it?**  
It shows coverage of NFRs, QA, and DevOps areas.

**How does it work?**  
Read the table and open the linked IDs/documents.

**Example.**  
§10 testing and QA → PERF-010 and AC-QA-005.

**What do I need to build?**  
Cross-links in docs and tickets.

**How do I test it?**  
Pick a source area and confirm linked performance IDs exist.

## Simple glossary

| Term | Simple meaning |
|---|---|
| modular monolith | One deployed backend, split internally into strict business modules. |
| REST API | HTTP endpoints using methods like GET, POST, PATCH, DELETE. |
| OpenAPI | A machine-readable description of API paths, schemas, and errors. |
| DTO | Data Transfer Object: a validated object used at the API boundary. |
| RBAC | Role-Based Access Control: permissions are attached to roles. |
| idempotency | Doing the same request twice has the same effect as doing it once. |
| webhook | A callback where a provider sends an event to your API. |
| queue | A list of background jobs waiting to be processed. |
| worker | A process that takes jobs from a queue and executes them. |
| cache | A fast temporary store for data that is safe to reuse. |
| Redis | In-memory data store used here for cache, rate limits, queues. |
| BullMQ | A Node.js queue library commonly used with Redis. |
| Prisma / ORM | Prisma maps application objects to database rows; an ORM is that mapping layer. |
| migration | A versioned script that changes database structure. |
| ERD | Entity Relationship Diagram: boxes for data entities and lines for relationships. |
| foreign key | A field that points to a row in another table. |
| index | A database helper that makes common lookups faster. |
| transaction | A group of database changes that all succeed or all fail together. |
| CI/CD | Automated build/test (CI) and automated delivery (CD). |
| SLO | Service Level Objective: an agreed reliability target. |
| RPO/RTO | Recovery Point Objective (max data loss) / Recovery Time Objective (max downtime). |
| TLS | Encryption for data in transit; HTTPS uses TLS. |
| CSRF | Cross-Site Request Forgery: a trick that makes a user's browser send unwanted requests. |
| XSS | Cross-Site Scripting: injecting harmful script into a page. |
| SQL injection | Injecting SQL through input to read or change data illegally. |
| secrets manager | A secure store for API keys, passwords, and tokens. |
| tokenization | Replacing sensitive data with a safe reference/token. |
| Core Web Vitals | User-experience metrics such as LCP, INP, CLS. |
| LCP / INP / CLS | Loading speed / interaction responsiveness / visual stability. |
| CDN | Content Delivery Network: cached public files served close to users. |
| WAF | Web Application Firewall that filters harmful web traffic. |
| SSR / SSG | Server-side rendering / static site generation. |
| connection pooling | Reusing database connections instead of opening new ones each time. |
| percentile | A value below which a share of requests fall, e.g. p95. |
| backoff | Waiting longer between retries to avoid overload. |
| jitter | Random variation added to retry delays. |
| dead-letter queue | A queue for jobs that cannot be processed after retries. |
| PITR | Point-in-time recovery: restoring to a chosen moment. |
| observability | Logs, metrics, traces, and alerts that explain system behaviour. |
| dependency degradation | Continuing safe parts of service when a provider fails. |
| extraction trigger | A measured condition that justifies splitting a module into a service. |

## Current status note (2026-11-22)

The beginner explanations above reflect the earlier project state. Current approved G1–G8 decisions are in `../requirements/SRS.md` §12A and `../audits/AUTHENTICATION-IMPLEMENTATION-PLAN.md`. Where those explanations say MFA, guest checkout, Google sign-in, admin portal topology, or package manager are pending, use the approved decisions. Transactional notifications are mandatory; other marketing features remain conditional unless separately decided.

## Canonical source

The explanations above introduce the performance goals and identifier patterns. The complete performance document is [PERFORMANCE-STRATEGY.md](../architecture/PERFORMANCE-STRATEGY.md). That canonical file is the source of truth for performance targets, PERF identifiers, and performance decisions.