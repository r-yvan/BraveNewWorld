export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const AUTH_ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
} as const;

export const PROTECTED_ROUTES = {
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  USERS: '/users',
} as const;

export const TOKEN_KEY = 'auth_token';
