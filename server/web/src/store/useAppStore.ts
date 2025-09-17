import { create } from 'zustand';
import { User } from '../types';

interface AppState {
  user: User | null;
  isLoading: boolean;
  notifications: Array<{ id: string; message: string; type: 'success' | 'error' | 'info' }>;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  addNotification: (notification: { message: string; type: 'success' | 'error' | 'info' }) => void;
  removeNotification: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  isLoading: false,
  notifications: [],
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, { ...notification, id: Date.now().toString() }]
  })),
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  }))
}));