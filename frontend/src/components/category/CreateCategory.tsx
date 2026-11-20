import React, { useState } from "react";
import { Modal } from "../ui/modal";

interface CraeteCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  onClick: (name: string) => void;
}

export const CreateCategory: React.FC<CraeteCategoryProps> = (
  props: CraeteCategoryProps,
) => {
  const { isOpen, onClose, onClick } = props;
  const [categoryName, setCategoryName] = useState("");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Category"
      children={
        <div className="">
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="border w-full py-1 px-1 border-gray-400 rounded-sm"
            placeholder="add category name ..."
          />
        </div>
      }
      footer={
        <button
          onClick={() => {
            onClick(categoryName);
            onClose();
          }}
          className="p-1 bg-blue-600 border border-blue-400 rounded-sm cursor-pointer"
        >
          Add category
        </button>
      }
    />
  );
};
