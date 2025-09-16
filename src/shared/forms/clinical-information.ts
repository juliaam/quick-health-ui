/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod'

export type ClinicalInformationFormValues = z.infer<
  typeof clinicalInformationForm.validationSchema
>

class ClinicalInformationForm {
  public defaultValues: ClinicalInformationFormValues = {
    name: '',
    last_name: '',
    gender_sex: undefined as any,
    emergency_contact: '',
    blood_type: undefined as any,
    allergy: '',
    medicines_used: '',
    illness: '',
    surgery: '',
  }

  public validationSchema = z.object({
    name: z.string().nonempty('Esse campo é obrigatório'),
    last_name: z.string().nonempty('Esse campo é obrigatório'),
    gender_sex: z.enum(['male', 'female'], {
      required_error: 'Gênero é obrigatório',
    }),
    emergency_contact: z
      .string()
      .nonempty('Esse campo é obrigatório')
      .max(11, 'O número não pode passar de 11 dígitos'),
    blood_type: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
      required_error: 'Tipo sanguíneo é obrigatório',
    }),
    allergy: z.string().optional(),
    medicines_used: z.string().optional(),
    illness: z.string().optional(),
    surgery: z.string().optional(),
  })
}

export const clinicalInformationForm = new ClinicalInformationForm()
