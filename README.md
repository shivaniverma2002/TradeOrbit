# TradeOrbit

**A Multi-Vendor E-Commerce Marketplace**

TradeOrbit is a planned multi-vendor e-commerce marketplace designed to bring customers, independent vendors, and marketplace administrators together through a centralized platform.

The project aims to provide a unified shopping experience, vendor management, product catalogue management, order processing, inventory management, payment integration, shipping workflows, and administrative operations.

> **Project status:** Foundation configuration and documentation are in progress. Application features are planned and have not yet been implemented.

---

## 1. Project Overview

TradeOrbit aims to address the complexity of operating a multi-vendor marketplace by providing separate interfaces for customers, vendors, and administrators while maintaining a centralized backend.

The platform is designed around:

- Multiple independent vendors.
- Centralized customer shopping experience.
- Vendor-specific product and order management.
- Centralized authentication and authorization.
- Multi-vendor order processing.
- Secure payment and settlement workflows.
- Administrative monitoring and marketplace operations.

## 2. Planned Features

### Customer Platform
- Customer registration, login, and account management.
- Product discovery, search, and filtering.
- Shopping cart and checkout.
- Multi-vendor order placement.
- Order tracking and notifications.
- Cancellation, return, and refund workflows.

### Vendor Platform
- Vendor registration and onboarding.
- Vendor profile and store management.
- Product and catalogue management.
- Inventory management.
- Order processing and fulfilment.
- Sales and performance reporting.

### Admin Platform
- Centralized marketplace administration.
- User and role management.
- Vendor onboarding and verification.
- Product and catalogue moderation.
- Order and dispute management.
- Commission and settlement administration.
- Audit and reporting capabilities.

These are planned capabilities, not claims of completed functionality.

## 3. Technology Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, React.js, TypeScript |
| Styling | Tailwind CSS |
| Backend | NestJS, Node.js, TypeScript |
| Database | PostgreSQL |
| ORM | Prisma |
| Cache and sessions | Redis |
| Background jobs | BullMQ |
| API | REST, OpenAPI |
| Containerization | Docker |
| Unit and integration testing | Jest, Supertest |
| End-to-end testing | Playwright |
| Package management | pnpm workspaces |

## 4. System Architecture

TradeOrbit follows a monorepo architecture with three frontend applications and one centralized backend.

### Frontend applications

- **Customer Web:** Customer-facing shopping experience.
- **Vendor Web:** Vendor operations and store management.
- **Admin Web:** Separate administrative portal.

### Backend application

A NestJS modular monolith provides centralized business logic, authentication, authorization, APIs, and integrations.

The backend is organized into business modules rather than independently deployed microservices.

### Architecture overview

```text
                 TradeOrbit Marketplace
                          |
          +---------------+---------------+
          |               |               |
     Customer Web     Vendor Web      Admin Web
          |               |               |
          +---------------+---------------+
                          |
                    REST APIs
                          |
                 NestJS Modular Monolith
                    |        |        |
                    |        |        v
                    |        |     BullMQ
                    |        |  background job processing
                    |        +--------+
                    v                 v
                 Prisma             Redis
                    |          sessions, caching,
                    v          queues/jobs
              PostgreSQL
```

## 5. Monorepo Structure

The approved repository structure is:

```text
TradeOrbit/
├── apps/
│   ├── customer-web/
│   ├── vendor-web/
│   ├── admin-web/
│   └── api/
│
├── packages/
│   ├── config-typescript/
│   ├── config-eslint/
│   ├── shared-types/
│   └── shared-validation/
│
├── infrastructure/
│   ├── docker/
│   └── scripts/
│
├── docs/
│   ├── requirements/
│   ├── architecture/
│   ├── security/
│   ├── beginner-guide/
│   ├── audits/
│   ├── development/
│   ├── operations/
│   ├── testing/
│   └── project-management/
│
├── .github/
│   └── workflows/
│
├── AGENTS.md
├── README.md
├── package.json
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
├── tsconfig.base.json
├── .gitignore
└── .env.example
```

This represents the approved target structure. Application and infrastructure directories will be populated as implementation progresses.

## 6. Authentication and Security

Security is a core architectural requirement.

The approved authentication design includes:

- NestJS-managed authentication.
- Redis-backed server-side sessions.
- Opaque session identifiers.
- Secure HttpOnly cookies.
- CSRF protection using the `X-CSRF-Token` header.
- Role-based authorization enforced by the backend.
- Restricted sessions for users with unverified email addresses.
- Mandatory MFA for designated privileged roles.
- Optional MFA for customers.
- Optional Google sign-in for customers.
- Guest checkout with secure guest identity handling.

### Approved authentication defaults

| Security control | Approved setting |
|---|---|
| Password hashing | Argon2id, 19 MiB, 2 iterations, parallelism 1 |
| Customer session | 12-hour idle, 30-day absolute |
| Privileged session | 30-minute idle, 8-hour absolute |
| Email verification link | 24 hours |
| Password reset link | 1 hour |
| Failed login threshold | 5 attempts |
| Login lockout | 15 minutes |
| Failed MFA threshold | 5 attempts |
| Recovery codes | 10 single-use codes |
| TOTP | 6 digits, 30-second period, ±1 interval |
| Verification resend | 1 per hour, 3 per day |
| Login history retention | 90 days |
| Security audit retention | 1 year |
| Revoked session metadata | 90 days |

These are approved configuration defaults, subject to the documented security review and implementation prerequisites.

**Important:** TradeOrbit uses Redis-backed opaque sessions, not JWT-based browser authentication. No `JWT_SECRET` is required by the approved design.

## 7. Database and Infrastructure

### PostgreSQL
PostgreSQL is the planned primary relational database and system of record.

### Prisma
Prisma will manage database access, schema definitions, migrations, and typed database queries.

### Redis
Redis will support server-side sessions, caching, and rate-limiting workflows.

### BullMQ
BullMQ will support background processing and asynchronous jobs.

### Docker
Docker will provide a consistent local development and deployment environment.

Infrastructure providers and production hosting topology remain subject to project decisions.

## 8. Prerequisites

The approved root configuration specifies:

| Requirement | Version |
|---|---|
| Node.js | `>=24.0.0 <25.0.0` |
| pnpm | `>=10.11.0 <11.0.0` |
| Package manager pin | `pnpm@10.11.0` |
| Docker | Required when using the planned containerized infrastructure |
| PostgreSQL | Required for backend development |
| Redis | Required for sessions and other backend infrastructure |

You will also need:

- Git and GitHub access.
- A code editor such as Visual Studio Code.
- A terminal such as PowerShell.
- Environment configuration for local development.

## 9. Installation and Local Development

The following is the intended setup workflow. Application-specific development commands will become usable as the corresponding applications are implemented.

### Step 1: Clone the repository

```bash
git clone https://github.com/shivaniverma2002/TradeOrbit.git
cd TradeOrbit
```

### Step 2: Install dependencies

After installing the required Node.js and pnpm versions:

```bash
pnpm install
```

### Step 3: Configure environment variables

Use the root `.env.example` as the configuration reference.

Create environment files in the appropriate application or local development context according to the eventual workspace configuration.

Never commit real secrets or production credentials.

### Step 4: Start infrastructure

The planned local infrastructure will use Docker for services such as PostgreSQL and Redis. Docker Compose configuration is a future implementation task.

### Step 5: Start applications

Use the available workspace development scripts after the relevant applications have been created and configured.

## 10. Workspace Commands

The following commands are defined in the current root `package.json`.

| Command | Purpose |
|---|---|
| `pnpm dev` | Run available development scripts recursively |
| `pnpm dev:customer-web` | Start customer web development script |
| `pnpm dev:vendor-web` | Start vendor web development script |
| `pnpm dev:admin-web` | Start admin web development script |
| `pnpm dev:api` | Start API development script |
| `pnpm build` | Run available build scripts |
| `pnpm build:packages` | Build shared packages |
| `pnpm build:apps` | Build applications and dependencies |
| `pnpm lint` | Run lint scripts |
| `pnpm lint:fix` | Run lint-fix scripts |
| `pnpm format` | Check formatting |
| `pnpm format:write` | Apply formatting |
| `pnpm typecheck` | Run TypeScript checks |
| `pnpm test` | Run available tests |
| `pnpm test:unit` | Run unit tests |
| `pnpm test:integration` | Run integration tests |
| `pnpm test:e2e` | Run end-to-end tests |
| `pnpm clean` | Run available clean scripts |

These scripts use recursive workspace execution and optional-script handling. Some commands will have no application-level work to perform until their respective workspace packages exist.

## 11. Environment Configuration

The root `.env.example` documents the intended environment variables.

Configuration is separated into:

- Root-shared configuration.
- Frontend-public configuration.
- Backend-only configuration.
- Local Docker Compose configuration.
- Conditional integrations.
- Deferred configuration.

### Security rules

1. Frontend applications may expose only browser-safe public variables.
2. Backend secrets must remain restricted to the API and workers.
3. Never commit `.env`, `.env.local`, or production secrets.
4. Do not expose database credentials or encryption keys in frontend bundles.
5. Use approved secrets management for production MFA keys.
6. Keep unresolved provider credentials unset until the corresponding integration is approved.

The root `.env.example` is a documentation template. It does not automatically configure environment-variable loading for the individual workspace applications.

## 12. Testing, Linting, Formatting and Build

The planned quality strategy includes:

### Unit Testing
Jest will be used for isolated application and business-logic tests.

### API and Integration Testing
Supertest will support API endpoint and integration testing.

### End-to-End Testing
Playwright will support user-journey and browser-level testing.

### Code Quality
- TypeScript strict checking.
- ESLint-based code quality.
- Prettier formatting.
- Build validation.
- Automated testing through the planned CI workflow.

Testing infrastructure and CI workflows are not yet implemented.

## 13. Project Documentation

The following documents provide the project specifications and engineering guidance:

### Requirements
- [Software Requirements Specification](docs/requirements/SRS.md)
- [Business Rules](docs/requirements/BUSINESS-RULES.md)
- [User Stories](docs/requirements/USER-STORIES.md)
- [Acceptance Criteria](docs/requirements/ACCEPTANCE-CRITERIA.md)

### Architecture
- [System Architecture](docs/architecture/SYSTEM-ARCHITECTURE.md)
- [Database ERD](docs/architecture/DATABASE-ERD.md)
- [API Design](docs/architecture/API-DESIGN.md)
- [Security Architecture](docs/architecture/SECURITY-ARCHITECTURE.md)
- [Performance Strategy](docs/architecture/PERFORMANCE-STRATEGY.md)

### Security and Audits
- [Authentication Implementation Plan](docs/audits/AUTHENTICATION-IMPLEMENTATION-PLAN.md)
- [Complete Project Audit](docs/audits/COMPLETE-PROJECT-AUDIT.md)
- [Task 2 Verification Report](docs/audits/TASK-2-VERIFICATION-REPORT.md)

### Learning Resources
- [Beginner Guide](docs/beginner-guide/README.md)

## 14. Current Project Status

TradeOrbit is currently in its project-foundation and documentation stage.

| Area | Current status |
|---|---|
| Requirements documentation | Prepared |
| Architecture documentation | Prepared |
| Authentication decisions G1–G8 | Approved |
| Root package configuration | Created |
| pnpm workspace configuration | Created |
| Base TypeScript configuration | Created |
| Git ignore configuration | Created |
| Environment example | Created |
| Root README | Created (pending final review) |
| Application code | Not implemented |
| Database schema and migrations | Not implemented |
| API modules | Not implemented |
| Frontend applications | Not implemented |
| Automated tests | Not implemented |
| CI/CD workflows | Not implemented |
| Production deployment | Not implemented |

The project audit currently identifies outstanding prerequisites and does not authorize starting application implementation yet.

## 15. Contribution and Git Workflow

TradeOrbit follows a feature-branch and pull-request workflow.

### Branch naming

Examples:

```text
feature/project-foundation
feature/customer-authentication
feature/vendor-management
feature/product-catalogue
fix/authentication-validation
docs/update-project-readme
```

### Recommended workflow

1. Start from the approved base branch.
2. Create a dedicated feature branch.
3. Implement one focused task.
4. Run relevant formatting, linting, type checking and tests.
5. Review the changed files.
6. Commit the approved changes.
7. Push the feature branch.
8. Open a pull request.
9. Request senior review.
10. Merge only after the required approvals and checks.

Do not commit environment secrets, credentials, generated files, or unrelated changes.

---

## Project Repository

GitHub: https://github.com/shivaniverma2002/TradeOrbit

**TradeOrbit — Building a secure and scalable multi-vendor marketplace.**
