export type ShopCategory = string

export type ShopGender = string

export type ShopSize = string

export type ShopFabric = string

export type ShopFit = string

export type ShopNeckline = string

export type ShopFeature = string

export type ProductColor = {
  name: string
  hex: string
  available: boolean
  image: string
  imageAlt: string
  boxImage?: string
}

export type ShopProduct = {
  id: string
  name: string
  description: string
  price: number
  colors: ProductColor[]
  sizes: ShopSize[]
  category: ShopCategory
  gender: ShopGender
  fabric: ShopFabric
  fit: ShopFit
  neckline: ShopNeckline
  features: ShopFeature[]
  createdAt: string
}

export type ShopCategoryFilter = {
  value: 'all' | ShopCategory
  label: string
}

export type PriceRange = 'all' | 'up-to-200' | '201-500' | '501-1000' | 'over-1000'

export type SizeGroup = {
  id: string
  label: string
  values: ShopSize[]
}

export type FilterKey =
  | 'gender'
  | 'category'
  | 'size'
  | 'color'
  | 'fabric'
  | 'fit'
  | 'neckline'
  | 'features'
  | 'price'
