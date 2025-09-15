import { DashboardCard } from '@/components/dashboard-card'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useError } from '@/shared/errors/errorHandler'
import { useUserStore } from '@/stores/useUserStore'
import { QrCode } from 'lucide-react'

export const GenerateQRCode = () => {
  const userStore = useUserStore()

  const { errorHandler } = useError()

  const generateQRCode = async () => {
    try {
      await userStore.generateQRCode()
    } catch (error) {
      errorHandler(error)
    }
  }

  const generateAcessKey = async () => {
    try {
      await userStore.generateAcessKey()
    } catch (error) {
      errorHandler(error)
    }
  }

  return (
    <DashboardCard titleIcon={<QrCode size={30} />} titleText="QR Code">
      <div className="flex flex-col gap-4">
        <Button
          onClick={generateQRCode}
          disabled={
            !!userStore.data.clinical_information?.qr_code?.base64 ||
            !userStore.data.clinical_information ||
            userStore.loading
          }
        >
          Gerar
          {userStore.loading && <Spinner />}
        </Button>
        <Button
          onClick={generateAcessKey}
          disabled={
            !!userStore.data.clinical_information?.qr_code?.acess_key ||
            !userStore.data.clinical_information?.qr_code?.base64
          }
        >
          Criar senha de acesso
        </Button>
        {userStore.data.clinical_information?.qr_code?.acess_key && (
          <span className="bg-secondary mt-4 w-max self-center rounded-md px-4 py-2">
            {userStore.data.clinical_information?.qr_code?.acess_key}
          </span>
        )}
        {userStore.data.clinical_information?.qr_code?.base64 && (
          <div className="self-center text-center">
            <span>QR Code com link de acesso:</span>
            <img
              className="size-60"
              src={userStore.data.clinical_information?.qr_code?.base64}
            />
          </div>
        )}

        {/* <Button>
          Compartilhar link
          <Share2 />
        </Button> */}
      </div>
    </DashboardCard>
  )
}
