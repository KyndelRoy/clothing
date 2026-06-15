'use client'

import Link from 'next/link'

import { MenuIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import MenuDropdown from '@/components/client/menu-dropdown'
import MenuNavigation from '@/components/client/menu-navigation'

import { useActiveSection } from '@/hooks/use-active-section'
import { useScrollState } from '@/hooks/use-scroll-state'

import { cn } from '@/lib/utils'

import type { NavigationSection } from '@/types/navigation'

import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from '@/assets/svg/social-icons'

const socialLinks = [
  { href: '#', icon: FacebookIcon, label: 'Facebook' },
  { href: '#', icon: InstagramIcon, label: 'Instagram' },
  { href: '#', icon: TwitterIcon, label: 'Twitter' },
  { href: '#', icon: YoutubeIcon, label: 'YouTube' }
]

type HeaderProps = {
  navigationData: NavigationSection[]
  className?: string
}

const Header = ({ navigationData, className }: HeaderProps) => {
  const isScrolled = useScrollState()

  const sectionIds = navigationData.map(item => item.href?.replace('#', '')).filter(Boolean) as string[]

  const detectedActiveSection = useActiveSection(sectionIds)
  const activeSection = sectionIds.includes(detectedActiveSection) ? detectedActiveSection : ''

  return (
    <header
      className={cn(
        'fixed top-0 z-50 h-16 w-full border-b bg-background transition-all duration-300',
        {
          'shadow-md': isScrolled
        },
        className
      )}
    >
      <div className='mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-3'>
          <img src='/logo/logo.png' alt='Armak Clothing Co.' className='h-10 w-10 object-cover object-center' />
          <span className='text-primary client-logo'>Armak Clothing Co.</span>
        </Link>

        {/* Navigation */}
        <MenuNavigation
          navigationData={navigationData}
          activeSection={activeSection}
          className='**:data-[slot=navigation-menu-list]:gap-1 max-lg:hidden'
        />

        {/* Actions */}
        <div className='flex items-center'>
          {/* Social Icons */}
          <div className='flex items-center gap-3 max-sm:hidden'>
            {socialLinks.map(social => (
              <Link
                key={social.label}
                href={social.href}
                className='text-muted-foreground hover:text-primary transition-colors'
                aria-label={social.label}
              >
                <social.icon className='size-5' />
              </Link>
            ))}
          </div>

          <Button
            className='group relative ml-4 w-fit overflow-hidden rounded-full client-button before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-size-[250%_250%,100%_100%] before:bg-position-[200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-position-[-100%_0,0_0] has-[>svg]:px-6 max-sm:hidden dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.2)_50%,transparent_75%,transparent_100%)]'
            asChild
          >
            <Link href='/shop'>Shop now</Link>
          </Button>

          {/* Mobile shop now button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className='ml-4 rounded-full sm:hidden' asChild>
                <Link href='/shop'>Shop now</Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Shop now</TooltipContent>
          </Tooltip>

          {/* Mobile menu button */}
          <MenuDropdown
            align='end'
            navigationData={navigationData}
            activeSection={activeSection}
            trigger={
              <Button variant='outline' size='icon' className='ml-3 rounded-full lg:hidden'>
                <MenuIcon />
                <span className='sr-only'>Menu</span>
              </Button>
            }
          />
        </div>
      </div>
    </header>
  )
}

export default Header
