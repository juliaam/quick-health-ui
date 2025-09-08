import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Toaster } from 'sonner'

const RootLayout = () => (
    <div className="w-screen h-screen">
        <Outlet />
        <Toaster />
        <TanStackRouterDevtools />
    </div>
)

export const Route = createRootRoute({ component: RootLayout })
