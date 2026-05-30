import api from './api';
import { Product } from '@/types';

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products');
  return response.data;
};

export const getProduct = async (id: number): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};
