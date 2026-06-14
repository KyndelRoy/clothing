import type { NavigationSection } from '@/components/shop/menu-navigation'

// Nav entries fall into two kinds:
//   - 'section': in-page anchor; clicking scrolls to the section on the
//     landing page. Existing entries (Testimonials, Contact Us, Offers)
//     keep this default behavior.
//   - 'route': real Next.js route; clicking navigates to a new page and
//     active state is derived from the current path.
export const navigationData: NavigationSection[] = [
  {
    title: 'Home',
    href: '/'
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
