import HeroSection from '@/components/shop/hero-section'
import PopularBrands from '@/components/shop/popular-brands'
import Testimonials from '@/components/shop/testimonials'
import ContactUs from '@/components/shop/contact-us'

import { heroSlides } from '@/data/hero'
import { brands } from '@/data/brands'
import { testimonials } from '@/data/testimonials'
import { contactInfo } from '@/data/contact'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${process.env.NEXT_PUBLIC_APP_URL}#website`,
      name: 'Armak Clothing Co.',
      description:
        'Premium t-shirts crafted with quality fabrics and bold designs. Explore our collection of apparel built for comfort, style, and everyday wear.',
      url: `${process.env.NEXT_PUBLIC_APP_URL}`,
      inLanguage: 'en-US'
    }
  ]
}

const Home = () => {
  return (
    <>
      <HeroSection slides={heroSlides} />
      <PopularBrands brands={brands} />
      <Testimonials testimonials={testimonials} />
      <ContactUs contactInfo={contactInfo} />

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />
    </>
  )
}

export default Home
