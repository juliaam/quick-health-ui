import { AuthService } from '@/api/authService'
import {
  ClinicalInformationService,
  type ClinicalInformationResponseDto,
  type CreateClinicalInformationDto,
} from '@/api/clinicalInformation'
import { ProfileService } from '@/api/profileService'
import type { BloodTypeEnum } from '@/shared/enums/BloodTypeEnum'
import type { GenderSexEnum } from '@/shared/enums/GenderSexEnum'

import { create } from 'zustand'

export type ClinicalInformation = {
  clinical_information_id: number
  clinical_information_user_id: number
  last_name: string
  gender_sex: keyof typeof GenderSexEnum.enum
  emergency_contact: string
  blood_type: keyof typeof BloodTypeEnum.enum
  allergy?: string
  medicines_used?: string
  illness?: string
  surgery?: string
}

export type User = {
  user_id: number
  name: string
  email: string
  photo: string
  clinical_information: ClinicalInformation | null
}

export type LoginDto = {
  email: string
  password: string
}

export type UseUserStore = {
  data: User
  get: () => Promise<void>
  onDeleteAccount: () => Promise<void>
  login: (loginDto: LoginDto) => Promise<void>
  createClinicalInformation: (
    data: CreateClinicalInformationDto
  ) => Promise<void>
  updateClinicalInformation: (
    data: CreateClinicalInformationDto
  ) => Promise<void>
  deleteClinicalInformation: () => Promise<void>
}

export const useUserStore = create<UseUserStore>((set, get) => ({
  data: {
    user_id: 0,
    email: '',
    photo: '',
    name: '',
    clinical_information: null,
  },
  get: async () => {
    const user = await ProfileService.getById()
    set({
      data: user,
    })
  },
  onDeleteAccount: async () => {
    await ProfileService.deleteAccount()
  },
  login: async (loginDto: LoginDto) => {
    const response = await AuthService.login({
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
  createClinicalInformation: async (data: CreateClinicalInformationDto) => {
    await ClinicalInformationService.create(data)
  },
  updateClinicalInformation: async (data: CreateClinicalInformationDto) => {
    const state = get()
    if (!state.data.clinical_information?.clinical_information_id)
      throw new Error('Houve um erro!')
    const { name, ...clinical_information } =
      await ClinicalInformationService.update(
        state.data.clinical_information.clinical_information_id,
        data
      )
    set({
      data: {
        ...state.data,
        name,
        clinical_information,
      },
    })
  },
  deleteClinicalInformation: async () => {},
}))
