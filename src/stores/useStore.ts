import { deleteAccount } from '@/api/profileService'
import { create } from 'zustand'

export type UseUserStore = {
    data: {
        id: number
        name: string
        email: string
        image: string
    }
    onDeleteAccount: () => Promise<void>
}

export const useUserStore = create<UseUserStore>((_set, get) => ({
    data: {
        id: 0,
        email: '',
        image: '',
        name: '',
    },
    onDeleteAccount: async () => {
        const state = get()
        await deleteAccount(state.data.id)
    },
}))
