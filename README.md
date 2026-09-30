# Leadfold Frontend

Dashboard for Leadfold — view captured leads, and find your API key / form webhook URL under Settings.

## Stack

- Next.js 16 (App Router, Turbopack), TypeScript, React 19
- MUI (Material UI) v6, via `@mui/material-nextjs`'s `v16-appRouter` cache provider (note: `@mui/material-nextjs` itself is on a newer v9.x line than MUI core — its versioning is independent, don't be surprised by the mismatch)
- Plain `fetch` + a JWT stored in `localStorage` for auth — no NextAuth/session library, kept deliberately simple for this stage

## Setup

1. Copy `.env.example` to `.env.local` and point `NEXT_PUBLIC_API_URL` at the backend (defaults to `http://localhost:4000/api`).
2. `npm install`
3. `npm run dev` — served at `http://localhost:3000`.

Needs the backend (`leadfold-backend`) running for anything past the landing page to work.

## Pages

| Path | Purpose |
|---|---|
| `/` | Marketing placeholder |
| `/signup`, `/login` | Auth — stores the returned JWT + API key in `localStorage` on success |
| `/dashboard` | Leads table (protected — redirects to `/login` if no token) |
| `/dashboard/settings` | Shows the account's API key and the form webhook URL to embed elsewhere |

## Not built yet

- A UI for connecting a WhatsApp Business number (currently has to be inserted into the backend's `WhatsAppConfig` table manually).
- A UI for connecting/testing Zapier or Make (currently just documents the API key + webhook URL; the actual Zap/Scenario setup happens on Zapier's/Make's side).
- Proper session handling (refresh tokens, etc) — the JWT is long-lived (30 days) and just sits in `localStorage` for now.

See `CLAUDE.md` in this repo, and `CLAUDE.md` in `leadfold-backend`, for the fuller project context.
