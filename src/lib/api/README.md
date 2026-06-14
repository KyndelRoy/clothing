# `lib/api`

Holds the data-fetching layer the rest of the app talks to. Goal: keep
pages and components free of raw `fetch` calls and put auth, error
handling, and base-URL config in one place.

When this folder goes live, expect something like:

- `client.ts` — typed `fetch` wrapper (base URL, JSON, error parsing)
- `endpoints/` — one file per resource (`products.ts`, `orders.ts`, …)
- `types.ts` — request/response DTOs

Pages and server components should call into here, not Supabase or
Firebase directly — those live behind the same surface so we can swap
backends without touching the UI.
