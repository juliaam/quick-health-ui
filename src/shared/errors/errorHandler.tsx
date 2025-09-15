import { AxiosError } from 'axios'
import { toast } from 'sonner'

export function useError() {
  const errorHandler = (error: unknown) => {
    if (error instanceof AxiosError) {
      if (error.response?.data.message) {
        toast(error.response.data.message)
      }
    } else {
      console.error(error)
      toast('Houve um erro!')
    }
  }

  return { errorHandler }
}
