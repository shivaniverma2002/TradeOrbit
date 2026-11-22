# SRS.md — Beginner-Friendly Copy

> Learning copy only. No requirement, ID, status, business rule, technical decision, API contract, or architecture detail was changed; the original content is reproduced below.

## Start here

This file helps you learn the original `SRS.md`.

- The **SRS** (Software Requirements Specification) is the requirement catalogue for TradeOrbit.
- Each row has an **ID** (a stable name for one requirement).
- The original **Status** wording is kept. It says if an item is mandatory, conditional, a recommendation, or decision-required.
- This guide explains the same content in simple English. It does not approve, reject, finish, or change any requirement.
- If a value or rule is unresolved in the original, it stays unresolved here.

## Reading path

Read in this order:

1. **Requirements first** — this SRS, plus `BUSINESS-RULES.md`, tells you what the platform must cover.
2. **Then user stories and acceptance criteria** — `USER-STORIES.md` and `ACCEPTANCE-CRITERIA.md` explain who needs it and how we will check it.
3. **Then architecture** — `SYSTEM-ARCHITECTURE.md`, `DATABASE-ERD.md`, `API-DESIGN.md`, `SECURITY-ARCHITECTURE.md`, and `PERFORMANCE-STRATEGY.md` explain how the team plans to build it.

Do not use the beginner explanation as a source of new rules. Use the original content below as the source of truth.

## Plain-English terms

| Term you will see | Simple meaning |
|---|---|
| SRS (Software Requirements Specification) | The document that lists what the product must cover. |
| Requirement ID | A short code such as `FR-CHK-007` that keeps a stable meaning. |
| Status | A label that says how strongly the requirement applies. |
| Mandatory | Explicitly required in the source scope. |
| Conditional | Applies only when its wording applies, such as “if enabled” or “where supported”. |
| Recommendation | Suggested baseline. It is not a confirmed final decision. |
| Decision required | The answer is unresolved and must be agreed by a person or team. |
| Marketplace | A site where many vendors sell to customers under one platform. |
| Multi-vendor | More than one seller can list and fulfil products. |
| Portal | A web area for a role, such as the vendor portal or admin console. |
| Role | A type of user with its own allowed actions. |
| RBAC (role-based access control) | Permissions depend on the user’s role. |
| Least privilege | Give each user only the access they truly need. |
| KYC (Know Your Customer) | Checks used to verify a seller’s business identity. |
| SKU (stock keeping unit) | A code for a specific sellable product variant. |
| Variant | A version of a product, such as a size or colour choice. |
| Catalogue | The list of products, categories, brands, and attributes. |
| Moderation | Reviewing submitted content before it becomes public. |
| Cart | The customer’s selected items before checkout. |
| Checkout | The steps that turn a cart into an order. |
| Idempotency (doing the same request twice safely) | A repeated request must not create a duplicate effect. |
| Webhook (a callback message from another system) | A provider calls your API to report an event, such as payment success. |
| Transaction (all-or-nothing database work) | A group of database steps either all succeed or all roll back. |
| Ledger (a record of money movements) | An append-only history of financial entries. |
| Fixed-precision decimal | A money value stored as an exact decimal, not a floating-point number. |
| MFA (multi-factor authentication) | An extra proof step after a password. |
| CSRF (cross-site request forgery) | An attack that tricks a browser into sending an unwanted request. |
| XSS (cross-site scripting) | An attack that places harmful script in a page. |
| SQL injection | An attack that tries to change a database query through input. |
| SSRF (server-side request forgery) | An attack that tricks a server into calling an unwanted address. |
| TLS (transport layer security) | Encryption for data travelling over the network. |
| Tokenization | Replacing sensitive data with a safe reference. |
| API (application programming interface) | A defined way for clients and services to talk. |
| REST | A common API style using URLs and HTTP methods. |
| OpenAPI | A machine-readable description of an API. |
| Contract | The agreed request and response shape of an API. |
| ORM (object-relational mapper) | A tool that maps database rows to code objects. Prisma is named in the original stack. |
| Migration | A versioned change to the database schema. |
| Index | A database structure that helps common searches run faster. |
| Queue | A background work list for slow or delayed jobs. |
| Dead-letter queue | A place for messages that could not be processed. |
| Object storage | Storage for files such as images and documents. |
| CDN (content delivery network) | A network that serves static files closer to users. |
| WAF (web application firewall) | A filter that blocks common web attacks. |
| CI/CD (continuous integration / continuous delivery) | Automated checks, builds, and deployments. |
| RPO (recovery point objective) | How much recent data may be lost after a disaster. |
| RTO (recovery time objective) | How quickly the system must be restored. |
| PITR (point-in-time recovery) | Restoring a database to a chosen moment. |
| E2E (end-to-end) | A test that follows a full user journey. |
| Regression test | A test that checks old behaviour still works after a change. |
| ADR (architecture decision record) | A short record of an architecture choice and why it was made. |
| Observability | Logs, metrics, traces, dashboards, and alerts that explain system behavior. |
| SEO (search engine optimisation) | Work that helps search engines understand and index pages. |
| WCAG 2.2 AA | An accessibility standard the SRS targets where feasible. |

## How to read each explanation

The sections below use the same six questions:

- **What is it?** The simple definition.
- **Why do we need it?** The problem it solves.
- **How does it work?** The normal flow.
- **Example** A practical TradeOrbit marketplace case.
- **What do I need to build?** The work to plan or implement.
- **How do I test it?** The checks that give evidence.

These bullets are learning aids. They do not replace the original IDs or Status values.

## Major SRS sections

### Topic 0 — Front matter: status vocabulary and document map

- **What is it?** The front matter defines status words and points to related documents.
- **Why do we need it?** Everyone must read the same words the same way.
- **How does it work?** A status word qualifies a requirement. A document map points to business rules, stories, criteria, and architecture.
- **Example:** A row marked “Conditional” is not treated like a row marked “Mandatory”.
- **What do I need to build?** A habit of checking Status and Cross-reference before writing code.
- **How do I test it?** Compare any task back to its ID, Status, and linked document.

### Topic 1 — Section 1: Project overview

- **What is it?** The product definition and high-level objectives.
- **Why do we need it?** It sets the shared scope before detailed work begins.
- **How does it work?** Overview IDs describe the whole platform. Objective IDs describe what the platform should achieve.
- **Example:** One customer buys an item from a seller while an operator views marketplace-wide reports.
- **What do I need to build?** Features that fit the documented lifecycle, roles, and multi-seller model.
- **How do I test it?** Check scope coverage against the overview and objective IDs without claiming implementation.

### Topic 2 — Section 2: User roles and portals

- **What is it?** The people who use TradeOrbit and the surfaces they use.
- **Why do we need it?** Different users need different tools and different permissions.
- **How does it work?** A role is mapped to capabilities. A portal is mapped to a role or group of roles.
- **Example:** A vendor staff member can work on assigned tasks but cannot change payout details unless the vendor owner grants that permission.
- **What do I need to build?** Role definitions, permission-controlled portals, and server-side authorization checks.
- **How do I test it?** Use a role matrix, positive tests, negative tests, and cross-user access tests.

### Topic 3 — Section 3: Functional requirements

- **What is it?** The product features grouped by business area.
- **Why do we need it?** It turns the marketplace idea into specific work items.
- **How does it work?** Each `FR-*` family covers one area, such as catalogue, checkout, payment, inventory, or support.
- **Example:** A seller submits a product, an admin moderates it, a customer buys it, and finance reconciles the payout.
- **What do I need to build?** The documented feature set for each `FR-*` family, with backend validation and authorization.
- **How do I test it?** Use unit, integration, API, workflow, and E2E tests for each family.

### Topic 4 — Section 4: Key user journeys and acceptance outcomes

- **What is it?** Nine end-to-end outcomes that matter most.
- **Why do we need it?** A working feature is not enough if the complete journey fails.
- **How does it work?** Each `AC-JOURNEY-*` ID names a flow and its minimum outcome.
- **Example:** A customer finds a product, checks out, pays, and sees shipment status in one journey.
- **What do I need to build?** The joined-up flow across UI, API, data, payments, inventory, and operations.
- **How do I test it?** Run E2E tests with failure, duplicate, and unauthorized paths.

### Topic 5 — Section 5: Non-functional requirements

- **What is it?** Quality targets such as performance, security, accessibility, and recovery.
- **Why do we need it?** A correct feature can still be slow, unsafe, or hard to use.
- **How does it work?** Some items are mandatory. Some are conditional. Some have no numeric target yet.
- **Example:** Search must stay usable during peak traffic, but numeric latency targets remain decision-required.
- **What do I need to build?** Safe defaults, optimization, monitoring, tests, and documented decisions.
- **How do I test it?** Measure real behavior. Do not invent thresholds that the SRS leaves unresolved.

### Topic 6 — Section 6: Recommended technology stack

- **What is it?** A suggested tool baseline, not a claim that every option will be used together.
- **Why do we need it?** A shared stack keeps code consistent and reviewable.
- **How does it work?** One recommended tool is listed per responsibility. Some choices are still to agree.
- **Example:** PostgreSQL is suggested as the primary database; the ORM choice remains unresolved between Prisma and TypeORM.
- **What do I need to build?** Use the approved project stack and record choices where the original says a decision is needed.
- **How do I test it?** Check lint, type-check, build, container, and test tooling works with the selected stack.

### Topic 7 — Section 7: Architecture summary

- **What is it?** The recommended logical structure of the system.
- **Why do we need it?** Clear boundaries make features easier to secure, test, and change.
- **How does it work?** Presentation, API, domain, data, integration, async, edge, and operations layers are described.
- **Example:** Checkout logic lives in a domain module, while the API layer validates the request.
- **What do I need to build?** Modular code with explicit interfaces, data ownership, and tests.
- **How do I test it?** Review boundaries, dependency direction, and architecture decision records.

### Topic 8 — Section 8: Data, API and integration summary

- **What is it?** Rules for stored data, API behaviour, and external providers.
- **Why do we need it?** Marketplace correctness depends on consistent data, safe APIs, and controlled integrations.
- **How does it work?** Data rules define keys, transactions, ledgers, and history. API rules define contracts and protections. Integrations define provider roles.
- **Example:** A duplicate payment webhook is ignored safely, and the financial ledger keeps an immutable record.
- **What do I need to build?** Schema, migrations, versioned APIs, OpenAPI docs, idempotency, webhook verification, and selected adapters.
- **How do I test it?** Test constraints, transactions, contract shape, errors, replay protection, and provider sandbox flows.

### Topic 9 — Section 9: Security and privacy checklist

- **What is it?** A list of controls protecting users, data, money, and the platform.
- **Why do we need it?** The marketplace handles personal details, seller documents, and payment events.
- **How does it work?** Apply encryption, hashing, RBAC, validation, tokenization, audit logs, privacy review, and scans.
- **Example:** Changing a vendor bank detail is authorized, recorded, and never logged with sensitive values.
- **What do I need to build?** Secure transport, secrets handling, protected uploads, rate limits, and audit records.
- **How do I test it?** Run negative authorization, injection, session, upload, secret-scan, and compliance checks.

### Topic 10 — Section 10: Testing and quality assurance

- **What is it?** The required test levels from unit tests to E2E tests.
- **Why do we need it?** Tests provide evidence that behaviour is correct and secure.
- **How does it work?** Each `QA-*` ID names a level and the area it covers.
- **Example:** A unit test checks coupon eligibility; an E2E test checks a complete purchase.
- **What do I need to build?** Automated suites for logic, integrations, APIs, journeys, security, performance, accessibility, and regression.
- **How do I test it?** Run the suites and report only results that were actually executed.

### Topic 11 — Section 11A: DevOps, environments and deployment

- **What is it?** Environments, containers, pipelines, backups, media delivery, telemetry, and runbooks.
- **Why do we need it?** Safe releases need repeatable setup and rollback evidence.
- **How does it work?** Code moves through checks, builds, staging tests, approval, production, and monitoring.
- **Example:** A release is blocked when type-check or integration tests fail.
- **What do I need to build?** Local/test/staging/production separation, Docker, CI/CD, managed database, and dashboards.
- **How do I test it?** Verify isolation, pipeline gates, smoke tests, rollback, restore, alerts, and runbooks.

### Topic 12 — Section 11B: Development phases and MVP baseline

- **What is it?** Suggested phases, a recommended first-release baseline, and a launch checklist.
- **Why do we need it?** Large scope needs a safe order of work.
- **How does it work?** Each phase has scope and exit criteria. MVP IDs describe priorities. Launch IDs describe readiness checks.
- **Example:** Foundation comes before commerce; commerce comes before growth features.
- **What do I need to build?** Plans and evidence mapped to the named phase, MVP item, or checklist item.
- **How do I test it?** Review exit criteria and checklist evidence. Do not treat a recommendation as approval.

### Topic 13 — Section 12: Unresolved decisions and items to confirm

- **What is it?** A list of choices that are still open.
- **Why do we need it?** It stops developers from inventing business values or architecture choices.
- **How does it work?** Each `DEC-*` ID records the question, Status, and Impact.
- **Example:** Commission rules, tax jurisdiction rules, payment provider, and shipping model are unresolved.
- **What do I need to build?** Placeholders and questions, not assumed answers.
- **How do I test it?** Check that no code, config, or document silently answers an unresolved `DEC-*` ID.

### Topic 14 — Section 13: Traceability index

- **What is it?** A map from PDF sections to ID families.
- **Why do we need it?** It helps reviewers find where a need is represented.
- **How does it work?** Source sections point to ID prefixes such as `FR-*`, `TEC-*`, or `DEC-*`.
- **Example:** A payment rule can be traced from the PDF section to `FR-PAY-*`, `FR-BI-*`, and `DEC-004`.
- **What do I need to build?** Links between tasks, designs, tests, and the relevant ID family.
- **How do I test it?** Trace each work item back to at least one original ID.

### Topic 15 — Section 14: UI/UX and design deliverables

- **What is it?** Required design artifacts, not implementation claims.
- **Why do we need it?** Users need clear, accessible, reviewable screens before major flows are built.
- **How does it work?** Discovery, information architecture, wireframes, design system, high-fidelity screens, states, and review are named.
- **Example:** The checkout design covers loading, validation, error, success, and permission-denied states.
- **What do I need to build?** Figma artifacts and responsive/accessible screen states.
- **How do I test it?** Review usability, keyboard access, labels, contrast, and sign-off evidence.

### Topic 16 — Section 15: Project deliverables

- **What is it?** The artefacts the project must hand over.
- **Why do we need it?** A deliverable makes work reviewable and transferable.
- **How does it work?** Specifications, designs, code, integrations, tests, deployment, runbooks, and docs are listed.
- **Example:** A vendor onboarding feature needs code, tests, API docs, and user guidance, not just a screen.
- **What do I need to build?** The named deliverable with links to the requirement IDs it satisfies.
- **How do I test it?** Review the artefact against acceptance criteria and check no extra scope claim was added.

## Requirement ID families

Each row below explains one family. The family tables are learning aids only. The original IDs and Status values remain in the unchanged content below.

### Overview and role families

| ID family | What is it? | Why do we need it? | How does it work? | Example TradeOrbit case | What do I need to build? | How do I test it? |
|---|---|---|---|---|---|---|
| `SRS-OV-*` | Product overview IDs. | They set the shared scope. | They describe platform, lifecycle, vendors, operator control, and baseline advice. | One marketplace serves customers, sellers, admins, and delivery teams. | Scope notes, task breakdown, and downstream documents. | Check each feature maps to an overview ID. |
| `SRS-OBJ-*` | High-level objectives. | They state what good looks like. | They connect roles, sellers, payments, APIs, and operations to outcomes. | Customers get one consistent shopping experience across supported channels. | Role workspaces, commerce flows, APIs, monitoring, and tests. | Check objectives through journeys and evidence. |
| `SRS-ROLE-*` | User roles and legacy role pointers. | Permissions depend on who is acting. | Each role has capabilities and a Status qualifier. | A finance operator reconciles transactions and exports reports. | Role definitions and permission-controlled workspaces. | Use an RBAC matrix and negative access tests. |
| `SRS-PORTAL-*` | Main portal surfaces. | Users need the right workspace. | Customer, vendor, and admin areas are named explicitly. | A vendor manages products in the vendor portal. | Three role-aware portal areas. | Check access, navigation, and cross-role denial. |
| `SRS-CHANNEL-*` | Optional mobile channels. | Extra channels may be added later. | Apps stay conditional until scope is confirmed. | A delivery app is planned only if its decision is resolved. | Shared API contracts; apps only when in scope. | Confirm scope first, then test only in-scope channels. |

### Functional families: catalogue to payments

| ID family | What is it? | Why do we need it? | How does it work? | Example TradeOrbit case | What do I need to build? | How do I test it? |
|---|---|---|---|---|---|---|
| `FR-CAT-*` | Product catalogue and listings. | Sellers need sellable, reviewable product data. | Products move through status, variants, media, moderation, and groupings. | A seller submits a T-shirt with size variants and photos. | Product data, variants, media, workflow, import/export, and groupings. | Test validation, status changes, duplicates, imports, and visibility. |
| `FR-VEN-*` | Vendor and seller management. | The platform must trust and operate sellers. | Registration, verification, profile, dashboard, rules, settlement, and staff are covered. | A seller verifies details before publishing products. | Onboarding, KYC, profile, dashboard, settlements, scorecards, staff controls. | Test onboarding states, permissions, moderation, and sensitive data. |
| `FR-CUS-*` | Customer accounts and CRM. | Customers need self-service and history. | Identity, profile, addresses, segmentation, history, optional benefits, and privacy are covered. | A customer saves an address and views past invoices. | Registration, profile, addresses, history, optional ledgers, privacy requests. | Test identity, validation, access boundaries, and privacy workflows. |
| `FR-DISC-*` | Search and product discovery. | Customers must find products. | Pages, search, filters, sorting, recommendations, SEO, and accessibility work together. | A shopper filters by category and brand. | Responsive pages, search, filters, sorting, SEO fields, accessible states. | Test filters, sorting, SEO output, layout, and keyboard use. |
| `FR-PRICE-*` | Pricing, tax, and promotions. | Totals must be rule-driven and auditable. | Prices, offers, eligibility, configurable tax rules, and audit records are defined. | A coupon is checked against configured eligibility before checkout. | Price data, rules, eligibility checks, audit records. | Test calculations, eligibility, conflicts, and audit entries. |
| `FR-CHK-*` | Cart, checkout, and order placement. | This is where intent becomes an order. | Cart changes, server totals, stock reservation, and idempotent submission are covered. | A customer double-clicks “Place order” and only one order is created. | Cart, address and shipping choice, server totals, reservation, order submission. | Test totals, reservation expiry/release, duplicate clicks, and policy. |
| `FR-PAY-*` | Payments, refunds, and finance. | Money movement must be traceable. | Gateway flows, webhooks, refunds, ledger, settlements, documents, and exports are covered. | A payment callback is verified before the order moves forward. | Hosted/tokenized flows, states, webhook checks, refunds, ledger, exports. | Test sandbox payments, retries, duplicates, refunds, and ledger integrity. |

### Functional families: operations to platform

| ID family | What is it? | Why do we need it? | How does it work? | Example TradeOrbit case | What do I need to build? | How do I test it? |
|---|---|---|---|---|---|---|
| `FR-INV-*` | Inventory, procurement, and warehouse. | Stock must stay correct. | SKU stock, locations where required, movements, alerts, reservations, and audits are covered. | Two customers cannot take the last reserved item. | Stock records, movements, alerts, reservations, optional procurement. | Test concurrency, release, counts, alerts, and movement history. |
| `FR-ORD-*` | Order management and fulfilment. | Orders need controlled states. | Parent orders can split by vendor/warehouse/shipment with event history. | A two-seller cart becomes two fulfilment units under one customer order. | Split orders, assignments, statuses, pick/pack/dispatch, notes. | Test splits, transitions, history, partial flows, and unauthorized edits. |
| `FR-SHIP-*` | Shipping and logistics. | Goods must move with visible status. | Zones, rates, booking, labels, tracking, exceptions, and split shipments are covered. | A seller prints a label and tracks a shipment milestone. | Rate lookup, booking, labels, tracking, exception handling. | Test serviceability, labels, webhooks, exceptions, and multiple shipments. |
| `FR-RET-*` | Returns, exchanges, and refunds. | Post-purchase problems need an auditable path. | Eligibility, request, approval, pickup, inspection, disposition, refund, and analytics are covered. | A customer returns an item and the inspection result is recorded. | Eligibility rules, request flow, inspection, disposition, refund links. | Test eligibility, uploads, states, disposition, and review queues. |
| `FR-ADM-*` | Admin console and platform configuration. | Operators need governed tools. | Dashboard, roles, management, configuration, moderation, and audit controls are covered. | An admin reviews a flagged product within permission. | Admin dashboard, permissions, management screens, config, audit controls. | Test RBAC, config effects, moderation queues, and audit records. |
| `FR-MKT-*` | Marketing, loyalty, and engagement. | Growth needs consent-aware communication. | Notifications, optional campaigns/loyalty, reminders, merchandising, and reports are covered. | A back-in-stock alert is sent only with consent. | Notifications, optional campaigns, consent controls, banners, reports. | Test providers, consent, optional scope, attribution, and permissions. |
| `FR-REV-*` | Reviews, ratings, and moderation. | Feedback must be useful and safe. | Ratings, reviews, optional media, verified-purchase, moderation, and detection are covered. | Only a verified buyer can leave a product review. | Review data, eligibility, moderation, optional responses, spam detection. | Test eligibility, media, reporting, appeals, and suspicious content. |
| `FR-SUP-*` | Customer support and disputes. | Issues need a tracked workflow. | Tickets, history, optional chat, help content, disputes, SLA, and analytics are covered. | A support agent opens a dispute about a delayed shipment. | Tickets, notes, optional chat, FAQs, disputes, SLA, CSAT. | Test workflow, access boundaries, disputes, selected chat, and reports. |
| `FR-CMS-*` | Content management and SEO. | Public content must be managed safely. | Pages, optional blog, SEO fields, sitemap, robots, redirects, and links are covered. | An admin publishes the Returns policy page. | Content screens, static pages, SEO fields, sitemap, redirects. | Test publishing, SEO output, index controls, and redirects. |
| `FR-BI-*` | Reports and business intelligence. | Decisions need trustworthy data. | Sales, vendor, product, customer, fulfilment, payment, and campaign reports are covered. | A finance user exports a reconciliation report within permission. | Reports, filters, exports, and role-based access. | Test calculations, filters, exports, and role restrictions. |
| `FR-COMP-*` | Security, privacy, and compliance. | Protection is mandatory. | Auth, RBAC, encryption, validation, gateway security, privacy, fraud, and scans are covered. | A privileged action requires step-up authentication and an audit entry. | Auth, RBAC, encryption, secrets handling, validation, privacy workflows, scans. | Test attacks, RBAC, injection/XSS/CSRF, secrets, privacy, and fraud queues. |
| `FR-MOB-*` | Mobile and multi-channel. | Users may use different devices. | Responsive web is mandatory; apps and push features are conditional. | The storefront works on a phone before any native app decision is made. | Responsive web first; shared API contracts; apps only when in scope. | Test responsive layouts now; test apps/push/deep links only if in scope. |
| `FR-OPS-*` | Platform operations and reliability. | The platform must be supportable. | Environments, telemetry, backups, pipelines, testing, and recovery decisions are covered. | An alert fires when payment failures rise. | Environment separation, logs/metrics/traces, backups, CI/CD, rollback. | Check environments, alerts, restore, gates, and RPO/RTO decision status. |

### Journeys and non-functional families

| ID family | What is it? | Why do we need it? | How does it work? | Example TradeOrbit case | What do I need to build? | How do I test it? |
|---|---|---|---|---|---|---|
| `AC-JOURNEY-*` | Critical end-to-end outcomes. | Full journeys prove the product works. | Each ID names a complete outcome across many parts of the system. | Customer purchase, seller onboarding, returns, and settlement are journeys. | Joined-up flows with role checks and traceable outcomes. | Run E2E tests with failure, duplicate, and unauthorized paths. |
| `NFR-PERF-*` | Speed and web performance. | Slow pages lose users. | Optimization is required; numeric targets are decision-required. | Search results should remain responsive at expected traffic. | Latency work, Core Web Vitals, caching, image delivery, query tuning. | Measure performance; do not invent missing numeric targets. |
| `NFR-SCAL-*` | Growth and scalability. | Traffic and catalogue size can grow. | Design for growth and test expected peak traffic. | More vendors and products must not break browsing. | Scalable design and load-test scenarios. | Run load tests and review capacity evidence. |
| `NFR-AVAIL-*` | Availability. | Users need an agreed uptime design. | Uptime, windows, failover, and dependencies are decision-required. | Failover topology is not assumed. | Await decisions, then design availability behaviour. | Review failover and dependencies; keep missing targets unresolved. |
| `NFR-REL-*` | Reliability. | Failures must not corrupt state. | Transactions, retries with backoff, idempotency, queues, and graceful failure are used. | A retry does not create a second order. | Transactions, retry policy, idempotency, queue monitoring. | Test failures, duplicates, retries, and queue backlogs. |
| `NFR-SEC-*` | Security quality. | Threats must be considered continuously. | Threat modelling, secure coding, access control, encryption, scanning, and response are used. | A suspicious login is reviewed through a security control. | Secure coding, scanning, incident response, and access control. | Run threat reviews, security tests, scans, and response walkthroughs. |
| `NFR-ACC-*` | Accessibility. | More users can use the site. | WCAG 2.2 AA is a target where feasible; exact scope keeps its qualifier. | Keyboard users can complete checkout. | Keyboard access, semantics, contrast, screen-reader support. | Test keyboard, focus, labels, contrast, and screen readers. |
| `NFR-COMP-*` | Browser and device compatibility. | Users have different devices. | Current major browsers are supported; breakpoints are to agree. | The storefront works on current desktop and mobile browsers. | Responsive layouts and browser support. | Test browsers/devices; keep breakpoints unresolved until agreed. |
| `NFR-MAINT-*` | Maintainability. | Code must stay changeable. | Modular code, standards, ADRs, and setup docs are used. | A new developer can set up the project from docs. | Modules, standards, ADRs, setup guide. | Review boundaries, lint/type checks, ADRs, and setup steps. |
| `NFR-OBS-*` | Observability. | Teams need to see failures early. | Structured logs, metrics, traces, dashboards, and actionable alerts are used. | Queue backlog appears on a dashboard and raises an alert. | Central telemetry and alert rules. | Verify telemetry appears and alerts fire on defined conditions. |
| `NFR-REC-*` | Recovery. | Disasters need agreed objectives. | RPO/RTO, retention, drills, and DR procedures are decision-required. | No RPO value is invented. | Agree objectives, then document restore and DR steps. | Run restore drills; keep missing objectives unresolved. |
| `NFR-LOC-*` | Localization. | Multi-region support needs formatting rules. | Currency, locale, language, time zone, date, and tax formatting are conditional. | A second region is not formatted until region scope is decided. | Conditional formatting plan. | Confirm region scope first, then test relevant formats. |
| `NFR-DATA-*` | Data protection. | Personal and sensitive data need policy. | Classification, retention, consent, export/deletion, and access policies are defined. | A customer export request follows documented privacy rules. | Policies, consent records, export/deletion workflows, access controls. | Test policy enforcement and restricted access. |

### Technical, data, security, and delivery families

| ID family | What is it? | Why do we need it? | How does it work? | Example TradeOrbit case | What do I need to build? | How do I test it? |
|---|---|---|---|---|---|---|
| `TEC-*` | Recommended technologies. | A shared stack reduces inconsistency. | One tool is suggested per responsibility; some choices remain open. | Next.js is recommended for the storefront and NestJS for the backend. | Approved stack usage and decision records for open choices. | Check stack choices, lint/type/build, containers, and tests. |
| `ARC-*` | Architecture layers. | Boundaries make work reviewable. | Presentation, API, domain, data, integration, async, edge, and operations layers are described. | Payment logic is separated from the storefront UI. | Modular monolith structure with explicit interfaces and data ownership. | Review boundaries, interfaces, ownership, and ADRs. |
| `DB-*` | Database rules. | Data must remain correct. | Keys, constraints, indexes, transactions, idempotency keys, decimals, ledgers, and history are used. | Money is stored as fixed-precision decimal with a currency code. | PostgreSQL schema, migrations, constraints, and transactions. | Test constraints, rollback, duplicates, precision, history, and plans. |
| `DB-ENT-*` | Example entity coverage. | The data model must cover every domain. | Tables are listed as examples, not as a decision to build every optional entity early. | Orders, shipments, refunds, and audit logs are covered in ERD work. | ERD/schema coverage by domain. | Review entity relationships, constraints, and conditional scope. |
| `API-*` | API standards. | Clients need a stable contract. | REST, OpenAPI, envelopes, validation, pagination, auth, idempotency, and webhook rules are used. | `/api/v1/products` is versioned and documented. | Versioned APIs, OpenAPI docs, validation, auth checks, and webhook protection. | Test contracts, errors, pagination, auth, idempotency, replay. |
| `INT-*` | External integrations. | Providers supply money, shipping, messaging, tax, and analytics capabilities. | Capability is required or conditional; provider and model choices are explicit. | Payment provider choice remains unresolved. | Adapters and sandbox configuration for selected providers. | Test sandbox flows, signatures, consent, and decision status. |
| `SEC-*` | Security and privacy controls checklist. | Marketplace data and money need protection. | TLS, hashing, RBAC, validation, secrets, tokenization, webhooks, audit, and scans are used. | Seller bank changes are audited. | Security controls and privacy checks. | Run negative security tests, secret scans, replay tests, and reviews. |
| `QA-*` | Test levels. | Evidence must match the risk. | Each ID names a level and coverage area. | API tests check auth, validation, errors, and idempotency. | Automated unit, integration, API, E2E, security, performance, and accessibility suites. | Run the named suite and record actual results. |
| `DEP-*` | DevOps and deployment. | Releases must be repeatable and reversible. | Environments, Docker, CI/CD, database, media, telemetry, and runbooks are covered. | Production deployment needs approval and rollback. | Environment setup, pipeline, backups, media delivery, alerts, docs. | Verify isolation, gates, smoke tests, rollback, restore, and alerts. |
| `UX-*` | Design deliverables. | Screens need review before implementation. | Discovery, IA, wireframes, design system, high-fidelity screens, states, and review are named. | Cart and checkout screens show all required states. | Figma artefacts and accessible design rules. | Review completeness, responsiveness, states, accessibility, sign-off. |
| `DEL-*` | Project deliverables. | Work must be handed over reviewably. | Each ID names an artefact and links it to requirements. | Code alone is not enough; tests and docs are deliverables. | Named specs, designs, code, integrations, tests, deployment, runbooks, docs. | Review each artefact against acceptance criteria. |

### Planning and decision families

| ID family | What is it? | Why do we need it? | How does it work? | Example TradeOrbit case | What do I need to build? | How do I test it? |
|---|---|---|---|---|---|---|
| `PHASE-*` | Suggested delivery phases. | Large scope needs a safe sequence. | Each phase has scope and exit criteria; all are recommendations. | Foundation precedes commerce; hardening precedes launch. | Phase plans and exit evidence. | Review artefacts and exit criteria; do not treat as approval. |
| `MVP-*` | Recommended first-release baseline. | Teams need a starting priority list. | Items prioritise core identity, sellers, catalogue, commerce, operations, and admin. | Multi-vendor checkout is an early priority. | Prioritized work aligned to the baseline. | Check scope evidence and conditional-feature status. |
| `LAUNCH-*` | Launch checklist. | Readiness needs proof. | Each ID names one readiness item. | Backups must be restored in a test environment. | Evidence, approvals, checks, and operational ownership. | Verify evidence and owner; do not mark complete without proof. |
| `DEC-*` | Unresolved decisions. | No one should invent missing answers. | Each ID records question, Status, and Impact. | Commission rules and payment provider are unresolved. | Questions, placeholders, and decision records. | Search code/config for invented answers and check decision status. |

## Beginner mapping table for every SRS ID

This table covers every SRS ID in the original. Status wording is included in the plain-English meaning column so conditional, decision-required, recommendation, and mandatory meanings are not lost. This table is not a completion record.

| ID | plain-English meaning | development work | how to test |
|---|---|---|---|
| SRS-OV-001 | Status: Mandatory. Meaning: Deliver a full-featured multi-vendor commerce platform supporting customers, sellers, administrators, and delivery operations. | Confirm the full multi-vendor scope, lifecycle, and planning baseline in designs and task breakdowns. | Review scope coverage against each overview ID and check no feature is claimed as implemented. |
| SRS-OV-002 | Status: Mandatory. Meaning: Support the complete commerce lifecycle: seller onboarding, cataloguing, product discovery, shopping, checkout, payment, inventory, fulfilment, shipping, returns, refunds, seller settlements, customer support, marketing, analytics, and platform administration. | Confirm the full multi-vendor scope, lifecycle, and planning baseline in designs and task breakdowns. | Review scope coverage against each overview ID and check no feature is claimed as implemented. |
| SRS-OV-003 | Status: Mandatory. Meaning: Support multiple vendors selling through one marketplace; each vendor can manage an approved storefront, products, stock, and orders. | Confirm the full multi-vendor scope, lifecycle, and planning baseline in designs and task breakdowns. | Review scope coverage against each overview ID and check no feature is claimed as implemented. |
| SRS-OV-004 | Status: Mandatory. Meaning: Marketplace operator controls policies, approvals, commissions, payments, customer experience, and platform-wide reporting. | Confirm the full multi-vendor scope, lifecycle, and planning baseline in designs and task breakdowns. | Review scope coverage against each overview ID and check no feature is claimed as implemented. |
| SRS-OV-005 | Status: Recommendation. Meaning: Begin with a modular monolith, designed for future service extraction where scale requires it. | Confirm the full multi-vendor scope, lifecycle, and planning baseline in designs and task breakdowns. | Review scope coverage against each overview ID and check no feature is claimed as implemented. |
| SRS-OV-006 | Status: Recommendation. Meaning: Use TypeScript, Next.js, NestJS, PostgreSQL, Redis, object storage, and containerized deployment as the technology baseline. | Confirm the full multi-vendor scope, lifecycle, and planning baseline in designs and task breakdowns. | Review scope coverage against each overview ID and check no feature is claimed as implemented. |
| SRS-OV-007 | Status: Mandatory. Meaning: Treat all listed features as scope requirements, not claims of implementation. Each module must be converted into detailed user stories, business rules, API contracts, data design, test cases, and acceptance criteria before development. | Confirm the full multi-vendor scope, lifecycle, and planning baseline in designs and task breakdowns. | Review scope coverage against each overview ID and check no feature is claimed as implemented. |
| SRS-OBJ-001 | Status: Conditional for native apps. Meaning: Deliver a consistent shopping experience across desktop, mobile web, and, where in scope, native mobile apps. | Build role workspaces, multi-seller flows, secure payments/orders, and documented APIs with tests. | Check each objective through role-based journeys, finance flows, API docs, monitoring, backups, and automated tests. |
| SRS-OBJ-002 | Status: Mandatory. Meaning: Provide separate, permission-controlled workspaces for customers, vendors, administrators, and fulfilment teams. | Build role workspaces, multi-seller flows, secure payments/orders, and documented APIs with tests. | Check each objective through role-based journeys, finance flows, API docs, monitoring, backups, and automated tests. |
| SRS-OBJ-003 | Status: Mandatory. Meaning: Support multiple sellers, vendor-specific catalogues and inventory, split orders, and commission-based settlements. | Build role workspaces, multi-seller flows, secure payments/orders, and documented APIs with tests. | Check each objective through role-based journeys, finance flows, API docs, monitoring, backups, and automated tests. |
| SRS-OBJ-004 | Status: Mandatory. Meaning: Provide secure payment processing, reliable order state management, and traceable refunds and payouts. | Build role workspaces, multi-seller flows, secure payments/orders, and documented APIs with tests. | Check each objective through role-based journeys, finance flows, API docs, monitoring, backups, and automated tests. |
| SRS-OBJ-005 | Status: Mandatory. Meaning: Build an extensible platform with documented APIs, integrations, monitoring, backups, and automated tests. | Build role workspaces, multi-seller flows, secure payments/orders, and documented APIs with tests. | Check each objective through role-based journeys, finance flows, API docs, monitoring, backups, and automated tests. |
| SRS-ROLE-001 | Status: Conditional where permitted. Meaning: Guest visitor: Browse catalogue, search, view products, add items to cart where permitted, register, or check out as guest. | Create role definitions and permission-controlled workspaces for each named role; keep legacy pointers as pointers. | Use an RBAC matrix, positive and negative role tests, and cross-user access checks. |
| SRS-ROLE-002 | Status: Mandatory. Meaning: Customer: Manage profile/addresses, place and pay for orders, track deliveries, request returns, review products, contact support. | Create role definitions and permission-controlled workspaces for each named role; keep legacy pointers as pointers. | Use an RBAC matrix, positive and negative role tests, and cross-user access checks. |
| SRS-ROLE-003 | Status: Mandatory. Meaning: Vendor / seller: Complete onboarding and KYC, manage store profile, submit products, maintain stock/prices, process assigned orders, view commissions/settlements. | Create role definitions and permission-controlled workspaces for each named role; keep legacy pointers as pointers. | Use an RBAC matrix, positive and negative role tests, and cross-user access checks. |
| SRS-ROLE-004 | Status: Mandatory. Meaning: Vendor staff: Perform vendor tasks according to permissions assigned by the vendor owner. | Create role definitions and permission-controlled workspaces for each named role; keep legacy pointers as pointers. | Use an RBAC matrix, positive and negative role tests, and cross-user access checks. |
| SRS-ROLE-005 | Status: Mandatory. Meaning: Marketplace administrator: Manage users, sellers, catalogue, categories, orders, payments, commissions, promotions, policies, platform settings. | Create role definitions and permission-controlled workspaces for each named role; keep legacy pointers as pointers. | Use an RBAC matrix, positive and negative role tests, and cross-user access checks. |
| SRS-ROLE-006 | Status: Mandatory. Meaning: Support agent: Manage tickets, customer/vendor conversations, escalations, SLA targets. | Create role definitions and permission-controlled workspaces for each named role; keep legacy pointers as pointers. | Use an RBAC matrix, positive and negative role tests, and cross-user access checks. |
| SRS-ROLE-007 | Status: Mandatory. Meaning: Warehouse / fulfilment operator: Manage receiving, stock movements, picking, packing, dispatch, returns inspection. | Create role definitions and permission-controlled workspaces for each named role; keep legacy pointers as pointers. | Use an RBAC matrix, positive and negative role tests, and cross-user access checks. |
| SRS-ROLE-008 | Status: Mandatory. Meaning: Delivery / logistics operator: Receive shipment assignments, update pickup/delivery milestones, record delivery exceptions and proof of delivery. | Create role definitions and permission-controlled workspaces for each named role; keep legacy pointers as pointers. | Use an RBAC matrix, positive and negative role tests, and cross-user access checks. |
| SRS-ROLE-009 | Status: Mandatory. Meaning: Finance operator: Reconcile transactions, process eligible refunds, review commissions, approve settlements, export financial reports. | Create role definitions and permission-controlled workspaces for each named role; keep legacy pointers as pointers. | Use an RBAC matrix, positive and negative role tests, and cross-user access checks. |
| SRS-ROLE-010 | Status: Mandatory. Meaning: Super administrator: Manage global configuration, administrator roles, permissions, audit records, security settings. | Create role definitions and permission-controlled workspaces for each named role; keep legacy pointers as pointers. | Use an RBAC matrix, positive and negative role tests, and cross-user access checks. |
| SRS-ROLE-011 | Status: Mandatory. Meaning: Customer storefront: Primary public/customer client surface. Retained as a legacy pointer; use `SRS-PORTAL-001`. | Create role definitions and permission-controlled workspaces for each named role; keep legacy pointers as pointers. | Use an RBAC matrix, positive and negative role tests, and cross-user access checks. |
| SRS-ROLE-012 | Status: Mandatory. Meaning: Vendor portal: Permission-controlled vendor workspace. Retained as a legacy pointer; use `SRS-PORTAL-002`. | Create role definitions and permission-controlled workspaces for each named role; keep legacy pointers as pointers. | Use an RBAC matrix, positive and negative role tests, and cross-user access checks. |
| SRS-ROLE-013 | Status: Mandatory. Meaning: Admin console / admin portal: Permission-controlled marketplace operations workspace. Retained as a legacy pointer; use `SRS-PORTAL-003`. | Create role definitions and permission-controlled workspaces for each named role; keep legacy pointers as pointers. | Use an RBAC matrix, positive and negative role tests, and cross-user access checks. |
| SRS-ROLE-014 | Status: Conditional. Meaning: Customer, vendor, delivery mobile apps: Optional apps using React Native. Retained as a legacy pointer; use `SRS-CHANNEL-001` and `FR-MOB-002`. | Create role definitions and permission-controlled workspaces for each named role; keep legacy pointers as pointers. | Use an RBAC matrix, positive and negative role tests, and cross-user access checks. |
| SRS-ROLE-015 | Status: Decision required. Meaning: Support, warehouse, delivery, finance workspaces: Roles are named in §2, but the PDF does not name dedicated portals for them. Retained as a legacy pointer; the workspace question is tracked only in `DEC-011`. | Create role definitions and permission-controlled workspaces for each named role; keep legacy pointers as pointers. | Use an RBAC matrix, positive and negative role tests, and cross-user access checks. |
| SRS-PORTAL-001 | Status: Mandatory. Meaning: Customer storefront: Primary public/customer client surface. | Build customer storefront, vendor portal, and admin console surfaces with role-aware navigation. | Check portal access, navigation, and negative authorization for each role. |
| SRS-PORTAL-002 | Status: Mandatory. Meaning: Vendor portal: Permission-controlled vendor workspace. | Build customer storefront, vendor portal, and admin console surfaces with role-aware navigation. | Check portal access, navigation, and negative authorization for each role. |
| SRS-PORTAL-003 | Status: Mandatory. Meaning: Admin console / admin portal: Permission-controlled marketplace operations workspace. | Build customer storefront, vendor portal, and admin console surfaces with role-aware navigation. | Check portal access, navigation, and negative authorization for each role. |
| SRS-CHANNEL-001 | Status: Conditional. Meaning: Customer, vendor, delivery mobile apps: Optional apps using React Native. | Treat mobile apps as optional until their decision is resolved; prepare API contracts that can serve web and mobile. | Confirm scope decision first, then test only in-scope channels and shared API behavior. |
| FR-CAT-001 | Status: Mandatory. Meaning: Create, view, edit, archive, and delete products subject to permissions and order-history retention rules. | Build product/category data, variants, media, status workflow, moderation, bulk import/export, and groupings. | Test validation, status transitions, duplicate checks, import errors, permissions, and public visibility. |
| FR-CAT-002 | Status: Mandatory. Meaning: Maintain product categories, subcategories, brands, collections, tags, and attributes. | Build product/category data, variants, media, status workflow, moderation, bulk import/export, and groupings. | Test validation, status transitions, duplicate checks, import errors, permissions, and public visibility. |
| FR-CAT-003 | Status: Mandatory. Meaning: Maintain product variants such as size, colour, material, model, and pack size, with variant-level SKU, price, and stock. | Build product/category data, variants, media, status workflow, moderation, bulk import/export, and groupings. | Test validation, status transitions, duplicate checks, import errors, permissions, and public visibility. |
| FR-CAT-004 | Status: Mandatory. Meaning: Maintain product titles, descriptions, specifications, dimensions, weight, images, video, and downloadable documents. | Build product/category data, variants, media, status workflow, moderation, bulk import/export, and groupings. | Test validation, status transitions, duplicate checks, import errors, permissions, and public visibility. |
| FR-CAT-005 | Status: Mandatory. Meaning: Maintain SKU, barcode, and product identifiers; configurable product attributes and validation. | Build product/category data, variants, media, status workflow, moderation, bulk import/export, and groupings. | Test validation, status transitions, duplicate checks, import errors, permissions, and public visibility. |
| FR-CAT-006 | Status: Mandatory. Meaning: Support product status workflow: draft, submitted, under review, approved, rejected, published, inactive, out of stock. | Build product/category data, variants, media, status workflow, moderation, bulk import/export, and groupings. | Test validation, status transitions, duplicate checks, import errors, permissions, and public visibility. |
| FR-CAT-007 | Status: Mandatory. Meaning: Support vendor product submission and admin moderation; duplicate listing detection and content guidelines. | Build product/category data, variants, media, status workflow, moderation, bulk import/export, and groupings. | Test validation, status transitions, duplicate checks, import errors, permissions, and public visibility. |
| FR-CAT-008 | Status: Mandatory. Meaning: Support bulk import/export using CSV or Excel, with validation reports and error handling. | Build product/category data, variants, media, status workflow, moderation, bulk import/export, and groupings. | Test validation, status transitions, duplicate checks, import errors, permissions, and public visibility. |
| FR-CAT-009 | Status: Mandatory. Meaning: Support featured, new, trending, best-selling, related, and frequently-bought-together product groupings. | Build product/category data, variants, media, status workflow, moderation, bulk import/export, and groupings. | Test validation, status transitions, duplicate checks, import errors, permissions, and public visibility. |
| FR-CAT-010 | Status: Conditional. Meaning: Support physical, digital, configurable, bundle, and service products where applicable. | Build product/category data, variants, media, status workflow, moderation, bulk import/export, and groupings. | Test validation, status transitions, duplicate checks, import errors, permissions, and public visibility. |
| FR-VEN-001 | Status: Mandatory. Meaning: Seller registration, email/phone verification, application workflow, and onboarding checklist. | Build seller registration, verification, profile, dashboard, product/stock settings, commission views, settlements, scorecards, and staff controls. | Test onboarding, KYC states, permissions, moderation, settlement views, staff activity, and sensitive-data protection. |
| FR-VEN-002 | Status: Mandatory. Meaning: KYC/business verification, tax details, bank account verification, and document expiry tracking. | Build seller registration, verification, profile, dashboard, product/stock settings, commission views, settlements, scorecards, and staff controls. | Test onboarding, KYC states, permissions, moderation, settlement views, staff activity, and sensitive-data protection. |
| FR-VEN-003 | Status: Mandatory. Meaning: Vendor approval, rejection, suspension, reactivation, and termination with recorded reasons. | Build seller registration, verification, profile, dashboard, product/stock settings, commission views, settlements, scorecards, and staff controls. | Test onboarding, KYC states, permissions, moderation, settlement views, staff activity, and sensitive-data protection. |
| FR-VEN-004 | Status: Mandatory. Meaning: Vendor storefront profile, logo, banner, description, policies, operating hours, and contact details. | Build seller registration, verification, profile, dashboard, product/stock settings, commission views, settlements, scorecards, and staff controls. | Test onboarding, KYC states, permissions, moderation, settlement views, staff activity, and sensitive-data protection. |
| FR-VEN-005 | Status: Mandatory. Meaning: Vendor dashboard for sales, orders, returns, inventory, ratings, commissions, and payouts. | Build seller registration, verification, profile, dashboard, product/stock settings, commission views, settlements, scorecards, and staff controls. | Test onboarding, KYC states, permissions, moderation, settlement views, staff activity, and sensitive-data protection. |
| FR-VEN-006 | Status: Mandatory. Meaning: Vendor-specific product listing, pricing, stock, shipping settings, and fulfilment preferences. | Build seller registration, verification, profile, dashboard, product/stock settings, commission views, settlements, scorecards, and staff controls. | Test onboarding, KYC states, permissions, moderation, settlement views, staff activity, and sensitive-data protection. |
| FR-VEN-007 | Status: Mandatory. Meaning: Admin product moderation and vendor policy compliance. | Build seller registration, verification, profile, dashboard, product/stock settings, commission views, settlements, scorecards, and staff controls. | Test onboarding, KYC states, permissions, moderation, settlement views, staff activity, and sensitive-data protection. |
| FR-VEN-008 | Status: Mandatory. Meaning: Commission plans by vendor, category, product, or campaign; fixed and percentage models. | Build seller registration, verification, profile, dashboard, product/stock settings, commission views, settlements, scorecards, and staff controls. | Test onboarding, KYC states, permissions, moderation, settlement views, staff activity, and sensitive-data protection. |
| FR-VEN-009 | Status: Conditional. Meaning: Vendor subscription plans and feature entitlements if subscriptions are enabled. | Build seller registration, verification, profile, dashboard, product/stock settings, commission views, settlements, scorecards, and staff controls. | Test onboarding, KYC states, permissions, moderation, settlement views, staff activity, and sensitive-data protection. |
| FR-VEN-010 | Status: Mandatory. Meaning: Settlement statements, payout requests, payout approvals, payment status, and reconciliation. | Build seller registration, verification, profile, dashboard, product/stock settings, commission views, settlements, scorecards, and staff controls. | Test onboarding, KYC states, permissions, moderation, settlement views, staff activity, and sensitive-data protection. |
| FR-VEN-011 | Status: Mandatory. Meaning: Vendor performance scorecards, service-level metrics, cancellation rate, and return rate. | Build seller registration, verification, profile, dashboard, product/stock settings, commission views, settlements, scorecards, and staff controls. | Test onboarding, KYC states, permissions, moderation, settlement views, staff activity, and sensitive-data protection. |
| FR-VEN-012 | Status: Mandatory. Meaning: Vendor staff accounts, role permissions, and activity history. | Build seller registration, verification, profile, dashboard, product/stock settings, commission views, settlements, scorecards, and staff controls. | Test onboarding, KYC states, permissions, moderation, settlement views, staff activity, and sensitive-data protection. |
| FR-CUS-001 | Status: Conditional for social sign-in. Meaning: Registration, login, logout, email/phone verification, password reset, and optional social sign-in. | Build registration, profile, addresses, segmentation, history, optional wallet/loyalty ledgers, and privacy requests. | Test identity flows, validation, address rules, history access, ledger behavior where enabled, and privacy workflows. |
| FR-CUS-002 | Status: Mandatory. Meaning: Customer profile, preferences, communication consent, and account security settings. | Build registration, profile, addresses, segmentation, history, optional wallet/loyalty ledgers, and privacy requests. | Test identity flows, validation, address rules, history access, ledger behavior where enabled, and privacy workflows. |
| FR-CUS-003 | Status: Mandatory. Meaning: Multiple saved addresses, default address, and address validation. | Build registration, profile, addresses, segmentation, history, optional wallet/loyalty ledgers, and privacy requests. | Test identity flows, validation, address rules, history access, ledger behavior where enabled, and privacy workflows. |
| FR-CUS-004 | Status: Mandatory. Meaning: Customer segmentation, tags, account status, and support history. | Build registration, profile, addresses, segmentation, history, optional wallet/loyalty ledgers, and privacy requests. | Test identity flows, validation, address rules, history access, ledger behavior where enabled, and privacy workflows. |
| FR-CUS-005 | Status: Mandatory. Meaning: Order history, invoices, returns, refunds, wishlist, saved items, and recently viewed products. | Build registration, profile, addresses, segmentation, history, optional wallet/loyalty ledgers, and privacy requests. | Test identity flows, validation, address rules, history access, ledger behavior where enabled, and privacy workflows. |
| FR-CUS-006 | Status: Conditional. Meaning: Customer wallet or store credit only with ledger-based accounting and clear terms. | Build registration, profile, addresses, segmentation, history, optional wallet/loyalty ledgers, and privacy requests. | Test identity flows, validation, address rules, history access, ledger behavior where enabled, and privacy workflows. |
| FR-CUS-007 | Status: Conditional. Meaning: Loyalty points, membership tiers, and reward redemption if enabled. | Build registration, profile, addresses, segmentation, history, optional wallet/loyalty ledgers, and privacy requests. | Test identity flows, validation, address rules, history access, ledger behavior where enabled, and privacy workflows. |
| FR-CUS-008 | Status: Mandatory. Meaning: Account deletion/export request handling in accordance with applicable privacy obligations. | Build registration, profile, addresses, segmentation, history, optional wallet/loyalty ledgers, and privacy requests. | Test identity flows, validation, address rules, history access, ledger behavior where enabled, and privacy workflows. |
| FR-DISC-001 | Status: Mandatory. Meaning: Responsive homepage, navigation, category pages, brand pages, campaign landing pages, and product detail pages. | Build responsive pages, search, filters, sorting, recommendations, SEO metadata, and accessible availability information. | Test search relevance where defined, filters, sorting, SEO output, responsive layout, keyboard access, and clear product states. |
| FR-DISC-002 | Status: Mandatory. Meaning: Keyword search, autocomplete, typo tolerance, synonyms, and relevance ranking. | Build responsive pages, search, filters, sorting, recommendations, SEO metadata, and accessible availability information. | Test search relevance where defined, filters, sorting, SEO output, responsive layout, keyboard access, and clear product states. |
| FR-DISC-003 | Status: Mandatory. Meaning: Filters for category, brand, price, rating, availability, attributes, vendor, and delivery options. | Build responsive pages, search, filters, sorting, recommendations, SEO metadata, and accessible availability information. | Test search relevance where defined, filters, sorting, SEO output, responsive layout, keyboard access, and clear product states. |
| FR-DISC-004 | Status: Mandatory. Meaning: Sorting by relevance, price, popularity, newest, and rating. | Build responsive pages, search, filters, sorting, recommendations, SEO metadata, and accessible availability information. | Test search relevance where defined, filters, sorting, SEO output, responsive layout, keyboard access, and clear product states. |
| FR-DISC-005 | Status: Mandatory. Meaning: Product comparison, wishlist, recently viewed, and related product recommendations. | Build responsive pages, search, filters, sorting, recommendations, SEO metadata, and accessible availability information. | Test search relevance where defined, filters, sorting, SEO output, responsive layout, keyboard access, and clear product states. |
| FR-DISC-006 | Status: Mandatory. Meaning: SEO-friendly URLs, metadata, canonical URLs, structured data, and indexation controls. | Build responsive pages, search, filters, sorting, recommendations, SEO metadata, and accessible availability information. | Test search relevance where defined, filters, sorting, SEO output, responsive layout, keyboard access, and clear product states. |
| FR-DISC-007 | Status: Mandatory. Meaning: Accessible interface, clear product availability, and transparent delivery/return information. | Build responsive pages, search, filters, sorting, recommendations, SEO metadata, and accessible availability information. | Test search relevance where defined, filters, sorting, SEO output, responsive layout, keyboard access, and clear product states. |
| FR-PRICE-001 | Status: Mandatory. Meaning: Base price, sale price, vendor price, variant price, and scheduled price changes. | Build prices, promotion rules, eligibility checks, configurable tax rules, and audit records for calculations. | Use unit tests for calculation and eligibility, plus checks for conflicting discounts and audit entries; do not assume missing values. |
| FR-PRICE-002 | Status: Mandatory. Meaning: Coupon codes, percentage/fixed discounts, minimum basket rules, and usage limits. | Build prices, promotion rules, eligibility checks, configurable tax rules, and audit records for calculations. | Use unit tests for calculation and eligibility, plus checks for conflicting discounts and audit entries; do not assume missing values. |
| FR-PRICE-003 | Status: Mandatory. Meaning: Campaigns, flash sales, seasonal promotions, bundles, volume discounts, and buy-X-get-Y offers. | Build prices, promotion rules, eligibility checks, configurable tax rules, and audit records for calculations. | Use unit tests for calculation and eligibility, plus checks for conflicting discounts and audit entries; do not assume missing values. |
| FR-PRICE-004 | Status: Mandatory. Meaning: Promotion eligibility by customer segment, vendor, category, product, channel, or date. | Build prices, promotion rules, eligibility checks, configurable tax rules, and audit records for calculations. | Use unit tests for calculation and eligibility, plus checks for conflicting discounts and audit entries; do not assume missing values. |
| FR-PRICE-005 | Status: Conditional. Meaning: Shipping discounts, gift cards, and store credit if supported. | Build prices, promotion rules, eligibility checks, configurable tax rules, and audit records for calculations. | Use unit tests for calculation and eligibility, plus checks for conflicting discounts and audit entries; do not assume missing values. |
| FR-PRICE-006 | Status: Mandatory. Meaning: Tax rules configurable by jurisdiction and product category; tax-inclusive/exclusive display. | Build prices, promotion rules, eligibility checks, configurable tax rules, and audit records for calculations. | Use unit tests for calculation and eligibility, plus checks for conflicting discounts and audit entries; do not assume missing values. |
| FR-PRICE-007 | Status: Mandatory. Meaning: Price calculation audit trail and prevention of conflicting or invalid discounts. | Build prices, promotion rules, eligibility checks, configurable tax rules, and audit records for calculations. | Use unit tests for calculation and eligibility, plus checks for conflicting discounts and audit entries; do not assume missing values. |
| FR-CHK-001 | Status: Mandatory. Meaning: Add/update/remove cart lines, quantity checks, save-for-later, and cart persistence. | Build cart operations, policy-controlled guest checkout, address/shipping choice, server-side totals, stock reservation, and idempotent order submission. | Test cart changes, total calculation on the server, reservation expiry/release, duplicate clicks, and checkout policy. |
| FR-CHK-002 | Status: Conditional. Meaning: Guest and authenticated checkout, subject to business policy. | Build cart operations, policy-controlled guest checkout, address/shipping choice, server-side totals, stock reservation, and idempotent order submission. | Test cart changes, total calculation on the server, reservation expiry/release, duplicate clicks, and checkout policy. |
| FR-CHK-003 | Status: Mandatory. Meaning: Address selection, shipping method selection, delivery estimate, and order summary. | Build cart operations, policy-controlled guest checkout, address/shipping choice, server-side totals, stock reservation, and idempotent order submission. | Test cart changes, total calculation on the server, reservation expiry/release, duplicate clicks, and checkout policy. |
| FR-CHK-004 | Status: Conditional for gift card/wallet. Meaning: Coupon, gift card, or wallet application with transparent calculation. | Build cart operations, policy-controlled guest checkout, address/shipping choice, server-side totals, stock reservation, and idempotent order submission. | Test cart changes, total calculation on the server, reservation expiry/release, duplicate clicks, and checkout policy. |
| FR-CHK-005 | Status: Mandatory. Meaning: Tax, shipping, discount, and final payable amount calculation on the server. | Build cart operations, policy-controlled guest checkout, address/shipping choice, server-side totals, stock reservation, and idempotent order submission. | Test cart changes, total calculation on the server, reservation expiry/release, duplicate clicks, and checkout policy. |
| FR-CHK-006 | Status: Mandatory. Meaning: Inventory reservation with expiry and safe release when checkout fails or times out. | Build cart operations, policy-controlled guest checkout, address/shipping choice, server-side totals, stock reservation, and idempotent order submission. | Test cart changes, total calculation on the server, reservation expiry/release, duplicate clicks, and checkout policy. |
| FR-CHK-007 | Status: Mandatory. Meaning: Checkout validation, idempotent order submission, and duplicate-click protection. | Build cart operations, policy-controlled guest checkout, address/shipping choice, server-side totals, stock reservation, and idempotent order submission. | Test cart changes, total calculation on the server, reservation expiry/release, duplicate clicks, and checkout policy. |
| FR-CHK-008 | Status: Conditional. Meaning: Abandoned cart events and recovery messaging subject to consent. | Build cart operations, policy-controlled guest checkout, address/shipping choice, server-side totals, stock reservation, and idempotent order submission. | Test cart changes, total calculation on the server, reservation expiry/release, duplicate clicks, and checkout policy. |
| FR-PAY-001 | Status: Mandatory. Meaning: Payment gateway integration using hosted/tokenized payment flows; never store raw card data. | Build hosted/tokenized gateway flows, payment states, verified webhooks, refunds, ledgers, settlements, documents, and exports. | Test sandbox payments, retries, duplicate webhooks, refunds, ledger integrity, and provider/region-specific methods only where configured. |
| FR-PAY-002 | Status: Conditional by provider/region. Meaning: Support configured payment methods such as cards, UPI, net banking, wallets, and cash on delivery, depending on provider and region. | Build hosted/tokenized gateway flows, payment states, verified webhooks, refunds, ledgers, settlements, documents, and exports. | Test sandbox payments, retries, duplicate webhooks, refunds, ledger integrity, and provider/region-specific methods only where configured. |
| FR-PAY-003 | Status: Mandatory. Meaning: Payment authorization/capture, payment status, retries, failure handling, and webhook verification. | Build hosted/tokenized gateway flows, payment states, verified webhooks, refunds, ledgers, settlements, documents, and exports. | Test sandbox payments, retries, duplicate webhooks, refunds, ledger integrity, and provider/region-specific methods only where configured. |
| FR-PAY-004 | Status: Mandatory. Meaning: Full and partial refunds, refund reasons, status tracking, and reconciliation. | Build hosted/tokenized gateway flows, payment states, verified webhooks, refunds, ledgers, settlements, documents, and exports. | Test sandbox payments, retries, duplicate webhooks, refunds, ledger integrity, and provider/region-specific methods only where configured. |
| FR-PAY-005 | Status: Mandatory. Meaning: Transaction ledger for customer payments, marketplace fees, vendor payable amounts, refunds, and adjustments. | Build hosted/tokenized gateway flows, payment states, verified webhooks, refunds, ledgers, settlements, documents, and exports. | Test sandbox payments, retries, duplicate webhooks, refunds, ledger integrity, and provider/region-specific methods only where configured. |
| FR-PAY-006 | Status: Mandatory. Meaning: Vendor commission deductions, settlement cycles, payout approval, and payout reconciliation. | Build hosted/tokenized gateway flows, payment states, verified webhooks, refunds, ledgers, settlements, documents, and exports. | Test sandbox payments, retries, duplicate webhooks, refunds, ledger integrity, and provider/region-specific methods only where configured. |
| FR-PAY-007 | Status: Mandatory. Meaning: Tax invoices, credit notes, receipts, and downloadable statements. | Build hosted/tokenized gateway flows, payment states, verified webhooks, refunds, ledgers, settlements, documents, and exports. | Test sandbox payments, retries, duplicate webhooks, refunds, ledger integrity, and provider/region-specific methods only where configured. |
| FR-PAY-008 | Status: Conditional. Meaning: COD remittance and reconciliation if cash-on-delivery is enabled. | Build hosted/tokenized gateway flows, payment states, verified webhooks, refunds, ledgers, settlements, documents, and exports. | Test sandbox payments, retries, duplicate webhooks, refunds, ledger integrity, and provider/region-specific methods only where configured. |
| FR-PAY-009 | Status: Mandatory. Meaning: Finance exports and exception reports for unmatched or failed transactions. | Build hosted/tokenized gateway flows, payment states, verified webhooks, refunds, ledgers, settlements, documents, and exports. | Test sandbox payments, retries, duplicate webhooks, refunds, ledger integrity, and provider/region-specific methods only where configured. |
| FR-INV-001 | Status: Conditional for central inventory. Meaning: Vendor-level and, where required, central inventory with SKU/variant-level quantities. | Build SKU/variant stock, locations where required, stock movements, alerts, reservations, conditional procurement/tracking, damaged stock, and audit trails. | Test concurrent reservations, release rules, counts, alerts, movement history, and optional features only when in scope. |
| FR-INV-002 | Status: Conditional per §16 multi-warehouse decision. Meaning: Multiple warehouse/location support, stock transfers, and location-based availability. | Build SKU/variant stock, locations where required, stock movements, alerts, reservations, conditional procurement/tracking, damaged stock, and audit trails. | Test concurrent reservations, release rules, counts, alerts, movement history, and optional features only when in scope. |
| FR-INV-003 | Status: Mandatory. Meaning: Stock-in, stock-out, adjustments, cycle counts, and reconciliation. | Build SKU/variant stock, locations where required, stock movements, alerts, reservations, conditional procurement/tracking, damaged stock, and audit trails. | Test concurrent reservations, release rules, counts, alerts, movement history, and optional features only when in scope. |
| FR-INV-004 | Status: Mandatory. Meaning: Low-stock thresholds, out-of-stock alerts, and replenishment reports. | Build SKU/variant stock, locations where required, stock movements, alerts, reservations, conditional procurement/tracking, damaged stock, and audit trails. | Test concurrent reservations, release rules, counts, alerts, movement history, and optional features only when in scope. |
| FR-INV-005 | Status: Mandatory. Meaning: Inventory reservation during checkout and release on cancellation/expiry. | Build SKU/variant stock, locations where required, stock movements, alerts, reservations, conditional procurement/tracking, damaged stock, and audit trails. | Test concurrent reservations, release rules, counts, alerts, movement history, and optional features only when in scope. |
| FR-INV-006 | Status: Conditional. Meaning: Purchase orders and supplier records if procurement is in scope. | Build SKU/variant stock, locations where required, stock movements, alerts, reservations, conditional procurement/tracking, damaged stock, and audit trails. | Test concurrent reservations, release rules, counts, alerts, movement history, and optional features only when in scope. |
| FR-INV-007 | Status: Conditional. Meaning: Batch/lot/serial/expiry tracking for applicable product types. | Build SKU/variant stock, locations where required, stock movements, alerts, reservations, conditional procurement/tracking, damaged stock, and audit trails. | Test concurrent reservations, release rules, counts, alerts, movement history, and optional features only when in scope. |
| FR-INV-008 | Status: Mandatory. Meaning: Damaged, lost, returned, and quarantined stock handling. | Build SKU/variant stock, locations where required, stock movements, alerts, reservations, conditional procurement/tracking, damaged stock, and audit trails. | Test concurrent reservations, release rules, counts, alerts, movement history, and optional features only when in scope. |
| FR-INV-009 | Status: Mandatory. Meaning: Inventory valuation and stock movement audit trail. | Build SKU/variant stock, locations where required, stock movements, alerts, reservations, conditional procurement/tracking, damaged stock, and audit trails. | Test concurrent reservations, release rules, counts, alerts, movement history, and optional features only when in scope. |
| FR-ORD-001 | Status: Mandatory. Meaning: Order creation, confirmation, payment state, and customer notifications. | Build parent orders, vendor/warehouse splits, assignments, controlled statuses, pick/pack/dispatch, cancellation rules, and bulk operations. | Test split orders, status transitions, event history, partial workflows where supported, and unauthorized changes. |
| FR-ORD-002 | Status: Mandatory. Meaning: Order splitting by vendor, warehouse, or shipment while retaining a customer-facing parent order. | Build parent orders, vendor/warehouse splits, assignments, controlled statuses, pick/pack/dispatch, cancellation rules, and bulk operations. | Test split orders, status transitions, event history, partial workflows where supported, and unauthorized changes. |
| FR-ORD-003 | Status: Mandatory. Meaning: Vendor assignment, acceptance/rejection rules, and processing deadlines. | Build parent orders, vendor/warehouse splits, assignments, controlled statuses, pick/pack/dispatch, cancellation rules, and bulk operations. | Test split orders, status transitions, event history, partial workflows where supported, and unauthorized changes. |
| FR-ORD-004 | Status: Mandatory. Meaning: Pick, pack, dispatch, and partial fulfilment workflows. | Build parent orders, vendor/warehouse splits, assignments, controlled statuses, pick/pack/dispatch, cancellation rules, and bulk operations. | Test split orders, status transitions, event history, partial workflows where supported, and unauthorized changes. |
| FR-ORD-005 | Status: Mandatory. Meaning: Order statuses with controlled transitions and event history. | Build parent orders, vendor/warehouse splits, assignments, controlled statuses, pick/pack/dispatch, cancellation rules, and bulk operations. | Test split orders, status transitions, event history, partial workflows where supported, and unauthorized changes. |
| FR-ORD-006 | Status: Conditional for partial cancellation. Meaning: Cancellation before/after fulfilment according to policy; partial cancellation where supported. | Build parent orders, vendor/warehouse splits, assignments, controlled statuses, pick/pack/dispatch, cancellation rules, and bulk operations. | Test split orders, status transitions, event history, partial workflows where supported, and unauthorized changes. |
| FR-ORD-007 | Status: Mandatory. Meaning: Order editing rules, invoice generation, and internal notes. | Build parent orders, vendor/warehouse splits, assignments, controlled statuses, pick/pack/dispatch, cancellation rules, and bulk operations. | Test split orders, status transitions, event history, partial workflows where supported, and unauthorized changes. |
| FR-ORD-008 | Status: Mandatory. Meaning: Bulk order processing, exception queues, and operational dashboards. | Build parent orders, vendor/warehouse splits, assignments, controlled statuses, pick/pack/dispatch, cancellation rules, and bulk operations. | Test split orders, status transitions, event history, partial workflows where supported, and unauthorized changes. |
| FR-ORD-009 | Status: Conditional. Meaning: Delivery confirmation and proof-of-delivery reference where supported. | Build parent orders, vendor/warehouse splits, assignments, controlled statuses, pick/pack/dispatch, cancellation rules, and bulk operations. | Test split orders, status transitions, event history, partial workflows where supported, and unauthorized changes. |
| FR-SHIP-001 | Status: Mandatory. Meaning: Shipping zones, serviceability, package dimensions/weight, and rate calculation. | Build shipping zones, rate lookup, shipment booking, labels, tracking milestones, exceptions, and split-shipment states. | Test rate and serviceability calls, label/manifest output, webhook handling, delivery exceptions, and multi-shipment tracking. |
| FR-SHIP-002 | Status: Mandatory; provider model decision required. Meaning: Courier aggregator or carrier integrations, shipment creation, and cancellation. | Build shipping zones, rate lookup, shipment booking, labels, tracking milestones, exceptions, and split-shipment states. | Test rate and serviceability calls, label/manifest output, webhook handling, delivery exceptions, and multi-shipment tracking. |
| FR-SHIP-003 | Status: Mandatory. Meaning: AWB/tracking number, shipping label, and manifest generation. | Build shipping zones, rate lookup, shipment booking, labels, tracking milestones, exceptions, and split-shipment states. | Test rate and serviceability calls, label/manifest output, webhook handling, delivery exceptions, and multi-shipment tracking. |
| FR-SHIP-004 | Status: Mandatory. Meaning: Pickup scheduling, shipment tracking, and milestone webhooks. | Build shipping zones, rate lookup, shipment booking, labels, tracking milestones, exceptions, and split-shipment states. | Test rate and serviceability calls, label/manifest output, webhook handling, delivery exceptions, and multi-shipment tracking. |
| FR-SHIP-005 | Status: Mandatory. Meaning: Estimated delivery date, delivery notifications, and exception management. | Build shipping zones, rate lookup, shipment booking, labels, tracking milestones, exceptions, and split-shipment states. | Test rate and serviceability calls, label/manifest output, webhook handling, delivery exceptions, and multi-shipment tracking. |
| FR-SHIP-006 | Status: Mandatory. Meaning: Failed delivery, reattempt, return-to-origin, and reverse pickup workflows. | Build shipping zones, rate lookup, shipment booking, labels, tracking milestones, exceptions, and split-shipment states. | Test rate and serviceability calls, label/manifest output, webhook handling, delivery exceptions, and multi-shipment tracking. |
| FR-SHIP-007 | Status: Mandatory. Meaning: Multiple shipments for split orders and shipment-level status tracking. | Build shipping zones, rate lookup, shipment booking, labels, tracking milestones, exceptions, and split-shipment states. | Test rate and serviceability calls, label/manifest output, webhook handling, delivery exceptions, and multi-shipment tracking. |
| FR-RET-001 | Status: Mandatory; policy values decision required. Meaning: Configurable return window, product eligibility, and return policy by category/vendor. | Build configurable eligibility, return/exchange requests, approvals, pickup, inspection, disposition, refunds, reversal rules, and analytics. | Test eligibility, uploads, workflow states, inventory disposition, refund/exchange links, and review queues; do not choose unset policy values. |
| FR-RET-002 | Status: Mandatory. Meaning: Customer return/exchange request with reason, comments, and evidence uploads. | Build configurable eligibility, return/exchange requests, approvals, pickup, inspection, disposition, refunds, reversal rules, and analytics. | Test eligibility, uploads, workflow states, inventory disposition, refund/exchange links, and review queues; do not choose unset policy values. |
| FR-RET-003 | Status: Mandatory. Meaning: Approval, rejection, pickup scheduling, and return tracking. | Build configurable eligibility, return/exchange requests, approvals, pickup, inspection, disposition, refunds, reversal rules, and analytics. | Test eligibility, uploads, workflow states, inventory disposition, refund/exchange links, and review queues; do not choose unset policy values. |
| FR-RET-004 | Status: Mandatory. Meaning: Warehouse/vendor inspection and disposition: restock, repair, quarantine, or write-off. | Build configurable eligibility, return/exchange requests, approvals, pickup, inspection, disposition, refunds, reversal rules, and analytics. | Test eligibility, uploads, workflow states, inventory disposition, refund/exchange links, and review queues; do not choose unset policy values. |
| FR-RET-005 | Status: Mandatory. Meaning: Exchange/replacement order creation and inventory reservation. | Build configurable eligibility, return/exchange requests, approvals, pickup, inspection, disposition, refunds, reversal rules, and analytics. | Test eligibility, uploads, workflow states, inventory disposition, refund/exchange links, and review queues; do not choose unset policy values. |
| FR-RET-006 | Status: Mandatory. Meaning: Full/partial refund initiation, refund method, and status updates. | Build configurable eligibility, return/exchange requests, approvals, pickup, inspection, disposition, refunds, reversal rules, and analytics. | Test eligibility, uploads, workflow states, inventory disposition, refund/exchange links, and review queues; do not choose unset policy values. |
| FR-RET-007 | Status: Mandatory; calculation values decision required. Meaning: Vendor liability and commission reversal rules. | Build configurable eligibility, return/exchange requests, approvals, pickup, inspection, disposition, refunds, reversal rules, and analytics. | Test eligibility, uploads, workflow states, inventory disposition, refund/exchange links, and review queues; do not choose unset policy values. |
| FR-RET-008 | Status: Mandatory. Meaning: Return analytics, reason codes, and abuse/fraud review. | Build configurable eligibility, return/exchange requests, approvals, pickup, inspection, disposition, refunds, reversal rules, and analytics. | Test eligibility, uploads, workflow states, inventory disposition, refund/exchange links, and review queues; do not choose unset policy values. |
| FR-ADM-001 | Status: Mandatory. Meaning: Super-admin dashboard with sales, orders, customers, sellers, inventory, and exception KPIs. | Build admin dashboard, RBAC controls, management screens, configuration, moderation queues, feature flags, and audit records. | Test admin RBAC, configuration effects, moderation workflows, feature flags, and audit entries. |
| FR-ADM-002 | Status: Mandatory. Meaning: Admin/sub-admin creation, role-based access control, and fine-grained permissions. | Build admin dashboard, RBAC controls, management screens, configuration, moderation queues, feature flags, and audit records. | Test admin RBAC, configuration effects, moderation workflows, feature flags, and audit entries. |
| FR-ADM-003 | Status: Mandatory. Meaning: Manage vendors, customers, products, categories, brands, orders, payments, and returns. | Build admin dashboard, RBAC controls, management screens, configuration, moderation queues, feature flags, and audit records. | Test admin RBAC, configuration effects, moderation workflows, feature flags, and audit entries. |
| FR-ADM-004 | Status: Mandatory. Meaning: Configure commissions, fees, taxes, shipping rules, policies, and serviceability. | Build admin dashboard, RBAC controls, management screens, configuration, moderation queues, feature flags, and audit records. | Test admin RBAC, configuration effects, moderation workflows, feature flags, and audit entries. |
| FR-ADM-005 | Status: Mandatory. Meaning: Manage coupons, banners, campaigns, homepage sections, and content pages. | Build admin dashboard, RBAC controls, management screens, configuration, moderation queues, feature flags, and audit records. | Test admin RBAC, configuration effects, moderation workflows, feature flags, and audit entries. |
| FR-ADM-006 | Status: Mandatory. Meaning: Moderation queues, disputes, flagged reviews, and compliance workflows. | Build admin dashboard, RBAC controls, management screens, configuration, moderation queues, feature flags, and audit records. | Test admin RBAC, configuration effects, moderation workflows, feature flags, and audit entries. |
| FR-ADM-007 | Status: Mandatory. Meaning: System configuration, feature flags, audit logs, and operational controls. | Build admin dashboard, RBAC controls, management screens, configuration, moderation queues, feature flags, and audit records. | Test admin RBAC, configuration effects, moderation workflows, feature flags, and audit entries. |
| FR-MKT-001 | Status: Mandatory. Meaning: Email, SMS, push, and messaging notifications through approved providers. | Build notification providers, optional campaign/loyalty ledgers, consent-aware reminders, merchandising rules, banners, and attribution reports. | Test provider delivery, consent gates, optional scope, reminders, attribution, and role-restricted reports. |
| FR-MKT-002 | Status: Conditional. Meaning: Campaigns, customer segments, referral codes, and affiliate tracking if enabled. | Build notification providers, optional campaign/loyalty ledgers, consent-aware reminders, merchandising rules, banners, and attribution reports. | Test provider delivery, consent gates, optional scope, reminders, attribution, and role-restricted reports. |
| FR-MKT-003 | Status: Conditional. Meaning: Loyalty points, reward rules, redemption, and expiry ledger. | Build notification providers, optional campaign/loyalty ledgers, consent-aware reminders, merchandising rules, banners, and attribution reports. | Test provider delivery, consent gates, optional scope, reminders, attribution, and role-restricted reports. |
| FR-MKT-004 | Status: Conditional; consent mandatory where used. Meaning: Abandoned-cart reminders, back-in-stock alerts, and price-drop alerts with consent controls. | Build notification providers, optional campaign/loyalty ledgers, consent-aware reminders, merchandising rules, banners, and attribution reports. | Test provider delivery, consent gates, optional scope, reminders, attribution, and role-restricted reports. |
| FR-MKT-005 | Status: Mandatory. Meaning: Personalized product recommendations and merchandising rules. | Build notification providers, optional campaign/loyalty ledgers, consent-aware reminders, merchandising rules, banners, and attribution reports. | Test provider delivery, consent gates, optional scope, reminders, attribution, and role-restricted reports. |
| FR-MKT-006 | Status: Mandatory. Meaning: Promotional banners, pop-ups, and campaign landing pages. | Build notification providers, optional campaign/loyalty ledgers, consent-aware reminders, merchandising rules, banners, and attribution reports. | Test provider delivery, consent gates, optional scope, reminders, attribution, and role-restricted reports. |
| FR-MKT-007 | Status: Mandatory. Meaning: Campaign attribution, conversion, and revenue reporting. | Build notification providers, optional campaign/loyalty ledgers, consent-aware reminders, merchandising rules, banners, and attribution reports. | Test provider delivery, consent gates, optional scope, reminders, attribution, and role-restricted reports. |
| FR-MKT-008 | Status: Conditional; decision required. Meaning: Advanced or AI recommendations can follow in a later phase unless mandatory from day one. | Build notification providers, optional campaign/loyalty ledgers, consent-aware reminders, merchandising rules, banners, and attribution reports. | Test provider delivery, consent gates, optional scope, reminders, attribution, and role-restricted reports. |
| FR-REV-001 | Status: Conditional for media. Meaning: Product and vendor ratings, written reviews, and optional image/video attachments. | Build ratings/reviews, optional media, verified-purchase checks, moderation, responses where permitted, and suspicious-content detection. | Test eligibility, media uploads where enabled, reporting, moderation, appeals, and spam signals. |
| FR-REV-002 | Status: Mandatory. Meaning: Verified-purchase indicator and review eligibility rules. | Build ratings/reviews, optional media, verified-purchase checks, moderation, responses where permitted, and suspicious-content detection. | Test eligibility, media uploads where enabled, reporting, moderation, appeals, and spam signals. |
| FR-REV-003 | Status: Mandatory. Meaning: Review reporting, moderation, removal, and appeal workflow. | Build ratings/reviews, optional media, verified-purchase checks, moderation, responses where permitted, and suspicious-content detection. | Test eligibility, media uploads where enabled, reporting, moderation, appeals, and spam signals. |
| FR-REV-004 | Status: Conditional. Meaning: Admin/vendor responses where permitted. | Build ratings/reviews, optional media, verified-purchase checks, moderation, responses where permitted, and suspicious-content detection. | Test eligibility, media uploads where enabled, reporting, moderation, appeals, and spam signals. |
| FR-REV-005 | Status: Mandatory. Meaning: Spam, abusive content, and suspicious review detection. | Build ratings/reviews, optional media, verified-purchase checks, moderation, responses where permitted, and suspicious-content detection. | Test eligibility, media uploads where enabled, reporting, moderation, appeals, and spam signals. |
| FR-SUP-001 | Status: Mandatory. Meaning: Support ticket creation, categories, priorities, assignment, and escalation. | Build tickets, notes, optional chat, help content, disputes, SLA tracking, CSAT, and support reports. | Test ticket workflow, access boundaries, disputes, SLA evidence, selected chat, and analytics. |
| FR-SUP-002 | Status: Mandatory. Meaning: Customer/vendor communication history and internal notes. | Build tickets, notes, optional chat, help content, disputes, SLA tracking, CSAT, and support reports. | Test ticket workflow, access boundaries, disputes, SLA evidence, selected chat, and analytics. |
| FR-SUP-003 | Status: Conditional. Meaning: Live chat or chatbot integration if selected. | Build tickets, notes, optional chat, help content, disputes, SLA tracking, CSAT, and support reports. | Test ticket workflow, access boundaries, disputes, SLA evidence, selected chat, and analytics. |
| FR-SUP-004 | Status: Mandatory. Meaning: FAQs, help centre, and policy knowledge base. | Build tickets, notes, optional chat, help content, disputes, SLA tracking, CSAT, and support reports. | Test ticket workflow, access boundaries, disputes, SLA evidence, selected chat, and analytics. |
| FR-SUP-005 | Status: Mandatory. Meaning: Dispute management for orders, returns, payments, and vendor issues. | Build tickets, notes, optional chat, help content, disputes, SLA tracking, CSAT, and support reports. | Test ticket workflow, access boundaries, disputes, SLA evidence, selected chat, and analytics. |
| FR-SUP-006 | Status: Mandatory. Meaning: SLA tracking, resolution codes, CSAT, and support analytics. | Build tickets, notes, optional chat, help content, disputes, SLA tracking, CSAT, and support reports. | Test ticket workflow, access boundaries, disputes, SLA evidence, selected chat, and analytics. |
| FR-CMS-001 | Status: Mandatory. Meaning: Manage homepage sections, banners, navigation, footer, and landing pages. | Build managed content pages, optional blog content, SEO metadata, sitemap, robots directives, redirects, and broken-link checks. | Test publishing, SEO output, indexation controls, redirects, and broken-link monitoring. |
| FR-CMS-002 | Status: Mandatory. Meaning: Static pages including About, Contact, Terms, Privacy, Shipping, and Returns. | Build managed content pages, optional blog content, SEO metadata, sitemap, robots directives, redirects, and broken-link checks. | Test publishing, SEO output, indexation controls, redirects, and broken-link monitoring. |
| FR-CMS-003 | Status: Conditional. Meaning: Blog/editorial content if required. | Build managed content pages, optional blog content, SEO metadata, sitemap, robots directives, redirects, and broken-link checks. | Test publishing, SEO output, indexation controls, redirects, and broken-link monitoring. |
| FR-CMS-004 | Status: Mandatory. Meaning: SEO title, description, canonical URL, Open Graph, and structured product data. | Build managed content pages, optional blog content, SEO metadata, sitemap, robots directives, redirects, and broken-link checks. | Test publishing, SEO output, indexation controls, redirects, and broken-link monitoring. |
| FR-CMS-005 | Status: Mandatory. Meaning: XML sitemap, robots directives, redirects, and broken-link monitoring. | Build managed content pages, optional blog content, SEO metadata, sitemap, robots directives, redirects, and broken-link checks. | Test publishing, SEO output, indexation controls, redirects, and broken-link monitoring. |
| FR-BI-001 | Status: Mandatory. Meaning: Sales, gross merchandise value, net revenue, average order value, and conversion reports. | Build role-restricted reports, filters, exports, and documented calculation sources. | Test report calculations, filters, exports, date controls, and RBAC restrictions. |
| FR-BI-002 | Status: Mandatory. Meaning: Vendor sales, commissions, payouts, returns, and performance scorecards. | Build role-restricted reports, filters, exports, and documented calculation sources. | Test report calculations, filters, exports, date controls, and RBAC restrictions. |
| FR-BI-003 | Status: Mandatory. Meaning: Product views, sales, conversion, stock, and catalogue-quality reports. | Build role-restricted reports, filters, exports, and documented calculation sources. | Test report calculations, filters, exports, date controls, and RBAC restrictions. |
| FR-BI-004 | Status: Mandatory. Meaning: Customer acquisition, retention, repeat purchase, and cohort reports. | Build role-restricted reports, filters, exports, and documented calculation sources. | Test report calculations, filters, exports, date controls, and RBAC restrictions. |
| FR-BI-005 | Status: Mandatory. Meaning: Order fulfilment, cancellation, delivery, and return analytics. | Build role-restricted reports, filters, exports, and documented calculation sources. | Test report calculations, filters, exports, date controls, and RBAC restrictions. |
| FR-BI-006 | Status: Mandatory. Meaning: Payment success/failure, refund, reconciliation, and tax reports. | Build role-restricted reports, filters, exports, and documented calculation sources. | Test report calculations, filters, exports, date controls, and RBAC restrictions. |
| FR-BI-007 | Status: Mandatory. Meaning: Exportable reports with role-based access and date/filter controls. | Build role-restricted reports, filters, exports, and documented calculation sources. | Test report calculations, filters, exports, date controls, and RBAC restrictions. |
| FR-COMP-001 | Status: Conditional for MFA; mandatory authentication/session. Meaning: Secure authentication, password hashing, optional MFA, and session management. | Build secure identity, RBAC, encryption, secrets handling, validation, gateway security, privacy workflows, fraud review, and dependency scans. | Test auth, RBAC, injection/XSS/CSRF, secrets exposure, privacy requests, fraud queues, and vulnerability scans. |
| FR-COMP-002 | Status: Mandatory. Meaning: RBAC, least-privilege access, admin step-up authentication, and audit logs. | Build secure identity, RBAC, encryption, secrets handling, validation, gateway security, privacy workflows, fraud review, and dependency scans. | Test auth, RBAC, injection/XSS/CSRF, secrets exposure, privacy requests, fraud queues, and vulnerability scans. |
| FR-COMP-003 | Status: Mandatory. Meaning: TLS in transit, encryption at rest, secrets management, and secure file uploads. | Build secure identity, RBAC, encryption, secrets handling, validation, gateway security, privacy workflows, fraud review, and dependency scans. | Test auth, RBAC, injection/XSS/CSRF, secrets exposure, privacy requests, fraud queues, and vulnerability scans. |
| FR-COMP-004 | Status: Mandatory; CSRF conditional. Meaning: Input validation, output encoding, CSRF protection where applicable, XSS/SQL injection controls, and rate limiting. | Build secure identity, RBAC, encryption, secrets handling, validation, gateway security, privacy workflows, fraud review, and dependency scans. | Test auth, RBAC, injection/XSS/CSRF, secrets exposure, privacy requests, fraud queues, and vulnerability scans. |
| FR-COMP-005 | Status: Mandatory. Meaning: Payment security through compliant gateway/tokenization approach; define PCI DSS responsibilities with provider. | Build secure identity, RBAC, encryption, secrets handling, validation, gateway security, privacy workflows, fraud review, and dependency scans. | Test auth, RBAC, injection/XSS/CSRF, secrets exposure, privacy requests, fraud queues, and vulnerability scans. |
| FR-COMP-006 | Status: Mandatory. Meaning: Privacy notices, consent records, retention policies, and data-subject request workflows. | Build secure identity, RBAC, encryption, secrets handling, validation, gateway security, privacy workflows, fraud review, and dependency scans. | Test auth, RBAC, injection/XSS/CSRF, secrets exposure, privacy requests, fraud queues, and vulnerability scans. |
| FR-COMP-007 | Status: Mandatory. Meaning: Fraud signals, suspicious login/payment monitoring, and manual review queues. | Build secure identity, RBAC, encryption, secrets handling, validation, gateway security, privacy workflows, fraud review, and dependency scans. | Test auth, RBAC, injection/XSS/CSRF, secrets exposure, privacy requests, fraud queues, and vulnerability scans. |
| FR-COMP-008 | Status: Mandatory. Meaning: Dependency scanning, vulnerability management, backup testing, and incident response. | Build secure identity, RBAC, encryption, secrets handling, validation, gateway security, privacy workflows, fraud review, and dependency scans. | Test auth, RBAC, injection/XSS/CSRF, secrets exposure, privacy requests, fraud queues, and vulnerability scans. |
| FR-MOB-001 | Status: Mandatory. Meaning: Responsive customer storefront for mobile, tablet, and desktop. | Build responsive web first, shared API contracts, and app/push/deep-link features only when in scope. | Test responsive layouts and contracts now; test app, push, and deep-link features only if mobile scope is approved. |
| FR-MOB-002 | Status: Conditional. Meaning: Optional customer app, vendor app, and delivery app using React Native. | Build responsive web first, shared API contracts, and app/push/deep-link features only when in scope. | Test responsive layouts and contracts now; test app, push, and deep-link features only if mobile scope is approved. |
| FR-MOB-003 | Status: Conditional on mobile scope. Meaning: Push notifications, deep links, and mobile-friendly checkout. | Build responsive web first, shared API contracts, and app/push/deep-link features only when in scope. | Test responsive layouts and contracts now; test app, push, and deep-link features only if mobile scope is approved. |
| FR-MOB-004 | Status: Mandatory. Meaning: Consistent API contracts across web and mobile clients. | Build responsive web first, shared API contracts, and app/push/deep-link features only when in scope. | Test responsive layouts and contracts now; test app, push, and deep-link features only if mobile scope is approved. |
| FR-MOB-005 | Status: Conditional. Meaning: Optional B2B portal, social commerce, or additional sales channels. | Build responsive web first, shared API contracts, and app/push/deep-link features only when in scope. | Test responsive layouts and contracts now; test app, push, and deep-link features only if mobile scope is approved. |
| FR-OPS-001 | Status: Mandatory. Meaning: Environment separation for local development, test/staging, and production. | Build environment separation, logs/metrics/traces, alerts, backups, CI/CD, rollback, and recovery decision records. | Check environment isolation, telemetry, alerts, restore drills, pipeline gates, rollback, and unresolved RPO/RTO. |
| FR-OPS-002 | Status: Mandatory. Meaning: Structured application logs, metrics, traces, alerting, and error monitoring. | Build environment separation, logs/metrics/traces, alerts, backups, CI/CD, rollback, and recovery decision records. | Check environment isolation, telemetry, alerts, restore drills, pipeline gates, rollback, and unresolved RPO/RTO. |
| FR-OPS-003 | Status: Conditional for PITR. Meaning: Automated database backups, point-in-time recovery where supported, and restore drills. | Build environment separation, logs/metrics/traces, alerts, backups, CI/CD, rollback, and recovery decision records. | Check environment isolation, telemetry, alerts, restore drills, pipeline gates, rollback, and unresolved RPO/RTO. |
| FR-OPS-004 | Status: Mandatory. Meaning: CI/CD pipeline, migrations, rollback plan, and release approvals. | Build environment separation, logs/metrics/traces, alerts, backups, CI/CD, rollback, and recovery decision records. | Check environment isolation, telemetry, alerts, restore drills, pipeline gates, rollback, and unresolved RPO/RTO. |
| FR-OPS-005 | Status: Mandatory. Meaning: Performance, load, security, and accessibility testing. | Build environment separation, logs/metrics/traces, alerts, backups, CI/CD, rollback, and recovery decision records. | Check environment isolation, telemetry, alerts, restore drills, pipeline gates, rollback, and unresolved RPO/RTO. |
| FR-OPS-006 | Status: Decision required. Meaning: Disaster recovery objectives (RPO/RTO) agreed before production launch. | Build environment separation, logs/metrics/traces, alerts, backups, CI/CD, rollback, and recovery decision records. | Check environment isolation, telemetry, alerts, restore drills, pipeline gates, rollback, and unresolved RPO/RTO. |
| AC-JOURNEY-001 | Status: Mandatory. Meaning: Customer purchase: Customer can discover an available product, add it to cart, receive a server-calculated total, place an order, complete payment, and view order/shipment status. | Build the joined-up user, API, data, payment, inventory, and operations flow for this outcome. | Run an E2E journey with success, failure, duplicate, and unauthorized paths. |
| AC-JOURNEY-002 | Status: Mandatory. Meaning: Seller onboarding: Seller can submit required details/documents, see application status, and access vendor functions only after required approval. | Build the joined-up user, API, data, payment, inventory, and operations flow for this outcome. | Run an E2E journey with success, failure, duplicate, and unauthorized paths. |
| AC-JOURNEY-003 | Status: Mandatory. Meaning: Product publishing: Seller submits a complete listing; authorized moderator approves/rejects with a reason; only approved eligible products are publicly visible. | Build the joined-up user, API, data, payment, inventory, and operations flow for this outcome. | Run an E2E journey with success, failure, duplicate, and unauthorized paths. |
| AC-JOURNEY-004 | Status: Mandatory. Meaning: Multi-vendor order: Multi-seller cart splits into vendor fulfilment units while preserving one customer order summary and correct shipment tracking. | Build the joined-up user, API, data, payment, inventory, and operations flow for this outcome. | Run an E2E journey with success, failure, duplicate, and unauthorized paths. |
| AC-JOURNEY-005 | Status: Mandatory. Meaning: Inventory safety: Concurrent checkouts cannot oversell stock beyond configured rules; reservations expire/release safely. | Build the joined-up user, API, data, payment, inventory, and operations flow for this outcome. | Run an E2E journey with success, failure, duplicate, and unauthorized paths. |
| AC-JOURNEY-006 | Status: Mandatory. Meaning: Payment integrity: Payment callbacks are verified and idempotent; retry or duplicate webhook cannot create duplicate charges, orders, or refunds. | Build the joined-up user, API, data, payment, inventory, and operations flow for this outcome. | Run an E2E journey with success, failure, duplicate, and unauthorized paths. |
| AC-JOURNEY-007 | Status: Mandatory. Meaning: Returns: Eligible customer can submit a return; workflow records decision, pickup, inspection, refund/exchange, and inventory disposition. | Build the joined-up user, API, data, payment, inventory, and operations flow for this outcome. | Run an E2E journey with success, failure, duplicate, and unauthorized paths. |
| AC-JOURNEY-008 | Status: Mandatory. Meaning: Vendor settlement: Commission and payable amounts can be calculated from completed eligible transactions, reconciled, and reported to vendor. | Build the joined-up user, API, data, payment, inventory, and operations flow for this outcome. | Run an E2E journey with success, failure, duplicate, and unauthorized paths. |
| AC-JOURNEY-009 | Status: Mandatory. Meaning: Administration: Admin permissions restrict sensitive actions; critical changes are recorded in an audit trail. | Build the joined-up user, API, data, payment, inventory, and operations flow for this outcome. | Run an E2E journey with success, failure, duplicate, and unauthorized paths. |
| NFR-PERF-001 | Status: Decision required. Meaning: Performance: Set measurable page/API latency targets. | Build latency measurement, Core Web Vitals work, caching, image delivery, and query tuning; keep numeric targets unresolved. | Measure performance and review evidence; do not invent numeric thresholds. |
| NFR-PERF-002 | Status: Mandatory. Meaning: Performance: Optimize Core Web Vitals, caching, image delivery, and database queries. | Build latency measurement, Core Web Vitals work, caching, image delivery, and query tuning; keep numeric targets unresolved. | Measure performance and review evidence; do not invent numeric thresholds. |
| NFR-SCAL-001 | Status: Mandatory. Meaning: Scalability: Support growth in users, products, vendors, and concurrent orders. | Build for growth in users/products/vendors/orders and define load-test scenarios. | Run peak-load tests and review capacity evidence. |
| NFR-SCAL-002 | Status: Mandatory. Meaning: Scalability: Load test expected peak traffic. | Build for growth in users/products/vendors/orders and define load-test scenarios. | Run peak-load tests and review capacity evidence. |
| NFR-AVAIL-001 | Status: Decision required. Meaning: Availability: Define uptime objective, maintenance windows, failover design, and service dependencies. | Await uptime/failover decisions, then design availability and dependency handling. | Review decision status, failover design, and dependency inventory without inventing targets. |
| NFR-REL-001 | Status: Mandatory. Meaning: Reliability: Use transactions, retries with backoff, idempotency, queue monitoring, and graceful failure handling. | Build transactions, retry/backoff policy, idempotency, queue monitoring, and graceful failure handling. | Test retries, duplicates, queue backlogs, failures, and state consistency. |
| NFR-SEC-001 | Status: Mandatory. Meaning: Security: Threat modelling, secure coding, access control, encryption, vulnerability scanning, and incident response. | Build threat modelling, secure coding, access controls, encryption, scanning, and incident response. | Run threat review, security tests, scans, and incident walkthrough. |
| NFR-ACC-001 | Status: Conditional “where feasible”. Meaning: Accessibility: Target WCAG 2.2 AA where feasible; keyboard navigation, semantic structure, contrast, screen-reader support. | Build keyboard access, semantics, contrast, screen-reader support, and WCAG 2.2 AA work where feasible. | Test keyboard, focus, labels, contrast, and screen readers; preserve “where feasible” qualifier. |
| NFR-COMP-001 | Status: Mandatory; breakpoints to agree. Meaning: Compatibility: Support current major browsers and agreed mobile/tablet breakpoints. | Build responsive support for current major browsers and agree breakpoints. | Test supported browsers/devices; keep breakpoints unresolved until agreed. |
| NFR-MAINT-001 | Status: Mandatory. Meaning: Maintainability: Modular code, coding standards, architecture decision records, documented setup. | Build modular code, standards, ADRs, and setup docs. | Review lint/type checks, boundaries, ADRs, and setup instructions. |
| NFR-OBS-001 | Status: Mandatory. Meaning: Observability: Centralised structured logs, metrics, traces, dashboards, and actionable alerts. | Build central logs, metrics, traces, dashboards, and actionable alerts. | Verify telemetry appears and alerts fire on defined conditions. |
| NFR-REC-001 | Status: Decision required. Meaning: Recovery: Agree RPO/RTO, backup retention, restoration drills, disaster recovery procedures. | Await RPO/RTO and retention decisions, then document restore and DR procedures. | Run restore drills and check no missing objective was invented. |
| NFR-LOC-001 | Status: Conditional. Meaning: Localization: Plan currency, locale, language, time zone, date, and tax formatting if multiple regions are supported. | Wait for region/locale scope, then plan currency, language, time zone, date, and tax formatting. | Confirm scope first, then test relevant formats. |
| NFR-DATA-001 | Status: Mandatory. Meaning: Data protection: Define data classification, retention, consent, export/deletion, and access policies. | Build data classification, retention, consent, export/deletion, and access policies. | Test policy enforcement, restricted access, and privacy workflows. |
| TEC-001 | Status: Recommendation. Meaning: Web storefront: Next.js + React + TypeScript. Purpose / notes: SEO-friendly storefront, server rendering, routing, reusable UI. | Apply the recommended technology only as guidance and record any required choice. | Verify the selected stack/tooling works with lint, type-check, build, tests, and containers. |
| TEC-002 | Status: Recommendation. Meaning: Styling/components: Tailwind CSS + accessible component library. Purpose / notes: Responsive design system and consistent components. | Apply the recommended technology only as guidance and record any required choice. | Verify the selected stack/tooling works with lint, type-check, build, tests, and containers. |
| TEC-003 | Status: Recommendation; structure decision required. Meaning: Vendor/admin portals: Next.js + React + TypeScript. Purpose / notes: Separate role-aware applications or clearly separated portal areas. | Apply the recommended technology only as guidance and record any required choice. | Verify the selected stack/tooling works with lint, type-check, build, tests, and containers. |
| TEC-004 | Status: Recommendation. Meaning: Backend: Node.js + NestJS + TypeScript. Purpose / notes: Modular business services, validation, dependency injection, API layer. | Apply the recommended technology only as guidance and record any required choice. | Verify the selected stack/tooling works with lint, type-check, build, tests, and containers. |
| TEC-005 | Status: Recommendation. Meaning: API style: REST + OpenAPI/Swagger. Purpose / notes: Stable integration contract; version APIs and document errors. | Apply the recommended technology only as guidance and record any required choice. | Verify the selected stack/tooling works with lint, type-check, build, tests, and containers. |
| TEC-006 | Status: Recommendation; choice to agree. Meaning: Real-time: WebSockets / server-sent events where suitable. Purpose / notes: Order, support, operational status updates. | Apply the recommended technology only as guidance and record any required choice. | Verify the selected stack/tooling works with lint, type-check, build, tests, and containers. |
| TEC-007 | Status: Recommendation; §6 makes it system of record. Meaning: Primary database: PostgreSQL. Purpose / notes: Transactional relational data and referential integrity. | Apply the recommended technology only as guidance and record any required choice. | Verify the selected stack/tooling works with lint, type-check, build, tests, and containers. |
| TEC-008 | Status: Recommendation; choice to agree. Meaning: ORM/migrations: Prisma (or TypeORM). Purpose / notes: Typed data access and versioned schema migrations. | Apply the recommended technology only as guidance and record any required choice. | Verify the selected stack/tooling works with lint, type-check, build, tests, and containers. |
| TEC-009 | Status: Recommendation. Meaning: Cache/queue: Redis + BullMQ. Purpose / notes: Caching, rate limiting, sessions where appropriate, background jobs. | Apply the recommended technology only as guidance and record any required choice. | Verify the selected stack/tooling works with lint, type-check, build, tests, and containers. |
| TEC-010 | Status: Recommendation; threshold to agree. Meaning: Search: PostgreSQL full-text initially; OpenSearch/Elasticsearch when needed. Purpose / notes: Product search, facets, relevance at larger catalogue scale. | Apply the recommended technology only as guidance and record any required choice. | Verify the selected stack/tooling works with lint, type-check, build, tests, and containers. |
| TEC-011 | Status: Recommendation. Meaning: File/object storage: AWS S3 or compatible object storage. Purpose / notes: Product media, seller documents, generated files; signed URLs. | Apply the recommended technology only as guidance and record any required choice. | Verify the selected stack/tooling works with lint, type-check, build, tests, and containers. |
| TEC-012 | Status: Recommendation; provider to agree. Meaning: CDN/edge: Cloudflare or cloud-provider CDN. Purpose / notes: Static/media delivery, DNS, edge protections. | Apply the recommended technology only as guidance and record any required choice. | Verify the selected stack/tooling works with lint, type-check, build, tests, and containers. |
| TEC-013 | Status: Recommendation; conditional. Meaning: Mobile: React Native + Expo (optional phase). Purpose / notes: Shared TypeScript mobile development for iOS/Android. | Apply the recommended technology only as guidance and record any required choice. | Verify the selected stack/tooling works with lint, type-check, build, tests, and containers. |
| TEC-014 | Status: Recommendation; runner choice to agree. Meaning: Testing: Jest/Vitest + Supertest + Playwright. Purpose / notes: Unit, API/integration, E2E tests. | Apply the recommended technology only as guidance and record any required choice. | Verify the selected stack/tooling works with lint, type-check, build, tests, and containers. |
| TEC-015 | Status: Recommendation. Meaning: Code quality: ESLint + Prettier + TypeScript strict mode. Purpose / notes: Consistent, maintainable, safer code. | Apply the recommended technology only as guidance and record any required choice. | Verify the selected stack/tooling works with lint, type-check, build, tests, and containers. |
| TEC-016 | Status: Recommendation and mandatory in §11. Meaning: Containers: Docker. Purpose / notes: Repeatable local and deployment environments. | Apply the recommended technology only as guidance and record any required choice. | Verify the selected stack/tooling works with lint, type-check, build, tests, and containers. |
| TEC-017 | Status: Recommendation. Meaning: CI/CD: GitHub Actions. Purpose / notes: Automated checks, build, test, deployment. | Apply the recommended technology only as guidance and record any required choice. | Verify the selected stack/tooling works with lint, type-check, build, tests, and containers. |
| TEC-018 | Status: Recommendation; provider to agree. Meaning: Hosting: AWS, Azure, or Google Cloud. Purpose / notes: Managed application, database, storage, networking. | Apply the recommended technology only as guidance and record any required choice. | Verify the selected stack/tooling works with lint, type-check, build, tests, and containers. |
| TEC-019 | Status: Recommendation. Meaning: Monitoring: Sentry + cloud metrics/logging + OpenTelemetry. Purpose / notes: Error reporting, logs, traces, dashboards, alerts. | Apply the recommended technology only as guidance and record any required choice. | Verify the selected stack/tooling works with lint, type-check, build, tests, and containers. |
| TEC-020 | Status: Recommendation; choice to agree. Meaning: API testing: Postman or Bruno. Purpose / notes: Manual and automated API verification. | Apply the recommended technology only as guidance and record any required choice. | Verify the selected stack/tooling works with lint, type-check, build, tests, and containers. |
| TEC-021 | Status: Recommendation and mandatory deliverable in §14/§15. Meaning: Design: Figma. Purpose / notes: Wireframes, UI kit, design system, prototypes. | Apply the recommended technology only as guidance and record any required choice. | Verify the selected stack/tooling works with lint, type-check, build, tests, and containers. |
| TEC-022 | Status: Recommendation. Meaning: Source control: Git + GitHub. Purpose / notes: Branching, pull requests, code review, release tags. | Apply the recommended technology only as guidance and record any required choice. | Verify the selected stack/tooling works with lint, type-check, build, tests, and containers. |
| ARC-001 | Status: Recommendation. Meaning: Begin with a modular monolith: one deployable backend organised into strict domain modules with explicit interfaces, independent tests, and clear data ownership. | Organize code into the named layer or boundary with explicit interfaces and data ownership. | Review boundaries, dependencies, interfaces, ownership, and ADRs. |
| ARC-002 | Status: Recommendation. Meaning: Avoid premature microservice complexity while preserving extraction of high-load or independently operated modules later. | Organize code into the named layer or boundary with explicit interfaces and data ownership. | Review boundaries, dependencies, interfaces, ownership, and ADRs. |
| ARC-003 | Status: Recommendation. Meaning: Presentation layer: customer storefront, vendor portal, admin console, optional mobile apps. | Organize code into the named layer or boundary with explicit interfaces and data ownership. | Review boundaries, dependencies, interfaces, ownership, and ADRs. |
| ARC-004 | Status: Recommendation. Meaning: API/application layer: authentication, authorization, request validation, orchestration, versioned APIs. | Organize code into the named layer or boundary with explicit interfaces and data ownership. | Review boundaries, dependencies, interfaces, ownership, and ADRs. |
| ARC-005 | Status: Recommendation. Meaning: Domain modules: catalogue, vendor, customer, pricing, cart, checkout, payment, inventory, order, fulfilment, shipping, returns, finance, support, marketing, reporting. | Organize code into the named layer or boundary with explicit interfaces and data ownership. | Review boundaries, dependencies, interfaces, ownership, and ADRs. |
| ARC-006 | Status: Recommendation. Meaning: Data layer: PostgreSQL, Redis, object storage, search index where needed. | Organize code into the named layer or boundary with explicit interfaces and data ownership. | Review boundaries, dependencies, interfaces, ownership, and ADRs. |
| ARC-007 | Status: Recommendation. Meaning: Integration layer: payment, courier, email/SMS, tax, analytics, accounting providers. | Organize code into the named layer or boundary with explicit interfaces and data ownership. | Review boundaries, dependencies, interfaces, ownership, and ADRs. |
| ARC-008 | Status: Recommendation. Meaning: Async processing: background queues for emails, webhooks, invoice generation, search indexing, exports, scheduled tasks. | Organize code into the named layer or boundary with explicit interfaces and data ownership. | Review boundaries, dependencies, interfaces, ownership, and ADRs. |
| ARC-009 | Status: Recommendation. Meaning: Edge layer: DNS, CDN, WAF, TLS termination, rate limiting. | Organize code into the named layer or boundary with explicit interfaces and data ownership. | Review boundaries, dependencies, interfaces, ownership, and ADRs. |
| ARC-010 | Status: Recommendation. Meaning: Operations layer: CI/CD, monitoring, logging, backups, security scanning. | Organize code into the named layer or boundary with explicit interfaces and data ownership. | Review boundaries, dependencies, interfaces, ownership, and ADRs. |
| DB-001 | Status: Mandatory. Meaning: Use PostgreSQL as system of record. | Build PostgreSQL schema/migrations and enforce the named data-integrity rule. | Test constraints, transactions, idempotency, precision, history, query plans, and retention. |
| DB-002 | Status: Mandatory. Meaning: Model entities with primary keys, foreign keys, indexes, timestamps, status history, and appropriate uniqueness constraints. | Build PostgreSQL schema/migrations and enforce the named data-integrity rule. | Test constraints, transactions, idempotency, precision, history, query plans, and retention. |
| DB-003 | Status: Mandatory. Meaning: Minimise and protect sensitive data. | Build PostgreSQL schema/migrations and enforce the named data-integrity rule. | Test constraints, transactions, idempotency, precision, history, query plans, and retention. |
| DB-004 | Status: Mandatory. Meaning: Use database transactions for checkout, stock reservation, payment state transitions, and financial ledger operations. | Build PostgreSQL schema/migrations and enforce the named data-integrity rule. | Test constraints, transactions, idempotency, precision, history, query plans, and retention. |
| DB-005 | Status: Mandatory. Meaning: Use idempotency keys for order creation, payment requests, refunds, webhook processing, and payout operations. | Build PostgreSQL schema/migrations and enforce the named data-integrity rule. | Test constraints, transactions, idempotency, precision, history, query plans, and retention. |
| DB-006 | Status: Mandatory. Meaning: Store monetary values using fixed-precision decimals and explicit currency code; never floating-point arithmetic for money. | Build PostgreSQL schema/migrations and enforce the named data-integrity rule. | Test constraints, transactions, idempotency, precision, history, query plans, and retention. |
| DB-007 | Status: Mandatory. Meaning: Preserve immutable financial ledger entries; correct errors with compensating entries. | Build PostgreSQL schema/migrations and enforce the named data-integrity rule. | Test constraints, transactions, idempotency, precision, history, query plans, and retention. |
| DB-008 | Status: Mandatory. Meaning: Maintain status/event histories for orders, payments, shipments, returns, vendor approvals. | Build PostgreSQL schema/migrations and enforce the named data-integrity rule. | Test constraints, transactions, idempotency, precision, history, query plans, and retention. |
| DB-009 | Status: Mandatory. Meaning: Index common filters/joins; review query plans; avoid unbounded list endpoints. | Build PostgreSQL schema/migrations and enforce the named data-integrity rule. | Test constraints, transactions, idempotency, precision, history, query plans, and retention. |
| DB-010 | Status: Mandatory. Meaning: Use soft deletion only where appropriate; retain financial and audit records according to policy and law. | Build PostgreSQL schema/migrations and enforce the named data-integrity rule. | Test constraints, transactions, idempotency, precision, history, query plans, and retention. |
| DB-ENT-001 | Status: Mandatory coverage. Meaning: Identity & access example tables: `users`, `roles`, `permissions`, `user_roles`, `sessions`, `addresses`, `verification_tokens`, `consent_records`. | Cover the named domain in the ERD/schema; keep conditional entities conditional. | Review ERD coverage, relationships, constraints, and conditional scope. |
| DB-ENT-002 | Status: Mandatory coverage. Meaning: Vendors example tables: `vendors`, `vendor_users`, `vendor_documents`, `vendor_bank_accounts` (protected/tokenized references), `vendor_stores`, `vendor_status_history`. | Cover the named domain in the ERD/schema; keep conditional entities conditional. | Review ERD coverage, relationships, constraints, and conditional scope. |
| DB-ENT-003 | Status: Mandatory coverage. Meaning: Catalogue example tables: `products`, `product_variants`, `categories`, `brands`, `attributes`, `attribute_values`, `product_media`, `product_categories`, `product_approvals`. | Cover the named domain in the ERD/schema; keep conditional entities conditional. | Review ERD coverage, relationships, constraints, and conditional scope. |
| DB-ENT-004 | Status: Mandatory coverage; gift cards conditional. Meaning: Commercial example tables: `price_lists`, `product_prices`, `tax_rules`, `coupons`, `promotions`, `promotion_rules`, `gift_cards` (if enabled). | Cover the named domain in the ERD/schema; keep conditional entities conditional. | Review ERD coverage, relationships, constraints, and conditional scope. |
| DB-ENT-005 | Status: Mandatory coverage. Meaning: Customer activity example tables: `wishlists`, `wishlist_items`, `carts`, `cart_items`, `recently_viewed`, `reviews`, `review_media`. | Cover the named domain in the ERD/schema; keep conditional entities conditional. | Review ERD coverage, relationships, constraints, and conditional scope. |
| DB-ENT-006 | Status: Mandatory coverage; supplier/purchase-order entities conditional. Meaning: Inventory example tables: `warehouses`, `inventory_items`, `stock_movements`, `stock_reservations`, `suppliers`, `purchase_orders` (if enabled). | Cover the named domain in the ERD/schema; keep conditional entities conditional. | Review ERD coverage, relationships, constraints, and conditional scope. |
| DB-ENT-007 | Status: Mandatory coverage. Meaning: Orders example tables: `orders`, `order_items`, `vendor_orders`, `order_status_history`, `invoices`, `shipments`, `shipment_events`. | Cover the named domain in the ERD/schema; keep conditional entities conditional. | Review ERD coverage, relationships, constraints, and conditional scope. |
| DB-ENT-008 | Status: Mandatory coverage. Meaning: Payments & finance example tables: `payment_intents`, `payment_transactions`, `refunds`, `commissions`, `ledger_entries`, `settlements`, `payouts`, `reconciliation_records`. | Cover the named domain in the ERD/schema; keep conditional entities conditional. | Review ERD coverage, relationships, constraints, and conditional scope. |
| DB-ENT-009 | Status: Mandatory coverage. Meaning: Returns example tables: `return_requests`, `return_items`, `return_events`, `inspections`, `exchange_orders`. | Cover the named domain in the ERD/schema; keep conditional entities conditional. | Review ERD coverage, relationships, constraints, and conditional scope. |
| DB-ENT-010 | Status: Mandatory coverage. Meaning: Support example tables: `support_tickets`, `ticket_messages`, `ticket_assignments`, `disputes`, `faq_articles`. | Cover the named domain in the ERD/schema; keep conditional entities conditional. | Review ERD coverage, relationships, constraints, and conditional scope. |
| DB-ENT-011 | Status: Mandatory coverage. Meaning: Marketing example tables: `campaigns`, `notifications`, `notification_templates`, `referral_codes`, `loyalty_accounts`, `loyalty_transactions`. | Cover the named domain in the ERD/schema; keep conditional entities conditional. | Review ERD coverage, relationships, constraints, and conditional scope. |
| DB-ENT-012 | Status: Mandatory coverage. Meaning: Governance example tables: `audit_logs`, `admin_actions`, `webhook_events`, `feature_flags`, `system_settings`. | Cover the named domain in the ERD/schema; keep conditional entities conditional. | Review ERD coverage, relationships, constraints, and conditional scope. |
| API-001 | Status: Mandatory. Meaning: REST endpoints grouped by domain and versioned, e.g. `/api/v1/products`, `/api/v1/orders`. | Implement the named API standard in versioned endpoints and OpenAPI documentation. | Test contracts, validation, errors, pagination, auth, idempotency, correlation IDs, and webhook protections. |
| API-002 | Status: Mandatory. Meaning: OpenAPI/Swagger specification, consistent response envelopes, documented error codes. | Implement the named API standard in versioned endpoints and OpenAPI documentation. | Test contracts, validation, errors, pagination, auth, idempotency, correlation IDs, and webhook protections. |
| API-003 | Status: Mandatory. Meaning: Pagination, sorting, filtering, field validation, sensible request-size limits. | Implement the named API standard in versioned endpoints and OpenAPI documentation. | Test contracts, validation, errors, pagination, auth, idempotency, correlation IDs, and webhook protections. |
| API-004 | Status: Mandatory. Meaning: Authentication and role/permission checks on every protected operation. | Implement the named API standard in versioned endpoints and OpenAPI documentation. | Test contracts, validation, errors, pagination, auth, idempotency, correlation IDs, and webhook protections. |
| API-005 | Status: Mandatory. Meaning: Idempotency for sensitive create/payment operations; request correlation IDs. | Implement the named API standard in versioned endpoints and OpenAPI documentation. | Test contracts, validation, errors, pagination, auth, idempotency, correlation IDs, and webhook protections. |
| API-006 | Status: Mandatory. Meaning: Webhook signature verification, replay protection, retry handling, dead-letter queues. | Implement the named API standard in versioned endpoints and OpenAPI documentation. | Test contracts, validation, errors, pagination, auth, idempotency, correlation IDs, and webhook protections. |
| API-007 | Status: Mandatory. Meaning: Separate public, authenticated customer, vendor, and administrative permissions. | Implement the named API standard in versioned endpoints and OpenAPI documentation. | Test contracts, validation, errors, pagination, auth, idempotency, correlation IDs, and webhook protections. |
| INT-PAY | Status: Mandatory capability; provider decision required. Meaning: Payment gateway: Collect payments, verify status, process refunds and support marketplace payouts where available. Selection notes / constraints: Select provider based on operating country, UPI/cards/net banking/COD needs, marketplace split-settlement support, fees and compliance. | Build the selected integration capability and adapter; keep provider/model decisions explicit. | Test sandbox flows, signatures, consent rules, and decision status. |
| INT-SHIP | Status: Mandatory capability; model decision required. Meaning: Shipping/courier: Rate lookup, serviceability, shipment booking, labels, tracking, reverse pickup. Selection notes / constraints: Compare direct carrier APIs with a shipping aggregator; validate service coverage and webhook quality. | Build the selected integration capability and adapter; keep provider/model decisions explicit. | Test sandbox flows, signatures, consent rules, and decision status. |
| INT-EMAIL | Status: Mandatory. Meaning: Email provider: Transactional emails, verification, invoices and alerts. Selection notes / constraints: Use templates, bounce handling, suppression and delivery logs. | Build the selected integration capability and adapter; keep provider/model decisions explicit. | Test sandbox flows, signatures, consent rules, and decision status. |
| INT-SMS | Status: Mandatory capability; provider/consent rules apply. Meaning: SMS/WhatsApp: OTP and permitted transactional or promotional messages. Selection notes / constraints: Use approved providers and follow consent/template rules. | Build the selected integration capability and adapter; keep provider/model decisions explicit. | Test sandbox flows, signatures, consent rules, and decision status. |
| INT-TAX | Status: Mandatory capability; rules decision required. Meaning: Tax/invoicing: Tax calculation, invoice numbering and tax reports. Selection notes / constraints: Confirm applicable jurisdictional rules with a qualified tax professional. | Build the selected integration capability and adapter; keep provider/model decisions explicit. | Test sandbox flows, signatures, consent rules, and decision status. |
| INT-MAPS | Status: Conditional. Meaning: Maps/address: Address autocomplete, geocoding and delivery coverage. Selection notes / constraints: Use only where it materially improves checkout or fulfilment. | Build the selected integration capability and adapter; keep provider/model decisions explicit. | Test sandbox flows, signatures, consent rules, and decision status. |
| INT-ANALYTICS | Status: Mandatory capability; consent/taxonomy/retention to define. Meaning: Analytics: Traffic, funnel, product and campaign analysis. Selection notes / constraints: Define consent, event taxonomy and data retention. | Build the selected integration capability and adapter; keep provider/model decisions explicit. | Test sandbox flows, signatures, consent rules, and decision status. |
| INT-ERP | Status: Mandatory capability; integrate after core model/ownership established. Meaning: Accounting/ERP/CRM: Financial reconciliation, stock sync and customer/business workflows. Selection notes / constraints: Integrate after core marketplace data model and ownership are established. | Build the selected integration capability and adapter; keep provider/model decisions explicit. | Test sandbox flows, signatures, consent rules, and decision status. |
| SEC-001 | Status: Mandatory. Meaning: HTTPS/TLS everywhere; secure cookies; appropriate security headers. | Implement the named security/privacy control and keep sensitive values out of logs. | Run negative security tests, secret scans, replay tests, and compliance reviews. |
| SEC-002 | Status: Mandatory; MFA inconsistency noted. Meaning: Passwords hashed using a modern password-hashing algorithm; MFA for privileged users. | Implement the named security/privacy control and keep sensitive values out of logs. | Run negative security tests, secret scans, replay tests, and compliance reviews. |
| SEC-003 | Status: Mandatory. Meaning: RBAC with least privilege and server-side authorization checks. | Implement the named security/privacy control and keep sensitive values out of logs. | Run negative security tests, secret scans, replay tests, and compliance reviews. |
| SEC-004 | Status: Mandatory. Meaning: Input validation, output encoding, parameterized queries, secure file-upload scanning. | Implement the named security/privacy control and keep sensitive values out of logs. | Run negative security tests, secret scans, replay tests, and compliance reviews. |
| SEC-005 | Status: Mandatory; CSRF “where applicable” in §3.18. Meaning: CSRF, XSS, SQL injection, SSRF, broken access control, and rate-limit protections. | Implement the named security/privacy control and keep sensitive values out of logs. | Run negative security tests, secret scans, replay tests, and compliance reviews. |
| SEC-006 | Status: Mandatory. Meaning: Secrets stored in a secrets manager or protected environment configuration, never committed to source control. | Implement the named security/privacy control and keep sensitive values out of logs. | Run negative security tests, secret scans, replay tests, and compliance reviews. |
| SEC-007 | Status: Mandatory. Meaning: Payment gateway tokenization/hosted checkout; do not store card numbers or CVV. | Implement the named security/privacy control and keep sensitive values out of logs. | Run negative security tests, secret scans, replay tests, and compliance reviews. |
| SEC-008 | Status: Mandatory. Meaning: Verify payment/shipping webhook signatures and protect against replay attacks. | Implement the named security/privacy control and keep sensitive values out of logs. | Run negative security tests, secret scans, replay tests, and compliance reviews. |
| SEC-009 | Status: Mandatory. Meaning: Audit privileged actions, seller bank-detail changes, refunds, commissions, payouts. | Implement the named security/privacy control and keep sensitive values out of logs. | Run negative security tests, secret scans, replay tests, and compliance reviews. |
| SEC-010 | Status: Mandatory. Meaning: Encrypt backups and sensitive fields; restrict access and test restoration. | Implement the named security/privacy control and keep sensitive values out of logs. | Run negative security tests, secret scans, replay tests, and compliance reviews. |
| SEC-011 | Status: Mandatory. Meaning: Privacy and consumer-law requirements assessed for each target market; for India, review DPDP, consumer protection, GST, payment, and e-commerce rules with qualified specialists. | Implement the named security/privacy control and keep sensitive values out of logs. | Run negative security tests, secret scans, replay tests, and compliance reviews. |
| SEC-012 | Status: Mandatory. Meaning: Dependency, container, static-analysis, and penetration testing before production. | Implement the named security/privacy control and keep sensitive values out of logs. | Run negative security tests, secret scans, replay tests, and compliance reviews. |
| QA-001 | Status: Mandatory. Meaning: Unit: Pricing, tax, commission, coupon eligibility, stock calculations, permissions, state transitions. | Build and run the named test suite and record actual results. | Verify coverage and report only executed results. |
| QA-002 | Status: Mandatory. Meaning: Integration: Database transactions, payment adapter, shipping adapter, queues, storage, webhook handlers. | Build and run the named test suite and record actual results. | Verify coverage and report only executed results. |
| QA-003 | Status: Mandatory. Meaning: API: Authentication, authorization, validation, pagination, errors, idempotency, rate limits. | Build and run the named test suite and record actual results. | Verify coverage and report only executed results. |
| QA-004 | Status: Mandatory. Meaning: End-to-end: Register → browse → cart → checkout → payment → fulfilment → delivery → review/return. | Build and run the named test suite and record actual results. | Verify coverage and report only executed results. |
| QA-005 | Status: Mandatory. Meaning: Vendor workflow: Onboarding → KYC approval → product submission → listing approval → order → settlement. | Build and run the named test suite and record actual results. | Verify coverage and report only executed results. |
| QA-006 | Status: Mandatory. Meaning: Security: Access control, injection, session handling, upload security, secrets, dependency vulnerabilities. | Build and run the named test suite and record actual results. | Verify coverage and report only executed results. |
| QA-007 | Status: Mandatory. Meaning: Performance: Search, catalogue browsing, checkout, flash-sale traffic, concurrent inventory updates. | Build and run the named test suite and record actual results. | Verify coverage and report only executed results. |
| QA-008 | Status: Mandatory. Meaning: Accessibility: Keyboard operation, focus, labels, contrast, screen-reader usability. | Build and run the named test suite and record actual results. | Verify coverage and report only executed results. |
| QA-009 | Status: Mandatory. Meaning: Regression: Critical flows every release; automated smoke suite after deployment. | Build and run the named test suite and record actual results. | Verify coverage and report only executed results. |
| DEP-001 | Status: Mandatory. Meaning: Environments: local development, automated test, staging/UAT, production; isolate credentials and data. | Implement the named environment, pipeline, media, telemetry, or runbook control. | Verify isolation, gates, smoke tests, rollback, restore, alerts, and docs. |
| DEP-002 | Status: Mandatory. Meaning: Use Docker for consistent local and CI environments. | Implement the named environment, pipeline, media, telemetry, or runbook control. | Verify isolation, gates, smoke tests, rollback, restore, alerts, and docs. |
| DEP-003 | Status: Mandatory. Meaning: CI pipeline: lint → type-check → unit/integration tests → build → dependency/security scans. | Implement the named environment, pipeline, media, telemetry, or runbook control. | Verify isolation, gates, smoke tests, rollback, restore, alerts, and docs. |
| DEP-004 | Status: Mandatory. Meaning: CD pipeline: deploy to staging, run smoke tests, require approval for production, retain rollback capability. | Implement the named environment, pipeline, media, telemetry, or runbook control. | Verify isolation, gates, smoke tests, rollback, restore, alerts, and docs. |
| DEP-005 | Status: Mandatory. Meaning: Use managed PostgreSQL with automated backups, monitoring, controlled migrations. | Implement the named environment, pipeline, media, telemetry, or runbook control. | Verify isolation, gates, smoke tests, rollback, restore, alerts, and docs. |
| DEP-006 | Status: Mandatory. Meaning: Serve media through object storage and CDN; use signed URLs for private documents. | Implement the named environment, pipeline, media, telemetry, or runbook control. | Verify isolation, gates, smoke tests, rollback, restore, alerts, and docs. |
| DEP-007 | Status: Mandatory. Meaning: Centralise secrets, logs, metrics; alert on payment failures, queue backlog, API errors, database health. | Implement the named environment, pipeline, media, telemetry, or runbook control. | Verify isolation, gates, smoke tests, rollback, restore, alerts, and docs. |
| DEP-008 | Status: Mandatory. Meaning: Document deployment, rollback, incident response, backup restore, disaster recovery procedures. | Implement the named environment, pipeline, media, telemetry, or runbook control. | Verify isolation, gates, smoke tests, rollback, restore, alerts, and docs. |
| PHASE-000 | Status: Recommendation. Meaning: Phase 0 — Discovery. Scope: Business rules, roles, requirements, target market, vendor/payment/logistics model, UX, architecture decisions. Exit criteria: Approved scope, user journeys, wireframes, architecture, delivery plan. | Plan work in the named phase and provide its exit evidence. | Review artefacts against exit criteria; do not treat a recommendation as approval. |
| PHASE-001 | Status: Recommendation. Meaning: Phase 1 — Platform foundation. Scope: Repo, environments, CI/CD, authentication, RBAC, database, design system, API standards, audit foundation. Exit criteria: Deployable skeleton with tested identity and permissions. | Plan work in the named phase and provide its exit evidence. | Review artefacts against exit criteria; do not treat a recommendation as approval. |
| PHASE-002 | Status: Recommendation. Meaning: Phase 2 — Marketplace core. Scope: Vendor onboarding, catalogue, product listing/moderation, categories, search, customer accounts, storefront. Exit criteria: Approved sellers can publish products; customers can browse/search. | Plan work in the named phase and provide its exit evidence. | Review artefacts against exit criteria; do not treat a recommendation as approval. |
| PHASE-003 | Status: Recommendation. Meaning: Phase 3 — Commerce. Scope: Cart, checkout, pricing, tax, payment integration, order creation, invoices. Exit criteria: End-to-end test purchase succeeds in provider sandbox. | Plan work in the named phase and provide its exit evidence. | Review artefacts against exit criteria; do not treat a recommendation as approval. |
| PHASE-004 | Status: Recommendation. Meaning: Phase 4 — Operations. Scope: Inventory, warehouse, vendor order handling, shipping, tracking, cancellations, returns, refunds. Exit criteria: Order-to-delivery and return flows work with test integrations. | Plan work in the named phase and provide its exit evidence. | Review artefacts against exit criteria; do not treat a recommendation as approval. |
| PHASE-005 | Status: Recommendation. Meaning: Phase 5 — Marketplace finance. Scope: Commissions, seller statements, settlement, reconciliation. Exit criteria: Finance can reconcile sample transactions and vendor balances. | Plan work in the named phase and provide its exit evidence. | Review artefacts against exit criteria; do not treat a recommendation as approval. |
| PHASE-006 | Status: Recommendation. Meaning: Phase 6 — Growth & insights. Scope: Promotions, loyalty, reviews, support, marketing, reports, analytics. Exit criteria: Business users can operate campaigns and review key metrics. | Plan work in the named phase and provide its exit evidence. | Review artefacts against exit criteria; do not treat a recommendation as approval. |
| PHASE-007 | Status: Recommendation. Meaning: Phase 7 — Hardening & launch. Scope: Security, performance, accessibility, UAT, migration, monitoring, backup/restore, production rollout. Exit criteria: Critical defects closed; launch checklist and operational ownership approved. | Plan work in the named phase and provide its exit evidence. | Review artefacts against exit criteria; do not treat a recommendation as approval. |
| PHASE-008 | Status: Recommendation. Meaning: Phase 8 — Expansion. Scope: Mobile apps, advanced search, recommendations, multi-region, B2B, service extraction as justified. Exit criteria: Expansion features validated against business priorities. | Plan work in the named phase and provide its exit evidence. | Review artefacts against exit criteria; do not treat a recommendation as approval. |
| MVP-001 | Status: Recommendation baseline. Meaning: Prioritise secure identity and role permissions. | Prioritise the named baseline area in the first production release unless a decision changes scope. | Check scope evidence and keep conditional features unresolved. |
| MVP-002 | Status: Recommendation baseline. Meaning: Prioritise vendor onboarding, product listing/moderation, catalogue/search, customer storefront. | Prioritise the named baseline area in the first production release unless a decision changes scope. | Check scope evidence and keep conditional features unresolved. |
| MVP-003 | Status: Recommendation baseline. Meaning: Prioritise cart/checkout, payment, inventory reservation, multi-vendor order splitting. | Prioritise the named baseline area in the first production release unless a decision changes scope. | Check scope evidence and keep conditional features unresolved. |
| MVP-004 | Status: Recommendation baseline. Meaning: Prioritise shipping/tracking, cancellation/returns/refunds, commissions/settlements. | Prioritise the named baseline area in the first production release unless a decision changes scope. | Check scope evidence and keep conditional features unresolved. |
| MVP-005 | Status: Recommendation baseline. Meaning: Prioritise admin operations, notifications, audit logs, reporting, production monitoring. | Prioritise the named baseline area in the first production release unless a decision changes scope. | Check scope evidence and keep conditional features unresolved. |
| MVP-006 | Status: Conditional. Meaning: Advanced loyalty, affiliate marketing, advanced/AI recommendations, native mobile apps, B2B procurement, and multi-region can follow in planned releases unless mandatory from day one. | Prioritise the named baseline area in the first production release unless a decision changes scope. | Check scope evidence and keep conditional features unresolved. |
| LAUNCH-001 | Status: Mandatory. Meaning: Business rules and policies signed off. | Prepare the named launch evidence, owner, and approval. | Verify evidence exists and do not mark complete without proof. |
| LAUNCH-002 | Status: Mandatory. Meaning: Customer, vendor, admin, and support roles tested. | Prepare the named launch evidence, owner, and approval. | Verify evidence exists and do not mark complete without proof. |
| LAUNCH-003 | Status: Mandatory. Meaning: Vendor KYC and product moderation workflows verified. | Prepare the named launch evidence, owner, and approval. | Verify evidence exists and do not mark complete without proof. |
| LAUNCH-004 | Status: Mandatory. Meaning: Product listing, variants, media, and inventory tested. | Prepare the named launch evidence, owner, and approval. | Verify evidence exists and do not mark complete without proof. |
| LAUNCH-005 | Status: Mandatory. Meaning: Checkout totals, tax, coupons, and payment flows reconciled. | Prepare the named launch evidence, owner, and approval. | Verify evidence exists and do not mark complete without proof. |
| LAUNCH-006 | Status: Mandatory. Meaning: Multi-vendor order splitting and shipment states tested. | Prepare the named launch evidence, owner, and approval. | Verify evidence exists and do not mark complete without proof. |
| LAUNCH-007 | Status: Mandatory. Meaning: Refund, return, commission, settlement calculations verified. | Prepare the named launch evidence, owner, and approval. | Verify evidence exists and do not mark complete without proof. |
| LAUNCH-008 | Status: Mandatory. Meaning: Security review, privacy review, vulnerability scan completed. | Prepare the named launch evidence, owner, and approval. | Verify evidence exists and do not mark complete without proof. |
| LAUNCH-009 | Status: Mandatory. Meaning: Load, accessibility, browser, mobile responsiveness checks completed. | Prepare the named launch evidence, owner, and approval. | Verify evidence exists and do not mark complete without proof. |
| LAUNCH-010 | Status: Mandatory. Meaning: Backups restored successfully in a test environment. | Prepare the named launch evidence, owner, and approval. | Verify evidence exists and do not mark complete without proof. |
| LAUNCH-011 | Status: Mandatory. Meaning: Monitoring, alerting, incident contacts, runbooks ready. | Prepare the named launch evidence, owner, and approval. | Verify evidence exists and do not mark complete without proof. |
| LAUNCH-012 | Status: Mandatory. Meaning: Production credentials, DNS, TLS, legal pages, support channels ready. | Prepare the named launch evidence, owner, and approval. | Verify evidence exists and do not mark complete without proof. |
| LAUNCH-013 | Status: Mandatory. Meaning: UAT approval, release notes, rollback plan completed. | Prepare the named launch evidence, owner, and approval. | Verify evidence exists and do not mark complete without proof. |
| DEC-001 | Status: Decision required. Meaning: Target launch country/countries, legal entity, applicable tax/consumer/privacy requirements. Impact: Tax, compliance, localization, legal pages. | Record the question and keep code/config free of assumed answers. | Search code/config/docs for invented answers and verify decision status. |
| DEC-002 | Status: Decision required. Meaning: Marketplace model: open multi-vendor, curated/approved vendors, or hybrid. Impact: Vendor onboarding and approval rules. | Record the question and keep code/config free of assumed answers. | Search code/config/docs for invented answers and verify decision status. |
| DEC-003 | Status: Decision required. Meaning: Product types: physical only, or also digital products, services, subscriptions. Impact: Catalogue, inventory, fulfilment, tax, permissions. | Record the question and keep code/config free of assumed answers. | Search code/config/docs for invented answers and verify decision status. |
| DEC-004 | Status: Decision required. Meaning: Payment provider(s), supported methods, COD policy, marketplace settlement capability. Impact: Payment adapters, split settlement, refunds, COD. | Record the question and keep code/config free of assumed answers. | Search code/config/docs for invented answers and verify decision status. |
| DEC-005 | Status: Decision required. Meaning: Shipping model: single aggregator, direct carriers, seller-fulfilled, marketplace-fulfilled, or mixed. Impact: Shipping adapters, rate lookup, labels, webhooks. | Record the question and keep code/config free of assumed answers. | Search code/config/docs for invented answers and verify decision status. |
| DEC-006 | Status: Decision required. Meaning: Commission rules, settlement frequency, reserve/holdback, dispute policy. Impact: Finance rules, ledger, payouts, dispute handling. | Record the question and keep code/config free of assumed answers. | Search code/config/docs for invented answers and verify decision status. |
| DEC-007 | Status: Decision required. Meaning: Initial languages, currencies, tax regions, localization needs. Impact: Formatting, tax display, catalog, UX. | Record the question and keep code/config free of assumed answers. | Search code/config/docs for invented answers and verify decision status. |
| DEC-008 | Status: Decision required. Meaning: Expected vendors, SKUs, monthly orders, peak concurrent users, growth forecast. Impact: Capacity planning, load tests, scaling. | Record the question and keep code/config free of assumed answers. | Search code/config/docs for invented answers and verify decision status. |
| DEC-009 | Status: Decision required. Meaning: Hosting preference, budget, team size, timeline, support model, SLOs. Impact: Infrastructure, delivery plan, support model, RPO/RTO. | Record the question and keep code/config free of assumed answers. | Search code/config/docs for invented answers and verify decision status. |
| DEC-010 | Status: Decision required. Meaning: Whether MFA is optional or mandatory for privileged users: §3.18 says optional MFA; §9 requires MFA for privileged users. Impact: Authentication design and admin controls. | Record the question and keep code/config free of assumed answers. | Search code/config/docs for invented answers and verify decision status. |
| DEC-011 | Status: Decision required. Meaning: Whether support, warehouse, delivery, and finance roles use dedicated portals or admin-console subareas. Impact: Portal decomposition and navigation. | Record the question and keep code/config free of assumed answers. | Search code/config/docs for invented answers and verify decision status. |
| DEC-012 | Status: Decision required. Meaning: Guest checkout policy: §2 and §3.6 allow it only where permitted/subject to business policy. Impact: Checkout flows and authorization. | Record the question and keep code/config free of assumed answers. | Search code/config/docs for invented answers and verify decision status. |
| DEC-013 | Status: Decision required. Meaning: ORM selection: Prisma or TypeORM. Impact: Data access implementation. | Record the question and keep code/config free of assumed answers. | Search code/config/docs for invented answers and verify decision status. |
| DEC-014 | Status: Decision required. Meaning: Real-time transport: WebSockets or server-sent events “where suitable”. Impact: Status-update implementation. | Record the question and keep code/config free of assumed answers. | Search code/config/docs for invented answers and verify decision status. |
| DEC-015 | Status: Decision required. Meaning: Search engine threshold: PostgreSQL full-text initially; OpenSearch/Elasticsearch when needed. Impact: Search architecture and migration trigger. | Record the question and keep code/config free of assumed answers. | Search code/config/docs for invented answers and verify decision status. |
| DEC-016 | Status: Decision required. Meaning: Which optional/conditional features from PDF §16 are launch requirements: mobile apps, B2B, multi-warehouse, loyalty, affiliate, advanced/AI recommendations, subscriptions, gift cards, store credit, social sign-in, social commerce, additional channels. Impact: Scope and phasing. | Record the question and keep code/config free of assumed answers. | Search code/config/docs for invented answers and verify decision status. |
| DEC-017 | Status: Decision required. Meaning: Whether live chat/chatbot and blog/editorial content are required. Impact: Support/content scope. | Record the question and keep code/config free of assumed answers. | Search code/config/docs for invented answers and verify decision status. |
| DEC-018 | Status: Decision required. Meaning: PCI DSS responsibility boundary with the selected payment provider. Impact: Compliance documentation and control allocation. | Record the question and keep code/config free of assumed answers. | Search code/config/docs for invented answers and verify decision status. |
| DEC-019 | Status: Decision required. Meaning: Load balancer, auto-scaling, and concrete failover topology. Not specified in PDF. Impact: Availability and scalability design. | Record the question and keep code/config free of assumed answers. | Search code/config/docs for invented answers and verify decision status. |
| DEC-020 | Status: Decision required. Meaning: Numeric performance, availability, RPO/RTO, retention, and breakpoint targets. Not specified in PDF. Impact: NFR acceptance thresholds. | Record the question and keep code/config free of assumed answers. | Search code/config/docs for invented answers and verify decision status. |
| DEC-021 | Status: Decision required before development. Meaning: Exact state machines and transition rules for orders, payments, refunds, returns, shipments, vendors, products. Impact: Business-rule finalization. | Record the question and keep code/config free of assumed answers. | Search code/config/docs for invented answers and verify decision status. |
| DEC-022 | Status: Decision required before development. Meaning: Duplicate-listing rules, content guidelines, tax calculation source of truth, commission calculation examples, reconciliation matching rules. Impact: Business rule finalization. | Record the question and keep code/config free of assumed answers. | Search code/config/docs for invented answers and verify decision status. |
| DEC-023 | Status: Decision required. Meaning: Search quality targets for typo tolerance, synonyms, and relevance ranking. Impact: Search acceptance criteria. | Record the question and keep code/config free of assumed answers. | Search code/config/docs for invented answers and verify decision status. |
| DEC-024 | Status: Decision required; subordinate to DEC-016. Meaning: Day-one-mandatory subset of `DEC-016`: whether native apps, B2B procurement, multi-region capability, loyalty, affiliate, and advanced/AI recommendations are mandatory from day one. This does not supersede `DEC-016`; multi-region from PDF §17 remains distinct from multi-warehouse in `DEC-016`, and no answer is assumed. Impact: MVP baseline confirmation. | Record the question and keep code/config free of assumed answers. | Search code/config/docs for invented answers and verify decision status. |
| UX-DISC-001 | Status: Mandatory. Meaning: Discovery and user journeys for customer, vendor, admin, support, and fulfilment roles. | Produce the named Figma/design artefact and review it before implementation of major flows. | Review completeness, responsiveness, states, accessibility, and sign-off evidence. |
| UX-IA-001 | Status: Mandatory. Meaning: Information architecture, sitemap, and navigation model. | Produce the named Figma/design artefact and review it before implementation of major flows. | Review completeness, responsiveness, states, accessibility, and sign-off evidence. |
| UX-WIRE-001 | Status: Mandatory; breakpoints decision required. Meaning: Wireframes for all critical screens and responsive breakpoints; numeric breakpoints remain decision-required. | Produce the named Figma/design artefact and review it before implementation of major flows. | Review completeness, responsiveness, states, accessibility, and sign-off evidence. |
| UX-DS-001 | Status: Mandatory. Meaning: Figma design system covering colours, typography, spacing, grids, components, form states, and accessibility rules. | Produce the named Figma/design artefact and review it before implementation of major flows. | Review completeness, responsiveness, states, accessibility, and sign-off evidence. |
| UX-HIFI-001 | Status: Mandatory. Meaning: High-fidelity screens for storefront, product listing/detail, cart, checkout, customer account, vendor portal, and admin console. | Produce the named Figma/design artefact and review it before implementation of major flows. | Review completeness, responsiveness, states, accessibility, and sign-off evidence. |
| UX-STATE-001 | Status: Mandatory. Meaning: Loading, empty, error, validation, success, and permission-denied states. | Produce the named Figma/design artefact and review it before implementation of major flows. | Review completeness, responsiveness, states, accessibility, and sign-off evidence. |
| UX-REVIEW-001 | Status: Mandatory. Meaning: Usability review and sign-off before implementation of major flows. | Produce the named Figma/design artefact and review it before implementation of major flows. | Review completeness, responsiveness, states, accessibility, and sign-off evidence. |
| DEL-SPEC-001 | Status: Mandatory. Meaning: Business requirements and functional specification. | Produce the named handover artefact and link it to requirement IDs. | Review the artefact against acceptance criteria and check no extra scope claim. |
| DEL-ROLES-001 | Status: Mandatory. Meaning: User roles, permissions matrix, and process flows. | Produce the named handover artefact and link it to requirement IDs. | Review the artefact against acceptance criteria and check no extra scope claim. |
| DEL-DESIGN-001 | Status: Mandatory. Meaning: Information architecture, wireframes, Figma UI kit, and final designs. | Produce the named handover artefact and link it to requirement IDs. | Review the artefact against acceptance criteria and check no extra scope claim. |
| DEL-ARCH-001 | Status: Mandatory. Meaning: System architecture diagram and architecture decision records. | Produce the named handover artefact and link it to requirement IDs. | Review the artefact against acceptance criteria and check no extra scope claim. |
| DEL-DATA-001 | Status: Mandatory. Meaning: Database ERD, schema, and migration scripts. | Produce the named handover artefact and link it to requirement IDs. | Review the artefact against acceptance criteria and check no extra scope claim. |
| DEL-CODE-001 | Status: Mandatory. Meaning: Backend source code, frontend source code, and API documentation. | Produce the named handover artefact and link it to requirement IDs. | Review the artefact against acceptance criteria and check no extra scope claim. |
| DEL-PORTAL-001 | Status: Mandatory; optional mobile applications as agreed. Meaning: Vendor, customer, and admin portals; optional mobile applications as agreed. | Produce the named handover artefact and link it to requirement IDs. | Review the artefact against acceptance criteria and check no extra scope claim. |
| DEL-INT-001 | Status: Mandatory. Meaning: Integration adapters and sandbox configuration for selected providers. | Produce the named handover artefact and link it to requirement IDs. | Review the artefact against acceptance criteria and check no extra scope claim. |
| DEL-QA-001 | Status: Mandatory. Meaning: Automated unit, integration, API, and end-to-end test suites. | Produce the named handover artefact and link it to requirement IDs. | Review the artefact against acceptance criteria and check no extra scope claim. |
| DEL-DEPLOY-001 | Status: Mandatory. Meaning: Deployment scripts, Docker configuration, and CI/CD pipeline. | Produce the named handover artefact and link it to requirement IDs. | Review the artefact against acceptance criteria and check no extra scope claim. |
| DEL-RUNBOOK-001 | Status: Mandatory. Meaning: Monitoring dashboards, backup/restore, and operational runbooks. | Produce the named handover artefact and link it to requirement IDs. | Review the artefact against acceptance criteria and check no extra scope claim. |
| DEL-DOC-001 | Status: Mandatory. Meaning: Admin/user guides, technical documentation, and handover. | Produce the named handover artefact and link it to requirement IDs. | Review the artefact against acceptance criteria and check no extra scope claim. |

## Original document content (unchanged)

# Software Requirements Specification (SRS)

**Project:** Task 2 — E-Commerce Marketplace  
**Source of truth:** `docs/requirements/Task_2_Complete_Ecommerce_Marketplace_Specification.pdf`  
**Document status:** Draft derived SRS for planning and estimation; the PDF remains authoritative. Not approved; pending human approval and resolution of DEC-001–DEC-024.  
**Version:** 1.0 derived SRS version; requirements remain a draft planning baseline pending DEC-001–DEC-024.

## Status vocabulary

| Status | Meaning |
|---|---|
| **Mandatory** | Explicit in-scope/imperative requirement in the PDF or a feature the PDF calls a scope requirement. |
| **Conditional** | The PDF qualifies the item with wording such as “where applicable”, “if enabled”, “if supported”, “optional”, “where supported”, or “subject to policy”. |
| **Recommendation** | The PDF labels the item as recommended or suggested. It is not presented as a confirmed final decision. |
| **Decision required** | The PDF identifies the item as unresolved, to agree, or dependent on a future selection. |

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
| FR-CHK-002 | Guest and authenticated checkout, subject to business policy. | Conditional | [DEC-012](#12-unresolved-decisions-and-items-to-confirm) |
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
| FR-COMP-001 | Secure authentication, password hashing, optional MFA, and session management. | Conditional for MFA; mandatory authentication/session | [SEC-AUTH-*](../architecture/SECURITY-ARCHITECTURE.md) |
| FR-COMP-002 | RBAC, least-privilege access, admin step-up authentication, and audit logs. | Mandatory | [SEC-AUTHZ-*](../architecture/SECURITY-ARCHITECTURE.md) |
| FR-COMP-003 | TLS in transit, encryption at rest, secrets management, and secure file uploads. | Mandatory | [SEC-DATA-*](../architecture/SECURITY-ARCHITECTURE.md) |
| FR-COMP-004 | Input validation, output encoding, CSRF protection where applicable, XSS/SQL injection controls, and rate limiting. | Mandatory; CSRF conditional | [SEC-APP-001](../architecture/SECURITY-ARCHITECTURE.md) |
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
| TEC-003 | Vendor/admin portals | Next.js + React + TypeScript | Separate role-aware applications or clearly separated portal areas. | Recommendation; structure decision required |
| TEC-004 | Backend | Node.js + NestJS + TypeScript | Modular business services, validation, dependency injection, API layer. | Recommendation |
| TEC-005 | API style | REST + OpenAPI/Swagger | Stable integration contract; version APIs and document errors. | Recommendation |
| TEC-006 | Real-time | WebSockets / server-sent events where suitable | Order, support, operational status updates. | Recommendation; choice to agree |
| TEC-007 | Primary database | PostgreSQL | Transactional relational data and referential integrity. | Recommendation; §6 makes it system of record |
| TEC-008 | ORM/migrations | Prisma (or TypeORM) | Typed data access and versioned schema migrations. | Recommendation; choice to agree |
| TEC-009 | Cache/queue | Redis + BullMQ | Caching, rate limiting, sessions where appropriate, background jobs. | Recommendation |
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

| ID | Requirement | Status | Cross-reference |
|---|---|---|---|
| ARC-001 | Begin with a modular monolith: one deployable backend organised into strict domain modules with explicit interfaces, independent tests, and clear data ownership. | Recommendation | [ARC-001](../architecture/SYSTEM-ARCHITECTURE.md) |
| ARC-002 | Avoid premature microservice complexity while preserving extraction of high-load or independently operated modules later. | Recommendation | [PHASE-008](#11-development-phases-and-mvp-baseline) |
| ARC-003 | Presentation layer: customer storefront, vendor portal, admin console, optional mobile apps. | Recommendation | [ARC-PRES](../architecture/SYSTEM-ARCHITECTURE.md) |
| ARC-004 | API/application layer: authentication, authorization, request validation, orchestration, versioned APIs. | Recommendation | [API-001](../architecture/API-DESIGN.md) |
| ARC-005 | Domain modules: catalogue, vendor, customer, pricing, cart, checkout, payment, inventory, order, fulfilment, shipping, returns, finance, support, marketing, reporting. | Recommendation | [ARC-DOMAIN](../architecture/SYSTEM-ARCHITECTURE.md) |
| ARC-006 | Data layer: PostgreSQL, Redis, object storage, search index where needed. | Recommendation | [DB-*](../architecture/DATABASE-ERD.md) |
| ARC-007 | Integration layer: payment, courier, email/SMS, tax, analytics, accounting providers. | Recommendation | [INT-*](../architecture/SYSTEM-ARCHITECTURE.md) |
| ARC-008 | Async processing: background queues for emails, webhooks, invoice generation, search indexing, exports, scheduled tasks. | Recommendation | [ARC-ASYNC](../architecture/SYSTEM-ARCHITECTURE.md) |
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
| SEC-002 | Passwords hashed using a modern password-hashing algorithm; MFA for privileged users. | Mandatory; MFA inconsistency noted | [DEC-010](#12-unresolved-decisions-and-items-to-confirm) |
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
| DEC-010 | Whether MFA is optional or mandatory for privileged users: §3.18 says optional MFA; §9 requires MFA for privileged users. | Decision required | Authentication design and admin controls. |
| DEC-011 | Whether support, warehouse, delivery, and finance roles use dedicated portals or admin-console subareas. | Decision required | Portal decomposition and navigation. |
| DEC-012 | Guest checkout policy: §2 and §3.6 allow it only where permitted/subject to business policy. | Decision required | Checkout flows and authorization. |
| DEC-013 | ORM selection: Prisma or TypeORM. | Decision required | Data access implementation. |
| DEC-014 | Real-time transport: WebSockets or server-sent events “where suitable”. | Decision required | Status-update implementation. |
| DEC-015 | Search engine threshold: PostgreSQL full-text initially; OpenSearch/Elasticsearch when needed. | Decision required | Search architecture and migration trigger. |
| DEC-016 | Which optional/conditional features from PDF §16 are launch requirements: mobile apps, B2B, multi-warehouse, loyalty, affiliate, advanced/AI recommendations, subscriptions, gift cards, store credit, social sign-in, social commerce, additional channels. | Decision required | Scope and phasing. |
| DEC-017 | Whether live chat/chatbot and blog/editorial content are required. | Decision required | Support/content scope. |
| DEC-018 | PCI DSS responsibility boundary with the selected payment provider. | Decision required | Compliance documentation and control allocation. |
| DEC-019 | Load balancer, auto-scaling, and concrete failover topology. Not specified in PDF. | Decision required | Availability and scalability design. |
| DEC-020 | Numeric performance, availability, RPO/RTO, retention, and breakpoint targets. Not specified in PDF. | Decision required | NFR acceptance thresholds. |
| DEC-021 | Exact state machines and transition rules for orders, payments, refunds, returns, shipments, vendors, products. | Decision required before development | Business-rule finalization. |
| DEC-022 | Duplicate-listing rules, content guidelines, tax calculation source of truth, commission calculation examples, reconciliation matching rules. | Decision required before development | Business rule finalization. |
| DEC-023 | Search quality targets for typo tolerance, synonyms, and relevance ranking. | Decision required | Search acceptance criteria. |
| DEC-024 | Day-one-mandatory subset of `DEC-016`: whether native apps, B2B procurement, multi-region capability, loyalty, affiliate, and advanced/AI recommendations are mandatory from day one. This does not supersede `DEC-016`; multi-region from PDF §17 remains distinct from multi-warehouse in `DEC-016`, and no answer is assumed. | Decision required; subordinate to DEC-016 | MVP baseline confirmation. |

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
