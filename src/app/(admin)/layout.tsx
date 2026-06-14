import type { ReactNode } from 'react'

import type { Metadata } from 'next'

import AdminShell from '@/components/admin/admin-shell'

// (admin) is a route group — the URL prefix is the inner `admin/` folder,
// not the group. Root remains the shop; everything under (admin) gets the
// admin shell, theme, and metadata scope.
export const metadata: Metadata = {
  title: 'Admin'
}

type AdminLayoutProps = {
  children: ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return <AdminShell>{children}</AdminShell>
}

export default AdminLayout
