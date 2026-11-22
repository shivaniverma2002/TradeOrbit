# SRS Audit Report — TradeOrbit E-Commerce Marketplace

**Audit target:** `docs/requirements/SRS.md`  
**Authoritative source:** `docs/requirements/Task_2_Complete_Ecommerce_Marketplace_Specification.pdf`  
**Audit date:** 2026-11-22  
**Audit scope:** Requirement coverage, accuracy, traceability, quality, technical accuracy, unresolved decisions, cross-document ID/file existence, and security/data-integrity preservation.  
**Strict-rule compliance:** `SRS.md` and the source PDF were not modified. No application code was generated, no dependencies were installed, no destructive commands were run, and nothing was committed or pushed.

---

## 1. Executive Summary

The SRS provides broad and mostly accurate coverage of the original PDF. All 20 functional modules from PDF §3, all 10 named user roles from PDF §2, the nine key journeys, the recommended technology stack, non-functional requirements, security checklist, testing scope, DevOps requirements, suggested phases, MVP baseline, and launch checklist are represented in some form. The SRS also preserves the source PDF's non-implementation warning and does not invent numeric performance, tax, commission, settlement, or RPO/RTO values.

The SRS is **not approved as-is**. The audit found 15 issues:

- **Critical:** 0
- **High:** 8
- **Medium:** 7
- **Low:** 0

The most important gaps are that the SRS does not contain explicit requirement tables for PDF §12 UI/UX & Design Deliverables or PDF §15 Project Deliverables; it only points to those deliverables through `ACCEPTANCE-CRITERIA.md`. It also omits the PDF §6 data entity/example table coverage and several §7.2 integration selection notes. Six semantic cross-references are wrong or broken even though all Markdown file paths and anchors currently resolve. One status is over-conditional (`FR-MKT-005`), one unresolved decision is duplicated/partly inconsistent (`DEC-016` / `DEC-024`), and some role/portal/channel IDs are conflated.

Final status: **needs modifications; not ready for approval until the required corrections below are applied and re-audited.**

---

## 2. Overall SRS Quality Assessment

| Area | Assessment |
|---|---|
| Functional module coverage | Strong. All PDF §3.1–§3.20 modules are represented by `FR-*` tables. |
| User role coverage | Strong for the 10 PDF roles. However, SRS `SRS-ROLE-011`–`SRS-ROLE-015` mix roles, portals, channels, and unresolved workspace decisions under role IDs. |
| Conditional wording | Mostly preserved (“where applicable”, “if enabled”, “if supported”, “optional”, “subject to policy”, “where supported”). Main exception: `FR-MKT-005` is marked conditional more broadly than the PDF warrants. |
| Recommendations vs requirements | Mostly well separated. The technology stack and architecture are consistently marked as recommendations. `FR-MKT-005` is a notable exception. |
| Assumptions | No numeric business or technical targets were invented. `DEC-019`, `DEC-020`, `DEC-021`, `DEC-022`, and `DEC-023` are derived decision items and are explicitly marked as not specified/needing confirmation. |
| Presented as implemented | No. SRS-OV-007 preserves the PDF's warning that listed features are scope requirements, not implementation claims. |
| IDs | 336 IDs are defined in `SRS.md`; all are unique within the SRS. |
| Markdown links | All internal Markdown file links and section anchors resolve. |
| Semantic ID references | Not clean. Several link texts point to IDs that exist but refer to the wrong requirement, and two link texts point to IDs not defined in the target file. |
| Security/data integrity | Strong coverage of authentication, RBAC, least privilege, tokenization, validation, upload security, webhook verification/replay protection, audit trails, backup encryption/restoration, privacy, and retention. |
| Technical accuracy | Strong overall. Gaps exist in architecture flow completeness, data entity coverage, and integration selection notes. |
| Unresolved decisions | Strong overall. All PDF §16 decisions are represented, but `DEC-016` and `DEC-024` overlap and must be reconciled without resolving the business decision. |

---

## 3. Requirements Coverage Matrix

### 3.1 Functional module coverage — PDF §3

| PDF section | PDF page | Original module | SRS section / IDs | Coverage verdict | Notes |
|---|---:|---|---|---|---|
| §3.1 | 2–3 | Product Catalogue & Product Listing | §3.1 `FR-CAT-001`–`FR-CAT-010` | Covered | Conditional product types preserved in `FR-CAT-010`. |
| §3.2 | 3 | Vendor / Seller Management | §3.2 `FR-VEN-001`–`FR-VEN-012` | Covered | One wrong semantic cross-reference in `FR-VEN-008` (AUD-011). |
| §3.3 | 3 | Customer Accounts & CRM | §3.3 `FR-CUS-001`–`FR-CUS-008` | Covered | One wrong semantic cross-reference in `FR-CUS-006` (AUD-010). |
| §3.4 | 3 | Storefront, Search & Product Discovery | §3.4 `FR-DISC-001`–`FR-DISC-007` | Covered | Typo tolerance/synonyms/relevance are mandatory in PDF; SRF search quality targets remain decision-required. |
| §3.5 | 3 | Pricing, Tax & Promotions | §3.5 `FR-PRICE-001`–`FR-PRICE-007` | Covered | “If supported” preserved in `FR-PRICE-005`. |
| §3.6 | 3–4 | Cart, Checkout & Order Placement | §3.6 `FR-CHK-001`–`FR-CHK-008` | Covered | Wrong semantic cross-reference in `FR-CHK-006` (AUD-009). |
| §3.7 | 4 | Payments, Refunds & Finance | §3.7 `FR-PAY-001`–`FR-PAY-009` | Covered | Hosted/tokenized flow, COD condition, ledger, commissions, tax documents, and exports present. |
| §3.8 | 4 | Inventory, Procurement & Warehouse | §3.8 `FR-INV-001`–`FR-INV-009` | Covered | Conditional qualifiers preserved. Data entity detail is missing at SRS §8.1 (AUD-003). |
| §3.9 | 4 | Order Management & Fulfilment | §3.9 `FR-ORD-001`–`FR-ORD-009` | Covered | Wrong decision cross-reference in `FR-ORD-009` (AUD-012). |
| §3.10 | 4 | Shipping & Logistics | §3.10 `FR-SHIP-001`–`FR-SHIP-007` | Covered | Provider-model decision preserved; integration selection notes missing at §8.3 (AUD-005). |
| §3.11 | 4–5 | Returns, Exchanges & Refunds | §3.11 `FR-RET-001`–`FR-RET-008` | Covered | Policy values remain decision-required. |
| §3.12 | 5 | Admin Console & Platform Configuration | §3.12 `FR-ADM-001`–`FR-ADM-007` | Covered | One wrong semantic cross-reference in `FR-ADM-004` (AUD-011). |
| §3.13 | 5 | Marketing, Loyalty & Engagement | §3.13 `FR-MKT-001`–`FR-MKT-007` | Partial | `FR-MKT-005` status is over-conditional (AUD-006). |
| §3.14 | 5 | Reviews, Ratings & Moderation | §3.14 `FR-REV-001`–`FR-REV-005` | Covered | “Optional media” and “where permitted” preserved. |
| §3.15 | 5 | Customer Support & Disputes | §3.15 `FR-SUP-001`–`FR-SUP-006` | Covered | “If selected” preserved for live chat/chatbot. |
| §3.16 | 5 | Content Management & SEO | §3.16 `FR-CMS-001`–`FR-CMS-005` | Covered | “If required” preserved for blog/editorial content. |
| §3.17 | 5–6 | Reports & Business Intelligence | §3.17 `FR-BI-001`–`FR-BI-007` | Covered | All report categories present. |
| §3.18 | 6 | Security, Privacy & Compliance | §3.18 `FR-COMP-001`–`FR-COMP-008`; §9 `SEC-001`–`SEC-012` | Covered | MFA inconsistency preserved in `DEC-010`. |
| §3.19 | 6 | Mobile & Multi-Channel | §3.19 `FR-MOB-001`–`FR-MOB-005` | Covered | Optional mobile/B2B/social commerce qualifiers preserved. |
| §3.20 | 6 | Platform Operations & Reliability | §3.20 `FR-OPS-001`–`FR-OPS-006` | Covered | RPO/RTO remains decision-required. |

### 3.2 Other source sections

| PDF section | PDF page | Area | SRS coverage | Coverage verdict | Notes |
|---|---:|---|---|---|---|
| Cover / §1 | 1–2 | Product definition and objectives | §1 `SRS-OV-*`, `SRS-OBJ-*` | Covered | Version wording needs clarification (AUD-007). |
| §2 | 2 | 10 user roles and portals | §2 `SRS-ROLE-001`–`SRS-ROLE-015` | Partial | Ten PDF roles present; portal/channel/workspace entries need separate ID families (AUD-008). |
| §4 | 6–7 | Recommended technology stack | §6 `TEC-001`–`TEC-022` | Covered | All rows represented and marked as recommendations. |
| §5 | 7 | Architecture & application design | §7 `ARC-001`–`ARC-008` | Partial | Edge and Operations layers from §5.2 are missing (AUD-004). |
| §6 | 8 | Database & data model requirements | §8.1 `DB-001`–`DB-010` | Partial | Data integrity rules covered; entity/example table domains omitted (AUD-003). |
| §7.1 | 8 | API standards | §8.2 `API-001`–`API-007` | Covered | REST, OpenAPI, pagination, auth, idempotency, webhooks, permissions present. |
| §7.2 | 9 | External integrations | §8.3 `INT-*` | Partial | Purposes covered; several selection notes omitted (AUD-005). |
| §8 | 9 | Non-functional requirements | §5 `NFR-*` | Covered | Numeric targets correctly not invented. |
| §9 | 9–10 | Security & compliance checklist | §9 `SEC-*` | Covered | No weakening found. |
| §10 | 10 | Testing & QA | §10 `QA-001`–`QA-009` | Covered | All test levels represented. |
| §11 | 10 | DevOps, environments, deployment | §11 `DEP-001`–`DEP-008` | Covered | All bullets represented. |
| §12 | 10 | UI/UX & design deliverables | §13 traceability row only | Missing | Needs explicit SRS requirements (AUD-001). |
| §13 | 10–11 | Key user journeys | §4 `AC-JOURNEY-001`–`AC-JOURNEY-009` | Covered | All nine journeys represented. |
| §14 | 11 | Suggested delivery phases | §11.1 `PHASE-000`–`PHASE-008` | Covered | Correctly marked as recommendations. |
| §15 | 11–12 | Project deliverables | §13 traceability row only | Missing | Needs explicit SRS requirements (AUD-002). |
| §16 | 12 | Assumptions, decisions, items to confirm | §12 `DEC-001`–`DEC-024` | Partial | All §16 decisions represented, but `DEC-016`/`DEC-024` conflict/overlap (AUD-015). |
| §17 | 12 | Recommended baseline scope | §11.2 `MVP-001`–`MVP-006` | Covered | Conditional advanced features preserved. |
| Appendix A | 12 | Minimum launch checklist | §11.3 `LAUNCH-001`–`LAUNCH-013` | Covered | All 13 checklist items represented. |

---

## 4. Missing Requirements

### AUD-001 — UI/UX & design deliverables are not specified in the SRS

- **SRS section and requirement ID:** §13 Traceability index, row `§12 UI/UX & Design Deliverables`; no `UX-*` requirements defined in `SRS.md`.
- **Original PDF page and section:** Page 10, §12 `UI/UX & Design Deliverables`.
- **Current SRS content:** `| §12 UI/UX & Design Deliverables | UX-* in [ACCEPTANCE-CRITERIA.md](ACCEPTANCE-CRITERIA.md) |`
- **Problem identified:** The SRS is the canonical requirements document, but it does not itself state the PDF's UX/UI deliverable requirements. It only delegates them to `ACCEPTANCE-CRITERIA.md`. The following PDF requirements are not explicit in the SRS: discovery and user journeys for customer/vendor/admin/support/fulfilment roles; information architecture, sitemap and navigation model; wireframes for all critical screens and responsive breakpoints; Figma design system colours, typography, spacing, grids, components, form states and accessibility rules; high-fidelity screens for storefront, product listing/detail, cart, checkout, customer account, vendor portal and admin console; loading, empty, error, validation, success and permission-denied states; usability review and sign-off before implementation of major flows.
- **Exact recommended correction:** Add a dedicated SRS section, for example `## 12. UI/UX and design deliverables`, with Mandatory requirement IDs and text covering all seven PDF §12 bullets. Suggested structure: `UX-DISC-001` discovery/user journeys; `UX-IA-001` information architecture/sitemap/navigation; `UX-WIRE-001` critical-screen and responsive-breakpoint wireframes; `UX-DS-001` Figma design system contents; `UX-HIFI-001` high-fidelity screens; `UX-STATE-001` loading/empty/error/validation/success/permission-denied states; `UX-REVIEW-001` usability review and sign-off before major-flow implementation. Cross-reference `ACCEPTANCE-CRITERIA.md` from these new SRS IDs.
- **Priority:** High.

### AUD-002 — Project deliverables are not specified in the SRS

- **SRS section and requirement ID:** §13 Traceability index, row `§15 Project Deliverables`; no `DEL-*` requirements defined in `SRS.md`.
- **Original PDF page and section:** Pages 11–12, §15 `Project Deliverables`.
- **Current SRS content:** `| §15 Project Deliverables | DEL-* in [ACCEPTANCE-CRITERIA.md](ACCEPTANCE-CRITERIA.md) |`
- **Problem identified:** The SRS omits explicit project deliverable requirements. A downstream acceptance document is not a substitute for SRS coverage. The PDF lists 11 deliverable groups, including source code, API documentation, portals, optional apps “as agreed”, integration adapters and sandbox configuration, automated test suites, deployment scripts/Docker/CI/CD, monitoring dashboards, backup/restore and runbooks, and admin/user/technical/handover documentation.
- **Exact recommended correction:** Add a dedicated SRS section, for example `## 13. Project deliverables`, with Mandatory `DEL-*` requirements covering every PDF §15 and page-12 continuation bullet, preserving “optional mobile applications as agreed”. Update the traceability index to point to the new SRS section rather than only to `ACCEPTANCE-CRITERIA.md`.
- **Priority:** High.

### AUD-003 — Database entity/example table coverage is omitted

- **SRS section and requirement ID:** §8.1 `DB-001`–`DB-010`.
- **Original PDF page and section:** Page 8, §6 `Database & Data Model Requirements`.
- **Current SRS content:** `DB-001 Use PostgreSQL as system of record`, `DB-002 Model entities with primary keys, foreign keys, indexes, timestamps, status history and appropriate uniqueness constraints`, followed by integrity rules only.
- **Problem identified:** The PDF gives explicit domain coverage and example tables. The SRS generic data requirements do not enumerate these domains or preserve qualifiers such as `gift_cards (if enabled)`, `suppliers, purchase_orders (if enabled)`, and protected/tokenized vendor bank references. This weakens traceability for database design and could allow necessary entities to be missed.
- **Exact recommended correction:** Add an SRS data model coverage table under §8.1 listing the PDF §6 domains and example entities: Identity & access; Vendors; Catalogue; Commercial; Customer activity; Inventory; Orders; Payments & finance; Returns; Support; Marketing; Governance. Preserve protected/tokenized bank-account references and all `if enabled` qualifiers. Cross-reference `DATABASE-ERD.md` and the relevant `FR-*` sections.
- **Priority:** High.

### AUD-004 — Architecture flow omits Edge and Operations layers

- **SRS section and requirement ID:** §7 `ARC-001`–`ARC-008`.
- **Original PDF page and section:** Page 7, §5.2 `High-level architecture flow`.
- **Current SRS content:** `ARC-001`–`ARC-008` cover modular monolith, presentation, API/application, domain modules, data, integration, and async processing.
- **Problem identified:** The PDF §5.2 flow explicitly includes two layers not represented in the SRS architecture table: `Edge: DNS | CDN | WAF | TLS termination | Rate limiting` and `Operations: CI/CD | Monitoring | Logging | Backups | Security scanning`.
- **Exact recommended correction:** Add `ARC-009` for the Edge layer with the exact components `DNS, CDN, WAF, TLS termination, rate limiting`, status `Recommendation`, cross-referencing `SEC-*`, `TEC-012`, and `API-*`. Add `ARC-010` for the Operations layer with `CI/CD, monitoring, logging, backups, security scanning`, status `Recommendation`, cross-referencing `DEP-*` and `NFR-OBS-001`.
- **Priority:** Medium.

### AUD-005 — External integration selection notes are shortened or omitted

- **SRS section and requirement ID:** §8.3 `INT-PAY`, `INT-SHIP`, `INT-EMAIL`, `INT-SMS`, `INT-TAX`, `INT-MAPS`, `INT-ANALYTICS`, `INT-ERP`.
- **Original PDF page and section:** Page 9, §7.2 `External integrations`.
- **Current SRS content:** Integration rows contain purpose/status summaries, for example `INT-PAY | Payment gateway | Collect payments, verify status, refunds, marketplace payouts where available. | Mandatory capability; provider decision required`.
- **Problem identified:** The PDF includes selection notes that are not all carried into the SRS. Missing or shortened notes include payment provider selection by operating country, UPI/cards/net banking/COD needs, split-settlement support, fees and compliance; shipping comparison of direct carrier APIs with aggregators and validation of service coverage/webhook quality; email templates, bounce handling, suppression and delivery logs; approved SMS/WhatsApp providers and consent/template rules; tax rules confirmed with a qualified tax professional; maps only where materially improving checkout or fulfilment.
- **Exact recommended correction:** Add a `Selection notes / constraints` column or expand each `INT-*` row to include the exact PDF §7.2 selection notes. Do not select providers or resolve tax, COD, settlement, or shipping model decisions.
- **Priority:** High.

---

## 5. Incorrect or Misclassified Requirements

### AUD-006 — `FR-MKT-005` is incorrectly marked conditional

- **SRS section and requirement ID:** §3.13 `FR-MKT-005`.
- **Original PDF page and section:** Page 5, §3.13 `Marketing, Loyalty & Engagement`; pages 12, §16 and §17.
- **Current SRS content:** `FR-MKT-005 | Personalized product recommendations and merchandising rules. | Conditional; advanced recommendations listed for later phase | [PHASE-008](...)`
- **Problem identified:** PDF §3.13 lists personalized product recommendations and merchandising rules as functional scope without a conditional qualifier. PDF §16/§17 only state that advanced/AI recommendations can follow in later phases unless mandatory from day one. The SRS converts the entire requirement into a conditional one, which is broader than the source.
- **Exact recommended correction:** Keep `FR-MKT-005` as `Mandatory` for “Personalized product recommendations and merchandising rules.” Add a separate conditional/decision-required requirement for “Advanced or AI recommendations” linked to `DEC-016`, `DEC-024`, and `PHASE-008`. Do not decide whether advanced/AI recommendations are launch requirements.
- **Priority:** High.

### AUD-007 — Version label may imply an approved baseline

- **SRS section and requirement ID:** Header metadata, line 6.
- **Original PDF page and section:** Page 1 cover (`Version 1.0 – Draft scope for planning and estimation`); page 12, §16.
- **Current SRS content:** `**Version:** 1.0 baseline`
- **Problem identified:** The PDF describes itself as a draft scope for planning and estimation and still has unresolved decisions. “1.0 baseline” may be read as an approved requirements baseline.
- **Exact recommended correction:** Replace with `**Version:** 1.0 derived SRS version; requirements remain a draft planning baseline pending DEC-001–DEC-024`, or equivalent wording that clearly separates SRS document version from approved requirements status.
- **Priority:** Medium.

### AUD-008 — Role IDs are conflated with portals, channels, and unresolved workspaces

- **SRS section and requirement ID:** §2 `SRS-ROLE-011`–`SRS-ROLE-015`.
- **Original PDF page and section:** Page 2, §2 `User Roles & Portals`; page 12, §16.
- **Current SRS content:** `SRS-ROLE-011 Customer storefront`, `SRS-ROLE-012 Vendor portal`, `SRS-ROLE-013 Admin console / admin portal`, `SRS-ROLE-014 Customer, vendor, delivery mobile apps`, `SRS-ROLE-015 Support, warehouse, delivery, finance workspaces`.
- **Problem identified:** PDF §2 contains 10 roles. Portals and channels are mentioned in the title and elsewhere, but they are not roles. Using `SRS-ROLE-*` IDs for portals, optional apps, and unresolved workspaces makes role coverage ambiguous and mixes a technology recommendation (`React Native`) into a role ID.
- **Exact recommended correction:** Keep `SRS-ROLE-001`–`SRS-ROLE-010` as the 10 roles. Move portal surfaces to a separate family such as `SRS-PORTAL-001`–`SRS-PORTAL-003`. Move optional mobile/additional channels to `SRS-CHANNEL-*` or `FR-MOB-*`, preserving conditional status. Keep the support/warehouse/delivery/finance workspace question only under `DEC-011`. Do not delete the content.
- **Priority:** Medium.

---

## 6. Duplicate or Conflicting Requirements

### AUD-015 — `DEC-016` and `DEC-024` duplicate and partly mismatch the same unresolved scope decision

- **SRS section and requirement ID:** §12 `DEC-016`, `DEC-024`.
- **Original PDF page and section:** Page 12, §16 `Assumptions, Decisions & Items to Confirm`; page 12, §17 `Recommended Baseline Scope`.
- **Current SRS content:**
  - `DEC-016 | Which optional/conditional features are launch requirements: mobile apps, B2B, multi-warehouse, loyalty, affiliate, advanced recommendations, subscriptions, gift cards, store credit, social sign-in, social commerce, additional channels. | Decision required`
  - `DEC-024 | Whether native apps, B2B procurement, multi-region, loyalty, affiliate, and AI recommendations are mandatory from day one. | Decision required`
- **Problem identified:** The two decisions overlap heavily. `DEC-016` includes multi-warehouse, while `DEC-024` says multi-region; PDF §16 says multi-warehouse and PDF §17 says multi-region as a separate advanced capability. “Advanced recommendations” and “AI recommendations” are also used inconsistently. Resolving one decision without the other could create contradictory scope.
- **Exact recommended correction:** Consolidate into one canonical scope decision or make `DEC-024` explicitly a day-one-mandatory subset of `DEC-016`. Preserve both PDF terms separately: `multi-warehouse` from §16 and `multi-region` from §17. Use one consistent term for recommendations, such as `advanced/AI recommendations`, and keep all items decision-required. Do not decide the answer.
- **Priority:** High.

### Additional duplicate/conflict checks

- SRS defines 336 IDs and no duplicate IDs were found within `SRS.md`.
- The MFA inconsistency between PDF §3.18 (“optional MFA”) and PDF §9 (“MFA for privileged users”) is not silently resolved; it is preserved in `DEC-010`. This is acceptable.
- No duplicate functional requirement IDs were found in the 20 module tables.

---

## 7. Broken IDs and Cross-References

### 7.1 Validation summary

- All SRS Markdown links resolve to existing files.
- All SRS Markdown section anchors resolve to existing headings.
- All 336 SRS-defined IDs are unique.
- Referenced files and referenced IDs were checked against `BUSINESS-RULES.md`, `USER-STORIES.md`, `ACCEPTANCE-CRITERIA.md`, `SYSTEM-ARCHITECTURE.md`, `DATABASE-ERD.md`, `API-DESIGN.md`, `SECURITY-ARCHITECTURE.md`, and `PERFORMANCE-STRATEGY.md`; all those files exist.
- Six semantic reference problems remain, listed below.

### AUD-009 — `FR-CHK-006` points to the wrong business rule

- **SRS section and requirement ID:** §3.6 `FR-CHK-006`.
- **Original PDF page and section:** Page 4, §3.6 `Cart, Checkout & Order Placement`; page 4, §3.8 `Inventory, Procurement & Warehouse`.
- **Current SRS content:** `[BR-INV-006](BUSINESS-RULES.md)`
- **Problem identified:** `BR-INV-006` is about purchase orders and supplier records if procurement is in scope. The checkout reservation expiry rule is `BR-CHK-006`, and inventory reservation is also covered by `BR-INV-005`.
- **Exact recommended correction:** Replace the cross-reference with `[BR-CHK-006](BUSINESS-RULES.md)` and optionally also `[BR-INV-005](BUSINESS-RULES.md)`.
- **Priority:** Medium.

### AUD-010 — `FR-CUS-006` points to the wrong finance rule

- **SRS section and requirement ID:** §3.3 `FR-CUS-006`.
- **Original PDF page and section:** Page 3, §3.3 `Customer Accounts & CRM`; page 8, §6.1 data integrity rules.
- **Current SRS content:** `[BR-FIN-006](BUSINESS-RULES.md)`
- **Problem identified:** `BR-FIN-006` covers commission deductions, settlement cycles, payout approval and reconciliation. Wallet/store credit ledger-based accounting maps to `BR-FIN-002`, which covers immutable financial ledger entries.
- **Exact recommended correction:** Replace with `[BR-FIN-002](BUSINESS-RULES.md)`. Keep `DEC-016` if wallet/store credit launch scope remains unresolved.
- **Priority:** Medium.

### AUD-011 — Commission configuration points to COD rule `BR-FIN-008`

- **SRS section and requirement ID:** §3.2 `FR-VEN-008`; §3.12 `FR-ADM-004`.
- **Original PDF page and section:** Page 3, §3.2 `Vendor / Seller Management`; page 5, §3.12 `Admin Console & Platform Configuration`; page 12, §16.
- **Current SRS content:** Both rows cross-reference `[BR-FIN-008](BUSINESS-RULES.md)`.
- **Problem identified:** `BR-FIN-008` is the COD remittance/reconciliation conditional rule. Commission plans by vendor, category, product or campaign are `BR-VEN-008`; commission values remain unresolved in `DEC-006`.
- **Exact recommended correction:** For `FR-VEN-008`, use `[BR-VEN-008](BUSINESS-RULES.md)` and `[DEC-006](SRS.md#12-unresolved-decisions-and-items-to-confirm)`. For `FR-ADM-004`, replace `BR-FIN-008` with `[BR-VEN-008](BUSINESS-RULES.md)` for commission configuration and link policy values to `DEC-006` where applicable.
- **Priority:** Medium.

### AUD-012 — `FR-ORD-009` links proof of delivery to payment decision

- **SRS section and requirement ID:** §3.9 `FR-ORD-009`.
- **Original PDF page and section:** Page 4, §3.9 `Order Management & Fulfilment`; page 12, §16.
- **Current SRS content:** `Delivery confirmation and proof-of-delivery reference where supported. | Conditional | [DEC-004](...)`
- **Problem identified:** `DEC-004` is payment provider/method/COD/settlement. Proof of delivery depends on shipping/courier capabilities and model, which are `DEC-005` and `INT-SHIP`.
- **Exact recommended correction:** Replace the cross-reference with `[INT-SHIP](../architecture/SYSTEM-ARCHITECTURE.md)` and `[DEC-005](SRS.md#12-unresolved-decisions-and-items-to-confirm)`. Keep the word “where supported”.
- **Priority:** Medium.

### AUD-013 — `NFR-SCAL-002` links `QA-007` to the wrong document

- **SRS section and requirement ID:** §5 `NFR-SCAL-002`.
- **Original PDF page and section:** Page 9, §8 `Non-Functional Requirements`.
- **Current SRS content:** `[QA-007](../architecture/PERFORMANCE-STRATEGY.md)`
- **Problem identified:** `QA-007` is defined in `SRS.md` and referenced in `ACCEPTANCE-CRITERIA.md`; it is not defined in `PERFORMANCE-STRATEGY.md`. The file link works, but the referenced ID does not exist in the target file.
- **Exact recommended correction:** Use `[QA-007](#10-testing-and-quality-assurance)` if the intent is the SRS test requirement, or `[AC-QA-005](ACCEPTANCE-CRITERIA.md#3-qa-acceptance-criteria)` if the intent is the acceptance criterion. Do not leave `QA-007` pointing to `PERFORMANCE-STRATEGY.md`.
- **Priority:** High.

### AUD-014 — `SEC-012` links to undefined `QA-006` in Acceptance Criteria

- **SRS section and requirement ID:** §9 `SEC-012`.
- **Original PDF page and section:** Page 10, §9 `Security & Compliance Checklist`.
- **Current SRS content:** `[QA-006](ACCEPTANCE-CRITERIA.md)`
- **Problem identified:** `ACCEPTANCE-CRITERIA.md` defines `AC-QA-006`, not `QA-006`. `QA-006` is an SRS test-level ID. The target ID is therefore wrong even though the file exists.
- **Exact recommended correction:** Replace with `[AC-QA-006](ACCEPTANCE-CRITERIA.md#3-qa-acceptance-criteria)` if linking to acceptance criteria, or `[QA-006](#10-testing-and-quality-assurance)` if linking to the SRS security test requirement.
- **Priority:** High.

---

## 8. Technical Accuracy Issues

### 8.1 Accurate technical content confirmed

The SRS accurately captures the following original PDF technical content:

- Modular monolith initially, with future service extraction where scale requires it.
- Recommended baseline: TypeScript, Next.js, NestJS, PostgreSQL, Redis, object storage, Docker/containers.
- Redis + BullMQ for cache/queue responsibilities; S3-compatible object storage and CDN/edge are captured as recommendations.
- Multi-vendor order splitting with one customer-facing parent order (`FR-ORD-002`, `AC-JOURNEY-004`).
- Inventory reservation with expiry and safe release (`FR-CHK-006`, `FR-INV-005`, `DB-004`).
- Payment gateway integration with hosted/tokenized flows, no raw card storage, webhook verification, idempotency, and replay protection (`FR-PAY-001`, `FR-PAY-003`, `API-006`, `SEC-007`, `SEC-008`).
- Refunds, commissions, settlements, ledger entries, immutable financial history, and compensating corrections (`FR-PAY-004`–`FR-PAY-007`, `DB-005`–`DB-007`, `BR-FIN-*` references).
- RBAC, least privilege, server-side authorization, audit logs, and permission separation (`FR-COMP-002`, `API-004`, `API-007`, `SEC-003`, `SEC-009`).
- Backup encryption, access restriction, restoration testing, monitoring, logging, alerting, and incident/runbook documentation (`SEC-010`, `DEP-007`, `DEP-008`, `NFR-OBS-001`, `NFR-REC-001`).
- Accessibility expectations, including WCAG 2.2 AA “where feasible”, keyboard navigation, semantics, contrast, and screen-reader support (`NFR-ACC-001`, `QA-008`).
- Performance expectations are kept as targets/decisions rather than invented numeric values (`NFR-PERF-001`, `DEC-020`).

### 8.2 Technical issues requiring correction

The technical gaps are already recorded as full issues above:

- Missing data entity/example table coverage: AUD-003.
- Missing Edge and Operations architecture layers: AUD-004.
- Incomplete integration selection notes: AUD-005.
- Over-conditional recommendations treatment: AUD-006.
- Incorrect technical/business-rule and decision cross-references: AUD-009 through AUD-014.

No additional technical requirement was found that invents or changes the approved technology stack.

---

## 9. Unresolved Business Decisions

The SRS §12 decision register is broadly faithful. The following table verifies PDF §16 coverage and notes the only accuracy issue.

| SRS ID | Decision summary | Source | Audit verdict |
|---|---|---|---|
| DEC-001 | Target launch country/countries, legal entity, tax/consumer/privacy requirements | PDF §16, p12 | Accurate. |
| DEC-002 | Marketplace model: open, curated/approved, hybrid | PDF §16, p12 | Accurate. |
| DEC-003 | Product types: physical only or also digital/services/subscriptions | PDF §16, p12 | Accurate. |
| DEC-004 | Payment provider(s), methods, COD policy, settlement capability | PDF §16, p12 | Accurate. |
| DEC-005 | Shipping model: aggregator, direct carriers, seller/marketplace-fulfilled, mixed | PDF §16, p12 | Accurate. |
| DEC-006 | Commission rules, settlement frequency, reserve/holdback, dispute policy | PDF §16, p12 | Accurate. |
| DEC-007 | Initial languages, currencies, tax regions, localization | PDF §16, p12 | Accurate. |
| DEC-008 | Expected vendors, SKUs, monthly orders, peak concurrent users, growth forecast | PDF §16, p12 | Accurate. |
| DEC-009 | Hosting preference, budget, team size, timeline, support model, SLOs | PDF §16, p12 | Accurate. |
| DEC-010 | MFA optional vs mandatory for privileged users | PDF §3.18/§9, p6/p9–10 | Accurate; inconsistency preserved. |
| DEC-011 | Dedicated workspaces vs admin-console subareas | PDF §2, p2 | Accurate derived decision. |
| DEC-012 | Guest checkout policy | PDF §2/§3.6, p2/p3 | Accurate derived decision. |
| DEC-013 | ORM selection | PDF §4, p6 | Accurate derived recommendation/decision. |
| DEC-014 | WebSocket vs SSE | PDF §4, p6 | Accurate derived recommendation/decision. |
| DEC-015 | Search engine threshold | PDF §4, p7 | Accurate derived recommendation/decision. |
| DEC-016 | Optional/conditional feature launch scope | PDF §16/§17, p12 | Overlaps with DEC-024; see AUD-015. |
| DEC-017 | Live chat/chatbot and blog/editorial content required? | PDF §3.15/§3.16, p5 | Accurate derived decision. |
| DEC-018 | PCI DSS responsibility boundary | PDF §3.18, p6 | Accurate derived decision. |
| DEC-019 | Load balancer/autoscaling/failover topology | PDF §8 availability, p9 | Accurate; SRS explicitly says not specified in PDF. |
| DEC-020 | Numeric performance/availability/RPO/RTO/retention/breakpoints | PDF §8, p9 | Accurate; SRS explicitly says not specified in PDF. |
| DEC-021 | Exact state machines and transitions | PDF §3.9/§3.11 and §13, p4–5/p10–11 | Accurate derived decision. |
| DEC-022 | Duplicate listing, content, tax source, commission examples, reconciliation rules | PDF §3.1/§3.5/§3.7, p2–4 | Accurate derived decision. |
| DEC-023 | Search quality targets | PDF §3.4, p3 | Accurate derived decision. |
| DEC-024 | Day-one mandatory advanced/mobile/B2B/multi-region features | PDF §16/§17, p12 | Overlaps with DEC-016 and changes multi-warehouse to multi-region; see AUD-015. |

Items requiring the user's business decision remain exactly that: the audit does not choose values, providers, markets, policies, or launch scope.

---

## 10. Recommended Corrections

| Order | Issue IDs | Exact correction required | Priority |
|---:|---|---|---|
| 1 | AUD-001 | Add explicit SRS UX/UI deliverable requirements covering all PDF §12 bullets; keep cross-references to `ACCEPTANCE-CRITERIA.md`. | High |
| 2 | AUD-002 | Add explicit SRS project deliverable requirements covering all PDF §15/page-12 bullets, preserving “optional mobile applications as agreed”. | High |
| 3 | AUD-003 | Add PDF §6 data entity/example table coverage under SRS §8.1, preserving protected/tokenized bank references and all `if enabled` qualifiers. | High |
| 4 | AUD-005 | Add all PDF §7.2 integration selection notes to `INT-*` rows without selecting providers or resolving decisions. | High |
| 5 | AUD-006 | Make `FR-MKT-005` mandatory for personalized recommendations/merchandising; add a separate conditional/decision-required requirement for advanced/AI recommendations. | High |
| 6 | AUD-015 | Consolidate or clearly relate `DEC-016` and `DEC-024`; preserve both multi-warehouse and multi-region and use consistent advanced/AI recommendation wording. | High |
| 7 | AUD-013 | Correct `NFR-SCAL-002` so `QA-007` points to SRS §10 or `AC-QA-005`, not `PERFORMANCE-STRATEGY.md`. | High |
| 8 | AUD-014 | Correct `SEC-012` to reference `AC-QA-006` or SRS `QA-006`, not undefined `QA-006` in `ACCEPTANCE-CRITERIA.md`. | High |
| 9 | AUD-009 | Correct `FR-CHK-006` cross-reference to `BR-CHK-006` and/or `BR-INV-005`. | Medium |
| 10 | AUD-010 | Correct `FR-CUS-006` cross-reference to `BR-FIN-002`. | Medium |
| 11 | AUD-011 | Correct commission references from `BR-FIN-008` to `BR-VEN-008` and `DEC-006`. | Medium |
| 12 | AUD-012 | Correct `FR-ORD-009` from `DEC-004` to `INT-SHIP` and `DEC-005`. | Medium |
| 13 | AUD-004 | Add Edge and Operations layers to SRS architecture summary. | Medium |
| 14 | AUD-007 | Clarify SRS version metadata so it does not imply approved requirements baseline. | Medium |
| 15 | AUD-008 | Separate role IDs from portal, channel, and unresolved workspace IDs while preserving all content. | Medium |

After these corrections are applied to `SRS.md`, re-run the ID/link verification and re-audit the source traceability. Downstream documents were only checked for file/ID existence in this audit; their contents require separate audits if they are also being approved.

---

## 11. Final Approval Status

**Final status: NOT APPROVED — modifications required.**

`SRS.md` is a strong draft and accurately covers most of the original PDF, but it is not ready for approval because:

1. PDF §12 UX/UI deliverables and PDF §15 project deliverables are not explicitly represented in the SRS.
2. PDF §6 data entity coverage and §7.2 integration selection notes are incomplete.
3. One requirement (`FR-MKT-005`) is misclassified.
4. One unresolved decision pair (`DEC-016` / `DEC-024`) is duplicated/partly inconsistent.
5. Six semantic cross-reference problems remain.
6. Role, portal, and channel IDs are conflated.

No business decision should be resolved as part of these corrections. `SRS.md` must remain unchanged until the user approves the correction plan.

## 12. Current status addendum

This report is a historical audit snapshot. Later corrections and approved decisions are recorded in `COMPLETE-PROJECT-AUDIT.md`, [SRS §12A](../requirements/SRS.md#12a-approved-g1g8-decisions), and the current canonical documents. Do not use the findings above as the current status.
