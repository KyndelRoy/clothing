import { LayoutDashboardIcon, PackageIcon, SettingsIcon, ShoppingCartIcon } from 'lucide-react'

import type { AdminNavItem } from '@/types/admin-nav'

export const adminNav: AdminNavItem[] = [
  { title: 'Dashboard', href: '/admin', icon: LayoutDashboardIcon },
  { title: 'Products', href: '/admin/products', icon: PackageIcon },
  { title: 'Orders', href: '/admin/orders', icon: ShoppingCartIcon },
  { title: 'Settings', href: '/admin/settings', icon: SettingsIcon }
]
