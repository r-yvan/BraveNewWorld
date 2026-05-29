import { apiClient } from './api';
import { DashboardAnalytics } from '@/types';

export const dashboardService = {
  getAnalytics: async (): Promise<DashboardAnalytics> => {
    const response = await apiClient.get('/dashboard/analytics');
    return response.data;
  },

  getMonthlyTrends: async (months = 6): Promise<any> => {
    const response = await apiClient.get(`/dashboard/trends?months=${months}`);
    return response.data;
  },

  getDeductionsBreakdown: async (): Promise<any> => {
    const response = await apiClient.get('/dashboard/deductions-breakdown');
    return response.data;
  },

  getPayrollStatus: async (): Promise<any> => {
    const response = await apiClient.get('/dashboard/payroll-status');
    return response.data;
  },

  getPendingApprovals: async (): Promise<any> => {
    const response = await apiClient.get('/dashboard/pending-approvals');
    return response.data;
  },
};
