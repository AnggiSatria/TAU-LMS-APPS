"use client";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputNumberProps {
  label: string;
  placeholder?: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
}

export const InputNumber = ({
  label,
  placeholder,
  register,
  error,
}: InputNumberProps) => {
  // Hanya izinkan angka 0-9
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !/[0-9]/.test(e.key) && // hanya angka
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab"
    ) {
      e.preventDefault();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // filter kalau ada copy-paste karakter selain angka
    e.target.value = e.target.value.replace(/\D/g, "");
    register.onChange(e);
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type="text"
        {...register}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-md ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};
