export type ShopCategory = 't-shirts' | 'long-sleeves' | 'hoodies'

export type ShopProduct = {
  id: string
  name: string
  description: string
  price: number
  image: string
  imageAlt: string
  category: ShopCategory
}

export type ShopCategoryFilter = {
  value: 'all' | ShopCategory
  label: string
}
