import type { ReactNode } from 'react'

import type { Metadata } from 'next'

import { TooltipProvider } from '@/components/ui/tooltip'

import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Armak Clothing Co.',
    default: 'Armak Clothing Co. - Premium T-Shirt Collection'
  },
  description:
    'Premium t-shirts crafted with quality fabrics and bold designs. Explore our collection of apparel built for comfort, style, and everyday wear.',
  robots: 'index,follow',
  keywords: ['T-Shirts', 'Clothing', 'Apparel', 'Fashion'],
  icons: {
    icon: [
      {
        url: '/favicon/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png'
      },
      {
        url: '/favicon/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png'
      },
      {
        url: '/favicon/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon'
      }
    ],
    apple: [
      {
        url: '/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ],
    other: [
      {
        url: '/favicon/android-chrome-192x192.png',
        rel: 'icon',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        url: '/favicon/android-chrome-512x512.png',
        rel: 'icon',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  },
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}`),
  openGraph: {
    title: {
      template: '%s - Armak Clothing Co.',
      default: 'Armak Clothing Co. - Premium T-Shirt Collection'
    },
    description:
      'Premium t-shirts crafted with quality fabrics and bold designs. Explore our collection of apparel built for comfort, style, and everyday wear.',
    type: 'website',
    siteName: 'Armak Clothing Co.',
    url: `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}`,
    images: [
      {
        url: '/images/og-image.png',
        type: 'image/png',
        width: 1200,
        height: 630,
        alt: 'Armak Clothing Co.'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      template: '%s - Armak Clothing Co.',
      default: 'Armak Clothing Co. - Premium T-Shirt Collection'
    },
    description:
      'Premium t-shirts crafted with quality fabrics and bold designs. Explore our collection of apparel built for comfort, style, and everyday wear.'
  }
}

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html lang='en' data-scroll-behavior='smooth' className='flex min-h-full w-full scroll-smooth antialiased'>
      <body className='flex min-h-full w-full flex-auto flex-col bg-stone-100'>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  )
}

export default RootLayout
