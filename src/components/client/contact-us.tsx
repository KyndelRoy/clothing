import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

import type { ContactInfoItem } from '@/types/contact'

type ContactUsProps = {
  contactInfo: ContactInfoItem[]
}

const ContactUs = ({ contactInfo }: ContactUsProps) => {
  return (
    <section id='contact-us' className='relative py-4 sm:py-8 lg:py-12'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mx-auto mb-12 flex max-w-2xl flex-col items-center justify-center space-y-4 text-center sm:mb-16 lg:mb-24'>
          <Badge variant='outline' className='client-meta h-auto'>
            Contact Us
          </Badge>
          <h2 className='client-section-title'>Get in touch with us </h2>
          <p className='client-muted client-section-description'>
            We&apos;d love to help you find your perfect fit. Reach out with any questions about our collections,
            sizing, or orders.
          </p>
        </div>

        <div className='grid items-center gap-12 lg:grid-cols-2'>
          <img
            src='/images/contact-us-01.webp'
            alt='Contact illustration'
            className='size-full object-cover max-lg:max-h-70'
          />

          <div>
            <h3 className='client-card-title mb-2'>We&apos;re here to help</h3>
            <p className='client-muted client-body-lg mb-10'>
              We would love to hear from you. Whether you have a question about sizing, need help with an order, or want
              to learn more about our collections, we&apos;re here to assist.
            </p>

            {/* Contact Info Grid */}
            <div className='grid gap-6 sm:grid-cols-2'>
              {contactInfo.map(info => (
                <Card
                  key={info.title}
                  className='bg-background hover:border-primary rounded-none border shadow-none ring-0 transition-colors duration-300'
                >
                  <CardContent className='flex flex-col items-center gap-4 text-center'>
                    <Avatar className='size-9'>
                      <AvatarFallback className='bg-transparent [&>svg]:size-5'>
                        <info.icon />
                      </AvatarFallback>
                    </Avatar>
                    <div className='space-y-3'>
                      <h4 className='client-card-title'>{info.title}</h4>
                      <div className='client-muted client-body-sm'>
                        {info.description.split('\n').map((line, idx) => (
                          <p key={idx}>{line}</p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
