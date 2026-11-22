# SYSTEM-ARCHITECTURE.md — Beginner-Friendly Copy

> **Learning copy notice.** This is a learning copy. No architecture decision, ID, API contract, database entity, security control, status, or requirement was changed. The current canonical document is linked at the end of this guide.

## How to use this guide

- Read the beginner sections first.
- Then read the canonical document linked at the end of this guide.
- Treat the canonical document as the source of truth.
- The beginner sections only explain it in simpler words.

## How to read the IDs in this document

| ID pattern | Plain-English meaning | What it means as development work |
|---|---|---|
| `ARC-001`–`ARC-008` | Whole-system architecture statements | Set up the overall shape of the backend, APIs, data stores, and rules. |
| `ARC-PRES-*` | Presentation (screens clients use) | Build the storefront, vendor portal, admin console, or optional mobile apps. |
| `ARC-DOMAIN-*` | Backend domain modules | Create a folder/module that owns one business area and its data. |
| `ARC-ASYNC-*` | Background work | Build queues, workers, scheduled jobs, and webhook handling. |
| `ARC-DATA-*` | Data storage choices | Choose and configure PostgreSQL, Redis, object storage, CDN, search, backups. |
| `INT-*` | External integrations | Write adapters for payment, courier, email, SMS, tax, analytics, ERP. |
| `ARC-DEP-*` | Deployment | Create environments, Docker images, CI pipeline, monitoring, rollback. |
| `ARC-ADR-*` | Architecture Decision Records | Write short decision notes with context, choice, consequences, and alternatives. |
| `ARC-EXT-*` | Future extraction options | Do not build now; document when a module could be split into its own service. |
| `DEC-*` | Unresolved decisions | Ask for a decision before building the dependent feature. |

## Beginner explanations by topic

### 1. Architecture intent

**What is it?**  
A short list of rules for how TradeOrbit is shaped.

**Why do we need it?**  
So every developer builds the same kind of system.

**How does it work?**  
Each idea gets an ID, a status, and a cross-reference to requirements.

**Example (TradeOrbit marketplace).**  
One backend app, many modules: catalogue, cart, checkout, orders, payments.

**What do I need to build?**  
A modular monolith: one deployable backend with strict module borders.

**How do I test it?**  
Check the module folders exist, tests run per module, and protected APIs check permissions.

| ID | Development work |
|---|---|
| ARC-001 | Create one backend app organised into strict domain modules. |
| ARC-002 | Keep modules isolated so a busy module can be extracted later. |
| ARC-003 | Expose one versioned API used by web and optional mobile clients. |
| ARC-004 | Use PostgreSQL, Redis, object storage, and optional search. |
| ARC-005 | Enforce login and permissions on every protected operation. |
| ARC-006 | Do immediate work synchronously; do side effects in queues. |
| ARC-007 | Keep audit records and financial history immutable. |
| ARC-008 | Do not invent answers for unresolved `DEC-*` items. |

### 2. System context

**What is it?**  
A map of who uses TradeOrbit and what they talk to.

**Why do we need it?**  
It shows that all user groups reach the same backend API.

**How does it work?**  
Clients call the versioned API; the API calls domain modules; modules call data stores and providers.

**Example.**  
A vendor updates stock in the vendor portal → API → catalogue/inventory modules → PostgreSQL.

**What do I need to build?**  
Storefront, vendor portal, admin console, API layer, module layer, and provider adapters.

**How do I test it?**  
Draw the request path for one journey and confirm each hop exists in code.

### 3. Presentation architecture

**What is it?**  
The screens and UI components users see.

**Why do we need it?**  
Different users need different tools, but consistent look and behaviour.

**How does it work?**  
Each client uses the same versioned API contract. The design system shares components.

**Example.**  
The storefront shows a price, but the server calculates the final payable amount.

**What do I need to build?**  
Customer storefront, vendor portal, admin console, design system, and accessible responsive forms.

**How do I test it?**  
Check permissions in UI, confirm no client-side final totals, test mobile widths and accessibility.

| ID | Development work |
|---|---|
| ARC-PRES-001 | Build the public customer storefront. |
| ARC-PRES-002 | Build the vendor portal. |
| ARC-PRES-003 | Build the admin console. |
| ARC-PRES-004 | Only build mobile apps if the decision is confirmed. |
| ARC-PRES-005 | Build a shared design system. |
| ARC-PRES-RULE-001 | Never trust client-calculated totals, tax, commission, or stock. |
| ARC-PRES-RULE-002 | Add permission checks and possible step-up authentication for sensitive admin actions. |
| ARC-PRES-RULE-003 | Reuse the same API contracts for web and optional mobile. |
| ARC-PRES-RULE-004 | Wait for the portal decomposition decision. |

### 4. Application and domain architecture

**What is it?**  
The backend split into business areas called domain modules.

**Why do we need it?**  
Small borders make code easier to test, own, and later split into services.

**How does it work?**  
A module owns its data. Other modules call it through interfaces or events, not direct writes.

**Example.**  
The checkout module asks inventory to reserve stock; it does not edit inventory tables itself.

**What do I need to build?**  
One module per business area listed below, with explicit interfaces and tests.

**How do I test it?**  
Try a cross-module write in a test and confirm it is blocked by the boundary rule.

| ID | Development work |
|---|---|
| ARC-DOMAIN-IDENTITY | Users, login, roles, permissions, consents. |
| ARC-DOMAIN-VENDOR | Vendor onboarding, KYC state, store profile, staff. |
| ARC-DOMAIN-CATALOGUE | Products, variants, media, categories, moderation. |
| ARC-DOMAIN-PRICING | Prices, coupons, campaigns, calculation audit. |
| ARC-DOMAIN-CART | Cart lines and saved-for-later state. |
| ARC-DOMAIN-CHECKOUT | Checkout sessions, idempotency, order orchestration. |
| ARC-DOMAIN-INVENTORY | Stock, reservations, movements, locations. |
| ARC-DOMAIN-ORDER | Parent orders, fulfilment units, status history. |
| ARC-DOMAIN-SHIPPING | Shipments, labels, tracking, exceptions. |
| ARC-DOMAIN-PAYMENT | Payment attempts, provider refs, refunds, webhooks. |
| ARC-DOMAIN-FINANCE | Ledger, commissions, settlements, payouts. |
| ARC-DOMAIN-RETURNS | Return workflow and eligibility. |
| ARC-DOMAIN-SUPPORT | Tickets, messages, disputes, SLA. |
| ARC-DOMAIN-MARKETING | Campaigns, segments, notification events. |
| ARC-DOMAIN-CONTENT | Pages, banners, navigation, SEO. |
| ARC-DOMAIN-REPORTING | Reports and exports with role protection. |
| ARC-DOMAIN-ADMIN | Feature flags and platform configuration. |
| ARC-DOMAIN-AUDIT | Append-only audit trail. |
| ARC-DOMAIN-INTEGRATION | Provider adapters with normalized internal models. |
| ARC-DOMAIN-RULE-001 | Keep cross-module writes behind interfaces/events. |
| ARC-DOMAIN-RULE-002 | Make checkout, stock, payment, refund, ledger operations transactional and idempotent. |
| ARC-DOMAIN-RULE-003 | Keep provider formats inside adapters. |
| ARC-DOMAIN-RULE-004 | Reports must not bypass authorization. |
| ARC-DOMAIN-RULE-005 | Document status machines before coding them. |

### 5. Asynchronous architecture

**What is it?**  
Work that happens after the main request, using a queue and workers.

**Why do we need it?**  
Emails, indexing, invoices, and webhooks should not slow down checkout.

**How does it work?**  
A transaction writes an outbox-style record; after commit, workers process the job.

**Example.**  
Order placed → queue notification → email worker sends confirmation.

**What do I need to build?**  
Outbox records, queue, workers, scheduled jobs, retries, dead-letter handling, replay tools.

**How do I test it?**  
Kill a worker mid-job and confirm retry is bounded and no duplicate email is sent.

| ID | Development work |
|---|---|
| ARC-ASYNC-001 | Write outbox records inside the owning transaction. |
| ARC-ASYNC-002 | Queue email/SMS/push work after key events. |
| ARC-ASYNC-003 | Verify webhook signatures, deduplicate, process idempotently. |
| ARC-ASYNC-004 | Update search documents after visibility changes. |
| ARC-ASYNC-005 | Generate invoices/statements/exports in the background. |
| ARC-ASYNC-006 | Schedule expiry, reminders, retries, settlement prep, alerts. |
| ARC-ASYNC-007 | Add bounded retries, backoff, dead-letter queue, monitoring, safe replay. |

### 6. Data architecture

**What is it?**  
Where each kind of data lives.

**Why do we need it?**  
Money, sessions, files, and search have different needs.

**How does it work?**  
PostgreSQL is the record of truth; Redis holds cache/queues; object storage holds files.

**Example.**  
Product photo → object storage; product row → PostgreSQL; popular category list → Redis cache.

**What do I need to build?**  
Database, cache, file storage, CDN, optional search index, backups, restore drills.

**How do I test it?**  
Confirm a restore works in a non-production environment.

| ID | Development work |
|---|---|
| ARC-DATA-001 | Use PostgreSQL as the transactional system of record. |
| ARC-DATA-002 | Use Redis for cache, rate limits, short-lived helpers, queues. |
| ARC-DATA-003 | Store media/documents/exports in object storage with signed URLs. |
| ARC-DATA-004 | Serve public media/static files through CDN. |
| ARC-DATA-005 | Add a search index only after the agreed threshold. |
| ARC-DATA-006 | Add read models/reporting store if dashboard load requires it. |
| ARC-DATA-007 | Configure backups, encryption, restore drills, recovery procedures. |

### 7. External integrations

**What is it?**  
Third-party services TradeOrbit calls or receives calls from.

**Why do we need it?**  
Payments, couriers, messages, tax, and analytics are external systems.

**How does it work?**  
An adapter translates provider formats into internal normalized models.

**Example.**  
Two couriers return different tracking JSON; the adapter outputs one internal shipment model.

**What do I need to build?**  
Adapters with timeouts, bounded retries, correlation IDs, audit records, signed webhook handling.

**How do I test it?**  
Simulate provider timeout and confirm queueing, accurate status, and exception visibility.

| ID | Development work |
|---|---|
| INT-PAY | Payment adapter with hosted/tokenized flow and reconciliation export. |
| INT-SHIP | Courier adapter with normalized shipment model. |
| INT-EMAIL | Queue-backed email adapter with templates and consent checks. |
| INT-SMS | Queue-backed SMS/WhatsApp adapter with consent rules. |
| INT-TAX | Tax/invoicing rules adapter; source of truth to be decided. |
| INT-MAPS | Optional address autocomplete/geocoding adapter. |
| INT-ANALYTICS | Consent-aware analytics event pipeline. |
| INT-ERP | Accounting/ERP/CRM integration after core rules are settled. |
| INT-RULE-001 | Do not leak provider SDK types into domain entities. |
| INT-RULE-002 | Add timeouts, retries, correlation IDs, audit records. |
| INT-RULE-003 | Verify webhook signatures and replay protection. |
| INT-RULE-004 | Degrade gracefully during provider outages. |

### 8. Deployment architecture

**What is it?**  
How the app is packaged, hosted, observed, and released.

**Why do we need it?**  
Repeatable releases reduce mistakes and allow rollback.

**How does it work?**  
Docker images for API/workers/web; CI then staging then production; logs/metrics/traces feed alerts.

**Example.**  
A payment failurerate alert fires after a staging smoke test passes.

**What do I need to build?**  
Environments, Docker images, worker deployment, managed DB, media storage, CI/CD, observability.

**How do I test it?**  
Run the CI pipeline, deploy to staging, run smoke tests, and practise rollback.

| ID | Development work |
|---|---|
| ARC-DEP-001 | Create local, test, staging/UAT, production with isolated credentials/data. |
| ARC-DEP-002 | Build Docker images for API, workers, web clients. |
| ARC-DEP-003 | Choose runtime platform after topology decision. |
| ARC-DEP-004 | Deploy workers separately. |
| ARC-DEP-005 | Use managed PostgreSQL with controlled migrations and backups. |
| ARC-DEP-006 | Use object storage plus CDN; signed URLs for private files. |
| ARC-DEP-007 | CI → staging → smoke tests → approval → production → rollback. |
| ARC-DEP-008 | Add structured logs, metrics, traces, error monitoring, alerts. |

### 9. Cross-cutting architecture views

**What is it?**  
Concerns that touch many modules at once.

**Why do we need it?**  
Security, money, performance, and testing cannot be added to only one module.

**How does it work?**  
Each concern has a chosen architecture treatment and a cross-reference to another document.

**Example.**  
Money correctness uses fixed-precision decimals, explicit currency, server-side calculations, and an immutable ledger.

**What do I need to build?**  
Central identity/authorization, consent/retention, decimal money fields, idempotency keys, caches, tests.

**How do I test it?**  
Run authorization matrix tests, injection tests, load tests, and regression tests.

### 10. Architecture decision records

**What is it?**  
Short notes that capture important choices.

**Why do we need it?**  
So a PDF recommendation is not mistaken for a final decision.

**How does it work?**  
Each ADR records context, decision, consequences, alternatives, and date.

**Example.**  
ADR: “modular monolith now; extraction later if search traffic grows.”

**What do I need to build?**  
An ADR template and a review step before changing boundaries or providers.

**How do I test it?**  
Check every major choice links to SRS IDs and unresolved decisions.

| ID | Development work |
|---|---|
| ARC-ADR-001 | Write ADRs with context, decision, consequences, alternatives, date. |
| ARC-ADR-002 | Mark PDF recommendations separately from final decisions. |
| ARC-ADR-003 | Link ADRs to affected SRS IDs and unresolved decisions. |
| ARC-ADR-004 | Require review before changing major boundaries or topology. |

### 11. Future extraction boundaries

**What is it?**  
A list of modules that might become separate services later.

**Why do we need it?**  
It documents growth options without building them now.

**How does it work?**  
Each candidate has a trigger, such as search traffic exceeding an agreed threshold.

**Example.**  
If reporting queries slow down checkout, reporting may be extracted.

**What do I need to build?**  
Nothing yet. Record triggers in ADRs.

**How do I test it?**  
Review triggers during capacity planning; confirm no early service split was assumed.

| ID | Development work |
|---|---|
| ARC-EXT-001 | Future search/catalogue read side extraction. |
| ARC-EXT-002 | Future notifications extraction. |
| ARC-EXT-003 | Future reporting/BI extraction. |
| ARC-EXT-004 | Future payment/webhook extraction. |
| ARC-EXT-005 | Future fulfilment/shipping extraction. |
| ARC-EXT-006 | Future mobile BFF extraction. |

### 12. Traceability

**What is it?**  
A map from source sections to architecture IDs.

**Why do we need it?**  
It proves each requirement area has an architecture response.

**How does it work?**  
Read the table, then open the linked IDs in the original content.

**Example.**  
Source §7 API and integrations → API-DESIGN.md and `INT-*`.

**What do I need to build?**  
Cross-links in docs and tickets.

**How do I test it?**  
Pick a requirement ID and confirm it leads to at least one architecture ID.

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
| outbox | A record written in the same transaction, later published to workers. |
| CDN | Content Delivery Network: cached public files served close to users. |
| object storage | File storage accessed by object references/keys, not filesystem paths. |
| ADR | Architecture Decision Record: a short note explaining a significant choice. |
| read model | A query-friendly copy of data used by reports or dashboards. |
| BFF | Backend for Frontend: a small aggregation layer for a specific client. |
| dead-letter queue | A queue for jobs that cannot be processed after retries. |
| observability | Logs, metrics, traces, and alerts that explain system behaviour. |
| status machine | The allowed states and transitions for an order, vendor, product, etc. |

## Current status note (2026-11-22)

The beginner explanations above reflect the earlier project state. Current approved G1–G8 decisions are in `../requirements/SRS.md` §12A and `../audits/AUTHENTICATION-IMPLEMENTATION-PLAN.md`. Where those explanations say MFA, guest checkout, Google sign-in, admin portal topology, or package manager are pending, use the approved decisions. Transactional notifications are mandatory; other marketing features remain conditional unless separately decided.

## Canonical source

The explanations above introduce the architecture views and the main identifier patterns. The complete architecture document is [SYSTEM-ARCHITECTURE.md](../architecture/SYSTEM-ARCHITECTURE.md). That canonical file is the source of truth for architecture decisions, integration identifiers, and architecture traceability.