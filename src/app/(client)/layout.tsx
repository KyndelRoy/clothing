'use client'

import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

import Header from '@/components/client/header'
import Footer from '@/components/client/footer'

import { navigationData } from '@/data/client/navigation'
import { clientStyleVariables } from '@/styles/client-styles'

const PagesLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className='client-font flex flex-col' style={clientStyleVariables}>
      <Header navigationData={navigationData} />

      <main className='flex flex-col pt-17.5 *:scroll-mt-16'>{children}</main>

      <Footer />
    </div>
  )
}

export default PagesLayout
