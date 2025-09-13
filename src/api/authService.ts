import { redirect } from '@tanstack/react-router'
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

export type ForgotPasswordDto = {
  email: string
}

export type ResetPasswordDto = {
  newPassword: string
  token: string
}

export type ResponseLoginDto = {
  payload: {
    id: number
    email: string
    name: string
    photo: string
  }
  access_token: string
}

export const register = async (data: RegisterDto) => {
  const response = await api.post('/auth/register', data)
  return response.data
}

export const login = async (data: LoginDto) => {
  const response = await api.post<ResponseLoginDto>('/auth/login', data)
  return response.data
}

export const forgotPassword = async (data: ForgotPasswordDto) => {
  const response = await api.post('/auth/forgot-password', data)
  return response.data
}

export const resetPassword = async (data: ResetPasswordDto) => {
  const response = await api.post('/auth/reset-password', data)
  return response.data
}

export const validateToken = async () => {
  try {
    const token = localStorage.getItem('auth-token')

    if (!token) throw redirect({ to: '/login' })

    await api.get('/auth/validate-token')
    return true
  } catch (_er) {
    throw redirect({ to: '/login' })
  }
}
