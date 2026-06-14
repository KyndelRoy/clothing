'use client'

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

import type { NavigationSection } from '@/types/navigation'

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
              const isActive = pathname === navItem.href || pathname.startsWith(`${navItem.href}/`)

              return (
                <NavigationMenuItem key={navItem.title}>
                  <NavigationMenuLink asChild active={isActive}>
                    <Link
                      href={navItem.href}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'cursor-pointer rounded-full bg-transparent px-3 py-1.5 client-nav transition-colors duration-200',
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

          return (
            <NavigationMenuItem key={navItem.title}>
              <NavigationMenuTrigger className='client-nav text-muted-foreground hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 focus:text-primary focus:bg-primary/5 dark:focus:bg-primary/10 data-[state=open]:text-primary data-[state=open]:bg-primary/5 dark:data-[state=open]:hover:bg-primary/10 bg-transparent px-3 py-1.5 [&>svg]:size-4'>
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
