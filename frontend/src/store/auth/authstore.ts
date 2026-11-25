import { create } from "zustand";
import type { IAuthStore } from "../../types/interface";
import { devtools, persist } from "zustand/middleware";
import { defaultAuthStore } from "../constant";

export const useAuthStore = create<IAuthStore>()(
  devtools(
    persist(
      (): IAuthStore => ({
        ...defaultAuthStore,
      }),
      {
        name: "auth store",
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
        merge: (presistedState, currentState) => ({
          ...currentState,
          ...(presistedState as IAuthStore),
        }),
      },
    ),
    {
      name: "auth store",
      enabled: import.meta.env.DEV,
    },
  ),
);
