'use client'

import React, { useEffect, useState, useMemo, useCallback } from 'react'

import Link from 'next/link'

import { ArrowRightIcon } from 'lucide-react'

import Autoplay from 'embla-carousel-autoplay'

import { Separator } from '@/components/ui/separator'

import { Button } from '@/components/ui/button'
import { type CarouselApi, Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

export type MenuData = {
  id: number
  img: string
  imgAlt: string
  logo: string
  userComment: string
}

const logoSvgs: Record<string, React.ReactNode> = {
  apex: (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400' className='size-20 text-foreground'>
      <polygon points='200,60 120,200 280,200' fill='currentColor' />
      <polygon points='200,110 150,190 250,190' className='fill-background' />
      <text x='200' y='280' textAnchor='middle' fontFamily='Arial, Helvetica, sans-serif' fontWeight='bold' fontSize='72' fill='currentColor'>APEX</text>
      <text x='200' y='320' textAnchor='middle' fontFamily='Arial, Helvetica, sans-serif' fontWeight='300' fontSize='24' fill='currentColor' opacity='0.5'>ATHLETICS</text>
    </svg>
  ),
  vorn: (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400' className='size-20 text-foreground'>
      <circle cx='200' cy='120' r='70' fill='none' stroke='currentColor' strokeWidth='14' />
      <line x1='150' y1='70' x2='250' y2='170' stroke='currentColor' strokeWidth='14' />
      <text x='200' y='280' textAnchor='middle' fontFamily='Arial, Helvetica, sans-serif' fontWeight='bold' fontSize='78' fill='currentColor'>VORN</text>
      <line x1='110' y1='300' x2='290' y2='300' stroke='currentColor' strokeWidth='4' />
    </svg>
  ),
  drift: (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400' className='size-20 text-foreground'>
      <path d='M80,80 Q140,50 200,80 T320,80' fill='none' stroke='currentColor' strokeWidth='10' strokeLinecap='round' />
      <path d='M80,120 Q140,90 200,120 T320,120' fill='none' stroke='currentColor' strokeWidth='10' strokeLinecap='round' />
      <path d='M80,160 Q140,130 200,160 T320,160' fill='none' stroke='currentColor' strokeWidth='10' strokeLinecap='round' />
      <text x='200' y='270' textAnchor='middle' fontFamily='Arial, Helvetica, sans-serif' fontWeight='bold' fontSize='84' fill='currentColor'>DRIFT</text>
      <text x='200' y='310' textAnchor='middle' fontFamily='Arial, Helvetica, sans-serif' fontWeight='300' fontSize='20' fill='currentColor' opacity='0.5'>STREETWEAR</text>
    </svg>
  ),
  koda: (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400' className='size-20 text-foreground'>
      <polygon points='200,40 280,120 200,200 120,120' fill='currentColor' />
      <polygon points='200,75 250,120 200,165 150,120' className='fill-background' />
      <circle cx='200' cy='120' r='10' fill='currentColor' />
      <text x='200' y='290' textAnchor='middle' fontFamily='Arial, Helvetica, sans-serif' fontWeight='bold' fontSize='78' fill='currentColor'>KODA</text>
      <text x='200' y='325' textAnchor='middle' fontFamily='Arial, Helvetica, sans-serif' fontWeight='300' fontSize='18' fill='currentColor' opacity='0.5'>OUTERWEAR CO.</text>
    </svg>
  ),
  flux: (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400' className='size-20 text-foreground'>
      <rect x='80' y='60' width='240' height='22' fill='currentColor' />
      <rect x='120' y='100' width='160' height='22' fill='currentColor' />
      <rect x='160' y='140' width='80' height='22' fill='currentColor' />
      <text x='200' y='260' textAnchor='middle' fontFamily='Arial, Helvetica, sans-serif' fontWeight='bold' fontSize='90' fill='currentColor'>FLUX</text>
      <line x1='120' y1='280' x2='280' y2='280' stroke='currentColor' strokeWidth='3' />
      <text x='200' y='315' textAnchor='middle' fontFamily='Arial, Helvetica, sans-serif' fontWeight='300' fontSize='22' fill='currentColor' opacity='0.5'>APPAREL</text>
    </svg>
  ),
  zenith: (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400' className='size-20 text-foreground'>
      <path d='M100,180 A140,140 0 0,1 300,180' fill='none' stroke='currentColor' strokeWidth='12' strokeLinecap='round' />
      <circle cx='200' cy='52' r='12' fill='currentColor' />
      <text x='200' y='280' textAnchor='middle' fontFamily='Arial, Helvetica, sans-serif' fontWeight='bold' fontSize='66' fill='currentColor'>ZENITH</text>
      <text x='200' y='320' textAnchor='middle' fontFamily='Arial, Helvetica, sans-serif' fontWeight='300' fontSize='20' fill='currentColor' opacity='0.5'>EST. 2024</text>
    </svg>
  ),
}

const HeroSection = ({ menudata }: { menudata: MenuData[] }) => {
  const [mainApi, setMainApi] = useState<CarouselApi>()
  const [thumbApi, setThumbApi] = useState<CarouselApi>()
  const [commentsApi, setCommentsApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  const plugins = useMemo(() => [Autoplay({ delay: 3000, stopOnInteraction: false })], [])

  useEffect(() => {
    if (!mainApi) return

    const onSelect = () => {
      const selectedIndex = mainApi.selectedScrollSnap()
      setCurrent(selectedIndex)
      thumbApi?.scrollTo(selectedIndex)
      commentsApi?.scrollTo(selectedIndex)
    }

    mainApi.on('select', onSelect)
    return () => { mainApi.off('select', onSelect) }
  }, [mainApi, thumbApi, commentsApi])

  useEffect(() => {
    if (!thumbApi) return

    const onSelect = () => {
      const selectedIndex = thumbApi.selectedScrollSnap()
      setCurrent(selectedIndex)
      mainApi?.scrollTo(selectedIndex)
      commentsApi?.scrollTo(selectedIndex)
    }

    thumbApi.on('select', onSelect)
    return () => { thumbApi.off('select', onSelect) }
  }, [thumbApi, mainApi, commentsApi])

  useEffect(() => {
    if (!commentsApi) return

    const onSelect = () => {
      const selectedIndex = commentsApi.selectedScrollSnap()
      setCurrent(selectedIndex)
      mainApi?.scrollTo(selectedIndex)
      thumbApi?.scrollTo(selectedIndex)
    }

    commentsApi.on('select', onSelect)
    return () => { commentsApi.off('select', onSelect) }
  }, [commentsApi, mainApi, thumbApi])

  const handleThumbClick = useCallback(
    (index: number) => {
      mainApi?.scrollTo(index)
    },
    [mainApi]
  )

  return (
    <section
      id='home'
      className='before:border-primary/20 relative flex-1 py-12 before:absolute before:inset-0 before:-z-10 before:-skew-y-3 before:border-b sm:py-16 lg:py-24'
    >
      <div className='mx-auto flex h-full max-w-7xl flex-col gap-16 px-4 sm:px-6 lg:px-8'>
        {/* Hero Header */}
        <div className='grid grid-cols-1 gap-6 gap-y-12 md:gap-y-16 lg:grid-cols-5'>
          <div className='flex w-full flex-col justify-center gap-5 max-lg:items-center lg:col-span-3 lg:h-95.5'>
            <h1 className='text-3xl leading-[1.29167] font-semibold text-balance max-lg:text-center sm:text-4xl lg:text-5xl'>
              Wear your style with confidence
            </h1>

            <p className='text-muted-foreground max-w-xl text-xl max-lg:text-center'>
              Welcome to our collection where quality meets design. From premium fabrics to signature prints, every
              tee is crafted to elevate your wardrobe.
            </p>

            <div className='flex items-center gap-3.5'>
              <Button
                asChild
                size='lg'
                className='group relative w-fit overflow-hidden rounded-full text-base before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-size-[250%_250%,100%_100%] before:bg-position-[200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-position-[-100%_0,0_0] has-[>svg]:px-6 dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.2)_50%,transparent_75%,transparent_100%)]'
              >
                <Link href='#'>
                  Shop now
                  <ArrowRightIcon className='transition-transform duration-200 group-hover:translate-x-0.5' />
                </Link>
              </Button>
              <Button
                size='lg'
                asChild
                className='bg-primary/10 hover:bg-primary/20 text-primary rounded-full text-base'
              >
                <Link href='#contact-us'>Browse collection</Link>
              </Button>
            </div>
          </div>

          <Carousel
            className='w-full lg:col-span-2'
            setApi={setMainApi}
            plugins={plugins}
            opts={{
              loop: true
            }}
          >
            <CarouselContent>
              {menudata.map(item => (
                <CarouselItem key={item.id} className='flex w-full items-center justify-center'>
                  <img src={item.img} alt={item.imgAlt} className='size-95 object-contain' />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div className='grid grid-cols-1 gap-24 gap-y-12 md:gap-y-16 lg:grid-cols-5'>
          <Carousel
            className='relative w-full max-lg:order-2 lg:col-span-3'
            setApi={setThumbApi}
            opts={{
              loop: true
            }}
          >
            <div className='from-background pointer-events-none absolute inset-y-0 left-0 z-1 w-25 bg-linear-to-r via-85% to-transparent' />
            <div className='from-background pointer-events-none absolute inset-y-0 right-0 z-1 w-25 bg-linear-to-l via-85% to-transparent' />
            <CarouselContent className='my-1 flex'>
              {menudata.map((item, index) => (
                <CarouselItem
                  key={item.id}
                  className={cn(
                    'basis-1/2 cursor-pointer items-center sm:basis-1/3 md:basis-1/4 lg:basis-1/3 xl:basis-1/4'
                  )}
                  onClick={() => handleThumbClick(index)}
                >
                  <div className='relative flex h-33 items-center justify-center'>
                    <div className={cn('absolute bottom-0 -z-1', current === index ? 'text-primary' : 'text-border')}>
                      <svg xmlns='http://www.w3.org/2000/svg' width='161' height='92' viewBox='0 0 161 92' fill='none'>
                        <path
                          d='M0.682517 80.6118L0.501193 39.6946C0.480127 34.9409 3.80852 30.8294 8.46241 29.8603L148.426 0.713985C154.636 -0.579105 160.465 4.16121 160.465 10.504V80.7397C160.465 86.2674 155.98 90.7465 150.453 90.7397L10.6701 90.5674C5.16936 90.5607 0.706893 86.1125 0.682517 80.6118Z'
                          stroke='currentColor'
                        />
                      </svg>
                    </div>
                    <img src={item.img} alt={item.imgAlt} className='size-25' />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <Carousel
            className='flex w-full items-center justify-center lg:col-span-2'
            setApi={setCommentsApi}
            opts={{
              loop: true
            }}
          >
            <CarouselContent>
              {menudata.map(item => (
                <CarouselItem
                  key={item.id}
                  className='flex h-full min-h-14 w-full items-center justify-center gap-4 px-6'
                >
                  {logoSvgs[item.logo]}
                  <Separator
                    orientation='vertical'
                    className='bg-primary hidden h-6! w-0.5! rounded-full! data-vertical:self-center sm:block'
                  />
                  <p className='text-card-foreground'>{item.userComment}</p>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
