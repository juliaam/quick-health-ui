import { create } from 'zustand'
import type { QRCode } from './useUserStore'
import { ClinicalInformationService } from '@/api/clinicalInformationService'
import type { BloodTypeEnum } from '@/shared/enums/BloodTypeEnum'
import type { GenderSexEnum } from '@/shared/enums/GenderSexEnum'

export type ClinicalInformationView = {
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
  qr_code?: QRCode
}

export type UseClinicalInformationStore = {
  data: ClinicalInformationView | null
  get: (
    clinical_information_id: number | undefined,
    acess_key: string
  ) => Promise<void>
}

export const useClinicalInformationStore = create<UseClinicalInformationStore>(
  (set) => ({
    data: null,
    get: async (
      clinical_information_id: number | undefined,
      acess_key: string
    ) => {
      if (
        clinical_information_id === null ||
        clinical_information_id === undefined
      )
        throw new Error('Houve um erro!')

      const response = await ClinicalInformationService.getById(
        +clinical_information_id,
        acess_key
      )
      set({
        data: response,
      })
    },
  })
)
