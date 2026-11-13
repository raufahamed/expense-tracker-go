import React, { useEffect } from "react";
import { CloseIcon } from "../assests/svg";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  title?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClose: () => void;
  footer?: React.ReactNode;
}

const modalSize = {
  sm: "max-w-[400px]",
  md: "max-w-[570px]",
  lg: "max-w-[700px]",
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  size = "sm",
  children,
  onClose,
  footer,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) return null;

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`flex max-h-[85vh] w-full ${modalSize[size]} flex-col overflow-hidden rounded-xl bg-white p-6 shadow-2xl`}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between">
          {title && (
            <h2
              id="modal-title"
              className="text-lg font-semibold text-gray-900"
            >
              {title}
            </h2>
          )}

          <button
            type="button"
            aria-label="Close modal"
            className="cursor-pointer"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div className="min-h-0 flex-1 overflow-y-auto py-4">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex shrink-0 gap-2 border-t border-gray-200 pt-4">
            {footer}
          </div>
        )}
      </div>
    </div>,
    modalRoot,
  );
};
