# `hooks`

Shared React hooks. The `@/hooks` alias is already declared in
`components.json`. Currently empty — no hooks to share yet.

When the integration is needed, expect:

- `use-media-query.ts` — viewport queries
- `use-debounced-value.ts` — debounce arbitrary values
- `use-local-storage.ts` — typed wrapper over `window.localStorage`
- `use-admin-session.ts` — once auth is wired in `lib/auth/`

Hooks that are specific to one component (e.g. a sidebar's open
state) stay in that component, not here.
