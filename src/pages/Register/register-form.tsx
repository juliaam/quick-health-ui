import { RHFormInput } from '@/components/forms/rh-form-input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { registerForm, type RegisterFormValues } from '@/shared/forms/register'
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from 'react-hook-form'
import { useNavigate } from '@tanstack/react-router'
import { Spinner } from '@/components/ui/spinner'
import { useError } from '@/shared/errors/errorHandler'
import { AuthService } from '@/api/authService'

export const RegisterForm = () => {
  const methods = useForm<RegisterFormValues>({
    defaultValues: registerForm.defaultValues,
    resolver: zodResolver(registerForm.validationSchema),
  })

  return (
    <FormProvider {...methods}>
      <RegisterFormUI />
    </FormProvider>
  )
}

export const RegisterFormUI = () => {
  const navigate = useNavigate()
  const { errorHandler } = useError()
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<RegisterFormValues>()
  const password = useWatch({ name: 'password' })

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const response = await AuthService.register({
        email: data.email,
        name: data.name,
        password: data.password,
      })

      if (!response.access_token) throw new Error()

      localStorage.setItem('auth-token', response.access_token)
      navigate({ to: '/dashboard' })
    } catch (error) {
      errorHandler(error)
    }
  }

  const redirectToLogin = () => {
    navigate({ to: '/login' })
  }

  return (
    <form
      className="h-full w-auto rounded-l-md bg-white px-24 py-20 text-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-y-2">
        <span className="text-4xl">Registro</span>
        <div className="flex gap-x-1">
          <span className="text-gray-600">Já possui uma conta?</span>
          <span
            className="text-primary cursor-pointer"
            onClick={redirectToLogin}
          >
            Login
          </span>
        </div>
      </div>
      <div className="mt-16 flex flex-col gap-y-5">
        <RHFormInput name="name" label="Nome" />
        <RHFormInput name="email" label="Email" />
        <RHFormInput name="password" label="Senha" type="password" />
        {password && (
          <RHFormInput name="confirm" label="Repita a senha" type="password" />
        )}
        <Button type="submit" className="mt-8">
          Registrar
          {isSubmitting && <Spinner />}
        </Button>
      </div>
    </form>
  )
}
