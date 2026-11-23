import { create } from "zustand";
import type { IExpenseStore } from "../../types/interface";
import { devtools, persist } from "zustand/middleware";
import { defaultExpenseStore } from "../constant";

export const useExpenseStore = create<IExpenseStore>()(
  devtools(
    persist(
      (): IExpenseStore => ({
        ...defaultExpenseStore,
      }),
      {
        name: "expense store",
        partialize: (state) => ({
          expenses: state.expenses,
          categories: state.categories,
          sortBy: state.sortBy,
        }),
        merge: (presistedState, currentState) => ({
          ...currentState,
          ...(presistedState as IExpenseStore),
        }),
      },
    ),
    {
      name: "expense store",
      enabled: import.meta.env.DEV,
    },
  ),
);
