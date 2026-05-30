import api from './api';
import { Customer, AuthResponse } from '@/types';

export const register = async (customer: Customer): Promise<Customer> => {
  const response = await api.post('/auth/register', customer);
  return response.data;
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', { email, password });
  const data = response.data;
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify({ email: data.email, firstname: data.firstname }));
  return data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};
