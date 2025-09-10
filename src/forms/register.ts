import { z } from 'zod'

export type RegisterFormValues = z.infer<typeof registerForm.validationSchema>

class RegisterForm {
    public defaultValues: RegisterFormValues = {
        name: '',
        email: '',
        password: '',
        confirm: '',
    }
    public validationSchema = z
        .object({
            name: z
                .string()
                .nonempty('O campo é obrigatório')
                .min(2, 'Mínimo de 2 caracteres')
                .max(12, 'Máximo de 12 caracteres.'),
            email: z
                .string()
                .nonempty('O campo é obrigatório')
                .email('É necessário que seja um email'),
            password: z.string().nonempty('O campo é obrigatório'),
            confirm: z.string().nonempty('O campo é obrigatório'),
        })
        .refine((data) => data.password === data.confirm, {
            message: "Passwords don't match",
            path: ['confirm'],
        })
}

export const registerForm = new RegisterForm()
