import { z } from 'zod'

export type RegisterFormValues = z.infer<typeof registerForm.validationSchema>

class RegisterForm {
    public defaultValues: RegisterFormValues = {
        name: '',
        email: '',
        password: '',
        password_repeated: '',
    }
    public validationSchema = z.object({
        name: z
            .string()
            .nonempty('O campo nome é obrigatório')
            .min(2, 'Mínimo de 2 caracteres')
            .max(12, 'Máximo de 12 caracteres.'),
        email: z
            .string()
            .nonempty('O campo nome é obrigatório')
            .email('É necessário que seja um email'),
        password: z.string().nonempty('O campo nome é obrigatório'),
        password_repeated: z.string().nonempty('O campo nome é obrigatório'),
    })
}

export const registerForm = new RegisterForm()
