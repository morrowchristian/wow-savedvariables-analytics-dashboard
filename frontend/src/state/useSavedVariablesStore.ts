import { create } from "zustand";
import type { NormalizedSavedVariables } from "../types/NormalizedSavedVariables";

interface SavedVariablesState {
  data: NormalizedSavedVariables | null;
  setData: (data: NormalizedSavedVariables) => void;
}

export const useSavedVariablesStore = create<SavedVariablesState>((set) => ({
  data: null,
  setData: (data) => set({ data }),
}));
