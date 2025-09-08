import { z } from 'zod'

export type LoginFormValues = z.infer<typeof loginForm.validationSchema>

class LoginForm {
    public defaultValues: LoginFormValues = {
        email: '',
        password: '',
    }
    public validationSchema = z.object({
        email: z.string().nonempty('O campo nome é obrigatório'),
        password: z.string().nonempty('O campo nome é obrigatório'),
    })
}

export const loginForm = new LoginForm()
