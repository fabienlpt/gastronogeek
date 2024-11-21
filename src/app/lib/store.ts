import { create } from "zustand";

interface Store {
  isTransitionActive: boolean;
  setIsTransitionActive: (isActive: boolean) => void;
  isFirstLoad: boolean;
  setIsFirstLoad: (isFirstLoad: boolean) => void;
  lastPathname: string;
  setLastPathname: (pathname: string) => void;
}

export const useStore = create<Store>((set) => ({
  isTransitionActive: false,
  setIsTransitionActive: (isActive) => set({ isTransitionActive: isActive }),
  isFirstLoad: true,
  setIsFirstLoad: (isFirstLoad) => set({ isFirstLoad: isFirstLoad }),
  lastPathname: "",
  setLastPathname: (pathname) => set({ lastPathname: pathname }),
}));
