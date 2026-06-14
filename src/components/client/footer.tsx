import { Separator } from '@/components/ui/separator'

const Footer = () => {
  return (
    <footer className='bg-transparent'>
      <Separator />

      <div className='mx-auto flex max-w-7xl justify-center px-4 py-8 sm:px-6'>
        <p className='text-muted-foreground text-center text-balance'>© 2026 Armak Clothing Co. All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer
