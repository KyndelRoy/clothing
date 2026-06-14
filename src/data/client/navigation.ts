import type { NavigationSection } from '@/types/navigation'

export const navigationData: NavigationSection[] = [
  {
    title: 'Home',
    href: '#home'
  },
  {
    title: 'Shop',
    href: '/shop',
    kind: 'route'
  },
  {
    title: 'Contact Us',
    href: '#contact-us'
  },
  {
    title: 'Offers',
    href: '#offers'
  }
]
