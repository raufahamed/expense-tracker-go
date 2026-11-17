import React, { useState } from "react";
import { Modal } from "../ui/modal";

interface CreateExpenseProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateExpense: React.FC<CreateExpenseProps> = (
  props: CreateExpenseProps,
) => {
  const { isOpen } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);

  console.log("am i getting called here createExpense", isOpen);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onclose}
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
        </div>
      }
    />
  );
};
