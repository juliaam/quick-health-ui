import { RHFormInput } from '@/components/forms/rh-form-input'
import { Button } from '@/components/ui/button'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import {
  deleteUserForm,
  type DeleteUserFormValues,
} from '@/shared/forms/delete-user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUserStore } from '@/stores/useUserStore'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Trash } from 'lucide-react'
import { useError } from '@/shared/errors/errorHandler'
import { Spinner } from '@/components/ui/spinner'
import { redirect } from '@tanstack/react-router'

export const DeleteUserModal = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="destructive" size="sm">
        Excluir conta <Trash />
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Você tem certeza?</DialogTitle>
        <DialogDescription className="mb-2">
          Essa ação não pode ser desfeita. Você vai excluir sua conta
          permanentemente.
        </DialogDescription>
        <DeleteUserForm />
      </DialogHeader>
    </DialogContent>
  </Dialog>
)

export const DeleteUserForm = () => {
  const userStore = useUserStore()
  const methods = useForm<DeleteUserFormValues>({
    defaultValues: deleteUserForm.defaultValues,
    resolver: zodResolver(deleteUserForm.validationSchema(userStore.data)),
  })

  return (
    <FormProvider {...methods}>
      <DeleteUserFormUI />
    </FormProvider>
  )
}

export const DeleteUserFormUI = () => {
  const userStore = useUserStore()
  const { errorHandler } = useError()
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<DeleteUserFormValues>()

  const onSubmit = async () => {
    try {
      await userStore.onDeleteAccount()
      redirect({ to: '/register' })
    } catch (error) {
      errorHandler(error)
    }
  }
  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <span className="text-sm">
        Para confirmar, digite "excluir-{userStore.data.name}" no campo abaixo
      </span>
      <RHFormInput name="confirm" />
      <Button disabled={isSubmitting} size="sm" variant="destructive">
        Confirmar
        {isSubmitting && <Spinner />}
      </Button>
    </form>
  )
}
