import React, { Children } from "react";

interface ButtonProps {
  onClick?: () => void;
  styles?: string;
  type?: "button" | "submit";
  children: React.ReactNode;
  disabled?: boolean;
}

export default function Button({
  onClick,
  styles,
  type = "button",
  children,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles} cursor-pointer px-4 py-2 rounded-md font-semibold`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
