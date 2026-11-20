import React from "react";
import type { IExpense } from "../../types/interface";

interface ExpenseListProps {
  expense: IExpense;
  onDelete: (id: string) => void;
}

export const ExpenseList: React.FC<ExpenseListProps> = (
  props: ExpenseListProps,
) => {
  const { expense, onDelete } = props;

  const created_at = new Date(expense.created_at).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="w-80 border border-gray-500 bg-white rounded-2xl p-4">
      <div className="flex flex-col gap-1">
        <p className="text-gray-700 text-xl font-bold">{expense.title}</p>
        <div className="border-gray-500 p-2 rounded-md bg-indigo-100">
          <p className="text-gray-400">{expense.description}</p>
          <p className="text-blue-300 text-[12px]">${expense.amount}</p>
          <p className="text-gray-500 text-[12px]">{created_at}</p>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <button
          className="p-1 border-gray-300 border bg-gray-400 rounded-md"
          onClick={() => {
            onDelete(expense.id);
          }}
        >
          delete
        </button>
        <button
          className="p-1 border-gray-300 border bg-gray-400 rounded-md"
          onClick={() => {
            onDelete(expense.id);
          }}
        >
          edit
        </button>
      </div>
    </div>
  );
};
