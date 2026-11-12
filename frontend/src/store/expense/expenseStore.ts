import { create } from "zustand/react";
import type { IExpenseStore } from "../../types/interface";
import { defaultExpenseStore } from "../constant";

export const useExpenseStore = create<IExpenseStore>(() => ({
  ...defaultExpenseStore,
}));
