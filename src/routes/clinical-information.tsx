import { ClinicalInformationView } from '@/pages/ClinicalInformation'
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

export const Route = createFileRoute('/clinical-information')({
  component: RouteComponent,
  validateSearch: z.object({
    clinical_information_id: z.number().optional(),
  }),
})

function RouteComponent() {
  return <ClinicalInformationView />
}
