import { RHFormInput } from '@/components/forms/rh-form-input'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { FormProvider, useForm } from 'react-hook-form'
import { deleteUserForm, type DeleteUserFormValues } from '@/forms/delete-user'
import { zodResolver } from '@hookform/resolvers/zod'

export const DeleteUserForm = () => {
    const methods = useForm<DeleteUserFormValues>({
        defaultValues: deleteUserForm.defaultValues,
        resolver: zodResolver(deleteUserForm.validationSchema),
    })

    return (
        <FormProvider {...methods}>
            <DeleteUserFormUI />
        </FormProvider>
    )
}

export const DeleteUserFormUI = () => {
    return (
        <form className="flex flex-col gap-2">
            <span>
                Essa ação não pode ser desfeita. Você vai excluir sua conta
                permanentemente.
            </span>
            <span>Para confirmar, digite “[nome]-cadatro” no campo abaixo</span>
            <RHFormInput name="confirm" />
            <Button variant="destructive">Confirmar</Button>
        </form>
    )
}

export const DeleteUserModal = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    size="sm"
                    variant="destructive"
                    className="mt-auto"
                    type="submit"
                >
                    Excluir conta
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Tem certeza que deseja excluir essa conta?
                    </DialogTitle>
                    <DialogDescription>
                        <DeleteUserForm />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
