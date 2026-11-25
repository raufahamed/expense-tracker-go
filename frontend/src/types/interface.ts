import type { SortBy } from "../enums";

export interface IExpense {
  id: string;
  title: string;
  amount: number;
  category_id: string;
  category_name: string;
  created_at: string;
  description: string;
}

export interface ICategory {
  category_id: string;
  category_name: string;
}

export interface IExpenseStore {
  expenses: IExpense[];
  categories: ICategory[];
  sortBy: SortBy;
}

export interface Iuser {
  name: string;
  email: string;
  userId: string;
}

export interface IAuthStore {
  user: Iuser | null;
  isAuthenticated: boolean;
}
