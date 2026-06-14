import type { ReactNode } from 'react'

export type NavigationItem = {
  title: string
  href: string
}

// `kind` decides how a single-href entry behaves:
// - 'section' (default): in-page anchor; clicking scrolls to the section.
// - 'route': real Next.js route; clicking navigates and active state is
//   derived from usePathname.
// Entries with `items` render a dropdown submenu instead.
export type NavigationSection = {
  title: string
  icon?: ReactNode
} & (
  | {
      items: NavigationItem[]
      href?: never
      kind?: never
    }
  | {
      items?: never
      href: string
      kind?: 'section' | 'route'
    }
)
