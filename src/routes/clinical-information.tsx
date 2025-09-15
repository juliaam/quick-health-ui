import { ClinicalInformationView } from '@/pages/ClinicalInformation'
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

export const Route = createFileRoute('/clinical-information')({
  component: RouteComponent,
  validateSearch: z.object({
    clinical_information_id: z.string().optional(),
  }),
})

function RouteComponent() {
  return <ClinicalInformationView />
}
