'use client'

import { useMemo, useState } from 'react'

import { SearchIcon, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import ProductCard from '@/components/shop/product-card'

import { shopCategories, shopProducts } from '@/data/shop'

import type { ShopCategory } from '@/types/shop'

const ShopPageContent = () => {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<'all' | ShopCategory>('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()

    return shopProducts.filter(product => {
      const matchesCategory = category === 'all' || product.category === category

      if (!matchesCategory) return false
      if (!q) return true

      return product.name.toLowerCase().includes(q) || product.description.toLowerCase().includes(q)
    })
  }, [query, category])

  const isFiltered = query.trim().length > 0 || category !== 'all'

  const clearFilters = () => {
    setQuery('')
    setCategory('all')
  }

  return (
    <section className='py-8 sm:py-12 lg:py-16'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Page header */}
        <div className='mb-8 flex flex-col gap-2 sm:mb-10'>
          <h1 className='text-3xl font-semibold tracking-tight sm:text-4xl'>Shop all</h1>
          <p className='text-muted-foreground text-base'>Browse the full collection.</p>
        </div>

        {/* Search + category filter */}
        <div className='bg-card ring-foreground/5 mb-6 flex flex-col gap-4 rounded-3xl p-4 ring-1 sm:flex-row sm:items-center sm:gap-3'>
          <div className='relative flex-1'>
            <SearchIcon className='text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2' />
            <Input
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder='Search products…'
              className='pl-9'
              aria-label='Search products'
              type='search'
            />
          </div>

          <div className='flex flex-wrap gap-2 sm:justify-end' role='group' aria-label='Filter by category'>
            {shopCategories.map(cat => {
              const isActive = category === cat.value

              return (
                <Button
                  key={cat.value}
                  size='sm'
                  variant={isActive ? 'default' : 'outline'}
                  className='rounded-full'
                  onClick={() => setCategory(cat.value)}
                  aria-pressed={isActive}
                >
                  {cat.label}
                </Button>
              )
            })}
          </div>
        </div>

        {/* Result count */}
        <div className='mb-4 flex items-center justify-between text-sm'>
          <span className='text-muted-foreground'>
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
            {isFiltered ? ' match your filters' : ''}
          </span>
          {isFiltered ? (
            <Button variant='ghost' size='sm' className='rounded-full' onClick={clearFilters}>
              <XIcon className='size-3' />
              Clear
            </Button>
          ) : null}
        </div>

        {/* Grid or empty state */}
        {filtered.length > 0 ? (
          <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4'>
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center gap-2 rounded-3xl border border-dashed py-16 text-center'>
            <p className='text-base font-medium'>No products match your search</p>
            <p className='text-muted-foreground text-sm'>Try a different keyword or clear the category filter.</p>
            <Button variant='outline' size='sm' className='mt-2 rounded-full' onClick={clearFilters}>
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

export default ShopPageContent
