import { apiClient } from './api';
import { Payslip, PaginationParams } from '@/types';

export interface PayslipResponse {
  content: Payslip[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
  pageSize: number;
}

export const payslipService = {
  getMyPayslips: async (params: Partial<PaginationParams> = {}): Promise<PayslipResponse> => {
    const queryParams = new URLSearchParams({
      page: String(params.page || 0),
      size: String(params.size || 10),
      ...(params.sortBy && { sortBy: params.sortBy }),
      ...(params.sortDirection && { sortDirection: params.sortDirection }),
    });

    const response = await apiClient.get(`/payslips/my?${queryParams}`);
    return response.data;
  },

  getById: async (id: number): Promise<Payslip> => {
    const response = await apiClient.get(`/payslips/${id}`);
    return response.data;
  },

  getByEmployeeId: async (
    employeeId: number,
    params: Partial<PaginationParams> = {}
  ): Promise<PayslipResponse> => {
    const queryParams = new URLSearchParams({
      page: String(params.page || 0),
      size: String(params.size || 10),
    });

    const response = await apiClient.get(`/payslips/employee/${employeeId}?${queryParams}`);
    return response.data;
  },

  downloadPDF: async (id: number): Promise<Blob> => {
    const response = await apiClient.get(`/payslips/${id}/download`, {
      responseType: 'blob',
    });
    return response.data;
  },

  getMonthlyPayslips: async (month: number, year: number): Promise<Payslip[]> => {
    const response = await apiClient.get(`/payslips?month=${month}&year=${year}`);
    return response.data;
  },
};
