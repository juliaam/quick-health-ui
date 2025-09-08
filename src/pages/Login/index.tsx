import { LoginForm } from './login-form'

export function Login() {
    return (
        <div className="flex-1 bg-[url('public/background.png')] bg-no-repeat bg-center bg-cover size-full bg-black">
            <div className="size-full flex justify-end">
                <LoginForm />
            </div>
        </div>
    )
}
