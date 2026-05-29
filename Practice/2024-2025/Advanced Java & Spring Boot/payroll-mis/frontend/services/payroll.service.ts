import { apiClient } from './api';
import { Payroll, PayrollRequest, PayrollResponse, PaginationParams } from '@/types';

export const payrollService = {
  getAll: async (params: Partial<PaginationParams> = {}): Promise<PayrollResponse> => {
    const queryParams = new URLSearchParams({
      page: String(params.page || 0),
      size: String(params.size || 10),
      ...(params.sortBy && { sortBy: params.sortBy }),
      ...(params.sortDirection && { sortDirection: params.sortDirection }),
    });

    const response = await apiClient.get(`/payroll?${queryParams}`);
    return response.data;
  },

  getById: async (id: number): Promise<Payroll & { employees: any[] }> => {
    const response = await apiClient.get(`/payroll/${id}`);
    return response.data;
  },

  process: async (data: PayrollRequest): Promise<{
    id: number;
    month: number;
    year: number;
    totalEmployees: number;
    totalSalary: number;
  }> => {
    const response = await apiClient.post('/payroll/process', data);
    return response.data;
  },

  approve: async (id: number): Promise<Payroll> => {
    const response = await apiClient.put(`/payroll/${id}/approve`, {});
    return response.data;
  },

  reject: async (id: number, reason: string): Promise<Payroll> => {
    const response = await apiClient.put(`/payroll/${id}/reject`, { reason });
    return response.data;
  },

  checkExists: async (month: number, year: number): Promise<{ exists: boolean; id?: number }> => {
    const response = await apiClient.get(`/payroll/check?month=${month}&year=${year}`);
    return response.data;
  },

  generatePreview: async (data: PayrollRequest): Promise<{
    month: number;
    year: number;
    totalEmployees: number;
    grossSalary: number;
    totalDeductions: number;
    netSalary: number;
  }> => {
    const response = await apiClient.post('/payroll/preview', data);
    return response.data;
  },

  getStats: async (): Promise<{
    pendingPayrolls: number;
    approvedPayrolls: number;
    paidPayrolls: number;
    rejectedPayrolls: number;
    totalPayrollAmount: number;
  }> => {
    const response = await apiClient.get('/payroll/stats');
    return response.data;
  },
};
