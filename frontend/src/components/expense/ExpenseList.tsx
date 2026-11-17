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
    <div className="w-80 border border-gray-500 bg-gray-300 rounded-2xl p-4">
      title- {expense.title}
      description- {expense.description}
      amount - {expense.amount}
      created_at - {created_at}
      category-name - {expense.category_name}
      <button
        className="p-2 border-gray-300 border bg-gray-400"
        onClick={() => {
          onDelete(expense.id);
        }}
      >
        delete the expense
      </button>
    </div>
  );
};
