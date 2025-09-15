import { ClinicalInformation } from './clinical-information'
import { GenerateQRCode } from './qr-code'

export function Dashboard() {
  return (
    <div className="bg-background mx-32 mt-8 overflow-auto pb-8">
      <span className="text-4xl">Gerenciamento de informações clínicas</span>
      <div className="mt-8 grid grid-cols-[57%_33%] gap-x-20">
        <ClinicalInformation />
        <GenerateQRCode />
      </div>
    </div>
  )
}
