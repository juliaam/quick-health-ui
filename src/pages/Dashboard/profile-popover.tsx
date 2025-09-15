import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../components/ui/popover'
import { Profile } from '@/shared/icons/Profile'
import { ProfileAlt } from '@/shared/icons/ProfileAlt'
import { DeleteUserModal } from './delete-user-modal'
import { useUserStore } from '@/stores/useUserStore'

export const ProfilePopover = () => {
  const userStore = useUserStore()
  return (
    <Popover>
      <PopoverTrigger>
        <Profile className="cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="bg-white">
        <div className="flex flex-col items-center">
          <div className="flex gap-3">
            <ProfileAlt width={54} height={54} />
            <div className="flex flex-col">
              <div className="text-md mt-2 flex gap-1 font-semibold">
                <span>{userStore.data.name}</span>
              </div>
              <span className="text-sm text-gray-800">
                juliademoraess@gmail.com
              </span>
            </div>
          </div>

          <hr className="mt-4 mb-2 w-full" />

          <div className="flex w-full justify-end">
            <DeleteUserModal />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
