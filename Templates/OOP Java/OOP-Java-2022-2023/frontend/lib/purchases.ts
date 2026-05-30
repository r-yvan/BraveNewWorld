import api from './api';
import { PurchaseReport } from '@/types';

export const getPurchaseHistory = async (): Promise<PurchaseReport[]> => {
  const response = await api.get('/purchases/report');
  return response.data;
};
