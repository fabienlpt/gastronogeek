import { create } from "zustand";

interface StoreState {
  isTransitionActive: boolean;
  setIsTransitionActive: (isActive: boolean) => void;
  isFirstLoad: boolean;
  setIsFirstLoad: (isFirstLoad: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  isTransitionActive: false,
  setIsTransitionActive: (isActive) => set({ isTransitionActive: isActive }),
  isFirstLoad: true,
  setIsFirstLoad: (isFirstLoad) => set({ isFirstLoad }),
}));
