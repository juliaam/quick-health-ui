import { z } from 'zod'

export type ForgotPasswordValues = z.infer<
    typeof forgotPassword.validationSchema
>

class ForgotPassword {
    public defaultValues: ForgotPasswordValues = {
        email: '',
    }
    public validationSchema = z.object({
        email: z.string().nonempty('O campo é obrigatório'),
    })
}

export const forgotPassword = new ForgotPassword()
