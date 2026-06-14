'use client'

import type { ReactNode } from 'react'

import { ChevronRightIcon, CircleSmallIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { cn, scrollToSection } from '@/lib/utils'

import type { NavigationSection } from '@/types/navigation'

type Props = {
  trigger: ReactNode
  navigationData: NavigationSection[]
  activeSection?: string
  align?: 'center' | 'end' | 'start'
}

const MenuDropdown = ({ trigger, navigationData, activeSection, align = 'start' }: Props) => {
  const pathname = usePathname()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align={align}>
        {navigationData.map(navItem => {
          if (navItem.href) {
            if (navItem.kind === 'route') {
              const isActive = pathname === navItem.href || pathname.startsWith(`${navItem.href}/`)

              return (
                <DropdownMenuItem key={navItem.title} asChild>
                  <Link
                    href={navItem.href}
                    className={cn(
                      'cursor-pointer transition-colors duration-200',
                      'hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary',
                      isActive ? 'bg-primary/10 text-primary font-medium' : 'text-foreground'
                    )}
                  >
                    {navItem.icon}
                    {navItem.title}
                  </Link>
                </DropdownMenuItem>
              )
            }

            const sectionId = navItem.href.replace('#', '')
            const isActive = activeSection === sectionId && activeSection !== ''

            return (
              <DropdownMenuItem key={navItem.title} asChild>
                <Link
                  href={navItem.href}
                  onClick={e => {
                    e.preventDefault()
                    scrollToSection(sectionId)
                  }}
                  className={cn(
                    'cursor-pointer transition-colors duration-200',
                    'hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary',
                    isActive ? 'bg-primary/10 text-primary font-medium' : 'text-foreground'
                  )}
                >
                  {navItem.icon}
                  {navItem.title}
                </Link>
              </DropdownMenuItem>
            )
          }

          return (
            <Collapsible key={navItem.title} asChild>
              <DropdownMenuGroup>
                <CollapsibleTrigger asChild>
                  <DropdownMenuItem onSelect={event => event.preventDefault()} className='justify-between'>
                    {navItem.icon}
                    <span className='flex-1'>{navItem.title}</span>
                    <ChevronRightIcon className='shrink-0 transition-transform [[data-state=open]>&]:rotate-90' />
                  </DropdownMenuItem>
                </CollapsibleTrigger>
                <CollapsibleContent className='pl-2'>
                  {navItem.items?.map(item => (
                    <DropdownMenuItem key={item.title} asChild>
                      <Link href={item.href}>
                        <CircleSmallIcon />
                        <span>{item.title}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </CollapsibleContent>
              </DropdownMenuGroup>
            </Collapsible>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MenuDropdown
