import api from './base'

export type RegisterDto = {
    name: string
    email: string
    password: string
}

export type LoginDto = {
    email: string
    password: string
}

export const register = async (data: RegisterDto) => {
    const response = await api.post('/auth/register', data)
    return response.data
}

export const login = async (data: LoginDto) => {
    const response = await api.post('/auth/login', data)
    return response.data
}

export const validateToken = async () => {
    try {
        await api.get('/auth/validate-token')
        return true
    } catch (err) {
        console.log('fui jogado pra ca')
        console.error(err)
    }
}
