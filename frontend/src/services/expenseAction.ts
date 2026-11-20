import { updateExpenseStore } from "../store/expense/action";
import { useExpenseStore } from "../store/expense/expenseStore";
import {
  createExpenseApi,
  deleteExpenseById,
  getExpenses,
} from "./expenseService";

export async function fetchExpenses() {
  try {
    const expenses = await getExpenses();

    updateExpenseStore({
      expenses: expenses,
    });

    console.log(useExpenseStore.getState().expenses, "expenses here");
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
  try {
    await createExpenseApi(title, amount, categoryId, description);

    await fetchExpenses();
  } catch (error) {
    console.error("Error creating expense:", error);
    throw error;
  }
};
