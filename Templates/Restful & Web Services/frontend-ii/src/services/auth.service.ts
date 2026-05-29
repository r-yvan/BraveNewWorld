import { api } from './api';
import { LoginRequest, RegisterRequest, AuthResponse, User } from '@/types';

export const authService = {
  login: async (credentials: LoginRequest) => {
    return api.post<AuthResponse['data']>('/auth/login', credentials);
  },

  register: async (data: RegisterRequest) => {
    return api.post<AuthResponse['data']>('/auth/register', data);
  },

  getCurrentUser: async () => {
    return api.get<User>('/auth/me');
  },

  logout: async () => {
    return api.post('/auth/logout');
  },
};
