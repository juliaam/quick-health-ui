import api from './base'

export const deleteAccount = async (id: number) => {
  const response = await api.delete('/user', { params: id })
  return response.data
}
