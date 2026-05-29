import { api } from './api';
import { User } from '@/types';

export const userService = {
  getAll: async () => {
    return api.get<User[]>('/users');
  },

  getById: async (id: string) => {
    return api.get<User>(`/users/${id}`);
  },

  update: async (id: string, data: Partial<User>) => {
    return api.put<User>(`/users/${id}`, data);
  },

  delete: async (id: string) => {
    return api.delete(`/users/${id}`);
  },
};
