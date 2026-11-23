import React, { useEffect, useState } from "react";
import { createCategory, fetchCategories } from "../../services/categoryAction";
import {
  createExpense,
  deleteExpense,
  sortExpenses,
  updateExpense,
} from "../../services/expenseAction";
import { useExpenseStore } from "../../store/expense/expenseStore";
import type { IExpense } from "../../types/interface";
import { CreateCategory } from "../category/CreateCategory";
import { CreateExpense } from "./CreateExpense";
import { ExpenseList } from "./ExpenseList";
import { SortBy } from "../../enums";
import { Dropdown } from "../ui/Dropdown";

export const Expense: React.FC = () => {
  const expenses = useExpenseStore((state) => state.expenses);
  const categories = useExpenseStore((state) => state.categories);
  const [isOpen, setIsOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<IExpense | null>(null);
  const [sortBy, setSortBy] = useState<SortBy | null>(null);
  const sort_by = useExpenseStore((state) => state.sortBy);

  const sortingOptions = [
    {
      label: "Highest",
      value: SortBy.highest,
    },
    {
      label: "Lowest",
      value: SortBy.lowest,
    },
    {
      label: "Newest",
      value: SortBy.newest,
    },
    {
      label: "Oldest",
      value: SortBy.oldest,
    },
  ];

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    sortExpenses(sort_by);
  }, [sort_by]);

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
        <Dropdown
          triggerLabel={sort_by ?? "Sort By amount & date"}
          options={sortingOptions}
          onSelect={(value) => {
            setSortBy(value as SortBy);
            sortExpenses(value as SortBy);
          }}
        />
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
      <div className="grid grid-cols-4 items-center gap-2">
        {expenses.map((expense) => (
          <ExpenseList
            expense={expense}
            onDelete={() => {
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
