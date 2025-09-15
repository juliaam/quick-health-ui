import { AuthService } from '@/api/authService'
import { TopBar } from '@/components/top-bar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const AuthenticatedLayout = () => {
  return (
    <>
      <TopBar />
      <Outlet />
    </>
  )
}

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    await AuthService.validateToken()
  },
  component: AuthenticatedLayout,
})
