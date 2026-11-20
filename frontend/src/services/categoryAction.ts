import { updateExpenseStore } from "../store/expense/action";
import { useExpenseStore } from "../store/expense/expenseStore";
import { removeWhitespace } from "../utils/utils";
import { createCategories, getCategories } from "./categoriesService";

export async function createCategory(categoryName: string) {
  const categories = useExpenseStore.getState().categories;

  const isDuplicate = categories.some(
    (cat) =>
      removeWhitespace(cat.category_name).toLowerCase() ===
      removeWhitespace(categoryName).toLowerCase(),
  );

  if (isDuplicate) {
    return;
  }

  try {
    await createCategories(categoryName);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function fetchCategories() {
  try {
    const data = await getCategories();

    updateExpenseStore({
      categories: data,
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}
