# Acceptance Criteria

**Project:** Task 2 — E-Commerce Marketplace  
**Source of truth:** `docs/requirements/Task_2_Complete_Ecommerce_Marketplace_Specification.pdf`  
**Canonical requirements:** [SRS.md](SRS.md)  
**Related:** [USER-STORIES.md](USER-STORIES.md), [BUSINESS-RULES.md](BUSINESS-RULES.md), [SYSTEM-ARCHITECTURE.md](../architecture/SYSTEM-ARCHITECTURE.md)

## Status vocabulary

| Status | Meaning |
|---|---|
| **Mandatory** | Must pass before the related requirement can be accepted. |
| **Conditional** | Applies only when the PDF’s “if enabled/where supported/subject to policy” qualifier is in scope. |
| **Decision required** | Cannot be finally accepted until the unresolved decision is made. See [SRS §12](SRS.md#12-unresolved-decisions-and-items-to-confirm). |

> This document does not assert numeric latency, availability, RPO/RTO, commission, tax, settlement, return-window, or SLA values. Those remain unresolved in [SRS §12](SRS.md#12-unresolved-decisions-and-items-to-confirm).

---

## 1. Key journey acceptance criteria

### AC-001 — Customer purchase journey

| ID | Acceptance criterion | Verification | Status |
|---|---|---|---|
| AC-001-01 | Given an approved, published, in-stock product, when a customer opens a category or product page, then the product is discoverable with title, price, availability, and delivery/return information. | Storefront E2E check; API response check. | Mandatory |
| AC-001-02 | Given a selected product, when the customer adds or updates a cart line, then quantity rules are enforced and the cart persists. | Cart API and UI test. | Mandatory |
| AC-001-03 | Given a cart, when checkout is opened, then address, shipping method, delivery estimate, tax, discounts, shipping charge, and final payable amount are calculated on the server. | Server-calculation test; client tampering is ignored. | Mandatory |
| AC-001-04 | Given valid checkout data, when the customer submits an order with an idempotency key, then exactly one order is created and inventory is reserved with expiry. | Idempotency and inventory test. | Mandatory |
| AC-001-05 | Given a configured payment method, when the customer completes payment, then payment status is derived from verified provider callbacks and the order state becomes consistent with the configured payment rules. | Payment sandbox/E2E; webhook signature test. | Mandatory; methods depend on DEC-004 |
| AC-001-06 | Given order completion, when the customer views order history, invoice, or shipment status, then accurate order and shipment information is visible. | Customer portal E2E. | Mandatory |
| AC-001-07 | Given checkout failure, payment failure, or reservation expiry, when no completed payment exists, then reservations are released safely and no false success state is shown. | Failure-path test. | Mandatory |

**Traceability:** [AC-JOURNEY-001](SRS.md#4-key-user-journeys-and-acceptance-outcomes), [FR-DISC-*](SRS.md#34-storefront-search--product-discovery), [FR-CHK-*](SRS.md#36-cart-checkout--order-placement), [FR-PAY-*](SRS.md#37-payments-refunds--finance), [FR-ORD-*](SRS.md#39-order-management--fulfilment), [US-CUST](USER-STORIES.md#customer).

### AC-002 — Seller onboarding journey

| ID | Acceptance criterion | Verification | Status |
|---|---|---|---|
| AC-002-01 | Given a new seller, when registration details and required application data are submitted, then email/phone verification and onboarding checklist state are recorded. | Vendor portal E2E. | Mandatory |
| AC-002-02 | Given KYC/business, tax, bank-reference, and document fields, when the seller submits them, then required fields are validated and protected references are used for sensitive bank data. | Integration/API test; storage inspection. | Mandatory |
| AC-002-03 | Given an application under review, when an authorized administrator approves, rejects, suspends, reactivates, or terminates the vendor, then the vendor status and reason are recorded. | Admin workflow test. | Mandatory |
| AC-002-04 | Given an unapproved vendor, when attempting vendor-only functions, then access is denied. | Authorization test. | Mandatory |
| AC-002-05 | Given an approved vendor, when opening the vendor dashboard, then the seller can access permitted onboarding, catalogue, order, inventory, and settlement functions. | Role-based E2E. | Mandatory; marketplace model depends on DEC-002 |

**Traceability:** [AC-JOURNEY-002](SRS.md#4-key-user-journeys-and-acceptance-outcomes), [FR-VEN-*](SRS.md#32-vendor--seller-management), [US-VEND](USER-STORIES.md#vendor--seller).

### AC-003 — Product publishing and moderation journey

| ID | Acceptance criterion | Verification | Status |
|---|---|---|---|
| AC-003-01 | Given vendor product submission rights, when a complete product with required variants, identifiers, media, and attributes is submitted, then the listing enters the submitted/review workflow. | Vendor API/UI test. | Mandatory |
| AC-003-02 | Given incomplete or invalid product data, when submitted, then validation errors are returned and the listing is not published. | Validation test. | Mandatory |
| AC-003-03 | Given a submitted listing, when an authorized moderator approves or rejects it, then the decision and reason are recorded and only approved eligible products become publicly visible. | Moderation E2E. | Mandatory |
| AC-003-04 | Given duplicate-listing rules once defined, when a duplicate or guideline-violating product is submitted, then it is flagged for review. | Rule test. | Decision required for exact rules: DEC-021, DEC-022 |
| AC-003-05 | Given a bulk import file, when processed, then valid rows are imported and a validation/error report is produced for rejected rows. | Bulk import test. | Mandatory |

**Traceability:** [AC-JOURNEY-003](SRS.md#4-key-user-journeys-and-acceptance-outcomes), [FR-CAT-*](SRS.md#31-product-catalogue--product-listing), [FR-VEN-007](SRS.md#32-vendor--seller-management), [US-VEND](USER-STORIES.md#vendor--seller).

### AC-004 — Multi-vendor order journey

| ID | Acceptance criterion | Verification | Status |
|---|---|---|---|
| AC-004-01 | Given a cart containing items from multiple vendors, warehouses, or shipments, when the order is placed, then one customer-facing parent order is retained. | Order E2E. | Mandatory |
| AC-004-02 | Given the placed parent order, when fulfilment units are created, then items are grouped by vendor/warehouse/shipment according to the configured split rules. | Order data/API test. | Mandatory; exact rules depend on DEC-021 |
| AC-004-03 | Given multiple fulfilment units, when each unit progresses, then shipment-level statuses are tracked independently. | Shipment status test. | Mandatory |
| AC-004-04 | Given the customer order view, when status is displayed, then the customer sees a coherent parent-order summary plus available shipment tracking. | Storefront E2E. | Mandatory |

**Traceability:** [AC-JOURNEY-004](SRS.md#4-key-user-journeys-and-acceptance-outcomes), [FR-ORD-002](SRS.md#39-order-management--fulfilment), [FR-SHIP-007](SRS.md#310-shipping--logistics), [BR-ORD-002](BUSINESS-RULES.md).

### AC-005 — Inventory safety journey

| ID | Acceptance criterion | Verification | Status |
|---|---|---|---|
| AC-005-01 | Given limited stock, when two checkouts reserve the same SKU concurrently, then reservations are applied atomically and stock is not oversold beyond configured rules. | Concurrency test. | Mandatory; configured rules depend on DEC-021 |
| AC-005-02 | Given an active reservation, when checkout succeeds, then the reservation is converted to committed stock movement. | Integration test. | Mandatory |
| AC-005-03 | Given checkout failure, timeout, or cancellation, when the reservation expires, then stock is released safely and the movement is auditable. | Expiry/failure-path test. | Mandatory |
| AC-005-04 | Given stock-in, stock-out, adjustment, cycle count, transfer, or return disposition, when recorded, then inventory quantities and audit history reflect the movement. | Inventory workflow test. | Mandatory; multi-warehouse conditional on DEC-016 |

**Traceability:** [AC-JOURNEY-005](SRS.md#4-key-user-journeys-and-acceptance-outcomes), [FR-CHK-006](SRS.md#36-cart-checkout--order-placement), [FR-INV-*](SRS.md#38-inventory-procurement--warehouse), [BR-INV-005](BUSINESS-RULES.md).

### AC-006 — Payment integrity journey

| ID | Acceptance criterion | Verification | Status |
|---|---|---|---|
| AC-006-01 | Given a payment request, when sent to the configured provider, then only hosted/tokenized data flows are used and raw card numbers/CVV are never stored. | Payment integration review. | Mandatory |
| AC-006-02 | Given a valid webhook, when received with a valid signature, then payment state is updated and recorded. | Webhook verification test. | Mandatory |
| AC-006-03 | Given a duplicate or replayed webhook, when processed, then the event is ignored or applied idempotently and cannot create duplicate charges, orders, or refunds. | Idempotency/replay test. | Mandatory |
| AC-006-04 | Given a payment failure or retry, when status is queried or reconciled, then the system reflects the provider’s verified state without changing totals client-side. | Failure/reconciliation test. | Mandatory |
| AC-006-05 | Given a refund, when initiated and completed, then the refund amount, reason, status, ledger entries, and reconciliation record are preserved. | Refund E2E. | Mandatory |
| AC-006-06 | Given payment, refund, fee, or payout activity, when finance reports are viewed, then reconciled and exception records are available. | Finance report test. | Mandatory |

**Traceability:** [AC-JOURNEY-006](SRS.md#4-key-user-journeys-and-acceptance-outcomes), [FR-PAY-*](SRS.md#37-payments-refunds--finance), [API-WH-001](../architecture/API-DESIGN.md), [SEC-PAY-001](../architecture/SECURITY-ARCHITECTURE.md).

### AC-007 — Returns, exchanges and refunds journey

| ID | Acceptance criterion | Verification | Status |
|---|---|---|---|
| AC-007-01 | Given a completed order, when an eligible return/exchange is requested, then reason, comments, and evidence are captured and eligibility is checked against configured policy. | Return request E2E. | Mandatory; policy values depend on DEC-006 |
| AC-007-02 | Given a return request, when approved or rejected, then the decision, pickup, and return tracking are recorded. | Return workflow test. | Mandatory |
| AC-007-03 | Given returned goods received, when inspection is recorded, then disposition is restock, repair, quarantine, or write-off and inventory reflects the disposition. | Warehouse workflow test. | Mandatory |
| AC-007-04 | Given an approved refund resolution, when refund is processed, then full/partial refund status and finance ledger effects are visible. | Refund/finance test. | Mandatory |
| AC-007-05 | Given an exchange resolution, when a replacement order is created, then inventory is reserved and the replacement is linked to the original return. | Exchange E2E. | Mandatory |
| AC-007-06 | Given return analytics requirements, when reports are viewed, then reason codes and abuse/fraud review information are available where in scope. | Reporting test. | Mandatory |

**Traceability:** [AC-JOURNEY-007](SRS.md#4-key-user-journeys-and-acceptance-outcomes), [FR-RET-*](SRS.md#311-returns-exchanges--refunds), [BR-RET-003](BUSINESS-RULES.md).

### AC-008 — Vendor settlement journey

| ID | Acceptance criterion | Verification | Status |
|---|---|---|---|
| AC-008-01 | Given completed eligible transactions, when settlement is calculated, then marketplace fees, vendor payable amounts, refunds, and adjustments are derived from immutable ledger entries. | Ledger/settlement test. | Mandatory; calculation values depend on DEC-006 and DEC-022 |
| AC-008-02 | Given commission rules once defined, when settlement is prepared, then commission deductions match the applicable vendor/category/product/campaign rule. | Commission rule test. | Decision required for exact values |
| AC-008-03 | Given a settlement statement, when a finance approver approves or rejects it, then approval state and actor are recorded. | Approval workflow test. | Mandatory |
| AC-008-04 | Given an approved payout, when payment status is updated, then vendor balances and reconciliation records match the payout outcome. | Payout reconciliation test. | Mandatory; provider capability depends on DEC-004 |
| AC-008-05 | Given vendor portal access, when the vendor opens settlements, then statements and payout status for that vendor are visible. | Vendor portal E2E. | Mandatory |

**Traceability:** [AC-JOURNEY-008](SRS.md#4-key-user-journeys-and-acceptance-outcomes), [FR-PAY-005](SRS.md#37-payments-refunds--finance), [FR-PAY-006](SRS.md#37-payments-refunds--finance), [FR-VEN-010](SRS.md#32-vendor--seller-management).

### AC-009 — Administration and audit journey

| ID | Acceptance criterion | Verification | Status |
|---|---|---|---|
| AC-009-01 | Given an authenticated admin, when accessing a protected operation, then role and fine-grained permission checks are enforced on the server. | RBAC matrix test. | Mandatory |
| AC-009-02 | Given a sub-admin without permission, when attempting sensitive management, configuration, refund, payout, or bank-detail changes, then access is denied. | Negative authorization test. | Mandatory |
| AC-009-03 | Given a privileged action, when completed, then an audit record captures actor, action, object, time, and outcome. | Audit log test. | Mandatory |
| AC-009-04 | Given configuration or feature-flag changes, when applied, then only intended scopes are affected and changes are traceable. | Configuration test. | Mandatory |
| AC-009-05 | Given admin dashboard access, when KPIs are viewed, then sales, orders, customers, sellers, inventory, and exception information is available according to role permissions. | Dashboard/report test. | Mandatory |

**Traceability:** [AC-JOURNEY-009](SRS.md#4-key-user-journeys-and-acceptance-outcomes), [FR-ADM-*](SRS.md#312-admin-console--platform-configuration), [SEC-AUTHZ-002](../architecture/SECURITY-ARCHITECTURE.md), [US-ADMIN](USER-STORIES.md#marketplace-administrator).

---

## 2. Accessibility acceptance criteria

### AC-ACC-001 — Accessible and responsive experience

| ID | Acceptance criterion | Verification | Status |
|---|---|---|---|
| AC-ACC-001-01 | Given keyboard-only navigation, when using storefront and portals, then interactive elements are reachable, focus order is logical, and focus state is visible. | Manual keyboard test; automated checks. | Mandatory where feasible |
| AC-ACC-001-02 | Given assistive technology, when viewing key pages, then semantic headings, labels, landmarks, and alternative text convey meaning. | Screen-reader/manual audit. | Mandatory where feasible |
| AC-ACC-001-03 | Given colour and typography settings, when pages are rendered, then text contrast and zoom behaviour meet the agreed WCAG 2.2 AA target. | Accessibility audit. | Conditional “where feasible” |
| AC-ACC-001-04 | Given responsive breakpoints once agreed, when key pages are viewed on mobile, tablet, and desktop, then content and checkout remain usable. | Responsive test. | Mandatory; breakpoints depend on DEC-020 |

**Traceability:** [NFR-ACC-001](SRS.md#5-non-functional-requirements), [QA-008](SRS.md#10-testing-and-quality-assurance), [FR-DISC-007](SRS.md#34-storefront-search--product-discovery).

---

## 3. QA acceptance criteria

| ID | QA area | Acceptance outcome | SRS QA reference | Status |
|---|---|---|---|---|
| AC-QA-001 | Unit | Pricing, tax, commission, coupon eligibility, stock calculations, permissions, and state transitions have deterministic unit coverage for valid, invalid, and boundary cases. | [QA-001](SRS.md#10-testing-and-quality-assurance) | Mandatory |
| AC-QA-002 | Integration | Database transactions, payment adapter, shipping adapter, queues, storage, and webhook handlers pass contract and failure-path tests. | [QA-002](SRS.md#10-testing-and-quality-assurance) | Mandatory |
| AC-QA-003 | API | Authentication, authorization, validation, pagination, errors, idempotency, and rate limits are verified against the OpenAPI contract. | [QA-003](SRS.md#10-testing-and-quality-assurance) | Mandatory |
| AC-QA-004 | End-to-end and workflow | Customer purchase and vendor onboarding-to-settlement journeys pass in a controlled environment with configured test integrations. | [QA-004](SRS.md#10-testing-and-quality-assurance), [QA-005](SRS.md#10-testing-and-quality-assurance) | Mandatory |
| AC-QA-005 | Performance, load and compatibility | Search, catalogue browsing, checkout, flash-sale traffic, concurrent inventory updates, browser compatibility, and responsive layouts are exercised; numeric pass thresholds are recorded only after DEC-008/DEC-020. | [QA-007](SRS.md#10-testing-and-quality-assurance), [NFR-COMP-001](SRS.md#5-non-functional-requirements) | Mandatory; thresholds decision required |
| AC-QA-006 | Security | Access control, injection, session handling, upload security, secrets, dependency vulnerabilities, container/static analysis, and penetration findings are tested and critical findings are closed before production. | [QA-006](SRS.md#10-testing-and-quality-assurance), [SEC-012](SRS.md#9-security-and-privacy-checklist) | Mandatory |

---

## 4. UX and design deliverable acceptance

### UX-PRES-001 — UI/UX and design deliverables

| ID | Acceptance criterion | Verification | Status |
|---|---|---|---|
| UX-PRES-001-01 | Wireframes cover the customer storefront, cart/checkout, account/order views, vendor onboarding and portal, admin console, and any in-scope support/warehouse/delivery/finance workspace. | Design review against journey list. | Mandatory; workspace form depends on DEC-011 |
| UX-PRES-001-02 | A UI kit/design system defines reusable components, states, form patterns, navigation, and responsive behaviour. | Design system review. | Mandatory |
| UX-PRES-001-03 | Prototypes demonstrate the key journeys in [SRS §4](SRS.md#4-key-user-journeys-and-acceptance-outcomes). | Prototype walkthrough. | Mandatory |
| UX-PRES-001-04 | Accessibility annotations cover keyboard flow, focus, labels, contrast, error messages, and screen-reader considerations. | Design accessibility review. | Mandatory where feasible |
| UX-PRES-001-05 | Approved designs are linked to acceptance criteria and implementation tickets. | Traceability review. | Mandatory |

**Traceability:** [FR-DISC-001](SRS.md#34-storefront-search--product-discovery), [NFR-ACC-001](SRS.md#5-non-functional-requirements), [TEC-021](SRS.md#6-recommended-technology-stack).

---

## 5. Project deliverable acceptance

| ID | Deliverable | Acceptance outcome | SRS reference | Status |
|---|---|---|---|---|
| DEL-REQ-001 | Requirements documentation | SRS, business rules, user stories, and acceptance criteria exist, use consistent IDs, and cover the PDF’s functional scope. | [SRS-OV-007](SRS.md#1-project-overview) | Mandatory |
| DEL-DESIGN-001 | Architecture and data design | System architecture, conceptual ERD, API design, security architecture, and performance strategy are documented and cross-referenced. | [SRS-OV-007](SRS.md#1-project-overview), [NFR-MAINT-001](SRS.md#5-non-functional-requirements) | Mandatory |
| DEL-UX-001 | UI/UX design package | Wireframes, UI kit/design system, prototypes, and accessibility annotations pass [UX-PRES-001](#ux-pres-001--uiux-and-design-deliverables). | [TEC-021](SRS.md#6-recommended-technology-stack) | Mandatory |
| DEL-API-001 | API contract | OpenAPI/Swagger documentation defines resources, schemas, errors, authentication, pagination, idempotency, and webhooks. | [API-002](SRS.md#8-data-api-and-integration-summary) | Mandatory |
| DEL-TEST-001 | Test plan and cases | Unit, integration, API, E2E, workflow, security, performance, accessibility, and regression coverage is documented and mapped to [AC-QA-*](#3-qa-acceptance-criteria). | [QA-001](SRS.md#10-testing-and-quality-assurance)–[QA-009](SRS.md#10-testing-and-quality-assurance) | Mandatory |
| DEL-OPS-001 | Operational documentation | Deployment, rollback, incident response, backup restore, disaster recovery, monitoring, and alerting runbooks are documented. | [DEP-008](SRS.md#11-devops-environments-and-deployment) | Mandatory |
| DEL-SEC-001 | Security and privacy review evidence | Threat model, control mappings, privacy review, dependency scan, and vulnerability remediation evidence are available. | [SEC-011](SRS.md#9-security-and-privacy-checklist), [SEC-012](SRS.md#9-security-and-privacy-checklist) | Mandatory; jurisdiction depends on DEC-001 |
| DEL-UAT-001 | UAT sign-off | Business owners approve in-scope journeys and launch checklist items before production release. | [LAUNCH-013](SRS.md#11-development-phases-and-mvp-baseline) | Mandatory |
| DEL-REL-001 | Release package | Release notes, migration plan, rollback plan, verified environment configuration, and approved deployment record are present. | [DEP-004](SRS.md#11-devops-environments-and-deployment), [LAUNCH-013](SRS.md#11-development-phases-and-mvp-baseline) | Mandatory |

---

## 6. Functional coverage matrix

| SRS domain | FR range | Primary stories | Primary acceptance coverage | Status notes |
|---|---|---|---|---|
| Product catalogue | [FR-CAT-001–FR-CAT-010](SRS.md#31-product-catalogue--product-listing) | [US-VEND](USER-STORIES.md#vendor--seller), [US-CUST](USER-STORIES.md#customer) | AC-003, AC-QA-001, AC-QA-003 | Product types conditional |
| Vendor management | [FR-VEN-001–FR-VEN-012](SRS.md#32-vendor--seller-management) | [US-VEND](USER-STORIES.md#vendor--seller), [US-VENDORSTAFF-001](USER-STORIES.md#vendor-staff) | AC-002, AC-008, AC-009 | Model/subscriptions decision dependent |
| Customer accounts | [FR-CUS-001–FR-CUS-008](SRS.md#33-customer-accounts--crm) | [US-CUST](USER-STORIES.md#customer) | AC-001, AC-007, AC-PRIV-001 | Wallet/loyalty/social sign-in conditional |
| Search and discovery | [FR-DISC-001–FR-DISC-007](SRS.md#34-storefront-search--product-discovery) | [US-GUEST](USER-STORIES.md#guest-visitor), [US-CUST](USER-STORIES.md#customer) | AC-001, AC-QA-005, AC-ACC-001 | Search quality targets pending DEC-023 |
| Pricing/tax/promotions | [FR-PRICE-001–FR-PRICE-007](SRS.md#35-pricing-tax--promotions) | [US-CUST](USER-STORIES.md#customer), [US-VEND](USER-STORIES.md#vendor--seller) | AC-001, AC-QA-001 | Tax source and values pending DEC-001/DEC-022 |
| Cart/checkout | [FR-CHK-001–FR-CHK-008](SRS.md#36-cart-checkout--order-placement) | [US-GUEST](USER-STORIES.md#guest-visitor), [US-CUST](USER-STORIES.md#customer) | AC-001, AC-004, AC-005 | Guest checkout policy pending DEC-012 |
| Payments/refunds/finance | [FR-PAY-001–FR-PAY-009](SRS.md#37-payments-refunds--finance) | [US-CUST](USER-STORIES.md#customer), [US-FINANCE](USER-STORIES.md#finance-operator) | AC-006, AC-007, AC-008 | Provider/COD pending DEC-004 |
| Inventory/warehouse | [FR-INV-001–FR-INV-009](SRS.md#38-inventory-procurement--warehouse) | [US-WAREHOUSE](USER-STORIES.md#warehouse--fulfilment-operator), [US-VEND](USER-STORIES.md#vendor--seller) | AC-005, AC-007 | Multi-warehouse/procurement pending DEC-016 |
| Orders/fulfilment | [FR-ORD-001–FR-ORD-009](SRS.md#39-order-management--fulfilment) | [US-CUST](USER-STORIES.md#customer), [US-VEND](USER-STORIES.md#vendor--seller), [US-WAREHOUSE](USER-STORIES.md#warehouse--fulfilment-operator) | AC-001, AC-004, AC-007 | State machines pending DEC-021 |
| Shipping/logistics | [FR-SHIP-001–FR-SHIP-007](SRS.md#310-shipping--logistics) | [US-DELIVERY](USER-STORIES.md#delivery--logistics-operator), [US-VEND](USER-STORIES.md#vendor--seller) | AC-001, AC-004, AC-006 | Shipping model pending DEC-005 |
| Returns/exchanges/refunds | [FR-RET-001–FR-RET-008](SRS.md#311-returns-exchanges--refunds) | [US-CUST](USER-STORIES.md#customer), [US-WAREHOUSE](USER-STORIES.md#warehouse--fulfilment-operator), [US-FINANCE](USER-STORIES.md#finance-operator) | AC-007, AC-006 | Return/commission reversal policy pending DEC-006 |
| Admin console | [FR-ADM-001–FR-ADM-007](SRS.md#312-admin-console--platform-configuration) | [US-ADMIN](USER-STORIES.md#marketplace-administrator), [US-SUPERADMIN](USER-STORIES.md#super-administrator) | AC-002, AC-003, AC-009 | Mandatory |
| Marketing/loyalty | [FR-MKT-001–FR-MKT-007](SRS.md#313-marketing-loyalty--engagement) | [US-CUST](USER-STORIES.md#customer), [US-ADMIN](USER-STORIES.md#marketplace-administrator) | AC-QA-004, AC-QA-005 | Optional features pending DEC-016 |
| Reviews/ratings | [FR-REV-001–FR-REV-005](SRS.md#314-reviews-ratings--moderation) | [US-CUST](USER-STORIES.md#customer), [US-VEND](USER-STORIES.md#vendor--seller) | AC-001, AC-009, AC-QA-003 | Exact eligibility pending DEC-021 |
| Support/disputes | [FR-SUP-001–FR-SUP-006](SRS.md#315-customer-support--disputes) | [US-SUPPORT](USER-STORIES.md#support-agent), [US-CUST](USER-STORIES.md#customer) | AC-007, AC-009 | Live chat and SLA values pending DEC-017/DEC-009 |
| Content/SEO | [FR-CMS-001–FR-CMS-005](SRS.md#316-content-management--seo) | [US-ADMIN](USER-STORIES.md#marketplace-administrator), [US-SUPPORT](USER-STORIES.md#support-agent) | UX-PRES-001, AC-QA-004 | Blog conditional on DEC-017 |
| Reports/BI | [FR-BI-001–FR-BI-007](SRS.md#317-reports--business-intelligence) | [US-VEND](USER-STORIES.md#vendor--seller), [US-ADMIN](USER-STORIES.md#marketplace-administrator), [US-FINANCE](USER-STORIES.md#finance-operator) | AC-008, AC-009, AC-QA-003 | Mandatory |
| Security/privacy/compliance | [FR-COMP-001–FR-COMP-008](SRS.md#318-security-privacy--compliance) | [US-SEC-001](USER-STORIES.md#privacy-and-security-stories), [US-PRIV-001](USER-STORIES.md#privacy-and-security-stories) | AC-006, AC-009, AC-QA-006, AC-SEC-001, AC-PRIV-001 | Jurisdiction/MFA/PCI boundary pending DEC-001/DEC-010/DEC-018 |
| Mobile/multi-channel | [FR-MOB-001–FR-MOB-005](SRS.md#319-mobile--multi-channel) | [US-CUST](USER-STORIES.md#customer), [US-DELIVERY](USER-STORIES.md#delivery--logistics-operator) | AC-ACC-001, AC-QA-005 | Native apps/B2B pending DEC-016/DEC-024 |
| Platform operations | [FR-OPS-001–FR-OPS-006](SRS.md#320-platform-operations--reliability) | [US-OPS-001](USER-STORIES.md#operational-stories) | AC-OPS-001, AC-QA-002, AC-QA-005, AC-QA-006, DEL-OPS-001 | RPO/RTO/SLO pending DEC-009/DEC-020 |

---

## 7. Detailed module acceptance index

These module-level IDs provide the acceptance references used by [USER-STORIES.md](USER-STORIES.md). They refine, and do not replace, the nine key journeys in [SRS §4](SRS.md#4-key-user-journeys-and-acceptance-outcomes).

| ID | Acceptance outcome | Verification | Status |
|---|---|---|---|
| AC-CAT-001 | Product submission validates title, variants, identifiers, media, attributes, and status before review. | API/UI validation test. | Mandatory |
| AC-CAT-002 | Bulk import produces imported rows and a validation/error report. | Import workflow test. | Mandatory |
| AC-DISC-001 | Public users can browse category, brand, campaign, and product pages. | Storefront E2E. | Mandatory |
| AC-DISC-002 | Search, autocomplete, filters, and sorting behave against the documented catalog and agreed quality targets. | Search API/UI test. | Mandatory; quality targets pending DEC-023 |
| AC-DISC-003 | Product detail shows availability and transparent delivery/return information. | Storefront check. | Mandatory |
| AC-DISC-004 | Comparison, wishlist, recently viewed, and related products work for authorized users. | Customer E2E. | Mandatory |
| AC-CHK-001 | Cart add/update/remove/quantity/save-for-later operations persist correctly. | Cart API test. | Mandatory |
| AC-CHK-002 | Checkout totals are calculated on the server and client-supplied totals are ignored. | Tampering test. | Mandatory |
| AC-CHK-003 | Coupon, gift-card, or wallet application is transparent where enabled. | Checkout E2E. | Conditional |
| AC-CUST-001 | Registration, login, logout, verification, password reset, and optional social sign-in work according to policy. | Identity E2E. | Mandatory; social sign-in conditional |
| AC-CUST-002 | Profile, preferences, communication consent, and security settings are updated and auditable where required. | Account API test. | Mandatory |
| AC-CUST-003 | Multiple addresses and default address selection are validated and persisted. | Address API test. | Mandatory |
| AC-CUST-004 | Customers can view order history, invoices, returns, refunds, wishlist, saved items, and recently viewed products. | Account E2E. | Mandatory |
| AC-CUST-005 | Wallet/store credit and loyalty benefits operate with ledger-based accounting where enabled. | Ledger/loyalty test. | Conditional |
| AC-VEND-001 | Vendor storefront profile, logo, banner, policies, hours, and contacts are displayed accurately. | Vendor/storefront E2E. | Mandatory |
| AC-VEND-002 | Vendor subscription plans and feature entitlements apply only if subscriptions are enabled. | Entitlement test. | Conditional |
| AC-INV-001 | Stock-in, stock-out, adjustments, cycle counts, and reconciliation update quantities and history. | Inventory workflow test. | Mandatory |
| AC-INV-002 | Low-stock/out-of-stock alerts and replenishment reports are available. | Alert/report test. | Mandatory |
| AC-INV-003 | Batch/lot/serial/expiry tracking works for applicable product types. | Traceability test. | Conditional |
| AC-INV-004 | Purchase orders and supplier records work if procurement is in scope. | Procurement test. | Conditional |
| AC-ORD-001 | Vendor/warehouse users can accept or reject under defined rules, pick/pack/dispatch, and record partial fulfilment. | Fulfilment E2E. | Mandatory; exact rules pending DEC-021 |
| AC-SHIP-001 | Shipment creation, labels, AWB/tracking numbers, and manifests work with configured providers. | Shipping integration test. | Mandatory; provider pending DEC-005 |
| AC-SHIP-002 | Tracking milestones are visible to customers and operators. | Tracking E2E. | Mandatory |
| AC-SHIP-003 | Failed delivery, reattempt, RTO, and reverse pickup are recorded. | Exception workflow test. | Mandatory |
| AC-SHIP-004 | Proof-of-delivery references are attached where supported. | POD test. | Conditional |
| AC-REV-001 | Eligible customers can submit ratings/reviews with verified-purchase indicators and optional media. | Review API/UI test. | Mandatory; media conditional |
| AC-REV-002 | Review reporting, moderation, removal/appeal, and permitted vendor/admin responses work. | Moderation E2E. | Mandatory; responses conditional |
| AC-SUP-001 | Support tickets can be created, categorized, prioritized, assigned, and escalated. | Support workflow test. | Mandatory |
| AC-SUP-002 | Communication history, internal notes, and disputes are available to authorized users. | Support/dispute E2E. | Mandatory |
| AC-SUP-003 | Live chat or chatbot integration works if selected. | Channel test. | Conditional |
| AC-CMS-001 | Banners, campaigns, static pages, navigation, homepage sections, and SEO fields are managed and published correctly. | CMS E2E. | Mandatory |
| AC-BI-001 | Role-protected dashboards and exportable reports show required operational, vendor, support, and finance metrics. | Reporting test. | Mandatory |
| AC-FIN-001 | Tax invoices, credit notes, receipts, and downloadable statements are available. | Finance document test. | Mandatory |
| AC-FIN-002 | COD remittance and reconciliation work if COD is enabled. | COD reconciliation test. | Conditional |
| AC-ADMIN-001 | Admin can manage vendors, customers, products, categories, brands, orders, payments, and returns within permissions. | Admin workflow test. | Mandatory |
| AC-ADMIN-002 | Commission, fee, tax, shipping, policy, serviceability, and feature-flag configuration is controlled and auditable. | Configuration test. | Mandatory; values pending DEC-006/DEC-020 |
| AC-SEC-001 | Authentication and RBAC deny unauthenticated/unauthorized access to protected operations. | Authorization matrix test. | Mandatory |
| AC-SEC-002 | Vendor staff and sub-admin permissions are limited to assigned scope. | Negative RBAC test. | Mandatory |
| AC-SEC-003 | Privileged actions and sensitive changes produce audit records. | Audit test. | Mandatory |
| AC-SEC-004 | Fraud signals, suspicious login/payment/review/return monitoring, and manual review queues are available. | Fraud workflow test. | Mandatory |
| AC-PRIV-001 | Consent records, privacy notices, retention handling, export requests, and deletion requests work according to policy. | Privacy workflow test. | Mandatory; retention pending DEC-020 |
| AC-PRIV-002 | KYC, tax, bank-reference, and sensitive seller data are protected and restricted. | Sensitive-data access test. | Mandatory |
| AC-OPS-001 | Local, test, staging, and production environments have isolated credentials and data. | Environment review. | Mandatory |
| AC-OPS-002 | Structured logs, metrics, traces, dashboards, and alerts are available. | Observability test. | Mandatory |
| AC-OPS-003 | CI/CD, migrations, approvals, and rollback are demonstrated. | Pipeline/release test. | Mandatory |
| AC-MOB-001 | Responsive storefront and mobile-friendly checkout work at agreed breakpoints. | Responsive test. | Mandatory; breakpoints pending DEC-020 |
| AC-MOB-002 | Optional customer/vendor/delivery apps support push notifications and deep links where in scope. | Mobile app test. | Conditional |
| AC-MOB-003 | Web and mobile clients use consistent API contracts. | Contract test. | Mandatory |
| AC-MOB-004 | Optional B2B, social commerce, and additional channels are implemented only when confirmed in scope. | Scope/configuration review. | Conditional |

## 8. Acceptance pass rule

| Rule | Requirement |
|---|---|
| Mandatory criteria | All mandatory criteria for the in-scope release must pass. |
| Conditional criteria | Conditional criteria apply only when the corresponding feature is confirmed in scope. |
| Decision-required criteria | Acceptance is blocked until the relevant decision in [SRS §12](SRS.md#12-unresolved-decisions-and-items-to-confirm) is recorded. |
| Evidence | Each criterion must link to a test result, review record, demo recording, or signed approval. |
| Regression | Critical journeys must be re-run after deployment according to [QA-009](SRS.md#10-testing-and-quality-assurance). |
