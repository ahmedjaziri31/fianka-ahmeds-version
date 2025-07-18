import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, User } from '@/types';

interface AppStore extends AppState {
  // Actions
  setUser: (user: User | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  logout: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      theme: 'light',

      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setTheme: (theme) => set({ theme }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated,
        theme: state.theme 
      }),
      // Disable persistence during SSR
      skipHydration: true,
    }
  )
); 