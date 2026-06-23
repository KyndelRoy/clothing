# Responsiveness + UX Pass — Handoff Notes

**Project:** `/home/roy/Documents/personal-projects/tshirt` (armak-clothing, Next.js 16 + React 19 + Tailwind 4)
**Session date:** 2026-06-18
**Dev server:** `http://localhost:3000` (currently running production build via `pnpm run start`)

---

## TL;DR

Four-phase responsiveness + UX pass on the client surface. Phases 1-3 delivered and
verified (lint + types + build pass, visual sweep at 360/414/768/1024/1280/1536). Phase 4
partially delivered (hero only). **Discovered a pre-existing CSS compilation bug** that
makes every `bg-primary` button render transparent — not introduced by this pass, but it
materially affects how the changes look. See "Pre-existing bug" section.

---

## User decisions captured this session

- Header brand on mobile: **icon-only** (brand text hidden below sm)
- Shop filter on mobile: **bottom-sheet** (thumb-friendly, common on mobile shopping apps)
- Approach: **phased**, sign-off between phases (Roy's standing preference)

---

## Phase 1 — Header mobile ✅ DELIVERED

**File:** `src/components/client/header.tsx`

Changes:
- Brand text "Armak Clothing Co." hidden below sm via `hidden sm:inline truncate whitespace-nowrap`
- Brand `<Link>` and `<img>` both `shrink-0` + `min-w-0` so layout can't break
- Mobile Shop now button: removed redundant `Tooltip` wrapper, bumped to `h-10` (40px touch target)
- Hamburger button: bumped to `h-10 w-10` (40px touch target)
- Social icons: `max-sm:hidden` → `max-md:hidden` (no longer crowd the 640-767px range)
- Header gap: `gap-3` mobile, `sm:gap-6` from sm+ (tighter on mobile where space matters)
- Removed unused `Tooltip` / `TooltipTrigger` / `TooltipContent` import

**Result by viewport:**
- 360px: `[logo] [Shop now] [hamburger]` — clean, no wrapping
- 768px: `[logo] [brand] [social × 4] [Shop now] [hamburger]`
- 1280px: `[logo] [brand] [Home Shop nav] [social × 4] [Shop now]`

---

## Phase 2 — Shop page mobile ✅ DELIVERED

**New file:** `src/components/ui/sheet.tsx` — Radix Dialog-based Sheet component
following the shadcn pattern adapted to the project's radix-luma style.
- `side` prop: `'top' | 'right' | 'bottom' | 'left'`
- Slots: `SheetHeader`, `SheetTitle`, `SheetDescription`, `SheetBody`, `SheetFooter`
- Backdrop blur overlay, slide-in animations on open/close
- `rounded-t-3xl` for bottom variant, `max-h-[85vh]`

**File rewritten:** `src/components/client/shop-page-content.tsx` (~830 lines)
- Desktop sidebar (was always visible, 276px) → `hidden lg:block` so it only shows at lg+
- Mobile "Filters" trigger button (`<div className="lg:hidden">` wrapper) with `SlidersHorizontalIcon` + active-count badge (`bg-primary` circle showing number of distinct active filter categories)
- Bottom-sheet on mobile opens the full filter UI; "View N products" sticky footer button closes the sheet
- Sort bar reflow: `flex-col gap-2` on mobile (search full-width row 1, count + sort row 2), `sm:flex-row sm:items-center` from sm+
- Product grid: `grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4` (was `grid-cols-2 sm:grid-cols-3`)
- Lifted `FilterSection` open/closed state to a `Record<string, boolean>` in the parent so it survives sheet unmount/remount (Radix Dialog unmounts content on close by default)
- Lifted `activeFilterCategoryCount` to the parent and used it for the mobile badge
- Active-filter quick-clear pill under the sort bar on mobile only
- `renderFilters()` is called twice — once in desktop sidebar, once in mobile sheet — both bind to the same parent state

**Notes for next session:**
- The `FiltersPanel` shim I built in an earlier iteration was deleted in favor of `renderFilters()` inline. The current file is the cleaner version. ~830 lines.
- Section open/closed defaults are at the top of the component: `gender/category/size/fabric: true`, `color/price/fit/neckline/features: false`

---

## Phase 3 — Product detail mobile ✅ DELIVERED

**File:** `src/components/client/product-detail-content.tsx`

Changes:
- Layout breakpoint: `lg:grid-cols-2` → `md:grid-cols-2` so iPad portrait (768-1023px) gets the side-by-side gallery + info layout (was stretching the mobile single-col view)
- Thumbnail strip: `size-16` → `size-12 sm:size-16` so 5+ thumbnails fit on one row at 360px
- Added sticky bottom cart bar (visible `< sm:hidden`, hidden sm+):
  ```
  [− 1 +] [Add to Cart · ₱price]
  ```
  - h-11 quantity buttons (44px touch target)
  - h-11 rounded-full full-width primary "Add to Cart" button that includes the price
  - `fixed inset-x-0 bottom-0 z-40`, `bg-background/95` with `backdrop-blur-md`
- 80px bottom spacer (`h-20 sm:hidden`) prevents the sticky bar from covering the last content
- Inline quantity + Add to Cart / Buy Now buttons: `hidden sm:flex` so the sticky bar takes over on mobile only

**Result by viewport:**
- 360px: single col, sticky bar with quantity + Add to Cart visible
- 768px: 2-col (gallery left, info right), inline Add to Cart + Buy Now buttons
- 1280px: 2-col, inline buttons

---

## Phase 4 — Home page polish ⚠️ PARTIAL

**File:** `src/components/client/hero-section.tsx` (modified)

Done:
- Hero grid: `lg:grid-cols-5` → `md:grid-cols-5` (iPad portrait now uses 5-col with text col-span-3 and image col-span-2)
- Text alignment: `max-lg:items-center` → `max-md:items-center`, same for text-center
- CTAs: full-width stacked on mobile (`flex flex-col gap-3`), inline from sm+ (`sm:flex-row sm:items-center sm:gap-3.5`)
- "Shop now" button: added `h-12 w-full sm:w-fit`
- "Browse collection" button: `h-12 w-full sm:w-fit rounded-full bg-primary/10 ...`

NOT DONE in this phase:
- Popular brands card proportion (2-col on md-lg, 4-col on xl — current state is acceptable, no real change needed)
- Testimonials carousel layout (current state acceptable — title left, cards right on sm+)
- Contact section (1-col mobile, 2-col lg — fine)
- 404 page (`h-screen` + responsive content — fine)

---

## Pre-existing bug discovered (NOT FIXED, separate ticket)

**Symptom:** Every Button using `bg-primary` (the default variant) renders as a transparent
text link instead of a black-filled pill. The hover gradient overlay (`before:bg-[linear-gradient...]`)
is also invisible because the button background is transparent.

**Affected by this bug:**
- Header "Shop now" desktop button
- Hero "Shop now" + "Browse collection" buttons
- Sticky cart bar "Add to Cart · ₱price" on product detail
- Shop page "View N products" sticky footer in sheet
- Any other `bg-primary` / `bg-primary/10` / `text-primary` usages

**Root cause:** The `@theme inline` block in `src/app/(client)/client.css` (lines 15-71)
maps `--color-primary: var(--primary)` etc., but the compiled CSS in **both dev and
production builds** does NOT include `.bg-primary` / `.text-primary` rules.

**Evidence:**
- Production CSS file `0cgt~02i021i0.css` (72KB) — `grep bg-primary` returns 0 matches
- Dev CSS file `src_app_globals_0p2ml0n.css` (93KB) — same, 0 matches
- The compiled `@layer theme` block in both files has all the standard Tailwind tokens
  (`--color-red-500`, `--color-amber-400`, `--color-blue-500`, etc.) but is missing
  `--color-primary`, `--color-secondary`, `--color-accent`, etc.
- `--primary: black;` IS defined in `:root` in the compiled output

**Hypothesis:** Tailwind 4's `@theme inline` directive either:
- Has a processing order issue with the `:root` variables (the `@theme` block references
  `var(--primary)` but `--primary` is defined in `:root` later in the same file)
- Or there's a known bug with `@theme inline` + `:root` color tokens in this version
  of Tailwind 4 (project uses `tailwindcss@4.3.0`)

**Why the rest of the responsive work still holds up:**
- Layout changes (full-width buttons, breakpoints, sticky bar, sheet) are correct
- The buttons just don't have visible backgrounds — they look like wider text links instead of pills
- The Tailwind 4 pitfalls skill (`/home/roy/.hermes/skills/software-development/tailwind-4-pitfalls/SKILL.md`)
  notes that `@apply` can't reach tokens defined in a different CSS file, but that's a
  different issue. The problem here is the `@theme inline` block not generating utilities
  even though the file owns the variables.

**Suggested next steps for the bug (separate from this responsiveness pass):**
1. Try moving the `@theme inline` block to `globals.css` (the shared file) to see if it processes
2. Or replace `@theme inline { --color-primary: var(--primary); ... }` with direct values:
   `@theme { --color-primary: oklch(...); ... }`
3. Or define `--color-primary` directly in the `@theme` block (not as `var(--primary)`)
   and duplicate the value in `:root` for use elsewhere

---

## Files changed this session

```
src/components/client/header.tsx              (Phase 1, ~10 lines changed)
src/components/client/shop-page-content.tsx   (Phase 2, full rewrite ~830 lines)
src/components/client/hero-section.tsx         (Phase 4, ~15 lines changed)
src/components/client/product-detail-content.tsx (Phase 3, ~60 lines added/changed)
src/components/ui/sheet.tsx                    (NEW, ~150 lines)
```

No `package.json` changes, no new dependencies.

---

## What was NOT changed (and why)

- **Popular brands card aspect** — images are 1:1 (verified via PIL on the actual files),
  so the "stretched" feel was a misread of the original audit. Left as is.
- **Testimonials carousel** — structure is fine (title block left on sm+, cards right).
  No real responsiveness issue.
- **Contact section** — `grid items-center gap-12 lg:grid-cols-2` is appropriate.
  1-col mobile, 2-col lg is the right pattern.
- **404 page** — `h-screen w-screen` with responsive Icon404 sizing is fine.
- **MenuNavigation / MenuDropdown / MobileMenu** — Header's `MenuDropdown` already uses
  the project's `DropdownMenu` primitive. No changes needed.

---

## Verify command (run this on resume to confirm state)

```bash
cd /home/roy/Documents/personal-projects/tshirt
pnpm run lint          # should pass
pnpm run check-types   # should pass
pnpm run build         # should pass
```

Then either `pnpm dev` (port 3000) or `pnpm start` (after build) to take screenshots at:
360 / 390 / 414 / 640 / 768 / 1024 / 1280 / 1536

Headless Chrome sweep pattern (works for any viewport):
```bash
for size in "360x800" "768x800" "1280x800"; do
  w=${size%x*}
  google-chrome --headless --disable-gpu --no-sandbox --hide-scrollbars \
    --window-size=${size} --screenshot=/tmp/out-${w}.png \
    --virtual-time-budget=5000 \
    "http://localhost:3000/path"
done
```

---

## Key memory items in effect

- **`format: "prettier --write \"src/**\""` is the project's blanket format script.**
  Do NOT run it as part of verify. It will silently alphabetize Tailwind classes in
  every file via `prettier-plugin-tailwindcss`. Use `lint` + `build` only.
- **Tailwind 4 alphabetization trap** — `@utility` directives and class rules in
  `@layer utilities` are alphabetized in the compiled output. State-flip utility pairs
  need `!important` on the override to be source-order independent.
- **Headless Chrome sweep** — `--window-size=WxH --screenshot --virtual-time-budget=5000`
  is the right pattern for capturing a viewport when the browser tool is desktop-sized.
- **Dev server URL** — this project runs on `http://localhost:3000` (the photographer
  project runs on `http://localhost:4321`).
- **Phased execution** — Roy prefers one phase, get sign-off, then next. Don't dump
  large all-at-once deliveries.

---

## Open follow-ups (for whoever picks this up next)

1. **Fix the `bg-primary` CSS compilation bug** (pre-existing, separate ticket).
   Without this, the Phase 2 sticky sheet footer, Phase 3 sticky cart bar, and Phase 4
   hero CTAs all render as transparent text — the *layout* changes are correct but
   the visual is wrong.
2. **Optional: shrink mobile "Shop now" header button to icon-only on very small
   viewports** — currently it's a text button. If you want max header density, an
   icon button (`<ShoppingBagIcon />`) would be even smaller. Not done because Roy
   asked for icon-only on the brand text, not the action.
3. **Optional: size guide modal** — the "Size guide" button in the product detail
   size picker currently does nothing. Add a `Dialog` (the existing `Sheet` works too)
   with the size chart when relevant.
4. **Optional: sticky bar in shop page** — the shop's product grid is long on mobile.
   A sticky sort/filter bar at the top already exists. If you want, you could add a
   "Back to top" floating button on long scroll positions.
5. **The active filter count** in the mobile Filters button currently counts distinct
   *categories* (e.g., "gender + fabric" = 2, even if 3 genders and 2 fabrics are
   selected). You could change it to count total active values if that's more useful.

---

## Contact / hand-off

Session ran out of tool iterations before I could run a final lint + build to confirm
the Phase 4 hero changes pass cleanly. The earlier `pnpm run lint` + `pnpm run
check-types` runs after Phase 3 changes passed clean. Phase 4 only touched
`hero-section.tsx` (Tailwind class swaps) and the production build with the Phase 3
state was already passing. The risk of Phase 4 breaking the build is low.

**Last verified:** After Phase 3 completion, before Phase 4 hero edits.
- `pnpm run lint` → passed
- `pnpm run check-types` → passed
- `pnpm run build` → passed

If a re-verify is desired on resume, the verify command is at the top of this file.
