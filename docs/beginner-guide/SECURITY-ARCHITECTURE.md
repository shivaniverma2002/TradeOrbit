# SECURITY-ARCHITECTURE.md — Beginner-Friendly Copy

> **Learning copy notice.** This is a learning copy. No architecture decision, ID, API contract, database entity, security control, status, or requirement was changed. The original content is reproduced below.

## How to use this guide

- Read the beginner sections first, then the unchanged original below the separator.
- Security IDs are stable labels. Copy them into tickets and tests exactly as written.
- A status of **Decision required** means: ask for the decision, do not invent a value.

## How to read the IDs in this document

| ID pattern | Plain-English meaning | What it means as development work |
|---|---|---|
| `SEC-PRIN-*` | Security principles | Rules that guide every feature. |
| `SEC-AUTH-*` | Authentication | Build login, verification, sessions, MFA support, account-status checks. |
| `SEC-AUTHZ-*` | Authorization | Build server-side role/permission and ownership checks. |
| `SEC-APP-*` | Application security | Add validation, encoding, safe queries, uploads, headers, scanning. |
| `SEC-TLS-*` | Transport security | Enforce HTTPS/TLS, HSTS, certificates, secure callbacks. |
| `SEC-DATA-*` | Data-at-rest protection | Encrypt/tokenize sensitive fields, backups, and files. |
| `SEC-PRIV-*` / `SEC-PII-004-*` | Privacy and sensitive data | Consent, retention, exports/deletions, KYC/bank data controls. |
| `SEC-SECRETS-*` | Secrets management | Store keys outside code, separate environments, rotate, exclude from logs. |
| `SEC-PAY-*` / `SEC-FRAUD-*` | Payment and fraud | Hosted/tokenized payments, webhook checks, abuse monitoring. |
| `SEC-AUDIT-*` | Audit | Append-only records of privileged actions and status histories. |
| `SEC-VER-*` | Verification | Security tests and launch evidence. |
| `DEC-*` | Unresolved decisions | Blocking questions such as MFA policy or PCI boundary. |

## Beginner explanations by topic

### 1. Security principles

**What is it?**  
Eight rules that guide all TradeOrbit security work.

**Why do we need it?**  
So no feature accidentally trusts the browser or exposes sensitive data.

**How does it work?**  
Each principle maps to controls in later sections.

**Example.**  
A shopper changes the price in browser dev tools. The server recalculates it.

**What do I need to build?**  
Server-side enforcement, least privilege, data protection, audit, verified callbacks, safe failure.

**How do I test it?**  
Tamper with requests and confirm the server rejects or ignores them.

| ID | Development work |
|---|---|
| SEC-PRIN-001 | Never trust client totals, stock, payment state, or audit records. |
| SEC-PRIN-002 | Give each role only the permissions it needs. |
| SEC-PRIN-003 | Minimise, encrypt, tokenize, and restrict sensitive data. |
| SEC-PRIN-004 | Make financial and privileged actions traceable. |
| SEC-PRIN-005 | Verify every external callback. |
| SEC-PRIN-006 | Fail safely without leaking data. |
| SEC-PRIN-007 | Separate duties for sensitive finance/admin actions. |
| SEC-PRIN-008 | Treat compliance as jurisdiction-dependent. |

### 2. Authentication

**What is it?**  
Proving who the user is.

**Why do we need it?**  
Protected operations must know the caller's identity.

**How does it work?**  
Register, login, verify email/phone, manage sessions, support password reset, enforce status.

**Example.**  
A suspended vendor cannot log in to the vendor portal.

**What do I need to build?**  
Auth endpoints, salted password hashing, secure cookies/tokens, expiry, revocation, status checks.

**How do I test it?**  
Try protected endpoints with no token, expired token, and suspended account.

| ID | Development work |
|---|---|
| SEC-AUTH-001 | Build registration/login/logout/reset and verification flows. |
| SEC-AUTH-002 | Store salted password hashes, never plaintext passwords. |
| SEC-AUTH-003 | Support MFA for privileged users; enforcement awaits DEC-010. |
| SEC-AUTH-004 | Implement secure session/token handling, expiry, revocation. |
| SEC-AUTH-005 | Add step-up re-authentication if the policy is confirmed. |
| SEC-AUTH-006 | Block suspended/rejected/terminated users and vendors. |

### 3. Authorization

**What is it?**  
Deciding what an authenticated caller may do.

**Why do we need it?**  
Login alone does not stop a customer reading another customer's order.

**How does it work?**  
RBAC (Role-Based Access Control) plus resource ownership checks on the server.

**Example.**  
Vendor A cannot open Vendor B's settlement statement.

**What do I need to build?**  
Permission model, role matrices, ownership checks, vendor scoping, finance-sensitive permissions.

**How do I test it?**  
Run the authorization matrix for every role and sensitive endpoint.

| ID | Development work |
|---|---|
| SEC-AUTHZ-001 | Enforce authorization on every protected API/domain operation. |
| SEC-AUTHZ-002 | Fine-grained admin permissions; protect reports/exports. |
| SEC-AUTHZ-003 | Vendor staff permissions assigned by vendor owner with history. |
| SEC-AUTHZ-004 | Separate public, customer, vendor, operations, admin, super-admin. |
| SEC-AUTHZ-005 | Customers access only their own resources. |
| SEC-AUTHZ-006 | Vendors access only their own store data. |
| SEC-AUTHZ-007 | Refund/commission/payout/bank changes need explicit permissions. |
| SEC-AUTHZ-008 | Sensitive admin actions are audited and may need step-up. |

### 4. Application security

**What is it?**  
Defences inside the application code.

**Why do we need it?**  
Input from browsers and providers can be malicious.

**How does it work?**  
Validate input, encode output, parameterize queries, validate files, set security headers, scan dependencies.

**Example.**  
A review body containing `<script>` is stored as text and never executed.

**What do I need to build?**  
DTO validation, output encoding, safe SQL, upload checks, headers, sanitized errors, scanners.

**How do I test it?**  
Injection, XSS, CSRF where applicable, SSRF, upload, and session tests.

| ID | Development work |
|---|---|
| SEC-APP-001 | Validation, encoding, parameterized queries, safe deserialization, upload validation. |
| SEC-APP-002 | CSRF where applicable, XSS, SQL injection, SSRF, access control, rate limits. |
| SEC-APP-003 | Add security headers and secure cookie attributes. |
| SEC-APP-004 | Return sanitized errors; log details with correlation IDs. |
| SEC-APP-005 | Validate/scan uploads and use signed URLs for private files. |
| SEC-APP-006 | Dependency/container/static scans and vulnerability fixes before production. |
| SEC-APP-007 | Keep secrets out of source control and build artifacts. |

### 5. Transport and data protection

**What is it?**  
Protecting data while it moves and while it is stored.

**Why do we need it?**  
Cookies, tokens, KYC documents, and bank references are sensitive.

**How does it work?**  
TLS (encryption in transit), encryption at rest, tokenization, field-level access controls.

**Example.**  
A bank account is stored as a provider token plus masked display value.

**What do I need to build?**  
HTTPS everywhere, certificate monitoring, encrypted fields/backups/files, protected references.

**How do I test it?**  
Check TLS config, attempt HTTP access, verify backups are encrypted and restorable.

| ID | Development work |
|---|---|
| SEC-TLS-001 | HTTPS/TLS for web, API, webhook, admin traffic. |
| SEC-TLS-002 | HSTS and secure redirects per platform. |
| SEC-TLS-003 | Certificate renewal, monitoring, TLS review before launch. |
| SEC-TLS-004 | Accept only configured secure provider callbacks. |
| SEC-DATA-001 | Never store raw card numbers or CVV. |
| SEC-DATA-002 | Encrypt sensitive fields, backups, object storage; test restore. |
| SEC-DATA-003 | Use protected/tokenized references for bank/payment data. |
| SEC-DATA-004 | Field-level access controls for KYC/bank/personal data. |
| SEC-DATA-005 | Keep sensitive data out of logs, analytics, errors, support notes. |

### 6. Privacy and personal data

**What is it?**  
Handling personal data lawfully and carefully.

**Why do we need it?**  
Customers and vendors trust TradeOrbit with personal and business data.

**How does it work?**  
Notices, consent records, minimization, consent-aware messaging, retention, export/delete workflows.

**Example.**  
Promotional SMS is sent only to recipients with matching channel consent.

**What do I need to build?**  
Consent storage, purpose/channel checks, retention jobs, export/delete endpoints, review gates.

**How do I test it?**  
Verify consent withdrawal stops messages and that deletion requests are tracked.

| ID | Development work |
|---|---|
| SEC-PRIV-001 | Publish notices and record consent/withdrawal by purpose and channel. |
| SEC-PRIV-002 | Collect only data needed for the stated purpose. |
| SEC-PRIV-003 | Consent-aware email/SMS/push/promotional messaging. |
| SEC-PRIV-004 | Retention/deletion policies; keep required financial/audit records. |
| SEC-PRIV-005 | Data-subject export/deletion workflows. |
| SEC-PRIV-006 | Jurisdiction review with specialists. |
| SEC-PII-004-001 | Classify KYC/tax/bank/contact data as confidential or restricted. |
| SEC-PII-004-002 | Limit sensitive seller data to permitted users/reviewers. |
| SEC-PII-004-003 | Track document expiry and verification state. |
| SEC-PII-004-004 | Store no raw account secrets; use protected references and masks. |
| SEC-PII-004-005 | Audit sensitive seller data access. |

### 7. Secrets management

**What is it?**  
A safe place for API keys, database passwords, and signing secrets.

**Why do we need it?**  
A leaked key can expose production data or payment credentials.

**How does it work?**  
Use a secrets manager or protected environment config; separate environments; rotate; exclude from logs.

**Example.**  
The payment provider API key is injected at runtime, never pasted into code.

**What do I need to build?**  
Environment config, access control, rotation policy, CI/log redaction.

**How do I test it?**  
Scan the repo and build artifacts for secrets; check logs contain none.

| ID | Development work |
|---|---|
| SEC-SECRETS-001 | Store secrets in a secrets manager/protected config, never in source control. |
| SEC-SECRETS-002 | Separate local/test/staging/production credentials and data. |
| SEC-SECRETS-003 | Rotate provider, database, signing secrets on agreed policy. |
| SEC-SECRETS-004 | Grant secrets only to services that need them; audit access. |
| SEC-SECRETS-005 | Exclude secrets from logs, errors, client bundles, CI output. |

### 8. Payment security and fraud

**What is it?**  
Protecting money flows and spotting abuse.

**Why do we need it?**  
Cards, refunds, payouts, reviews, and returns are attractive targets.

**How does it work?**  
Hosted/tokenized payment flows, verified webhooks, permissions, ledger, monitoring queues.

**Example.**  
A duplicated payment webhook must not create a second refund.

**What do I need to build?**  
Tokenization, webhook verification/dedupe, audit, ledger, fraud queues, rate limits.

**How do I test it?**  
Replay webhooks, attempt duplicate refunds, check return abuse signals.

| ID | Development work |
|---|---|
| SEC-PAY-001 | Hosted/tokenized flows; never store raw card numbers/CVV. |
| SEC-PAY-002 | Define PCI DSS responsibility boundary with provider. |
| SEC-PAY-003 | Verify payment webhooks and process idempotently. |
| SEC-PAY-004 | Restrict and audit refunds/payouts/settlement/bank changes. |
| SEC-PAY-005 | Reconcile provider transactions; immutable ledger. |
| SEC-PAY-006 | Do not trust client-returned payment status. |
| SEC-FRAUD-001 | Monitor suspicious logins/payments/returns/reviews; manual queues. |
| SEC-FRAUD-002 | Duplicate-listing/suspicious content detection after rules exist. |
| SEC-FRAUD-003 | Track return reason codes and abuse patterns. |
| SEC-FRAUD-004 | Spam/abuse detection for reviews and support content. |
| SEC-FRAUD-005 | Rate limits and anomaly alerts once limits are agreed. |

### 9. Threat model

**What is it?**  
A list of ways the system could be attacked.

**Why do we need it?**  
Controls should be chosen because of real risks.

**How does it work?**  
Threat categories such as spoofing, tampering, information disclosure, and privilege escalation are mapped to controls.

**Example.**  
A fake webhook caller is stopped by signature verification and TLS.

**What do I need to build?**  
The mapped controls, negative tests, and monitoring.

**How do I test it?**  
For each threat row, write at least one negative test or alert check.

### 10. Audit and accountability

**What is it?**  
A trustworthy record of who did what.

**Why do we need it?**  
Disputes, finance reviews, and investigations need evidence.

**How does it work?**  
Append-only records with actor, action, target, time, outcome, correlation ID.

**Example.**  
Changing commission rules writes an audit record and cannot silently erase the old value.

**What do I need to build?**  
Audit writes, status/event histories, central collection, access controls, alerts.

**How do I test it?**  
Try to update/delete an audit row and confirm it fails.

| ID | Development work |
|---|---|
| SEC-AUDIT-001 | Record privileged actions, bank changes, refunds, commissions, payouts, config. |
| SEC-AUDIT-002 | Include actor, action, target, time, outcome, correlation/request ID. |
| SEC-AUDIT-003 | Make audit records append-only. |
| SEC-AUDIT-004 | Keep event histories for key object status changes. |
| SEC-AUDIT-005 | Centrally collect and alert on audit/security logs. |
| SEC-AUDIT-006 | Access-control and retain sensitive logs per policy. |

### 11. Security control traceability

**What is it?**  
A map from PDF security checklist IDs to architecture controls.

**Why do we need it?**  
It proves each checklist item has a control and an acceptance reference.

**How does it work?**  
Read each SRS `SEC-*` row and open the linked controls.

**Example.**  
`SEC-006` secrets management → `SEC-SECRETS-001`–`SEC-SECRETS-005`.

**What do I need to build?**  
Trace links in tickets and tests.

**How do I test it?**  
Pick a checklist ID and confirm tests exist for its control IDs.

### 12. Security verification and launch readiness

**What is it?**  
The security evidence needed before launch.

**Why do we need it?**  
An untested control is not a finished control.

**How does it work?**  
Each verification ID names a test activity and acceptance reference.

**Example.**  
Webhook replay tests prove duplicate events have no extra business effect.

**What do I need to build?**  
Auth matrix tests, webhook tests, attack tests, scan evidence, privacy review, restore test, runbooks.

**How do I test it?**  
Execute the verification activities and attach evidence.

| ID | Development work |
|---|---|
| SEC-VER-001 | Authorization matrix testing across all roles/sensitive endpoints. |
| SEC-VER-002 | Webhook signature/replay/idempotency testing. |
| SEC-VER-003 | Injection, XSS, CSRF where applicable, SSRF, upload, session tests. |
| SEC-VER-004 | Dependency/container/static analysis/penetration test evidence. |
| SEC-VER-005 | Privacy review, consent/retention mapping, data-subject workflows. |
| SEC-VER-006 | Backup restoration and encrypted backup verification. |
| SEC-VER-007 | Incident contacts, runbooks, escalation paths ready. |

### 13. Incident response outline

**What is it?**  
What to do when something goes wrong.

**Why do we need it?**  
Fast, calm response reduces harm.

**How does it work?**  
Phases: Prepare, Detect, Contain, Eradicate, Recover, Learn, Notify.

**Example.**  
If a token leaks: revoke sessions, rotate the secret, preserve evidence, then review.

**What do I need to build?**  
Runbooks, contacts, severity levels, alert rules, secure communication channels.

**How do I test it?**  
Run an incident drill and time each phase.

### 14. Unresolved security decisions

**What is it?**  
Questions the PDF leaves open.

**Why do we need them?**  
They affect policy, controls, and test thresholds.

**How does it work?**  
Ask for a decision; do not hardcode an assumption.

**Example.**  
MFA mandatory or optional changes login and step-up enforcement work.

**What do I need to build?**  
A decision log and tickets blocked on `DEC-*`.

**How do I test it?**  
Confirm no code encodes a value for an unresolved decision.

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
| foreign key | A field that points to a row in another table. |
| index | A database helper that makes common lookups faster. |
| transaction | A group of database changes that all succeed or all fail together. |
| CI/CD | Automated build/test (CI) and automated delivery (CD). |
| SLO | Service Level Objective: an agreed reliability target. |
| RPO/RTO | Recovery Point Objective (max data loss) / Recovery Time Objective (max downtime). |
| TLS | Encryption for data in transit; HTTPS uses TLS. |
| CSRF | Cross-Site Request Forgery: a trick that makes a user's browser send unwanted requests. |
| XSS | Cross-Site Scripting: injecting harmful script into a page. |
| SQL injection | Injecting SQL through input to read or change data illegally. |
| secrets manager | A secure store for API keys, passwords, and tokens. |
| tokenization | Replacing sensitive data with a safe reference/token. |
| MFA | Multi-Factor Authentication: another proof beyond the password. |
| step-up authentication | Asking for fresh proof again before a very sensitive action. |
| PCI DSS | Payment Card Industry Data Security Standard; scope depends on provider boundary. |
| PII | Personally Identifiable Information: data that identifies a person. |
| KYC | Know Your Customer: checks used to verify a seller's identity/business. |
| SSRF | Server-Side Request Forgery: tricking a server into calling an unintended URL. |
| append-only | Records can be added but not edited or deleted. |
| runbook | A step-by-step guide for an operational task or incident. |
| correlation ID | An ID that links a request across logs, traces, and queues. |

## Original document content (unchanged)

# Security Architecture

**Project:** Task 2 — E-Commerce Marketplace  
**Source of truth:** `docs/requirements/Task_2_Complete_Ecommerce_Marketplace_Specification.pdf`  
**Canonical requirements:** [SRS.md](../requirements/SRS.md)  
**Related:** [SYSTEM-ARCHITECTURE.md](SYSTEM-ARCHITECTURE.md), [API-DESIGN.md](API-DESIGN.md), [DATABASE-ERD.md](DATABASE-ERD.md), [ACCEPTANCE-CRITERIA.md](../requirements/ACCEPTANCE-CRITERIA.md)

## Status vocabulary

| Status | Meaning |
|---|---|
| **Mandatory** | Explicitly required by the PDF or necessary for a secure in-scope capability. |
| **Conditional** | Applies when the relevant feature, provider, channel, or jurisdiction is in scope. |
| **Decision required** | The PDF leaves the control value or boundary unresolved. See [SRS §12](../requirements/SRS.md#12-unresolved-decisions-and-items-to-confirm). |

> This document does not resolve MFA policy, PCI DSS responsibility, target-jurisdiction obligations, SLA/SLO values, or retention periods. Those remain [DEC-001](../requirements/SRS.md#12-unresolved-decisions-and-items-to-confirm), [DEC-010](../requirements/SRS.md#12-unresolved-decisions-and-items-to-confirm), [DEC-018](../requirements/SRS.md#12-unresolved-decisions-and-items-to-confirm), and [DEC-020](../requirements/SRS.md#12-unresolved-decisions-and-items-to-confirm).

---

## 1. Security principles

| ID | Principle | Architecture treatment | Status |
|---|---|---|---|
| SEC-PRIN-001 | Never trust the client for authorization, totals, stock, payment state, or audit records. | Server-side enforcement in API/domain modules. | Mandatory |
| SEC-PRIN-002 | Use least privilege for customers, vendors, staff, admins, support, finance, warehouse, and delivery roles. | Role and permission model with resource ownership checks. | Mandatory |
| SEC-PRIN-003 | Protect sensitive data by minimising collection, encrypting storage/transport, tokenizing payment data, and restricting access. | Data classification and protection controls. | Mandatory |
| SEC-PRIN-004 | Make financial and privileged actions traceable. | Append-only audit records and immutable ledger entries. | Mandatory |
| SEC-PRIN-005 | Verify all external callbacks. | Signed, replay-protected, idempotent webhook handling. | Mandatory |
| SEC-PRIN-006 | Fail safely. | Avoid leaking sensitive data; queue non-critical work; expose operational exceptions. | Mandatory |
| SEC-PRIN-007 | Separate duties for sensitive finance and admin actions where permissions allow. | Finance-specific permissions and approval records. | Mandatory |
| SEC-PRIN-008 | Treat compliance obligations as jurisdiction-dependent. | Decision gates and specialist review before launch. | Decision required |

---

## 2. Authentication

### SEC-AUTH — Authentication controls

| ID | Control | Requirement | Status | Cross-reference |
|---|---|---|---|---|
| SEC-AUTH-001 | Customer, vendor, staff, admin, and operator authentication | Registration, login, logout, email/phone verification, password reset, and optional social sign-in. | Mandatory; social sign-in conditional | [FR-CUS-001](../requirements/SRS.md#33-customer-accounts--crm) |
| SEC-AUTH-002 | Password storage | Store passwords using a modern salted password-hashing algorithm; never store plaintext passwords. | Mandatory | [SEC-002](../requirements/SRS.md#9-security-and-privacy-checklist) |
| SEC-AUTH-003 | MFA support | Support MFA for privileged users; whether it is mandatory is unresolved. | Decision required | [DEC-010](../requirements/SRS.md#12-unresolved-decisions-and-items-to-confirm) |
| SEC-AUTH-004 | Session management | Use secure session/token handling, expiry, revocation, and secure cookie/header settings according to the final auth design. | Mandatory | [FR-COMP-001](../requirements/SRS.md#318-security-privacy--compliance) |
| SEC-AUTH-005 | Step-up authentication | Require re-authentication for sensitive admin/finance actions if confirmed by MFA policy. | Decision required | [DEC-010](../requirements/SRS.md#12-unresolved-decisions-and-items-to-confirm) |
| SEC-AUTH-006 | Account status enforcement | Suspended, rejected, or terminated users/vendors cannot access protected functions. | Mandatory | [FR-VEN-003](../requirements/SRS.md#32-vendor--seller-management) |

```mermaid
flowchart TD
    A[Protected request] --> B{Authenticated?}
    B -- no --> C[401 UNAUTHENTICATED]
    B -- yes --> D[Load principal, roles, vendor scope, permissions]
    D --> E{Resource ownership or permission?}
    E -- no --> F[403 FORBIDDEN]
    E -- yes --> G{Sensitive action?}
    G -- no --> H[Execute operation]
    G -- yes --> I{Step-up required and satisfied?}
    I -- no --> J[Step-up challenge or denial]
    I -- yes --> K[Execute and audit]
```

**Authentication notes**

- The PDF conflicts on MFA: §3.18 says optional MFA; §9 requires MFA for privileged users. The architecture supports both; enforcement awaits [DEC-010](../requirements/SRS.md#12-unresolved-decisions-and-items-to-confirm).
- Social sign-in is optional and must not bypass verification, consent, privacy, or account-linking controls.
- Vendor staff permissions are assigned by the vendor owner and must remain subordinate to vendor owner rights.

---

## 3. Authorization

### SEC-AUTHZ — Authorization model

| ID | Control | Requirement | Status | Cross-reference |
|---|---|---|---|---|
| SEC-AUTHZ-001 | Server-side authorization | Enforce authorization on every protected API/domain operation, not only in client UI. | Mandatory | [FR-COMP-002](../requirements/SRS.md#318-security-privacy--compliance), [API-004](API-DESIGN.md) |
| SEC-AUTHZ-002 | Admin RBAC | Admin/sub-admin accounts have fine-grained permissions; reporting and exports are role-protected. | Mandatory | [FR-ADM-002](../requirements/SRS.md#312-admin-console--platform-configuration), [FR-BI-007](../requirements/SRS.md#317-reports--business-intelligence) |
| SEC-AUTHZ-003 | Vendor staff RBAC | Vendor staff act only under vendor-owner-assigned permissions and have recorded activity history. | Mandatory | [FR-VEN-012](../requirements/SRS.md#32-vendor--seller-management) |
| SEC-AUTHZ-004 | Client group separation | Keep public, customer, vendor, operations, admin, and super-admin capabilities separate. | Mandatory | [API-007](API-DESIGN.md) |
| SEC-AUTHZ-005 | Resource ownership | Customers can access only their carts, orders, returns, tickets, reviews, and profile data. | Mandatory | [API-PERM-002](API-DESIGN.md) |
| SEC-AUTHZ-006 | Vendor data scoping | Vendors can access only their storefront, products, stock, orders, settlements, and staff. | Mandatory | [API-PERM-003](API-DESIGN.md) |
| SEC-AUTHZ-007 | Finance-sensitive permissions | Refunds, commissions, payouts, settlement approval, and bank-reference changes require explicit permissions. | Mandatory | [API-PERM-007](API-DESIGN.md) |
| SEC-AUTHZ-008 | Sensitive admin actions | Privileged changes require audit records and, where decided, step-up authentication. | Mandatory; step-up decision required | [BR-SEC-002](../requirements/BUSINESS-RULES.md) |

**Role permission summary**

| Role | Allowed scope | Explicitly restricted |
|---|---|---|
| Guest visitor | Public catalogue, search, product detail, cart where policy permits. | Accounts, orders, admin/vendor functions, private documents. |
| Customer | Own profile, addresses, cart, orders, returns, reviews, wishlist, tickets, consents. | Other customers’ data, vendor/admin/finance operations. |
| Vendor owner | Own vendor application, store profile, products, stock, assigned orders, shipments, returns, settlements, staff. | Other vendors’ data, marketplace-wide configuration, customer PII beyond fulfilment need. |
| Vendor staff | Vendor tasks granted by the vendor owner. | Permission self-grant, unassigned vendor data, admin functions. |
| Marketplace administrator | Assigned user/vendor/catalogue/order/payment/return/moderation/configuration operations. | Actions outside granted permissions; unaudited sensitive actions. |
| Support agent | Tickets, conversations, disputes, knowledge base, escalations. | Unrelated financial/payout actions unless separately permitted. |
| Warehouse/fulfilment operator | Stock movements, picking, packing, dispatch, return inspection. | Marketplace configuration, settlement approval, unrelated customer data. |
| Delivery/logistics operator | Assigned shipments, milestones, exceptions, proof of delivery where supported. | Order financial details, unrelated customer/vendor data. |
| Finance operator | Payment/refund reconciliation, tax/finance reports, settlements, payouts. | Catalogue merchandising, support conversations unrelated to disputes. |
| Super administrator | Global configuration, admin roles, permissions, audit/security settings. | Using global rights without audit; changing financial values without documented approval. |

---

## 4. Application security

### SEC-APP — Application-layer controls

| ID | Control | Requirement | Status | Cross-reference |
|---|---|---|---|---|
| SEC-APP-001 | Validation, encoding and query safety | Input validation, output encoding, parameterized queries, safe deserialization, and file-upload validation. | Mandatory | [FR-COMP-004](../requirements/SRS.md#318-security-privacy--compliance) |
| SEC-APP-002 | Common web attack controls | CSRF where applicable, XSS, SQL injection, SSRF, broken access control, and rate-limit protections. | Mandatory; CSRF conditional | [SEC-005](../requirements/SRS.md#9-security-and-privacy-checklist) |
| SEC-APP-003 | Security headers | Apply appropriate security headers and secure cookie attributes. | Mandatory | [SEC-001](../requirements/SRS.md#9-security-and-privacy-checklist) |
| SEC-APP-004 | Error handling | Return stable sanitized errors; log details internally with correlation IDs. | Mandatory | [API-ERR](API-DESIGN.md) |
| SEC-APP-005 | Secure uploads | Validate type/size, scan where supported, use object storage, and serve private files by signed URLs. | Mandatory | [API-FILE-001](API-DESIGN.md) |
| SEC-APP-006 | Dependency and container security | Dependency scanning, container scanning, static analysis, and vulnerability remediation before production. | Mandatory | [QA-006](../requirements/ACCEPTANCE-CRITERIA.md) |
| SEC-APP-007 | Secrets in code | Prohibit secrets in source control and build artifacts. | Mandatory | [SEC-SECRETS-001](#7-secrets-management) |

---

## 5. Transport and data protection

### SEC-TLS — Transport security

| ID | Control | Requirement | Status |
|---|---|---|---|
| SEC-TLS-001 | HTTPS/TLS everywhere for web, API, webhook, and admin traffic. | Mandatory |
| SEC-TLS-002 | HSTS and secure redirect behaviour according to the deployment platform. | Recommendation |
| SEC-TLS-003 | Certificate renewal, monitoring, and TLS configuration review before launch. | Mandatory |
| SEC-TLS-004 | Provider webhook endpoints accept only configured secure callbacks. | Mandatory |

### SEC-DATA — Data-at-rest protection

| ID | Control | Requirement | Status | Cross-reference |
|---|---|---|---|---|
| SEC-DATA-001 | Minimise sensitive data collection and exposure; never store raw card numbers or CVV. | Mandatory | [DB-003](DATABASE-ERD.md), [BR-SEC-003](../requirements/BUSINESS-RULES.md) |
| SEC-DATA-002 | Encrypt sensitive fields, backups, and object storage where supported; restrict and test restoration. | Mandatory | [SEC-010](../requirements/SRS.md#9-security-and-privacy-checklist) |
| SEC-DATA-003 | Use protected/tokenized references for bank and payment data. | Mandatory | [DB-VEN](DATABASE-ERD.md) |
| SEC-DATA-004 | Apply field-level access controls for KYC documents, banking references, and personal data. | Mandatory | [SEC-PII-004](#6-privacy-and-personal-data) |
| SEC-DATA-005 | Avoid copying sensitive data into logs, analytics payloads, error reports, and support notes. | Mandatory | [NFR-OBS-001](../requirements/SRS.md#5-non-functional-requirements) |

**Data classification**

| Class | Examples | Required handling | Status |
|---|---|---|---|
| Public | Published products, public content, approved storefront profiles. | CDN/cache allowed; SEO metadata controlled. | Mandatory |
| Internal | Operational status, feature flags, non-sensitive configuration, aggregate reports. | Authenticated role-based access. | Mandatory |
| Confidential | Customer addresses/contact details, order history, support tickets, vendor business details. | Encryption, access control, audit for sensitive access where applicable. | Mandatory |
| Restricted | Passwords/hashes, payment tokens, bank references, KYC documents, secrets, audit records. | Strongest access control, tokenization/encryption, no general list endpoints, audit access. | Mandatory |

---

## 6. Privacy and personal data

### SEC-PRIV — Privacy controls

| ID | Control | Requirement | Status | Cross-reference |
|---|---|---|---|---|
| SEC-PRIV-001 | Privacy notices and consent records | Publish privacy notices, record consent and withdrawal, and link consent to purpose/channel. | Mandatory | [FR-COMP-006](../requirements/SRS.md#318-security-privacy--compliance), [FR-CUS-002](../requirements/SRS.md#33-customer-accounts--crm) |
| SEC-PRIV-002 | Data minimization | Collect only data needed for the stated commerce, verification, fulfilment, tax, and support purpose. | Mandatory | [NFR-DATA-001](../requirements/SRS.md#5-non-functional-requirements) |
| SEC-PRIV-003 | Consent-aware messaging | Email/SMS/push/promotional and abandoned-cart messaging require allowed purpose and channel consent. | Mandatory where messaging used | [FR-MKT-004](../requirements/SRS.md#313-marketing-loyalty--engagement) |
| SEC-PRIV-004 | Retention and deletion | Define retention policies, archive/delete schedules, and preserve required financial/audit records. | Mandatory; periods decision required | [DB-010](DATABASE-ERD.md), [DEC-020](../requirements/SRS.md#12-unresolved-decisions-and-items-to-confirm) |
| SEC-PRIV-005 | Data-subject workflows | Support account export/deletion requests and track outcomes according to applicable obligations. | Mandatory | [FR-CUS-008](../requirements/SRS.md#33-customer-accounts--crm) |
| SEC-PRIV-006 | Jurisdiction review | Assess privacy, consumer, tax, payment, and e-commerce requirements for each target market with specialists. | Mandatory | [SEC-011](../requirements/SRS.md#9-security-and-privacy-checklist), [DEC-001](../requirements/SRS.md#12-unresolved-decisions-and-items-to-confirm) |

### SEC-PII-004 — Sensitive seller and personal information

| ID | Requirement | Status | Cross-reference |
|---|---|---|---|
| SEC-PII-004-001 | KYC documents, tax identifiers, bank references, and contact details are confidential/restricted data. | Mandatory | [FR-VEN-002](../requirements/SRS.md#32-vendor--seller-management) |
| SEC-PII-004-002 | Sensitive seller data is accessible only to permitted vendor users and authorized admin/finance reviewers. | Mandatory | [SEC-AUTHZ-006](#3-authorization) |
| SEC-PII-004-003 | Document expiry tracking and verification state are maintained. | Mandatory | [FR-VEN-002](../requirements/SRS.md#32-vendor--seller-management) |
| SEC-PII-004-004 | Raw financial account secrets are not stored; protected references and masked display values are used. | Mandatory | [DB-CON-015](DATABASE-ERD.md) |
| SEC-PII-004-005 | Access to sensitive seller data is audited where it supports privileged actions and dispute review. | Mandatory | [SEC-AUDIT-001](#10-audit-and-accountability) |

---

## 7. Secrets management

### SEC-SECRETS — Secrets controls

| ID | Requirement | Status |
|---|---|---|
| SEC-SECRETS-001 | Store secrets in a secrets manager or protected environment configuration; never commit them to source control. | Mandatory |
| SEC-SECRETS-002 | Separate local, test, staging, and production credentials and data. | Mandatory |
| SEC-SECRETS-003 | Rotate provider, database, and signing secrets according to an agreed policy. | Mandatory intent; interval to agree |
| SEC-SECRETS-004 | Grant secrets only to services that need them and audit access where the platform supports it. | Mandatory |
| SEC-SECRETS-005 | Exclude secrets from logs, error reports, client bundles, and CI output. | Mandatory |

---

## 8. Payment security and fraud

### SEC-PAY — Payment controls

| ID | Requirement | Status | Cross-reference |
|---|---|---|---|
| SEC-PAY-001 | Use hosted or tokenized payment flows; never store raw card numbers or CVV. | Mandatory | [FR-PAY-001](../requirements/SRS.md#37-payments-refunds--finance) |
| SEC-PAY-002 | Define PCI DSS responsibility boundary with the selected provider. | Decision required | [DEC-018](../requirements/SRS.md#12-unresolved-decisions-and-items-to-confirm) |
| SEC-PAY-003 | Verify payment webhooks and process them idempotently. | Mandatory | [API-WH-001](API-DESIGN.md) |
| SEC-PAY-004 | Restrict refunds, payouts, settlement approval, and bank-reference changes by permission and audit them. | Mandatory | [SEC-AUTHZ-007](#3-authorization) |
| SEC-PAY-005 | Reconcile provider transactions and maintain immutable financial ledger records. | Mandatory | [DB-007](DATABASE-ERD.md) |
| SEC-PAY-006 | Do not trust client-returned payment status as proof of payment. | Mandatory | [AC-006](../requirements/ACCEPTANCE-CRITERIA.md) |

### SEC-FRAUD — Fraud and abuse controls

| ID | Requirement | Status | Cross-reference |
|---|---|---|---|
| SEC-FRAUD-001 | Monitor fraud signals for suspicious logins, payments, returns, and reviews; provide manual review queues. | Mandatory | [FR-COMP-007](../requirements/SRS.md#318-security-privacy--compliance) |
| SEC-FRAUD-002 | Detect duplicate-listing and suspicious content patterns once rules are defined. | Decision required | [DEC-022](../requirements/SRS.md#12-unresolved-decisions-and-items-to-confirm) |
| SEC-FRAUD-003 | Track return reason codes and abuse patterns for review. | Mandatory | [FR-RET-008](../requirements/SRS.md#311-returns-exchanges--refunds) |
| SEC-FRAUD-004 | Apply spam/abuse detection to reviews and support content. | Mandatory | [FR-REV-005](../requirements/SRS.md#314-reviews-ratings--moderation) |
| SEC-FRAUD-005 | Use rate limits and anomaly alerts where agreed. | Mandatory intent; numeric limits decision required | [DEC-020](../requirements/SRS.md#12-unresolved-decisions-and-items-to-confirm) |

---

## 9. Threat model

| Threat category | Marketplace example | Primary controls | Status |
|---|---|---|---|
| Spoofing | Stolen customer/vendor/admin credentials; fake webhook caller. | SEC-AUTH-*, SEC-TLS, signed webhooks, optional MFA pending DEC-010. | Mandatory; MFA decision required |
| Tampering | Client changes totals; provider event replay; product status manipulation. | Server-calculated totals, idempotency, webhook dedupe, state machines, audit records. | Mandatory |
| Repudiation | Admin changes commission without evidence; seller denies KYC submission. | SEC-AUDIT-001, immutable ledger, status/event histories. | Mandatory |
| Information disclosure | Customer PII exposed via API; KYC documents leaked; secrets in logs. | SEC-AUTHZ-*, SEC-DATA-*, SEC-PRIV-*, secrets management, sanitized errors. | Mandatory |
| Denial of service | Checkout/search abuse, queue backlog, provider outage. | Rate limits, bounded retries, queue monitoring, graceful degradation, performance strategy. | Mandatory intent; limits/SLOs pending DEC-020 |
| Elevation of privilege | Vendor staff grants self-permissions; sub-admin accesses super-admin settings. | Fine-grained RBAC, permission separation, negative authorization tests. | Mandatory |
| Fraud | Return abuse, fake reviews, suspicious payments. | SEC-FRAUD-*, moderation queues, manual review. | Mandatory |
| Supply chain | Vulnerable dependency/container or compromised CI secret. | SEC-APP-006, SEC-SECRETS-*, CI security scans. | Mandatory |

---

## 10. Audit and accountability

### SEC-AUDIT — Audit controls

| ID | Requirement | Status | Cross-reference |
|---|---|---|---|
| SEC-AUDIT-001 | Record privileged actions, seller bank-detail changes, refunds, commissions, payouts, admin permission changes, and sensitive configuration changes. | Mandatory | [SEC-009](../requirements/SRS.md#9-security-and-privacy-checklist), [BR-SEC-002](../requirements/BUSINESS-RULES.md) |
| SEC-AUDIT-002 | Audit records include actor, action, target, time, outcome, and correlation/request ID where available. | Mandatory | [DB-CON-016](DATABASE-ERD.md) |
| SEC-AUDIT-003 | Audit records are append-only and protected from ordinary deletion or update. | Mandatory | [DB-RET-003](DATABASE-ERD.md) |
| SEC-AUDIT-004 | Order, payment, shipment, return, vendor, and product status changes have event histories. | Mandatory | [DB-008](DATABASE-ERD.md) |
| SEC-AUDIT-005 | Audit and security logs are centrally collected and alertable. | Mandatory | [NFR-OBS-001](../requirements/SRS.md#5-non-functional-requirements) |
| SEC-AUDIT-006 | Sensitive logs are access-controlled and retained according to policy. | Mandatory; retention pending DEC-020 | [SEC-PRIV-004](#6-privacy-and-personal-data) |

---

## 11. Security control traceability

| SRS checklist ID | Architecture control IDs | Acceptance |
|---|---|---|
| SEC-001 HTTPS/TLS, secure cookies, headers | SEC-TLS-*, SEC-APP-003 | AC-QA-006 |
| SEC-002 Password hashing and MFA | SEC-AUTH-002, SEC-AUTH-003 | AC-QA-006; MFA policy pending DEC-010 |
| SEC-003 RBAC and server-side authorization | SEC-AUTHZ-001–SEC-AUTHZ-008 | AC-009, AC-QA-006 |
| SEC-004 Validation, encoding, parameterized queries, upload scanning | SEC-APP-001, SEC-APP-005 | AC-QA-006 |
| SEC-005 CSRF/XSS/injection/access control/rate limits | SEC-APP-002 | AC-QA-006 |
| SEC-006 Secrets management | SEC-SECRETS-001–SEC-SECRETS-005 | AC-QA-006 |
| SEC-007 Payment tokenization/hosted checkout | SEC-PAY-001, SEC-PAY-002 | AC-006, AC-QA-006 |
| SEC-008 Webhook verification/replay protection | API-WH-001–API-WH-003, SEC-PAY-003 | AC-006 |
| SEC-009 Privileged action auditing | SEC-AUDIT-001–SEC-AUDIT-003 | AC-009 |
| SEC-010 Encrypted backups and sensitive fields | SEC-DATA-002, SEC-DATA-003 | LAUNCH-010 |
| SEC-011 Jurisdiction-specific compliance review | SEC-PRIV-006 | DEL-SEC-001, DEC-001 |
| SEC-012 Dependency/container/static/penetration testing | SEC-APP-006 | AC-QA-006 |

---

## 12. Security verification and launch readiness

| ID | Verification activity | Acceptance reference | Status |
|---|---|---|---|
| SEC-VER-001 | Authorization matrix testing across all roles and sensitive endpoints. | [AC-009](../requirements/ACCEPTANCE-CRITERIA.md), [AC-QA-006](../requirements/ACCEPTANCE-CRITERIA.md) | Mandatory |
| SEC-VER-002 | Payment and shipping webhook signature, replay, and idempotency testing. | [AC-006](../requirements/ACCEPTANCE-CRITERIA.md) | Mandatory |
| SEC-VER-003 | Injection, XSS, CSRF where applicable, SSRF, upload, and session-handling tests. | [AC-QA-006](../requirements/ACCEPTANCE-CRITERIA.md) | Mandatory |
| SEC-VER-004 | Dependency, container, static analysis, and penetration test evidence. | [SEC-012](../requirements/SRS.md#9-security-and-privacy-checklist), [DEL-SEC-001](../requirements/ACCEPTANCE-CRITERIA.md) | Mandatory |
| SEC-VER-005 | Privacy review, consent mapping, retention mapping, and data-subject workflow verification. | [SEC-PRIV-*](#6-privacy-and-personal-data) | Mandatory; jurisdiction pending DEC-001 |
| SEC-VER-006 | Backup restoration and encrypted backup verification. | [LAUNCH-010](../requirements/SRS.md#11-development-phases-and-mvp-baseline) | Mandatory |
| SEC-VER-007 | Security incident contacts, runbooks, and escalation paths ready. | [LAUNCH-011](../requirements/SRS.md#11-development-phases-and-mvp-baseline) | Mandatory |

---

## 13. Incident response outline

| Phase | Requirement | Status |
|---|---|---|
| Prepare | Define roles, contacts, severity levels, secure communication channels, and runbooks before production. | Mandatory |
| Detect | Alert on authentication anomalies, payment failures, webhook failures, queue backlog, privilege changes, and critical vulnerability findings. | Mandatory |
| Contain | Revoke sessions/credentials, disable affected integrations or feature flags, preserve evidence. | Mandatory |
| Eradicate | Patch, rotate secrets, remove malicious content, correct access rules. | Mandatory |
| Recover | Restore service/data where needed, verify integrity, monitor for recurrence. | Mandatory |
| Learn | Record root cause, impact, corrective actions, and control improvements. | Mandatory |
| Notify | Follow jurisdiction- and contract-specific breach notification obligations once target markets and provider boundaries are confirmed. | Decision required |

---

## 14. Unresolved security decisions

| ID | Decision needed | Impact |
|---|---|---|
| DEC-001 | Target countries and applicable legal/compliance requirements. | Privacy notices, consumer law, tax, payment, and e-commerce rules. |
| DEC-004 | Payment provider, methods, COD, and settlement capability. | PCI scope, token flow, payout controls, refund handling. |
| DEC-010 | Whether MFA is optional or mandatory for privileged users. | Authentication and step-up enforcement. |
| DEC-011 | Dedicated operational portals or admin-console subareas. | Permission scoping and audit presentation. |
| DEC-012 | Guest checkout policy. | Authentication requirements for checkout and order access. |
| DEC-016 | Which conditional features launch. | Social sign-in, loyalty, wallet/gift card, mobile, B2B, multi-warehouse controls. |
| DEC-018 | PCI DSS responsibility boundary. | Compliance documentation and control allocation. |
| DEC-020 | Numeric security, availability, retention, and rate-limit targets. | Test thresholds and operational alerts. |
| DEC-022 | Duplicate-listing, tax source, commission examples, and reconciliation matching rules. | Fraud/abuse detection and finance controls. |
