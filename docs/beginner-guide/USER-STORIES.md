# USER-STORIES.md — Beginner-Friendly Copy

> Learning copy only. No requirement, ID, business rule, API contract, architecture decision, or status was changed. The original content is reproduced below.

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

Every individual story ID stays exact in the original content below.

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

## Original document content (unchanged)

# User Stories

**Project:** Task 2 — E-Commerce Marketplace  
**Source of truth:** `docs/requirements/Task_2_Complete_Ecommerce_Marketplace_Specification.pdf`  
**Canonical requirements:** [SRS.md](SRS.md)  
**Related:** [BUSINESS-RULES.md](BUSINESS-RULES.md), [ACCEPTANCE-CRITERIA.md](ACCEPTANCE-CRITERIA.md)

## Status vocabulary

| Status | Meaning |
|---|---|
| **Mandatory** | Directly stated in the PDF or required by a scope requirement/checklist. |
| **Conditional** | Applies only when the PDF’s qualifier applies. |
| **Decision required** | Portal, policy, provider, or scope choice is unresolved. |

Stories are written at requirement level. They do not resolve Section 16 decisions in [SRS §12](SRS.md#12-unresolved-decisions-and-items-to-confirm).

---

## Guest visitor

| ID | User story | SRS / FR reference | Acceptance reference | Status |
|---|---|---|---|---|
| US-GUEST-001 | As a guest visitor, I want to browse the catalogue and category/brand pages so that I can discover products. | [SRS-ROLE-001](SRS.md#2-user-roles-and-portals), [FR-DISC-001](SRS.md#34-storefront-search--product-discovery) | [AC-DISC-001](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-GUEST-002 | As a guest visitor, I want to search, filter, and sort products so that I can find relevant items. | [FR-DISC-002](SRS.md#34-storefront-search--product-discovery), [FR-DISC-003](SRS.md#34-storefront-search--product-discovery), [FR-DISC-004](SRS.md#34-storefront-search--product-discovery) | [AC-DISC-002](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-GUEST-003 | As a guest visitor, I want to view product details, availability, and delivery/return information so that I can make an informed choice. | [FR-DISC-007](SRS.md#34-storefront-search--product-discovery), [FR-CAT-004](SRS.md#31-product-catalogue--product-listing) | [AC-DISC-003](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-GUEST-004 | As a guest visitor, I want to add items to a cart where permitted so that I can continue shopping or proceed to checkout. | [SRS-ROLE-001](SRS.md#2-user-roles-and-portals), [FR-CHK-001](SRS.md#36-cart-checkout--order-placement) | [AC-CHK-001](ACCEPTANCE-CRITERIA.md) | Conditional |
| US-GUEST-005 | As a guest visitor, I want to register or check out as a guest where policy allows so that I can complete a purchase. | [FR-CUS-001](SRS.md#33-customer-accounts--crm), [FR-CHK-002](SRS.md#36-cart-checkout--order-placement) | [AC-001](ACCEPTANCE-CRITERIA.md) | Conditional |

---

## Customer

| ID | User story | SRS / FR reference | Acceptance reference | Status |
|---|---|---|---|---|
| US-CUST-001 | As a customer, I want to register, log in, verify my contact details, reset my password, and use optional social sign-in so that I can access my account. | [FR-CUS-001](SRS.md#33-customer-accounts--crm) | [AC-CUST-001](ACCEPTANCE-CRITERIA.md) | Mandatory; social sign-in conditional |
| US-CUST-002 | As a customer, I want to manage my profile, preferences, communication consent, and security settings so that my account reflects my choices. | [FR-CUS-002](SRS.md#33-customer-accounts--crm), [FR-COMP-006](SRS.md#318-security-privacy--compliance) | [AC-CUST-002](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-CUST-003 | As a customer, I want multiple validated saved addresses and a default address so that checkout is faster. | [FR-CUS-003](SRS.md#33-customer-accounts--crm) | [AC-CUST-003](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-CUST-004 | As a customer, I want to see my order history, invoices, returns, refunds, wishlist, saved items, and recently viewed products so that I can manage my purchase activity. | [FR-CUS-005](SRS.md#33-customer-accounts--crm), [FR-ORD-001](SRS.md#39-order-management--fulfilment) | [AC-001](ACCEPTANCE-CRITERIA.md), [AC-CUST-004](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-CUST-005 | As a customer, I want product comparison, wishlist, recently viewed, and related recommendations so that I can evaluate products. | [FR-DISC-005](SRS.md#34-storefront-search--product-discovery) | [AC-DISC-004](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-CUST-006 | As a customer, I want the checkout to calculate tax, shipping, discounts, and final payable amount on the server so that totals are reliable. | [FR-CHK-003](SRS.md#36-cart-checkout--order-placement), [FR-CHK-005](SRS.md#36-cart-checkout--order-placement), [FR-PRICE-007](SRS.md#35-pricing-tax--promotions) | [AC-001](ACCEPTANCE-CRITERIA.md), [AC-CHK-002](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-CUST-007 | As a customer, I want coupons, gift cards, or wallet applied transparently where supported so that I understand what I pay. | [FR-CHK-004](SRS.md#36-cart-checkout--order-placement), [FR-PRICE-002](SRS.md#35-pricing-tax--promotions), [FR-PRICE-005](SRS.md#35-pricing-tax--promotions) | [AC-CHK-003](ACCEPTANCE-CRITERIA.md) | Conditional |
| US-CUST-008 | As a customer, I want duplicate-click protection and idempotent order submission so that I am not charged or ordered twice. | [FR-CHK-007](SRS.md#36-cart-checkout--order-placement), [AC-JOURNEY-006](SRS.md#4-key-user-journeys-and-acceptance-outcomes) | [AC-006](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-CUST-009 | As a customer, I want to complete payment using configured payment methods so that I can place my order. | [FR-PAY-001](SRS.md#37-payments-refunds--finance), [FR-PAY-002](SRS.md#37-payments-refunds--finance), [FR-PAY-003](SRS.md#37-payments-refunds--finance) | [AC-001](ACCEPTANCE-CRITERIA.md), [AC-006](ACCEPTANCE-CRITERIA.md) | Mandatory; methods conditional |
| US-CUST-010 | As a customer, I want to track deliveries and view shipment status so that I know when my order will arrive. | [FR-ORD-001](SRS.md#39-order-management--fulfilment), [FR-SHIP-005](SRS.md#310-shipping--logistics), [FR-SHIP-007](SRS.md#310-shipping--logistics) | [AC-001](ACCEPTANCE-CRITERIA.md), [AC-SHIP-002](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-CUST-011 | As a customer, I want to request a return or exchange with reason, comments, and evidence so that eligible purchases can be resolved. | [FR-RET-001](SRS.md#311-returns-exchanges--refunds), [FR-RET-002](SRS.md#311-returns-exchanges--refunds) | [AC-007](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-CUST-012 | As a customer, I want product/vendor ratings and reviews with a verified-purchase indicator so that other shoppers can assess quality. | [FR-REV-001](SRS.md#314-reviews-ratings--moderation), [FR-REV-002](SRS.md#314-reviews-ratings--moderation) | [AC-REV-001](ACCEPTANCE-CRITERIA.md) | Mandatory; media conditional |
| US-CUST-013 | As a customer, I want to contact support and see dispute/SLA information so that issues can be handled. | [FR-SUP-001](SRS.md#315-customer-support--disputes), [FR-SUP-004](SRS.md#315-customer-support--disputes), [FR-SUP-006](SRS.md#315-customer-support--disputes) | [AC-SUP-001](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-CUST-014 | As a customer, I want wallet/store credit and loyalty benefits where enabled so that I can use available value. | [FR-CUS-006](SRS.md#33-customer-accounts--crm), [FR-CUS-007](SRS.md#33-customer-accounts--crm), [FR-MKT-003](SRS.md#313-marketing-loyalty--engagement) | [AC-CUST-005](ACCEPTANCE-CRITERIA.md) | Conditional |
| US-CUST-015 | As a customer, I want to request account deletion or data export so that privacy obligations are met. | [FR-CUS-008](SRS.md#33-customer-accounts--crm) | [AC-PRIV-001](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-CUST-016 | As a customer using mobile, I want a responsive storefront and mobile-friendly checkout so that I can shop on my device. | [FR-MOB-001](SRS.md#319-mobile--multi-channel), [FR-MOB-003](SRS.md#319-mobile--multi-channel) | [AC-MOB-001](ACCEPTANCE-CRITERIA.md) | Mandatory; mobile app features conditional |

---

## Vendor / seller

| ID | User story | SRS / FR reference | Acceptance reference | Status |
|---|---|---|---|---|
| US-VEND-001 | As a vendor, I want to register, verify email/phone, submit my application, and follow an onboarding checklist so that my store can be reviewed. | [FR-VEN-001](SRS.md#32-vendor--seller-management) | [AC-002](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-VEND-002 | As a vendor, I want to submit KYC/business, tax, bank, and document details so that my business can be verified. | [FR-VEN-002](SRS.md#32-vendor--seller-management), [FR-COMP-003](SRS.md#318-security-privacy--compliance) | [AC-002](ACCEPTANCE-CRITERIA.md), [AC-PRIV-002](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-VEND-003 | As a vendor, I want to see approval/rejection/suspension/reactivation/termination status with reasons so that I understand my marketplace standing. | [FR-VEN-003](SRS.md#32-vendor--seller-management) | [AC-002](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-VEND-004 | As a vendor, I want to manage my storefront profile, logo, banner, description, policies, hours, and contacts so that customers see accurate store information. | [FR-VEN-004](SRS.md#32-vendor--seller-management) | [AC-VEND-001](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-VEND-005 | As a vendor, I want a dashboard for sales, orders, returns, inventory, ratings, commissions, and payouts so that I can operate my business. | [FR-VEN-005](SRS.md#32-vendor--seller-management), [FR-BI-002](SRS.md#317-reports--business-intelligence) | [AC-BI-001](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-VEND-006 | As a vendor, I want to submit products with variants, media, identifiers, and validation so that they can be moderated. | [FR-CAT-001](SRS.md#31-product-catalogue--product-listing), [FR-CAT-003](SRS.md#31-product-catalogue--product-listing), [FR-CAT-004](SRS.md#31-product-catalogue--product-listing), [FR-CAT-005](SRS.md#31-product-catalogue--product-listing) | [AC-003](ACCEPTANCE-CRITERIA.md), [AC-CAT-001](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-VEND-007 | As a vendor, I want my submitted listings moderated and only approved eligible products publicly visible so that catalogue quality is protected. | [FR-CAT-006](SRS.md#31-product-catalogue--product-listing), [FR-CAT-007](SRS.md#31-product-catalogue--product-listing) | [AC-003](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-VEND-008 | As a vendor, I want bulk product import/export with validation reports so that I can manage large catalogues. | [FR-CAT-008](SRS.md#31-product-catalogue--product-listing) | [AC-CAT-002](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-VEND-009 | As a vendor, I want to manage my prices, stock, shipping settings, and fulfilment preferences so that fulfilment reflects my operations. | [FR-VEN-006](SRS.md#32-vendor--seller-management), [FR-PRICE-001](SRS.md#35-pricing-tax--promotions), [FR-INV-003](SRS.md#38-inventory-procurement--warehouse) | [AC-INV-001](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-VEND-010 | As a vendor, I want to process assigned orders, accept/reject under rules, pick/pack/dispatch, and support partial fulfilment so that orders move to delivery. | [FR-ORD-003](SRS.md#39-order-management--fulfilment), [FR-ORD-004](SRS.md#39-order-management--fulfilment), [FR-ORD-005](SRS.md#39-order-management--fulfilment) | [AC-ORD-001](ACCEPTANCE-CRITERIA.md) | Mandatory; exact rules decision required |
| US-VEND-011 | As a vendor, I want shipment creation, labels, tracking, pickup scheduling, and exception handling so that customers receive their orders. | [FR-SHIP-002](SRS.md#310-shipping--logistics), [FR-SHIP-003](SRS.md#310-shipping--logistics), [FR-SHIP-004](SRS.md#310-shipping--logistics), [FR-SHIP-006](SRS.md#310-shipping--logistics) | [AC-SHIP-001](ACCEPTANCE-CRITERIA.md), [AC-SHIP-002](ACCEPTANCE-CRITERIA.md) | Mandatory; provider/model decision required |
| US-VEND-012 | As a vendor, I want to handle returns, inspections, dispositions, and exchanges so that returned goods and money are accounted for. | [FR-RET-003](SRS.md#311-returns-exchanges--refunds), [FR-RET-004](SRS.md#311-returns-exchanges--refunds), [FR-RET-005](SRS.md#311-returns-exchanges--refunds) | [AC-007](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-VEND-013 | As a vendor, I want commission plans, settlement statements, payout requests/status, and reconciliation so that I understand what I am paid. | [FR-VEN-008](SRS.md#32-vendor--seller-management), [FR-VEN-010](SRS.md#32-vendor--seller-management), [FR-PAY-006](SRS.md#37-payments-refunds--finance) | [AC-008](ACCEPTANCE-CRITERIA.md) | Mandatory; values decision required |
| US-VEND-014 | As a vendor, I want performance scorecards, service-level metrics, cancellation rate, and return rate so that I can improve service. | [FR-VEN-011](SRS.md#32-vendor--seller-management) | [AC-BI-001](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-VEND-015 | As a vendor, I want to manage staff accounts and permissions so that staff only perform permitted tasks. | [FR-VEN-012](SRS.md#32-vendor--seller-management) | [AC-SEC-002](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-VEND-016 | As a vendor, I want subscription plans and entitlements if subscriptions are enabled so that my adopted plan controls available features. | [FR-VEN-009](SRS.md#32-vendor--seller-management) | [AC-VEND-002](ACCEPTANCE-CRITERIA.md) | Conditional |
| US-VEND-017 | As a vendor, I want to respond to reviews where permitted and see suspicious review reports so that feedback remains fair. | [FR-REV-004](SRS.md#314-reviews-ratings--moderation), [FR-REV-005](SRS.md#314-reviews-ratings--moderation) | [AC-REV-002](ACCEPTANCE-CRITERIA.md) | Conditional for responses; mandatory detection |

---

## Vendor staff

| ID | User story | SRS / FR reference | Acceptance reference | Status |
|---|---|---|---|---|
| US-VENDORSTAFF-001 | As vendor staff, I want to perform assigned vendor tasks under permissions set by the vendor owner so that I do not exceed my authority. | [SRS-ROLE-004](SRS.md#2-user-roles-and-portals), [FR-VEN-012](SRS.md#32-vendor--seller-management) | [AC-SEC-002](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-VENDORSTAFF-002 | As vendor staff, I want my activity recorded so that the vendor owner can review actions. | [FR-VEN-012](SRS.md#32-vendor--seller-management), [FR-ADM-007](SRS.md#312-admin-console--platform-configuration) | [AC-SEC-003](ACCEPTANCE-CRITERIA.md) | Mandatory |

---

## Marketplace administrator

| ID | User story | SRS / FR reference | Acceptance reference | Status |
|---|---|---|---|---|
| US-ADMIN-001 | As a marketplace administrator, I want a super-admin dashboard with sales, orders, customers, sellers, inventory, and exception KPIs so that I can monitor the platform. | [FR-ADM-001](SRS.md#312-admin-console--platform-configuration), [FR-BI-001](SRS.md#317-reports--business-intelligence) | [AC-BI-001](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-ADMIN-002 | As a marketplace administrator, I want to create admins/sub-admins and assign fine-grained permissions so that operations are least-privilege. | [FR-ADM-002](SRS.md#312-admin-console--platform-configuration), [SEC-AUTHZ-002](../architecture/SECURITY-ARCHITECTURE.md) | [AC-SEC-001](ACCEPTANCE-CRITERIA.md), [AC-009](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-ADMIN-003 | As a marketplace administrator, I want to manage vendors, customers, products, categories, brands, orders, payments, and returns so that I can operate the marketplace. | [FR-ADM-003](SRS.md#312-admin-console--platform-configuration) | [AC-ADMIN-001](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-ADMIN-004 | As a marketplace administrator, I want to configure commissions, fees, taxes, shipping rules, policies, and serviceability so that marketplace rules are applied. | [FR-ADM-004](SRS.md#312-admin-console--platform-configuration), [FR-PRICE-006](SRS.md#35-pricing-tax--promotions) | [AC-ADMIN-002](ACCEPTANCE-CRITERIA.md) | Mandatory; values decision required |
| US-ADMIN-005 | As a marketplace administrator, I want to manage coupons, banners, campaigns, homepage sections, and content pages so that merchandising is controlled. | [FR-ADM-005](SRS.md#312-admin-console--platform-configuration), [FR-CMS-001](SRS.md#316-content-management--seo) | [AC-CMS-001](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-ADMIN-006 | As a marketplace administrator, I want moderation queues, disputes, flagged reviews, and compliance workflows so that policy breaches are handled. | [FR-ADM-006](SRS.md#312-admin-console--platform-configuration), [FR-REV-003](SRS.md#314-reviews-ratings--moderation), [FR-SUP-005](SRS.md#315-customer-support--disputes) | [AC-003](ACCEPTANCE-CRITERIA.md), [AC-SUP-002](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-ADMIN-007 | As a marketplace administrator, I want system configuration, feature flags, audit logs, and operational controls so that the platform can be governed. | [FR-ADM-007](SRS.md#312-admin-console--platform-configuration), [FR-OPS-002](SRS.md#320-platform-operations--reliability) | [AC-009](ACCEPTANCE-CRITERIA.md), [AC-OPS-001](ACCEPTANCE-CRITERIA.md) | Mandatory |

---

## Support agent

| ID | User story | SRS / FR reference | Acceptance reference | Status |
|---|---|---|---|---|
| US-SUPPORT-001 | As a support agent, I want ticket creation, categories, priorities, assignment, and escalation so that customer/vendor issues are tracked. | [FR-SUP-001](SRS.md#315-customer-support--disputes) | [AC-SUP-001](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-SUPPORT-002 | As a support agent, I want customer/vendor communication history and internal notes so that context is preserved. | [FR-SUP-002](SRS.md#315-customer-support--disputes) | [AC-SUP-002](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-SUPPORT-003 | As a support agent, I want live chat or chatbot integration if selected so that support channels match the chosen model. | [FR-SUP-003](SRS.md#315-customer-support--disputes) | [AC-SUP-003](ACCEPTANCE-CRITERIA.md) | Conditional |
| US-SUPPORT-004 | As a support agent, I want FAQs, help centre, and policy knowledge base tools so that common questions are answered. | [FR-SUP-004](SRS.md#315-customer-support--disputes), [FR-CMS-002](SRS.md#316-content-management--seo) | [AC-CMS-001](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-SUPPORT-005 | As a support agent, I want dispute management for orders, returns, payments, and vendors so that disputes have a controlled workflow. | [FR-SUP-005](SRS.md#315-customer-support--disputes) | [AC-SUP-002](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-SUPPORT-006 | As a support agent, I want SLA tracking, resolution codes, CSAT, and support analytics so that service quality is measurable. | [FR-SUP-006](SRS.md#315-customer-support--disputes), [FR-BI-004](SRS.md#317-reports--business-intelligence) | [AC-BI-001](ACCEPTANCE-CRITERIA.md) | Mandatory; SLA values decision required |

---

## Warehouse / fulfilment operator

| ID | User story | SRS / FR reference | Acceptance reference | Status |
|---|---|---|---|---|
| US-WAREHOUSE-001 | As a warehouse operator, I want to manage receiving, stock movements, picking, packing, and dispatch so that orders are fulfilled. | [SRS-ROLE-007](SRS.md#2-user-roles-and-portals), [FR-ORD-004](SRS.md#39-order-management--fulfilment), [FR-INV-003](SRS.md#38-inventory-procurement--warehouse) | [AC-ORD-001](ACCEPTANCE-CRITERIA.md), [AC-INV-001](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-WAREHOUSE-002 | As a warehouse operator, I want SKU/variant quantities, stock-in/out, adjustments, cycle counts, transfers, and reconciliation so that inventory is accurate. | [FR-INV-001](SRS.md#38-inventory-procurement--warehouse), [FR-INV-002](SRS.md#38-inventory-procurement--warehouse), [FR-INV-003](SRS.md#38-inventory-procurement--warehouse) | [AC-INV-001](ACCEPTANCE-CRITERIA.md) | Mandatory; central/multi-warehouse conditional |
| US-WAREHOUSE-003 | As a warehouse operator, I want low-stock and out-of-stock alerts and replenishment reports so that stock gaps are visible. | [FR-INV-004](SRS.md#38-inventory-procurement--warehouse) | [AC-INV-002](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-WAREHOUSE-004 | As a warehouse operator, I want to inspect returns and record restock/repair/quarantine/write-off dispositions so that returned goods are handled. | [FR-RET-004](SRS.md#311-returns-exchanges--refunds), [FR-INV-008](SRS.md#38-inventory-procurement--warehouse) | [AC-007](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-WAREHOUSE-005 | As a warehouse operator, I want batch/lot/serial/expiry tracking where applicable so that product types requiring traceability are supported. | [FR-INV-007](SRS.md#38-inventory-procurement--warehouse) | [AC-INV-003](ACCEPTANCE-CRITERIA.md) | Conditional |
| US-WAREHOUSE-006 | As a warehouse operator, I want purchase orders and supplier records if procurement is in scope so that replenishment is managed. | [FR-INV-006](SRS.md#38-inventory-procurement--warehouse) | [AC-INV-004](ACCEPTANCE-CRITERIA.md) | Conditional |

---

## Delivery / logistics operator

| ID | User story | SRS / FR reference | Acceptance reference | Status |
|---|---|---|---|---|
| US-DELIVERY-001 | As a delivery operator, I want shipment assignments so that I know what to deliver. | [SRS-ROLE-008](SRS.md#2-user-roles-and-portals), [FR-SHIP-004](SRS.md#310-shipping--logistics) | [AC-SHIP-002](ACCEPTANCE-CRITERIA.md) | Mandatory; portal model decision required |
| US-DELIVERY-002 | As a delivery operator, I want to update pickup and delivery milestones so that customers and operations see current status. | [FR-SHIP-004](SRS.md#310-shipping--logistics), [FR-SHIP-007](SRS.md#310-shipping--logistics) | [AC-SHIP-002](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-DELIVERY-003 | As a delivery operator, I want to record delivery exceptions, failed delivery, reattempt, RTO, and reverse pickup so that exceptions are managed. | [FR-SHIP-006](SRS.md#310-shipping--logistics) | [AC-SHIP-003](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-DELIVERY-004 | As a delivery operator, I want to record proof of delivery where supported so that delivery confirmation is traceable. | [FR-ORD-009](SRS.md#39-order-management--fulfilment) | [AC-SHIP-004](ACCEPTANCE-CRITERIA.md) | Conditional |
| US-DELIVERY-005 | As a delivery operator using an optional app, I want push notifications and deep links so that assignments and status updates are accessible on mobile. | [FR-MOB-002](SRS.md#319-mobile--multi-channel), [FR-MOB-003](SRS.md#319-mobile--multi-channel) | [AC-MOB-002](ACCEPTANCE-CRITERIA.md) | Conditional |

---

## Finance operator

| ID | User story | SRS / FR reference | Acceptance reference | Status |
|---|---|---|---|---|
| US-FINANCE-001 | As a finance operator, I want to reconcile transactions and review payment success/failure and refund reports so that money movement is accurate. | [SRS-ROLE-009](SRS.md#2-user-roles-and-portals), [FR-PAY-003](SRS.md#37-payments-refunds--finance), [FR-BI-006](SRS.md#317-reports--business-intelligence) | [AC-006](ACCEPTANCE-CRITERIA.md), [AC-BI-001](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-FINANCE-002 | As a finance operator, I want to process eligible refunds and view refund status so that customer refunds are traceable. | [FR-PAY-004](SRS.md#37-payments-refunds--finance), [FR-RET-006](SRS.md#311-returns-exchanges--refunds) | [AC-007](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-FINANCE-003 | As a finance operator, I want commissions, settlement cycles, payout approval, and reconciliation so that vendor balances are correct. | [FR-PAY-005](SRS.md#37-payments-refunds--finance), [FR-PAY-006](SRS.md#37-payments-refunds--finance), [FR-VEN-010](SRS.md#32-vendor--seller-management) | [AC-008](ACCEPTANCE-CRITERIA.md) | Mandatory; values decision required |
| US-FINANCE-004 | As a finance operator, I want tax invoices, credit notes, receipts, and downloadable statements so that accounting records are available. | [FR-PAY-007](SRS.md#37-payments-refunds--finance) | [AC-FIN-001](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-FINANCE-005 | As a finance operator, I want COD remittance and reconciliation if COD is enabled so that cash collections are matched. | [FR-PAY-008](SRS.md#37-payments-refunds--finance) | [AC-FIN-002](ACCEPTANCE-CRITERIA.md) | Conditional |
| US-FINANCE-006 | As a finance operator, I want finance exports and exception reports so that unmatched or failed transactions can be investigated. | [FR-PAY-009](SRS.md#37-payments-refunds--finance) | [AC-BI-001](ACCEPTANCE-CRITERIA.md) | Mandatory |

---

## Super administrator

| ID | User story | SRS / FR reference | Acceptance reference | Status |
|---|---|---|---|---|
| US-SUPERADMIN-001 | As a super administrator, I want global configuration and system settings so that platform-wide behaviour is controlled. | [SRS-ROLE-010](SRS.md#2-user-roles-and-portals), [FR-ADM-007](SRS.md#312-admin-console--platform-configuration) | [AC-ADMIN-002](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-SUPERADMIN-002 | As a super administrator, I want to manage administrator roles and permissions so that access follows least privilege. | [SRS-ROLE-010](SRS.md#2-user-roles-and-portals), [FR-ADM-002](SRS.md#312-admin-console--platform-configuration) | [AC-SEC-001](ACCEPTANCE-CRITERIA.md), [AC-009](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-SUPERADMIN-003 | As a super administrator, I want audit records and security settings so that critical changes are traceable. | [SRS-ROLE-010](SRS.md#2-user-roles-and-portals), [FR-COMP-002](SRS.md#318-security-privacy--compliance), [SEC-AUDIT-001](../architecture/SECURITY-ARCHITECTURE.md) | [AC-009](ACCEPTANCE-CRITERIA.md), [AC-SEC-003](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-SUPERADMIN-004 | As a super administrator, I want dependency/vulnerability controls and secure deployment configuration so that production readiness can be assessed. | [FR-COMP-008](SRS.md#318-security-privacy--compliance), [QA-006](SRS.md#10-testing-and-quality-assurance) | [AC-QA-004](ACCEPTANCE-CRITERIA.md), [LAUNCH-008](SRS.md#11-development-phases-and-mvp-baseline) | Mandatory |

---

## Operational stories

| ID | User story | SRS / FR reference | Acceptance reference | Status |
|---|---|---|---|---|
| US-OPS-001 | As an operator, I want local/test/staging/production separation with isolated credentials and data so that environments are safe. | [FR-OPS-001](SRS.md#320-platform-operations--reliability), [DEP-001](SRS.md#11-devops-environments-and-deployment) | [AC-OPS-001](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-OPS-002 | As an operator, I want structured logs, metrics, traces, alerting, and error monitoring so that issues are detected. | [FR-OPS-002](SRS.md#320-platform-operations--reliability), [NFR-OBS-001](SRS.md#5-non-functional-requirements) | [AC-OPS-002](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-OPS-003 | As an operator, I want automated backups, restore drills, and agreed RPO/RTO so that recovery is possible. | [FR-OPS-003](SRS.md#320-platform-operations--reliability), [FR-OPS-006](SRS.md#320-platform-operations--reliability) | [LAUNCH-010](SRS.md#11-development-phases-and-mvp-baseline) | Mandatory; RPO/RTO decision required |
| US-OPS-004 | As an operator, I want CI/CD, migrations, approvals, and rollback so that releases are controlled. | [FR-OPS-004](SRS.md#320-platform-operations--reliability), [DEP-003](SRS.md#11-devops-environments-and-deployment), [DEP-004](SRS.md#11-devops-environments-and-deployment) | [AC-OPS-003](ACCEPTANCE-CRITERIA.md), [LAUNCH-013](SRS.md#11-development-phases-and-mvp-baseline) | Mandatory |
| US-OPS-005 | As a platform stakeholder, I want performance, load, security, accessibility, and browser/mobile checks so that launch readiness is evidenced. | [FR-OPS-005](SRS.md#320-platform-operations--reliability), [LAUNCH-009](SRS.md#11-development-phases-and-mvp-baseline) | [AC-QA-*](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-OPS-006 | As a mobile-channel stakeholder, I want consistent API contracts across web and mobile clients so that channels stay aligned. | [FR-MOB-004](SRS.md#319-mobile--multi-channel), [API-001](../architecture/API-DESIGN.md) | [AC-MOB-003](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-OPS-007 | As a multi-channel stakeholder, I want optional B2B, social commerce, or additional channels only if selected so that scope is not assumed. | [FR-MOB-005](SRS.md#319-mobile--multi-channel), [DEC-016](SRS.md#12-unresolved-decisions-and-items-to-confirm) | [AC-MOB-004](ACCEPTANCE-CRITERIA.md) | Conditional |

---

## Privacy and security stories

| ID | User story | SRS / FR reference | Acceptance reference | Status |
|---|---|---|---|---|
| US-PRIV-001 | As a privacy-conscious user, I want consent records, privacy notices, retention policies, data export/deletion workflows, and restricted sensitive data so that privacy obligations are met. | [FR-COMP-006](SRS.md#318-security-privacy--compliance), [NFR-DATA-001](SRS.md#5-non-functional-requirements), [SEC-PRIV-*](../architecture/SECURITY-ARCHITECTURE.md) | [AC-PRIV-001](ACCEPTANCE-CRITERIA.md) | Mandatory |
| US-SEC-001 | As a platform user, I want authentication, RBAC, injection/XSS/CSRF protections, rate limits, and secure uploads so that the platform is protected. | [FR-COMP-001](SRS.md#318-security-privacy--compliance), [FR-COMP-002](SRS.md#318-security-privacy--compliance), [FR-COMP-004](SRS.md#318-security-privacy--compliance) | [AC-SEC-001](ACCEPTANCE-CRITERIA.md), [AC-SEC-002](ACCEPTANCE-CRITERIA.md) | Mandatory; MFA decision required |
| US-SEC-002 | As a risk operator, I want fraud signals and suspicious login/payment monitoring with manual review queues so that abuse can be reviewed. | [FR-COMP-007](SRS.md#318-security-privacy--compliance), [FR-RET-008](SRS.md#311-returns-exchanges--refunds), [FR-REV-005](SRS.md#314-reviews-ratings--moderation) | [AC-SEC-004](ACCEPTANCE-CRITERIA.md) | Mandatory |
