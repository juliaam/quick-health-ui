import api from './base'

export const ProfileService = {
  getById: async () => {
    const response = await api.get(`/user`)
    return response.data
  },
  deleteAccount: async () => {
    const response = await api.delete(`/user`)
    return response.data
  },
}
