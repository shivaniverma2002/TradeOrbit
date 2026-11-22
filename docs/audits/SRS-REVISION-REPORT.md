# SRS Revision Report — TradeOrbit E-Commerce Marketplace

**Target:** `docs/requirements/SRS.md`  
**Audit source:** `docs/audits/SRS-AUDIT-REPORT.md`  
**Authoritative source:** `docs/requirements/Task_2_Complete_Ecommerce_Marketplace_Specification.pdf`  
**Revision date:** 2026-11-22  
**Status:** Revised draft only. Not approved. Human approval is still required before the SRS is treated as approved.

---

## 1. Summary

All 15 audit corrections and the two subsequent final cross-reference corrections were implemented in `SRS.md`. No original requirement ID was deleted. No unresolved business decision was finalized. No requirement wording, status, or decision was changed by the final corrections. No application code was generated. The source PDF, downstream requirements documents, and architecture documents were not modified. Nothing was committed or pushed.

| Metric | Result |
|---|---:|
| Audit corrections implemented | 15 of 15 |
| Final cross-reference corrections implemented | 2 of 2 |
| Corrections that could not be safely made | 0 |
| Original SRS IDs preserved | 336 of 336 |
| New SRS IDs added | 38 |
| Total SRS IDs after revision | 374 |
| Duplicate SRS IDs | 0 |
| Markdown links checked | 423 |
| Link / anchor / ID-reference problems | 0 |
| PDF sections relevant to the SRS | Covered |

---

## 2. Changes with old and new wording

### AUD-001 — UI/UX deliverables added

**Location:** new SRS §14.

**Old wording:** `| §12 UI/UX & Design Deliverables | UX-* in [ACCEPTANCE-CRITERIA.md](ACCEPTANCE-CRITERIA.md) |` and no `UX-*` requirements in `SRS.md`.

**New wording:** added `## 14. UI/UX and design deliverables` with:

| ID | New requirement wording | Status |
|---|---|---|
| UX-DISC-001 | Discovery and user journeys for customer, vendor, admin, support, and fulfilment roles. | Mandatory |
| UX-IA-001 | Information architecture, sitemap, and navigation model. | Mandatory |
| UX-WIRE-001 | Wireframes for all critical screens and responsive breakpoints; numeric breakpoints remain decision-required. | Mandatory; breakpoints decision required |
| UX-DS-001 | Figma design system covering colours, typography, spacing, grids, components, form states, and accessibility rules. | Mandatory |
| UX-HIFI-001 | High-fidelity screens for storefront, product listing/detail, cart, checkout, customer account, vendor portal, and admin console. | Mandatory |
| UX-STATE-001 | Loading, empty, error, validation, success, and permission-denied states. | Mandatory |
| UX-REVIEW-001 | Usability review and sign-off before implementation of major flows. | Mandatory |

Traceability row changed to:
`| §12 UI/UX & Design Deliverables | UX-* in [SRS §14](#14-uiux-and-design-deliverables) and [ACCEPTANCE-CRITERIA.md](ACCEPTANCE-CRITERIA.md#ux-pres-001--uiux-and-design-deliverables) |`

### AUD-002 — Project deliverables added

**Location:** new SRS §15.

**Old wording:** `| §15 Project Deliverables | DEL-* in [ACCEPTANCE-CRITERIA.md](ACCEPTANCE-CRITERIA.md) |` and no `DEL-*` requirements in `SRS.md`.

**New wording:** added `## 15. Project deliverables` with:

| ID | New requirement wording | Status |
|---|---|---|
| DEL-SPEC-001 | Business requirements and functional specification. | Mandatory |
| DEL-ROLES-001 | User roles, permissions matrix, and process flows. | Mandatory |
| DEL-DESIGN-001 | Information architecture, wireframes, Figma UI kit, and final designs. | Mandatory |
| DEL-ARCH-001 | System architecture diagram and architecture decision records. | Mandatory |
| DEL-DATA-001 | Database ERD, schema, and migration scripts. | Mandatory |
| DEL-CODE-001 | Backend source code, frontend source code, and API documentation. | Mandatory |
| DEL-PORTAL-001 | Vendor, customer, and admin portals; optional mobile applications as agreed. | Mandatory; optional mobile applications as agreed |
| DEL-INT-001 | Integration adapters and sandbox configuration for selected providers. | Mandatory |
| DEL-QA-001 | Automated unit, integration, API, and end-to-end test suites. | Mandatory |
| DEL-DEPLOY-001 | Deployment scripts, Docker configuration, and CI/CD pipeline. | Mandatory |
| DEL-RUNBOOK-001 | Monitoring dashboards, backup/restore, and operational runbooks. | Mandatory |
| DEL-DOC-001 | Admin/user guides, technical documentation, and handover. | Mandatory |

Traceability row changed to:
`| §15 Project Deliverables | DEL-* in [SRS §15](#15-project-deliverables) and [ACCEPTANCE-CRITERIA.md](ACCEPTANCE-CRITERIA.md#5-project-deliverable-acceptance) |`

### AUD-003 — Database entity/example table coverage added

**Location:** SRS §8.1.1.

**Old wording:** `DB-001 Use PostgreSQL as system of record`, `DB-002 Model entities with primary keys, foreign keys, indexes, timestamps, status history and appropriate uniqueness constraints`, followed by integrity rules only.

**New wording:** added the subsection `#### 8.1.1 Data entity and example table coverage` and 12 `DB-ENT-*` rows:

| ID | Domain | New example entities / tables | Status |
|---|---|---|---|
| DB-ENT-001 | Identity & access | `users`, `roles`, `permissions`, `user_roles`, `sessions`, `addresses`, `verification_tokens`, `consent_records` | Mandatory coverage |
| DB-ENT-002 | Vendors | `vendors`, `vendor_users`, `vendor_documents`, `vendor_bank_accounts` (protected/tokenized references), `vendor_stores`, `vendor_status_history` | Mandatory coverage |
| DB-ENT-003 | Catalogue | `products`, `product_variants`, `categories`, `brands`, `attributes`, `attribute_values`, `product_media`, `product_categories`, `product_approvals` | Mandatory coverage |
| DB-ENT-004 | Commercial | `price_lists`, `product_prices`, `tax_rules`, `coupons`, `promotions`, `promotion_rules`, `gift_cards` (if enabled) | Mandatory coverage; gift cards conditional |
| DB-ENT-005 | Customer activity | `wishlists`, `wishlist_items`, `carts`, `cart_items`, `recently_viewed`, `reviews`, `review_media` | Mandatory coverage |
| DB-ENT-006 | Inventory | `warehouses`, `inventory_items`, `stock_movements`, `stock_reservations`, `suppliers`, `purchase_orders` (if enabled) | Mandatory coverage; supplier/purchase-order entities conditional |
| DB-ENT-007 | Orders | `orders`, `order_items`, `vendor_orders`, `order_status_history`, `invoices`, `shipments`, `shipment_events` | Mandatory coverage |
| DB-ENT-008 | Payments & finance | `payment_intents`, `payment_transactions`, `refunds`, `commissions`, `ledger_entries`, `settlements`, `payouts`, `reconciliation_records` | Mandatory coverage |
| DB-ENT-009 | Returns | `return_requests`, `return_items`, `return_events`, `inspections`, `exchange_orders` | Mandatory coverage |
| DB-ENT-010 | Support | `support_tickets`, `ticket_messages`, `ticket_assignments`, `disputes`, `faq_articles` | Mandatory coverage |
| DB-ENT-011 | Marketing | `campaigns`, `notifications`, `notification_templates`, `referral_codes`, `loyalty_accounts`, `loyalty_transactions` | Mandatory coverage |
| DB-ENT-012 | Governance | `audit_logs`, `admin_actions`, `webhook_events`, `feature_flags`, `system_settings` | Mandatory coverage |

Traceability row changed from `| §6 Database & Data Model Requirements | DB-* |` to `| §6 Database & Data Model Requirements | DB-*, DB-ENT-* |`.

### AUD-004 — Edge and Operations architecture layers added

**Location:** SRS §7.

**Old wording:** table ended at `ARC-008 Async processing: background queues for emails, webhooks, invoice generation, search indexing, exports, scheduled tasks.`

**New wording:**

- `ARC-009 | Edge layer: DNS, CDN, WAF, TLS termination, rate limiting. | Recommendation | [SEC-*](#9-security-and-privacy-checklist), [TEC-012](#6-recommended-technology-stack), [API-*](#8-data-api-and-integration-summary)`
- `ARC-010 | Operations layer: CI/CD, monitoring, logging, backups, security scanning. | Recommendation | [DEP-*](#11-devops-environments-and-deployment), [NFR-OBS-001](#5-non-functional-requirements)`

### AUD-005 — External integration selection notes restored

**Location:** SRS §8.3.

**Old table columns:** `ID | Integration | Purpose | Status | Cross-reference`

**New table columns:** `ID | Integration | Purpose | Selection notes / constraints | Status | Cross-reference`

| ID | Old selection-note state | New selection notes / constraints |
|---|---|---|
| INT-PAY | No selection notes column; purpose truncated to `Collect payments, verify status, refunds, marketplace payouts where available.` | `Select provider based on operating country, UPI/cards/net banking/COD needs, marketplace split-settlement support, fees and compliance.` Purpose also restored to `Collect payments, verify status, process refunds and support marketplace payouts where available.` |
| INT-SHIP | No selection notes column. | `Compare direct carrier APIs with a shipping aggregator; validate service coverage and webhook quality.` |
| INT-EMAIL | No selection notes column. | `Use templates, bounce handling, suppression and delivery logs.` |
| INT-SMS | No selection notes column. | `Use approved providers and follow consent/template rules.` |
| INT-TAX | No selection notes column. | `Confirm applicable jurisdictional rules with a qualified tax professional.` |
| INT-MAPS | No selection notes column. | `Use only where it materially improves checkout or fulfilment.` |
| INT-ANALYTICS | No selection notes column. | `Define consent, event taxonomy and data retention.` |
| INT-ERP | No selection notes column. | `Integrate after core marketplace data model and ownership are established.` |

No provider, tax, COD, settlement, or shipping-model decision was made.

### AUD-006 — Personalization separated from advanced AI recommendations

**Location:** SRS §3.13.

**Old wording:** `FR-MKT-005 | Personalized product recommendations and merchandising rules. | Conditional; advanced recommendations listed for later phase | [PHASE-008](...)`

**New wording:**

- `FR-MKT-005 | Personalized product recommendations and merchandising rules. | Mandatory | [PHASE-008](...)`
- `FR-MKT-008 | Advanced or AI recommendations can follow in a later phase unless mandatory from day one. | Conditional; decision required | [DEC-016], [DEC-024], [PHASE-008]`

### AUD-007 — Draft status clarified

**Location:** SRS header.

**Old wording:**
- `**Document status:** Derived documentation for planning and estimation; the PDF remains authoritative.`
- `**Version:** 1.0 baseline`

**New wording:**
- `**Document status:** Draft derived SRS for planning and estimation; the PDF remains authoritative. Not approved; pending human approval and resolution of DEC-001–DEC-024.`
- `**Version:** 1.0 derived SRS version; requirements remain a draft planning baseline pending DEC-001–DEC-024.`

### AUD-008 — Roles separated from portals, channels, and workspaces

**Location:** SRS §2, SRS-OBJ-002, traceability index.

**Old wording:** `SRS-ROLE-011 Customer storefront`, `SRS-ROLE-012 Vendor portal`, `SRS-ROLE-013 Admin console / admin portal`, `SRS-ROLE-014 Customer, vendor, delivery mobile apps`, `SRS-ROLE-015 Support, warehouse, delivery, finance workspaces`.

**New wording:**
- Original `SRS-ROLE-011`–`SRS-ROLE-015` retained as legacy pointers with the same content plus pointer text.
- Added `SRS-PORTAL-001 Customer storefront`, `SRS-PORTAL-002 Vendor portal`, `SRS-PORTAL-003 Admin console / admin portal`.
- Added `SRS-CHANNEL-001 Customer, vendor, delivery mobile apps | Optional apps using React Native. | Conditional`.
- Workspace question remains only under `DEC-011`.
- `SRS-ROLE-014` cross-reference changed from `[TEC-015](#6-recommended-technology-stack)` to `[TEC-013](#6-recommended-technology-stack)`; verification showed `TEC-013` is the React Native / Expo mobile row and `TEC-015` is code quality.
- `SRS-OBJ-002` cross-reference changed from `[ROLE-*](#2-user-roles-and-portals)` to `[SRS-ROLE-*](#2-user-roles-and-portals), [SRS-PORTAL-*](#21-portal-surfaces)`.
- Traceability row changed from `| §2 User Roles & Portals | SRS-ROLE-* |` to `| §2 User Roles & Portals | SRS-ROLE-*, SRS-PORTAL-*, SRS-CHANNEL-*, DEC-011 |`.

### AUD-009 — Checkout reservation reference corrected

**Location:** SRS §3.6 `FR-CHK-006`.

**Old wording:** `[BR-INV-006](BUSINESS-RULES.md), [AC-005](ACCEPTANCE-CRITERIA.md)`

**New wording:** `[BR-CHK-006](BUSINESS-RULES.md), [BR-INV-005](BUSINESS-RULES.md), [AC-005](ACCEPTANCE-CRITERIA.md)`

Verified in `BUSINESS-RULES.md`: `BR-CHK-006` is the checkout reservation expiry rule and `BR-INV-005` is inventory reservation/release.

### AUD-010 — Wallet/store-credit ledger reference corrected

**Location:** SRS §3.3 `FR-CUS-006`.

**Old wording:** `[BR-FIN-006](BUSINESS-RULES.md)`

**New wording:** `[BR-FIN-002](BUSINESS-RULES.md), [DEC-016](#12-unresolved-decisions-and-items-to-confirm)`

Verified in `BUSINESS-RULES.md`: `BR-FIN-002` is immutable financial ledger accounting; `BR-FIN-006` is commission/settlement/payout reconciliation.

### AUD-011 — Commission configuration references corrected

**Location:** SRS §3.2 `FR-VEN-008`; SRS §3.12 `FR-ADM-004`.

**Old wording (both rows):** `[BR-FIN-008](BUSINESS-RULES.md)`

**New wording (both rows):** `[BR-VEN-008](BUSINESS-RULES.md), [DEC-006](#12-unresolved-decisions-and-items-to-confirm)`

Verified in `BUSINESS-RULES.md`: `BR-VEN-008` is commission plans; `BR-FIN-008` is conditional COD remittance/reconciliation.

### AUD-012 — Proof-of-delivery reference corrected

**Location:** SRS §3.9 `FR-ORD-009`.

**Old wording:** `[DEC-004](#12-unresolved-decisions-and-items-to-confirm)`

**New wording:** `[INT-SHIP](../architecture/SYSTEM-ARCHITECTURE.md), [DEC-005](#12-unresolved-decisions-and-items-to-confirm)`

Verified in `SYSTEM-ARCHITECTURE.md`: `INT-SHIP` exists as the courier/logistics integration. The word `where supported` was preserved.

### AUD-013 — Performance test cross-reference corrected

**Location:** SRS §5 `NFR-SCAL-002`.

**Old wording:** `[QA-007](../architecture/PERFORMANCE-STRATEGY.md)`

**New wording:** `[QA-007](#10-testing-and-quality-assurance), [AC-QA-005](ACCEPTANCE-CRITERIA.md#3-qa-acceptance-criteria)`

Verified: `QA-007` is defined in SRS §10; `AC-QA-005` is defined in `ACCEPTANCE-CRITERIA.md` §3. `QA-007` is not defined in `PERFORMANCE-STRATEGY.md`.

### AUD-014 — Security test cross-reference corrected

**Location:** SRS §9 `SEC-012`.

**Old wording:** `[QA-006](ACCEPTANCE-CRITERIA.md)`

**New wording:** `[AC-QA-006](ACCEPTANCE-CRITERIA.md#3-qa-acceptance-criteria), [QA-006](#10-testing-and-quality-assurance)`

Verified: `ACCEPTANCE-CRITERIA.md` defines `AC-QA-006`, not `QA-006`; `QA-006` is defined in SRS §10.

### AUD-015 — DEC-016 and DEC-024 reconciled without deciding

**Location:** SRS §12.

**Old wording:**
- `DEC-016 | Which optional/conditional features are launch requirements: mobile apps, B2B, multi-warehouse, loyalty, affiliate, advanced recommendations, subscriptions, gift cards, store credit, social sign-in, social commerce, additional channels. | Decision required | Scope and phasing.`
- `DEC-024 | Whether native apps, B2B procurement, multi-region, loyalty, affiliate, and AI recommendations are mandatory from day one. | Decision required | MVP baseline confirmation.`

**New wording:**
- `DEC-016 | Which optional/conditional features from PDF §16 are launch requirements: mobile apps, B2B, multi-warehouse, loyalty, affiliate, advanced/AI recommendations, subscriptions, gift cards, store credit, social sign-in, social commerce, additional channels. | Decision required | Scope and phasing.`
- `DEC-024 | Day-one-mandatory subset of DEC-016: whether native apps, B2B procurement, multi-region capability, loyalty, affiliate, and advanced/AI recommendations are mandatory from day one. This does not supersede DEC-016; multi-region from PDF §17 remains distinct from multi-warehouse in DEC-016, and no answer is assumed. | Decision required; subordinate to DEC-016 | MVP baseline confirmation.`

Related change:
- `MVP-006` changed `AI recommendations, native mobile apps, B2B procurement, multi-region can follow` to `advanced/AI recommendations, native mobile apps, B2B procurement, and multi-region can follow`, and added `[DEC-024](...)` to the cross-reference.

### Additional consistency change

**Location:** SRS §6 `TEC-021`.

**Old wording:** `Recommendation and mandatory deliverable in §12/15`

**New wording:** `Recommendation and mandatory deliverable in §14/§15`

This was required because the existing SRS §12 is the decision register; adding UX and deliverable sections as §14 and §15 preserves all existing section anchors used by downstream documents.

### Final corrections — cross-reference scope only

**Location:** SRS §3.20 `FR-OPS-003`.

**Old wording:** `| FR-OPS-003 | Automated database backups, point-in-time recovery where supported, and restore drills. | Conditional for PITR | [DEP-006](#11-devops-environments-and-deployment) |`

**New wording:** `| FR-OPS-003 | Automated database backups, point-in-time recovery where supported, and restore drills. | Conditional for PITR | [DEP-005](#11-devops-environments-and-deployment) |`

**Location:** SRS §3.18 `FR-COMP-008`.

**Old wording:** `| FR-COMP-008 | Dependency scanning, vulnerability management, backup testing, and incident response. | Mandatory | [DEP-005](#11-devops-environments-and-deployment) |`

**New wording:** `| FR-COMP-008 | Dependency scanning, vulnerability management, backup testing, and incident response. | Mandatory | [DEP-003](#11-devops-environments-and-deployment), [QA-006](#10-testing-and-quality-assurance), [DEP-005](#11-devops-environments-and-deployment), [DEP-008](#11-devops-environments-and-deployment) |`

Only the cross-reference cells changed. Requirement wording, IDs, statuses, decisions, and all other rows were unchanged.

---

## 3. Corrections that could not be safely made

None of the 15 audit corrections or the two subsequent final cross-reference corrections were blocked.

The following adjacent changes were intentionally **not** made:

1. Downstream documents were not edited to reflect the new SRS classifications or IDs. The task restricts changes to `SRS.md` and this revision report.
2. Existing SRS §12 and §13 were not renumbered to the audit report's example `§12 UI/UX` and `§13 Project Deliverables`. Renumbering would break existing anchors such as `#12-unresolved-decisions-and-items-to-confirm` in `SRS.md`, `ACCEPTANCE-CRITERIA.md`, `BUSINESS-RULES.md`, `USER-STORIES.md`, and architecture documents. New sections were added as §14 and §15 instead.
3. No answer was chosen for `DEC-001`–`DEC-024`, including `DEC-010` (MFA optional in PDF §3.18 vs MFA for privileged users in PDF §9). The distinction remains unresolved.
4. No payment, shipping, tax, COD, settlement, marketplace model, launch scope, or RPO/RTO value was selected or invented.

---

## 4. Validation results

Validation was run after all edits.

| Check | Result |
|---|---|
| All SRS IDs unique | Pass — 374 IDs, 0 duplicates |
| Markdown file targets | Pass — all 423 links resolve to existing files or the current document |
| Markdown section anchors | Pass — all in-document and cross-document anchors resolve |
| Exact ID references in link labels | Pass — all checked IDs exist in their target documents |
| Final corrected rows verified | Pass — `FR-OPS-003` cross-references `DEP-005`; `FR-COMP-008` cross-references `DEP-003`, `QA-006`, `DEP-005`, and `DEP-008`; requirement wording, IDs, and statuses unchanged |
| Final corrected-link target IDs verified | Pass — `QA-006` is defined in SRS §10; `DEP-003`, `DEP-005`, and `DEP-008` are defined in SRS §11; `DEP-006` is confirmed to be the media/CDN row and no longer referenced by `FR-OPS-003` |
| Referenced ID verification before correction | Pass — `BR-CHK-006`, `BR-INV-005`, `BR-FIN-002`, `BR-VEN-008`, `QA-007`, `AC-QA-005`, `AC-QA-006`, and `INT-SHIP` were checked in their respective target files before edits |
| Unresolved decisions preserved | Pass — `DEC-001`–`DEC-024` remain decision-required |
| MFA ambiguity preserved | Pass — `DEC-010` still records the §3.18 / §9 inconsistency |
| Source PDF modified | No |
| Application code generated | No |
| Commit / push performed | No |

---

## 5. PDF section coverage confirmation

| PDF section | SRS coverage | Status |
|---|---|---|
| Cover / §1 Product definition and objectives | §1 `SRS-OV-*`, `SRS-OBJ-*` | Covered |
| §2 User Roles & Portals | §2 `SRS-ROLE-001`–`SRS-ROLE-015`, `SRS-PORTAL-001`–`SRS-PORTAL-003`, `SRS-CHANNEL-001`, `DEC-011` | Covered |
| §3 Complete Functional Scope | §3 `FR-CAT-001`–`FR-OPS-006`, including new `FR-MKT-008` | Covered |
| §4 Recommended Technology Stack | §6 `TEC-001`–`TEC-022` | Covered |
| §5 Architecture & Application Design | §7 `ARC-001`–`ARC-010` | Covered |
| §6 Database & Data Model Requirements | §8.1 `DB-001`–`DB-010`, §8.1.1 `DB-ENT-001`–`DB-ENT-012` | Covered |
| §7.1 API Standards | §8.2 `API-001`–`API-007` | Covered |
| §7.2 External Integrations | §8.3 `INT-PAY`, `INT-SHIP`, `INT-EMAIL`, `INT-SMS`, `INT-TAX`, `INT-MAPS`, `INT-ANALYTICS`, `INT-ERP` with selection notes | Covered |
| §8 Non-Functional Requirements | §5 `NFR-*` | Covered |
| §9 Security & Compliance Checklist | §9 `SEC-001`–`SEC-012` | Covered |
| §10 Testing & QA | §10 `QA-001`–`QA-009` | Covered |
| §11 DevOps, Environments & Deployment | §11 `DEP-001`–`DEP-008` | Covered |
| §12 UI/UX & Design Deliverables | §14 `UX-*` | Covered |
| §13 Key User Journeys & Acceptance Criteria | §4 `AC-JOURNEY-001`–`AC-JOURNEY-009` | Covered |
| §14 Suggested Delivery Phases | §11.1 `PHASE-000`–`PHASE-008` | Covered |
| §15 Project Deliverables | §15 `DEL-*` | Covered |
| §16 Assumptions, Decisions & Items to Confirm | §12 `DEC-001`–`DEC-024` | Covered |
| §17 Recommended Baseline Scope | §11.2 `MVP-001`–`MVP-006` | Covered |
| Appendix A Minimum Launch Checklist | §11.3 `LAUNCH-001`–`LAUNCH-013` | Covered |

---

## 6. Approval status

**NOT APPROVED — waiting for human approval.**

The revised SRS is ready for re-audit, but it must not be treated as an approved requirements baseline until a human explicitly approves it and the unresolved decisions are handled through the appropriate decision process.

## 7. Current status addendum

This report is a historical revision snapshot. G1–G8 were later approved and are recorded in [SRS §12A](../requirements/SRS.md#12a-approved-g1g8-decisions). Later corrections are recorded in `COMPLETE-PROJECT-AUDIT.md`.
