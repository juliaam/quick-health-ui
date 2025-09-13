import { LoginForm } from './login-form'

export function Login() {
  return (
    <div className="size-full flex-1 bg-black bg-[url('public/background.png')] bg-cover bg-center bg-no-repeat">
      <div className="flex size-full justify-end">
        <LoginForm />
      </div>
    </div>
  )
}
