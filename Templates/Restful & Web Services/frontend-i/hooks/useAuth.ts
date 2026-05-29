import { create } from 'zustand'
import { User, AuthSession } from '@/lib/types'

interface AuthStore {
  session: AuthSession | null
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  setSession: (session: AuthSession | null) => void
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  session: null,
  user: null,
  isLoading: true,
  isAuthenticated: false,
  setSession: (session) =>
    set({
      session,
      isAuthenticated: !!session,
    }),
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ isLoading: loading }),
  logout: () =>
    set({
      session: null,
      user: null,
      isAuthenticated: false,
    }),
}))
