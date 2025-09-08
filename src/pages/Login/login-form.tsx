import { RHFormInput } from '@/components/forms/rh-form-input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { type RegisterFormValues } from '@/forms/register'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { useNavigate } from '@tanstack/react-router'
import { loginForm, type LoginFormValues } from '@/forms/login'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { login } from '@/api/authService'

export const LoginForm = () => {
    const methods = useForm<LoginFormValues>({
        defaultValues: loginForm.defaultValues,
        resolver: zodResolver(loginForm.validationSchema),
    })

    return (
        <FormProvider {...methods}>
            <LoginFormUI />
        </FormProvider>
    )
}

export const LoginFormUI = () => {
    const navigate = useNavigate()
    const { handleSubmit } = useFormContext<RegisterFormValues>()

    const onSubmit = async (data: RegisterFormValues) => {
        try {
            const response = await login({
                email: data.email,
                password: data.password,
            })

            if (!response.access_token) throw new Error()

            localStorage.setItem('auth-token', response.access_token)
            navigate({ to: '/dashboard' })
        } catch (error: unknown) {
            console.log(error, 'error')
            if (error instanceof AxiosError) {
                if (error.response?.data.message) {
                    toast(error.response.data.message)
                }
            } else {
                toast('Houve um erro!')
            }
        }
    }
    const redirectToRegister = () => {
        navigate({ to: '/register' })
    }

    return (
        <form
            className="h-full bg-white rounded-l-md w-auto py-20 px-24 text-center"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex flex-col gap-y-2">
                <span className="text-4xl">Login</span>
                <div className="flex gap-x-1">
                    <span className="text-gray-600">Não possui uma conta?</span>
                    <span
                        className="text-primary cursor-pointer"
                        onClick={redirectToRegister}
                    >
                        Registro
                    </span>
                </div>
            </div>
            <div className="flex flex-col gap-y-5 mt-16">
                <RHFormInput name="email" label="Email" />
                <RHFormInput name="password" label="Senha" type="password" />
                <Button type="submit" className="mt-8">
                    Login
                </Button>
            </div>
        </form>
    )
}
