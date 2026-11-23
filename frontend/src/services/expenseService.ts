import { BASE_URL } from "../constant";
import type { SortBy } from "../enums";

export const getExpenses = async () => {
  try {
    const response = await fetch(BASE_URL + "/get-expenses");

    if (!response.ok) {
      throw new Error("Failed to fetch expenses");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteExpenseById = async (id: string) => {
  try {
    const response = await fetch(BASE_URL + `/expenses/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch expenses");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function createExpenseApi(
  title: string,
  amount: number,
  categoryId: string,
  description?: string,
) {
  console.log("Category ID received by service:", categoryId);

  try {
    const response = await fetch(BASE_URL + "/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        amount: amount,
        description: description,
        category_id: categoryId,
      }),
    });

    if (!response.ok) {
      throw new Error("not able to create a expense");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function editExpense(
  expenseId: string,
  title: string,
  amount: number,
  categoryId: string,
  description?: string,
) {
  try {
    const response = await fetch(BASE_URL + `/update-expense/${expenseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        amount: amount,
        description: description,
        category_id: categoryId,
        expense_id: expenseId,
      }),
    });
    if (!response.ok) {
      throw new Error("cannot update the expense");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function sortExpenseBy(sortBy: SortBy) {
  try {
    const response = await fetch(BASE_URL + `/get-expenses?sort_by=${sortBy}`);

    if (!response.ok) {
      throw new Error(`not able to sort the expense by ${sortBy}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
