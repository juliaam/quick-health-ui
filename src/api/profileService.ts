import api from './base'

export const deleteAccount = async (id: number) => {
    const response = await api.post('/user/delete', {}, { params: id })
    return response.data
}
