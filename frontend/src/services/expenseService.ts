import { BASE_URL } from "../constant";

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
