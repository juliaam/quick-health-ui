import { z } from 'zod'

export type AcessKeyFormValues = z.infer<typeof acessKeyForm.validationSchema>

class AcessKeyForm {
  public defaultValues: AcessKeyFormValues = {
    acess_key: '',
  }

  public validationSchema = z.object({
    acess_key: z.string(),
  })
}

export const acessKeyForm = new AcessKeyForm()
