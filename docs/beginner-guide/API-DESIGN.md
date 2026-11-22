# API-DESIGN.md — Beginner-Friendly Copy

> **Learning copy notice.** This is a learning copy. No architecture decision, ID, API contract, database entity, security control, status, or requirement was changed. The current canonical document is linked at the end of this guide.

## How to use this guide

- Read the beginner sections first, then the canonical document linked at the end of this guide.
- API methods, paths, request/response shapes, permissions, and statuses are preserved exactly in the canonical document.
- An ID such as `GET /api/v1/products` is a real development task: implement that exact method and path.

## How to read the IDs in this document

| ID pattern | Plain-English meaning | What it means as development work |
|---|---|---|
| `API-001`–`API-009` | API standards | Build versioning, docs, list controls, auth, idempotency, webhook security, separation, money rules, TLS. |
| `API-ERR` | Error model | Implement the listed HTTP statuses and `error.code` values. |
| `API-ENV-*` | Envelope rules | Use the same success/list/error response shapes everywhere. |
| `API-CAT`, `API-DISC`, `API-CUST`, … | Endpoint catalogue groups | Implement the exact method + path rows in that group. |
| `API-PERM-*` | Permission model | Enforce the listed permission scope on the server. |
| `API-IDEMP-*` | Idempotency | Accept keys, store fingerprints, dedupe, return conflicts. |
| `API-PAGE-*` | Pagination/filtering/sorting | Add bounded, allow-listed list controls. |
| `API-CHK-RULE-*` | Checkout rules | Enforce server totals, atomic order/reservation, verified payment. |
| `API-WH-*` | Webhooks | Verify signatures, persist events, dedupe, dead-letter, normalize. |
| `API-FILE-*` | File uploads | Validate, scan, use object references and signed URLs. |
| `API-VER-*` | Versioning | Handle breaking changes, deprecation, shared contracts. |
| `DEC-*` | Unresolved decisions | Ask before choosing provider, limits, topology, or scope. |

## Beginner explanations by topic

### 1. API standards

**What is it?**  
Nine baseline rules for TradeOrbit's API.

**Why do we need it?**  
All clients must talk to the backend in the same predictable way.

**How does it work?**  
Versioned REST paths, OpenAPI docs, validated lists, auth, idempotency, signed webhooks, TLS.

**Example.**  
`GET /api/v1/products` is public; `PATCH /api/v1/me` needs an authenticated customer.

**What do I need to build?**  
`/api/v1/...` routes, OpenAPI spec, DTO validation, guards, correlation IDs, HTTPS.

**How do I test it?**  
Check every protected route rejects anonymous calls and appears in OpenAPI.

| ID | Development work |
|---|---|
| API-001 | Group endpoints under `/api/v1/...`. |
| API-002 | Publish OpenAPI spec with schemas, examples, errors, auth, permissions. |
| API-003 | Add pagination, sorting, filtering, validation, request limits. |
| API-004 | Apply auth and server-side role/permission checks. |
| API-005 | Add idempotency keys for sensitive create/payment ops and correlation IDs. |
| API-006 | Verify webhook signatures, prevent replay, handle retries, dead-letter. |
| API-007 | Keep permission groups separate. |
| API-008 | Never accept client-authoritative totals; include currency codes. |
| API-009 | HTTPS/TLS everywhere; secure cookies or bearer-token flows. |

### 2. API surface map

**What is it?**  
Which client group uses which API group.

**Why do we need it?**  
It prevents mixing public, customer, vendor, admin, and webhook access.

**How does it work?**  
Clients call API groups; API groups call domain modules; modules call adapters.

**Example.**  
A payment provider calls signed webhook endpoints; a shopper calls public/product and customer APIs.

**What do I need to build?**  
The listed API groups with their base areas.

**How do I test it?**  
Map each route to an audience and confirm permission checks match.

### 3. Request and response conventions

**What is it?**  
Consistent success, list, and error response shapes.

**Why do we need it?**  
Clients can handle responses with one parser.

**How does it work?**  
Success has `data` + `meta`; lists add `pagination`; errors have `error.code`, `message`, `details`, `meta`.

**Example.**  
`409 IDEMPOTENCY_CONFLICT` means the same key was reused with a different fingerprint.

**What do I need to build?**  
Envelope helpers, stable error codes, correlation IDs, sanitized messages.

**How do I test it?**  
Assert response shapes and that no stack traces/secrets appear.

| ID | Development work |
|---|---|
| API-ENV-001 | Use consistent envelopes across domains. |
| API-ENV-002 | Include correlation/request ID in every response and log. |
| API-ENV-003 | Return stable machine-readable error codes. |
| API-ENV-004 | Do not expose stack traces, raw provider errors, secrets, PII. |
| API-ENV-005 | Agree page size, max request size, rate limits before implementation. |

### 4. Domain endpoint catalogue

**What is it?**  
The exact list of endpoints grouped by domain.

**Why do we need it?**  
It is the contract for storefront, vendor portal, admin console, and providers.

**How does it work?**  
Each row gives method, path, purpose, required permission, and status.

**Example.**  
`POST /api/v1/orders` creates an order idempotently and reserves stock.

**What do I need to build?**  
Every method/path row in API-CAT, API-DISC, API-CUST, API-CHK, API-VEN, API-SHIP, API-RET, API-FIN, API-SUP, API-CMS, API-ADMIN.

**How do I test it?**  
For each row: happy path, invalid input, wrong role, cross-user access.

### 5. Permission model

**What is it?**  
Rules for who can call which operation.

**Why do we need it?**  
A valid user can still be the wrong user for a resource.

**How does it work?**  
Public, customer ownership, vendor ownership, staff assignment, admin fine-grained, super-admin, finance-sensitive, step-up.

**Example.**  
Vendor staff cannot grant permissions to themselves.

**What do I need to build?**  
Guards/interceptors that enforce ownership and fine-grained permissions on the server.

**How do I test it?**  
Run negative tests for every permission scope.

| ID | Development work |
|---|---|
| API-PERM-001 | Public access only to published/approved public resources. |
| API-PERM-002 | Customer must own cart/order/return/ticket. |
| API-PERM-003 | Vendor caller must belong to owning vendor and hold permission. |
| API-PERM-004 | Vendor owner assigns staff permissions; no self-grant. |
| API-PERM-005 | Admin/sub-admin actions fine-grained and server-enforced. |
| API-PERM-006 | Super-admin global config/admin/security settings. |
| API-PERM-007 | Finance-sensitive operations need specific permission and audit. |
| API-PERM-008 | Step-up only if DEC-010 confirms it. |

### 6. Idempotency

**What is it?**  
Making repeated requests safe.

**Why do we need it?**  
Network retries and double-clicks must not create two orders or charges.

**How does it work?**  
Clients send `Idempotency-Key`; server stores scope + key + fingerprint and returns the original result.

**Example.**  
Reusing a key with a different body returns `409 IDEMPOTENCY_CONFLICT`.

**What do I need to build?**  
Header handling, durable records, fingerprint check, conflict response, dedupe by provider reference.

**How do I test it?**  
Send the same request twice, then a different body with the same key.

| ID | Development work |
|---|---|
| API-IDEMP-001 | Accept `Idempotency-Key` header on sensitive POST operations. |
| API-IDEMP-002 | Scope includes endpoint/operation, principal or guest cart, and key. |
| API-IDEMP-003 | Store fingerprint and return original result for exact retry. |
| API-IDEMP-004 | Different fingerprint with same key → `IDEMPOTENCY_CONFLICT`. |
| API-IDEMP-005 | Order/payment/refund/webhook/payout handling is idempotent. |
| API-IDEMP-006 | Retain records long enough for realistic retry windows. |

### 7. Pagination, filtering and sorting

**What is it?**  
Bounded ways to list data.

**Why do we need it?**  
Unbounded lists are slow and can expose too much data.

**How does it work?**  
Use one pagination style per endpoint family; allow-list filters and sorts.

**Example.**  
Product filters include category, brand, price, rating, availability, attributes, vendor, delivery options.

**What do I need to build?**  
`page`/`cursor`, `pageSize`/`limit`, `sort`, `q`, `filter[field]`, `fields` support where declared.

**How do I test it?**  
Send an unknown filter and confirm rejection.

| ID | Development work |
|---|---|
| API-PAGE-001 | Consistent cursor or page pagination per family. |
| API-PAGE-002 | Expose total count where cost is acceptable. |
| API-PAGE-003 | Allow-list and validate filters; reject unknown filters. |
| API-PAGE-004 | Allow-list sort fields mapped to indexed fields. |
| API-PAGE-005 | Support listed product filters. |
| API-PAGE-006 | Support listed product sorting options. |
| API-PAGE-007 | Agree request body/query/file size limits before production. |

### 8. Checkout and payment sequence

**What is it?**  
The ordered steps from cart to verified payment.

**Why do we need it?**  
It keeps totals and stock correct and avoids false success.

**How does it work?**  
Cart → quote → idempotent order → atomic reservation → hosted payment → signed webhook → status on polling.

**Example.**  
Payment success is based on verified provider state, not the browser return URL.

**What do I need to build?**  
Quote endpoint, order endpoint, inventory reservation, webhook verification, polling status.

**How do I test it?**  
Send a fake return URL success and confirm order does not mark paid.

| ID | Development work |
|---|---|
| API-CHK-RULE-001 | Reject client-submitted authoritative totals. |
| API-CHK-RULE-002 | Use same server pricing rules for quote and order. |
| API-CHK-RULE-003 | Reservation and order creation are atomic. |
| API-CHK-RULE-004 | Failed/expired checkout releases reservation once. |
| API-CHK-RULE-005 | Payment success from verified provider state. |
| API-CHK-RULE-006 | Guest checkout only if DEC-012 confirms it. |

### 9. Webhooks

**What is it?**  
Provider callbacks that report events.

**Why do we need it?**  
Payment and courier status changes arrive asynchronously.

**How does it work?**  
Verify signature and timestamp, persist event, dedupe by provider event ID, enqueue normalized event, update state idempotently.

**Example.**  
`POST /api/v1/webhooks/payments/{provider}` with signature headers.

**What do I need to build?**  
Signed endpoint, verification, persistence, dedupe, exception queue, adapter translation.

**How do I test it?**  
Replay a webhook and confirm no duplicate ledger/refund effects.

| ID | Development work |
|---|---|
| API-WH-001 | Providers deliver signed payment/shipping events. |
| API-WH-002 | Verify signature before business processing. |
| API-WH-003 | Store provider event IDs for dedupe/replay protection. |
| API-WH-004 | Retry responses preserve at-most-once business effects. |
| API-WH-005 | Unprocessable events go to dead-letter/exception queue. |
| API-WH-006 | Persist event and enqueue processing; avoid long synchronous work. |
| API-WH-007 | Translate provider payloads via adapters into normalized domain events. |
| API-WH-001 (signed payment webhook subsection) | Implement the 7 expected steps for payment callbacks. |

### 10. File upload and object references

**What is it?**  
Handling product media and private documents.

**Why do we need it?**  
Files can be malicious or sensitive.

**How does it work?**  
Validate type/size, scan where supported, store in object storage, return object references, serve private files via signed URLs.

**Example.**  
KYC document access uses a signed URL and strict access control.

**What do I need to build?**  
Upload validation, scanning hook, object reference responses, signed URL generation.

**How do I test it?**  
Upload disallowed MIME type and oversized file; confirm rejection.

| ID | Development work |
|---|---|
| API-FILE-001 | Validate file type/size, malware scanning, object storage references. |
| API-FILE-002 | Private documents use signed URLs and strict access control. |
| API-FILE-003 | Public media uses CDN-friendly references and alt text. |
| API-FILE-004 | Return object references, not filesystem paths. |
| API-FILE-005 | Agree max file sizes and MIME types before production. |

### 11. Versioning and compatibility

**What is it?**  
How the API changes safely.

**Why do we need it?**  
Web and optional mobile clients must not break silently.

**How does it work?**  
Breaking change → new version; additive fields allowed; deprecations documented.

**Example.**  
A renamed response field is a breaking change and needs a new API version.

**What do I need to build?**  
Version prefix, deprecation docs, OpenAPI review steps.

**How do I test it?**  
Confirm old contract still works until documented removal.

| ID | Development work |
|---|---|
| API-VER-001 | New API version for breaking changes. |
| API-VER-002 | Additive non-breaking fields may be added in current version. |
| API-VER-003 | Document deprecated endpoints with replacement and removal timeline. |
| API-VER-004 | Web and optional mobile use same versioned contracts. |
| API-VER-005 | Review OpenAPI changes for API/security/consumer impact. |

### 12. Traceability

**What is it?**  
A map from source areas to API IDs.

**Why do we need it?**  
It shows every functional area has an API surface.

**How does it work?**  
Read the source-area row and open the listed API IDs.

**Example.**  
§3.7 payments/refunds/finance → API-FIN, API-WH-001.

**What do I need to build?**  
Cross-links in docs and tickets.

**How do I test it?**  
Pick a source area and confirm endpoints exist.

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
| endpoint | A specific method + path, such as `GET /api/v1/products`. |
| envelope | A consistent wrapper shape around response data or errors. |
| correlation ID | An ID that links a request across logs, traces, and queues. |
| pagination | Returning a list in pages instead of all at once. |
| cursor | An opaque position marker used instead of page numbers. |
| allow-list | A short list of permitted values; anything else is rejected. |
| fingerprint | A value representing request content, used to detect key reuse with a different request. |
| replay | Sending the same event again; must not repeat business effects. |
| dead-letter queue | A queue for events/jobs that cannot be processed. |
| object reference | A storage key/reference returned instead of a filesystem path. |
| signed URL | A short-lived URL granting access to a private file. |
| step-up authentication | Asking for fresh proof again before a very sensitive action. |
| hosted checkout | Payment page hosted by the provider so card data does not touch TradeOrbit. |
| serviceability | Whether a courier can deliver to an address. |
| KYC | Know Your Customer: checks used to verify a seller's identity/business. |
| SLA | Service Level Agreement: agreed response/resolution timing. |

## Current status note (2026-11-22)

The beginner explanations above reflect the earlier project state. Current approved G1–G8 decisions are in `../requirements/SRS.md` §12A and `../audits/AUTHENTICATION-IMPLEMENTATION-PLAN.md`. Where those explanations say MFA, guest checkout, Google sign-in, admin portal topology, or package manager are pending, use the approved decisions. Transactional notifications are mandatory; other marketing features remain conditional unless separately decided.

## Canonical source

The explanations above introduce how to read endpoints, permissions, and API rule IDs. The complete API document is [API-DESIGN.md](../architecture/API-DESIGN.md). That canonical file is the source of truth for endpoint behavior, API rule IDs, and API traceability.