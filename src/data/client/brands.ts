export type Brand = {
  id: string
  image: string
  alt: string
  name: string
  type: string
  description: string
}

export const brands: Brand[] = [
  {
    id: 'polo',
    image: '/images/popular-dishes/polo.webp',
    alt: 'Polo Ralph Lauren',
    name: 'Polo Ralph Lauren',
    type: 'Premium Clothing',
    description: 'Iconic American style with timeless designs and premium quality fabrics.'
  },
  {
    id: 'uniqlo',
    image: '/images/popular-dishes/uniqlo.webp',
    alt: 'Uniqlo',
    name: 'Uniqlo',
    type: 'Casual Wear',
    description: 'Japanese minimalism meets innovative fabric technology for everyday comfort.'
  },
  {
    id: 'nike',
    image: '/images/popular-dishes/nike.webp',
    alt: 'Nike',
    name: 'Nike',
    type: 'Athletic Wear',
    description: 'Performance-driven apparel with bold designs that inspire movement.'
  },
  {
    id: 'zara',
    image: '/images/popular-dishes/zara.webp',
    alt: 'Zara',
    name: 'Zara',
    type: 'Fast Fashion',
    description: 'Trend-forward pieces at accessible prices, refreshed every season.'
  }
]
