import { validateToken } from '@/api/authService'
import { TopBar } from '@/components/top-bar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const AuthenticatedLayout = () => {
    return (
        <div className="w-screen h-screen">
            <TopBar />
            <Outlet />
        </div>
    )
}

export const Route = createFileRoute('/_authenticated')({
    beforeLoad: async () => {
        await validateToken()
    },
    component: AuthenticatedLayout,
})
