'use client'

import { useState } from 'react'

import Link from 'next/link'

import { ChevronLeftIcon, HeartIcon, MinusIcon, PlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { formatPrice } from '@/lib/format'

import type { ProductColor, ShopProduct, ShopSize } from '@/types/shop'

type ProductDetailContentProps = {
  product: ShopProduct
}

const QTY_MIN = 1
const QTY_MAX = 10

const formatLabel = (value: string) => value.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

const ProductDetailContent = ({ product }: ProductDetailContentProps) => {
  const initialColor = product.colors.find(c => c.available) ?? product.colors[0]
  const initialSize: ShopSize = product.sizes.includes('ONE SIZE') ? 'ONE SIZE' : product.sizes[0]

  const [selectedColor, setSelectedColor] = useState<ProductColor>(initialColor)
  const [selectedSize, setSelectedSize] = useState<ShopSize>(initialSize)
  const [quantity, setQuantity] = useState(QTY_MIN)

  const availableColors = product.colors
  const availableSizes = product.sizes
  const isOneSize = availableSizes.length === 1 && availableSizes[0] === 'ONE SIZE'

  const decQty = () => setQuantity(q => Math.max(QTY_MIN, q - 1))
  const incQty = () => setQuantity(q => Math.min(QTY_MAX, q + 1))

  const handleColorSelect = (color: ProductColor) => {
    if (!color.available) return
    setSelectedColor(color)
  }

  return (
    <section className='mx-auto max-w-7xl px-4 pt-6 pb-12 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10'>
      {/* Breadcrumb */}
      <nav className='text-muted-foreground mb-6 flex items-center gap-1.5 text-xs sm:text-sm' aria-label='Breadcrumb'>
        <Link href='/shop' className='inline-flex items-center gap-1 hover:text-foreground transition-colors'>
          <ChevronLeftIcon className='size-3.5' />
          Shop
        </Link>
        <span aria-hidden='true'>/</span>
        <span className='text-foreground truncate'>{product.name}</span>
      </nav>

      <div className='grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12'>
        {/* Left column — Image gallery */}
        <div className='flex flex-col gap-3'>
          <div className='bg-muted/30 relative overflow-hidden'>
            <img
              key={selectedColor.name}
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

          {/* Thumbnail strip — one per available color */}
          {availableColors.length > 1 && (
            <div className='flex flex-wrap gap-2' role='tablist' aria-label='Product images'>
              {availableColors.map(color => {
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
                    className={`relative size-16 shrink-0 overflow-hidden border bg-white transition-all ${
                      isDisabled
                        ? 'cursor-not-allowed opacity-40'
                        : isActive
                          ? 'border-foreground ring-foreground ring-1 ring-offset-1'
                          : 'border-foreground/20 hover:border-foreground/50'
                    }`}
                  >
                    {color.image ? (
                      <img src={color.image} alt='' className='size-full object-cover' />
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
              <span className='text-sm font-medium tracking-wide uppercase'>Color</span>
              <span className='text-muted-foreground text-sm'>{selectedColor.name}</span>
            </div>
            <div className='flex flex-wrap gap-2'>
              {availableColors.map(color => {
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
                          ? 'border-foreground/30 ring-foreground ring-1 ring-offset-2'
                          : 'border-foreground/20 hover:scale-110 hover:border-foreground/50'
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
              <span className='text-sm font-medium tracking-wide uppercase'>Size</span>
              {!isOneSize && (
                <button
                  type='button'
                  className='text-muted-foreground hover:text-foreground text-xs underline underline-offset-3'
                >
                  Size guide
                </button>
              )}
            </div>
            <div className='flex flex-wrap gap-2'>
              {availableSizes.map(size => {
                const isActive = selectedSize === size

                return (
                  <button
                    key={size}
                    type='button'
                    onClick={() => setSelectedSize(size)}
                    aria-pressed={isActive}
                    className={`min-w-14 rounded-md border px-4 py-2 text-sm transition-all ${
                      isActive
                        ? 'border-foreground bg-foreground text-primary-foreground'
                        : 'border-foreground/20 hover:border-foreground/50'
                    }`}
                  >
                    {size}
                  </button>
                )
              })}
            </div>
          </div>

          <div className='border-t border-gray-200' />

          {/* Quantity + CTAs */}
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
              <span className='text-sm font-medium tracking-wide uppercase'>Quantity</span>
              <div className='inline-flex items-center border border-foreground/20'>
                <button
                  type='button'
                  onClick={decQty}
                  disabled={quantity <= QTY_MIN}
                  aria-label='Decrease quantity'
                  className='flex size-10 items-center justify-center transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40'
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
                  className='flex size-10 items-center justify-center transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40'
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
                className='h-12 flex-1 rounded-md text-sm font-semibold tracking-wide uppercase'
              >
                Add to Cart
              </Button>
              <Button
                type='button'
                size='lg'
                className='h-12 flex-1 rounded-md text-sm font-semibold tracking-wide uppercase'
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
          <div className='flex justify-between border-b border-gray-100 py-2 sm:border-none sm:py-0'>
            <dt className='text-muted-foreground'>Category</dt>
            <dd className='font-medium'>{formatLabel(product.category)}</dd>
          </div>
          <div className='flex justify-between border-b border-gray-100 py-2 sm:border-none sm:py-0'>
            <dt className='text-muted-foreground'>Gender</dt>
            <dd className='font-medium'>{formatLabel(product.gender)}</dd>
          </div>
          <div className='flex justify-between border-b border-gray-100 py-2 sm:border-none sm:py-0'>
            <dt className='text-muted-foreground'>Fabric</dt>
            <dd className='font-medium'>{formatLabel(product.fabric)}</dd>
          </div>
          <div className='flex justify-between border-b border-gray-100 py-2 sm:border-none sm:py-0'>
            <dt className='text-muted-foreground'>Fit</dt>
            <dd className='font-medium'>{formatLabel(product.fit)}</dd>
          </div>
          <div className='flex justify-between border-b border-gray-100 py-2 sm:border-none sm:py-0'>
            <dt className='text-muted-foreground'>Neckline</dt>
            <dd className='font-medium'>{formatLabel(product.neckline)}</dd>
          </div>
          <div className='flex justify-between border-b border-gray-100 py-2 sm:border-none sm:py-0'>
            <dt className='text-muted-foreground'>Features</dt>
            <dd className='font-medium'>
              {product.features.length > 0 ? product.features.map(formatLabel).join(', ') : '—'}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

export default ProductDetailContent
