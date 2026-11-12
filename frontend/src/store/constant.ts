import { SortBy } from "../enums";
import type { IExpenseStore } from "../types/interface";

export const defaultExpenseStore: IExpenseStore = {
  selectedExpenseId: null,
  searchQuery: "",
  selectedCategoryId: null,
  selectedDateRange: {
    from: null,
    to: null,
  },
  sortBy: SortBy.lowest,
};
