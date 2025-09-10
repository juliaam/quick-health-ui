import { ResetPasswordForm } from './reset-password-form'

export function ResetPassword() {
    return (
        <div className="flex-1 bg-[url('public/background.png')] bg-no-repeat bg-center bg-cover size-full bg-black">
            <div className="size-full flex justify-end">
                <ResetPasswordForm />
            </div>
        </div>
    )
}
