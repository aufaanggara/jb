import { create } from "zustand";

interface AppState {
  selectedAdminId: string | null;
  setSelectedAdminId: (id: string | null) => void;
}

export const useStore = create<AppState>((set) => ({
  selectedAdminId: null,
  setSelectedAdminId: (id) => set({ selectedAdminId: id }),
}));
