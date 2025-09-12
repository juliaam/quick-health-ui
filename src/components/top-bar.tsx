import { ProfilePopover } from '../pages/Dashboard/profile-popover'

export const TopBar = () => {
    return (
        <div className="bg-secondary h-12 flex justify-end items-center px-6">
            <ProfilePopover />
        </div>
    )
}
