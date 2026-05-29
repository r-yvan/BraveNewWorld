import { apiClient } from './api';
import { Employee, CreateEmployeeRequest, EmployeeResponse, PaginationParams } from '@/types';

export const employeeService = {
  getAll: async (params: Partial<PaginationParams> = {}): Promise<EmployeeResponse> => {
    const queryParams = new URLSearchParams({
      page: String(params.page || 0),
      size: String(params.size || 10),
      ...(params.search && { search: params.search }),
      ...(params.sortBy && { sortBy: params.sortBy }),
      ...(params.sortDirection && { sortDirection: params.sortDirection }),
    });

    const response = await apiClient.get(`/employees?${queryParams}`);
    return response.data;
  },

  getById: async (id: number): Promise<Employee> => {
    const response = await apiClient.get(`/employees/${id}`);
    return response.data;
  },

  create: async (data: CreateEmployeeRequest): Promise<Employee> => {
    const response = await apiClient.post('/employees', data);
    return response.data;
  },

  update: async (id: number, data: Partial<CreateEmployeeRequest>): Promise<Employee> => {
    const response = await apiClient.put(`/employees/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/employees/${id}`);
  },

  getStats: async (): Promise<{
    totalEmployees: number;
    activeEmployees: number;
    inactiveEmployees: number;
    suspendedEmployees: number;
  }> => {
    const response = await apiClient.get('/employees/stats');
    return response.data;
  },

  search: async (query: string, limit = 10): Promise<Employee[]> => {
    const response = await apiClient.get(`/employees/search?q=${query}&limit=${limit}`);
    return response.data;
  },
};
