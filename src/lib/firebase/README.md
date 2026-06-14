# `lib/firebase`

Placeholder for the Firebase client. Currently empty — the Firebase
SDK is not installed and no env vars are set.

When the integration is needed, this folder will hold:

- `client.ts` — initialized Firebase app + per-service clients
- `auth.ts`, `firestore.ts`, `storage.ts` — one file per service
- `config.ts` — env-var-driven config (`apiKey`, `projectId`, …)

Usage rules match the Supabase folder: pages call `lib/api/`, not
this client. Direct imports from here are reserved for server code
and the auth helpers in `lib/auth/`.
