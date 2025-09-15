import { z } from 'zod'

export type ClinicalInformationFormValues = z.infer<
  typeof clinicalInformationForm.validationSchema
>

class ClinicalInformationForm {
  public defaultValues: ClinicalInformationFormValues = {
    name: '',
    last_name: '',
    gender_sex: undefined,
    emergency_contact: '',
    blood_type: undefined,
    allergy: '',
    medicines_used: '',
    illness: '',
    surgery: '',
  }

  public validationSchema = z.object({
    name: z.string().nonempty('Esse campo é obrigatório'),
    last_name: z.string().nonempty('Esse campo é obrigatório'),
    gender_sex: z.enum(['male', 'female']),
    emergency_contact: z
      .string()
      .nonempty('Esse campo é obrigatório')
      .max(11, 'O número não pode passar de 11 dígitos'),
    blood_type: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    allergy: z.string().optional(),
    medicines_used: z.string().optional(),
    illness: z.string().optional(),
    surgery: z.string().optional(),
  })
}

export const clinicalInformationForm = new ClinicalInformationForm()
