# `services`

Domain services. These sit between the UI (`app/`, `components/`) and
the data layer (`lib/api/`, `lib/supabase/`, `lib/firebase/`) and
encapsulate business logic so pages stay thin.

When the integration is needed, expect:

- `products.ts` — `listProducts()`, `getProduct(id)`, `createProduct(input)`
- `orders.ts` — `listOrders()`, `updateOrderStatus(id, status)`
- `dashboard.ts` — `getDashboardStats()` (aggregates + cache hints)

Pages call services, not `lib/api/*` directly. This indirection makes
it easy to add cross-cutting concerns (caching, logging, optimistic
updates) in one place.
