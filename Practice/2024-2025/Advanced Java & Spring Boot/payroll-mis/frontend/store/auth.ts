import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Role } from '@/types';
import { TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY } from '@/constants';

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (user: User, token: string, refreshToken: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  hasRole: (role: Role) => boolean;
  canAccessModule: (moduleRoles: Role[]) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: (user, token, refreshToken) => {
        set({
          user,
          token,
          refreshToken,
          isAuthenticated: true,
          error: null,
        });
        // Store in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem(TOKEN_KEY, token);
          localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
          localStorage.setItem(USER_KEY, JSON.stringify(user));
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
          error: null,
        });
        // Clear localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(REFRESH_TOKEN_KEY);
          localStorage.removeItem(USER_KEY);
        }
      },

      setUser: (user) => set({ user }),

      setToken: (token) => {
        set({ token });
        if (typeof window !== 'undefined') {
          localStorage.setItem(TOKEN_KEY, token);
        }
      },

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      hasRole: (role) => {
        const { user } = get();
        return user?.role === role;
      },

      canAccessModule: (moduleRoles) => {
        const { user } = get();
        return user ? moduleRoles.includes(user.role) : false;
      },
    }),
    {
      name: 'auth-store',
    }
  )
);
