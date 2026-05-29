import { apiClient } from './api'
import { Metric, ActivityItem, PaginatedResponse } from '@/lib/types'

export const dashboardService = {
  async getMetrics(): Promise<Metric[]> {
    return apiClient.get<Metric[]>('/dashboard/metrics')
  },

  async getActivityFeed(page: number = 1, limit: number = 10): Promise<PaginatedResponse<ActivityItem>> {
    return apiClient.get<PaginatedResponse<ActivityItem>>(
      `/dashboard/activity?page=${page}&limit=${limit}`,
    )
  },

  async getChartData(metric: string, range: string): Promise<unknown> {
    return apiClient.get(`/dashboard/chart/${metric}?range=${range}`)
  },

  async getRevenueData(): Promise<unknown> {
    return apiClient.get('/dashboard/revenue')
  },

  async getConversionData(): Promise<unknown> {
    return apiClient.get('/dashboard/conversion')
  },

  async getUserStats(): Promise<unknown> {
    return apiClient.get('/dashboard/user-stats')
  },
}
