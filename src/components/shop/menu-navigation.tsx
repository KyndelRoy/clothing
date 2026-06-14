'use client'

import type { ReactNode } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'

import { cn, scrollToSection } from '@/lib/utils'

export type NavigationItem = {
  title: string
  href: string
}

// `kind` decides how a single-href section behaves:
// - 'section' (default): treat the href as an in-page anchor and scroll to it.
//   Used for landing-page sections like #testimonials, #contact-us.
// - 'route': treat the href as a real Next.js route. Clicking navigates via
//   Link and active state is derived from usePathname. Used for /shop and any
//   future top-level pages.
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

type MenuNavigationProps = {
  navigationData: NavigationSection[]
  activeSection?: string
  className?: string
}

const MenuNavigation = ({ navigationData, activeSection, className }: MenuNavigationProps) => {
  const pathname = usePathname()

  return (
    <NavigationMenu viewport={false} className={className}>
      <NavigationMenuList className='flex-wrap justify-start gap-0'>
        {navigationData.map(navItem => {
          if (navItem.href) {
            const isRoute = navItem.kind === 'route'

            if (isRoute) {
              // Real route — use Next.js Link. Active when the current path
              // matches the href or is a child of it.
              const isActive = pathname === navItem.href || pathname.startsWith(`${navItem.href}/`)

              return (
                <NavigationMenuItem key={navItem.title}>
                  <NavigationMenuLink asChild active={isActive}>
                    <Link
                      href={navItem.href}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'cursor-pointer rounded-full bg-transparent px-3 py-1.5 text-base! font-normal transition-colors duration-200',
                        'hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10',
                        'focus:text-primary focus:bg-primary/5 dark:focus:bg-primary/10',
                        isActive ? 'text-primary bg-primary/5 dark:bg-primary/10' : 'text-muted-foreground'
                      )}
                    >
                      {navItem.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            }

            // In-page section — scroll smoothly and update the hash.
            const sectionId = navItem.href.replace('#', '')
            const isActive = activeSection === sectionId && activeSection !== ''

            return (
              <NavigationMenuItem key={navItem.title}>
                <NavigationMenuLink
                  href={navItem.href}
                  onClick={e => {
                    e.preventDefault()
                    scrollToSection(sectionId)
                  }}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'cursor-pointer rounded-full bg-transparent px-3 py-1.5 text-base! font-normal transition-colors duration-200',
                    'hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10',
                    'focus:text-primary focus:bg-primary/5 dark:focus:bg-primary/10',
                    isActive ? 'text-primary bg-primary/5 dark:bg-primary/10' : 'text-muted-foreground'
                  )}
                >
                  {navItem.title}
                </NavigationMenuLink>
              </NavigationMenuItem>
            )
          }

          // Section with dropdown
          return (
            <NavigationMenuItem key={navItem.title}>
              <NavigationMenuTrigger className='text-muted-foreground hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 focus:text-primary focus:bg-primary/5 dark:focus:bg-primary/10 data-[state=open]:text-primary data-[state=open]:bg-primary/5 dark:data-[state=open]:hover:bg-primary/5 dark:data-[state=open]:hover:bg-primary/10 bg-transparent px-3 py-1.5 text-base [&>svg]:size-4'>
                {navItem.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent className='data-[motion=from-start]:slide-in-from-left-30! data-[motion=to-start]:slide-out-to-left-30! data-[motion=from-end]:slide-in-from-right-30! data-[motion=to-end]:slide-out-to-right-30! absolute w-auto'>
                <ul className='grid w-38 gap-4'>
                  <li>
                    {navItem.items?.map(item => (
                      <NavigationMenuLink key={item.title} href={item.href}>
                        {item.title}
                      </NavigationMenuLink>
                    ))}
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default MenuNavigation
