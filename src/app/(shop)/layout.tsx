import type { ReactNode } from 'react'

import Header from '@/components/shop/header'
import Footer from '@/components/shop/footer'

import { navigationData } from '@/data/navigation'

const PagesLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div className='flex flex-col'>
      <Header navigationData={navigationData} />

      <main className='flex flex-col pt-17.5 *:scroll-mt-16'>{children}</main>

      <Footer />
    </div>
  )
}

export default PagesLayout
