import { ForgotPasswordForm } from './forgot-password'

export function ForgotPassword() {
  return (
    <div className="size-full flex-1 bg-black bg-[url('public/background.png')] bg-cover bg-center bg-no-repeat">
      <div className="flex size-full justify-end">
        <ForgotPasswordForm />
      </div>
    </div>
  )
}
