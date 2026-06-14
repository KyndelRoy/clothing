import type { ReactNode } from 'react'

import Header from '@/components/client/header'
import Footer from '@/components/client/footer'

import { navigationData } from '@/data/client/navigation'

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
