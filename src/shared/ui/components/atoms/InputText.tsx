"use client";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { useState } from "react";

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
  const [fileName, setFileName] = useState<string | null>(null);
  const [inputKey, setInputKey] = useState(Date.now()); // untuk reset file input

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleRemoveFile = () => {
    setFileName(null);
    setInputKey(Date.now()); // reset input file dengan ganti key
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>

      {type === "file" ? (
        <div className="flex items-center gap-4">
          <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
            Upload File
            <input
              key={inputKey} // reset file dengan ubah key
              type="file"
              {...register}
              onChange={(e) => {
                handleFileChange(e);
                register.onChange(e); // trigger react-hook-form
              }}
              className="hidden"
            />
          </label>

          {fileName && (
            <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-md">
              <span className="text-sm text-gray-800 truncate max-w-[160px]">
                {fileName}
              </span>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="text-red-500 hover:text-red-700 font-bold text-sm"
                title="Hapus file"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      ) : (
        <input
          type={type}
          {...register}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border rounded-md ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};
