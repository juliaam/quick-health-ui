import { RHFormInput } from '@/components/forms/rh-form-input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import {
  resetPasswordForm,
  type ResetPasswordFormValues,
} from '@/forms/reset-password'
import { resetPassword } from '@/api/authService'
import { Spinner } from '@/components/ui/spinner'

export const ResetPasswordForm = () => {
  const methods = useForm<ResetPasswordFormValues>({
    defaultValues: resetPasswordForm.defaultValues,
    resolver: zodResolver(resetPasswordForm.validationSchema),
  })

  return (
    <FormProvider {...methods}>
      <ResetPasswordFormUI />
    </FormProvider>
  )
}

export const ResetPasswordFormUI = () => {
  const navigate = useNavigate()
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<ResetPasswordFormValues>()
  const search: { token?: string } = useSearch({ from: '/reset-password' })

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (!search.token) return

    try {
      await resetPassword({
        newPassword: data.newPassword,
        token: search.token,
      })

      toast.success('Senha alterada com sucesso!')
      navigate({ to: '/login' })
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
      <div className="flex flex-col gap-y-2">
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
        <RHFormInput name="newPassword" label="Nova senha" type="password" />
        <RHFormInput name="confirm" label="Repita a senha" type="password" />
        <Button type="submit" className="mt-8">
          Alterar a senha {isSubmitting && <Spinner />}
        </Button>
      </div>
    </form>
  )
}
