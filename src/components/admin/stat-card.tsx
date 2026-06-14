import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import type { DashboardStat } from '@/assets/data/admin/dashboard'

import { cn } from '@/lib/utils'

// StatCard is a dashboard tile showing a single KPI. Trend icon is
// picked from the trend prop; the colors stay muted on purpose so a
// future swap to live data doesn't need restyling.
const trendIcon = {
  up: ArrowUpIcon,
  down: ArrowDownIcon,
  neutral: MinusIcon
} as const

const trendClass = {
  up: 'text-foreground',
  down: 'text-muted-foreground',
  neutral: 'text-muted-foreground'
} as const

type StatCardProps = {
  stat: DashboardStat
  className?: string
}

const StatCard = ({ stat, className }: StatCardProps) => {
  const Icon = trendIcon[stat.trend]

  return (
    <Card size='sm' className={className}>
      <CardHeader>
        <CardTitle className='text-muted-foreground'>{stat.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex items-baseline justify-between gap-2'>
          <span className='text-foreground text-2xl font-semibold tracking-tight'>{stat.value}</span>
          <span className={cn('flex items-center gap-1 text-xs', trendClass[stat.trend])}>
            <Icon className='size-3' />
            {stat.change}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export default StatCard
