import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL, TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants';
import { useAuthStore } from '@/store/auth';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  retry?: number;
}

class ApiClient {
  private client: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    onSuccess: (token: string) => void;
    onFailure: (error: AxiosError) => void;
  }> = [];

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request Interceptor
    this.client.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        config.retry = config.retry || 0;
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        if (error.response?.status === 401 && originalRequest && !originalRequest.retry) {
          if (this.isRefreshing) {
            return new Promise((onSuccess, onFailure) => {
              this.failedQueue.push({ onSuccess, onFailure });
            })
              .then((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return this.client(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }

          this.isRefreshing = true;
          originalRequest.retry = 1;

          try {
            const refreshToken = this.getRefreshToken();
            if (!refreshToken) {
              this.logout();
              return Promise.reject(error);
            }

            const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
              refreshToken,
            });

            const { token } = response.data;
            this.setToken(token);

            originalRequest.headers.Authorization = `Bearer ${token}`;
            this.processQueue(null, token);

            return this.client(originalRequest);
          } catch (err) {
            this.processQueue(err as AxiosError, null);
            this.logout();
            return Promise.reject(err);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private processQueue(
    error: AxiosError | null,
    token: string | null
  ) {
    this.failedQueue.forEach((prom) => {
      if (error) {
        prom.onFailure(error);
      } else if (token) {
        prom.onSuccess(token);
      }
    });

    this.failedQueue = [];
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  }

  private getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(REFRESH_TOKEN_KEY);
    }
    return null;
  }

  private setToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, token);
    }
    const store = useAuthStore.getState();
    store.setToken(token);
  }

  private logout() {
    const store = useAuthStore.getState();
    store.logout();
  }

  get(url: string, config = {}) {
    return this.client.get(url, config);
  }

  post(url: string, data?: any, config = {}) {
    return this.client.post(url, data, config);
  }

  put(url: string, data?: any, config = {}) {
    return this.client.put(url, data, config);
  }

  patch(url: string, data?: any, config = {}) {
    return this.client.patch(url, data, config);
  }

  delete(url: string, config = {}) {
    return this.client.delete(url, config);
  }
}

export const apiClient = new ApiClient();
