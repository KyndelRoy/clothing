import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { cn } from '@/lib/utils'

import type { DashboardStat, StatTrend } from '@/types/admin'

const trendIcon: Record<StatTrend, typeof ArrowUpIcon> = {
  up: ArrowUpIcon,
  down: ArrowDownIcon,
  neutral: MinusIcon
}

const trendClass: Record<StatTrend, string> = {
  up: 'text-foreground',
  down: 'text-muted-foreground',
  neutral: 'text-muted-foreground'
}

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
