# AGENTS.md — Beginner-Friendly Copy

> Learning copy only. No requirement, ID, business rule, API contract, architecture decision, or status was changed. The original content is reproduced below.

## Start here

This file explains the original `AGENTS.md` in simple English.

Use it to learn what the instructions mean. Use the original content below as the source of truth.

## Plain-English terms

| Term you will see | Simple meaning |
|---|---|
| Marketplace | A website where different sellers list products and customers buy them. |
| Full-stack | Both the user-facing side and the server side of an application. |
| Frontend | The part users see in the browser or app. |
| Backend | The server code that stores data and applies rules. |
| API | A way for the frontend, mobile apps, or other systems to talk to the backend. |
| API contract | The agreed request and response format for an API. |
| REST | A common style for APIs using web URLs and HTTP methods. |
| OpenAPI | A written description of an API that people and tools can read. |
| ORM | A tool that lets code work with database data as objects. Prisma is the approved ORM. |
| Schema | The defined shape of database tables and fields. |
| Migration | A controlled change to the database schema. |
| DTO | A data object used to validate input at the API edge. |
| RBAC | Role-based access control. Permissions depend on the user role. |
| Least privilege | Give each user only the access they truly need. |
| Idempotency | Doing the same request again does not create a duplicate effect. |
| Webhook | A callback message from another system, such as a payment provider. |
| Tokenized | Replaced with a safe reference instead of storing the raw sensitive value. |
| SQL injection | An attack that tries to change database queries through user input. |
| XSS | An attack that puts harmful script into a page. |
| CSRF | An attack that tricks a browser into sending an unwanted request. |
| Rate limiting | Limiting how many requests a user or system can make in a period. |
| Atomicity | A group of steps either all happen or none happen. |
| Mass assignment | An attack where extra input fields are used to change data that should be protected. |
| N+1 query problem | Running many extra database queries where a better single query would work. |
| E2E | End-to-end. A test that follows a full user journey. |
| Regression | A new change that breaks something that used to work. |

## How to use this guide

- Read the original documents before writing code.
- Do not guess rules that are not in the documents.
- If something is unclear, ask for clarification.
- Keep security and data integrity ahead of speed.

## Topic 1 — Project overview

- **What is it?** TradeOrbit is an e-commerce marketplace with customers, vendors, administrators, and operations users.
- **Why do we need it?** A shared overview helps every builder understand the same goal.
- **How does it work?** Documentation is read first. Then work is planned, built, tested, and reviewed.
- **Example:** A customer buys a product from a vendor. An administrator may review the listing if it needs moderation.
- **What do I need to build?** Features that fit the documented marketplace roles and journeys.
- **How do I test it?** Check that the feature works for the intended role and does not break another role.

## Topic 2 — Technology stack

- **What is it?** The approved tools and technologies for the project.
- **Why do we need it?** A fixed stack keeps the code consistent and reviewable.
- **How does it work?** Use the listed frontend, backend, database, ORM, cache, queue, infrastructure, API, testing, and Git tools.
- **Example:** A vendor dashboard uses Next.js and React. The backend uses NestJS. Product data is stored in PostgreSQL through Prisma.
- **What do I need to build?** Use approved technologies only. Ask before adding a major new technology.
- **How do I test it?** Confirm the code follows the stack and that existing test tools can run it.

## Topic 3 — Documentation is the source of truth

- **What is it?** Requirements and architecture documents define what must be built.
- **Why do we need it?** This prevents invented rules and accidental requirement changes.
- **How does it work?** Read the listed requirement and architecture files before implementation.
- **Example:** If a settlement rule is not documented, ask instead of choosing a value.
- **What do I need to build?** Only work that can be traced to documented requirements.
- **How do I test it?** Compare the implementation with the relevant requirement and acceptance criteria.

## Topic 4 — Security requirements

- **What is it?** Mandatory rules for protecting users, data, money, and the platform.
- **Why do we need it?** A marketplace handles personal details, seller data, and payments.
- **How does it work?** Validate input on the backend, enforce permissions, hide secrets, and avoid unsafe patterns.
- **Example:** A vendor bank detail change should be checked on the server and recorded in an audit trail.
- **What do I need to build?** Environment variables for secrets, backend validation, RBAC checks, safe password handling, and rate limits on sensitive endpoints.
- **How do I test it?** Try missing input, malicious input, unauthorized roles, and cross-user access. Check logs do not contain secrets.

## Topic 5 — Database standards

- **What is it?** Rules for storing data safely and consistently with PostgreSQL and Prisma.
- **Why do we need it?** Marketplace data must stay correct during orders, stock changes, and refunds.
- **How does it work?** Use keys, constraints, indexes, migrations, and transactions where needed.
- **Example:** Two customers buying the last item must not cause stock to go below the configured limit.
- **What do I need to build?** Proper primary keys, foreign keys, unique constraints, indexes, and migrations.
- **How do I test it?** Check constraints, transaction behavior, query performance, and that production data is not edited directly.

## Topic 6 — Backend standards

- **What is it?** The structure and rules for NestJS server code.
- **Why do we need it?** Clear separation makes business logic easier to secure and test.
- **How does it work?** Controllers handle requests. Services hold business logic. DTOs validate input. Database access is separated.
- **Example:** A checkout request is validated, totals are calculated on the server, and the order is created through a service.
- **What do I need to build?** Modules, controllers, services, DTOs, consistent errors, OpenAPI docs, authorization checks, and idempotency where duplicates cause harm.
- **How do I test it?** Use unit tests for logic and integration tests for APIs and database behavior.

## Topic 7 — Frontend standards

- **What is it?** Rules for React and Next.js user interfaces.
- **Why do we need it?** Users need clear, accessible, responsive screens that do not hide server rules.
- **How does it work?** Build reusable components, keep API calls separate, and show loading, empty, error, and success states.
- **Example:** A product page shows price and availability from the server. It does not decide the final payable amount by itself.
- **What do I need to build?** Reusable components, strict TypeScript types, accessible layouts, and separate API call code.
- **How do I test it?** Check keyboard use, screen sizes, error messages, and that frontend checks are not the only validation.

## Topic 8 — Testing requirements

- **What is it?** The tests required before calling work complete.
- **Why do we need it?** Tests give evidence that behavior is correct and secure.
- **How does it work?** Use unit tests, integration tests, API tests, and E2E tests for critical journeys.
- **Example:** For checkout, test cart updates, server-calculated totals, inventory reservation, payment callback handling, and failure paths.
- **What do I need to build?** Test cases for valid, invalid, missing, malicious, unauthorized, and cross-user situations.
- **How do I test it?** Run the relevant tests and builds. Only report tests as passed when they were actually executed.

## Topic 9 — Coding workflow

- **What is it?** The ordered process for each development task.
- **Why do we need it?** Small steps make work easier to review and reduce mistakes.
- **How does it work?** Read docs, understand structure, explain approach, find risks, implement in small steps, test, review, and summarize.
- **Example:** Before adding returns screenshots, read the returns requirements and check who may upload evidence.
- **What do I need to build?** A reviewable change set with security and data-integrity thinking included.
- **How do I test it?** Run tests, linting, builds, and review the changed files for regressions.

## Topic 10 — Git rules

- **What is it?** Safe habits for version control.
- **Why do we need it?** Existing work must not be lost or overwritten.
- **How does it work?** Use feature branches when appropriate, clear commit messages, and review diffs before proposing commits.
- **Example:** Put a payments change on a feature branch so it can be reviewed separately.
- **What do I need to build?** No code artifact. This is a process rule.
- **How do I test it?** Check `git diff` before committing or proposing a commit. Do not force-push or commit without approval.

## Topic 11 — AI agent restrictions

- **What is it?** Limits on automated helper actions.
- **Why do we need it?** Some actions can damage data, expose secrets, or change architecture.
- **How does it work?** Ask before destructive or irreversible actions. Do not install extra dependencies or assume business rules.
- **Example:** Do not invent a commission percentage because the document says it is unresolved.
- **What do I need to build?** Follow the approved architecture and keep unresolved questions visible.
- **How do I test it?** Review commands and changes against these restrictions before running or proposing them.

## Topic 12 — Definition of Done

- **What is it?** The checklist the original file uses to judge whether a feature is done.
- **Why do we need it?** It stops work from being called finished when security, tests, or documentation are missing.
- **How does it work?** Check acceptance criteria, backend validation, authorization, database integrity, tests, security, edge cases, and docs.
- **Example:** A vendor payout feature is not done if only the screen works but reconciliation evidence is missing.
- **What do I need to build?** All required proof for the feature, not just the visible interface.
- **How do I test it?** Use the original checklist below. Do not mark anything complete in this learning copy.

## Original document content (unchanged)

# TradeOrbit — AI Development Instructions

## 1. Project Overview

TradeOrbit is a secure, scalable, full-stack e-commerce marketplace supporting customers, vendors, administrators, and marketplace operations.

Before writing code, read and understand all project documentation in `docs/`.

## 2. Technology Stack

Use the following approved stack:

- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend: NestJS, Node.js, TypeScript
- Database: PostgreSQL
- ORM: Prisma
- Cache and queues: Redis, BullMQ
- Infrastructure: Docker
- API: REST with OpenAPI documentation
- Testing: Jest, Supertest, Playwright
- Version control: Git and GitHub

Do not introduce major technologies without approval.

## 3. Documentation Is the Source of Truth

Read these files before implementing features:

- `docs/requirements/SRS.md`
- `docs/requirements/BUSINESS-RULES.md`
- `docs/requirements/USER-STORIES.md`
- `docs/requirements/ACCEPTANCE-CRITERIA.md`
- `docs/architecture/SYSTEM-ARCHITECTURE.md`
- `docs/architecture/DATABASE-ERD.md`
- `docs/architecture/API-DESIGN.md`
- `docs/architecture/SECURITY-ARCHITECTURE.md`
- `docs/architecture/PERFORMANCE-STRATEGY.md`

Do not invent business rules or silently change requirements.

If documentation is incomplete or conflicting, stop and ask for clarification.

## 4. Security Requirements

Security is mandatory, not optional.

- Never hardcode secrets, passwords, API keys, or database credentials.
- Use environment variables for sensitive configuration.
- Validate all incoming data on the backend.
- Use secure authentication and session/token handling.
- Enforce role-based access control on the backend.
- Never trust frontend-only authorization.
- Apply least-privilege access.
- Prevent SQL injection, XSS, CSRF, and other common web vulnerabilities.
- Use secure password hashing where passwords are managed.
- Apply rate limiting to sensitive endpoints.
- Never expose internal errors, stack traces, or sensitive data in API responses.
- Protect against mass assignment and unauthorized object access.
- Use transactions for operations requiring atomicity.
- Never log passwords, tokens, payment credentials, or personal secrets.

## 5. Database Standards

- Use PostgreSQL with Prisma.
- Define appropriate primary keys, foreign keys, unique constraints, and indexes.
- Enforce data integrity at the database level wherever possible.
- Use migrations for schema changes.
- Never modify production data directly.
- Use transactions for multi-step critical operations.
- Avoid unnecessary queries and N+1 query problems.
- Never delete important business records without an approved retention policy.

## 6. Backend Standards

- Follow NestJS modular architecture.
- Separate controllers, services, modules, DTOs, and database access.
- Keep business logic out of controllers.
- Validate DTOs at API boundaries.
- Use consistent HTTP status codes and error responses.
- Document endpoints using OpenAPI.
- Implement authorization checks on every protected resource.
- Use idempotency for operations where duplicate execution could cause financial or business errors.

## 7. Frontend Standards

- Use reusable React components.
- Use TypeScript with strict typing.
- Keep API calls separate from UI components.
- Handle loading, empty, error, and success states.
- Implement responsive and accessible interfaces.
- Never store sensitive secrets in frontend code.
- Never rely on frontend validation as the only validation layer.

## 8. Testing Requirements

Before considering a feature complete:

- Write unit tests for business logic.
- Write integration tests for APIs and database interactions.
- Test authentication and authorization.
- Test invalid, missing, and malicious inputs.
- Test unauthorized access and cross-user data access.
- Add end-to-end tests for critical user journeys.
- Run relevant tests and builds before reporting completion.

Never claim tests passed unless they were actually executed.

## 9. Coding Workflow

Follow this sequence for every task:

1. Read the relevant requirements and architecture documents.
2. Understand the existing project structure.
3. Explain the implementation approach.
4. Identify security and data-integrity risks.
5. Implement in small, reviewable steps.
6. Run tests, linting, and builds.
7. Review changed files for security and regressions.
8. Summarize changed files and test results.

Do not generate the entire application in one step.

## 10. Git Rules

- Work on feature branches when appropriate.
- Use meaningful commit messages.
- Never force-push without explicit approval.
- Never delete or overwrite existing work without approval.
- Never push code or create commits without the user's approval.
- Review `git diff` before proposing a commit.

## 11. AI Agent Restrictions

- Do not execute destructive commands without approval.
- Do not expose secrets in terminal output.
- Do not install unnecessary dependencies.
- Do not change the approved architecture without approval.
- Do not skip tests to make a feature appear complete.
- Do not assume payment, tax, shipping, or commission rules.
- Ask before making irreversible changes.

## 12. Definition of Done

A feature is complete only when:

- It meets the documented acceptance criteria.
- Backend validation and authorization are implemented.
- Database integrity is maintained.
- Relevant tests pass.
- No known critical security issue remains.
- Error and edge cases are handled.
- Documentation is updated where necessary.

**Primary rule: Security, correctness, data integrity, and documented business requirements take priority over implementation speed.**