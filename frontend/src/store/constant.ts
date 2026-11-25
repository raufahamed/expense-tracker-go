import { SortBy } from "../enums";
import type { IAuthStore, IExpenseStore } from "../types/interface";

export const defaultExpenseStore: IExpenseStore = {
  expenses: [],
  categories: [],
  sortBy: SortBy.oldest,
};

export const defaultAuthStore: IAuthStore = {
  user: null,
  isAuthenticated: false,
};
