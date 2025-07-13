import { create } from "zustand";

const useAuthStore = create((set, get) => ({
  user: null,
  loading: null,
  isAuthenticated: () => !!get().user,
  setUser: (userData) => set({ user: userData }),
  setLoading: (value) => set({ isLoading: false }),
  clearUser: () => set({ user: null }),
}));

export default useAuthStore;
