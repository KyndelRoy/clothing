import Link from 'next/link'

import { Separator } from '@/components/ui/separator'

import ArmakLogo from '@/assets/svg/armak-logo'
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from '@/assets/svg/social-icons'

import { footerLinks } from '@/data/client/footer'

const socialLinks = [
  { href: '#', icon: FacebookIcon, label: 'Facebook' },
  { href: '#', icon: InstagramIcon, label: 'Instagram' },
  { href: '#', icon: TwitterIcon, label: 'Twitter' },
  { href: '#', icon: YoutubeIcon, label: 'YouTube' }
]

const Footer = () => {
  return (
    <footer className='bg-transparent' style={{ clipPath: 'polygon(0 16px, 100% 0, 100% 100%, 0 100%)' }}>
      <div className='mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 max-md:flex-col sm:px-6 sm:py-6 md:gap-6 md:py-8'>
        <Link href='/#home'>
          <div className='flex items-center gap-3'>
            <ArmakLogo className='gap-3' />
            <span className='text-primary text-[20px] font-semibold'>Armak Clothing Co.</span>
          </div>
        </Link>

        <div className='flex items-center gap-5 whitespace-nowrap'>
          {footerLinks.map(item => (
            <Link
              key={item.title}
              href={item.href}
              className='text-foreground hover:text-primary text-base! hover:bg-transparent'
            >
              {item.title}
            </Link>
          ))}
        </div>

        <div className='flex items-center gap-4'>
          {socialLinks.map(social => (
            <Link key={social.label} href={social.href} className='hover:text-primary' aria-label={social.label}>
              <social.icon className='size-5' />
            </Link>
          ))}
        </div>
      </div>

      <Separator />

      <div className='mx-auto flex max-w-7xl justify-center px-4 py-8 sm:px-6'>
        <p className='text-muted-foreground text-center text-balance'>© 2026 Armak Clothing Co. All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer
