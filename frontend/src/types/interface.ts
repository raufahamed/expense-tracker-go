import type { SortBy } from "../enums";

export interface IExpenseStore {
  selectedExpenseId: string | null;
  searchQuery: string;
  selectedCategoryId: string | null;
  selectedDateRange: {
    from: Date | null;
    to: Date | null;
  };
  sortBy: SortBy;
}
