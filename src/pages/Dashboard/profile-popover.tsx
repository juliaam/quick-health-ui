import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '../../components/ui/popover'
import { Profile } from '@/icons/Profile'
import { ProfileAlt } from '@/icons/ProfileAlt'
import { Button } from '../../components/ui/button'
import { Image } from 'lucide-react'
import { useUserStore } from '@/stores/useStore'
import { toast } from 'sonner'
import { DeleteUserModal } from './delete-user-modal'

export const ProfilePopover = () => {
    const userStore = useUserStore()

    const onClickDelete = async () => {
        try {
            await userStore.onDeleteAccount()
        } catch (error) {
            console.error(error)
            toast.error('Houve um erro!')
        }
    }

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
                            <div className="flex gap-1 text-md font-semibold mt-2 ">
                                <span>Júlia</span>
                                <span>Moraes</span>
                            </div>
                            <span className="text-sm text-gray-800">
                                juliademoraess@gmail.com
                            </span>
                        </div>
                    </div>

                    <hr className="w-full mt-4 mb-2" />

                    <div className="flex justify-around w-full">
                        <Button size="sm">
                            <Image />
                            Alterar foto
                        </Button>

                        <DeleteUserModal onClickDelete={onClickDelete} />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
