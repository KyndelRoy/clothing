'use client'

import { MenuIcon } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'


// AdminHeader is the top bar of the admin shell. The hamburger is
// mobile-only; the right side carries the theme toggle and a static
// user avatar placeholder (auth/identity comes later).
type AdminHeaderProps = {
  onMenuToggle: () => void
}

const AdminHeader = ({ onMenuToggle }: AdminHeaderProps) => {
  return (
    <header className='bg-background sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b px-4 sm:px-6'>
      <div className='flex items-center gap-3'>
        <Button
          variant='outline'
          size='icon'
          className='rounded-full md:hidden'
          onClick={onMenuToggle}
          aria-label='Open menu'
        >
          <MenuIcon />
        </Button>
        <span className='text-muted-foreground text-sm font-medium md:hidden'>Admin</span>
      </div>

      <div className='flex items-center gap-2'>
        <Avatar size='sm' className='ml-1'>
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

export default AdminHeader
