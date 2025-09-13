import { z } from 'zod'

export type ClinicalInformationFormValues = z.infer<
  typeof clinicalInformationForm.validationSchema
>

class ClinicalInformationForm {
  public defaultValues: ClinicalInformationFormValues = {
    name: '',
    last_name: '',
    gender_sex: '',
    emergency_contact: '',
    blood_type: '',
    alergy: '',
    medicines_used: '',
    illness: '',
    surgery: '',
  }

  public validationSchema = z.object({})
}

export const clinicalInformationForm = new ClinicalInformationForm()
