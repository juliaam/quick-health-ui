import { z } from 'zod'

export type ClinicalInformationFormValues = z.infer<
  typeof clinicalInformationForm.validationSchema
>

class ClinicalInformationForm {
  public defaultValues: ClinicalInformationFormValues = {
    name: '',
    last_name: '',
    gender_sex: 'female',
    emergency_contact: '',
    blood_type: '',
    alergy: '',
    medicines_used: '',
    illness: '',
    surgery: '',
  }

  public validationSchema = z.object({
    name: z.string(),
    last_name: z.string(),
    gender_sex: z.enum(['male', 'female']),
    emergency_contact: z.string(),
    blood_type: z.string(),
    alergy: z.string(),
    medicines_used: z.string(),
    illness: z.string(),
    surgery: z.string(),
  })
}

export const clinicalInformationForm = new ClinicalInformationForm()
