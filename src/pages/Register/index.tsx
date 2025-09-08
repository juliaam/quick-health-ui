import { RegisterForm } from './register-form'

export function Register() {
    return (
        <div className="flex-1 bg-[url('public/background.png')] bg-no-repeat bg-center bg-cover size-full bg-black">
            <div className="size-full flex justify-end">
                <RegisterForm />
            </div>
        </div>
    )
}
