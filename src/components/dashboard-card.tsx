import type { ReactNode } from 'react'

export type DashboardCardProps = {
  titleText: string
  titleIcon: ReactNode
  children: ReactNode
}

export const DashboardCard = ({
  titleIcon,
  titleText,
  children,
}: DashboardCardProps) => {
  return (
    <div className="w-full rounded-md">
      <div className="bg-secondary">
        <div className="flex items-center gap-1 text-3xl">
          {titleIcon} {titleText}
        </div>
      </div>
      <div className="p-8">{children}</div>
    </div>
  )
}
