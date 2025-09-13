import { login } from '@/api/authService'
import { deleteAccount } from '@/api/profileService'
import { create } from 'zustand'

export type User = {
  id: number
  name: string
  email: string
  photo: string
}

export type LoginDto = {
  email: string
  password: string
}

export type UseUserStore = {
  data: User
  onDeleteAccount: () => Promise<void>
  login: (loginDto: LoginDto) => Promise<void>
}

export const useUserStore = create<UseUserStore>((set, get) => ({
  data: {
    id: 0,
    email: '',
    photo: '',
    name: '',
  },
  onDeleteAccount: async () => {
    const state = get()
    await deleteAccount(state.data.id)
  },
  login: async (loginDto: LoginDto) => {
    const response = await login({
      email: loginDto.email,
      password: loginDto.password,
    })

    if (!response.access_token)
      throw new Error('Houve um erro! Tente novamente mais tarde')

    localStorage.setItem('auth-token', response.access_token)
    set({
      data: response.payload,
    })
  },
}))
