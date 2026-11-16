import React, { useState } from "react";
import {
  CloseIcon,
  ErrorIcon,
  InfoIcon,
  SuccessIcon,
  WarningIcon,
} from "../../assests/svg";

interface ToastProps {
  message: React.ReactNode;
  variant: "success" | "error" | "warning" | "info";
}

const ToastIcons = {
  success: SuccessIcon,
  error: ErrorIcon,
  info: InfoIcon,
  warning: WarningIcon,
};

const ToastColors = {
  success: "text-[#16A34A]",
  error: "text-[#DC2626]",
  warning: "text-[#D97706]",
  info: "text-[#2563EB]",
};

export const Toast: React.FC<ToastProps> = ({ message, variant }) => {
  const [isVisible, setIsVisible] = useState(true);

  const Icon = ToastIcons[variant];
  const iconColor = ToastColors[variant];

  if (!isVisible) return null;

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className="flex w-90 min-h-16 items-center gap-3 fixed bottom-6 right-6 z-1000
        rounded-lg border border-[#E5E7EB] bg-white p-4
        shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
    >
      <Icon className={`h-5 w-5 shrink-0 ${iconColor}`} />

      <div className="flex-1 text-sm font-medium text-[#111827]">{message}</div>

      <CloseIcon
        onClick={() => {
          setIsVisible(false);
        }}
        className="h-4 w-4 text-[#6B7280] cursor-pointer"
      />
    </div>
  );
};
