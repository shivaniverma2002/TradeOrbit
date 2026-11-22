# Beginner Guide README

This folder contains beginner-friendly copies of the project's Markdown documentation.

Use these files to learn the project in simple English. They do not change the original documents. Each copy keeps the original technical terms and IDs and explains them in simpler words. The current canonical documents are linked from each guide and from the source list below.

The PDF file was not changed. No application code was created or changed.

## Read this first

1. `AGENTS.md` — explains the project rules and how work should be done.
2. `SRS.md` — explains the full requirement catalogue in plain English.

Then read the user-focused documents:

3. `BUSINESS-RULES.md` — explains the business rules that code must follow.
4. `USER-STORIES.md` — explains what each user role needs.
5. `ACCEPTANCE-CRITERIA.md` — explains how we will know a feature works.

Then read the design documents:

6. `SYSTEM-ARCHITECTURE.md` — explains the overall system shape.
7. `DATABASE-ERD.md` — explains the data model.
8. `API-DESIGN.md` — explains the API contracts.
9. `SECURITY-ARCHITECTURE.md` — explains security controls.
10. `PERFORMANCE-STRATEGY.md` — explains speed, scale, and reliability plans.

Finally read the audit reports:

11. `SRS-AUDIT-REPORT.md` — explains what was checked in the SRS.
12. `SRS-REVISION-REPORT.md` — explains what was corrected.
13. `TASK-2-VERIFICATION-REPORT.md` — explains what is actually implemented and verified.

## Which document tells me what to build?

Read these together:

| Question | Document to read |
|---|---|
| What features are in scope? | `SRS.md` |
| What rules must the features obey? | `BUSINESS-RULES.md` |
| Who needs each feature? | `USER-STORIES.md` |
| What proves the feature works? | `ACCEPTANCE-CRITERIA.md` |
| What must not be invented? | `AGENTS.md` and the unresolved `DEC-*` IDs in `SRS.md` |
| What is actually implemented? | `TASK-2-VERIFICATION-REPORT.md` |

A feature is not complete just because it appears in the SRS. It is complete only when it is built, tested, secure, and verified.

## Which document explains the database, APIs and security?

| Topic | Main document | Also read |
|---|---|---|
| Database tables and relationships | `DATABASE-ERD.md` | `SRS.md` sections with `DB-*` IDs |
| API endpoints and request rules | `API-DESIGN.md` | `SRS.md` sections with `API-*` IDs |
| Security controls | `SECURITY-ARCHITECTURE.md` | `SRS.md` sections with `SEC-*` IDs and `AGENTS.md` |
| Performance and reliability | `PERFORMANCE-STRATEGY.md` | `SRS.md` sections with `NFR-*` IDs |
| Overall architecture | `SYSTEM-ARCHITECTURE.md` | `SRS.md` sections with `ARC-*` IDs |

## What each document is about

| File | Simple description |
|---|---|
| `AGENTS.md` | Project working rules: approved technology, security, testing, Git rules, and definition of done. |
| `SRS.md` | The main requirement catalogue. Every requirement has an ID and status. |
| `BUSINESS-RULES.md` | The rules for orders, stock, payments, refunds, sellers, commissions, and other business behaviour. |
| `USER-STORIES.md` | The needs of each role, such as customer, vendor, admin, support, warehouse, delivery, and finance. |
| `ACCEPTANCE-CRITERIA.md` | The checks that must pass before a feature can be accepted. |
| `SYSTEM-ARCHITECTURE.md` | How the frontend, backend, database, queues, storage, and deployment pieces fit together. |
| `DATABASE-ERD.md` | The database design: entities, fields, relationships, constraints, and indexes. |
| `API-DESIGN.md` | The API design: endpoint paths, methods, responses, errors, permissions, idempotency, and webhooks. |
| `SECURITY-ARCHITECTURE.md` | How authentication, authorization, data protection, secure coding, and audit logs should work. |
| `PERFORMANCE-STRATEGY.md` | How the system should stay fast, available, observable, and recoverable. |
| `SRS-AUDIT-REPORT.md` | The report that found inconsistencies and missing links in the SRS. |
| `SRS-REVISION-REPORT.md` | The report that records the corrections made to the SRS. |
| `TASK-2-VERIFICATION-REPORT.md` | The report that checks the actual repository against the specification. It currently reports a documentation-only repository. |

## Simple reading example

If you want to understand checkout:

1. Read `USER-STORIES.md` to see what customers and vendors need.
2. Read `SRS.md` and find the `FR-CHK-*`, `FR-PAY-*`, `FR-INV-*`, and `FR-ORD-*` IDs.
3. Read `BUSINESS-RULES.md` for stock, payment, refund, and order rules.
4. Read `ACCEPTANCE-CRITERIA.md` for the customer purchase and payment integrity journeys.
5. Read `API-DESIGN.md` for `/api/v1/cart`, `/api/v1/checkout/quote`, `/api/v1/orders`, and payment endpoints.
6. Read `DATABASE-ERD.md` for carts, orders, inventory, payments, and ledger records.
7. Read `SECURITY-ARCHITECTURE.md` to learn how payment and authorization data must be protected.
8. Read `TASK-2-VERIFICATION-REPORT.md` to confirm whether checkout is actually implemented. It is not enough to see it in the requirements.

## Important reminder

- Keep every original ID unchanged when you create development tasks.
- Do not invent payment, tax, shipping, commission, or launch decisions.
- Do not treat a recommendation or conditional item as final scope unless the unresolved decision is answered.
- Do not mark any feature as complete without implementation evidence and tests.

## Current approved decisions

G1–G8 were approved on 2026-11-22. The beginner copies keep their original learning text, so read these current sources when a document describes a decision as pending:

- `../requirements/SRS.md` §12A — approved G1–G8 decisions.
- [AUTHENTICATION-IMPLEMENTATION-PLAN.md](../audits/AUTHENTICATION-IMPLEMENTATION-PLAN.md) — exact auth, session, MFA, guest, Google, retention, and testing decisions.
- `../audits/COMPLETE-PROJECT-AUDIT.md` — current audit findings and implementation readiness.

In simple terms: MFA is approved by role, Redis-backed sessions with HttpOnly cookies and CSRF are approved, unverified sessions are restricted, guest checkout and optional Google sign-in are approved with strict association/linking rules, the admin portal is separate but shares backend auth and PostgreSQL, and the repository uses pnpm workspaces. Transactional notifications are mandatory; other marketing features remain conditional unless separately decided.
