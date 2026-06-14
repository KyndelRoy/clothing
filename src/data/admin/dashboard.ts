import type { DashboardStat } from '@/types/admin'

export const dashboardStats: DashboardStat[] = [
  {
    id: 'revenue',
    title: 'Total Revenue',
    value: '₱0',
    change: '—',
    trend: 'neutral'
  },
  {
    id: 'orders',
    title: 'Orders',
    value: '0',
    change: '—',
    trend: 'neutral'
  },
  {
    id: 'customers',
    title: 'Customers',
    value: '0',
    change: '—',
    trend: 'neutral'
  },
  {
    id: 'products',
    title: 'Products',
    value: '0',
    change: '—',
    trend: 'neutral'
  }
]
