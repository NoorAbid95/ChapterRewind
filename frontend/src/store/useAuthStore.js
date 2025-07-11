import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  loading: null,
  setUser: (userData) => set({ user: userData }),
  setLoading: (value) => set({ isLoading: false }),
  clearUser: () => set({ user: null }),
}));

export default useAuthStore;
