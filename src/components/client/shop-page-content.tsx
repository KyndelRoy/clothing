'use client'

import { useMemo, useState } from 'react'

import { MinusIcon, PlusIcon, SearchIcon, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import ProductCard from '@/components/client/product-card'

import { shopProducts } from '@/data/client/shop'

import type { PriceRange, ShopCategory, ShopGender, ShopSize } from '@/types/shop'

type SortOption = 'newest' | 'oldest' | 'price-low' | 'price-high'

const sortLabels: Record<SortOption, string> = {
  newest: 'Newest to Oldest',
  oldest: 'Oldest to Newest',
  'price-low': 'Price: Low to High',
  'price-high': 'Price: High to Low'
}

const genderOptions: { value: ShopGender; label: string }[] = [
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' },
  { value: 'unisex', label: 'Unisex' }
]

const categoryOptions: { value: ShopCategory; label: string }[] = [
  { value: 't-shirts', label: 'T-Shirts' },
  { value: 'long-sleeves', label: 'Long Sleeves' },
  { value: 'hoodies', label: 'Hoodies' },
  { value: 'sandos', label: 'Sandos' }
]

const allSizes: ShopSize[] = [
  'XXXS', 'XXS', 'XXS/XS', 'XS', 'XS/S', 'S', 'S/M', 'M', 'M/L', 'L', 'L/XL', 'XL', 'XL/XXL', 'XXL'
]

const priceRanges: { value: PriceRange; label: string }[] = [
  { value: 'up-to-200', label: 'Up to ₱200' },
  { value: '201-500', label: '₱201 – ₱500' },
  { value: '501-1000', label: '₱501 – ₱1,000' },
  { value: 'over-1000', label: 'Over ₱1,000' }
]

const GENDER_INITIAL_COUNT = 6
const CATEGORY_INITIAL_COUNT = 4
const SIZE_INITIAL_ROWS = 2
const SIZE_ITEMS_PER_ROW = 5
const COLOR_INITIAL_COUNT = 5

const FilterSection = ({
  title,
  defaultOpen = true,
  children
}: {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}) => {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className='border-foreground/10 border-b py-3'>
      <button
        onClick={() => setOpen(!open)}
        className='flex w-full items-center justify-between text-sm font-semibold'
      >
        {title}
        {open ? <MinusIcon className='size-4' /> : <PlusIcon className='size-4' />}
      </button>
      {open && <div className='mt-3'>{children}</div>}
    </div>
  )
}

const ShopPageContent = () => {
  const [query, setQuery] = useState('')
  const [categories, setCategories] = useState<ShopCategory[]>([])
  const [genders, setGenders] = useState<ShopGender[]>([])
  const [selectedSizes, setSelectedSizes] = useState<ShopSize[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<PriceRange>('all')
  const [customPriceActive, setCustomPriceActive] = useState(false)
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sort, setSort] = useState<SortOption>('newest')

  const [showAllGenders, setShowAllGenders] = useState(false)
  const [showAllCategories, setShowAllCategories] = useState(false)
  const [showAllSizes, setShowAllSizes] = useState(false)
  const [showAllColors, setShowAllColors] = useState(false)

  const toggleCategory = (cat: ShopCategory) => {
    setCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  const toggleGender = (g: ShopGender) => {
    setGenders(prev =>
      prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]
    )
  }

  const toggleSize = (s: ShopSize) => {
    setSelectedSizes(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    )
  }

  const toggleColor = (name: string) => {
    setSelectedColors(prev =>
      prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]
    )
  }

  const hasPriceInput = minPrice.trim() !== '' || maxPrice.trim() !== ''

  const isFiltered =
    query.trim().length > 0 ||
    categories.length > 0 ||
    genders.length > 0 ||
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    priceRange !== 'all' ||
    customPriceActive

  const clearFilters = () => {
    setQuery('')
    setCategories([])
    setGenders([])
    setSelectedSizes([])
    setSelectedColors([])
    setPriceRange('all')
    setCustomPriceActive(false)
    setMinPrice('')
    setMaxPrice('')
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()

    const results = shopProducts.filter(product => {
      if (categories.length > 0 && !categories.includes(product.category)) return false
      if (genders.length > 0 && !genders.includes(product.gender)) return false

      if (selectedSizes.length > 0) {
        if (!selectedSizes.some(s => product.sizes.includes(s))) return false
      }

      if (selectedColors.length > 0) {
        const productColorNames = product.colors.map(c => c.name)
        if (!selectedColors.some(c => productColorNames.includes(c))) return false
      }

      if (priceRange !== 'all' && !customPriceActive) {
        switch (priceRange) {
          case 'up-to-200':
            if (product.price > 200) return false
            break
          case '201-500':
            if (product.price < 201 || product.price > 500) return false
            break
          case '501-1000':
            if (product.price < 501 || product.price > 1000) return false
            break
          case 'over-1000':
            if (product.price <= 1000) return false
            break
        }
      }

      if (customPriceActive) {
        const min = minPrice ? Number(minPrice) : 0
        const max = maxPrice ? Number(maxPrice) : Infinity
        if (product.price < min || product.price > max) return false
      }

      if (q) {
        if (!product.name.toLowerCase().includes(q) && !product.description.toLowerCase().includes(q)) return false
      }

      return true
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
  }, [query, categories, genders, selectedSizes, selectedColors, priceRange, customPriceActive, minPrice, maxPrice, sort])

  const colorCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    shopProducts.forEach(p => {
      p.colors.forEach(c => {
        if (c.available) {
          counts[c.name] = (counts[c.name] || 0) + 1
        }
      })
    })
    return counts
  }, [])

  const sizeCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    shopProducts.forEach(p => {
      p.sizes.forEach(s => {
        counts[s] = (counts[s] || 0) + 1
      })
    })
    return counts
  }, [])

  const availableColors = useMemo(() => {
    return Object.entries(colorCounts)
      .filter(([, count]) => count > 0)
      .sort((a, b) => b[1] - a[1])
  }, [colorCounts])

  const visibleGenders = showAllGenders ? genderOptions : genderOptions.slice(0, GENDER_INITIAL_COUNT)
  const visibleCategories = showAllCategories ? categoryOptions : categoryOptions.slice(0, CATEGORY_INITIAL_COUNT)
  const sizeInitialCount = SIZE_INITIAL_ROWS * SIZE_ITEMS_PER_ROW
  const visibleSizes = showAllSizes ? allSizes : allSizes.slice(0, sizeInitialCount)
  const visibleColors = showAllColors ? availableColors : availableColors.slice(0, COLOR_INITIAL_COUNT)

  return (
    <section className='pt-2 pb-8 sm:pt-4 sm:pb-12 lg:pt-6 lg:pb-16'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex gap-8'>
          {/* Left sidebar - Filters */}
          <aside className='w-60 shrink-0'>
            <div className='sticky top-24'>
              <div className='bg-background rounded-lg p-4'>
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
                  <p className='text-muted-foreground mb-2 text-xs'>Filters applied</p>
                ) : (
                  <p className='text-muted-foreground mb-2 text-xs'>No filters applied</p>
                )}

                {/* Gender */}
                <FilterSection title='Gender'>
                  <div className='flex flex-col gap-2'>
                    {visibleGenders.map(g => {
                      const count = shopProducts.filter(p => p.gender === g.value).length
                      const isActive = genders.includes(g.value)

                      return (
                        <label key={g.value} className='flex cursor-pointer items-center gap-2 text-sm'>
                          <input
                            type='checkbox'
                            checked={isActive}
                            onChange={() => toggleGender(g.value)}
                            className='border-foreground/30 size-4 rounded-sm accent-primary'
                          />
                          <span className={isActive ? 'font-medium' : ''}>{g.label}</span>
                          <span className='text-muted-foreground ml-auto text-xs'>({count})</span>
                        </label>
                      )
                    })}
                    {genderOptions.length > GENDER_INITIAL_COUNT && (
                      <button
                        className='text-muted-foreground mt-1 self-start text-xs underline underline-offset-3'
                        onClick={() => setShowAllGenders(!showAllGenders)}
                      >
                        {showAllGenders ? 'Show less' : `Show all (${genderOptions.length})`}
                      </button>
                    )}
                  </div>
                </FilterSection>

                {/* Category */}
                <FilterSection title='Category'>
                  <div className='flex flex-col gap-2'>
                    {visibleCategories.map(cat => {
                      const count = shopProducts.filter(p => p.category === cat.value).length
                      const isActive = categories.includes(cat.value)

                      return (
                        <label key={cat.value} className='flex cursor-pointer items-center gap-2 text-sm'>
                          <input
                            type='checkbox'
                            checked={isActive}
                            onChange={() => toggleCategory(cat.value)}
                            className='border-foreground/30 size-4 rounded-sm accent-primary'
                          />
                          <span className={isActive ? 'font-medium' : ''}>{cat.label}</span>
                          <span className='text-muted-foreground ml-auto text-xs'>({count})</span>
                        </label>
                      )
                    })}
                    {categoryOptions.length > CATEGORY_INITIAL_COUNT && (
                      <button
                        className='text-muted-foreground mt-1 self-start text-xs underline underline-offset-3'
                        onClick={() => setShowAllCategories(!showAllCategories)}
                      >
                        {showAllCategories ? 'Show less' : `Show all (${categoryOptions.length})`}
                      </button>
                    )}
                  </div>
                </FilterSection>

                {/* Size */}
                <FilterSection title='Size'>
                  <div className='flex flex-wrap gap-2'>
                    {visibleSizes.map(size => {
                      const isActive = selectedSizes.includes(size)
                      const count = sizeCounts[size] || 0

                      return (
                        <button
                          key={size}
                          onClick={() => toggleSize(size)}
                          className={`rounded-md border px-3 py-1.5 text-xs transition-all ${
                            isActive
                              ? 'border-foreground bg-foreground text-primary-foreground'
                              : 'border-foreground/20 hover:border-foreground/40'
                          }`}
                        >
                          {size}
                        </button>
                      )
                    })}
                  </div>
                  {allSizes.length > sizeInitialCount && (
                    <button
                      className='text-muted-foreground mt-2 self-start text-xs underline underline-offset-3'
                      onClick={() => setShowAllSizes(!showAllSizes)}
                    >
                      {showAllSizes ? 'Show less' : `Show all (${allSizes.length})`}
                    </button>
                  )}
                  {/* Dashed separator before ONE SIZE */}
                  <div className='border-foreground/20 my-3 border-t border-dashed' />
                  <button
                    onClick={() => toggleSize('ONE SIZE')}
                    className={`rounded-md border px-3 py-1.5 text-xs transition-all ${
                      selectedSizes.includes('ONE SIZE')
                        ? 'border-foreground bg-foreground text-primary-foreground'
                        : 'border-foreground/20 hover:border-foreground/40'
                    }`}
                  >
                    ONE SIZE
                  </button>
                </FilterSection>

                {/* Color */}
                <FilterSection title='Color'>
                  <div className='flex flex-col gap-2'>
                    {visibleColors.map(([name, count]) => {
                      const colorData = shopProducts.flatMap(p => p.colors).find(c => c.name === name)
                      const isActive = selectedColors.includes(name)

                      return (
                        <label key={name} className='flex cursor-pointer items-center gap-2 text-sm'>
                          <input
                            type='checkbox'
                            checked={isActive}
                            onChange={() => toggleColor(name)}
                            className='border-foreground/30 size-4 rounded-sm accent-primary'
                          />
                          <span
                            className='size-5 shrink-0 rounded-sm border border-foreground/20'
                            style={{ backgroundColor: colorData?.hex }}
                          />
                          <span className={isActive ? 'font-medium' : ''}>{name}</span>
                          <span className='text-muted-foreground ml-auto text-xs'>({count})</span>
                        </label>
                      )
                    })}
                    {availableColors.length > COLOR_INITIAL_COUNT && (
                      <button
                        className='text-muted-foreground mt-1 self-start text-xs underline underline-offset-3'
                        onClick={() => setShowAllColors(!showAllColors)}
                      >
                        {showAllColors ? 'Show less' : `Show all (${availableColors.length})`}
                      </button>
                    )}
                  </div>
                </FilterSection>

                {/* Price */}
                <FilterSection title='Price'>
                  <div className='flex flex-col gap-2'>
                    <label className='flex cursor-pointer items-center gap-2 text-sm'>
                      <input
                        type='radio'
                        name='price'
                        checked={priceRange === 'all' && !customPriceActive}
                        onChange={() => {
                          setPriceRange('all')
                          setCustomPriceActive(false)
                          setMinPrice('')
                          setMaxPrice('')
                        }}
                        className='accent-primary'
                      />
                      <span>All prices</span>
                    </label>
                    {priceRanges.map(p => (
                      <label key={p.value} className='flex cursor-pointer items-center gap-2 text-sm'>
                        <input
                          type='radio'
                          name='price'
                          checked={priceRange === p.value && !customPriceActive}
                          onChange={() => {
                            setPriceRange(p.value)
                            setCustomPriceActive(false)
                            setMinPrice('')
                            setMaxPrice('')
                          }}
                          className='accent-primary'
                        />
                        <span>{p.label}</span>
                      </label>
                    ))}

                    {/* Dashed separator */}
                    <div className='border-foreground/20 my-1 border-t border-dashed' />

                    {/* Min / Max inputs */}
                    <div className='flex gap-3'>
                      <div className='flex-1'>
                        <label className='text-muted-foreground mb-1 block text-xs'>Minimum ₱</label>
                        <Input
                          type='text'
                          inputMode='numeric'
                          pattern='[0-9]*'
                          placeholder='100'
                          value={minPrice}
                          onChange={e => setMinPrice(e.target.value.replace(/[^0-9]/g, ''))}
                          className='rounded-sm text-sm placeholder:text-foreground/30 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                        />
                      </div>
                      <div className='flex-1'>
                        <label className='text-muted-foreground mb-1 block text-xs'>Maximum ₱</label>
                        <Input
                          type='text'
                          inputMode='numeric'
                          pattern='[0-9]*'
                          placeholder='500'
                          value={maxPrice}
                          onChange={e => setMaxPrice(e.target.value.replace(/[^0-9]/g, ''))}
                          className='rounded-sm text-sm placeholder:text-foreground/30 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                        />
                      </div>
                    </div>

                    <Button
                      size='sm'
                      className='mt-1 w-full rounded-md'
                      disabled={!hasPriceInput}
                      onClick={() => {
                        if (hasPriceInput) {
                          setPriceRange('all')
                          setCustomPriceActive(true)
                        }
                      }}
                    >
                      APPLY
                    </Button>

                    {hasPriceInput && (
                      <button
                        className='text-muted-foreground mt-2 self-start text-xs underline underline-offset-3'
                        onClick={() => {
                          setMinPrice('')
                          setMaxPrice('')
                          setCustomPriceActive(false)
                        }}
                      >
                        Clear price filter
                      </button>
                    )}
                  </div>
                </FilterSection>
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
                <p className='client-muted client-body-sm'>Try a different keyword or clear the filters.</p>
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
