import { create } from 'zustand'

export type UserStore = {
  data: {
    name: string
    last_name: string
    gender_sex: string
    emergency_contact: string
    blood_type: string
    alergy: string
    medicines_used: string
    illness: string
    surgery: string
  }
  update: () => Promise<void>
}

export const useUserStore = create<UserStore>((set, get) => ({
  data: {
    name: '',
    last_name: '',
    gender_sex: '',
    emergency_contact: '',
    blood_type: '',
    alergy: '',
    medicines_used: '',
    illness: '',
    surgery: '',
  },
  update: async () => {},
}))
