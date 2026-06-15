export type ShopCategory = 't-shirts' | 'long-sleeves' | 'hoodies' | 'sandos'

export type ShopGender = 'men' | 'women' | 'unisex'

export type ShopSize = 'XXXS' | 'XXS' | 'XXS/XS' | 'XS' | 'XS/S' | 'S' | 'S/M' | 'M' | 'M/L' | 'L' | 'L/XL' | 'XL' | 'XL/XXL' | 'XXL' | 'ONE SIZE'

export type ProductColor = {
  name: string
  hex: string
  available: boolean
  image: string
  imageAlt: string
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
  createdAt: string
}

export type ShopCategoryFilter = {
  value: 'all' | ShopCategory
  label: string
}

export type PriceRange = 'all' | 'up-to-200' | '201-500' | '501-1000' | 'over-1000'
