import { cn } from '@/lib/utils'
import { RotateCw } from 'lucide-react'

export const Spinner = ({ className }: { className?: string }) => {
    return <RotateCw className={cn('animate-spin', className)} />
}
