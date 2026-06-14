# `lib/validators`

Placeholder for shared validation schemas. zod is the intended library
(consistent with the rest of the React 19 / Next 16 ecosystem) but is
not installed yet.

When this folder goes live, expect one file per domain:

- `product.ts` — `ProductSchema`, `ProductInputSchema`
- `order.ts` — `OrderSchema`, `CheckoutInputSchema`
- `settings.ts` — `StoreSettingsSchema`

Form components and server actions import schemas from here so the
same rules run on the client and on the server.
