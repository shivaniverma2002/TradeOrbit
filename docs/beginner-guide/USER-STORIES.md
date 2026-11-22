# USER-STORIES.md — Beginner-Friendly Copy

> Learning copy only. No requirement, ID, business rule, API contract, architecture decision, or status was changed. The current canonical document is linked at the end of this guide.

## Start here

This file explains `USER-STORIES.md` in simple English.

A user story describes something a person wants to do and why. The original file keeps every story ID and status exact. This guide explains the stories as development work.

## Plain-English terms

| Term you will see | Simple meaning |
|---|---|
| User story | A short statement of a user need: who, what, and why. |
| Persona | The type of user, such as guest, customer, vendor, or admin. |
| Portal | A website area for a specific role. |
| Acceptance reference | An ID that points to how the story will be checked. |
| SRS / FR reference | Links to the requirement that the story supports. |
| Mandatory | The story is directly stated or required by scope. |
| Conditional | The story applies only when its qualifier applies. |
| Decision required | A portal, policy, provider, or scope choice is unresolved. |
| KYC | Know Your Customer. Checks used to verify a seller’s business identity. |
| SKU | Stock keeping unit. A code for a specific sellable product variant. |
| RBAC | Role-based access control. Permissions depend on the user role. |
| Least privilege | Give each user only the access they truly need. |
| POD | Proof of delivery. Evidence that a delivery happened. |
| RTO | Return to origin. A shipment goes back to the sender. |
| CSAT | Customer satisfaction score. |
| SLA | Service level agreement. An agreed service target. |
| Deep link | A link that opens a specific screen inside an app. |
| E2E | End-to-end. A test that follows a complete user journey. |
| API contract | The agreed request and response format for an API. |

## Story ID families

| Story IDs | Persona | Development work | Test work |
|---|---|---|---|
| US-GUEST-001–US-GUEST-005 | Guest visitor | Browse, search, view details, cart where allowed, and register or guest checkout where policy allows. | Storefront E2E, search UI, cart, and identity checks. |
| US-CUST-001–US-CUST-016 | Customer | Account, addresses, order history, comparison, checkout, payment, delivery tracking, returns, reviews, support, optional benefits, privacy, and mobile. | Identity E2E, account API, checkout, payment, return, privacy, and responsive tests. |
| US-VEND-001–US-VEND-017 | Vendor / seller | Onboarding, KYC, profile, dashboard, products, moderation, stock, orders, shipping, returns, settlements, scorecards, staff, optional subscriptions, and reviews. | Vendor portal E2E, role tests, workflow tests, and finance tests. |
| US-VENDORSTAFF-001–US-VENDORSTAFF-002 | Vendor staff | Assigned tasks and recorded activity under vendor-owner permissions. | Negative RBAC and audit tests. |
| US-ADMIN-001–US-ADMIN-007 | Marketplace administrator | Dashboard, admin creation, management, configuration, merchandising, moderation, and system controls. | RBAC, admin workflow, configuration, and audit tests. |
| US-SUPPORT-001–US-SUPPORT-006 | Support agent | Tickets, history, optional chat, help content, disputes, SLA, codes, CSAT, and analytics. | Support workflow, dispute E2E, and reporting tests. |
| US-WAREHOUSE-001–US-WAREHOUSE-006 | Warehouse / fulfilment operator | Receiving, stock movements, picking, packing, dispatch, alerts, returns inspection, optional traceability, and optional procurement. | Fulfilment E2E, inventory workflow, alert, and disposition tests. |
| US-DELIVERY-001–US-DELIVERY-005 | Delivery / logistics operator | Assignments, milestones, exceptions, POD where supported, and optional app features. | Tracking E2E, exception workflow, POD, and mobile tests where in scope. |
| US-FINANCE-001–US-FINANCE-006 | Finance operator | Reconciliation, refunds, settlement, payout approval, invoices, optional COD, exports, and exceptions. | Finance document, refund, settlement, reconciliation, and export tests. |
| US-SUPERADMIN-001–US-SUPERADMIN-004 | Super administrator | Global configuration, admin roles, audit/security settings, and deployment readiness controls. | Authorization, audit, dependency, and deployment configuration checks. |
| US-OPS-001–US-OPS-007 | Operational stories | Environment separation, logs, metrics, traces, alerts, backups, restore drills, CI/CD, rollback, launch checks, and consistent API contracts. | Environment review, observability, pipeline, release, and contract tests. |
| US-PRIV-001–US-PRIV-001 | Privacy stories | Consent records, notices, retention, export/deletion workflows, and restricted sensitive data. | Privacy workflow and sensitive-data access tests. |
| US-SEC-001–US-SEC-002 | Security stories | Authentication, RBAC, injection/XSS/CSRF protections, rate limits, secure uploads, fraud signals, and review queues. | Authorization matrix, security, fraud, and manual review tests. |

Every individual story ID stays exact in the canonical user stories document.

## Topic 1 — Guest visitor

- **What is it?** Stories for people who browse without an account.
- **Why do we need it?** Many shoppers explore before they register or buy.
- **How does it work?** Public pages show catalogue data. Guest cart and checkout depend on policy.
- **Example:** A visitor searches for a phone case, opens a product page, and checks delivery information.
- **What do I need to build?** Category and brand pages, search, filters, sorting, product details, and cart or checkout paths allowed by policy.
- **How do I test it?** Use storefront E2E, search API/UI tests, product detail checks, and authorization checks for cart paths.

## Topic 2 — Customer

- **What is it?** Stories for registered shoppers managing account, purchase, review, support, privacy, and mobile needs.
- **Why do we need it?** Customers need a complete self-service purchase experience.
- **How does it work?** Identity protects the account. Backend rules calculate totals. Customer pages show orders, returns, and history.
- **Example:** A customer saves an address, checks out, tracks a shipment, requests a return, and views the refund.
- **What do I need to build?** Registration, profile, addresses, order history, cart/checkout, payment, delivery status, returns, reviews, support, optional wallet/loyalty, privacy requests, and responsive screens.
- **How do I test it?** Use identity E2E, account API tests, server-calculation tests, payment tests, return E2E, privacy workflow tests, and responsive tests.

## Topic 3 — Vendor / seller

- **What is it?** Stories for sellers onboarding, managing products and orders, shipping, returns, money, staff, and feedback.
- **Why do we need it?** Vendors need tools to operate their shop inside the marketplace.
- **How does it work?** Vendors submit data, pass verification, manage their catalogue, and use role-limited tools.
- **Example:** A vendor adds a product, receives an order, creates a shipment, and opens a settlement statement.
- **What do I need to build?** Onboarding, KYC fields, protected bank references, profile, dashboard, product workflow, stock, orders, shipping, returns, settlements, scorecards, staff permissions, optional subscriptions, and review responses where permitted.
- **How do I test it?** Use vendor portal E2E, role-based tests, product validation, fulfilment E2E, shipping integration, finance tests, and sensitive-data checks.

## Topic 4 — Vendor staff

- **What is it?** Stories for staff who act only under permissions set by the vendor owner.
- **Why do we need it?** Staff must not exceed their authority.
- **How does it work?** The vendor owner assigns permissions. The backend checks scope and activity is recorded.
- **Example:** A staff member can pack orders but cannot change payout details.
- **What do I need to build?** Staff accounts, permission assignment, backend scope checks, and activity history.
- **How do I test it?** Use negative RBAC tests and audit/activity checks.

## Topic 5 — Marketplace administrator

- **What is it?** Stories for admins who monitor and operate the platform.
- **Why do we need it?** Administrators need controlled tools for governance and daily operations.
- **How does it work?** Fine-grained permissions protect actions. Dashboards show allowed metrics. Configuration changes are controlled.
- **Example:** An admin reviews a flagged product and updates a configuration field within permission.
- **What do I need to build?** Admin dashboard, admin/sub-admin creation, management screens, configuration, merchandising tools, moderation queues, disputes, audit logs, and operational controls.
- **How do I test it?** Use RBAC matrix tests, admin workflow tests, configuration tests, negative authorization, and audit tests.

## Topic 6 — Support agent

- **What is it?** Stories for ticket handling, history, disputes, help content, and service quality.
- **Why do we need it?** Customer and vendor issues need a controlled workflow.
- **How does it work?** Tickets are categorized, prioritized, assigned, and escalated. Communication and internal notes stay available to authorized users.
- **Example:** A support agent opens a dispute ticket for a delayed shipment and records notes.
- **What do I need to build?** Ticket workflow, communication history, internal notes, optional chat, FAQs/help centre, dispute management, SLA tracking, resolution codes, CSAT, and analytics.
- **How do I test it?** Use support workflow tests, dispute E2E, channel tests where selected, and reporting tests.

## Topic 7 — Warehouse / fulfilment operator

- **What is it?** Stories for receiving, stock, picking, packing, dispatch, alerts, returns, traceability, and procurement.
- **Why do we need it?** Orders and inventory must be accurate in the real world.
- **How does it work?** Operators record movements and outcomes. Some features apply only when launch decisions allow them.
- **Example:** A warehouse operator records stock-in, picks an order, and inspects a returned item.
- **What do I need to build?** Receiving, stock-in/out, adjustments, cycle counts, transfers, reconciliation, picking, packing, dispatch, alerts, return dispositions, optional batch/lot/serial/expiry tracking, and optional purchase orders.
- **How do I test it?** Use fulfilment E2E, inventory workflow, alert/report, disposition, traceability, and procurement tests where in scope.

## Topic 8 — Delivery / logistics operator

- **What is it?** Stories for assignments, milestone updates, exceptions, POD, and optional mobile app features.
- **Why do we need it?** Customers and operators need current shipment status.
- **How does it work?** Delivery users update milestones and exceptions. Some tools depend on the portal or app model decision.
- **Example:** A delivery user records a failed delivery and a reattempt.
- **What do I need to build?** Assignment views, milestone updates, failed delivery, reattempt, RTO, reverse pickup, POD where supported, and optional push notifications/deep links.
- **How do I test it?** Use tracking E2E, exception workflow tests, POD checks where supported, and mobile app tests where in scope.

## Topic 9 — Finance operator

- **What is it?** Stories for reconciliation, refunds, settlement, payout, documents, optional COD, exports, and exceptions.
- **Why do we need it?** Money movement must be accurate and traceable.
- **How does it work?** Finance users review verified state, process eligible refunds, approve payouts, and export exception reports.
- **Example:** A finance operator reconciles a failed payment and reviews an unmatched transaction.
- **What do I need to build?** Reconciliation views, refund processing, settlement and payout approval, invoices, credit notes, receipts, statements, optional COD reconciliation, exports, and exception reports.
- **How do I test it?** Use payment/refund tests, settlement tests, finance document tests, reconciliation tests, and export tests.

## Topic 10 — Super administrator

- **What is it?** Stories for global configuration, admin roles, audit/security settings, and secure deployment readiness.
- **Why do we need it?** Platform-wide controls need the highest level of care.
- **How does it work?** Global settings are restricted. Critical changes are traceable. Deployment controls are assessed.
- **Example:** A super administrator changes a system setting and the audit record shows who made the change.
- **What do I need to build?** Global configuration, role/permission management, audit records, security settings, dependency/vulnerability controls, and secure deployment configuration.
- **How do I test it?** Use authorization tests, audit tests, dependency checks, and deployment configuration reviews.

## Topic 11 — Operational stories

- **What is it?** Stories for environments, observability, backups, CI/CD, rollback, launch checks, and consistent API contracts.
- **Why do we need it?** A marketplace must be operated, monitored, recovered, and released safely.
- **How does it work?** Environments are isolated. Logs, metrics, and traces detect issues. Pipelines control releases.
- **Example:** A staging deployment runs migrations, records approvals, and can be rolled back.
- **What do I need to build?** Local/test/staging/production separation, structured logs, metrics, traces, alerts, error monitoring, backups, restore drills, CI/CD, migrations, approvals, rollback, launch checks, and consistent client contracts.
- **How do I test it?** Use environment reviews, observability tests, restore drills, pipeline/release tests, contract tests, and scope reviews for optional channels.

## Topic 12 — Privacy and security stories

- **What is it?** Stories for consent, notices, retention, export/deletion, authentication, RBAC, common attack protections, secure uploads, and fraud review.
- **Why do we need it?** Personal data and platform access must be protected.
- **How does it work?** Backend checks protect operations. Privacy workflows handle requests. Fraud signals go to manual review queues.
- **Example:** A user requests data deletion. The workflow follows policy and sensitive data stays restricted.
- **What do I need to build?** Consent records, privacy notices, retention handling, export/deletion workflows, authentication, RBAC, injection/XSS/CSRF protections, rate limits, secure uploads, fraud signals, monitoring, and review queues.
- **How do I test it?** Use privacy workflow tests, authorization matrix tests, negative RBAC, malicious input tests, upload security tests, and fraud workflow tests.

## Topic 13 — How stories connect to acceptance criteria

- **What is it?** Each story row links to SRS/FR references and an acceptance reference.
- **Why do we need it?** Links show how a user need becomes testable work.
- **How does it work?** Build the story behavior. Use the acceptance reference to decide how to verify it.
- **Example:** US-CUST-008 links to idempotent order submission and AC-006.
- **What do I need to build?** A change that can be traced from story ID to requirement ID to acceptance ID.
- **How do I test it?** Run the named acceptance checks without changing the IDs or statuses.

## Current status note (2026-11-22)

The beginner explanations above reflect the earlier project state. Current approved G1–G8 decisions are in `../requirements/SRS.md` §12A and `../audits/AUTHENTICATION-IMPLEMENTATION-PLAN.md`. Where those explanations say MFA, guest checkout, Google sign-in, admin portal topology, or package manager are pending, use the approved decisions. Transactional notifications are mandatory; other marketing features remain conditional unless separately decided.

## Canonical source

The explanations above introduce the user-story families and how to read story scope. The complete stories document is [USER-STORIES.md](../requirements/USER-STORIES.md). That canonical file is the source of truth for story IDs, scope, and traceability.