import { RHFormInput } from '@/components/forms/rh-form-input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { type RegisterFormValues } from '@/forms/register'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { useNavigate } from '@tanstack/react-router'
import { loginForm, type LoginFormValues } from '@/forms/login'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { Spinner } from '@/components/ui/spinner'
import { useUserStore } from '@/stores/useUserStore'

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
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<RegisterFormValues>()
  const userStore = useUserStore()

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await userStore.login(data)
      navigate({ to: '/dashboard' })
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast(error.response?.data.message)
      }
      if (error instanceof Error) {
        toast(error.message)
      }
      console.error(error)
    }
  }
  const redirectToRegister = () => {
    navigate({ to: '/register' })
  }

  const redirectToForgotPassword = () => {
    navigate({ to: '/forgot-password' })
  }

  return (
    <form
      className="h-full w-auto rounded-l-md bg-white px-24 py-20 text-center"
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
      <div className="mt-16 flex flex-col gap-y-5">
        <RHFormInput name="email" label="Email" />
        <RHFormInput name="password" label="Senha" type="password" />
        <span
          className="-my-3 cursor-pointer self-end text-sm text-gray-600"
          onClick={redirectToForgotPassword}
        >
          Esqueceu a senha?
        </span>
        <Button type="submit" className="mt-8">
          Login {isSubmitting && <Spinner />}
        </Button>
      </div>
    </form>
  )
}
