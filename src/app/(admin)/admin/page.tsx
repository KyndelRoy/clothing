import type { Metadata } from 'next'

import StatCard from '@/components/admin/stat-card'

import { dashboardStats } from '@/data/admin/dashboard'

export const metadata: Metadata = {
  title: 'Dashboard'
}

const AdminDashboardPage = () => {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-1'>
        <h1 className='text-2xl font-semibold tracking-tight'>Dashboard</h1>
        <p className='text-muted-foreground text-sm'>
          Overview of your store. Live data wires up once the api/ layer is ready.
        </p>
      </div>

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {dashboardStats.map(stat => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>

      <div className='bg-card text-card-foreground ring-foreground/5 flex flex-col gap-2 rounded-4xl p-6 ring-1'>
        <h2 className='text-base font-medium'>Welcome to Armak Admin</h2>
        <p className='text-muted-foreground text-sm'>
          This is the initial MVP. Everything is static for now — products, orders, and settings will be wired up to
          your data layer when the api/ and supabase/ folders are implemented.
        </p>
      </div>
    </div>
  )
}

export default AdminDashboardPage
