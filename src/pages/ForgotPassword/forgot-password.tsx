import { RHFormInput } from '@/components/forms/rh-form-input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { useNavigate } from '@tanstack/react-router'
import { forgotPassword as forgotPasswordRequest } from '@/api/authService'

import {
  forgotPassword,
  type ForgotPasswordValues,
} from '@/forms/forgot-password'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { Spinner } from '@/components/ui/spinner'

export const ForgotPasswordForm = () => {
  const methods = useForm<ForgotPasswordValues>({
    defaultValues: forgotPassword.defaultValues,
    resolver: zodResolver(forgotPassword.validationSchema),
  })

  return (
    <FormProvider {...methods}>
      <ForgotPasswordFormUI />
    </FormProvider>
  )
}

export const ForgotPasswordFormUI = () => {
  const navigate = useNavigate()
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<ForgotPasswordValues>()

  const onSubmit = async (data: ForgotPasswordValues) => {
    try {
      await forgotPasswordRequest({
        email: data.email,
      })
      toast('Veja sua caixa de entrada')
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.data.message) {
          toast(error.response.data.message)
        }
      } else {
        console.error(error)
        toast('Houve um erro!')
      }
    }
  }

  const redirectToRegister = () => {
    navigate({ to: '/register' })
  }

  return (
    <form
      className="h-full w-auto rounded-l-md bg-white px-24 py-20 text-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col items-center gap-y-2">
        <span className="text-4xl">Esqueci a senha</span>
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
        <Button type="submit" className="mt-8">
          Enviar email
          {isSubmitting && <Spinner />}
        </Button>
      </div>
    </form>
  )
}
