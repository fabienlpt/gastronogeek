import { create } from "zustand";

interface Store {
  isTransitionActive: boolean;
  setIsTransitionActive: (isActive: boolean) => void;
  lastPathname: string;
  setLastPathname: (pathname: string) => void;
}

export const useStore = create<Store>((set) => ({
  isTransitionActive: false,
  setIsTransitionActive: (isActive) => set({ isTransitionActive: isActive }),
  lastPathname: "",
  setLastPathname: (pathname) => set({ lastPathname: pathname }),
}));
