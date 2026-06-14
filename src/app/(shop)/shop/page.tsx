import type { Metadata } from 'next'

import ShopPageContent from '@/components/shop/shop-page-content'

export const metadata: Metadata = {
  title: 'Shop'
}

const ShopPage = () => {
  return <ShopPageContent />
}

export default ShopPage
