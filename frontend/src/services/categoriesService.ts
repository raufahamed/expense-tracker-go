import { BASE_URL } from "../constant";

export async function getCategories() {
  try {
    const response = await fetch(BASE_URL + "/get-categories");

    if (!response.ok) {
      throw new Error("failed to fetch the categories");
    }
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function createCategories(CategoryName: string) {
  try {
    const response = await fetch(BASE_URL + "/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category_name: CategoryName,
      }),
    });
    if (!response.ok) {
      throw new Error("failed to create the category");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
