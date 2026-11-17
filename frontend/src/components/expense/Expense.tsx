import React, { useEffect, useState } from "react";
import { deleteExpense, fetchExpenses } from "../../services/expenseAction";
import { useExpenseStore } from "../../store/expense/expenseStore";
import { ExpenseList } from "./ExpenseList";
import { CreateExpense } from "./CreateExpense";

export const Expense: React.FC = () => {
  const expenses = useExpenseStore((state) => state.expenses);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="p-3 flex flex-col gap-4">
      <div>
        <button
          onClick={() => {
            setIsOpen((prev) => !prev);
            console.log("am i getting called here", isOpen);
          }}
          className="p-2  cursor-pointer bg-blue-600 border border-blue-400 rounded-md"
        >
          Add Expense
        </button>
        <CreateExpense
          isOpen={isOpen}
          onClose={() => setIsOpen((prev) => !prev)}
        />
      </div>
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
