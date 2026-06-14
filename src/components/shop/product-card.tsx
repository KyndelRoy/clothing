import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { formatPrice, type ShopProduct } from '@/assets/data/shop/products'

// Single product tile. Kept server-renderable — receives the product
// as a prop and never touches client state. The parent grid owns
// search/filter state.
type ProductCardProps = {
  product: ShopProduct
  className?: string
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  return (
    <Card
      className={
        'group/product border-foreground/15 hover:border-primary overflow-hidden rounded-3xl border bg-transparent pt-0 !text-black shadow-none ring-0 transition-colors duration-300 dark:!text-white ' +
        (className ?? '')
      }
    >
      <CardContent className='px-0'>
        <div className='bg-muted/30 overflow-hidden'>
          <img
            src={product.image}
            alt={product.imageAlt}
            className='aspect-[4/5] w-full object-cover transition-opacity duration-300 group-hover/product:opacity-90'
            loading='lazy'
          />
        </div>
      </CardContent>
      <CardHeader className='gap-1.5 px-5 pb-2'>
        <div className='flex items-baseline justify-between gap-3'>
          <CardTitle className='text-base font-semibold'>{product.name}</CardTitle>
          <span className='text-base font-semibold tabular-nums'>{formatPrice(product.price)}</span>
        </div>
        <CardDescription className='text-sm'>{product.description}</CardDescription>
      </CardHeader>
      <CardContent className='px-5 pb-5'>
        <Button size='sm' className='w-full rounded-full' variant='outline' asChild>
          <Link href={`/shop/${product.id}`}>View product</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default ProductCard
