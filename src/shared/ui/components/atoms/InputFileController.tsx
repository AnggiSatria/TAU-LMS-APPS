"use client";
import { Controller, Control, FieldError } from "react-hook-form";
import { useState } from "react";

interface InputFileControllerProps {
  name: string;
  label: string;
  control: Control<any>;
  error?: FieldError;
}

export const InputFileController = ({
  name,
  label,
  control,
  error,
}: InputFileControllerProps) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [inputKey, setInputKey] = useState(Date.now());

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div>
          <label className="block text-sm font-medium mb-1">{label}</label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
              Upload File
              <input
                key={inputKey}
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFileName(file.name);
                    field.onChange(file); // penting: kirim ke react-hook-form
                  }
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
                  onClick={() => {
                    setFileName(null);
                    setInputKey(Date.now());
                    field.onChange(undefined); // reset form value
                  }}
                  className="text-red-500 hover:text-red-700 font-bold text-sm"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-1">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};
