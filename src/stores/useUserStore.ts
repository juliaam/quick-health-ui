import { AuthService } from '@/api/authService'
import {
  ClinicalInformationService,
  type CreateClinicalInformationDto,
} from '@/api/clinicalInformationService'
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
  qr_code?: QRCode
}

export type User = {
  user_id: number
  name: string
  email: string
  photo: string
  clinical_information: ClinicalInformation | null
}

export type QRCode = {
  id_qr_code: number
  base64: string
  acess_key?: string
  clinical_information_id: number
}

export type LoginDto = {
  email: string
  password: string
}

export type UseUserStore = {
  loading: boolean
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
  generateQRCode: () => Promise<void>
  generateAcessKey: () => Promise<void>
}

export const useUserStore = create<UseUserStore>((set, get) => ({
  loading: false,
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
    const state = get()
    const response = await ClinicalInformationService.create(data)
    set({
      data: {
        ...state.data,
        clinical_information: response,
      },
    })
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
  deleteClinicalInformation: async () => {
    set({
      loading: true,
    })
    const state = get()

    if (!state.data.clinical_information?.clinical_information_id)
      throw new Error('Houve um erro! Informação clínica não encontrada')

    await ClinicalInformationService.delete(
      state.data.clinical_information?.clinical_information_id
    )
    set({
      data: {
        ...state.data,
        clinical_information: null,
      },
      loading: false,
    })
  },
  generateQRCode: async () => {
    set({
      loading: true,
    })
    const state = get()
    const user = state.data

    if (!user.clinical_information?.clinical_information_id)
      throw new Error('Houve um erro! Informações clínicas não encontradas')

    const response = await ClinicalInformationService.generateQrCode(
      user.clinical_information.clinical_information_id
    )
    set({
      data: {
        ...user,
        clinical_information: {
          ...user.clinical_information,
          qr_code: response,
        },
      },
      loading: false,
    })
  },

  generateAcessKey: async () => {
    const state = get()
    const user = state.data

    if (!user.clinical_information?.qr_code?.id_qr_code)
      throw new Error('Houve um erro! QR Code não encontrado')

    const response = await ClinicalInformationService.generateAcessKey(
      user.clinical_information.qr_code?.id_qr_code
    )
    set({
      data: {
        ...user,
        clinical_information: {
          ...user.clinical_information,
          qr_code: response,
        },
      },
    })
  },
}))
