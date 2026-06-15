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
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    category: 't-shirts',
    gender: 'unisex',
    fabric: 'cotton',
    fit: 'classic',
    neckline: 'crew-neck',
    features: ['logo-print'],
    createdAt: '2025-01-15'
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
    sizes: ['S', 'M', 'L', 'XL'],
    category: 't-shirts',
    gender: 'men',
    fabric: 'cotton',
    fit: 'relaxed',
    neckline: 'crew-neck',
    features: [],
    createdAt: '2025-02-10'
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
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    category: 't-shirts',
    gender: 'men',
    fabric: 'cotton',
    fit: 'classic',
    neckline: 'crew-neck',
    features: ['pocket'],
    createdAt: '2025-03-05'
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
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'long-sleeves',
    gender: 'unisex',
    fabric: 'cotton',
    fit: 'relaxed',
    neckline: 'crew-neck',
    features: [],
    createdAt: '2025-04-01'
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
    sizes: ['XS', 'S', 'M', 'L'],
    category: 't-shirts',
    gender: 'women',
    fabric: 'cotton',
    fit: 'relaxed',
    neckline: 'v-neck',
    features: [],
    createdAt: '2025-05-20'
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
    sizes: ['S', 'M', 'L', 'XL', 'ONE SIZE'],
    category: 'sandos',
    gender: 'women',
    fabric: 'polyester',
    fit: 'relaxed',
    neckline: 'crew-neck',
    features: ['ribbed'],
    createdAt: '2025-06-10'
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
    sizes: ['ONE SIZE'],
    category: 'sandos',
    gender: 'unisex',
    fabric: 'linen',
    fit: 'classic',
    neckline: 'crew-neck',
    features: ['ribbed'],
    createdAt: '2025-07-01'
  },
  {
    id: 'p-008',
    name: 'Armak Dry-Fit Sport Tee',
    description: 'Moisture-wicking performance tee for intense workouts and outdoor runs.',
    price: 849,
    colors: [
      { name: 'Black', hex: '#1a1a1a', available: true, image: '/images/hero-section/tshirt-01.webp', imageAlt: 'Black Armak Dry-Fit Sport Tee' },
      { name: 'Navy', hex: '#1e3a5f', available: true, image: '/images/hero-section/tshirt-02.webp', imageAlt: 'Navy Armak Dry-Fit Sport Tee' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 't-shirts',
    gender: 'men',
    fabric: 'dry-fit',
    fit: 'slim',
    neckline: 'crew-neck',
    features: ['logo-print'],
    createdAt: '2025-08-01'
  },
  {
    id: 'p-009',
    name: 'Armak Oversized Graphic Hoodie',
    description: 'A bold graphic hoodie with an oversized silhouette for streetwear vibes.',
    price: 1299,
    colors: [
      { name: 'Black', hex: '#1a1a1a', available: true, image: '/images/hero-section/tshirt-01.webp', imageAlt: 'Black Armak Oversized Graphic Hoodie' },
      { name: 'Grey', hex: '#7f8c8d', available: true, image: '/images/hero-section/tshirt-04.webp', imageAlt: 'Grey Armak Oversized Graphic Hoodie' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    category: 'hoodies',
    gender: 'unisex',
    fabric: 'cotton',
    fit: 'oversized',
    neckline: 'crew-neck',
    features: ['graphic'],
    createdAt: '2025-08-15'
  },
  {
    id: 'p-010',
    name: 'Armak Slim Collared Polo',
    description: 'A fitted polo with a clean collar for a smart-casual look.',
    price: 999,
    colors: [
      { name: 'White', hex: '#f5f5f5', available: true, image: '/images/hero-section/tshirt-02.webp', imageAlt: 'White Armak Slim Collared Polo' },
      { name: 'Navy', hex: '#1e3a5f', available: true, image: '/images/hero-section/tshirt-03.webp', imageAlt: 'Navy Armak Slim Collared Polo' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 't-shirts',
    gender: 'men',
    fabric: 'polyester',
    fit: 'slim',
    neckline: 'collared',
    features: ['logo-print'],
    createdAt: '2025-09-01'
  }
]
