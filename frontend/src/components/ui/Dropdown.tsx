import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { CaretIcon } from "../assests/svg";

interface DropdownItem {
  label: string;
  value: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  disabled?: boolean;
}

interface DropdownProps {
  triggerLabel: string;
  options: DropdownItem[];
  onSelect: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnSelect?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = (props: DropdownProps) => {
  const {
    triggerLabel,
    options,
    onSelect,
    open,
    defaultOpen = false,
    onOpenChange,
    closeOnSelect = true,
  } = props;
  const isControlled = open !== undefined;

  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = isControlled ? open : internalOpen;

  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const menuId = useId();

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(nextOpen);
      }

      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleOpenChange(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleOpenChange]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: PointerEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        handleOpenChange(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, [isOpen, handleOpenChange]);

  const handleSelect = (value: string) => {
    onSelect(value);
    if (closeOnSelect) {
      handleOpenChange(false);
    }
  };

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => handleOpenChange(!isOpen)}
        className="h-9 rounded-md bg-[#F3F4F6] px-3
          hover:bg-[#E5E7EB] text-[#111827] text-sm
          font-medium border border-[#E5E7EB]
          flex items-center gap-2"
      >
        {triggerLabel}
        <CaretIcon className="h-4 w-4 text-[#4B5563]" />
      </button>

      {isOpen && (
        <div
          id={menuId}
          role="menu"
          className="absolute left-0 top-full z-50 mt-2
            min-w-45 max-w-55 max-h-60 overflow-auto
            rounded-lg border border-[#E5E7EB]
            bg-white p-1 shadow-md"
        >
          {options.map((option) => {
            const Icon = option.icon;

            return (
              <button
                key={option.value}
                type="button"
                role="menuitem"
                disabled={option.disabled}
                onClick={() => handleSelect(option.value)}
                className={`h-9 w-full rounded-sm px-2
                  flex items-center gap-2 text-sm text-left
                  ${
                    option.disabled
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-[#F3F4F6] cursor-pointer"
                  }`}
              >
                {Icon && <Icon className="h-4 w-4 text-[#4B5563]" />}

                <span className="text-[#374151]">{option.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
