// Admin navigation config. Mirrors the shop's pattern of declaring nav
// as data so the sidebar stays dumb. Add new entries here, not in the
// sidebar component, to keep the shell presentational.
import { LayoutDashboardIcon, PackageIcon, SettingsIcon, ShoppingCartIcon, type LucideIcon } from 'lucide-react'

export type AdminNavItem = {
  title: string
  href: string
  icon: LucideIcon
}

export const adminNav: AdminNavItem[] = [
  { title: 'Dashboard', href: '/admin', icon: LayoutDashboardIcon },
  { title: 'Products', href: '/admin/products', icon: PackageIcon },
  { title: 'Orders', href: '/admin/orders', icon: ShoppingCartIcon },
  { title: 'Settings', href: '/admin/settings', icon: SettingsIcon }
]
