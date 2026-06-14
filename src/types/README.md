# `types`

Shared TypeScript types that span more than one layer (UI + services,
or services + api). Domain types that belong to a single layer should
live next to that layer instead.

When the integration is needed, expect:

- `domain/` — `product.ts`, `order.ts`, `customer.ts`
- `api.ts` — generic `ApiResponse<T>`, `ApiError`, pagination shapes
- `env.d.ts` — declarations for `process.env.*` keys

If a type is only used in one component, keep it local. This folder is
for types with two or more consumers.
