import { ClinicalInformation } from './clinical-information'

export function Dashboard() {
  return (
    <div className="bg-background mx-32 mt-16">
      <span className="text-4xl">Gerenciamento de informações clínicas</span>
      <div className="flex justify-between">
        <ClinicalInformation />
      </div>
    </div>
  )
}
