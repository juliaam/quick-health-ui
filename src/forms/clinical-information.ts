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
    blood_type: 'A+',
    alergy: '',
    medicines_used: '',
    illness: '',
    surgery: '',
  }

  public validationSchema = z.object({
    name: z.string().nonempty('Esse campo é obrigatório'),
    last_name: z.string().nonempty('Esse campo é obrigatório'),
    gender_sex: z.enum(['male', 'female']),
    emergency_contact: z.string().nonempty('Esse campo é obrigatório').max(11),
    blood_type: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    alergy: z.string(),
    medicines_used: z.string(),
    illness: z.string(),
    surgery: z.string(),
  })
}

export const clinicalInformationForm = new ClinicalInformationForm()
