# AGENTS.md

## Stack

TanStack Start (SSR) + TanStack Router (file-based) + TanStack Query + React 19 with React Compiler. PostgreSQL via Drizzle ORM. Better Auth (email/password + username + admin plugin). Tailwind CSS v4 + shadcn/ui ("base-luma" style). Zod v4 for validation. `neverthrow` for Result types (no thrown errors in service/repo layers).

## Commands

```bash
bun install                  # install deps
bun --bun run dev            # dev server on :3000
bun --bun run build          # production build (Nitro → dist/)
bun run check                # typecheck (tsc --noEmit)
bun run lint                 # oxlint --fix (NOT eslint)
bun run format               # oxfmt --write (NOT prettier)
bun run generate-routes      # regenerate src/routeTree.gen.ts
bun run db:push              # push schema to DB (drizzle-kit push)
bun run db:studio            # drizzle studio
```

Run `lint` and `check` before considering work done. There is no test suite configured.

## Path aliases

`#/*` → `./src/*` (defined in package.json `imports` + tsconfig `paths`). Use `#/feature/...`, `#/lib/...`, `#/database/...` in imports.

## Project structure

```
src/
  routes/          # file-based routes (TanStack Router)
  feature/         # domain modules (akun, auth, dashboard, kelompok)
  database/        # Drizzle schema, relations, db instance
  lib/             # shared utilities (auth, env, schemas, utils)
  components/      # shared UI components
  hooks/           # shared React hooks
```

## Feature module pattern

Each feature in `src/feature/{name}/` follows this structure:

- `server/model.ts` — Zod schemas + inferred types
- `server/errors.ts` — error factory objects with `code` discriminant
- `server/repo.server.ts` — database access (uses `ResultAsync` from neverthrow)
- `server/service.server.ts` — business logic (chains repo calls with `.andThen()`)
- `server/fn.ts` — TanStack Start server functions (`createServerFn`), calls service, handles error mapping to thrown `Error`
- `queries/` — TanStack Query `queryOptions` factories
- `mutations/` — TanStack Query mutation hooks
- `components/` — feature-specific React components

Server functions must call `ensureSession()` from `#/lib/auth-function` before any DB access.

## Database

- Schema files: `src/database/schema/*.ts`, re-exported from `src/database/schema/index.ts`
- Relations: `src/database/relations.ts` (uses `defineRelations` from drizzle-orm)
- DB instance: `src/database/index.ts` (drizzle with postgres-js driver)
- Drizzle config: `drizzle.config.ts` at repo root, schema at `./src/database/schema/index.ts`
- All tables use integer PKs with `generatedByDefaultAsIdentity()`
- Common timestamps via `createdUpdated` from `src/database/schema/common.ts`

## Auth (Better Auth)

- Server: `src/lib/auth.ts` — configures Better Auth with Drizzle adapter, email/password, username, admin plugins
- Client: `src/lib/auth-client.ts` — client-side auth with tanstack-start cookies
- Session helpers: `src/lib/auth-function.ts` — `getSession()` and `ensureSession()` server functions
- Auth API route: `src/routes/api/auth/$.ts` — catch-all handler
- User model has custom `idKelompok` field (required number)

## Environment variables

Required in `.env` (validated by Zod at startup in `src/lib/env.ts`):

- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `CRON_SECRET`

## Linting & formatting

Uses **oxlint** and **oxfmt** (not ESLint/Prettier). Config: `.oxlintrc.json`, `.oxfmtrc.json`.

React Compiler is enforced as an error rule in oxlint. The babel plugin for React Compiler is in `vite.config.ts`.

oxfmt ignores `**/routeTree.gen.ts` (generated file).

## Key conventions

- UI text is in Indonesian (Bahasa Indonesia)
- Route tree is generated — run `bun run generate-routes` after adding/removing route files
- `src/routeTree.gen.ts` is auto-generated, do not edit manually
- Server files use `.server.ts` suffix convention
- Error handling in services/repos uses neverthrow `Result`/`ResultAsync`, never thrown exceptions
- Server functions (`fn.ts`) translate neverthrow errors to thrown `Error` for client consumption
- Nitro is the server adapter (for deployment to any Node host)
