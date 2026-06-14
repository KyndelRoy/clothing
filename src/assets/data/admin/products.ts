// Sample product rows for the admin products list. Static for the MVP.
// Will be replaced with a service call to Supabase / API when those
// integrations land.
export type ProductStatus = 'active' | 'draft' | 'out-of-stock'

export type AdminProduct = {
  id: string
  name: string
  sku: string
  category: string
  price: number
  stock: number
  status: ProductStatus
}

export const adminProducts: AdminProduct[] = [
  {
    id: 'p-001',
    name: 'Armak Classic Tee',
    sku: 'AR-CLS-001',
    category: 'T-Shirts',
    price: 599,
    stock: 120,
    status: 'active'
  },
  {
    id: 'p-002',
    name: 'Armak Heavyweight Tee',
    sku: 'AR-HVY-002',
    category: 'T-Shirts',
    price: 799,
    stock: 64,
    status: 'active'
  },
  {
    id: 'p-003',
    name: 'Armak Pocket Tee',
    sku: 'AR-PCK-003',
    category: 'T-Shirts',
    price: 649,
    stock: 0,
    status: 'out-of-stock'
  },
  {
    id: 'p-004',
    name: 'Armak Long Sleeve',
    sku: 'AR-LSL-004',
    category: 'Long Sleeves',
    price: 899,
    stock: 32,
    status: 'active'
  },
  {
    id: 'p-005',
    name: 'Armak Studio Tee',
    sku: 'AR-STD-005',
    category: 'T-Shirts',
    price: 699,
    stock: 0,
    status: 'draft'
  }
]
