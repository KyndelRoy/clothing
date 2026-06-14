import HeroSectionPage from '@/components/shop/hero-section'
import PopularBrands from '@/components/shop/popular-brands'
import Testimonials from '@/components/shop/testimonials'
import NewItems from '@/components/shop/new-items'
import ContactUs from '@/components/shop/contact-us'
import Offers from '@/components/shop/offers'

import { menudata } from '@/assets/data/hero'
import { popularDishes } from '@/assets/data/popular-dishes'
import { testimonials } from '@/assets/data/testimonials'
import { newItems } from '@/assets/data/new-items'
import { contactInfo } from '@/assets/data/contact-us'
import { GalleryImage } from '@/assets/data/offers'

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
      <HeroSectionPage menudata={menudata} />
      <PopularBrands popularDishes={popularDishes} />
      <Testimonials testimonials={testimonials} />
      <NewItems newItems={newItems} />
      <ContactUs contactInfo={contactInfo} />
      <Offers galleryImage={GalleryImage} />
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
