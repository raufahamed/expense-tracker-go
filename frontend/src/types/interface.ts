export interface IExpense {
  id: string;
  title: string;
  amount: number;
  category_id: string;
  category_name: string;
  created_at: string;
  description: string;
}

export interface IExpenseStore {
  expenses: IExpense[];
}
