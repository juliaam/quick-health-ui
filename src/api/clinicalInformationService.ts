import type { GenderSexEnum } from '@/shared/enums/GenderSexEnum'
import api from './base'
import type { BloodTypeEnum } from '@/shared/enums/BloodTypeEnum'
import type { QRCode } from '@/stores/useUserStore'

export type ClinicalInformationResponseDto = {
  clinical_information_id: number
  clinical_information_user_id: number
  name: string
  last_name: string
  gender_sex: keyof typeof GenderSexEnum.enum
  emergency_contact: string
  blood_type: keyof typeof BloodTypeEnum.enum
  allergy?: string
  medicines_used?: string
  illness?: string
  surgery?: string
}

export type CreateClinicalInformationDto = {
  name: string
  last_name: string
  gender_sex: keyof typeof GenderSexEnum.enum
  emergency_contact: string
  blood_type: keyof typeof BloodTypeEnum.enum
  allergy?: string
  medicines_used?: string
  illness?: string
  surgery?: string
}

export type GenerateQRCodeDto = {
  base64: string
}

export type GenerateAcessKeyDto = {
  acessKey: string
}

export const ClinicalInformationService = {
  create: async (data: CreateClinicalInformationDto) => {
    const response = await api.post(`/clinical-information`, data)
    return response.data
  },
  update: async (id: number, data: CreateClinicalInformationDto) => {
    const response = await api.patch<ClinicalInformationResponseDto>(
      `/clinical-information/${id}`,
      data
    )
    return response.data
  },
  generateQrCode: async (clinical_information_id: number) => {
    const response = await api.post<QRCode>(
      '/qr-code',
      {},
      {
        params: {
          clinical_information_id,
        },
      }
    )
    return response.data
  },
  generateAcessKey: async (clinical_information_id: number) => {
    const response = await api.post<QRCode>(
      `/qr-code/acess-key/${clinical_information_id}`
    )
    return response.data
  },
  getById: async (clinical_information_id: number, acess_key: string) => {
    const response = await api.get<ClinicalInformationResponseDto>(
      `clinical-information/${clinical_information_id}/${acess_key}`
    )
    return response.data
  },
}
