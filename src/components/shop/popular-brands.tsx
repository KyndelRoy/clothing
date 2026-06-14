import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

import type { Brand } from '@/data/brands'

type PopularBrandsProps = {
  brands: Brand[]
}

const PopularBrands = ({ brands }: PopularBrandsProps) => {
  return (
    <section id='popular-dishes' className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto mb-12 flex max-w-2xl flex-col items-center justify-center space-y-4 text-center sm:mb-16 lg:mb-24'>
          <Badge variant='outline' className='h-auto text-sm font-normal'>
            Popular Brands
          </Badge>
          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>Favorite brands</h2>
          <p className='text-muted-foreground text-xl'>
            Discover our most trusted clothing brands, known for quality craftsmanship, innovative designs, and styles
            that keep customers coming back for more.
          </p>
        </div>

        {/* Brands */}
        <div className='grid gap-6 md:grid-cols-2 lg:gap-y-10 xl:grid-cols-4'>
          {brands.map(brand => (
            <Card
              key={brand.id}
              className='hover:border-primary border-foreground/20 overflow-hidden rounded-none border bg-transparent py-0 text-black! shadow-none ring-0 transition-colors duration-300'
            >
              <CardContent className='px-0'>
                <div className='bg-transparent'>
                  <img src={brand.image} alt={brand.alt} className='h-auto w-full' />
                </div>
                <div className='space-y-3 px-6 py-5'>
                  <CardTitle className='text-lg font-semibold'>{brand.name}</CardTitle>
                  <Separator />
                  <div className='text-black! dark:text-white!'>
                    <p className='mb-1 text-base font-medium'>{brand.type}</p>
                    <p className='text-base'>{brand.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PopularBrands
