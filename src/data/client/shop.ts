import type { ShopCategoryFilter, ShopProduct } from '@/types/shop'

export const shopCategories: ShopCategoryFilter[] = [
  { value: 'all', label: 'All' },
  { value: 't-shirts', label: 'T-Shirts' },
  { value: 'long-sleeves', label: 'Long Sleeves' },
  { value: 'hoodies', label: 'Hoodies' }
]

export const shopProducts: ShopProduct[] = [
  {
    id: 'p-001',
    name: 'Armak Classic Tee',
    description: 'A timeless everyday essential crafted from 100% organic cotton.',
    price: 599,
    image: '/images/hero-section/tshirt-01.webp',
    imageAlt: 'Black Armak Classic Tee',
    category: 't-shirts'
  },
  {
    id: 'p-002',
    name: 'Armak Heavyweight Tee',
    description: 'A thicker, more structured tee that holds its shape wash after wash.',
    price: 799,
    image: '/images/hero-section/tshirt-02.webp',
    imageAlt: 'Navy Armak Heavyweight Tee',
    category: 't-shirts'
  },
  {
    id: 'p-003',
    name: 'Armak Pocket Tee',
    description: 'A clean crew with a chest pocket detail for everyday wear.',
    price: 649,
    image: '/images/hero-section/tshirt-03.webp',
    imageAlt: 'Red Armak Pocket Tee',
    category: 't-shirts'
  },
  {
    id: 'p-004',
    name: 'Armak Long Sleeve',
    description: 'Soft, breathable long sleeve you can layer or wear on its own.',
    price: 899,
    image: '/images/hero-section/tshirt-04.webp',
    imageAlt: 'Green Armak Long Sleeve',
    category: 'long-sleeves'
  },
  {
    id: 'p-005',
    name: 'Armak Studio Tee',
    description: 'A relaxed-fit tee cut for easy movement and all-day comfort.',
    price: 699,
    image: '/images/hero-section/tshirt-05.webp',
    imageAlt: 'Blue Armak Studio Tee',
    category: 't-shirts'
  }
]
