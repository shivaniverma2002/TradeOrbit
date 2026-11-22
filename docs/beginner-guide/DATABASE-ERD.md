# DATABASE-ERD.md — Beginner-Friendly Copy

> **Learning copy notice.** This is a learning copy. No architecture decision, ID, API contract, database entity, security control, status, or requirement was changed. The current canonical document is linked at the end of this guide.

## How to use this guide

- Read the beginner sections first, then the canonical data-model document linked at the end of this guide.
- This document is a **conceptual/logical ERD**. It is not final SQL DDL or column sizing.
- Entity names such as `ORDER` and field names such as `currencyCode` must be copied exactly when building.

## How to read the IDs in this document

| ID pattern | Plain-English meaning | What it means as development work |
|---|---|---|
| `DB-001`–`DB-010` | Data design requirements | Build the database capability named in the row. |
| `DB-ID`, `DB-VEN`, `DB-CAT`, … | Entity group index | A group of related tables/entities to implement together. |
| `DB-CON-*` | Logical integrity rules | Add constraints, unique rules, and enforce them in code/database. |
| `DB-TX-*` | Transaction boundaries | Wrap the listed steps in one atomic transaction. |
| `DB-IDX-*` | Index and query intent | Add indexes for the listed query pattern. |
| `DB-RET-*` | Retention/lifecycle | Implement soft delete, retention, archival, or cleanup jobs. |
| `DEC-*` | Unresolved decisions | Ask before finalizing fields or rules that depend on them. |

## Beginner explanations by topic

### Scope and status

**What is it?**  
A map of data entities and relationships for TradeOrbit.

**Why do we need it?**  
It prevents contradictory tables and unsafe money/stock handling.

**How does it work?**  
Entities are drawn with primary keys, foreign keys, and fields. Rules and transactions are listed separately.

**Example.**  
`ORDER` has many `ORDER_LINE` rows; each line points back to one order.

**What do I need to build?**  
PostgreSQL tables, keys, constraints, indexes, transactions, and migrations.

**How do I test it?**  
Insert invalid references and confirm the database rejects them.

### 1. Data design requirements

**What is it?**  
Ten baseline rules for the database.

**Why do we need it?**  
They protect correctness, security, and performance.

**How does it work?**  
Each rule has an ID, status, and link to requirements or other docs.

**Example.**  
Money uses fixed-precision decimals, not floating point.

**What do I need to build?**  
System-of-record DB, keys/indexes, sensitive-data protection, transactions, idempotency, immutable ledger, histories, retention.

**How do I test it?**  
Check no float money column exists and no raw card number/CVV column exists.

| ID | Development work |
|---|---|
| DB-001 | Use PostgreSQL as the system of record. |
| DB-002 | Add primary keys, foreign keys, indexes, timestamps, status history, uniqueness. |
| DB-003 | Minimise/protect sensitive data; no raw card numbers or CVV. |
| DB-004 | Use transactions for checkout, reservation, payment-state, ledger operations. |
| DB-005 | Use idempotency keys for order/payment/refund/webhook/payout operations. |
| DB-006 | Fixed-precision decimal money plus explicit currency code; no floating point. |
| DB-007 | Immutable ledger; correct with compensating entries. |
| DB-008 | Status/event histories for orders, payments, shipments, returns, vendor approvals, products. |
| DB-009 | Index common filters/joins; review plans; avoid unbounded lists. |
| DB-010 | Soft deletion only where appropriate; retain financial/audit records. |

### 2. Entity group index

**What is it?**  
A table of contents for entity groups.

**Why do we need it?**  
It helps developers find which area owns a table.

**How does it work?**  
Each prefix groups related entities.

**Example.**  
`DB-FIN` covers payments, refunds, ledger, commissions, settlements, payouts.

**What do I need to build?**  
Tables grouped by these areas, matching module ownership.

**How do I test it?**  
Review module-to-table ownership in code review.

| ID | Development work |
|---|---|
| DB-ID | Build users, roles, permissions, addresses, consents, requests, audit, idempotency. |
| DB-VEN | Build vendor applications, verification, staff, documents, bank references, store profile, status events. |
| DB-CAT | Build categories, brands, collections, tags, attributes, products, variants, media, groupings. |
| DB-CUST | Build customer profiles, wishlist, recently viewed, reviews, segments, campaigns, notifications. |
| DB-PRICE | Build prices, promotions, coupons, eligibility, calculation audit. |
| DB-CART | Build carts and cart items including saved-for-later. |
| DB-INV | Build warehouses, inventory items, reservations, movements, suppliers, purchase orders. |
| DB-ORD | Build orders, lines, fulfilment units, order events, invoices. |
| DB-SHIP | Build shipments, shipment items, carrier refs, milestones, exceptions. |
| DB-RET | Build return requests, items, inspection, disposition. |
| DB-FIN | Build payments, attempts, webhooks, refunds, ledger, commissions, settlements, payouts, credit notes. |
| DB-SUP | Build tickets, messages, disputes, SLA events. |
| DB-CONTENT | Build pages, banners, navigation, redirects, SEO metadata. |
| DB-OPS | Build feature flags, report exports, object references, notification events. |

### 3. Identity, vendor, catalogue and customer ERD

**What is it?**  
Entities for who users are, who sells, what is sold, and customer engagement.

**Why do we need it?**  
It links logins, roles, vendors, products, and reviews.

**How does it work?**  
Foreign keys connect users to roles, vendors, profiles, addresses, consents, and content.

**Example.**  
A customer writes a review; the review links to customer profile, product, and vendor.

**What do I need to build?**  
The exact entities and fields in [§3 Identity, vendor, catalogue and customer ERD](../architecture/DATABASE-ERD.md#3-identity-vendor-catalogue-and-customer-erd).

**How do I test it?**  
Check `BANK_ACCOUNT_REFERENCE` holds only protected references/masked values, never raw secrets.

### 4. Cart, inventory, order, shipping and returns ERD

**What is it?**  
Entities for the path from cart to delivery and returns.

**Why do we need it?**  
Orders can split into fulfilment units and shipments; returns need inspection and disposition.

**How does it work?**  
`ORDER` is the parent. `FULFILMENT_UNIT` represents vendor/warehouse/shipment splits.

**Example.**  
One order with two vendors becomes two fulfilment units and two shipments.

**What do I need to build?**  
The exact entities and fields in [§4 Cart, inventory, order, shipping and returns ERD](../architecture/DATABASE-ERD.md#4-cart-inventory-order-shipping-and-returns-erd).

**How do I test it?**  
Confirm reservation quantity never exceeds available stock when committed.

### 5. Pricing, finance, support, content and operations ERD

**What is it?**  
Entities for money calculation, finance records, support, CMS, and operational state.

**Why do we need it?**  
These records must be auditable and protected.

**How does it work?**  
`LEDGER_ENTRY` is append-only; webhook and idempotency records support deduplication.

**Example.**  
A refund appends ledger entries; it does not edit past entries.

**What do I need to build?**  
The exact entities and fields in [§5 Pricing, finance, support, content and operations ERD](../architecture/DATABASE-ERD.md#5-pricing-finance-support-content-and-operations-erd).

**How do I test it?**  
Try updating/deleting a ledger row and confirm it is blocked.

### 6. Logical integrity rules

**What is it?**  
Rules about valid data relationships.

**Why do we need it?**  
They stop orphan rows, duplicate events, and unsafe deletes.

**How does it work?**  
Constraints enforce what the database can; application code enforces the rest.

**Example.**  
Webhook events are unique by provider and provider event ID.

**What do I need to build?**  
Primary/foreign keys, uniqueness, status checks, append-only protections, soft-delete rules.

**How do I test it?**  
Insert the same provider event ID twice and expect rejection.

| ID | Development work |
|---|---|
| DB-CON-001 | Primary key on every entity; foreign keys for cross-entity references. |
| DB-CON-002 | SKU uniqueness scoped by vendor/product rules (scope pending decision). |
| DB-CON-003 | At most one default address per address type. |
| DB-CON-004 | Append vendor status events; mirror current status on `VENDOR`. |
| DB-CON-005 | Product is public only when status/moderation approved/published. |
| DB-CON-006 | Cart line quantity obeys catalogue/inventory rules. |
| DB-CON-007 | Reservation quantity must not exceed available stock when committed. |
| DB-CON-008 | Parent order has one or more fulfilment units; each belongs to one order. |
| DB-CON-009 | Shipment items come from the same fulfilment unit. |
| DB-CON-010 | Return items reference eligible lines from the related order. |
| DB-CON-011 | Money fields use explicit currency codes. |
| DB-CON-012 | Ledger rows cannot be updated/deleted; compensating rows inserted. |
| DB-CON-013 | Webhook events unique by provider and provider event ID. |
| DB-CON-014 | Idempotency scope + key unique; fingerprint mismatches rejected. |
| DB-CON-015 | Sensitive fields minimised, protected, excluded from general list endpoints. |
| DB-CON-016 | Audit records append-only with actor/action/target/time/outcome. |
| DB-CON-017 | Soft delete for user-facing records where appropriate; not financial/audit. |
| DB-CON-018 | Optional entities only when confirmed in scope. |

### 7. Transaction boundaries

**What is it?**  
Groups of steps that must all succeed or all fail.

**Why do we need it?**  
Partial order creation or partial refund causes real errors.

**How does it work?**  
Wrap the listed steps in a database transaction; commit once.

**Example.**  
Order creation validates cart, recalculates totals, creates order/lines, reserves stock, stores idempotency, queues side effects after commit.

**What do I need to build?**  
The eight transactional operations in [§7 Transaction boundaries](../architecture/DATABASE-ERD.md#7-transaction-boundaries).

**How do I test it?**  
Force a failure mid-transaction and confirm no partial rows remain.

| ID | Development work |
|---|---|
| DB-TX-001 | Order creation transaction. |
| DB-TX-002 | Reservation release/expiry exactly once. |
| DB-TX-003 | Webhook persist/dedupe + payment/order state update. |
| DB-TX-004 | Refund status + ledger append once per event/key. |
| DB-TX-005 | Commission calculation + ledger + settlement snapshot. |
| DB-TX-006 | Return status, inspection, disposition, refund/replacement intent. |
| DB-TX-007 | Vendor status update + status event. |
| DB-TX-008 | Product moderation status + event. |

### 8. Index and query intent

**What is it?**  
Which lookups need fast access paths.

**Why do we need it?**  
Without indexes, searches scan whole tables.

**How does it work?**  
Add composite/single-column indexes matching each query pattern.

**Example.**  
Order lookup by user, order number, status, vendor, placed date.

**What do I need to build?**  
Indexes DB-IDX-001 to DB-IDX-010, then review query plans.

**How do I test it?**  
Run query plans and confirm indexes are used.

| ID | Development work |
|---|---|
| DB-IDX-001 | Composite indexes for product discovery filters. |
| DB-IDX-002 | Unique/near-unique SKU/barcode lookup scoped by vendor/product rules. |
| DB-IDX-003 | Inventory by variant, warehouse, status, available quantity. |
| DB-IDX-004 | Orders by user, number, status, vendor, placed date. |
| DB-IDX-005 | Fulfilment/shipment queues by status, vendor, warehouse, dates. |
| DB-IDX-006 | Payment/webhook reconciliation by provider reference/event ID/status. |
| DB-IDX-007 | Ledger/settlement by vendor, period, entry type, currency. |
| DB-IDX-008 | Support ticket queues by status, priority, assignee, SLA due time. |
| DB-IDX-009 | Audit by actor, action, target, time range. |
| DB-IDX-010 | Idempotency/webhook dedupe unique indexes. |

### 9. Retention, privacy and lifecycle

**What is it?**  
How long data lives and how it is removed or archived.

**Why do we need it?**  
SEO, finance, privacy, and audit have different needs.

**How does it work?**  
Soft delete/deactivate where appropriate; retain financial/audit records; clean short-lived data.

**Example.**  
A discontinued product can be deactivated with a redirect; a ledger row is never hard-deleted.

**What do I need to build?**  
Lifecycle jobs and policy-driven retention.

**How do I test it?**  
Run cleanup job and confirm carts expire but ledger rows remain.

| ID | Development work |
|---|---|
| DB-RET-001 | Soft delete/deactivate catalogue/content; preserve SEO redirects. |
| DB-RET-002 | Retain finance/tax records; never hard-delete for convenience. |
| DB-RET-003 | Retain/protect audit and security records. |
| DB-RET-004 | Keep consent and withdrawal evidence. |
| DB-RET-005 | Track data-subject request, decision, execution evidence, actor. |
| DB-RET-006 | Restrict/tokenize sensitive vendor docs/bank refs; track expiry. |
| DB-RET-007 | Clean carts, recently viewed, temporary reservations, webhook payloads after purpose. |

### 10. Unresolved data-model decisions

**What is it?**  
Questions that change fields or rules.

**Why do we need them?**  
Coding an assumption could create the wrong schema.

**How does it work?**  
Each `DEC-*` row lists the impact on the ERD.

**Example.**  
Guest checkout policy affects `CART.userId` and `ORDER.userId` linkage.

**What do I need to build?**  
Decision log and schema tickets blocked on these decisions.

**How do I test it?**  
Check no migration hardcodes an unresolved rule.

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
| entity | A thing the database stores, such as `ORDER` or `VENDOR`. |
| primary key | The unique identifier for a row, shown as `PK`. |
| foreign key | A field that points to a row in another table, shown as `FK`. |
| composite index | An index built on several columns together. |
| index | A database helper that makes common lookups faster. |
| transaction | A group of database changes that all succeed or all fail together. |
| atomic | All steps happen or none happen. |
| immutable ledger | Financial rows that can be added but never edited or deleted. |
| compensating entry | A new ledger row that corrects an earlier one. |
| soft deletion | Marking a row inactive instead of physically deleting it. |
| uniqueness constraint | A rule that stops duplicate values. |
| CI/CD | Automated build/test (CI) and automated delivery (CD). |
| SLO | Service Level Objective: an agreed reliability target. |
| RPO/RTO | Recovery Point Objective (max data loss) / Recovery Time Objective (max downtime). |
| TLS | Encryption for data in transit; HTTPS uses TLS. |
| CSRF | Cross-Site Request Forgery: a trick that makes a user's browser send unwanted requests. |
| XSS | Cross-Site Scripting: injecting harmful script into a page. |
| SQL injection | Injecting SQL through input to read or change data illegally. |
| secrets manager | A secure store for API keys, passwords, and tokens. |
| tokenization | Replacing sensitive data with a safe reference/token. |
| KYC | Know Your Customer: checks used to verify a seller's identity/business. |
| PII | Personally Identifiable Information: data that identifies a person. |
| append-only | Records can be added but not edited or deleted. |
| denormalized | Data copied into a query-friendly shape for reads. |

## Current status note (2026-11-22)

The beginner explanations above reflect the earlier project state. Current approved G1–G8 decisions are in `../requirements/SRS.md` §12A and `../audits/AUTHENTICATION-IMPLEMENTATION-PLAN.md`. Where those explanations say MFA, guest checkout, Google sign-in, admin portal topology, or package manager are pending, use the approved decisions. Transactional notifications are mandatory; other marketing features remain conditional unless separately decided.

## Canonical source

The explanations above introduce how to read the conceptual and logical data model. The complete data-model document is [DATABASE-ERD.md](../architecture/DATABASE-ERD.md). That canonical file is the source of truth for data entities, relationships, constraints, and database decisions.