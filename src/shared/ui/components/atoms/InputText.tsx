import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputTextProps {
  label: string;
  placeholder?: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
  type?: string;
}

export const InputText = ({
  label,
  placeholder,
  register,
  error,
  type = "text",
}: InputTextProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        {...register}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-md ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};
