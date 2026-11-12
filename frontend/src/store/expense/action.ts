import type { IExpenseStore } from "../../types/interface";
import { defaultExpenseStore } from "../constant";
import { useExpenseStore } from "./expenseStore";

export const updateExpenseStore = (updateObject: Partial<IExpenseStore>) => {
  useExpenseStore.setState((prevState) => ({
    ...prevState,
    ...updateObject,
  }));
};

export const resetExpenseFilter = () => {
  useExpenseStore.setState(defaultExpenseStore, true);
};
