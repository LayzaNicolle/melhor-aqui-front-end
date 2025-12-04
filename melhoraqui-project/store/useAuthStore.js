import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      usuario: null, 
      
      // Ação de Login
      login: (dadosUsuario) => set({ usuario: dadosUsuario }),
      
      // Ação de Logout
      logout: () => set({ usuario: null }),
    }),
    {
      name: 'auth-storage', 
    }
  )
)