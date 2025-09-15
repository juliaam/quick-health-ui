import { z } from 'zod'

export type ResetPasswordFormValues = z.infer<
  typeof resetPasswordForm.validationSchema
>

class ResetPasswordForm {
  public defaultValues: ResetPasswordFormValues = {
    newPassword: '',
    confirm: '',
  }
  public validationSchema = z.object({
    newPassword: z.string().nonempty('O campo é obrigatório'),
    confirm: z.string().nonempty('O campo é obrigatório'),
  })
}

export const resetPasswordForm = new ResetPasswordForm()
