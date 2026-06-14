# `config`

App-wide configuration. Anything you'd otherwise hard-code across
multiple files belongs here so it can change in one place.

When the integration is needed, expect:

- `site.ts` — public site name, tagline, contact email
- `admin.ts` — admin-only constants (default page size, feature flags)
- `env.ts` — typed accessor for `process.env` with sensible defaults
- `routes.ts` — canonical route paths (re-exported from the nav data)

If a value is only used in one component, it can stay local. This
folder is for shared values with two or more consumers.
