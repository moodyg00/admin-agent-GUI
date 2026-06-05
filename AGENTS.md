# AGENTS.md

Guidance for cloud agents working in **admin-agent-GUI**.

## Product

Human–agent workspace for operating businesses. This repo is the deep agentic UI; **proto-2** (separate repo) owns the shared Prisma schema and public site.

## Stack

- Next.js 15 + React 19 + TypeScript (App Router, Turbopack)
- coss ui only (installed via `shadcn init @coss/style`)
- Planned: Prisma 7 + PostgreSQL (`DATABASE_URL`), Supabase auth, AI SDK

See also: `.agent.md`, `docs/architecture.md`, `docs/coss-ui.md`.

## Commands

| Task | Command |
|------|---------|
| Install deps | `pnpm install` |
| Dev server | `pnpm dev` → http://localhost:3000 |
| Lint | `pnpm lint` |
| Build | `pnpm build` |
| Production | `pnpm start` (after `pnpm build`) |

There is no test runner configured yet.

## Environment variables

Copy `.env.example` to `.env.local` for local development. Only `NEXT_PUBLIC_APP_URL` is required for the current shell; database and Supabase keys are needed when Prisma/proto-2 integration lands.

## Cursor Cloud specific instructions

- **Single runnable service**: `admin-agent-GUI` on port **3000**. proto-2, PostgreSQL, and Supabase are documented but not in this repo yet.
- **Start dev server**: `pnpm dev` from repo root. Use tmux for long-running processes.
- **Health check**: `GET /api/health` returns JSON `{ ok, service, version }`.
- **coss ui**: Do not add shadcn/Radix-only patterns; follow `docs/coss-ui.md`. Add components with `pnpm dlx shadcn@latest add @coss/ui <component>`.
- **pnpm build scripts**: `sharp` and `unrs-resolver` are allowlisted in `package.json` under `pnpm.onlyBuiltDependencies` so installs stay non-interactive in cloud VMs.
- **Homepage fetch**: `app/page.tsx` calls `/api/health` at request time (`force-dynamic`); the dev server must be running for the “Environment ready” badge during manual checks.
