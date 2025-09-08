import { validateToken } from '@/api/authService'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
    beforeLoad: async () => {
        await validateToken()
    },
})
