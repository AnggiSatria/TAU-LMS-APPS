"use client";

import { Controller, Control, FieldError } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { cn } from "@/shared/utils/cn"; // optional, classNames helper

interface InputDateControllerProps {
  name: string;
  label: string;
  placeholder?: string;
  control: Control<any>;
  error?: FieldError;
  disabled?: boolean;
}

export const InputDateController = ({
  name,
  label,
  placeholder = "Select a date",
  control,
  error,
  disabled = false,
}: InputDateControllerProps) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1 text-gray-700">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText={placeholder}
            minDate={new Date()} // ⬅️ tidak bisa klik tanggal sebelum hari ini
            disabled={disabled}
            className={cn(
              "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
              error ? "border-red-500" : "border-gray-300"
            )}
          />
        )}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};
