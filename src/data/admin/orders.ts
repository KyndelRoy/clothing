import type { AdminOrder } from '@/types/admin'

export const adminOrders: AdminOrder[] = [
  {
    id: 'ORD-1024',
    customer: 'Maria Santos',
    email: 'maria.santos@example.com',
    items: 3,
    total: 1847,
    status: 'pending',
    date: '2026-06-12'
  },
  {
    id: 'ORD-1023',
    customer: 'Jared Cruz',
    email: 'jared.cruz@example.com',
    items: 1,
    total: 599,
    status: 'processing',
    date: '2026-06-11'
  },
  {
    id: 'ORD-1022',
    customer: 'Ana Reyes',
    email: 'ana.reyes@example.com',
    items: 2,
    total: 1398,
    status: 'shipped',
    date: '2026-06-10'
  },
  {
    id: 'ORD-1021',
    customer: 'Paulo Garcia',
    email: 'paulo.garc@example.com',
    items: 1,
    total: 899,
    status: 'delivered',
    date: '2026-06-09'
  },
  {
    id: 'ORD-1020',
    customer: 'Liza Mendoza',
    email: 'liza.mendoza@example.com',
    items: 4,
    total: 2596,
    status: 'cancelled',
    date: '2026-06-08'
  }
]
