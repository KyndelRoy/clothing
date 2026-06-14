# `lib/auth`

Placeholder for authentication and authorization helpers. Nothing is
implemented yet — the admin MVP is fully static and has no session.

When the integration is needed, expect:

- `session.ts` — read/write the current session (cookie or storage)
- `guards.ts` — `requireAdmin()`, `requireRole(role)` for server code
- `providers/` — Supabase / Firebase / NextAuth adapters
- `types.ts` — `Session`, `User`, `Role` shapes

The admin `(admin)` route group's `layout.tsx` will eventually call a
guard here to gate access. Until then, all admin pages are public.
