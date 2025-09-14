import { DashboardCard } from '@/components/dashboard-card'
import { Button } from '@/components/ui/button'
import { QrCode, Share2 } from 'lucide-react'

export const GenerateQRCode = () => {
  return (
    <DashboardCard titleIcon={<QrCode size={30} />} titleText="QR Code">
      <div className="flex flex-col gap-4">
        <Button>Gerar</Button>
        <Button>Criar senha de acesso</Button>
        <span className="bg-secondary w-max self-center rounded-md px-4 py-2">
          421-232
        </span>
        <QrCode size={200} className="self-center" />
        <Button className="justify-self-end">
          Compartilhar
          <Share2 />
        </Button>
      </div>
    </DashboardCard>
  )
}
