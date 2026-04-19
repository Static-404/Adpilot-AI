# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## AdPilot AI — Main Product

A responsive web app for small businesses to generate AI-powered marketing recommendations.

**Design**: Dark charcoal theme (220 14% 8%), orange primary (25 95% 53%), Inter + Space Grotesk fonts.

**Key files**:
- `artifacts/adpilot-ai/src/App.tsx` — Router with Clerk auth + Wouter
- `artifacts/adpilot-ai/src/pages/Landing.tsx` — Public landing page
- `artifacts/adpilot-ai/src/pages/Home.tsx` — Dashboard (auth-gated)
- `artifacts/adpilot-ai/src/components/CampaignForm.tsx` — Campaign brief form with currency selector
- `artifacts/adpilot-ai/src/components/ResultsPanel.tsx` — AI recommendations display
- `artifacts/adpilot-ai/src/components/SavedCampaigns.tsx` — Per-user saved campaigns
- `artifacts/adpilot-ai/src/lib/mockAi.ts` — Mock AI (ready to swap for real AI API)
- `artifacts/adpilot-ai/src/lib/storage.ts` — localStorage scoped by userId
- `artifacts/adpilot-ai/src/lib/currency.ts` — Currency detection + formatting

**Auth**: Clerk (Google + Apple OAuth configurable via Auth pane). Keys auto-provisioned.
- Sign in: `/sign-in`, Sign up: `/sign-up`
- Unauthenticated users see the landing page; authenticated users redirect to `/app`

**Currency**: Auto-detected from `navigator.language`. Selector in budget field. Threads through all AI output. Saved per user in localStorage.

**Campaigns**: Scoped to userId in localStorage — each user's campaigns are isolated.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
