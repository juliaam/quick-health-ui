import api from './base'

export type UpdateClinicalInformationDto = {
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

export const update = async (data: UpdateClinicalInformationDto) => {
  const response = await api.patch('/critical-information/update', data)
  return response.data
}
