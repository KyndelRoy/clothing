import type { Metadata } from 'next'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { formatPrice } from '@/lib/format'

import { adminOrders } from '@/data/admin/orders'

import type { OrderStatus } from '@/types/admin'

export const metadata: Metadata = {
  title: 'Orders'
}

const statusVariant: Record<OrderStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  pending: 'outline',
  processing: 'secondary',
  shipped: 'default',
  delivered: 'default',
  cancelled: 'destructive'
}

const statusLabel: Record<OrderStatus, string> = {
  pending: 'Pending',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled'
}

const AdminOrdersPage = () => {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-1'>
        <h1 className='text-2xl font-semibold tracking-tight'>Orders</h1>
        <p className='text-muted-foreground text-sm'>Recent customer orders. Static sample data for the MVP.</p>
      </div>

      <Card size='sm'>
        <CardHeader>
          <CardTitle>Recent orders ({adminOrders.length})</CardTitle>
        </CardHeader>
        <CardContent className='px-0'>
          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead>
                <tr className='text-muted-foreground border-b text-left text-xs font-medium'>
                  <th className='px-6 py-3 font-medium'>Order</th>
                  <th className='px-6 py-3 font-medium'>Customer</th>
                  <th className='px-6 py-3 text-right font-medium'>Items</th>
                  <th className='px-6 py-3 text-right font-medium'>Total</th>
                  <th className='px-6 py-3 font-medium'>Date</th>
                  <th className='px-6 py-3 font-medium'>Status</th>
                </tr>
              </thead>
              <tbody>
                {adminOrders.map(order => (
                  <tr key={order.id} className='border-b last:border-b-0'>
                    <td className='px-6 py-3 font-mono text-xs font-medium'>{order.id}</td>
                    <td className='px-6 py-3'>
                      <div className='flex flex-col'>
                        <span className='font-medium'>{order.customer}</span>
                        <span className='text-muted-foreground text-xs'>{order.email}</span>
                      </div>
                    </td>
                    <td className='px-6 py-3 text-right tabular-nums'>{order.items}</td>
                    <td className='px-6 py-3 text-right'>{formatPrice(order.total)}</td>
                    <td className='text-muted-foreground px-6 py-3'>{order.date}</td>
                    <td className='px-6 py-3'>
                      <Badge variant={statusVariant[order.status]}>{statusLabel[order.status]}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminOrdersPage
