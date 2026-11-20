import React, { useState } from "react";
import type { ICategory, IExpense } from "../../types/interface";
import { Dropdown } from "../ui/Dropdown";
import { Modal } from "../ui/modal";

interface CreateExpenseProps {
  isOpen: boolean;
  onClose: () => void;
  categories: ICategory[];
  onClick: (
    title: string,
    amount: number,
    categoryId: string,
    description: string,
  ) => void;
  editingExpense: IExpense | null;
  onEditClick: (
    expenseId: string,
    title: string,
    amount: number,
    categoryId: string,
    description?: string,
  ) => void;
}

export const CreateExpense: React.FC<CreateExpenseProps> = (
  props: CreateExpenseProps,
) => {
  const { isOpen, onClose, categories, onClick, editingExpense, onEditClick } =
    props;
  const [title, setTitle] = useState(editingExpense?.title ?? "");
  const [description, setDescription] = useState(
    editingExpense?.description ?? "",
  );
  const [amount, setAmount] = useState(editingExpense?.amount ?? 0);
  const [selectCategoryId, setSelectedCategoryId] = useState(
    editingExpense?.category_id ?? "",
  );

  const categoryOptions = categories.map((category) => ({
    label: category.category_name,
    value: category.category_id,
  }));

  const selectedCategory = categories.find(
    (category) => category.category_id === selectCategoryId,
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="create Expense"
      children={
        <div className="flex flex-col w-full items-center gap-3">
          <input
            className="border w-full py-1 px-1 border-gray-400 rounded-sm"
            type="text"
            placeholder="add title here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="border w-full py-1 px-1 border-gray-400 rounded-sm"
            placeholder="add description ..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className="border w-full py-1 px-1 border-gray-400 rounded-sm"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <Dropdown
            triggerLabel={selectedCategory?.category_name ?? "Select category"}
            options={categoryOptions}
            onSelect={(value) => {
              setSelectedCategoryId(value);
            }}
          />
        </div>
      }
      footer={
        <button
          onClick={() => {
            if (editingExpense) {
              onEditClick(
                editingExpense.id,
                title,
                amount,
                selectCategoryId,
                description,
              );
            } else {
              onClick(title, amount, selectCategoryId, description);
            }

            onClose();
          }}
          className="bg-blue-500 p-2 border border-blue-300 cursor-pointer rounded-md"
        >
          {editingExpense ? "update expense" : "add expense"}
        </button>
      }
    />
  );
};
