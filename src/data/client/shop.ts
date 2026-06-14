import type { ShopCategoryFilter, ShopProduct } from '@/types/shop'

export const shopCategories: ShopCategoryFilter[] = [
  { value: 'all', label: 'All' },
  { value: 't-shirts', label: 'T-Shirts' },
  { value: 'long-sleeves', label: 'Long Sleeves' },
  { value: 'hoodies', label: 'Hoodies' },
  { value: 'sandos', label: 'Sandos' }
]

export const shopProducts: ShopProduct[] = [
  {
    id: 'p-001',
    name: 'Armak Classic Tee',
    description: 'A timeless everyday essential crafted from 100% organic cotton.',
    price: 599,
    colors: [
      { name: 'Black', hex: '#1a1a1a', available: true, image: '/images/hero-section/tshirt-01.webp', imageAlt: 'Black Armak Classic Tee' },
      { name: 'White', hex: '#f5f5f5', available: true, image: '/images/hero-section/tshirt-02.webp', imageAlt: 'White Armak Classic Tee' },
      { name: 'Navy', hex: '#1e3a5f', available: true, image: '/images/hero-section/tshirt-03.webp', imageAlt: 'Navy Armak Classic Tee' },
      { name: 'Red', hex: '#c0392b', available: false, image: '', imageAlt: '' },
      { name: 'Green', hex: '#27ae60', available: false, image: '', imageAlt: '' }
    ],
    category: 't-shirts'
  },
  {
    id: 'p-002',
    name: 'Armak Heavyweight Tee',
    description: 'A thicker, more structured tee that holds its shape wash after wash.',
    price: 799,
    colors: [
      { name: 'Navy', hex: '#1e3a5f', available: true, image: '/images/hero-section/tshirt-02.webp', imageAlt: 'Navy Armak Heavyweight Tee' },
      { name: 'Black', hex: '#1a1a1a', available: true, image: '/images/hero-section/tshirt-01.webp', imageAlt: 'Black Armak Heavyweight Tee' },
      { name: 'White', hex: '#f5f5f5', available: false, image: '', imageAlt: '' },
      { name: 'Grey', hex: '#7f8c8d', available: true, image: '/images/hero-section/tshirt-04.webp', imageAlt: 'Grey Armak Heavyweight Tee' }
    ],
    category: 't-shirts'
  },
  {
    id: 'p-003',
    name: 'Armak Pocket Tee',
    description: 'A clean crew with a chest pocket detail for everyday wear.',
    price: 649,
    colors: [
      { name: 'Red', hex: '#c0392b', available: true, image: '/images/hero-section/tshirt-03.webp', imageAlt: 'Red Armak Pocket Tee' },
      { name: 'Black', hex: '#1a1a1a', available: true, image: '/images/hero-section/tshirt-01.webp', imageAlt: 'Black Armak Pocket Tee' },
      { name: 'Blue', hex: '#2980b9', available: false, image: '', imageAlt: '' },
      { name: 'Green', hex: '#27ae60', available: true, image: '/images/hero-section/tshirt-05.webp', imageAlt: 'Green Armak Pocket Tee' }
    ],
    category: 't-shirts'
  },
  {
    id: 'p-004',
    name: 'Armak Long Sleeve',
    description: 'Soft, breathable long sleeve you can layer or wear on its own.',
    price: 899,
    colors: [
      { name: 'Green', hex: '#27ae60', available: true, image: '/images/hero-section/tshirt-04.webp', imageAlt: 'Green Armak Long Sleeve' },
      { name: 'Black', hex: '#1a1a1a', available: true, image: '/images/hero-section/tshirt-01.webp', imageAlt: 'Black Armak Long Sleeve' },
      { name: 'White', hex: '#f5f5f5', available: true, image: '/images/hero-section/tshirt-02.webp', imageAlt: 'White Armak Long Sleeve' }
    ],
    category: 'long-sleeves'
  },
  {
    id: 'p-005',
    name: 'Armak Studio Tee',
    description: 'A relaxed-fit tee cut for easy movement and all-day comfort.',
    price: 699,
    colors: [
      { name: 'Blue', hex: '#2980b9', available: true, image: '/images/hero-section/tshirt-05.webp', imageAlt: 'Blue Armak Studio Tee' },
      { name: 'Black', hex: '#1a1a1a', available: true, image: '/images/hero-section/tshirt-01.webp', imageAlt: 'Black Armak Studio Tee' },
      { name: 'Red', hex: '#c0392b', available: false, image: '', imageAlt: '' },
      { name: 'Navy', hex: '#1e3a5f', available: false, image: '', imageAlt: '' }
    ],
    category: 't-shirts'
  },
  {
    id: 'p-006',
    name: 'Armak Classic Sando',
    description: 'A lightweight sleeveless top perfect for warm days and layering.',
    price: 399,
    colors: [
      { name: 'Beige', hex: '#d4c5a9', available: true, image: '/sando-color-data/sando-beige.png', imageAlt: 'Beige Armak Classic Sando' },
      { name: 'Coral', hex: '#e07c5a', available: true, image: '/sando-color-data/sando-coral.png', imageAlt: 'Coral Armak Classic Sando' },
      { name: 'Gray', hex: '#9e9e9e', available: true, image: '/sando-color-data/sando-gray.png', imageAlt: 'Gray Armak Classic Sando' },
      { name: 'Lavender', hex: '#b39ddb', available: true, image: '/sando-color-data/sando-lavender.png', imageAlt: 'Lavender Armak Classic Sando' },
      { name: 'Mustard', hex: '#d4a017', available: true, image: '/sando-color-data/sando-mustard.png', imageAlt: 'Mustard Armak Classic Sando' },
      { name: 'Olive', hex: '#6b8e23', available: true, image: '/sando-color-data/sando-olive.png', imageAlt: 'Olive Armak Classic Sando' },
      { name: 'Pink', hex: '#e91e8a', available: true, image: '/sando-color-data/sando-pink.png', imageAlt: 'Pink Armak Classic Sando' },
      { name: 'Teal', hex: '#008080', available: true, image: '/sando-color-data/sando-teal.png', imageAlt: 'Teal Armak Classic Sando' },
      { name: 'Sand', hex: '#c2b280', available: true, image: '/sando-color-data/sando-beige.png', imageAlt: 'Sand Armak Classic Sando' },
      { name: 'Rust', hex: '#b7410e', available: true, image: '/sando-color-data/sando-coral.png', imageAlt: 'Rust Armak Classic Sando' },
      { name: 'Sage', hex: '#9cad8a', available: true, image: '/sando-color-data/sando-olive.png', imageAlt: 'Sage Armak Classic Sando' },
      { name: 'Charcoal', hex: '#36454f', available: true, image: '/sando-color-data/sando-gray.png', imageAlt: 'Charcoal Armak Classic Sando' },
      { name: 'Mauve', hex: '#e0b0ff', available: false, image: '', imageAlt: '' },
      { name: 'Plum', hex: '#8e4585', available: false, image: '', imageAlt: '' }
    ],
    category: 'sandos'
  },
  {
    id: 'p-007',
    name: 'Armak Ribbed Sando',
    description: 'A ribbed texture sando that hugs comfortably and breathes easy.',
    price: 449,
    colors: [
      { name: 'Beige', hex: '#d4c5a9', available: true, image: '/sando-color-data/sando-beige.png', imageAlt: 'Beige Armak Ribbed Sando' },
      { name: 'Coral', hex: '#e07c5a', available: true, image: '/sando-color-data/sando-coral.png', imageAlt: 'Coral Armak Ribbed Sando' },
      { name: 'Gray', hex: '#9e9e9e', available: true, image: '/sando-color-data/sando-gray.png', imageAlt: 'Gray Armak Ribbed Sando' },
      { name: 'Lavender', hex: '#b39ddb', available: true, image: '/sando-color-data/sando-lavender.png', imageAlt: 'Lavender Armak Ribbed Sando' },
      { name: 'Mustard', hex: '#d4a017', available: false, image: '', imageAlt: '' },
      { name: 'Olive', hex: '#6b8e23', available: true, image: '/sando-color-data/sando-olive.png', imageAlt: 'Olive Armak Ribbed Sando' },
      { name: 'Pink', hex: '#e91e8a', available: true, image: '/sando-color-data/sando-pink.png', imageAlt: 'Pink Armak Ribbed Sando' },
      { name: 'Teal', hex: '#008080', available: true, image: '/sando-color-data/sando-teal.png', imageAlt: 'Teal Armak Ribbed Sando' }
    ],
    category: 'sandos'
  }
]
