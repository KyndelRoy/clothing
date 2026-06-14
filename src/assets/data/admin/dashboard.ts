// Dashboard overview data. Static for now — will be fetched from
// the analytics service once the api/ layer is in place.
export type StatTrend = 'up' | 'down' | 'neutral'

export type DashboardStat = {
  id: string
  title: string
  value: string
  change: string
  trend: StatTrend
}

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
