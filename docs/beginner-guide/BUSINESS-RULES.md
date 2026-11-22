# BUSINESS-RULES.md — Beginner-Friendly Copy

> Learning copy only. No requirement, ID, business rule, API contract, architecture decision, or status was changed. The current canonical document is linked at the end of this guide.

## Start here

This file explains `BUSINESS-RULES.md` in simple English.

A business rule is a statement about how TradeOrbit must behave. This guide explains rules as development work. It does not add new rules or choose unresolved values.

## Plain-English terms

| Term you will see | Simple meaning |
|---|---|
| Business rule | A behavior the marketplace must follow. |
| Mandatory | The rule is directly stated or required by scope. |
| Conditional | The rule applies only when its qualifier applies. |
| Decision required | A value, policy, model, or state change is unresolved. |
| SKU | Stock keeping unit. A code for a specific sellable product variant. |
| Variant | A version of a product, such as a size or colour. |
| Moderation | Reviewing submitted content before it becomes public. |
| KYC | Know Your Customer. Checks used to verify a seller’s business identity. |
| Tokenized | Replaced with a safe reference instead of storing the raw sensitive value. |
| CSV or Excel import | Uploading many product rows from a spreadsheet file. |
| State | A named step in a workflow, such as Draft or Published. |
| State transition | A move from one state to another. |
| Atomic | A group of steps either all happen or none happen. |
| Concurrency | Multiple users acting at the same time. |
| Ledger | An append-only record of money movements. |
| Immutable | Cannot be changed after it is written. |
| Compensating entry | A new ledger entry that corrects an earlier entry without overwriting it. |
| Fixed-precision decimal | A number format that avoids money rounding problems. |
| Floating-point arithmetic | Number math that can cause tiny rounding errors. Not allowed for money here. |
| Webhook | A callback message from another system, such as a payment provider. |
| Disposition | The chosen outcome for returned stock, such as restock or write-off. |
| RBAC | Role-based access control. Permissions depend on the user role. |
| Audit | A record of who did what and when. |
| Feature flag | A switch that turns a feature on or off for a scope. |
| SEO | Search engine optimisation. Fields that help search engines understand pages. |
| BI | Business intelligence. Reports and dashboards for decisions. |

## Status words

| Status | Beginner meaning |
|---|---|
| Mandatory | Build and test this rule. |
| Conditional | Build and test it only when the stated condition is in scope. |
| Decision required | Ask for the missing value or policy before implementing it. |

## Rule ID families

| Rule IDs | Area | Development work | Test work |
|---|---|---|---|
| BR-CAT-001–BR-CAT-010 | Catalogue | Product data, variants, media, identifiers, status workflow, moderation, bulk import, groupings, and product types. | Validation, workflow, import report, and visibility tests. |
| BR-VEN-001–BR-VEN-012 | Vendor | Registration, verification, profile, dashboard, settings, moderation, commission, statements, scorecards, and staff limits. | Vendor portal E2E, role tests, and sensitive-data checks. |
| BR-CUS-001–BR-CUS-008 | Customer | Accounts, preferences, addresses, segmentation, self-service, wallet, loyalty, and privacy requests. | Identity, account API, ledger, consent, and privacy tests. |
| BR-PRICE-001–BR-PRICE-008 | Pricing/tax/promotions | Price concepts, coupons, campaigns, eligibility, tax configuration, audit trail, and server totals. | Unit tests for calculations and tampering tests for totals. |
| BR-CHK-001–BR-CHK-008 | Cart/checkout | Cart lines, checkout policy, server calculations, reservations, idempotency, and consent for recovery messages. | Cart API, server-calculation, idempotency, expiry, and consent tests. |
| BR-INV-001–BR-INV-010 | Inventory | Stock quantities, locations, operations, alerts, reservations, traceability, and valuation. | Workflow, concurrency, expiry, and audit-history tests. |
| BR-ORD-001–BR-ORD-009, BR-SHIP-001–BR-SHIP-007 | Orders/shipping | Parent orders, fulfilment units, controlled status changes, labels, tracking, exceptions, and proof where supported. | Order E2E, shipment status, label, tracking, and exception tests. |
| BR-FIN-001–BR-FIN-009 | Finance | Money precision, immutable ledger, payments, refunds, settlement, payout, invoices, and verified webhooks. | Ledger, reconciliation, refund, webhook replay, and document tests. |
| BR-RET-001–BR-RET-008 | Returns | Eligibility configuration, request details, decisions, pickup, inspection, dispositions, refunds, exchanges, and analytics. | Return workflow, warehouse, refund, exchange, and reporting tests. |
| BR-REV-001–BR-REV-005, BR-SUP-001–BR-SUP-006 | Reviews/support | Ratings, moderation, spam checks, tickets, internal notes, disputes, SLA tracking, and analytics. | Review, moderation, support workflow, dispute, and analytics tests. |
| BR-MKT-001–BR-MKT-007, BR-CMS-001–BR-CMS-005, BR-BI-001 | Marketing/content/reporting | Notifications, campaigns, consent controls, banners, pages, SEO fields, sitemap, and protected reports. | Consent, CMS, export, role-protection, and reporting tests. |
| BR-ADM-001–BR-ADM-007, BR-SEC-001–BR-SEC-004 | Admin/security | Dashboards, RBAC, management screens, configuration, audit, privacy controls, and sensitive-data protection. | RBAC matrix, negative authorization, audit, privacy, and sensitive-data tests. |

Each individual ID stays exact in the canonical business rules document.

## Topic 1 — Catalogue and product listing rules

- **What is it?** Rules for creating and managing products, variants, media, identifiers, statuses, moderation, imports, and groupings.
- **Why do we need it?** Customers need accurate catalogue data, and only eligible products should be public.
- **How does it work?** Vendors submit data. The backend validates it. Moderation records a decision. Product status controls visibility.
- **Example:** A vendor submits a T-shirt with size variants, SKUs, images, and attributes. The listing waits for review before shoppers see it.
- **What do I need to build?** Product CRUD with permissions, variants, media, identifiers, validation, status workflow, moderation, bulk import/export reports, and groupings.
- **How do I test it?** Use API/UI validation tests, workflow tests, moderation E2E, bulk import tests, and public visibility checks.

## Topic 2 — Vendor onboarding and management rules

- **What is it?** Rules for seller registration, verification, profile, dashboard, settings, moderation, commission, settlement, scorecards, and staff.
- **Why do we need it?** The platform must know who sells, what they may do, and what they are paid.
- **How does it work?** Sellers submit details. Administrators record decisions. Permissions limit vendor staff. Protected references are used for sensitive bank data.
- **Example:** A seller completes onboarding and adds a logo and return policy. An administrator approves the vendor before vendor-only actions are allowed.
- **What do I need to build?** Onboarding, verification, admin decision workflow, storefront profile, dashboard, commission setup, settlement views, scorecards, and staff permissions.
- **How do I test it?** Use vendor portal E2E, integration/API tests, storage inspection, role-based tests, and commission rule tests.

## Topic 3 — Customer account rules

- **What is it?** Rules for login, verification, profile, addresses, segmentation, self-service, wallet, loyalty, and privacy requests.
- **Why do we need it?** Customers need reliable accounts and control over their data.
- **How does it work?** Identity functions manage access. Backend validation protects account data. Optional features apply only if enabled.
- **Example:** A customer saves a home address as default and later requests a data export.
- **What do I need to build?** Registration, login/logout, verification, password reset, profile settings, address validation, order history, consent-aware optional features, and privacy workflows.
- **How do I test it?** Use identity E2E, account API tests, address validation tests, ledger tests where enabled, and privacy workflow tests.

## Topic 4 — Pricing, tax and promotion rules

- **What is it?** Rules for price types, coupons, promotions, eligibility, tax configuration, audit trail, and server-side totals.
- **Why do we need it?** Prices and discounts must be reliable, explainable, and protected from client tampering.
- **How does it work?** Price concepts are stored. Promotion eligibility is evaluated. The server calculates the final payable amount.
- **Example:** A customer applies a coupon to a cart. The server checks eligibility and calculates the final amount.
- **What do I need to build?** Price fields, coupon logic, campaign logic, eligibility rules, tax configuration fields, audit trail, and server calculation.
- **How do I test it?** Use deterministic unit tests for calculations, invalid and boundary cases, conflicting discount checks, and client-tampering tests.

## Topic 5 — Cart, checkout and order placement rules

- **What is it?** Rules for cart lines, checkout inputs, server totals, reservations, idempotency, and consent-aware recovery messaging.
- **Why do we need it?** Checkout must create the right order once and handle stock safely.
- **How does it work?** Cart lines are persisted. The server calculates totals. Stock is reserved with expiry. Duplicate clicks must not create duplicates.
- **Example:** A customer double-clicks Place Order. The idempotency key prevents a second order.
- **What do I need to build?** Cart operations, checkout address and shipping selection, server calculation, reservation expiry, idempotent order submission, and duplicate-click protection.
- **How do I test it?** Use cart API tests, server-calculation tests, tampering tests, inventory expiry tests, and duplicate submission tests.

## Topic 6 — Inventory, procurement and warehouse rules

- **What is it?** Rules for stock quantities, locations, operations, alerts, reservations, traceability, valuation, and audits.
- **Why do we need it?** Stock must stay accurate across vendors, warehouses, checkouts, and returns.
- **How does it work?** Inventory movements update quantities and history. Reservations are released on cancellation or expiry.
- **Example:** A warehouse records stock-in for a SKU. Later, two checkouts reserve units atomically.
- **What do I need to build?** SKU/variant quantities, stock operations, alerts, reservations, audit history, optional locations, optional procurement, and optional traceability.
- **How do I test it?** Use inventory workflow tests, concurrency tests, expiry tests, alert/report tests, and audit-history checks.

## Topic 7 — Order, fulfilment and shipping rules

- **What is it?** Rules for orders, parent/child split, vendor assignment, pick/pack/dispatch, statuses, cancellation, shipping labels, tracking, and exceptions.
- **Why do we need it?** A single customer order can become several vendor or shipment workflows.
- **How does it work?** The parent order stays customer-facing. Fulfilment units and shipments track their own progress.
- **Example:** A customer buys items from two vendors. Each vendor gets a fulfilment unit and the customer sees one parent order.
- **What do I need to build?** Order creation, split logic, vendor workflows, controlled statuses, partial fulfilment, shipment creation, labels, tracking, and exception workflows.
- **How do I test it?** Use order E2E, order data/API tests, fulfilment E2E, shipment status tests, label tests, and exception workflow tests.

## Topic 8 — Finance, settlement and ledger rules

- **What is it?** Rules for money precision, immutable ledger entries, payments, refunds, settlement, payout, invoices, and verified webhooks.
- **Why do we need it?** Marketplace money records must be accurate and auditable.
- **How does it work?** Money uses fixed-precision decimals. Ledger history is not overwritten. Webhooks are verified and idempotent.
- **Example:** A refund creates the right ledger effects instead of changing an old entry.
- **What do I need to build?** Decimal money fields, append-only ledger, payment adapter, refund workflow, settlement calculation, payout reconciliation, finance documents, and webhook verification.
- **How do I test it?** Use ledger tests, payment/refund E2E, webhook signature and replay tests, reconciliation tests, and finance document tests.

## Topic 9 — Returns, exchanges and refund rules

- **What is it?** Rules for configurable eligibility, request details, decisions, pickup, inspection, dispositions, replacement orders, refunds, reversals, and analytics.
- **Why do we need it?** Returns affect products, inventory, customer money, and vendor accounting.
- **How does it work?** Eligibility is checked against configured policy. Approved returns are tracked. Inspection chooses a disposition. Refund or exchange follows.
- **Example:** A customer returns a tool. Inspection records restock or quarantine. A refund or replacement is linked to the return.
- **What do I need to build?** Return request, decision workflow, pickup tracking, disposition recording, refund initiation, replacement order, reversal handling, reason codes, and reports.
- **How do I test it?** Use return request E2E, approval/rejection workflow tests, warehouse tests, refund/finance tests, exchange E2E, and reporting tests.

## Topic 10 — Review, support and moderation rules

- **What is it?** Rules for ratings, reviews, verified-purchase indicators, moderation, spam checks, support tickets, communication history, disputes, and SLA values.
- **Why do we need it?** Feedback and support must be useful, fair, and traceable.
- **How does it work?** Eligibility rules apply. Reviews can be reported and moderated. Tickets have categories, priorities, assignment, and escalation.
- **Example:** A customer reports a suspicious review. A moderator reviews it while support keeps the dispute history.
- **What do I need to build?** Review submission, media where conditional, moderation, appeal, spam detection, ticket workflow, internal notes, dispute workflow, help content, and SLA tracking.
- **How do I test it?** Use review API/UI tests, moderation E2E, support workflow tests, dispute E2E, and analytics tests.

## Topic 11 — Marketing, content and reporting rules

- **What is it?** Rules for notifications, campaigns, loyalty, consent, merchandising, banners, pages, SEO, sitemap, and protected reports.
- **Why do we need it?** Marketing and content must respect consent and reports must be role-protected.
- **How does it work?** Optional features apply only when enabled. Consent controls apply where messages or alerts are used. Content fields are managed and published.
- **Example:** A customer receives a back-in-stock alert only where consent controls allow it.
- **What do I need to build?** Approved notification providers, campaign tools, consent controls, banners, static pages, SEO fields, sitemap, redirects, and exportable reports.
- **How do I test it?** Use consent tests, CMS E2E, SEO field checks, export tests, and role-protection tests.

## Topic 12 — Administration, audit and security rules

- **What is it?** Rules for admin dashboards, RBAC, management, configuration, audit, authentication, privacy, and sensitive-data protection.
- **Why do we need it?** Admin tools are powerful and need strict controls.
- **How does it work?** Every protected operation checks authentication and authorization. Privileged actions are audited. Sensitive data is minimized.
- **Example:** An admin changes a payout setting. The system records the actor, action, object, time, and outcome.
- **What do I need to build?** Role-protected dashboards, fine-grained permissions, management screens, configuration controls, audit records, privacy notices, consent records, and data-subject workflows.
- **How do I test it?** Use RBAC matrix tests, negative authorization tests, audit tests, privacy workflow tests, and sensitive-data access tests.

## Topic 13 — Rule traceability

- **What is it?** A table that maps SRS domains to business-rule ID ranges.
- **Why do we need it?** It helps reviewers confirm each domain has rules and every rule has a home.
- **How does it work?** Each row lists the ID range for a domain.
- **Example:** `BR-FIN-001–BR-FIN-009` points to finance rules.
- **What do I need to build?** Code and tests that can be traced back to the right ID range.
- **How do I test it?** Review changed work against the domain’s rule IDs and keep statuses unchanged.

## Current status note (2026-11-22)

The beginner explanations above reflect the earlier project state. Current approved G1–G8 decisions are in `../requirements/SRS.md` §12A and `../audits/AUTHENTICATION-IMPLEMENTATION-PLAN.md`. Where those explanations say MFA, guest checkout, Google sign-in, admin portal topology, or package manager are pending, use the approved decisions. Transactional notifications are mandatory; other marketing features remain conditional unless separately decided.

## Canonical source

The explanations above introduce the business-rule families and how to read rule status words. The complete rules document is [BUSINESS-RULES.md](../requirements/BUSINESS-RULES.md). That canonical file is the source of truth for business rule IDs, statuses, and traceability.