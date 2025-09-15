import type { User } from '@/stores/useUserStore'
import { z } from 'zod'

type DeleteUserSchema = ReturnType<typeof deleteUserForm.validationSchema>
export type DeleteUserFormValues = z.infer<DeleteUserSchema>
class DeleteUserForm {
  public defaultValues: DeleteUserFormValues = {
    confirm: '',
  }

  public validationSchema = (user: User) => {
    return z.object({
      confirm: z.string().refine((value) => {
        const name = value.slice(8, value.length - 1)

        if (!value.match('excluir-')) return false
        return name === user.name
      }, `O valor inserido não é válido. O nome de usuário precisa ser "excluir-${user.name}`),
    })
  }
}

export const deleteUserForm = new DeleteUserForm()
