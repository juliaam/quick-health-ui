import { ProfilePopover } from '../pages/Dashboard/profile-popover'

export const TopBar = () => {
  return (
    <div className="bg-secondary flex h-12 items-center justify-end px-6">
      <ProfilePopover />
    </div>
  )
}
