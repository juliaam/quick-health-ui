import { createRootRoute, Outlet, redirect } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Toaster } from 'sonner'

const RootLayout = () => (
  <div className="h-screen">
    <Outlet />
    <Toaster />
    <TanStackRouterDevtools />
  </div>
)

export const Route = createRootRoute({
  component: RootLayout,
  beforeLoad: ({ location }) => {
    if (location.pathname === '/') {
      throw redirect({
        to: '/login',
      })
    }
  },
})
