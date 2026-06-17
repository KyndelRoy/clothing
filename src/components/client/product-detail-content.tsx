'use client'

import { useState } from 'react'

import Link from 'next/link'

import { ChevronLeftIcon, HeartIcon, MinusIcon, PlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

import {
  shopCategoryOptions,
  shopFabricOptions,
  shopFeatureOptions,
  shopFitOptions,
  shopGenderOptions,
  shopNecklineOptions
} from '@/data/client/shop'

import { formatPrice } from '@/lib/format'

import type { ProductColor, ShopProduct, ShopSize } from '@/types/shop'

type ProductDetailContentProps = {
  product: ShopProduct
}

type RegionalStandard = 'US' | 'UK' | 'EU' | 'International'

const REGIONAL_STANDARDS: RegionalStandard[] = ['US', 'UK', 'EU', 'International']

const QTY_MIN = 1
const QTY_MAX = 10

const ONE_SIZE = 'ONE SIZE' as const

// Look up the human label for a value in one of the shop option registries.
// Falls back to the raw value if the registry doesn't have a match.
const labelOf = <T extends { value: string; label: string }>(options: readonly T[], value: string) =>
  options.find(o => o.value === value)?.label ?? value

const ProductDetailContent = ({ product }: ProductDetailContentProps) => {
  const isOneSize = product.sizes.length === 1 && product.sizes[0] === ONE_SIZE

  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    () => product.colors.find(c => c.available) ?? product.colors[0]
  )

  const [selectedSize, setSelectedSize] = useState<ShopSize>(() =>
    isOneSize ? product.sizes[0] : (product.sizes.find(s => s !== ONE_SIZE) ?? product.sizes[0])
  )

  const [quantity, setQuantity] = useState(QTY_MIN)
  const [regionalStandard, setRegionalStandard] = useState<RegionalStandard>('US')

  const decQty = () => setQuantity(q => Math.max(QTY_MIN, q - 1))
  const incQty = () => setQuantity(q => Math.min(QTY_MAX, q + 1))

  const handleColorSelect = (color: ProductColor) => {
    if (!color.available) return
    setSelectedColor(color)
  }

  const specs = [
    { label: 'Category', value: labelOf(shopCategoryOptions, product.category) },
    { label: 'Gender', value: labelOf(shopGenderOptions, product.gender) },
    { label: 'Fabric', value: labelOf(shopFabricOptions, product.fabric) },
    { label: 'Fit', value: labelOf(shopFitOptions, product.fit) },
    { label: 'Neckline', value: labelOf(shopNecklineOptions, product.neckline) },
    {
      label: 'Features',
      value: product.features.length > 0 ? product.features.map(f => labelOf(shopFeatureOptions, f)).join(', ') : '—'
    }
  ]

  return (
    <section className='mx-auto max-w-7xl px-4 pt-6 pb-12 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10'>
      {/* Breadcrumb */}
      <nav className='text-muted-foreground mb-6 flex items-center gap-1.5 text-xs sm:text-sm' aria-label='Breadcrumb'>
        <Link href='/shop' className='hover:text-foreground inline-flex items-center gap-1 transition-colors'>
          <ChevronLeftIcon className='size-3.5' />
          Shop
        </Link>
        <span aria-hidden='true'>/</span>
        <span className='text-foreground truncate'>{product.name}</span>
      </nav>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:gap-12'>
        {/* Left column — Image gallery */}
        <div className='flex flex-col gap-3'>
          <div className='bg-muted/30 relative overflow-hidden'>
            <img
              src={selectedColor.image}
              alt={selectedColor.imageAlt || `${product.name} in ${selectedColor.name}`}
              className='aspect-square w-full object-cover'
            />
            <button
              className='absolute top-3 right-3 z-10 flex size-10 items-center justify-center rounded-full bg-white/85 text-black shadow-sm backdrop-blur-sm transition-colors hover:bg-white'
              aria-label='Add to wishlist'
              type='button'
            >
              <HeartIcon className='size-5' />
            </button>
          </div>

          {/* Thumbnail strip — one per available color, borderless. Smaller on mobile so 5+ fit on one row. */}
          {product.colors.length > 1 && (
            <div className='flex flex-wrap gap-2' role='tablist' aria-label='Product images'>
              {product.colors.map(color => {
                const isActive = selectedColor.name === color.name
                const isDisabled = !color.available

                return (
                  <button
                    key={color.name}
                    type='button'
                    role='tab'
                    aria-selected={isActive}
                    aria-label={`Show ${color.name}`}
                    onClick={() => handleColorSelect(color)}
                    disabled={isDisabled}
                    className={`relative size-12 shrink-0 overflow-hidden transition-all sm:size-16 ${
                      isDisabled
                        ? 'cursor-not-allowed opacity-40'
                        : isActive
                          ? 'ring-foreground ring-1 ring-offset-1'
                          : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    {color.image ? (
                      <img src={color.image} alt='' className='size-full object-cover' loading='lazy' />
                    ) : (
                      <span className='block size-full' style={{ backgroundColor: color.hex }} />
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Right column — Product details */}
        <div className='flex flex-col gap-6'>
          {/* Name + price */}
          <div className='flex flex-col gap-2'>
            <h1 className='text-2xl leading-tight font-semibold tracking-tight sm:text-3xl'>{product.name}</h1>
            <p className='text-xl tabular-nums sm:text-2xl'>{formatPrice(product.price)}</p>
          </div>

          <p className='text-muted-foreground text-sm leading-relaxed sm:text-base'>{product.description}</p>

          <div className='border-t border-gray-200' />

          {/* Color picker */}
          <div className='flex flex-col gap-3'>
            <div className='flex items-baseline justify-between'>
              <span className='text-sm font-semibold sm:text-base'>Color</span>
              <span className='text-muted-foreground text-sm'>{selectedColor.name}</span>
            </div>
            <div className='flex flex-wrap gap-2'>
              {product.colors.map(color => {
                const isActive = selectedColor.name === color.name
                const isDisabled = !color.available

                return (
                  <button
                    key={color.name}
                    type='button'
                    onClick={() => handleColorSelect(color)}
                    disabled={isDisabled}
                    title={isDisabled ? `${color.name} (Unavailable)` : color.name}
                    aria-label={`Select ${color.name}`}
                    aria-pressed={isActive}
                    className={`size-9 shrink-0 rounded-full border transition-all ${
                      isDisabled
                        ? 'cursor-not-allowed opacity-30'
                        : isActive
                          ? 'border-foreground ring-foreground ring-1 ring-offset-2'
                          : 'hover:border-foreground/50 border-gray-200 hover:scale-110'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                )
              })}
            </div>
          </div>

          <div className='border-t border-gray-200' />

          {/* Size picker */}
          <div className='flex flex-col gap-3'>
            <div className='flex items-baseline justify-between'>
              <h2 className='text-sm font-semibold sm:text-base'>Select Size</h2>
              {!isOneSize && (
                <button
                  type='button'
                  className='text-muted-foreground hover:text-foreground text-xs underline underline-offset-3 sm:text-sm'
                >
                  Size guide
                </button>
              )}
            </div>

            {/* Regional tabs */}
            <div className='flex items-center gap-4 sm:gap-6' role='tablist' aria-label='Sizing standard'>
              {REGIONAL_STANDARDS.map(region => {
                const isActive = regionalStandard === region

                return (
                  <button
                    key={region}
                    type='button'
                    role='tab'
                    aria-selected={isActive}
                    onClick={() => setRegionalStandard(region)}
                    className={`relative -mb-px py-1 text-sm font-semibold transition-colors ${
                      isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {region}
                    {isActive && (
                      <span className='absolute right-0 bottom-0 left-0 h-0.5 bg-red-500' aria-hidden='true' />
                    )}
                  </button>
                )
              })}
            </div>

            <div className='border-t border-gray-200' />

            {/* Size grid — square pills, no border-radius, light gray border */}
            <div className='flex flex-wrap gap-2'>
              {product.sizes.map(size => {
                const isActive = selectedSize === size

                return (
                  <button
                    key={size}
                    type='button'
                    onClick={() => setSelectedSize(size)}
                    aria-pressed={isActive}
                    className={`relative flex size-12 items-center justify-center border text-sm font-semibold transition-all sm:size-14 ${
                      isActive
                        ? 'border-foreground text-foreground'
                        : 'text-foreground hover:border-foreground/50 border-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                )
              })}
            </div>
          </div>

          <div className='border-t border-gray-200' />

          {/* Quantity + CTAs (desktop layout — sticky on mobile is rendered below) */}
          <div className='hidden flex-col gap-4 sm:flex'>
            <div className='flex items-center gap-4'>
              <span className='text-sm font-semibold sm:text-base'>Quantity</span>
              <div className='inline-flex items-center border border-gray-200'>
                <button
                  type='button'
                  onClick={decQty}
                  disabled={quantity <= QTY_MIN}
                  aria-label='Decrease quantity'
                  className='hover:bg-muted flex size-10 items-center justify-center transition-colors disabled:cursor-not-allowed disabled:opacity-40'
                >
                  <MinusIcon className='size-4' />
                </button>
                <span
                  className='w-10 text-center text-sm tabular-nums'
                  aria-live='polite'
                  aria-label={`Quantity: ${quantity}`}
                >
                  {quantity}
                </span>
                <button
                  type='button'
                  onClick={incQty}
                  disabled={quantity >= QTY_MAX}
                  aria-label='Increase quantity'
                  className='hover:bg-muted flex size-10 items-center justify-center transition-colors disabled:cursor-not-allowed disabled:opacity-40'
                >
                  <PlusIcon className='size-4' />
                </button>
              </div>
            </div>

            <div className='flex flex-col gap-2 sm:flex-row'>
              <Button
                type='button'
                size='lg'
                variant='outline'
                className='h-12 flex-1 rounded-none border border-gray-200 text-sm font-semibold tracking-wide uppercase'
              >
                Add to Cart
              </Button>
              <Button
                type='button'
                size='lg'
                className='h-12 flex-1 rounded-none bg-black text-sm font-semibold tracking-wide text-white uppercase hover:bg-black/90'
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Spec details — fabric / fit / neckline / features */}
      <div className='mt-12 border-t border-gray-200 pt-8 sm:mt-16 sm:pt-10'>
        <h2 className='mb-4 text-lg font-semibold tracking-tight'>Product Details</h2>
        <dl className='grid grid-cols-1 gap-x-8 gap-y-3 text-sm sm:grid-cols-2'>
          {specs.map(({ label, value }) => (
            <div key={label} className='flex justify-between border-b border-gray-100 py-2 sm:border-none sm:py-0'>
              <dt className='text-muted-foreground'>{label}</dt>
              <dd className='font-medium'>{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Sticky mobile cart bar — fixed to bottom of viewport, hidden on sm+ where the inline CTAs live. */}
      <div className='bg-background/95 fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 backdrop-blur-md sm:hidden'>
        <div className='mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 sm:gap-3 sm:px-6'>
          <div className='inline-flex shrink-0 items-center border border-gray-200'>
            <button
              type='button'
              onClick={decQty}
              disabled={quantity <= QTY_MIN}
              aria-label='Decrease quantity'
              className='hover:bg-muted flex size-11 items-center justify-center transition-colors disabled:cursor-not-allowed disabled:opacity-40'
            >
              <MinusIcon className='size-4' />
            </button>
            <span
              className='w-9 text-center text-sm tabular-nums'
              aria-live='polite'
              aria-label={`Quantity: ${quantity}`}
            >
              {quantity}
            </span>
            <button
              type='button'
              onClick={incQty}
              disabled={quantity >= QTY_MAX}
              aria-label='Increase quantity'
              className='hover:bg-muted flex size-11 items-center justify-center transition-colors disabled:cursor-not-allowed disabled:opacity-40'
            >
              <PlusIcon className='size-4' />
            </button>
          </div>
          <Button
            type='button'
            size='lg'
            className='h-11 flex-1 rounded-full bg-black text-sm font-semibold tracking-wide text-white uppercase hover:bg-black/90'
          >
            Add to Cart · {formatPrice(product.price)}
          </Button>
        </div>
      </div>
      {/* Spacer so the sticky bar doesn't cover the last bit of content on mobile. */}
      <div className='h-20 sm:hidden' aria-hidden='true' />
    </section>
  )
}

export default ProductDetailContent
