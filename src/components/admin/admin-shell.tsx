'use client'

import { useState, type ReactNode } from 'react'

import AdminHeader from '@/components/admin/admin-header'
import AdminSidebar from '@/components/admin/admin-sidebar'

// AdminShell is the client-side wrapper that holds mobile drawer state
// and renders the sidebar + header chrome around the page content.
// Pages stay as server components — children passed in are RSC payload.
type AdminShellProps = {
  children: ReactNode
}

const AdminShell = ({ children }: AdminShellProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className='bg-background flex min-h-screen w-full'>
      <AdminSidebar isMobileOpen={isMobileMenuOpen} onNavigate={() => setIsMobileMenuOpen(false)} />

      <div className='flex min-w-0 flex-1 flex-col'>
        <AdminHeader onMenuToggle={() => setIsMobileMenuOpen(open => !open)} />

        <main className='flex-1 p-4 sm:p-6 lg:p-8'>{children}</main>
      </div>
    </div>
  )
}

export default AdminShell
