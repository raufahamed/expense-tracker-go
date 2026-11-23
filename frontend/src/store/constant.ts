import { SortBy } from "../enums";
import type { IExpenseStore } from "../types/interface";

export const defaultExpenseStore: IExpenseStore = {
  expenses: [],
  categories: [],
  sortBy: SortBy.oldest,
};
