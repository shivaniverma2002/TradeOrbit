# SECURITY-ARCHITECTURE.md — Beginner-Friendly Copy

> **Learning copy notice.** This is a learning copy. No architecture decision, ID, API contract, database entity, security control, status, or requirement was changed. The current canonical document is linked at the end of this guide.

## How to use this guide

- Read the beginner sections first, then the canonical document linked at the end of this guide.
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

## Current status note (2026-11-22)

The beginner explanations above reflect the earlier project state. Current approved G1–G8 decisions are in `../requirements/SRS.md` §12A and `../audits/AUTHENTICATION-IMPLEMENTATION-PLAN.md`. Where those explanations say MFA, guest checkout, Google sign-in, admin portal topology, or package manager are pending, use the approved decisions. Transactional notifications are mandatory; other marketing features remain conditional unless separately decided.

## Canonical source

The explanations above introduce the security controls and identifier patterns. The complete security document is [SECURITY-ARCHITECTURE.md](../architecture/SECURITY-ARCHITECTURE.md). That canonical file is the source of truth for security controls, SEC identifiers, and security decisions.