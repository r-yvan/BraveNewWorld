import { apiClient } from './api';
import { DeductionConfig } from '@/types';

export const deductionService = {
  getAll: async (): Promise<DeductionConfig[]> => {
    const response = await apiClient.get('/deductions');
    return response.data;
  },

  getById: async (id: number): Promise<DeductionConfig> => {
    const response = await apiClient.get(`/deductions/${id}`);
    return response.data;
  },

  update: async (id: number, data: Partial<DeductionConfig>): Promise<DeductionConfig> => {
    const response = await apiClient.put(`/deductions/${id}`, data);
    return response.data;
  },

  create: async (data: Omit<DeductionConfig, 'id'>): Promise<DeductionConfig> => {
    const response = await apiClient.post('/deductions', data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/deductions/${id}`);
  },
};
