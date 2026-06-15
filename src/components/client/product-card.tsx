'use client'

import { useEffect, useRef, useState } from 'react'

import { Card, CardContent, CardTitle } from '@/components/ui/card'

import { formatPrice } from '@/lib/format'

import type { ProductColor, ShopProduct } from '@/types/shop'

type ProductCardProps = {
  product: ShopProduct
  className?: string
}

const SWATCH_SIZE = 24
const SWATCH_GAP = 8

const ProductCard = ({ product, className }: ProductCardProps) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(() => {
    return product.colors.find(c => c.available) ?? product.colors[0]
  })

  const [visibleCount, setVisibleCount] = useState(product.colors.length)
  const rowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = rowRef.current

    if (!el) return

    const calculate = () => {
      const containerWidth = el.clientWidth
      const totalColors = product.colors.length
      let count = 0
      let usedWidth = 0

      for (let i = 0; i < totalColors; i++) {
        const nextWidth = usedWidth + SWATCH_SIZE + (i > 0 ? SWATCH_GAP : 0)

        if (nextWidth > containerWidth) break
        usedWidth = nextWidth
        count = i + 1
      }

      // reserve space for the +N badge if there's overflow
      if (count < totalColors && count > 0) {
        const overflowText = `+${totalColors - count}`
        const badgeWidth = overflowText.length * 8 + 16

        while (count > 0) {
          const nextWidth = usedWidth + SWATCH_GAP + badgeWidth

          if (nextWidth <= containerWidth) break
          count--
          usedWidth -= SWATCH_GAP + SWATCH_SIZE
        }
      }

      setVisibleCount(count > 0 ? count : 1)
    }

    calculate()
    const observer = new ResizeObserver(calculate)

    observer.observe(el)

    return () => observer.disconnect()
  }, [product.colors.length])

  const handleColorSelect = (color: ProductColor) => {
    if (!color.available) return
    setSelectedColor(color)
  }

  const hiddenCount = product.colors.length - visibleCount
  const hasAvailableColors = product.colors.some(c => c.available)

  return (
    <Card
      className={
        'group/product border-foreground/15 hover:border-primary overflow-hidden rounded-md border bg-transparent pt-0 text-black! shadow-none ring-0 transition-colors duration-300 dark:text-white! ' +
        (className ?? '')
      }
    >
      <CardContent className='px-0'>
        <div className='bg-muted/30 overflow-hidden'>
          <img
            src={selectedColor.image}
            alt={selectedColor.imageAlt}
            className='aspect-4/5 w-full object-cover transition-opacity duration-300 group-hover/product:opacity-90'
            loading='lazy'
          />
        </div>
      </CardContent>
      <CardContent className={`flex flex-col gap-3 pb-0 ${hasAvailableColors ? 'px-4' : 'px-3'}`}>
        {hasAvailableColors ? (
          <div ref={rowRef} className='flex items-center gap-2'>
            {product.colors.slice(0, visibleCount).map(color => (
              <button
                key={color.name}
                onClick={() => handleColorSelect(color)}
                disabled={!color.available}
                title={`${color.name}${!color.available ? ' (Unavailable)' : ''}`}
                className={`h-6 w-6 shrink-0 rounded-sm border transition-all ${
                  selectedColor.name === color.name
                    ? 'border-foreground ring-foreground/30 ring-2'
                    : 'border-foreground/20'
                } ${!color.available ? 'cursor-not-allowed opacity-30' : 'cursor-pointer hover:scale-110'}`}
                style={{ backgroundColor: color.hex }}
                aria-label={`Select ${color.name}`}
              />
            ))}
            {hiddenCount > 0 && (
              <span className='text-muted-foreground shrink-0 text-xs font-medium'>+{hiddenCount}</span>
            )}
          </div>
        ) : (
          <div className='relative flex h-6 w-full items-center'>
            <div className='relative h-5 w-10 shrink-0'>
              <svg viewBox='0 0 40 20' className='size-full' preserveAspectRatio='none'>
                <line x1='-2' y1='22' x2='42' y2='-2' stroke='white' strokeWidth='2.5' strokeLinecap='round' />
                <line x1='-2' y1='22' x2='42' y2='-2' stroke='black' strokeWidth='1.5' strokeLinecap='round' />
              </svg>
            </div>
          </div>
        )}
        <CardTitle className={`${hasAvailableColors ? 'client-card-title' : 'text-sm font-semibold'}`}>
          {product.name}
        </CardTitle>
        <div className='h-4' />
        <span className='client-price text-left'>{formatPrice(product.price)}</span>
      </CardContent>
    </Card>
  )
}

export default ProductCard
