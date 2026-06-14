import type { Metadata } from 'next'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { formatPrice } from '@/lib/format'

import { adminProducts } from '@/data/admin/products'

import type { ProductStatus } from '@/types/admin'

export const metadata: Metadata = {
  title: 'Products'
}

const statusVariant: Record<ProductStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  active: 'default',
  draft: 'outline',
  'out-of-stock': 'destructive'
}

const statusLabel: Record<ProductStatus, string> = {
  active: 'Active',
  draft: 'Draft',
  'out-of-stock': 'Out of stock'
}

const AdminProductsPage = () => {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-1'>
        <h1 className='text-2xl font-semibold tracking-tight'>Products</h1>
        <p className='text-muted-foreground text-sm'>Manage your catalog. Static sample data for the MVP.</p>
      </div>

      <Card size='sm'>
        <CardHeader>
          <CardTitle>All products ({adminProducts.length})</CardTitle>
        </CardHeader>
        <CardContent className='px-0'>
          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead>
                <tr className='text-muted-foreground border-b text-left text-xs font-medium'>
                  <th className='px-6 py-3 font-medium'>Product</th>
                  <th className='px-6 py-3 font-medium'>SKU</th>
                  <th className='px-6 py-3 font-medium'>Category</th>
                  <th className='px-6 py-3 text-right font-medium'>Price</th>
                  <th className='px-6 py-3 text-right font-medium'>Stock</th>
                  <th className='px-6 py-3 font-medium'>Status</th>
                </tr>
              </thead>
              <tbody>
                {adminProducts.map(product => (
                  <tr key={product.id} className='border-b last:border-b-0'>
                    <td className='px-6 py-3 font-medium'>{product.name}</td>
                    <td className='text-muted-foreground px-6 py-3 font-mono text-xs'>{product.sku}</td>
                    <td className='text-muted-foreground px-6 py-3'>{product.category}</td>
                    <td className='px-6 py-3 text-right'>{formatPrice(product.price)}</td>
                    <td className='px-6 py-3 text-right tabular-nums'>{product.stock}</td>
                    <td className='px-6 py-3'>
                      <Badge variant={statusVariant[product.status]}>{statusLabel[product.status]}</Badge>
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

export default AdminProductsPage
