# ACCEPTANCE-CRITERIA.md — Beginner-Friendly Copy

> Learning copy only. No requirement, ID, business rule, API contract, architecture decision, or status was changed. The current canonical document is linked at the end of this guide.

## Start here

This file explains `ACCEPTANCE-CRITERIA.md` in simple English.

An acceptance criterion is a check that shows whether a requirement works as required. The original file is the source of truth. This guide only explains it.

## Plain-English terms

| Term you will see | Simple meaning |
|---|---|
| Acceptance criterion | A clear condition that must be met for work to be accepted. |
| Verification | The test, review, demo, or evidence used to check a criterion. |
| E2E | End-to-end. A test that follows a complete user journey. |
| API | A way for systems to talk to the backend. |
| Server | The backend computer code that applies rules and calculates values. |
| Client | The browser or app that sends requests to the server. |
| Idempotency | Sending the same request again does not create a duplicate order, charge, or refund. |
| Webhook | A callback message from a payment or shipping provider. |
| SKU | Stock keeping unit. A code for a specific sellable product variant. |
| KYC | Know Your Customer. Checks used to verify a seller’s business identity. |
| Ledger | A record of money movements. |
| RBAC | Role-based access control. Permissions depend on the user role. |
| Feature flag | A switch that turns a feature on or off for a scope. |
| WCAG 2.2 AA | An accessibility standard for usable web pages. |
| Responsive | A layout that works on phone, tablet, and desktop sizes. |
| OpenAPI | A written API contract that tools and people can read. |
| UAT | User acceptance testing. Business owners check in-scope journeys. |
| Traceability | Links between requirements, stories, rules, and tests. |
| Decision required | The exact value, rule, or scope is unresolved and must not be assumed. |

## Status words

| Status | Beginner meaning |
|---|---|
| Mandatory | The check must pass when that feature is in scope. |
| Conditional | The check applies only when the related feature or qualifier is in scope. |
| Decision required | Acceptance waits until an unresolved decision is recorded. |

## ID guide

| ID family | What it points to | Development work | Test work |
|---|---|---|---|
| AC-001–AC-009 | Nine key marketplace journeys. | Build the journey across frontend, backend, data, and integrations. | Run the verification named in each row. |
| AC-ACC-001 | Accessible and responsive experience. | Build keyboard support, labels, contrast, and layouts. | Do keyboard, screen-reader, and responsive checks. |
| AC-QA-001–AC-QA-006 | Unit, integration, API, E2E, performance, and security quality areas. | Add the right test types for each area. | Run the mapped QA checks. |
| UX-PRES-001 | Design deliverables. | Prepare wireframes, UI kit, prototypes, and accessibility notes. | Review designs against journeys and criteria. |
| DEL-REQ-001–DEL-REL-001 | Project deliverables. | Produce documents, API contract, test plan, runbooks, UAT, and release records. | Check each deliverable exists and is linked. |
| AC-CAT-001–AC-BI-001 | Detailed module checks. | Build module behavior named by each ID. | Use the verification in the detailed index. |
| AC-SEC-001–AC-PRIV-002 | Security and privacy checks. | Enforce access control, audit, fraud review, consent, and sensitive-data protection. | Run negative authorization and privacy workflow tests. |
| AC-OPS-001–AC-OPS-003 | Environment and release operations. | Separate environments and provide logs, metrics, CI/CD, migrations, and rollback. | Review environments and run pipeline/release checks. |

Sub-IDs such as AC-001-01, AC-ACC-001-02, and UX-PRES-001-04 stay exact in the canonical acceptance criteria document.

## Topic 1 — Key journey acceptance criteria (AC-001 to AC-009)

### AC-001 — Customer purchase journey

- **What is it?** The checks for finding a product, using the cart, checking out, paying, and viewing the order.
- **Why do we need it?** This is the main way a customer buys from TradeOrbit.
- **How does it work?** The storefront shows products. The server calculates totals. The backend creates the order and manages payment state.
- **Example:** A customer finds a lamp, changes the quantity, checks out, pays with a configured method, and views shipment status.
- **What do I need to build?** Product discovery, cart, server-side totals, idempotent order creation, inventory reservation, payment handling, and order history.
- **How do I test it?** Use storefront E2E checks, API response checks, tampering tests, idempotency tests, and failure-path tests.

### AC-002 — Seller onboarding journey

- **What is it?** The checks for seller registration, verification, sensitive details, status decisions, and dashboard access.
- **Why do we need it?** Vendors must be reviewed before they use vendor-only functions.
- **How does it work?** The seller submits data. Required fields are validated. An authorized administrator records the decision.
- **Example:** A seller registers, verifies contact details, submits KYC and bank-reference data, and waits for approval.
- **What do I need to build?** Registration, verification, onboarding state, protected references for sensitive bank data, admin workflow, and role-based access.
- **How do I test it?** Use vendor portal E2E, API/storage checks, admin workflow tests, and authorization tests.

### AC-003 — Product publishing and moderation journey

- **What is it?** The checks for submitting, validating, moderating, and importing product listings.
- **Why do we need it?** Catalogue quality depends on complete and approved listings.
- **How does it work?** A vendor submits a product. Validation runs. A moderator records approval or rejection. Only eligible approved products become public.
- **Example:** A vendor uploads a product with variants and images. A moderator reviews it before shoppers can see it.
- **What do I need to build?** Product submission, validation, review workflow, decision reasons, duplicate/flagging support where rules exist, and bulk import reports.
- **How do I test it?** Use vendor API/UI tests, validation tests, moderation E2E, rule tests, and bulk import tests.

### AC-004 — Multi-vendor order journey

- **What is it?** The checks for one customer-facing parent order with split fulfilment units.
- **Why do we need it?** A customer may buy from several vendors, warehouses, or shipments in one order.
- **How does it work?** The parent order stays visible to the customer. Fulfilment units progress separately.
- **Example:** A customer buys a chair from one vendor and a lamp from another. The customer sees one order and two shipment statuses.
- **What do I need to build?** Parent order, split rules, fulfilment units, shipment-level status, and customer order summary.
- **How do I test it?** Use order E2E, order data/API tests, and shipment status tests.

### AC-005 — Inventory safety journey

- **What is it?** The checks for reserving, committing, releasing, and auditing stock.
- **Why do we need it?** Limited stock must not be oversold.
- **How does it work?** Checkout reserves stock with expiry. Success commits the movement. Failure releases it safely.
- **Example:** Two customers try to buy the last SKU at the same time. The system applies reservations atomically.
- **What do I need to build?** Atomic reservations, expiry, stock movements, audit history, and inventory operation workflows.
- **How do I test it?** Use concurrency, integration, expiry/failure-path, and inventory workflow tests.

### AC-006 — Payment integrity journey

- **What is it?** The checks for safe payment data, verified callbacks, duplicates, reconciliation, refunds, and finance records.
- **Why do we need it?** Payment state must match verified provider state.
- **How does it work?** Hosted or tokenized flows are used. Webhooks are verified. Duplicate events are applied idempotently.
- **Example:** A payment provider sends the same callback twice. The system updates state once and does not create another charge.
- **What do I need to build?** Payment adapter, webhook signature checks, idempotent handling, status reconciliation, refund records, and finance reports.
- **How do I test it?** Use payment sandbox/E2E, webhook signature, replay/idempotency, failure/reconciliation, refund, and finance report tests.

### AC-007 — Returns, exchanges and refunds journey

- **What is it?** The checks for requesting, approving, tracking, inspecting, refunding, and exchanging returns.
- **Why do we need it?** Returns affect goods, money, inventory, and customer trust.
- **How does it work?** Eligibility is checked against configured policy. Decisions and returned-goods outcomes are recorded.
- **Example:** A customer returns a damaged item with evidence. After approval, pickup, inspection, and a refund or replacement are recorded.
- **What do I need to build?** Return request, decision workflow, pickup/tracking, dispositions, refund records, replacement links, and reporting.
- **How do I test it?** Use return request E2E, workflow, warehouse, refund/finance, exchange E2E, and reporting tests.

### AC-008 — Vendor settlement journey

- **What is it?** The checks for settlement calculation, approval, payout, reconciliation, and vendor visibility.
- **Why do we need it?** Vendors need accurate payable records.
- **How does it work?** Ledger entries feed settlement. Finance approves or rejects. Payout status is reconciled.
- **Example:** A vendor opens a statement and sees payout status for eligible completed transactions.
- **What do I need to build?** Ledger-based settlement, approval workflow, payout reconciliation, and vendor portal views.
- **How do I test it?** Use ledger/settlement, commission rule, approval, payout reconciliation, and vendor portal E2E tests.

### AC-009 — Administration and audit journey

- **What is it?** The checks for authenticated admin access, fine-grained permissions, audit records, configuration scope, and dashboards.
- **Why do we need it?** Administrative tools are powerful and must be limited.
- **How does it work?** The server checks roles and permissions. Privileged actions create audit records.
- **Example:** A sub-admin tries to change bank details but lacks permission, so access is denied.
- **What do I need to build?** RBAC, negative authorization, audit logging, controlled configuration, and role-aware dashboards.
- **How do I test it?** Use RBAC matrix, negative authorization, audit log, configuration, and dashboard/report tests.

## Topic 2 — Accessibility acceptance criteria (AC-ACC-001)

- **What is it?** Checks for keyboard use, assistive technology, colour contrast, zoom, and responsive layouts.
- **Why do we need it?** More users can shop and manage accounts when pages are usable by different people and devices.
- **How does it work?** Design and code must support semantic headings, labels, landmarks, alternative text, visible focus, and agreed breakpoints.
- **Example:** A shopper uses only the keyboard to move from product search to checkout.
- **What do I need to build?** Accessible components, visible focus states, semantic markup, alternative text, and responsive layouts.
- **How do I test it?** Use manual keyboard tests, automated checks, screen-reader audits, accessibility audits, and responsive tests.

## Topic 3 — QA acceptance criteria (AC-QA-001 to AC-QA-006)

- **What is it?** Checks for unit, integration, API, E2E, performance/load/compatibility, and security coverage.
- **Why do we need it?** Different problems appear at different layers.
- **How does it work?** Tests map to QA references and must cover valid, invalid, and boundary cases.
- **Example:** A coupon unit test checks eligibility. An API test checks authentication and validation. An E2E test completes checkout.
- **What do I need to build?** Deterministic tests, database transaction tests, adapter tests, contract tests, workflow tests, and security tests.
- **How do I test it?** Run the mapped QA suites and record evidence. Numeric thresholds are only recorded after the relevant decision.

## Topic 4 — UX and design deliverable acceptance (UX-PRES-001)

- **What is it?** Checks for wireframes, a UI kit or design system, prototypes, accessibility annotations, and linked designs.
- **Why do we need it?** Builders need an agreed design before implementing journeys.
- **How does it work?** Designs are reviewed against journeys and linked to criteria and tickets.
- **Example:** A vendor onboarding wireframe is linked to the onboarding acceptance criteria.
- **What do I need to build?** Design files for storefront, cart/checkout, account views, vendor portal, admin console, and in-scope workspaces.
- **How do I test it?** Run design reviews, design system reviews, prototype walkthroughs, accessibility reviews, and traceability reviews.

## Topic 5 — Project deliverable acceptance

- **What is it?** Checks that required documents, API contract, test plan, runbooks, UAT sign-off, and release package exist.
- **Why do we need it?** A marketplace needs more than working code to be operated safely.
- **How does it work?** Each deliverable is linked to an SRS reference and reviewed.
- **Example:** A release package includes migration plan, rollback plan, environment configuration, and approved deployment record.
- **What do I need to build?** Requirements, architecture/data design, UX package, OpenAPI contract, test plan, operations docs, security evidence, UAT, and release records.
- **How do I test it?** Check each deliverable against its acceptance outcome and reference.

## Topic 6 — Functional coverage matrix

- **What is it?** A map from SRS domains to FR ranges, stories, acceptance coverage, and status notes.
- **Why do we need it?** It helps spot areas that are covered and areas waiting on decisions.
- **How does it work?** Each domain row points to requirement IDs and acceptance IDs.
- **Example:** The cart/checkout row links guest and customer stories to AC-001, AC-004, and AC-005.
- **What do I need to build?** Features for in-scope domains, while respecting conditional notes and unresolved decisions.
- **How do I test it?** Use the linked acceptance criteria and check that decision-dependent items are not assumed.

## Topic 7 — Detailed module acceptance index

- **What is it?** Module-level acceptance IDs used by user stories.
- **Why do we need it?** It gives finer checks than the nine key journeys.
- **How does it work?** Each ID names an outcome, verification, and status.
- **Example:** AC-SHIP-003 checks that failed delivery, reattempt, RTO, and reverse pickup are recorded.
- **What do I need to build?** The module behavior named by each ID, including conditional features only when in scope.
- **How do I test it?** Use the verification column. Keep Mandatory, Conditional, and Decision required meanings unchanged.

## Topic 8 — Acceptance pass rule

- **What is it?** The rule for deciding if criteria pass.
- **Why do we need it?** It prevents assuming conditional or undecided items are accepted.
- **How does it work?** Mandatory criteria must pass. Conditional criteria apply only in scope. Decision-required criteria wait for decisions. Evidence must exist. Critical journeys are re-run after deployment.
- **Example:** A decision-required commission value cannot be accepted until the decision is recorded.
- **What do I need to build?** Evidence links for each criterion and regression runs for critical journeys.
- **How do I test it?** Check the evidence type: test result, review record, demo recording, or signed approval.

## Current status note (2026-11-22)

The beginner explanations above reflect the earlier project state. Current approved G1–G8 decisions are in `../requirements/SRS.md` §12A and `../audits/AUTHENTICATION-IMPLEMENTATION-PLAN.md`. Where those explanations say MFA, guest checkout, Google sign-in, admin portal topology, or package manager are pending, use the approved decisions. Transactional notifications are mandatory; other marketing features remain conditional unless separately decided.

## Canonical source

The explanations above introduce what acceptance criteria check and how to read the ID families. The complete criteria document is [ACCEPTANCE-CRITERIA.md](../requirements/ACCEPTANCE-CRITERIA.md). That canonical file is the source of truth for acceptance criteria IDs, verification coverage, and traceability.