'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { FilterIcon, MinusIcon, PlusIcon, SearchIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetBody, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import ProductCard from '@/components/client/product-card'

import {
  shopProducts,
  shopGenderOptions,
  shopCategoryOptions,
  shopSizeGroups,
  shopFabricOptions,
  shopFitOptions,
  shopNecklineOptions,
  shopFeatureOptions,
  shopPriceRanges
} from '@/data/client/shop'

import type {
  PriceRange,
  ShopCategory,
  ShopFabric,
  ShopFeature,
  ShopFit,
  ShopGender,
  ShopNeckline,
  ShopSize
} from '@/types/shop'

type SortOption = 'newest' | 'oldest' | 'price-low' | 'price-high'

const sortLabels: Record<SortOption, string> = {
  newest: 'Newest to Oldest',
  oldest: 'Oldest to Newest',
  'price-low': 'Price: Low to High',
  'price-high': 'Price: High to Low'
}

const SIZE_GROUP_INITIAL_ROWS = 3
const SIZE_PILL_WIDTH_APPROX = 70
const SIZE_GAP = 8
const SIZE_CONTAINER_WIDTH = 208

const GENDER_INITIAL_COUNT = 6
const CATEGORY_INITIAL_COUNT = 4
const COLOR_INITIAL_COUNT = 5
const FABRIC_INITIAL_COUNT = 3
const FIT_INITIAL_COUNT = 3
const NECKLINE_INITIAL_COUNT = 3
const FEATURE_INITIAL_COUNT = 3

const ShopPageContent = () => {
  // Filter values
  const [query, setQuery] = useState('')
  const [categories, setCategories] = useState<ShopCategory[]>([])
  const [genders, setGenders] = useState<ShopGender[]>([])
  const [selectedSizes, setSelectedSizes] = useState<ShopSize[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedFabrics, setSelectedFabrics] = useState<ShopFabric[]>([])
  const [selectedFits, setSelectedFits] = useState<ShopFit[]>([])
  const [selectedNecklines, setSelectedNecklines] = useState<ShopNeckline[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<ShopFeature[]>([])
  const [priceRange, setPriceRange] = useState<PriceRange>('all')
  const [customPriceActive, setCustomPriceActive] = useState(false)
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sort, setSort] = useState<SortOption>('newest')

  // UI state
  const [filterSheetOpen, setFilterSheetOpen] = useState(false)
  const [showAllGenders, setShowAllGenders] = useState(false)
  const [showAllCategories, setShowAllCategories] = useState(false)
  const [showAllSizes, setShowAllSizes] = useState(false)
  const [showAllColors, setShowAllColors] = useState(false)
  const [showAllFabrics, setShowAllFabrics] = useState(false)
  const [showAllFits, setShowAllFits] = useState(false)
  const [showAllNecklines, setShowAllNecklines] = useState(false)
  const [showAllFeatures, setShowAllFeatures] = useState(false)

  // Section open/closed map (shared between sidebar and sheet so state survives sheet remount).
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => ({
    gender: true,
    category: true,
    size: true,
    color: false,
    price: false,
    fabric: true,
    fit: false,
    neckline: false,
    features: false
  }))

  const setSectionOpen = (key: string, open: boolean) => {
    setOpenSections(prev => ({ ...prev, [key]: open }))
  }

  const cardsRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)

  const toggle = <T extends string>(prev: T[], val: T) =>
    prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]

  const hasPriceInput = minPrice.trim() !== '' || maxPrice.trim() !== ''

  const isFiltered =
    query.trim().length > 0 ||
    categories.length > 0 ||
    genders.length > 0 ||
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    selectedFabrics.length > 0 ||
    selectedFits.length > 0 ||
    selectedNecklines.length > 0 ||
    selectedFeatures.length > 0 ||
    priceRange !== 'all' ||
    customPriceActive

  // Count of distinct filter categories with at least one active value (mobile button badge).
  const activeFilterCategoryCount =
    (categories.length > 0 ? 1 : 0) +
    (genders.length > 0 ? 1 : 0) +
    (selectedSizes.length > 0 ? 1 : 0) +
    (selectedColors.length > 0 ? 1 : 0) +
    (selectedFabrics.length > 0 ? 1 : 0) +
    (selectedFits.length > 0 ? 1 : 0) +
    (selectedNecklines.length > 0 ? 1 : 0) +
    (selectedFeatures.length > 0 ? 1 : 0) +
    (priceRange !== 'all' || customPriceActive ? 1 : 0)

  const clearFilters = () => {
    setQuery('')
    setCategories([])
    setGenders([])
    setSelectedSizes([])
    setSelectedColors([])
    setSelectedFabrics([])
    setSelectedFits([])
    setSelectedNecklines([])
    setSelectedFeatures([])
    setPriceRange('all')
    setCustomPriceActive(false)
    setMinPrice('')
    setMaxPrice('')
  }

  const scrollToCards = useCallback(() => {
    requestAnimationFrame(() => {
      if (rightColRef.current) {
        rightColRef.current.scrollIntoView({ behavior: 'instant', block: 'start' })
      }
    })
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()

    const results = shopProducts.filter(product => {
      if (categories.length > 0 && !categories.includes(product.category)) return false
      if (genders.length > 0 && !genders.includes(product.gender)) return false
      if (selectedSizes.length > 0 && !selectedSizes.some(s => product.sizes.includes(s))) return false
      if (selectedColors.length > 0 && !selectedColors.some(c => product.colors.map(x => x.name).includes(c)))
        return false
      if (selectedFabrics.length > 0 && !selectedFabrics.includes(product.fabric)) return false
      if (selectedFits.length > 0 && !selectedFits.includes(product.fit)) return false
      if (selectedNecklines.length > 0 && !selectedNecklines.includes(product.neckline)) return false
      if (selectedFeatures.length > 0 && !selectedFeatures.some(f => product.features.includes(f))) return false

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

      if (q && !product.name.toLowerCase().includes(q) && !product.description.toLowerCase().includes(q)) return false

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
  }, [
    query,
    categories,
    genders,
    selectedSizes,
    selectedColors,
    selectedFabrics,
    selectedFits,
    selectedNecklines,
    selectedFeatures,
    priceRange,
    customPriceActive,
    minPrice,
    maxPrice,
    sort
  ])

  // Reset scroll to top of cards whenever filtered results change (skip initial render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false

      return
    }

    scrollToCards()
  }, [filtered, scrollToCards])

  const counts = useMemo(() => {
    const c: Record<string, Record<string, number>> = {
      gender: {},
      category: {},
      size: {},
      color: {},
      fabric: {},
      fit: {},
      neckline: {},
      feature: {}
    }

    shopProducts.forEach(p => {
      c.gender[p.gender] = (c.gender[p.gender] || 0) + 1
      c.category[p.category] = (c.category[p.category] || 0) + 1
      p.sizes.forEach(s => {
        c.size[s] = (c.size[s] || 0) + 1
      })
      p.colors.forEach(co => {
        if (co.available) c.color[co.name] = (c.color[co.name] || 0) + 1
      })
      c.fabric[p.fabric] = (c.fabric[p.fabric] || 0) + 1
      c.fit[p.fit] = (c.fit[p.fit] || 0) + 1
      c.neckline[p.neckline] = (c.neckline[p.neckline] || 0) + 1
      p.features.forEach(f => {
        c.feature[f] = (c.feature[f] || 0) + 1
      })
    })

    return c
  }, [])

  const availableColors = useMemo(
    () =>
      Object.entries(counts.color)
        .filter(([, n]) => n > 0)
        .sort((a, b) => b[1] - a[1]),
    [counts]
  )

  const visibleGenders = showAllGenders ? shopGenderOptions : shopGenderOptions.slice(0, GENDER_INITIAL_COUNT)

  const visibleCategories = showAllCategories
    ? shopCategoryOptions
    : shopCategoryOptions.slice(0, CATEGORY_INITIAL_COUNT)

  const visibleColors = showAllColors ? availableColors : availableColors.slice(0, COLOR_INITIAL_COUNT)

  const visibleFabrics = showAllFabrics ? shopFabricOptions : shopFabricOptions.slice(0, FABRIC_INITIAL_COUNT)

  const visibleFits = showAllFits ? shopFitOptions : shopFitOptions.slice(0, FIT_INITIAL_COUNT)

  const visibleNecklines = showAllNecklines ? shopNecklineOptions : shopNecklineOptions.slice(0, NECKLINE_INITIAL_COUNT)

  const visibleFeatures = showAllFeatures ? shopFeatureOptions : shopFeatureOptions.slice(0, FEATURE_INITIAL_COUNT)

  const pillsPerRow = Math.floor((SIZE_CONTAINER_WIDTH + SIZE_GAP) / (SIZE_PILL_WIDTH_APPROX + SIZE_GAP))
  const sizeInitialVisibleCount = pillsPerRow * SIZE_GROUP_INITIAL_ROWS
  const allSizeValues = shopSizeGroups.flatMap(g => g.values)
  const visibleSizeValues = showAllSizes ? allSizeValues : allSizeValues.slice(0, sizeInitialVisibleCount)
  const needsSizeShowAll = allSizeValues.length > sizeInitialVisibleCount

  const renderSizePill = (size: ShopSize) => {
    const isDisabled = (counts.size[size] || 0) === 0
    const isActive = selectedSizes.includes(size)

    return (
      <button
        key={size}
        onClick={() => !isDisabled && setSelectedSizes(prev => toggle(prev, size))}
        disabled={isDisabled}
        className={`rounded-md border px-3 py-1.5 text-xs transition-all ${
          isDisabled
            ? 'border-foreground/10 cursor-not-allowed opacity-30'
            : isActive
              ? 'border-foreground bg-foreground text-primary-foreground'
              : 'border-foreground/20 hover:border-foreground/40'
        }`}
      >
        {size}
      </button>
    )
  }

  const FilterSectionEl = ({
    title,
    sectionKey,
    children
  }: {
    title: string
    sectionKey: string
    children: React.ReactNode
  }) => {
    const open = openSections[sectionKey] ?? true

    return (
      <div className='border-b border-gray-200 px-4 py-3'>
        <div className='flex w-full items-center justify-between'>
          <button onClick={() => setSectionOpen(sectionKey, !open)} className='text-sm font-semibold'>
            {title}
          </button>
          <button
            onClick={() => setSectionOpen(sectionKey, !open)}
            className='text-foreground/60 hover:text-foreground transition-colors'
            aria-label={open ? `Collapse ${title}` : `Expand ${title}`}
          >
            {open ? <MinusIcon className='size-4' /> : <PlusIcon className='size-4' />}
          </button>
        </div>
        {open && <div className='mt-3'>{children}</div>}
      </div>
    )
  }

  const ShowAllBtn = ({ show, total, onToggle }: { show: boolean; total: number; onToggle: () => void }) => (
    <button
      className='text-muted-foreground mt-1 self-start text-xs underline underline-offset-3'
      onClick={onToggle}
    >
      {show ? 'Show less' : `Show all (${total})`}
    </button>
  )

  // Renders all filter sections, given a flag for whether to show the "Clear all" header.
  // Used by both the desktop sidebar and the mobile sheet so the markup is identical.
  const renderFilters = () => (
    <>
      {isFiltered && (
        <div className='px-4 pt-3'>
          <Button
            variant='ghost'
            size='sm'
            className='client-button h-auto w-full justify-start p-0 text-xs'
            onClick={clearFilters}
          >
            <XIcon className='size-3' />
            Clear all filters
          </Button>
        </div>
      )}

      <FilterSectionEl title='Gender' sectionKey='gender'>
        <div className='flex flex-col gap-2'>
          {visibleGenders.map(g => {
            const isDisabled = (counts.gender[g.value] || 0) === 0

            return (
              <label
                key={g.value}
                className={`flex items-center gap-2 text-sm ${
                  isDisabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
                }`}
              >
                <input
                  type='checkbox'
                  checked={genders.includes(g.value)}
                  disabled={isDisabled}
                  onChange={() => setGenders(prev => toggle(prev, g.value))}
                  className='border-foreground/30 accent-primary size-4 rounded-sm'
                />
                <span className={genders.includes(g.value) ? 'font-medium' : ''}>{g.label}</span>
                <span className='text-muted-foreground ml-auto text-xs'>({counts.gender[g.value] || 0})</span>
              </label>
            )
          })}
          {shopGenderOptions.length > GENDER_INITIAL_COUNT && (
            <ShowAllBtn
              show={showAllGenders}
              total={shopGenderOptions.length}
              onToggle={() => setShowAllGenders(!showAllGenders)}
            />
          )}
        </div>
      </FilterSectionEl>

      <FilterSectionEl title='Category' sectionKey='category'>
        <div className='flex flex-col gap-2'>
          {visibleCategories.map(cat => {
            const isDisabled = (counts.category[cat.value] || 0) === 0

            return (
              <label
                key={cat.value}
                className={`flex items-center gap-2 text-sm ${
                  isDisabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
                }`}
              >
                <input
                  type='checkbox'
                  checked={categories.includes(cat.value)}
                  disabled={isDisabled}
                  onChange={() => setCategories(prev => toggle(prev, cat.value))}
                  className='border-foreground/30 accent-primary size-4 rounded-sm'
                />
                <span className={categories.includes(cat.value) ? 'font-medium' : ''}>{cat.label}</span>
                <span className='text-muted-foreground ml-auto text-xs'>({counts.category[cat.value] || 0})</span>
              </label>
            )
          })}
          {shopCategoryOptions.length > CATEGORY_INITIAL_COUNT && (
            <ShowAllBtn
              show={showAllCategories}
              total={shopCategoryOptions.length}
              onToggle={() => setShowAllCategories(!showAllCategories)}
            />
          )}
        </div>
      </FilterSectionEl>

      <FilterSectionEl title='Size' sectionKey='size'>
        {showAllSizes ? (
          <>
            {shopSizeGroups.map((group, groupIdx) => (
              <div key={group.id}>
                {groupIdx > 0 && <div className='my-3 border-t border-dashed border-gray-200' />}
                {shopSizeGroups.length > 1 && (
                  <p className='text-muted-foreground mb-2 text-xs font-medium tracking-wider uppercase'>
                    {group.label}
                  </p>
                )}
                <div className='flex flex-wrap gap-2'>{group.values.map(renderSizePill)}</div>
              </div>
            ))}
            <ShowAllBtn
              show={showAllSizes}
              total={allSizeValues.length}
              onToggle={() => setShowAllSizes(!showAllSizes)}
            />
          </>
        ) : (
          <>
            <div className='flex flex-wrap gap-2'>{visibleSizeValues.map(renderSizePill)}</div>
            {needsSizeShowAll && (
              <ShowAllBtn
                show={showAllSizes}
                total={allSizeValues.length}
                onToggle={() => setShowAllSizes(!showAllSizes)}
              />
            )}
          </>
        )}
      </FilterSectionEl>

      <FilterSectionEl title='Color' sectionKey='color'>
        <div className='flex flex-col gap-2'>
          {visibleColors.map(([name, count]) => {
            const colorData = shopProducts.flatMap(p => p.colors).find(c => c.name === name)
            const isActive = selectedColors.includes(name)
            const isDisabled = count === 0

            return (
              <label
                key={name}
                className={`flex items-center gap-2 text-sm ${
                  isDisabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
                }`}
              >
                <input
                  type='checkbox'
                  checked={isActive}
                  disabled={isDisabled}
                  onChange={() => setSelectedColors(prev => toggle(prev, name))}
                  className='border-foreground/30 accent-primary size-4 rounded-sm'
                />
                {colorData?.boxImage ? (
                  <span className='border-foreground/20 size-5 shrink-0 overflow-hidden rounded-sm border'>
                    <img src={colorData.boxImage} alt={colorData.imageAlt || name} className='size-full object-cover' />
                  </span>
                ) : (
                  <span
                    className='border-foreground/20 size-5 shrink-0 rounded-sm border'
                    style={{ backgroundColor: colorData?.hex }}
                  />
                )}
                <span className={isActive ? 'font-medium' : ''}>{name}</span>
                <span className='text-muted-foreground ml-auto text-xs'>({count})</span>
              </label>
            )
          })}
          {availableColors.length > COLOR_INITIAL_COUNT && (
            <ShowAllBtn
              show={showAllColors}
              total={availableColors.length}
              onToggle={() => setShowAllColors(!showAllColors)}
            />
          )}
        </div>
      </FilterSectionEl>

      <FilterSectionEl title='Price' sectionKey='price'>
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
          {shopPriceRanges.map(p => (
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
          <div className='my-1 border-t border-dashed border-gray-200' />
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
                className='placeholder:text-foreground/30 rounded-none border border-gray-200 bg-white text-sm focus:border-black focus:ring-0 focus-visible:border-black focus-visible:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
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
                className='placeholder:text-foreground/30 rounded-none border border-gray-200 bg-white text-sm focus:border-black focus:ring-0 focus-visible:border-black focus-visible:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
              />
            </div>
          </div>
          <Button
            size='sm'
            className='mt-1 w-full rounded-md bg-black text-white hover:bg-black/80'
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
      </FilterSectionEl>

      <FilterSectionEl title='Fabric' sectionKey='fabric'>
        <div className='flex flex-col gap-2'>
          {visibleFabrics.map(f => {
            const isDisabled = (counts.fabric[f.value] || 0) === 0

            return (
              <label
                key={f.value}
                className={`flex items-center gap-2 text-sm ${
                  isDisabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
                }`}
              >
                <input
                  type='checkbox'
                  checked={selectedFabrics.includes(f.value)}
                  disabled={isDisabled}
                  onChange={() => setSelectedFabrics(prev => toggle(prev, f.value))}
                  className='border-foreground/30 accent-primary size-4 rounded-sm'
                />
                <span className={selectedFabrics.includes(f.value) ? 'font-medium' : ''}>{f.label}</span>
                <span className='text-muted-foreground ml-auto shrink-0 text-xs'>
                  ({counts.fabric[f.value] || 0})
                </span>
              </label>
            )
          })}
          {shopFabricOptions.length > FABRIC_INITIAL_COUNT && (
            <ShowAllBtn
              show={showAllFabrics}
              total={shopFabricOptions.length}
              onToggle={() => setShowAllFabrics(!showAllFabrics)}
            />
          )}
        </div>
      </FilterSectionEl>

      <FilterSectionEl title='Fit' sectionKey='fit'>
        <div className='flex flex-col gap-2'>
          {visibleFits.map(f => {
            const isDisabled = (counts.fit[f.value] || 0) === 0

            return (
              <label
                key={f.value}
                className={`flex items-center gap-2 text-sm ${
                  isDisabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
                }`}
              >
                <input
                  type='checkbox'
                  checked={selectedFits.includes(f.value)}
                  disabled={isDisabled}
                  onChange={() => setSelectedFits(prev => toggle(prev, f.value))}
                  className='border-foreground/30 accent-primary size-4 rounded-sm'
                />
                <span className={selectedFits.includes(f.value) ? 'font-medium' : ''}>{f.label}</span>
                <span className='text-muted-foreground ml-auto text-xs'>({counts.fit[f.value] || 0})</span>
              </label>
            )
          })}
          {shopFitOptions.length > FIT_INITIAL_COUNT && (
            <ShowAllBtn
              show={showAllFits}
              total={shopFitOptions.length}
              onToggle={() => setShowAllFits(!showAllFits)}
            />
          )}
        </div>
      </FilterSectionEl>

      <FilterSectionEl title='Neckline' sectionKey='neckline'>
        <div className='flex flex-col gap-2'>
          {visibleNecklines.map(n => {
            const isDisabled = (counts.neckline[n.value] || 0) === 0

            return (
              <label
                key={n.value}
                className={`flex items-center gap-2 text-sm ${
                  isDisabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
                }`}
              >
                <input
                  type='checkbox'
                  checked={selectedNecklines.includes(n.value)}
                  disabled={isDisabled}
                  onChange={() => setSelectedNecklines(prev => toggle(prev, n.value))}
                  className='border-foreground/30 accent-primary size-4 rounded-sm'
                />
                <span className={selectedNecklines.includes(n.value) ? 'font-medium' : ''}>{n.label}</span>
                <span className='text-muted-foreground ml-auto text-xs'>({counts.neckline[n.value] || 0})</span>
              </label>
            )
          })}
          {shopNecklineOptions.length > NECKLINE_INITIAL_COUNT && (
            <ShowAllBtn
              show={showAllNecklines}
              total={shopNecklineOptions.length}
              onToggle={() => setShowAllNecklines(!showAllNecklines)}
            />
          )}
        </div>
      </FilterSectionEl>

      <FilterSectionEl title='Features' sectionKey='features'>
        <div className='flex flex-col gap-2'>
          {visibleFeatures.map(f => {
            const isDisabled = (counts.feature[f.value] || 0) === 0

            return (
              <label
                key={f.value}
                className={`flex items-center gap-2 text-sm ${
                  isDisabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
                }`}
              >
                <input
                  type='checkbox'
                  checked={selectedFeatures.includes(f.value)}
                  disabled={isDisabled}
                  onChange={() => setSelectedFeatures(prev => toggle(prev, f.value))}
                  className='border-foreground/30 accent-primary size-4 rounded-sm'
                />
                <span className={selectedFeatures.includes(f.value) ? 'font-medium' : ''}>{f.label}</span>
                <span className='text-muted-foreground ml-auto text-xs'>({counts.feature[f.value] || 0})</span>
              </label>
            )
          })}
          {shopFeatureOptions.length > FEATURE_INITIAL_COUNT && (
            <ShowAllBtn
              show={showAllFeatures}
              total={shopFeatureOptions.length}
              onToggle={() => setShowAllFeatures(!showAllFeatures)}
            />
          )}
        </div>
      </FilterSectionEl>
    </>
  )

  return (
    <section className='mt-4 pb-4 sm:pb-6 lg:pb-8'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex gap-4'>
          {/* Desktop sidebar (hidden below lg) */}
          <aside className='hidden w-[276px] shrink-0 lg:block'>
            <div className='bg-white pt-4 pr-1'>
              <div className='px-4'>
                <h2 className='client-card-title mb-2'>Filters</h2>
                <p className='text-muted-foreground mb-2 text-xs'>
                  {isFiltered ? 'Filters applied' : 'No filters applied'}
                </p>
              </div>
              {renderFilters()}
            </div>
          </aside>

          {/* Right side - Search + Sort + Cards */}
          <div ref={rightColRef} className='min-w-0 flex-1 scroll-mt-20'>
            {/* Sort bar */}
            <div className='sticky top-16 z-40 mb-4 bg-stone-100/95 py-3 backdrop-blur-sm'>
              <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3'>
                {/* Mobile filter button */}
                <div className='lg:hidden'>
                  <Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
                    <SheetTrigger asChild>
                      <Button
                        variant='outline'
                        size='sm'
                        className='relative h-10 rounded-full border-gray-300 px-3.5 text-sm font-medium'
                      >
                        <SlidersHorizontalIcon className='mr-1.5 size-4' />
                        <span>Filters</span>
                        {activeFilterCategoryCount > 0 && (
                          <span className='bg-primary text-primary-foreground ml-1.5 flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold'>
                            {activeFilterCategoryCount}
                          </span>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side='bottom' className='gap-0 p-0 sm:max-w-md'>
                      <SheetHeader className='border-b'>
                        <SheetTitle className='flex items-center gap-2 text-base'>
                          <FilterIcon className='size-4' />
                          Filters
                          {activeFilterCategoryCount > 0 && (
                            <span className='text-muted-foreground text-sm font-normal'>
                              ({activeFilterCategoryCount} active)
                            </span>
                          )}
                        </SheetTitle>
                      </SheetHeader>
                      <SheetBody className='px-0'>{renderFilters()}</SheetBody>
                      <div className='bg-background shrink-0 border-t p-4'>
                        <SheetClose asChild>
                          <Button
                            size='lg'
                            className='h-12 w-full rounded-full bg-black text-sm font-semibold text-white uppercase hover:bg-black/90'
                          >
                            View {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
                          </Button>
                        </SheetClose>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>

                {/* Search input (full width on mobile, inline on sm+) */}
                <div className='relative w-full sm:max-w-xs sm:flex-1'>
                  <SearchIcon className='text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2' />
                  <Input
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                    placeholder='Search products…'
                    className='h-10 rounded-none border border-gray-300 pl-9 focus:border-black focus:ring-0 focus-visible:border-black focus-visible:ring-0'
                    aria-label='Search products'
                    type='search'
                  />
                </div>

                {/* Count + sort (right-aligned) */}
                <div className='flex items-center justify-end gap-2 sm:ml-auto sm:gap-3'>
                  <span className='client-muted client-meta whitespace-nowrap'>
                    {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
                  </span>
                  <span className='text-muted-foreground hidden sm:inline'>|</span>
                  <label className='flex items-center gap-2 sm:gap-3'>
                    <span className='client-muted client-meta hidden sm:inline'>Sort by</span>
                    <select
                      value={sort}
                      onChange={e => setSort(e.target.value as SortOption)}
                      className='h-10 rounded-none border border-gray-200 bg-white px-3 text-sm focus:ring-1 focus:ring-black focus:outline-none sm:h-9 sm:py-1.5'
                      aria-label='Sort products'
                    >
                      {Object.entries(sortLabels).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
            </div>

            {/* Active filter quick-clear (only when filters applied, on mobile) */}
            {isFiltered && (
              <div className='mb-3 lg:hidden'>
                <Button
                  variant='ghost'
                  size='sm'
                  className='text-muted-foreground h-8 rounded-full px-3 text-xs'
                  onClick={clearFilters}
                >
                  <XIcon className='size-3' />
                  Clear all filters
                </Button>
              </div>
            )}

            {/* Product grid */}
            <div ref={cardsRef} className='overflow-anchor-none'>
              {filtered.length > 0 ? (
                <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4'>
                  {filtered.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className='flex flex-col items-center justify-center gap-2 rounded-3xl border border-dashed py-16 text-center'>
                  <p className='client-card-title'>No products match your search</p>
                  <p className='client-muted client-body-sm'>Try a different keyword or clear the filters.</p>
                  <Button
                    variant='outline'
                    size='sm'
                    className='client-button mt-2 rounded-full'
                    onClick={clearFilters}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShopPageContent
