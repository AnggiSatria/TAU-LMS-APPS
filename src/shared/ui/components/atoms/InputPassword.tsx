import { useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputPasswordProps {
  label: string;
  placeholder?: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
}

export const InputPassword = ({
  label,
  placeholder,
  error,
  register,
}: InputPasswordProps) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          {...register}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border rounded-md pr-10 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {show ? "🙈" : "👁️"}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};
