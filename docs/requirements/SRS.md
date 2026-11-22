# Software Requirements Specification (SRS)

**Project:** Task 2 — E-Commerce Marketplace  
**Source of truth:** `docs/requirements/Task_2_Complete_Ecommerce_Marketplace_Specification.pdf`  
**Document status:** Derived SRS for planning and estimation; the PDF remains authoritative. G1–G8 are approved and recorded in §12A; remaining DEC-001–DEC-024 items stay decision-required unless explicitly resolved there.<br>
**Version:** 1.1 derived SRS version; G1–G8 decisions are recorded while unresolved decisions remain visible.

## Status vocabulary

| Status | Meaning |
|---|---|
| **Mandatory** | Explicit in-scope/imperative requirement in the PDF or a feature the PDF calls a scope requirement. |
| **Conditional** | The PDF qualifies the item with wording such as “where applicable”, “if enabled”, “if supported”, “optional”, “where supported”, or “subject to policy”. |
| **Recommendation** | The PDF labels the item as recommended or suggested. It is not presented as a confirmed final decision. |
| **Decision required** | The PDF identifies the item as unresolved, to agree, or dependent on a future selection. |
| **Approved by G decision** | A human-approved G1–G8 decision recorded in §12A resolves this item for implementation. |

## Document map

| Document | Purpose |
|---|---|
| [SRS.md](SRS.md) | Canonical requirement IDs and full requirement coverage. |
| [BUSINESS-RULES.md](BUSINESS-RULES.md) | Business rules and workflows derived from the requirements. |
| [USER-STORIES.md](USER-STORIES.md) | Role-based user stories mapped to requirement IDs. |
| [ACCEPTANCE-CRITERIA.md](ACCEPTANCE-CRITERIA.md) | Acceptance outcomes and verification criteria. |
| [SYSTEM-ARCHITECTURE.md](../architecture/SYSTEM-ARCHITECTURE.md) | Architecture layers, module boundaries, integrations, operations. |
| [DATABASE-ERD.md](../architecture/DATABASE-ERD.md) | Conceptual data model and integrity rules. |
| [API-DESIGN.md](../architecture/API-DESIGN.md) | API standards, domains, error/idempotency/webhook design. |
| [SECURITY-ARCHITECTURE.md](../architecture/SECURITY-ARCHITECTURE.md) | Authentication, authorization, privacy, compliance, security controls. |
| [PERFORMANCE-STRATEGY.md](../architecture/PERFORMANCE-STRATEGY.md) | Performance, scalability, availability, reliability and observability strategy. |

---

## 1. Project overview

### 1.1 Product definition

| ID | Requirement | Status | Source | Cross-reference |
|---|---|---|---|---|
| SRS-OV-001 | Deliver a full-featured multi-vendor commerce platform supporting customers, sellers, administrators, and delivery operations. | Mandatory | Cover, §1 | [ARC-001](../architecture/SYSTEM-ARCHITECTURE.md) |
| SRS-OV-002 | Support the complete commerce lifecycle: seller onboarding, cataloguing, product discovery, shopping, checkout, payment, inventory, fulfilment, shipping, returns, refunds, seller settlements, customer support, marketing, analytics, and platform administration. | Mandatory | §1 | [FR-*](#3-functional-requirements) |
| SRS-OV-003 | Support multiple vendors selling through one marketplace; each vendor can manage an approved storefront, products, stock, and orders. | Mandatory | §1 | [FR-VEN-*](#32-vendor--seller-management), [DB-VEN](../architecture/DATABASE-ERD.md) |
| SRS-OV-004 | Marketplace operator controls policies, approvals, commissions, payments, customer experience, and platform-wide reporting. | Mandatory | §1 | [FR-ADM-*](#312-admin-console--platform-configuration) |
| SRS-OV-005 | Begin with a modular monolith, designed for future service extraction where scale requires it. | Recommendation | Cover, §5.1 | [ARC-001](../architecture/SYSTEM-ARCHITECTURE.md) |
| SRS-OV-006 | Use TypeScript, Next.js, NestJS, PostgreSQL, Redis, object storage, and containerized deployment as the technology baseline. | Recommendation | Cover, §4 | [TEC-*](#6-recommended-technology-stack) |
| SRS-OV-007 | Treat all listed features as scope requirements, not claims of implementation. Each module must be converted into detailed user stories, business rules, API contracts, data design, test cases, and acceptance criteria before development. | Mandatory | §17 | All downstream documents |

### 1.2 Project objectives

| ID | Objective | Status | Cross-reference |
|---|---|---|---|
| SRS-OBJ-001 | Deliver a consistent shopping experience across desktop, mobile web, and, where in scope, native mobile apps. | Conditional for native apps | [FR-MOB-001](#319-mobile--multi-channel) |
| SRS-OBJ-002 | Provide separate, permission-controlled workspaces for customers, vendors, administrators, and fulfilment teams. | Mandatory | [SEC-AUTHZ-001](../architecture/SECURITY-ARCHITECTURE.md), [SRS-ROLE-*](#2-user-roles-and-portals), [SRS-PORTAL-*](#21-portal-surfaces) |
| SRS-OBJ-003 | Support multiple sellers, vendor-specific catalogues and inventory, split orders, and commission-based settlements. | Mandatory | [FR-VEN-*](#32-vendor--seller-management), [FR-ORD-002](#39-order-management--fulfilment), [FR-PAY-006](#37-payments-refunds--finance) |
| SRS-OBJ-004 | Provide secure payment processing, reliable order state management, and traceable refunds and payouts. | Mandatory | [FR-PAY-*](#37-payments-refunds--finance), [SEC-*](../architecture/SECURITY-ARCHITECTURE.md) |
| SRS-OBJ-005 | Build an extensible platform with documented APIs, integrations, monitoring, backups, and automated tests. | Mandatory | [API-*](../architecture/API-DESIGN.md), [DEP-*](#11-devops-environments-and-deployment), [QA-*](#10-testing-and-quality-assurance) |

---

## 2. User roles and portals

| ID | Role / portal | Primary capabilities | Status | Cross-reference |
|---|---|---|---|---|
| SRS-ROLE-001 | Guest visitor | Browse catalogue, search, view products, add items to cart where permitted, register, or check out as guest. | Conditional where permitted | [US-GUEST](USER-STORIES.md#guest-visitor) |
| SRS-ROLE-002 | Customer | Manage profile/addresses, place and pay for orders, track deliveries, request returns, review products, contact support. | Mandatory | [US-CUST](USER-STORIES.md#customer) |
| SRS-ROLE-003 | Vendor / seller | Complete onboarding and KYC, manage store profile, submit products, maintain stock/prices, process assigned orders, view commissions/settlements. | Mandatory | [US-VEND](USER-STORIES.md#vendor--seller) |
| SRS-ROLE-004 | Vendor staff | Perform vendor tasks according to permissions assigned by the vendor owner. | Mandatory | [BR-VEN-012](BUSINESS-RULES.md) |
| SRS-ROLE-005 | Marketplace administrator | Manage users, sellers, catalogue, categories, orders, payments, commissions, promotions, policies, platform settings. | Mandatory | [US-ADMIN](USER-STORIES.md#marketplace-administrator) |
| SRS-ROLE-006 | Support agent | Manage tickets, customer/vendor conversations, escalations, SLA targets. | Mandatory | [US-SUPPORT](USER-STORIES.md#support-agent) |
| SRS-ROLE-007 | Warehouse / fulfilment operator | Manage receiving, stock movements, picking, packing, dispatch, returns inspection. | Mandatory | [US-WAREHOUSE](USER-STORIES.md#warehouse--fulfilment-operator) |
| SRS-ROLE-008 | Delivery / logistics operator | Receive shipment assignments, update pickup/delivery milestones, record delivery exceptions and proof of delivery. | Mandatory | [US-DELIVERY](USER-STORIES.md#delivery--logistics-operator) |
| SRS-ROLE-009 | Finance operator | Reconcile transactions, process eligible refunds, review commissions, approve settlements, export financial reports. | Mandatory | [US-FINANCE](USER-STORIES.md#finance-operator) |
| SRS-ROLE-010 | Super administrator | Manage global configuration, administrator roles, permissions, audit records, security settings. | Mandatory | [US-SUPERADMIN](USER-STORIES.md#super-administrator) |
| SRS-ROLE-011 | Customer storefront | Primary public/customer client surface. Retained as a legacy pointer; use `SRS-PORTAL-001`. | Mandatory | [ARC-PRES-001](../architecture/SYSTEM-ARCHITECTURE.md) |
| SRS-ROLE-012 | Vendor portal | Permission-controlled vendor workspace. Retained as a legacy pointer; use `SRS-PORTAL-002`. | Mandatory | [ARC-PRES-002](../architecture/SYSTEM-ARCHITECTURE.md) |
| SRS-ROLE-013 | Admin console / admin portal | Permission-controlled marketplace operations workspace. Retained as a legacy pointer; use `SRS-PORTAL-003`. | Mandatory | [ARC-PRES-003](../architecture/SYSTEM-ARCHITECTURE.md) |
| SRS-ROLE-014 | Customer, vendor, delivery mobile apps | Optional apps using React Native. Retained as a legacy pointer; use `SRS-CHANNEL-001` and `FR-MOB-002`. | Conditional | [TEC-013](#6-recommended-technology-stack), [DEC-016](#12-unresolved-decisions-and-items-to-confirm) |
| SRS-ROLE-015 | Support, warehouse, delivery, finance workspaces | Roles are named in §2, but the PDF does not name dedicated portals for them. Retained as a legacy pointer; the workspace question is tracked only in `DEC-011`. | Decision required | [DEC-011](#12-unresolved-decisions-and-items-to-confirm) |

### 2.1 Portal surfaces

| ID | Portal / surface | Requirement | Status | Cross-reference |
|---|---|---|---|---|
| SRS-PORTAL-001 | Customer storefront | Primary public/customer client surface. | Mandatory | [ARC-PRES-001](../architecture/SYSTEM-ARCHITECTURE.md), [FR-DISC-*](#34-storefront-search--product-discovery) |
| SRS-PORTAL-002 | Vendor portal | Permission-controlled vendor workspace. | Mandatory | [ARC-PRES-002](../architecture/SYSTEM-ARCHITECTURE.md), [FR-VEN-*](#32-vendor--seller-management) |
| SRS-PORTAL-003 | Admin console / admin portal | Permission-controlled marketplace operations workspace. | Mandatory | [ARC-PRES-003](../architecture/SYSTEM-ARCHITECTURE.md), [FR-ADM-*](#312-admin-console--platform-configuration) |

### 2.2 Optional channels

| ID | Channel | Requirement | Status | Cross-reference |
|---|---|---|---|---|
| SRS-CHANNEL-001 | Customer, vendor, delivery mobile apps | Optional apps using React Native. | Conditional | [TEC-013](#6-recommended-technology-stack), [FR-MOB-002](#319-mobile--multi-channel), [DEC-016](#12-unresolved-decisions-and-items-to-confirm) |

---

## 3. Functional requirements

### 3.1 Product Catalogue & Product Listing

| ID | Requirement | Status | Cross-reference |
|---|---|---|---|
| FR-CAT-001 | Create, view, edit, archive, and delete products subject to permissions and order-history retention rules. | Mandatory | [BR-CAT-001](BUSINESS-RULES.md), [API-CAT](../architecture/API-DESIGN.md) |
| FR-CAT-002 | Maintain product categories, subcategories, brands, collections, tags, and attributes. | Mandatory | [DB-CAT](../architecture/DATABASE-ERD.md) |
| FR-CAT-003 | Maintain product variants such as size, colour, material, model, and pack size, with variant-level SKU, price, and stock. | Mandatory | [BR-CAT-003](BUSINESS-RULES.md) |
| FR-CAT-004 | Maintain product titles, descriptions, specifications, dimensions, weight, images, video, and downloadable documents. | Mandatory | [DB-CAT](../architecture/DATABASE-ERD.md) |
| FR-CAT-005 | Maintain SKU, barcode, and product identifiers; configurable product attributes and validation. | Mandatory | [BR-CAT-005](BUSINESS-RULES.md) |
| FR-CAT-006 | Support product status workflow: draft, submitted, under review, approved, rejected, published, inactive, out of stock. | Mandatory | [BR-CAT-006](BUSINESS-RULES.md) |
| FR-CAT-007 | Support vendor product submission and admin moderation; duplicate listing detection and content guidelines. | Mandatory | [BR-CAT-007](BUSINESS-RULES.md), [AC-003](ACCEPTANCE-CRITERIA.md) |
| FR-CAT-008 | Support bulk import/export using CSV or Excel, with validation reports and error handling. | Mandatory | [BR-CAT-008](BUSINESS-RULES.md) |
| FR-CAT-009 | Support featured, new, trending, best-selling, related, and frequently-bought-together product groupings. | Mandatory | [FR-DISC-004](#34-storefront-search--product-discovery) |
| FR-CAT-010 | Support physical, digital, configurable, bundle, and service products where applicable. | Conditional | [DEC-003](#12-unresolved-decisions-and-items-to-confirm) |

### 3.2 Vendor / Seller Management

| ID | Requirement | Status | Cross-reference |
|---|---|---|---|
| FR-VEN-001 | Seller registration, email/phone verification, application workflow, and onboarding checklist. | Mandatory | [AC-002](ACCEPTANCE-CRITERIA.md) |
| FR-VEN-002 | KYC/business verification, tax details, bank account verification, and document expiry tracking. | Mandatory | [BR-VEN-002](BUSINESS-RULES.md), [SEC-PII-004](../architecture/SECURITY-ARCHITECTURE.md) |
| FR-VEN-003 | Vendor approval, rejection, suspension, reactivation, and termination with recorded reasons. | Mandatory | [BR-VEN-003](BUSINESS-RULES.md) |
| FR-VEN-004 | Vendor storefront profile, logo, banner, description, policies, operating hours, and contact details. | Mandatory | [DB-VEN](../architecture/DATABASE-ERD.md) |
| FR-VEN-005 | Vendor dashboard for sales, orders, returns, inventory, ratings, commissions, and payouts. | Mandatory | [FR-BI-002](#317-reports--business-intelligence) |
| FR-VEN-006 | Vendor-specific product listing, pricing, stock, shipping settings, and fulfilment preferences. | Mandatory | [BR-VEN-006](BUSINESS-RULES.md) |
| FR-VEN-007 | Admin product moderation and vendor policy compliance. | Mandatory | [BR-CAT-007](BUSINESS-RULES.md) |
| FR-VEN-008 | Commission plans by vendor, category, product, or campaign; fixed and percentage models. | Mandatory | [BR-VEN-008](BUSINESS-RULES.md), [DEC-006](#12-unresolved-decisions-and-items-to-confirm) |
| FR-VEN-009 | Vendor subscription plans and feature entitlements if subscriptions are enabled. | Conditional | [DEC-003](#12-unresolved-decisions-and-items-to-confirm) |
| FR-VEN-010 | Settlement statements, payout requests, payout approvals, payment status, and reconciliation. | Mandatory | [AC-008](ACCEPTANCE-CRITERIA.md) |
| FR-VEN-011 | Vendor performance scorecards, service-level metrics, cancellation rate, and return rate. | Mandatory | [FR-BI-002](#317-reports--business-intelligence) |
| FR-VEN-012 | Vendor staff accounts, role permissions, and activity history. | Mandatory | [SEC-AUTHZ-003](../architecture/SECURITY-ARCHITECTURE.md) |

### 3.3 Customer Accounts & CRM

| ID | Requirement | Status | Cross-reference |
|---|---|---|---|
| FR-CUS-001 | Registration, login, logout, email/phone verification, password reset, and optional social sign-in. | Conditional for social sign-in | [SEC-AUTH-001](../architecture/SECURITY-ARCHITECTURE.md) |
| FR-CUS-002 | Customer profile, preferences, communication consent, and account security settings. | Mandatory | [SEC-PRIV-001](../architecture/SECURITY-ARCHITECTURE.md) |
| FR-CUS-003 | Multiple saved addresses, default address, and address validation. | Mandatory | [DB-ID](../architecture/DATABASE-ERD.md) |
| FR-CUS-004 | Customer segmentation, tags, account status, and support history. | Mandatory | [FR-MKT-002](#313-marketing-loyalty--engagement) |
| FR-CUS-005 | Order history, invoices, returns, refunds, wishlist, saved items, and recently viewed products. | Mandatory | [FR-ORD-001](#39-order-management--fulfilment) |
| FR-CUS-006 | Customer wallet or store credit only with ledger-based accounting and clear terms. | Conditional | [BR-FIN-002](BUSINESS-RULES.md), [DEC-016](#12-unresolved-decisions-and-items-to-confirm) |
| FR-CUS-007 | Loyalty points, membership tiers, and reward redemption if enabled. | Conditional | [DEC-016](#12-unresolved-decisions-and-items-to-confirm) |
| FR-CUS-008 | Account deletion/export request handling in accordance with applicable privacy obligations. | Mandatory | [SEC-PRIV-005](../architecture/SECURITY-ARCHITECTURE.md) |

### 3.4 Storefront, Search & Product Discovery

| ID | Requirement | Status | Cross-reference |
|---|---|---|---|
| FR-DISC-001 | Responsive homepage, navigation, category pages, brand pages, campaign landing pages, and product detail pages. | Mandatory | [UX-PRES-001](ACCEPTANCE-CRITERIA.md) |
| FR-DISC-002 | Keyword search, autocomplete, typo tolerance, synonyms, and relevance ranking. | Mandatory | [PERF-004](../architecture/PERFORMANCE-STRATEGY.md) |
| FR-DISC-003 | Filters for category, brand, price, rating, availability, attributes, vendor, and delivery options. | Mandatory | [API-DISC](../architecture/API-DESIGN.md) |
| FR-DISC-004 | Sorting by relevance, price, popularity, newest, and rating. | Mandatory | [API-DISC](../architecture/API-DESIGN.md) |
| FR-DISC-005 | Product comparison, wishlist, recently viewed, and related product recommendations. | Mandatory | [FR-CAT-009](#31-product-catalogue--product-listing) |
| FR-DISC-006 | SEO-friendly URLs, metadata, canonical URLs, structured data, and indexation controls. | Mandatory | [FR-CMS-004](#316-content-management--seo) |
| FR-DISC-007 | Accessible interface, clear product availability, and transparent delivery/return information. | Mandatory | [NFR-ACC-001](#5-non-functional-requirements) |

### 3.5 Pricing, Tax & Promotions

| ID | Requirement | Status | Cross-reference |
|---|---|---|---|
| FR-PRICE-001 | Base price, sale price, vendor price, variant price, and scheduled price changes. | Mandatory | [BR-PRICE-001](BUSINESS-RULES.md) |
| FR-PRICE-002 | Coupon codes, percentage/fixed discounts, minimum basket rules, and usage limits. | Mandatory | [BR-PRICE-002](BUSINESS-RULES.md) |
| FR-PRICE-003 | Campaigns, flash sales, seasonal promotions, bundles, volume discounts, and buy-X-get-Y offers. | Mandatory | [BR-PRICE-003](BUSINESS-RULES.md) |
| FR-PRICE-004 | Promotion eligibility by customer segment, vendor, category, product, channel, or date. | Mandatory | [BR-PRICE-004](BUSINESS-RULES.md) |
| FR-PRICE-005 | Shipping discounts, gift cards, and store credit if supported. | Conditional | [DEC-016](#12-unresolved-decisions-and-items-to-confirm) |
| FR-PRICE-006 | Tax rules configurable by jurisdiction and product category; tax-inclusive/exclusive display. | Mandatory | [BR-PRICE-006](BUSINESS-RULES.md), [INT-TAX](../architecture/SYSTEM-ARCHITECTURE.md) |
| FR-PRICE-007 | Price calculation audit trail and prevention of conflicting or invalid discounts. | Mandatory | [BR-PRICE-007](BUSINESS-RULES.md), [DB-FIN](../architecture/DATABASE-ERD.md) |

### 3.6 Cart, Checkout & Order Placement

| ID | Requirement | Status | Cross-reference |
|---|---|---|---|
| FR-CHK-001 | Add/update/remove cart lines, quantity checks, save-for-later, and cart persistence. | Mandatory | [BR-CHK-001](BUSINESS-RULES.md) |
| FR-CHK-002 | Guest and authenticated checkout; guest checkout is approved, with secure guest identity and verified registration for eligible-order association. | Mandatory | [DEC-012](#12-unresolved-decisions-and-items-to-confirm), [§12A](#12a-approved-g1g8-decisions) |
| FR-CHK-003 | Address selection, shipping method selection, delivery estimate, and order summary. | Mandatory | [BR-CHK-003](BUSINESS-RULES.md) |
| FR-CHK-004 | Coupon, gift card, or wallet application with transparent calculation. | Conditional for gift card/wallet | [FR-PRICE-005](#35-pricing-tax--promotions) |
| FR-CHK-005 | Tax, shipping, discount, and final payable amount calculation on the server. | Mandatory | [BR-CHK-005](BUSINESS-RULES.md), [API-CHK](../architecture/API-DESIGN.md) |
| FR-CHK-006 | Inventory reservation with expiry and safe release when checkout fails or times out. | Mandatory | [BR-CHK-006](BUSINESS-RULES.md), [BR-INV-005](BUSINESS-RULES.md), [AC-005](ACCEPTANCE-CRITERIA.md) |
| FR-CHK-007 | Checkout validation, idempotent order submission, and duplicate-click protection. | Mandatory | [API-IDEMP](../architecture/API-DESIGN.md), [AC-001](ACCEPTANCE-CRITERIA.md) |
| FR-CHK-008 | Abandoned cart events and recovery messaging subject to consent. | Conditional | [FR-MKT-004](#313-marketing-loyalty--engagement) |

### 3.7 Payments, Refunds & Finance

| ID | Requirement | Status | Cross-reference |
|---|---|---|---|
| FR-PAY-001 | Payment gateway integration using hosted/tokenized payment flows; never store raw card data. | Mandatory | [SEC-PAY-001](../architecture/SECURITY-ARCHITECTURE.md) |
| FR-PAY-002 | Support configured payment methods such as cards, UPI, net banking, wallets, and cash on delivery, depending on provider and region. | Conditional by provider/region | [INT-PAY](../architecture/SYSTEM-ARCHITECTURE.md), [DEC-004](#12-unresolved-decisions-and-items-to-confirm) |
| FR-PAY-003 | Payment authorization/capture, payment status, retries, failure handling, and webhook verification. | Mandatory | [API-WH-001](../architecture/API-DESIGN.md), [AC-006](ACCEPTANCE-CRITERIA.md) |
| FR-PAY-004 | Full and partial refunds, refund reasons, status tracking, and reconciliation. | Mandatory | [BR-FIN-004](BUSINESS-RULES.md) |
| FR-PAY-005 | Transaction ledger for customer payments, marketplace fees, vendor payable amounts, refunds, and adjustments. | Mandatory | [DB-FIN](../architecture/DATABASE-ERD.md) |
| FR-PAY-006 | Vendor commission deductions, settlement cycles, payout approval, and payout reconciliation. | Mandatory | [BR-FIN-006](BUSINESS-RULES.md) |
| FR-PAY-007 | Tax invoices, credit notes, receipts, and downloadable statements. | Mandatory | [BR-FIN-007](BUSINESS-RULES.md) |
| FR-PAY-008 | COD remittance and reconciliation if cash-on-delivery is enabled. | Conditional | [DEC-004](#12-unresolved-decisions-and-items-to-confirm) |
| FR-PAY-009 | Finance exports and exception reports for unmatched or failed transactions. | Mandatory | [FR-BI-006](#317-reports--business-intelligence) |

### 3.8 Inventory, Procurement & Warehouse

| ID | Requirement | Status | Cross-reference |
|---|---|---|---|
| FR-INV-001 | Vendor-level and, where required, central inventory with SKU/variant-level quantities. | Conditional for central inventory | [BR-INV-001](BUSINESS-RULES.md) |
| FR-INV-002 | Multiple warehouse/location support, stock transfers, and location-based availability. | Conditional per §16 multi-warehouse decision | [DEC-016](#12-unresolved-decisions-and-items-to-confirm) |
| FR-INV-003 | Stock-in, stock-out, adjustments, cycle counts, and reconciliation. | Mandatory | [BR-INV-003](BUSINESS-RULES.md) |
| FR-INV-004 | Low-stock thresholds, out-of-stock alerts, and replenishment reports. | Mandatory | [FR-BI-003](#317-reports--business-intelligence) |
| FR-INV-005 | Inventory reservation during checkout and release on cancellation/expiry. | Mandatory | [BR-INV-005](BUSINESS-RULES.md) |
| FR-INV-006 | Purchase orders and supplier records if procurement is in scope. | Conditional | [DEC-016](#12-unresolved-decisions-and-items-to-confirm) |
| FR-INV-007 | Batch/lot/serial/expiry tracking for applicable product types. | Conditional | [DEC-003](#12-unresolved-decisions-and-items-to-confirm) |
| FR-INV-008 | Damaged, lost, returned, and quarantined stock handling. | Mandatory | [BR-INV-008](BUSINESS-RULES.md) |
| FR-INV-009 | Inventory valuation and stock movement audit trail. | Mandatory | [DB-INV](../architecture/DATABASE-ERD.md) |

### 3.9 Order Management & Fulfilment

| ID | Requirement | Status | Cross-reference |
|---|---|---|---|
| FR-ORD-001 | Order creation, confirmation, payment state, and customer notifications. | Mandatory | [AC-001](ACCEPTANCE-CRITERIA.md) |
| FR-ORD-002 | Order splitting by vendor, warehouse, or shipment while retaining a customer-facing parent order. | Mandatory | [BR-ORD-002](BUSINESS-RULES.md), [AC-004](ACCEPTANCE-CRITERIA.md) |
| FR-ORD-003 | Vendor assignment, acceptance/rejection rules, and processing deadlines. | Mandatory | [BR-ORD-003](BUSINESS-RULES.md) |
| FR-ORD-004 | Pick, pack, dispatch, and partial fulfilment workflows. | Mandatory | [BR-ORD-004](BUSINESS-RULES.md) |
| FR-ORD-005 | Order statuses with controlled transitions and event history. | Mandatory | [BR-ORD-005](BUSINESS-RULES.md) |
| FR-ORD-006 | Cancellation before/after fulfilment according to policy; partial cancellation where supported. | Conditional for partial cancellation | [BR-ORD-006](BUSINESS-RULES.md) |
| FR-ORD-007 | Order editing rules, invoice generation, and internal notes. | Mandatory | [BR-ORD-007](BUSINESS-RULES.md) |
| FR-ORD-008 | Bulk order processing, exception queues, and operational dashboards. | Mandatory | [FR-OPS-001](#320-platform-operations--reliability) |
| FR-ORD-009 | Delivery confirmation and proof-of-delivery reference where supported. | Conditional | [INT-SHIP](../architecture/SYSTEM-ARCHITECTURE.md), [DEC-005](#12-unresolved-decisions-and-items-to-confirm) |

### 3.10 Shipping & Logistics

| ID | Requirement | Status | Cross-reference |
|---|---|---|---|
| FR-SHIP-001 | Shipping zones, serviceability, package dimensions/weight, and rate calculation. | Mandatory | [INT-SHIP](../architecture/SYSTEM-ARCHITECTURE.md) |
| FR-SHIP-002 | Courier aggregator or carrier integrations, shipment creation, and cancellation. | Mandatory; provider model decision required | [INT-SHIP](../architecture/SYSTEM-ARCHITECTURE.md), [DEC-005](#12-unresolved-decisions-and-items-to-confirm) |
| FR-SHIP-003 | AWB/tracking number, shipping label, and manifest generation. | Mandatory | [API-SHIP](../architecture/API-DESIGN.md) |
| FR-SHIP-004 | Pickup scheduling, shipment tracking, and milestone webhooks. | Mandatory | [API-WH-001](../architecture/API-DESIGN.md) |
| FR-SHIP-005 | Estimated delivery date, delivery notifications, and exception management. | Mandatory | [FR-MKT-001](#313-marketing-loyalty--engagement) |
| FR-SHIP-006 | Failed delivery, reattempt, return-to-origin, and reverse pickup workflows. | Mandatory | [BR-SHIP-006](BUSINESS-RULES.md) |
| FR-SHIP-007 | Multiple shipments for split orders and shipment-level status tracking. | Mandatory | [FR-ORD-002](#39-order-management--fulfilment) |

### 3.11 Returns, Exchanges & Refunds

| ID | Requirement | Status | Cross-reference |
|---|---|---|---|
| FR-RET-001 | Configurable return window, product eligibility, and return policy by category/vendor. | Mandatory; policy values decision required | [BR-RET-001](BUSINESS-RULES.md), [DEC-006](#12-unresolved-decisions-and-items-to-confirm) |
| FR-RET-002 | Customer return/exchange request with reason, comments, and evidence uploads. | Mandatory | [AC-007](ACCEPTANCE-CRITERIA.md) |
| FR-RET-003 | Approval, rejection, pickup scheduling, and return tracking. | Mandatory | [BR-RET-003](BUSINESS-RULES.md) |
| FR-RET-004 | Warehouse/vendor inspection and disposition: restock, repair, quarantine, or write-off. | Mandatory | [BR-RET-004](BUSINESS-RULES.md) |
| FR-RET-005 | Exchange/replacement order creation and inventory reservation. | Mandatory | [BR-RET-005](BUSINESS-RULES.md) |
| FR-RET-006 | Full/partial refund initiation, refund method, and status updates. | Mandatory | [FR-PAY-004](#37-payments-refunds--finance) |
| FR-RET-007 | Vendor liability and commission reversal rules. | Mandatory; calculation values decision required | [BR-FIN-007](BUSINESS-RULES.md), [DEC-006](#12-unresolved-decisions-and-items-to-confirm) |
| FR-RET-008 | Return analytics, reason codes, and abuse/fraud review. | Mandatory | [FR-BI-004](#317-reports--business-intelligence), [SEC-FRAUD-001](../architecture/SECURITY-ARCHITECTURE.md) |

### 3.12 Admin Console & Platform Configuration

| ID | Requirement | Status | Cross-reference |
|---|---|---|---|
| FR-ADM-001 | Super-admin dashboard with sales, orders, customers, sellers, inventory, and exception KPIs. | Mandatory | [FR-BI-001](#317-reports--business-intelligence) |
| FR-ADM-002 | Admin/sub-admin creation, role-based access control, and fine-grained permissions. | Mandatory | [SEC-AUTHZ-002](../architecture/SECURITY-ARCHITECTURE.md) |
| FR-ADM-003 | Manage vendors, customers, products, categories, brands, orders, payments, and returns. | Mandatory | [API-ADMIN](../architecture/API-DESIGN.md) |
| FR-ADM-004 | Configure commissions, fees, taxes, shipping rules, policies, and serviceability. | Mandatory | [BR-VEN-008](BUSINESS-RULES.md), [DEC-006](#12-unresolved-decisions-and-items-to-confirm) |
| FR-ADM-005 | Manage coupons, banners, campaigns, homepage sections, and content pages. | Mandatory | [FR-CMS-001](#316-content-management--seo) |
| FR-ADM-006 | Moderation queues, disputes, flagged reviews, and compliance workflows. | Mandatory | [FR-REV-003](#314-reviews-ratings--moderation), [FR-SUP-004](#315-customer-support--disputes) |
| FR-ADM-007 | System configuration, feature flags, audit logs, and operational controls. | Mandatory | [SEC-AUDIT-001](../architecture/SECURITY-ARCHITECTURE.md), [DEP-008](#11-devops-environments-and-deployment) |

### 3.13 Marketing, Loyalty & Engagement

| ID | Requirement | Status | Cross-reference |
|---|---|---|---|
| FR-MKT-001 | Email, SMS, push, and messaging notifications through approved providers. | Mandatory | [INT-EMAIL](../architecture/SYSTEM-ARCHITECTURE.md), [INT-SMS](../architecture/SYSTEM-ARCHITECTURE.md) |
| FR-MKT-002 | Campaigns, customer segments, referral codes, and affiliate tracking if enabled. | Conditional | [DEC-016](#12-unresolved-decisions-and-items-to-confirm) |
| FR-MKT-003 | Loyalty points, reward rules, redemption, and expiry ledger. | Conditional | [DEC-016](#12-unresolved-decisions-and-items-to-confirm) |
| FR-MKT-004 | Abandoned-cart reminders, back-in-stock alerts, and price-drop alerts with consent controls. | Conditional; consent mandatory where used | [SEC-PRIV-003](../architecture/SECURITY-ARCHITECTURE.md) |
| FR-MKT-005 | Personalized product recommendations and merchandising rules. | Mandatory | [PHASE-008](#11-development-phases-and-mvp-baseline) |
| FR-MKT-006 | Promotional banners, pop-ups, and campaign landing pages. | Mandatory | [FR-CMS-001](#316-content-management--seo) |
| FR-MKT-007 | Campaign attribution, conversion, and revenue reporting. | Mandatory | [FR-BI-007](#317-reports--business-intelligence) |
| FR-MKT-008 | Advanced or AI recommendations can follow in a later phase unless mandatory from day one. | Conditional; decision required | [DEC-016](#12-unresolved-decisions-and-items-to-confirm), [DEC-024](#12-unresolved-decisions-and-items-to-confirm), [PHASE-008](#11-development-phases-and-mvp-baseline) |

### 3.14 Reviews, Ratings & Moderation

| ID | Requirement | Status | Cross-reference |
|---|---|---|---|
| FR-REV-001 | Product and vendor ratings, written reviews, and optional image/video attachments. | Conditional for media | [DB-CUST](../architecture/DATABASE-ERD.md) |
| FR-REV-002 | Verified-purchase indicator and review eligibility rules. | Mandatory | [BR-REV-002](BUSINESS-RULES.md) |
| FR-REV-003 | Review reporting, moderation, removal, and appeal workflow. | Mandatory | [BR-REV-003](BUSINESS-RULES.md) |
| FR-REV-004 | Admin/vendor responses where permitted. | Conditional | [BR-REV-004](BUSINESS-RULES.md) |
| FR-REV-005 | Spam, abusive content, and suspicious review detection. | Mandatory | [SEC-FRAUD-001](../architecture/SECURITY-ARCHITECTURE.md) |

### 3.15 Customer Support & Disputes

| ID | Requirement | Status | Cross-reference |
|---|---|---|---|
| FR-SUP-001 | Support ticket creation, categories, priorities, assignment, and escalation. | Mandatory | [BR-SUP-001](BUSINESS-RULES.md) |
| FR-SUP-002 | Customer/vendor communication history and internal notes. | Mandatory | [DB-SUP](../architecture/DATABASE-ERD.md) |
| FR-SUP-003 | Live chat or chatbot integration if selected. | Conditional | [DEC-017](#12-unresolved-decisions-and-items-to-confirm) |
| FR-SUP-004 | FAQs, help centre, and policy knowledge base. | Mandatory | [FR-CMS-002](#316-content-management--seo) |
| FR-SUP-005 | Dispute management for orders, returns, payments, and vendor issues. | Mandatory | [BR-SUP-005](BUSINESS-RULES.md) |
| FR-SUP-006 | SLA tracking, resolution codes, CSAT, and support analytics. | Mandatory | [FR-BI-004](#317-reports--business-intelligence) |

### 3.16 Content Management & SEO

| ID | Requirement | Status | Cross-reference |
|---|---|---|---|
| FR-CMS-001 | Manage homepage sections, banners, navigation, footer, and landing pages. | Mandatory | [FR-ADM-005](#312-admin-console--platform-configuration) |
| FR-CMS-002 | Static pages including About, Contact, Terms, Privacy, Shipping, and Returns. | Mandatory | [SEC-PRIV-001](../architecture/SECURITY-ARCHITECTURE.md) |
| FR-CMS-003 | Blog/editorial content if required. | Conditional | [DEC-017](#12-unresolved-decisions-and-items-to-confirm) |
| FR-CMS-004 | SEO title, description, canonical URL, Open Graph, and structured product data. | Mandatory | [FR-DISC-006](#34-storefront-search--product-discovery) |
| FR-CMS-005 | XML sitemap, robots directives, redirects, and broken-link monitoring. | Mandatory | [FR-DISC-006](#34-storefront-search--product-discovery) |

### 3.17 Reports & Business Intelligence

| ID | Requirement | Status | Cross-reference |
|---|---|---|---|
| FR-BI-001 | Sales, gross merchandise value, net revenue, average order value, and conversion reports. | Mandatory | [FR-ADM-001](#312-admin-console--platform-configuration) |
| FR-BI-002 | Vendor sales, commissions, payouts, returns, and performance scorecards. | Mandatory | [FR-VEN-005](#32-vendor--seller-management) |
| FR-BI-003 | Product views, sales, conversion, stock, and catalogue-quality reports. | Mandatory | [FR-INV-004](#38-inventory-procurement--warehouse) |
| FR-BI-004 | Customer acquisition, retention, repeat purchase, and cohort reports. | Mandatory | [FR-CUS-004](#33-customer-accounts--crm) |
| FR-BI-005 | Order fulfilment, cancellation, delivery, and return analytics. | Mandatory | [FR-ORD-*](#39-order-management--fulfilment) |
| FR-BI-006 | Payment success/failure, refund, reconciliation, and tax reports. | Mandatory | [FR-PAY-009](#37-payments-refunds--finance) |
| FR-BI-007 | Exportable reports with role-based access and date/filter controls. | Mandatory | [SEC-AUTHZ-002](../architecture/SECURITY-ARCHITECTURE.md) |

### 3.18 Security, Privacy & Compliance

| ID | Requirement | Status | Cross-reference |
|---|---|---|---|
| FR-COMP-001 | Secure authentication, password hashing, approved role-based MFA policy, Redis-backed server-side sessions, and session management. | Mandatory | [SEC-AUTH-*](../architecture/SECURITY-ARCHITECTURE.md), [§12A](#12a-approved-g1g8-decisions) |
| FR-COMP-002 | RBAC, least-privilege access, admin step-up authentication, and audit logs. | Mandatory | [SEC-AUTHZ-*](../architecture/SECURITY-ARCHITECTURE.md) |
| FR-COMP-003 | TLS in transit, encryption at rest, secrets management, and secure file uploads. | Mandatory | [SEC-DATA-*](../architecture/SECURITY-ARCHITECTURE.md) |
| FR-COMP-004 | Input validation, output encoding, CSRF protection for cookie-authenticated state changes, XSS/SQL injection controls, and rate limiting. | Mandatory | [SEC-APP-001](../architecture/SECURITY-ARCHITECTURE.md), [§12A](#12a-approved-g1g8-decisions) |
| FR-COMP-005 | Payment security through compliant gateway/tokenization approach; define PCI DSS responsibilities with provider. | Mandatory | [SEC-PAY-*](../architecture/SECURITY-ARCHITECTURE.md), [DEC-018](#12-unresolved-decisions-and-items-to-confirm) |
| FR-COMP-006 | Privacy notices, consent records, retention policies, and data-subject request workflows. | Mandatory | [SEC-PRIV-*](../architecture/SECURITY-ARCHITECTURE.md) |
| FR-COMP-007 | Fraud signals, suspicious login/payment monitoring, and manual review queues. | Mandatory | [SEC-FRAUD-001](../architecture/SECURITY-ARCHITECTURE.md) |
| FR-COMP-008 | Dependency scanning, vulnerability management, backup testing, and incident response. | Mandatory | [DEP-003](#11-devops-environments-and-deployment), [QA-006](#10-testing-and-quality-assurance), [DEP-005](#11-devops-environments-and-deployment), [DEP-008](#11-devops-environments-and-deployment) |

### 3.19 Mobile & Multi-Channel

| ID | Requirement | Status | Cross-reference |
|---|---|---|---|
| FR-MOB-001 | Responsive customer storefront for mobile, tablet, and desktop. | Mandatory | [TEC-002](#6-recommended-technology-stack) |
| FR-MOB-002 | Optional customer app, vendor app, and delivery app using React Native. | Conditional | [TEC-015](#6-recommended-technology-stack) |
| FR-MOB-003 | Push notifications, deep links, and mobile-friendly checkout. | Conditional on mobile scope | [DEC-016](#12-unresolved-decisions-and-items-to-confirm) |
| FR-MOB-004 | Consistent API contracts across web and mobile clients. | Mandatory | [API-001](../architecture/API-DESIGN.md) |
| FR-MOB-005 | Optional B2B portal, social commerce, or additional sales channels. | Conditional | [DEC-016](#12-unresolved-decisions-and-items-to-confirm) |

### 3.20 Platform Operations & Reliability

| ID | Requirement | Status | Cross-reference |
|---|---|---|---|
| FR-OPS-001 | Environment separation for local development, test/staging, and production. | Mandatory | [DEP-001](#11-devops-environments-and-deployment) |
| FR-OPS-002 | Structured application logs, metrics, traces, alerting, and error monitoring. | Mandatory | [NFR-OBS-001](#5-non-functional-requirements) |
| FR-OPS-003 | Automated database backups, point-in-time recovery where supported, and restore drills. | Conditional for PITR | [DEP-005](#11-devops-environments-and-deployment) |
| FR-OPS-004 | CI/CD pipeline, migrations, rollback plan, and release approvals. | Mandatory | [DEP-003](#11-devops-environments-and-deployment), [DEP-004](#11-devops-environments-and-deployment) |
| FR-OPS-005 | Performance, load, security, and accessibility testing. | Mandatory | [QA-006](#10-testing-and-quality-assurance), [QA-007](#10-testing-and-quality-assurance) |
| FR-OPS-006 | Disaster recovery objectives (RPO/RTO) agreed before production launch. | Decision required | [NFR-REC-001](#5-non-functional-requirements), [DEC-009](#12-unresolved-decisions-and-items-to-confirm) |

---

## 4. Key user journeys and acceptance outcomes

| ID | Journey | Minimum acceptance outcome | Status | Cross-reference |
|---|---|---|---|---|
| AC-JOURNEY-001 | Customer purchase | Customer can discover an available product, add it to cart, receive a server-calculated total, place an order, complete payment, and view order/shipment status. | Mandatory | [AC-001](ACCEPTANCE-CRITERIA.md) |
| AC-JOURNEY-002 | Seller onboarding | Seller can submit required details/documents, see application status, and access vendor functions only after required approval. | Mandatory | [AC-002](ACCEPTANCE-CRITERIA.md) |
| AC-JOURNEY-003 | Product publishing | Seller submits a complete listing; authorized moderator approves/rejects with a reason; only approved eligible products are publicly visible. | Mandatory | [AC-003](ACCEPTANCE-CRITERIA.md) |
| AC-JOURNEY-004 | Multi-vendor order | Multi-seller cart splits into vendor fulfilment units while preserving one customer order summary and correct shipment tracking. | Mandatory | [AC-004](ACCEPTANCE-CRITERIA.md) |
| AC-JOURNEY-005 | Inventory safety | Concurrent checkouts cannot oversell stock beyond configured rules; reservations expire/release safely. | Mandatory | [AC-005](ACCEPTANCE-CRITERIA.md) |
| AC-JOURNEY-006 | Payment integrity | Payment callbacks are verified and idempotent; retry or duplicate webhook cannot create duplicate charges, orders, or refunds. | Mandatory | [AC-006](ACCEPTANCE-CRITERIA.md) |
| AC-JOURNEY-007 | Returns | Eligible customer can submit a return; workflow records decision, pickup, inspection, refund/exchange, and inventory disposition. | Mandatory | [AC-007](ACCEPTANCE-CRITERIA.md) |
| AC-JOURNEY-008 | Vendor settlement | Commission and payable amounts can be calculated from completed eligible transactions, reconciled, and reported to vendor. | Mandatory | [AC-008](ACCEPTANCE-CRITERIA.md) |
| AC-JOURNEY-009 | Administration | Admin permissions restrict sensitive actions; critical changes are recorded in an audit trail. | Mandatory | [AC-009](ACCEPTANCE-CRITERIA.md) |

---

## 5. Non-functional requirements

Section 8 labels these as “requirement / target to agree”; numeric targets are not supplied.

| ID | Area | Requirement | Status | Cross-reference |
|---|---|---|---|---|
| NFR-PERF-001 | Performance | Set measurable page/API latency targets. | Decision required | [PERF-001](../architecture/PERFORMANCE-STRATEGY.md) |
| NFR-PERF-002 | Performance | Optimize Core Web Vitals, caching, image delivery, and database queries. | Mandatory | [PERF-002](../architecture/PERFORMANCE-STRATEGY.md) |
| NFR-SCAL-001 | Scalability | Support growth in users, products, vendors, and concurrent orders. | Mandatory | [PERF-005](../architecture/PERFORMANCE-STRATEGY.md) |
| NFR-SCAL-002 | Scalability | Load test expected peak traffic. | Mandatory | [QA-007](#10-testing-and-quality-assurance), [AC-QA-005](ACCEPTANCE-CRITERIA.md#3-qa-acceptance-criteria) |
| NFR-AVAIL-001 | Availability | Define uptime objective, maintenance windows, failover design, and service dependencies. | Decision required | [PERF-007](../architecture/PERFORMANCE-STRATEGY.md) |
| NFR-REL-001 | Reliability | Use transactions, retries with backoff, idempotency, queue monitoring, and graceful failure handling. | Mandatory | [API-IDEMP](../architecture/API-DESIGN.md), [ARC-ASYNC](../architecture/SYSTEM-ARCHITECTURE.md) |
| NFR-SEC-001 | Security | Threat modelling, secure coding, access control, encryption, vulnerability scanning, and incident response. | Mandatory | [SEC-*](../architecture/SECURITY-ARCHITECTURE.md) |
| NFR-ACC-001 | Accessibility | Target WCAG 2.2 AA where feasible; keyboard navigation, semantic structure, contrast, screen-reader support. | Conditional “where feasible” | [AC-ACC-001](ACCEPTANCE-CRITERIA.md) |
| NFR-COMP-001 | Compatibility | Support current major browsers and agreed mobile/tablet breakpoints. | Mandatory; breakpoints to agree | [DEC-020](#12-unresolved-decisions-and-items-to-confirm) |
| NFR-MAINT-001 | Maintainability | Modular code, coding standards, architecture decision records, documented setup. | Mandatory | [ARC-ADR](../architecture/SYSTEM-ARCHITECTURE.md) |
| NFR-OBS-001 | Observability | Centralised structured logs, metrics, traces, dashboards, and actionable alerts. | Mandatory | [DEP-007](#11-devops-environments-and-deployment), [PERF-008](../architecture/PERFORMANCE-STRATEGY.md) |
| NFR-REC-001 | Recovery | Agree RPO/RTO, backup retention, restoration drills, disaster recovery procedures. | Decision required | [DEP-008](#11-devops-environments-and-deployment) |
| NFR-LOC-001 | Localization | Plan currency, locale, language, time zone, date, and tax formatting if multiple regions are supported. | Conditional | [DEC-007](#12-unresolved-decisions-and-items-to-confirm) |
| NFR-DATA-001 | Data protection | Define data classification, retention, consent, export/deletion, and access policies. | Mandatory | [SEC-PRIV-*](../architecture/SECURITY-ARCHITECTURE.md) |

---

## 6. Recommended technology stack

Section 4 states this is a recommended baseline and says to choose one technology per responsibility rather than implementing competing alternatives together.

| ID | Layer | Recommended technology | Purpose / notes | Status |
|---|---|---|---|---|
| TEC-001 | Web storefront | Next.js + React + TypeScript | SEO-friendly storefront, server rendering, routing, reusable UI. | Recommendation |
| TEC-002 | Styling/components | Tailwind CSS + accessible component library | Responsive design system and consistent components. | Recommendation |
| TEC-003 | Vendor/admin portals | Next.js + React + TypeScript | Separate role-aware applications; admin portal is a separate frontend under G7. | Recommendation; separate admin portal approved |
| TEC-004 | Backend | Node.js + NestJS + TypeScript | Modular business services, validation, dependency injection, API layer. | Recommendation |
| TEC-005 | API style | REST + OpenAPI/Swagger | Stable integration contract; version APIs and document errors. | Recommendation |
| TEC-006 | Real-time | WebSockets / server-sent events where suitable | Order, support, operational status updates. | Recommendation; choice to agree |
| TEC-007 | Primary database | PostgreSQL | Transactional relational data and referential integrity; shared by all portals under G7. | Recommendation; §6 makes it system of record |
| TEC-008 | ORM/migrations | Prisma | Typed data access and versioned schema migrations. | Approved in `AGENTS.md` |
| TEC-009 | Cache/queue | Redis + BullMQ | Caching, rate limiting, approved server-side sessions, background jobs. | Recommendation; session model approved under G2 |
| TEC-010 | Search | PostgreSQL full-text initially; OpenSearch/Elasticsearch when needed | Product search, facets, relevance at larger catalogue scale. | Recommendation; threshold to agree |
| TEC-011 | File/object storage | AWS S3 or compatible object storage | Product media, seller documents, generated files; signed URLs. | Recommendation |
| TEC-012 | CDN/edge | Cloudflare or cloud-provider CDN | Static/media delivery, DNS, edge protections. | Recommendation; provider to agree |
| TEC-013 | Mobile | React Native + Expo (optional phase) | Shared TypeScript mobile development for iOS/Android. | Recommendation; conditional |
| TEC-014 | Testing | Jest/Vitest + Supertest + Playwright | Unit, API/integration, E2E tests. | Recommendation; runner choice to agree |
| TEC-015 | Code quality | ESLint + Prettier + TypeScript strict mode | Consistent, maintainable, safer code. | Recommendation |
| TEC-016 | Containers | Docker | Repeatable local and deployment environments. | Recommendation and mandatory in §11 |
| TEC-017 | CI/CD | GitHub Actions | Automated checks, build, test, deployment. | Recommendation |
| TEC-018 | Hosting | AWS, Azure, or Google Cloud | Managed application, database, storage, networking. | Recommendation; provider to agree |
| TEC-019 | Monitoring | Sentry + cloud metrics/logging + OpenTelemetry | Error reporting, logs, traces, dashboards, alerts. | Recommendation |
| TEC-020 | API testing | Postman or Bruno | Manual and automated API verification. | Recommendation; choice to agree |
| TEC-021 | Design | Figma | Wireframes, UI kit, design system, prototypes. | Recommendation and mandatory deliverable in §14/§15 |
| TEC-022 | Source control | Git + GitHub | Branching, pull requests, code review, release tags. | Recommendation |

---

## 7. Architecture summary

The `ARC-001`–`ARC-008` IDs are canonically defined in [SYSTEM-ARCHITECTURE.md](../architecture/SYSTEM-ARCHITECTURE.md#1-architecture-intent). Rows marked `—` are SRS architecture summaries only; trace them through their cross-reference, not as alternative `ARC-*` definitions.

| ID | Requirement | Status | Cross-reference |
|---|---|---|---|
| ARC-001 | Begin with a modular monolith: one deployable backend organised into strict domain modules with explicit interfaces, independent tests, and clear data ownership. | Recommendation | [ARC-001](../architecture/SYSTEM-ARCHITECTURE.md) |
| ARC-002 | Avoid premature microservice complexity while preserving extraction of high-load or independently operated modules later. | Recommendation | [PHASE-008](#11-development-phases-and-mvp-baseline) |
| — | Presentation layer: customer storefront, vendor portal, admin console, optional mobile apps. | Recommendation | [ARC-PRES](../architecture/SYSTEM-ARCHITECTURE.md) |
| — | API/application layer: authentication, authorization, request validation, orchestration, versioned APIs. | Recommendation | [API-001](../architecture/API-DESIGN.md) |
| — | Domain modules: catalogue, vendor, customer, pricing, cart, checkout, payment, inventory, order, fulfilment, shipping, returns, finance, support, marketing, reporting. | Recommendation | [ARC-DOMAIN](../architecture/SYSTEM-ARCHITECTURE.md) |
| — | Data layer: PostgreSQL, Redis, object storage, search index where needed. | Recommendation | [DB-*](../architecture/DATABASE-ERD.md) |
| — | Integration layer: payment, courier, email/SMS, tax, analytics, accounting providers. | Recommendation | [INT-*](../architecture/SYSTEM-ARCHITECTURE.md) |
| — | Async processing: background queues for emails, webhooks, invoice generation, search indexing, exports, scheduled tasks. | Recommendation | [ARC-ASYNC](../architecture/SYSTEM-ARCHITECTURE.md) |
| ARC-009 | Edge layer: DNS, CDN, WAF, TLS termination, rate limiting. | Recommendation | [SEC-*](#9-security-and-privacy-checklist), [TEC-012](#6-recommended-technology-stack), [API-*](#8-data-api-and-integration-summary) |
| ARC-010 | Operations layer: CI/CD, monitoring, logging, backups, security scanning. | Recommendation | [DEP-*](#11-devops-environments-and-deployment), [NFR-OBS-001](#5-non-functional-requirements) |

## 8. Data, API and integration summary

### 8.1 Data requirements

| ID | Requirement | Status | Cross-reference |
|---|---|---|---|
| DB-001 | Use PostgreSQL as system of record. | Mandatory | [DB-001](../architecture/DATABASE-ERD.md) |
| DB-002 | Model entities with primary keys, foreign keys, indexes, timestamps, status history, and appropriate uniqueness constraints. | Mandatory | [DB-002](../architecture/DATABASE-ERD.md) |
| DB-003 | Minimise and protect sensitive data. | Mandatory | [SEC-DATA-001](../architecture/SECURITY-ARCHITECTURE.md) |
| DB-004 | Use database transactions for checkout, stock reservation, payment state transitions, and financial ledger operations. | Mandatory | [BR-INV-005](BUSINESS-RULES.md) |
| DB-005 | Use idempotency keys for order creation, payment requests, refunds, webhook processing, and payout operations. | Mandatory | [API-IDEMP](../architecture/API-DESIGN.md) |
| DB-006 | Store monetary values using fixed-precision decimals and explicit currency code; never floating-point arithmetic for money. | Mandatory | [BR-FIN-001](BUSINESS-RULES.md) |
| DB-007 | Preserve immutable financial ledger entries; correct errors with compensating entries. | Mandatory | [BR-FIN-002](BUSINESS-RULES.md) |
| DB-008 | Maintain status/event histories for orders, payments, shipments, returns, vendor approvals. | Mandatory | [BR-ORD-005](BUSINESS-RULES.md) |
| DB-009 | Index common filters/joins; review query plans; avoid unbounded list endpoints. | Mandatory | [PERF-006](../architecture/PERFORMANCE-STRATEGY.md) |
| DB-010 | Use soft deletion only where appropriate; retain financial and audit records according to policy and law. | Mandatory | [SEC-PRIV-004](../architecture/SECURITY-ARCHITECTURE.md) |

#### 8.1.1 Data entity and example table coverage

PDF §6 enumerates the following domains and example tables. Coverage is required in the data model; the lists are examples, not a decision to implement every optional entity before its scope condition is resolved.

| ID | Domain | Example entities / tables | Status | Cross-reference |
|---|---|---|---|---|
| DB-ENT-001 | Identity & access | `users`, `roles`, `permissions`, `user_roles`, `sessions`, `addresses`, `verification_tokens`, `consent_records` | Mandatory coverage | [DATABASE-ERD.md](../architecture/DATABASE-ERD.md), [FR-CUS-*](#33-customer-accounts--crm), [FR-COMP-*](#318-security-privacy--compliance) |
| DB-ENT-002 | Vendors | `vendors`, `vendor_users`, `vendor_documents`, `vendor_bank_accounts` (protected/tokenized references), `vendor_stores`, `vendor_status_history` | Mandatory coverage | [DATABASE-ERD.md](../architecture/DATABASE-ERD.md), [FR-VEN-*](#32-vendor--seller-management) |
| DB-ENT-003 | Catalogue | `products`, `product_variants`, `categories`, `brands`, `attributes`, `attribute_values`, `product_media`, `product_categories`, `product_approvals` | Mandatory coverage | [DATABASE-ERD.md](../architecture/DATABASE-ERD.md), [FR-CAT-*](#31-product-catalogue--product-listing) |
| DB-ENT-004 | Commercial | `price_lists`, `product_prices`, `tax_rules`, `coupons`, `promotions`, `promotion_rules`, `gift_cards` (if enabled) | Mandatory coverage; gift cards conditional | [DATABASE-ERD.md](../architecture/DATABASE-ERD.md), [FR-PRICE-*](#35-pricing-tax--promotions), [DEC-016](#12-unresolved-decisions-and-items-to-confirm) |
| DB-ENT-005 | Customer activity | `wishlists`, `wishlist_items`, `carts`, `cart_items`, `recently_viewed`, `reviews`, `review_media` | Mandatory coverage | [DATABASE-ERD.md](../architecture/DATABASE-ERD.md), [FR-CUS-*](#33-customer-accounts--crm), [FR-REV-*](#314-reviews-ratings--moderation) |
| DB-ENT-006 | Inventory | `warehouses`, `inventory_items`, `stock_movements`, `stock_reservations`, `suppliers`, `purchase_orders` (if enabled) | Mandatory coverage; supplier/purchase-order entities conditional | [DATABASE-ERD.md](../architecture/DATABASE-ERD.md), [FR-INV-*](#38-inventory-procurement--warehouse), [DEC-016](#12-unresolved-decisions-and-items-to-confirm) |
| DB-ENT-007 | Orders | `orders`, `order_items`, `vendor_orders`, `order_status_history`, `invoices`, `shipments`, `shipment_events` | Mandatory coverage | [DATABASE-ERD.md](../architecture/DATABASE-ERD.md), [FR-ORD-*](#39-order-management--fulfilment), [FR-SHIP-*](#310-shipping--logistics) |
| DB-ENT-008 | Payments & finance | `payment_intents`, `payment_transactions`, `refunds`, `commissions`, `ledger_entries`, `settlements`, `payouts`, `reconciliation_records` | Mandatory coverage | [DATABASE-ERD.md](../architecture/DATABASE-ERD.md), [FR-PAY-*](#37-payments-refunds--finance) |
| DB-ENT-009 | Returns | `return_requests`, `return_items`, `return_events`, `inspections`, `exchange_orders` | Mandatory coverage | [DATABASE-ERD.md](../architecture/DATABASE-ERD.md), [FR-RET-*](#311-returns-exchanges--refunds) |
| DB-ENT-010 | Support | `support_tickets`, `ticket_messages`, `ticket_assignments`, `disputes`, `faq_articles` | Mandatory coverage | [DATABASE-ERD.md](../architecture/DATABASE-ERD.md), [FR-SUP-*](#315-customer-support--disputes) |
| DB-ENT-011 | Marketing | `campaigns`, `notifications`, `notification_templates`, `referral_codes`, `loyalty_accounts`, `loyalty_transactions` | Mandatory coverage | [DATABASE-ERD.md](../architecture/DATABASE-ERD.md), [FR-MKT-*](#313-marketing-loyalty--engagement) |
| DB-ENT-012 | Governance | `audit_logs`, `admin_actions`, `webhook_events`, `feature_flags`, `system_settings` | Mandatory coverage | [DATABASE-ERD.md](../architecture/DATABASE-ERD.md), [FR-ADM-*](#312-admin-console--platform-configuration), [FR-OPS-*](#320-platform-operations--reliability) |

### 8.2 API standards

| ID | Requirement | Status | Cross-reference |
|---|---|---|---|
| API-001 | REST endpoints grouped by domain and versioned, e.g. `/api/v1/products`, `/api/v1/orders`. | Mandatory | [API-001](../architecture/API-DESIGN.md) |
| API-002 | OpenAPI/Swagger specification, consistent response envelopes, documented error codes. | Mandatory | [API-ERR](../architecture/API-DESIGN.md) |
| API-003 | Pagination, sorting, filtering, field validation, sensible request-size limits. | Mandatory | [API-003](../architecture/API-DESIGN.md) |
| API-004 | Authentication and role/permission checks on every protected operation. | Mandatory | [SEC-AUTHZ-001](../architecture/SECURITY-ARCHITECTURE.md) |
| API-005 | Idempotency for sensitive create/payment operations; request correlation IDs. | Mandatory | [API-IDEMP](../architecture/API-DESIGN.md) |
| API-006 | Webhook signature verification, replay protection, retry handling, dead-letter queues. | Mandatory | [API-WH](../architecture/API-DESIGN.md) |
| API-007 | Separate public, authenticated customer, vendor, and administrative permissions. | Mandatory | [SEC-AUTHZ-004](../architecture/SECURITY-ARCHITECTURE.md) |

### 8.3 External integrations

| ID | Integration | Purpose | Selection notes / constraints | Status | Cross-reference |
|---|---|---|---|---|---|
| INT-PAY | Payment gateway | Collect payments, verify status, process refunds and support marketplace payouts where available. | Select provider based on operating country, UPI/cards/net banking/COD needs, marketplace split-settlement support, fees and compliance. | Mandatory capability; provider decision required | [DEC-004](#12-unresolved-decisions-and-items-to-confirm) |
| INT-SHIP | Shipping/courier | Rate lookup, serviceability, shipment booking, labels, tracking, reverse pickup. | Compare direct carrier APIs with a shipping aggregator; validate service coverage and webhook quality. | Mandatory capability; model decision required | [DEC-005](#12-unresolved-decisions-and-items-to-confirm) |
| INT-EMAIL | Email provider | Transactional emails, verification, invoices and alerts. | Use templates, bounce handling, suppression and delivery logs. | Mandatory | [FR-MKT-001](#313-marketing-loyalty--engagement) |
| INT-SMS | SMS/WhatsApp | OTP and permitted transactional or promotional messages. | Use approved providers and follow consent/template rules. | Mandatory capability; provider/consent rules apply | [SEC-PRIV-003](../architecture/SECURITY-ARCHITECTURE.md) |
| INT-TAX | Tax/invoicing | Tax calculation, invoice numbering and tax reports. | Confirm applicable jurisdictional rules with a qualified tax professional. | Mandatory capability; rules decision required | [DEC-001](#12-unresolved-decisions-and-items-to-confirm) |
| INT-MAPS | Maps/address | Address autocomplete, geocoding and delivery coverage. | Use only where it materially improves checkout or fulfilment. | Conditional | [FR-CHK-003](#36-cart-checkout--order-placement) |
| INT-ANALYTICS | Analytics | Traffic, funnel, product and campaign analysis. | Define consent, event taxonomy and data retention. | Mandatory capability; consent/taxonomy/retention to define | [NFR-DATA-001](#5-non-functional-requirements) |
| INT-ERP | Accounting/ERP/CRM | Financial reconciliation, stock sync and customer/business workflows. | Integrate after core marketplace data model and ownership are established. | Mandatory capability; integrate after core model/ownership established | [PHASE-005](#11-development-phases-and-mvp-baseline) |

---

## 9. Security and privacy checklist

| ID | Requirement | Status | Cross-reference |
|---|---|---|---|
| SEC-001 | HTTPS/TLS everywhere; secure cookies; appropriate security headers. | Mandatory | [SEC-TLS](../architecture/SECURITY-ARCHITECTURE.md) |
| SEC-002 | Passwords hashed using a modern password-hashing algorithm; MFA is optional for Customer, mandatory for Vendor Owner, Vendor Staff, Admin, Super Admin, Support, Finance, and Warehouse/Fulfilment, and configurable for Delivery/Logistics pending approval. | Mandatory | [SEC-AUTH-001](../architecture/SECURITY-ARCHITECTURE.md), [SRS §12A](#12a-approved-g1g8-decisions) |
| SEC-003 | RBAC with least privilege and server-side authorization checks. | Mandatory | [SEC-AUTHZ-001](../architecture/SECURITY-ARCHITECTURE.md) |
| SEC-004 | Input validation, output encoding, parameterized queries, secure file-upload scanning. | Mandatory | [SEC-APP-001](../architecture/SECURITY-ARCHITECTURE.md) |
| SEC-005 | CSRF, XSS, SQL injection, SSRF, broken access control, and rate-limit protections. | Mandatory; CSRF “where applicable” in §3.18 | [SEC-APP-002](../architecture/SECURITY-ARCHITECTURE.md) |
| SEC-006 | Secrets stored in a secrets manager or protected environment configuration, never committed to source control. | Mandatory | [SEC-SECRETS-001](../architecture/SECURITY-ARCHITECTURE.md) |
| SEC-007 | Payment gateway tokenization/hosted checkout; do not store card numbers or CVV. | Mandatory | [SEC-PAY-001](../architecture/SECURITY-ARCHITECTURE.md) |
| SEC-008 | Verify payment/shipping webhook signatures and protect against replay attacks. | Mandatory | [API-WH-001](../architecture/API-DESIGN.md) |
| SEC-009 | Audit privileged actions, seller bank-detail changes, refunds, commissions, payouts. | Mandatory | [SEC-AUDIT-001](../architecture/SECURITY-ARCHITECTURE.md) |
| SEC-010 | Encrypt backups and sensitive fields; restrict access and test restoration. | Mandatory | [SEC-DATA-002](../architecture/SECURITY-ARCHITECTURE.md) |
| SEC-011 | Privacy and consumer-law requirements assessed for each target market; for India, review DPDP, consumer protection, GST, payment, and e-commerce rules with qualified specialists. | Mandatory | [DEC-001](#12-unresolved-decisions-and-items-to-confirm) |
| SEC-012 | Dependency, container, static-analysis, and penetration testing before production. | Mandatory | [AC-QA-006](ACCEPTANCE-CRITERIA.md#3-qa-acceptance-criteria), [QA-006](#10-testing-and-quality-assurance) |

---

## 10. Testing and quality assurance

| ID | Test level | Coverage | Status | Cross-reference |
|---|---|---|---|---|
| QA-001 | Unit | Pricing, tax, commission, coupon eligibility, stock calculations, permissions, state transitions. | Mandatory | [AC-QA-001](ACCEPTANCE-CRITERIA.md) |
| QA-002 | Integration | Database transactions, payment adapter, shipping adapter, queues, storage, webhook handlers. | Mandatory | [AC-QA-002](ACCEPTANCE-CRITERIA.md) |
| QA-003 | API | Authentication, authorization, validation, pagination, errors, idempotency, rate limits. | Mandatory | [AC-QA-003](ACCEPTANCE-CRITERIA.md) |
| QA-004 | End-to-end | Register → browse → cart → checkout → payment → fulfilment → delivery → review/return. | Mandatory | [AC-001](ACCEPTANCE-CRITERIA.md) |
| QA-005 | Vendor workflow | Onboarding → KYC approval → product submission → listing approval → order → settlement. | Mandatory | [AC-002](ACCEPTANCE-CRITERIA.md), [AC-008](ACCEPTANCE-CRITERIA.md) |
| QA-006 | Security | Access control, injection, session handling, upload security, secrets, dependency vulnerabilities. | Mandatory | [SEC-*](../architecture/SECURITY-ARCHITECTURE.md) |
| QA-007 | Performance | Search, catalogue browsing, checkout, flash-sale traffic, concurrent inventory updates. | Mandatory | [PERF-*](../architecture/PERFORMANCE-STRATEGY.md) |
| QA-008 | Accessibility | Keyboard operation, focus, labels, contrast, screen-reader usability. | Mandatory | [NFR-ACC-001](#5-non-functional-requirements) |
| QA-009 | Regression | Critical flows every release; automated smoke suite after deployment. | Mandatory | [DEP-004](#11-devops-environments-and-deployment) |

---

## 11. DevOps, environments and deployment

| ID | Requirement | Status | Cross-reference |
|---|---|---|---|
| DEP-001 | Environments: local development, automated test, staging/UAT, production; isolate credentials and data. | Mandatory | [FR-OPS-001](#320-platform-operations--reliability) |
| DEP-002 | Use Docker for consistent local and CI environments. | Mandatory | [TEC-016](#6-recommended-technology-stack) |
| DEP-003 | CI pipeline: lint → type-check → unit/integration tests → build → dependency/security scans. | Mandatory | [NFR-MAINT-001](#5-non-functional-requirements) |
| DEP-004 | CD pipeline: deploy to staging, run smoke tests, require approval for production, retain rollback capability. | Mandatory | [QA-009](#10-testing-and-quality-assurance) |
| DEP-005 | Use managed PostgreSQL with automated backups, monitoring, controlled migrations. | Mandatory | [DB-001](#8-data-api-and-integration-summary) |
| DEP-006 | Serve media through object storage and CDN; use signed URLs for private documents. | Mandatory | [TEC-011](#6-recommended-technology-stack) |
| DEP-007 | Centralise secrets, logs, metrics; alert on payment failures, queue backlog, API errors, database health. | Mandatory | [NFR-OBS-001](#5-non-functional-requirements) |
| DEP-008 | Document deployment, rollback, incident response, backup restore, disaster recovery procedures. | Mandatory | [NFR-REC-001](#5-non-functional-requirements) |

## 11. Development phases and MVP baseline

### 11.1 Suggested delivery phases

Section 14 is explicitly “Suggested Delivery Phases”.

| ID | Phase | Scope | Exit criteria | Status |
|---|---|---|---|---|
| PHASE-000 | 0 — Discovery | Business rules, roles, requirements, target market, vendor/payment/logistics model, UX, architecture decisions. | Approved scope, user journeys, wireframes, architecture, delivery plan. | Recommendation |
| PHASE-001 | 1 — Platform foundation | Repo, environments, CI/CD, authentication, RBAC, database, design system, API standards, audit foundation. | Deployable skeleton with tested identity and permissions. | Recommendation |
| PHASE-002 | 2 — Marketplace core | Vendor onboarding, catalogue, product listing/moderation, categories, search, customer accounts, storefront. | Approved sellers can publish products; customers can browse/search. | Recommendation |
| PHASE-003 | 3 — Commerce | Cart, checkout, pricing, tax, payment integration, order creation, invoices. | End-to-end test purchase succeeds in provider sandbox. | Recommendation |
| PHASE-004 | 4 — Operations | Inventory, warehouse, vendor order handling, shipping, tracking, cancellations, returns, refunds. | Order-to-delivery and return flows work with test integrations. | Recommendation |
| PHASE-005 | 5 — Marketplace finance | Commissions, seller statements, settlement, reconciliation. | Finance can reconcile sample transactions and vendor balances. | Recommendation |
| PHASE-006 | 6 — Growth & insights | Promotions, loyalty, reviews, support, marketing, reports, analytics. | Business users can operate campaigns and review key metrics. | Recommendation |
| PHASE-007 | 7 — Hardening & launch | Security, performance, accessibility, UAT, migration, monitoring, backup/restore, production rollout. | Critical defects closed; launch checklist and operational ownership approved. | Recommendation |
| PHASE-008 | 8 — Expansion | Mobile apps, advanced search, recommendations, multi-region, B2B, service extraction as justified. | Expansion features validated against business priorities. | Recommendation |

### 11.2 Recommended first production release baseline

| ID | Requirement | Status | Cross-reference |
|---|---|---|---|
| MVP-001 | Prioritise secure identity and role permissions. | Recommendation baseline | [SEC-AUTH-*](../architecture/SECURITY-ARCHITECTURE.md) |
| MVP-002 | Prioritise vendor onboarding, product listing/moderation, catalogue/search, customer storefront. | Recommendation baseline | [PHASE-002](#11-development-phases-and-mvp-baseline) |
| MVP-003 | Prioritise cart/checkout, payment, inventory reservation, multi-vendor order splitting. | Recommendation baseline | [AC-001](ACCEPTANCE-CRITERIA.md), [AC-004](ACCEPTANCE-CRITERIA.md), [AC-005](ACCEPTANCE-CRITERIA.md), [AC-006](ACCEPTANCE-CRITERIA.md) |
| MVP-004 | Prioritise shipping/tracking, cancellation/returns/refunds, commissions/settlements. | Recommendation baseline | [PHASE-004](#11-development-phases-and-mvp-baseline), [PHASE-005](#11-development-phases-and-mvp-baseline) |
| MVP-005 | Prioritise admin operations, notifications, audit logs, reporting, production monitoring. | Recommendation baseline | [FR-ADM-*](#312-admin-console--platform-configuration), [NFR-OBS-001](#5-non-functional-requirements) |
| MVP-006 | Advanced loyalty, affiliate marketing, advanced/AI recommendations, native mobile apps, B2B procurement, and multi-region can follow in planned releases unless mandatory from day one. | Conditional | [DEC-016](#12-unresolved-decisions-and-items-to-confirm), [DEC-024](#12-unresolved-decisions-and-items-to-confirm) |

### 11.3 Launch checklist

| ID | Checklist item | Status |
|---|---|---|
| LAUNCH-001 | Business rules and policies signed off. | Mandatory |
| LAUNCH-002 | Customer, vendor, admin, and support roles tested. | Mandatory |
| LAUNCH-003 | Vendor KYC and product moderation workflows verified. | Mandatory |
| LAUNCH-004 | Product listing, variants, media, and inventory tested. | Mandatory |
| LAUNCH-005 | Checkout totals, tax, coupons, and payment flows reconciled. | Mandatory |
| LAUNCH-006 | Multi-vendor order splitting and shipment states tested. | Mandatory |
| LAUNCH-007 | Refund, return, commission, settlement calculations verified. | Mandatory |
| LAUNCH-008 | Security review, privacy review, vulnerability scan completed. | Mandatory |
| LAUNCH-009 | Load, accessibility, browser, mobile responsiveness checks completed. | Mandatory |
| LAUNCH-010 | Backups restored successfully in a test environment. | Mandatory |
| LAUNCH-011 | Monitoring, alerting, incident contacts, runbooks ready. | Mandatory |
| LAUNCH-012 | Production credentials, DNS, TLS, legal pages, support channels ready. | Mandatory |
| LAUNCH-013 | UAT approval, release notes, rollback plan completed. | Mandatory |

---

## 12. Unresolved decisions and items to confirm

These are carried forward unchanged in intent from §16 and other qualified statements in the PDF. No values are assumed.

| ID | Decision | Status | Impact |
|---|---|---|---|
| DEC-001 | Target launch country/countries, legal entity, applicable tax/consumer/privacy requirements. | Decision required | Tax, compliance, localization, legal pages. |
| DEC-002 | Marketplace model: open multi-vendor, curated/approved vendors, or hybrid. | Decision required | Vendor onboarding and approval rules. |
| DEC-003 | Product types: physical only, or also digital products, services, subscriptions. | Decision required | Catalogue, inventory, fulfilment, tax, permissions. |
| DEC-004 | Payment provider(s), supported methods, COD policy, marketplace settlement capability. | Decision required | Payment adapters, split settlement, refunds, COD. |
| DEC-005 | Shipping model: single aggregator, direct carriers, seller-fulfilled, marketplace-fulfilled, or mixed. | Decision required | Shipping adapters, rate lookup, labels, webhooks. |
| DEC-006 | Commission rules, settlement frequency, reserve/holdback, dispute policy. | Decision required | Finance rules, ledger, payouts, dispute handling. |
| DEC-007 | Initial languages, currencies, tax regions, localization needs. | Decision required | Formatting, tax display, catalog, UX. |
| DEC-008 | Expected vendors, SKUs, monthly orders, peak concurrent users, growth forecast. | Decision required | Capacity planning, load tests, scaling. |
| DEC-009 | Hosting preference, budget, team size, timeline, support model, SLOs. | Decision required | Infrastructure, delivery plan, support model, RPO/RTO. |
| DEC-010 | Whether MFA is optional or mandatory for privileged users: §3.18 says optional MFA; §9 requires MFA for privileged users. | Resolved by G1; Delivery/Logistics configurable pending further approval | Authentication design and admin controls. |
| DEC-011 | Whether support, warehouse, delivery, and finance roles use dedicated portals or admin-console subareas. | Partly resolved by G7: separate admin portal approved; dedicated operations workspaces remain decision-required | Portal decomposition and navigation. |
| DEC-012 | Guest checkout policy: §2 and §3.6 allow it only where permitted/subject to business policy. | Resolved by G5; eligible guest-order association rules remain to be documented | Checkout flows and authorization. |
| DEC-013 | ORM selection: Prisma or TypeORM. | Decision required | Data access implementation. |
| DEC-014 | Real-time transport: WebSockets or server-sent events “where suitable”. | Decision required | Status-update implementation. |
| DEC-015 | Search engine threshold: PostgreSQL full-text initially; OpenSearch/Elasticsearch when needed. | Decision required | Search architecture and migration trigger. |
| DEC-016 | Which optional/conditional features from PDF §16 are launch requirements: mobile apps, B2B, multi-warehouse, loyalty, affiliate, advanced/AI recommendations, subscriptions, gift cards, store credit, social sign-in, social commerce, additional channels. | Partly resolved by G6 for optional Google sign-in; remaining items decision required | Scope and phasing. |
| DEC-017 | Whether live chat/chatbot and blog/editorial content are required. | Decision required | Support/content scope. |
| DEC-018 | PCI DSS responsibility boundary with the selected payment provider. | Decision required | Compliance documentation and control allocation. |
| DEC-019 | Load balancer, auto-scaling, and concrete failover topology. Not specified in PDF. | Decision required | Availability and scalability design. |
| DEC-020 | Numeric performance, availability, RPO/RTO, retention, and breakpoint targets. Not specified in PDF. | Auth security/retention values resolved by G4; other NFR targets decision required | NFR acceptance thresholds. |
| DEC-021 | Exact state machines and transition rules for orders, payments, refunds, returns, shipments, vendors, products. | Decision required before development | Business-rule finalization. |
| DEC-022 | Duplicate-listing rules, content guidelines, tax calculation source of truth, commission calculation examples, reconciliation matching rules. | Decision required before development | Business rule finalization. |
| DEC-023 | Search quality targets for typo tolerance, synonyms, and relevance ranking. | Decision required | Search acceptance criteria. |
| DEC-024 | Day-one-mandatory subset of `DEC-016`: whether native apps, B2B procurement, multi-region capability, loyalty, affiliate, and advanced/AI recommendations are mandatory from day one. This does not supersede `DEC-016`; multi-region from PDF §17 remains distinct from multi-warehouse in `DEC-016`, and no answer is assumed. | Decision required; subordinate to DEC-016 | MVP baseline confirmation. |

## 12A. Approved G1–G8 decisions

These decisions were human-approved on 2026-11-22. They resolve only the items shown and do not decide any other unresolved `DEC-*` item.

| Gate | Approved decision | Canonical effect |
|---|---|---|
| G1 | MFA mandatory for Vendor Owner, Vendor Staff, Admin, Super Admin, Support, Finance, and Warehouse/Fulfilment; optional for Customer; configurable for Delivery/Logistics pending further approval | Resolves `DEC-010` except the Delivery/Logistics configuration detail |
| G2 | NestJS authentication with Redis-backed server-side sessions, secure HttpOnly cookies, and CSRF protection | Confirms the session model for `FR-COMP-001`, `FR-COMP-004`, and `TEC-009` |
| G3 | Unverified authenticated sessions can only access email verification and resend-verification | Adds a restricted-session rule to authentication and checkout flows |
| G4 | Approved Argon2id, TTL, lockout, MFA, recovery-code, resend, retention, and never-log secrets values listed in `docs/audits/AUTHENTICATION-IMPLEMENTATION-PLAN.md` | Resolves auth security/retention values within `DEC-020`; all other NFR targets remain unresolved |
| G5 | Guest checkout allowed with secure guest identity; eligible guest orders associate after verified registration; no unverified-email merge | Resolves `DEC-012`; eligibility details remain to be documented |
| G6 | Optional Google sign-in for customers with explicit secure linking; no email-only auto-link; roles and MFA unchanged | Resolves the social sign-in part of `DEC-016` |
| G7 | Separate admin portal with centralized auth backend and shared PostgreSQL database | Partly resolves `DEC-011`; operations workspaces remain unresolved |
| G8 | pnpm workspaces monorepo | Confirms repository layout and `pnpm-lock.yaml`; does not resolve unrelated `DEC-*` items |

---

## 13. Traceability index

| Source section | Primary IDs in this set |
|---|---|
| §1 Executive Summary | SRS-OV-*, SRS-OBJ-* |
| §2 User Roles & Portals | SRS-ROLE-*, SRS-PORTAL-*, SRS-CHANNEL-*, DEC-011 |
| §3 Complete Functional Scope | FR-* |
| §4 Recommended Technology Stack | TEC-* |
| §5 Architecture & Application Design | ARC-* |
| §6 Database & Data Model Requirements | DB-*, DB-ENT-* |
| §7 API & Integration Requirements | API-*, INT-* |
| §8 Non-Functional Requirements | NFR-* |
| §9 Security & Compliance Checklist | SEC-* |
| §10 Testing & QA | QA-* |
| §11 DevOps, Environments & Deployment | DEP-* |
| §12 UI/UX & Design Deliverables | UX-* in [SRS §14](#14-uiux-and-design-deliverables) and [ACCEPTANCE-CRITERIA.md](ACCEPTANCE-CRITERIA.md#ux-pres-001--uiux-and-design-deliverables) |
| §13 Key User Journeys | AC-JOURNEY-*, AC-* |
| §14 Suggested Delivery Phases | PHASE-* |
| §15 Project Deliverables | DEL-* in [SRS §15](#15-project-deliverables) and [ACCEPTANCE-CRITERIA.md](ACCEPTANCE-CRITERIA.md#5-project-deliverable-acceptance) |
| §16 Assumptions, Decisions & Items to Confirm | DEC-* |
| §17 Recommended Baseline Scope / Appendix A | MVP-*, LAUNCH-* |

---

## 14. UI/UX and design deliverables

PDF §12 requires the following design deliverables. These are scope deliverables, not implementation claims.

| ID | Requirement | Status | Cross-reference |
|---|---|---|---|
| UX-DISC-001 | Discovery and user journeys for customer, vendor, admin, support, and fulfilment roles. | Mandatory | [AC-JOURNEY-*](#4-key-user-journeys-and-acceptance-outcomes), [UX-PRES-001](ACCEPTANCE-CRITERIA.md#ux-pres-001--uiux-and-design-deliverables) |
| UX-IA-001 | Information architecture, sitemap, and navigation model. | Mandatory | [SRS-PORTAL-*](#21-portal-surfaces), [FR-DISC-*](#34-storefront-search--product-discovery) |
| UX-WIRE-001 | Wireframes for all critical screens and responsive breakpoints; numeric breakpoints remain decision-required. | Mandatory; breakpoints decision required | [UX-PRES-001](ACCEPTANCE-CRITERIA.md#ux-pres-001--uiux-and-design-deliverables), [FR-MOB-001](#319-mobile--multi-channel), [DEC-020](#12-unresolved-decisions-and-items-to-confirm) |
| UX-DS-001 | Figma design system covering colours, typography, spacing, grids, components, form states, and accessibility rules. | Mandatory | [TEC-021](#6-recommended-technology-stack), [NFR-ACC-001](#5-non-functional-requirements) |
| UX-HIFI-001 | High-fidelity screens for storefront, product listing/detail, cart, checkout, customer account, vendor portal, and admin console. | Mandatory | [UX-PRES-001](ACCEPTANCE-CRITERIA.md#ux-pres-001--uiux-and-design-deliverables), [SRS-PORTAL-*](#21-portal-surfaces) |
| UX-STATE-001 | Loading, empty, error, validation, success, and permission-denied states. | Mandatory | [UX-PRES-001](ACCEPTANCE-CRITERIA.md#ux-pres-001--uiux-and-design-deliverables), [FR-DISC-007](#34-storefront-search--product-discovery) |
| UX-REVIEW-001 | Usability review and sign-off before implementation of major flows. | Mandatory | [UX-PRES-001](ACCEPTANCE-CRITERIA.md#ux-pres-001--uiux-and-design-deliverables), [PHASE-000](#11-development-phases-and-mvp-baseline), [LAUNCH-013](#11-development-phases-and-mvp-baseline) |

---

## 15. Project deliverables

PDF §15 and its page-12 continuation require the following project deliverables. Optional mobile applications remain “as agreed”; no scope decision is implied.

| ID | Deliverable requirement | Status | Cross-reference |
|---|---|---|---|
| DEL-SPEC-001 | Business requirements and functional specification. | Mandatory | [SRS-OV-007](#1-project-overview), [DEL-REQ-001](ACCEPTANCE-CRITERIA.md#5-project-deliverable-acceptance) |
| DEL-ROLES-001 | User roles, permissions matrix, and process flows. | Mandatory | [SRS-ROLE-*](#2-user-roles-and-portals), [SRS-PORTAL-*](#21-portal-surfaces) |
| DEL-DESIGN-001 | Information architecture, wireframes, Figma UI kit, and final designs. | Mandatory | [UX-*](#14-uiux-and-design-deliverables), [DEL-UX-001](ACCEPTANCE-CRITERIA.md#5-project-deliverable-acceptance) |
| DEL-ARCH-001 | System architecture diagram and architecture decision records. | Mandatory | [ARC-*](#7-architecture-summary), [DEL-DESIGN-001](ACCEPTANCE-CRITERIA.md#5-project-deliverable-acceptance) |
| DEL-DATA-001 | Database ERD, schema, and migration scripts. | Mandatory | [DB-*](#81-data-requirements), [DATABASE-ERD.md](../architecture/DATABASE-ERD.md) |
| DEL-CODE-001 | Backend source code, frontend source code, and API documentation. | Mandatory | [TEC-001](#6-recommended-technology-stack), [TEC-004](#6-recommended-technology-stack), [API-002](#82-api-standards) |
| DEL-PORTAL-001 | Vendor, customer, and admin portals; optional mobile applications as agreed. | Mandatory; optional mobile applications as agreed | [SRS-PORTAL-*](#21-portal-surfaces), [FR-MOB-002](#319-mobile--multi-channel), [DEC-016](#12-unresolved-decisions-and-items-to-confirm) |
| DEL-INT-001 | Integration adapters and sandbox configuration for selected providers. | Mandatory | [INT-*](#83-external-integrations), [DEC-004](#12-unresolved-decisions-and-items-to-confirm), [DEC-005](#12-unresolved-decisions-and-items-to-confirm) |
| DEL-QA-001 | Automated unit, integration, API, and end-to-end test suites. | Mandatory | [QA-001](#10-testing-and-quality-assurance)–[QA-009](#10-testing-and-quality-assurance), [DEL-TEST-001](ACCEPTANCE-CRITERIA.md#5-project-deliverable-acceptance) |
| DEL-DEPLOY-001 | Deployment scripts, Docker configuration, and CI/CD pipeline. | Mandatory | [DEP-002](#11-devops-environments-and-deployment), [DEP-003](#11-devops-environments-and-deployment), [DEP-004](#11-devops-environments-and-deployment) |
| DEL-RUNBOOK-001 | Monitoring dashboards, backup/restore, and operational runbooks. | Mandatory | [DEP-008](#11-devops-environments-and-deployment), [NFR-OBS-001](#5-non-functional-requirements), [DEL-OPS-001](ACCEPTANCE-CRITERIA.md#5-project-deliverable-acceptance) |
| DEL-DOC-001 | Admin/user guides, technical documentation, and handover. | Mandatory | [LAUNCH-013](#11-development-phases-and-mvp-baseline), [DEL-OPS-001](ACCEPTANCE-CRITERIA.md#5-project-deliverable-acceptance) |
