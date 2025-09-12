import { z } from 'zod'

export type DeleteUserFormValues = z.infer<
    typeof deleteUserForm.validationSchema
>

class DeleteUserForm {
    public defaultValues: DeleteUserFormValues = {
        confirm: '',
    }
    public validationSchema = z.object({
        confirm: z.string(),
    })
}

export const deleteUserForm = new DeleteUserForm()
