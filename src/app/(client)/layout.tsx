'use client'

import type { ReactNode } from 'react'

import { useEffect, useLayoutEffect } from 'react'

import { Geist_Mono, Merriweather, Outfit, Kaushan_Script } from 'next/font/google'
import { usePathname } from 'next/navigation'

import Header from '@/components/client/header'
import Footer from '@/components/client/footer'

import { navigationData } from '@/data/client/navigation'
import { clientStyleVariables } from '@/styles/client-styles'

import { cn } from '@/lib/utils'

import './client.css'

const outfitSans = Outfit({
  variable: '--font-outfit-sans',
  subsets: ['latin']
})

const merriweatherSerif = Merriweather({
  variable: '--font-merriweather-serif',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

const kaushanScript = Kaushan_Script({
  weight: '400',
  variable: '--font-kaushan-script',
  subsets: ['latin']
})

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const PagesLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  const pathname = usePathname()

  useIsomorphicLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div
      className={cn(
        outfitSans.variable,
        merriweatherSerif.variable,
        geistMono.variable,
        kaushanScript.variable,
        'client-font flex flex-col'
      )}
      style={clientStyleVariables}
    >
      <Header navigationData={navigationData} />

      <main className='flex flex-col pt-17.5 *:scroll-mt-16'>{children}</main>

      <Footer />
    </div>
  )
}

export default PagesLayout
