# Leadfold — project context (frontend)

This is the dashboard half of Leadfold. The full business/strategy context lives in `leadfold-backend/CLAUDE.md` (sibling repo, `D:\Dev\leadfold-backend`) — read that one for the "why this product exists" story. This file only covers frontend-specific context.

## What this app is

The dashboard for Leadfold — a tool that parses messy WhatsApp/form/DM messages into structured leads (via Claude, in the backend) and pushes them into the user's CRM via Zapier/Make. This frontend is intentionally thin right now: view captured leads, find your API key and form webhook URL. The actual value (parsing, webhooks, Zapier integration) lives entirely in `leadfold-backend`.

## Stack and why

- **Next.js 16 App Router + TypeScript + MUI** — explicit founder choice. An earlier pass had started building this with Tailwind before the founder specified MUI; don't reintroduce Tailwind. Started on Next 14, but `npm install` reported a critical RCE advisory (GHSA-p293-qw3h-jr36, "Unauthenticated Remote Code Execution on windows-hosted servers" — relevant since this founder develops on Windows) affecting everything below 16.3.8, so bumped straight to 16 instead of settling for a 15.x patch. Keep dependencies audited (`npm audit`) — don't let a fresh project start with known-vulnerable versions pinned in `package.json`.
- **MUI v6** (core) + **`@mui/material-nextjs` v9.x** (its App Router cache helper — versioned independently of MUI core, don't be surprised these numbers don't match) wired up via the `v16-appRouter` export in `src/components/ThemeRegistry.tsx`.
- **Gotcha (already hit, don't reintroduce it)**: the MUI `theme` object (from `src/theme.ts`) contains functions (`breakpoints.up`/`.down`/etc). React Server Components can't serialize functions across the server→client prop boundary, so if a Server Component (e.g. `layout.tsx`, which has no `"use client"`) passes `theme={theme}` directly into `<ThemeProvider>`, the build fails with "Functions cannot be passed directly to Client Components." That's *why* `ThemeRegistry.tsx` exists as its own `"use client"` module that imports `theme` internally — `layout.tsx` only ever passes `children` into it, never the theme itself. Same root cause hit `src/app/page.tsx` (`<Button component={Link}>` passing a component reference from a page that wasn't yet marked `"use client"`) — any page that passes a component/function as a prop to an MUI (or other client-library) component needs `"use client"` at its top, or needs to not be the thing crossing that boundary.
- **Auth is deliberately minimal**: JWT + API key returned from `/auth/signup` or `/auth/login` get stored in `localStorage` (`src/lib/auth.ts`), and `src/lib/api.ts` attaches the JWT as a Bearer token on every request. No NextAuth, no refresh-token flow, no server-side session. Fine for an early-stage single-tenant-per-browser dashboard; revisit before this handles anything more sensitive.

## Working conventions

- Confirm stack/library choices explicitly before introducing a new one (this founder wants to be asked, not have decisions made for them — see the backend `CLAUDE.md` for the incident that established this).
- Talks to the backend only through `src/lib/api.ts` — don't scatter raw `fetch` calls across pages.
- Keep this dashboard's scope aligned with what the backend actually exposes (check `leadfold-backend/README.md`'s endpoint table before building a page that assumes an endpoint that doesn't exist yet).
