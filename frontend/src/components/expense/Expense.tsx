import React, { useEffect, useState } from "react";
import {
  createExpense,
  deleteExpense,
  fetchExpenses,
} from "../../services/expenseAction";
import { useExpenseStore } from "../../store/expense/expenseStore";
import { ExpenseList } from "./ExpenseList";
import { CreateExpense } from "./CreateExpense";
import { CreateCategory } from "../category/CreateCategory";
import { createCategory, fetchCategories } from "../../services/categoryAction";

export const Expense: React.FC = () => {
  const expenses = useExpenseStore((state) => state.expenses);
  const categories = useExpenseStore((state) => state.categories);
  const [isOpen, setIsOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  return (
    <div className="p-3 flex flex-col gap-4">
      <div className="flex gap-3 ">
        <button
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
          className="p-2  cursor-pointer bg-blue-600 border border-blue-400 rounded-md"
        >
          Add Expense
        </button>
        <button
          onClick={() => {
            setCategoryOpen((prev) => !prev);
          }}
          className="p-2  cursor-pointer bg-blue-600 border border-blue-400 rounded-md"
        >
          Add Category
        </button>
      </div>
      <CreateExpense
        isOpen={isOpen}
        onClose={() => setIsOpen((prev) => !prev)}
        categories={categories}
        onClick={createExpense}
      />
      <CreateCategory
        isOpen={categoryOpen}
        onClose={() => setCategoryOpen((prev) => !prev)}
        onClick={createCategory}
      />
      <div className="flex items-center gap-3">
        {expenses.map((expense) => (
          <ExpenseList
            expense={expense}
            onDelete={() => deleteExpense(expense.id)}
          />
        ))}
      </div>
    </div>
  );
};
