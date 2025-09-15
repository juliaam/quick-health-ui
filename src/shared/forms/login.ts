import { z } from 'zod'

export type LoginFormValues = z.infer<typeof loginForm.validationSchema>

class LoginForm {
  public defaultValues: LoginFormValues = {
    email: '',
    password: '',
  }
  public validationSchema = z.object({
    email: z.string().nonempty('O campo é obrigatório'),
    password: z.string().nonempty('O campo é obrigatório'),
  })
}

export const loginForm = new LoginForm()
