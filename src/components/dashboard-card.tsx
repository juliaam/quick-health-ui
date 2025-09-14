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
    <div className="w-full overflow-hidden rounded-md bg-white">
      <div className="bg-secondary px-40 py-8">
        <div className="flex items-center justify-center gap-1 text-3xl">
          {titleIcon} {titleText}
        </div>
      </div>
      <div className="p-8">{children}</div>
    </div>
  )
}
