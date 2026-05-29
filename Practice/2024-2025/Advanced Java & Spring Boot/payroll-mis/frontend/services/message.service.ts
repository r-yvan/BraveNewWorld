import { apiClient } from './api';
import { Message, PaginationParams } from '@/types';

export interface MessageResponse {
  content: Message[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
  pageSize: number;
}

export const messageService = {
  getAll: async (params: Partial<PaginationParams> = {}): Promise<MessageResponse> => {
    const queryParams = new URLSearchParams({
      page: String(params.page || 0),
      size: String(params.size || 10),
    });

    const response = await apiClient.get(`/messages?${queryParams}`);
    return response.data;
  },

  getUnread: async (): Promise<Message[]> => {
    const response = await apiClient.get('/messages/unread');
    return response.data;
  },

  getById: async (id: number): Promise<Message> => {
    const response = await apiClient.get(`/messages/${id}`);
    return response.data;
  },

  markAsRead: async (id: number): Promise<Message> => {
    const response = await apiClient.put(`/messages/${id}/read`, {});
    return response.data;
  },

  markAllAsRead: async (): Promise<{ success: boolean }> => {
    const response = await apiClient.put('/messages/read-all', {});
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/messages/${id}`);
  },

  getUnreadCount: async (): Promise<{ count: number }> => {
    const response = await apiClient.get('/messages/unread-count');
    return response.data;
  },
};
