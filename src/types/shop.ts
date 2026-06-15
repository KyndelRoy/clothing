export type ShopCategory = 't-shirts' | 'long-sleeves' | 'hoodies' | 'sandos'

export type ShopGender = 'men' | 'women' | 'unisex'

export type ShopSize = 'XXXS' | 'XXS' | 'XXS/XS' | 'XS' | 'XS/S' | 'S' | 'S/M' | 'M' | 'M/L' | 'L' | 'L/XL' | 'XL' | 'XL/XXL' | 'XXL' | 'ONE SIZE'

export type ShopFabric = 'cotton' | 'polyester' | 'linen' | 'dry-fit'

export type ShopFit = 'relaxed' | 'classic' | 'oversized' | 'slim' | 'tight'

export type ShopNeckline = 'crew-neck' | 'collared' | 'v-neck'

export type ShopFeature = 'pocket' | 'logo-print' | 'ribbed' | 'striped' | 'graphic'

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
