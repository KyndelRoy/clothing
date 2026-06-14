export type ShopCategory = 't-shirts' | 'long-sleeves' | 'hoodies' | 'sandos'

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
  category: ShopCategory
}

export type ShopCategoryFilter = {
  value: 'all' | ShopCategory
  label: string
}
