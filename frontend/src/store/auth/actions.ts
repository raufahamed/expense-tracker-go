import type { Iuser } from "../../types/interface";
import { defaultAuthStore } from "../constant";
import { useAuthStore } from "./authstore";

export function updateAuthStore(user: Iuser) {
  useAuthStore.setState({
    user,
    isAuthenticated: true,
  });
}

export function resetAuthStore() {
  useAuthStore.setState({
    ...defaultAuthStore,
  });
}
