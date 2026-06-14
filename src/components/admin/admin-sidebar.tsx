'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { adminNav, type AdminNavItem } from '@/components/admin/admin-nav'

import { cn } from '@/lib/utils'

// AdminSidebar renders the left navigation. It doubles as a fixed
// drawer on mobile (toggled via the shell) and a static column on
// desktop. The active link is derived from the current pathname.
type AdminSidebarProps = {
  isMobileOpen: boolean
  onNavigate?: () => void
  className?: string
}

const AdminSidebar = ({ isMobileOpen, onNavigate, className }: AdminSidebarProps) => {
  const pathname = usePathname()

  const isActive = (item: AdminNavItem) => {
    if (item.href === '/admin') {
      return pathname === '/admin'
    }

    return pathname === item.href || pathname.startsWith(`${item.href}/`)
  }

  return (
    <>
      {/* Mobile backdrop. Click closes the drawer. */}
      {isMobileOpen ? (
        <button
          type='button'
          aria-label='Close menu'
          className='fixed inset-0 z-40 bg-black/50 md:hidden'
          onClick={onNavigate}
        />
      ) : null}

      <aside
        className={cn(
          'bg-background fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r transition-transform duration-200 ease-in-out md:static md:translate-x-0',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full',
          className
        )}
      >
        <div className='flex h-16 items-center border-b px-6'>
          <Link href='/admin' onClick={onNavigate} className='text-primary text-[20px] font-semibold'>
            Armak Admin
          </Link>
        </div>

        <nav className='flex flex-1 flex-col gap-1 p-4' aria-label='Admin navigation'>
          {adminNav.map(item => {
            const Icon = item.icon
            const active = isActive(item)

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  active ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <Icon className='size-4' />
                {item.title}
              </Link>
            )
          })}
        </nav>

        <div className='border-t p-4'>
          <Link href='/' onClick={onNavigate} className='text-muted-foreground hover:text-foreground block text-xs'>
            ← Back to store
          </Link>
        </div>
      </aside>
    </>
  )
}

export default AdminSidebar
