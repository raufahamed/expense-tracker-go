import { SortBy } from "../enums";
import { updateExpenseStore } from "../store/expense/action";
import { useExpenseStore } from "../store/expense/expenseStore";
import {
  createExpenseApi,
  deleteExpenseById,
  editExpense,
  getExpenses,
  sortExpenseBy,
} from "./expenseService";

export async function fetchExpenses() {
  try {
    const expenses = await getExpenses();

    updateExpenseStore({
      expenses: expenses,
    });
  } catch (err) {
    console.log(err);

    throw err;
  }
}

export async function deleteExpense(id: string) {
  try {
    await deleteExpenseById(id);

    const expense = useExpenseStore.getState().expenses;

    const updateExpense = expense.filter((exp) => exp.id !== id);

    updateExpenseStore({
      expenses: updateExpense,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const createExpense = async (
  title: string,
  amount: number,
  categoryId: string,
  description?: string,
) => {
  const sortBy = useExpenseStore.getState().sortBy;
  try {
    await createExpenseApi(title, amount, categoryId, description);

    await sortExpenses(sortBy);
  } catch (error) {
    console.error("Error creating expense:", error);
    throw error;
  }
};

export const updateExpense = async (
  expenseId: string,
  title: string,
  amount: number,
  categoryId: string,
  description?: string,
) => {
  try {
    await editExpense(expenseId, title, amount, categoryId, description);

    await fetchExpenses();
  } catch (err) {
    console.error("Error updating expense:", err);
    throw err;
  }
};

export const sortExpenses = async (SortBy: SortBy) => {
  try {
    const sortedExpense = await sortExpenseBy(SortBy);

    updateExpenseStore({
      expenses: sortedExpense,
      sortBy: SortBy,
    });
  } catch (error) {
    console.error("error sorting the expense", error);
    throw error;
  }
};
