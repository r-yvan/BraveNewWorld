import axios from '@/lib/axios';
import { ApiResponse } from '@/types';

export const api = {
  get: async <T>(url: string) => {
    const response = await axios.get<ApiResponse<T>>(url);
    return response.data;
  },

  post: async <T>(url: string, data?: unknown) => {
    const response = await axios.post<ApiResponse<T>>(url, data);
    return response.data;
  },

  put: async <T>(url: string, data?: unknown) => {
    const response = await axios.put<ApiResponse<T>>(url, data);
    return response.data;
  },

  patch: async <T>(url: string, data?: unknown) => {
    const response = await axios.patch<ApiResponse<T>>(url, data);
    return response.data;
  },

  delete: async <T>(url: string) => {
    const response = await axios.delete<ApiResponse<T>>(url);
    return response.data;
  },
};
