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