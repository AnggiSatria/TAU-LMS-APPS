import { create } from "zustand";

type SearchStore = {
  keyword: string;
  setKeyword: (value: string) => void;
};

export const useSearchStore = create<SearchStore>((set) => ({
  keyword: "",
  setKeyword: (value: string) => set({ keyword: value }),
}));
