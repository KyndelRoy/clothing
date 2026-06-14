# `lib/supabase`

Placeholder for the Supabase client. Currently empty — the Supabase
SDK is not installed and no env vars are set.

When the integration is needed, this folder will hold:

- `client.ts` — browser-side Supabase client (anon key, public reads)
- `server.ts` — server-side client (service role for admin writes)
- `types.ts` — generated database types (from `supabase gen types`)

Conventions for usage:

- Browser components go through `lib/api/`, never through this client directly.
- Server actions / route handlers may import from here directly.
- Auth helpers (login, session, role checks) belong in `lib/auth/`.
