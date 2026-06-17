import { notFound } from 'next/navigation'

import type { Metadata } from 'next'

import ProductDetailContent from '@/components/client/product-detail-content'
import { shopProducts } from '@/data/client/shop'

type ProductPageProps = {
  params: Promise<{ productId: string }>
}

export const generateStaticParams = () => shopProducts.map(product => ({ productId: product.id }))

export const generateMetadata = async ({ params }: ProductPageProps): Promise<Metadata> => {
  const { productId } = await params
  const product = shopProducts.find(p => p.id === productId)

  if (!product) {
    return { title: 'Product not found' }
  }

  return {
    title: product.name,
    description: product.description
  }
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { productId } = await params
  const product = shopProducts.find(p => p.id === productId)

  if (!product) {
    notFound()
  }

  return <ProductDetailContent product={product} />
}

export default ProductPage
