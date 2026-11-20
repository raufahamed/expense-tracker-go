import React, { useEffect, useState } from "react";
import { createCategory, fetchCategories } from "../../services/categoryAction";
import {
  createExpense,
  deleteExpense,
  fetchExpenses,
  updateExpense,
} from "../../services/expenseAction";
import { useExpenseStore } from "../../store/expense/expenseStore";
import type { IExpense } from "../../types/interface";
import { CreateCategory } from "../category/CreateCategory";
import { CreateExpense } from "./CreateExpense";
import { ExpenseList } from "./ExpenseList";

export const Expense: React.FC = () => {
  const expenses = useExpenseStore((state) => state.expenses);
  const categories = useExpenseStore((state) => state.categories);
  const [isOpen, setIsOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<IExpense | null>(null);

  console.log(editingExpense, "editingExpense here");

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
        key={editingExpense?.id ?? "createExpense"}
        isOpen={isOpen}
        onClose={() => setIsOpen((prev) => !prev)}
        categories={categories}
        onClick={createExpense}
        editingExpense={editingExpense}
        onEditClick={updateExpense}
      />
      <CreateCategory
        isOpen={categoryOpen}
        onClose={() => setCategoryOpen((prev) => !prev)}
        onClick={createCategory}
      />
      <div className="grid grid-cols-3 items-center gap-3">
        {expenses.map((expense) => (
          <ExpenseList
            expense={expense}
            onDelete={() => {
              console.log("am i getting called here in the delete onClick");

              deleteExpense(expense.id);
            }}
            onEdit={() => {
              setEditingExpense(expense);
              setIsOpen((prev) => !prev);
            }}
          />
        ))}
      </div>
    </div>
  );
};
