import { apiClient } from './api'
import { User, AuthSession } from '@/lib/types'

interface LoginPayload {
  email: string
  password: string
}

interface SignupPayload {
  email: string
  password: string
  name: string
}

interface ForgotPasswordPayload {
  email: string
}

interface ResetPasswordPayload {
  token: string
  password: string
}

export const authService = {
  async login(credentials: LoginPayload): Promise<AuthSession> {
    return apiClient.post<AuthSession>('/auth/login', credentials)
  },

  async signup(data: SignupPayload): Promise<AuthSession> {
    return apiClient.post<AuthSession>('/auth/signup', data)
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout')
  },

  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>('/auth/me')
  },

  async forgotPassword(data: ForgotPasswordPayload): Promise<{ message: string }> {
    return apiClient.post('/auth/forgot-password', data)
  },

  async resetPassword(data: ResetPasswordPayload): Promise<{ message: string }> {
    return apiClient.post('/auth/reset-password', data)
  },

  async verifyOTP(email: string, code: string): Promise<AuthSession> {
    return apiClient.post<AuthSession>('/auth/verify-otp', { email, code })
  },

  async resendOTP(email: string): Promise<{ message: string }> {
    return apiClient.post('/auth/resend-otp', { email })
  },
}
