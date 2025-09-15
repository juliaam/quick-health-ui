import { cn } from '@/shared/lib/utils'
import type { ReactNode } from 'react'

export type DashboardCardProps = {
  titleText: string
  titleIcon: ReactNode
  children: ReactNode
  className?: string
}

export const DashboardCard = ({
  titleIcon,
  titleText,
  children,
  className,
}: DashboardCardProps) => {
  return (
    <div
      className={cn('w-full overflow-hidden rounded-md bg-white', className)}
    >
      <div className="bg-secondary px-40 py-8">
        <div className="flex items-center justify-center gap-1 text-3xl">
          {titleIcon} {titleText}
        </div>
      </div>
      <div className="p-8">{children}</div>
    </div>
  )
}
