export type StatTrend = 'up' | 'down' | 'neutral'

export type DashboardStat = {
  id: string
  title: string
  value: string
  change: string
  trend: StatTrend
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export type AdminOrder = {
  id: string
  customer: string
  email: string
  items: number
  total: number
  status: OrderStatus
  date: string
}

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

export type SettingsFieldType = 'text' | 'email' | 'textarea'

export type SettingsField = {
  id: string
  label: string
  type: SettingsFieldType
  value: string
  placeholder?: string
}

export type SettingsSection = {
  id: string
  title: string
  description: string
  fields: SettingsField[]
}
