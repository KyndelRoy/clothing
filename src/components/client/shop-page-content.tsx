'use client'

import { useMemo, useState } from 'react'

import { SearchIcon, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import ProductCard from '@/components/client/product-card'

import { shopCategories, shopProducts } from '@/data/client/shop'

import type { ShopCategory } from '@/types/shop'

type SortOption = 'newest' | 'oldest' | 'price-low' | 'price-high'

const sortLabels: Record<SortOption, string> = {
  newest: 'Newest to Oldest',
  oldest: 'Oldest to Newest',
  'price-low': 'Price: Low to High',
  'price-high': 'Price: High to Low'
}

const ShopPageContent = () => {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<'all' | ShopCategory>('all')
  const [sort, setSort] = useState<SortOption>('newest')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()

    const results = shopProducts.filter(product => {
      const matchesCategory = category === 'all' || product.category === category

      if (!matchesCategory) return false
      if (!q) return true

      return product.name.toLowerCase().includes(q) || product.description.toLowerCase().includes(q)
    })

    results.sort((a, b) => {
      switch (sort) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        default:
          return 0
      }
    })

    return results
  }, [query, category, sort])

  const isFiltered = query.trim().length > 0 || category !== 'all'

  const clearFilters = () => {
    setQuery('')
    setCategory('all')
  }

  const categoriesToShow = shopCategories.filter(c => c.value !== 'all')

  return (
    <section className='pt-2 pb-8 sm:pt-4 sm:pb-12 lg:pt-6 lg:pb-16'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex gap-8'>
          {/* Left sidebar - Filters */}
          <aside className='w-56 shrink-0'>
            <div className='sticky top-24'>
              {/* Filters heading */}
              <div className='mb-2 flex items-center justify-between'>
                <h2 className='client-card-title'>Filters</h2>
                {isFiltered && (
                  <Button variant='ghost' size='sm' className='h-auto p-0 text-xs client-button' onClick={clearFilters}>
                    <XIcon className='size-3' />
                    Clear
                  </Button>
                )}
              </div>

              {isFiltered ? (
                <p className='text-muted-foreground mb-3 text-xs'>Filters applied</p>
              ) : (
                <p className='text-muted-foreground mb-3 text-xs'>No filters applied</p>
              )}

              {/* Category section */}
              <div className='border-foreground/10 border-b pb-4'>
                <h3 className='client-card-title mb-3 text-sm'>Category</h3>
                <div className='flex flex-col gap-2'>
                  {categoriesToShow.map(cat => {
                    const count = shopProducts.filter(p => p.category === cat.value).length
                    const isActive = category === cat.value

                    return (
                      <label
                        key={cat.value}
                        className='flex cursor-pointer items-center gap-2 text-sm'
                      >
                        <input
                          type='checkbox'
                          checked={isActive}
                          onChange={() => setCategory(isActive ? 'all' : cat.value)}
                          className='border-foreground/30 size-4 rounded-sm accent-primary'
                        />
                        <span className={isActive ? 'font-medium' : ''}>{cat.label}</span>
                        <span className='text-muted-foreground ml-auto text-xs'>({count})</span>
                      </label>
                    )
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* Right side - Search + Sort + Cards */}
          <div className='flex-1'>
            {/* Sort bar */}
            <div className='bg-background/95 sticky top-16 z-40 mb-4 flex items-center justify-end gap-3 border-b py-3 text-sm backdrop-blur-sm'>
              <div className='relative flex-1 max-w-xs'>
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
              <span className='client-muted client-meta'>
                {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
              </span>
              <span className='text-muted-foreground'>|</span>
              <span className='client-muted client-meta'>Sort by</span>
              <select
                value={sort}
                onChange={e => setSort(e.target.value as SortOption)}
                className='border-foreground/20 bg-background rounded-md border px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary'
              >
                {Object.entries(sortLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            {/* Product grid */}
            {filtered.length > 0 ? (
              <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6'>
                {filtered.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center gap-2 rounded-3xl border border-dashed py-16 text-center'>
                <p className='client-card-title'>No products match your search</p>
                <p className='client-muted client-body-sm'>Try a different keyword or clear the category filter.</p>
                <Button variant='outline' size='sm' className='mt-2 rounded-full client-button' onClick={clearFilters}>
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShopPageContent
