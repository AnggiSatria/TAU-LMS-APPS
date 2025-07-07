"use client";

import AsyncSelect from "react-select/async";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import React from "react";

interface OptionType {
  label: string;
  value: string | number;
}

interface AsyncSelectFieldProps {
  label: string;
  placeholder?: string;
  loadOptions: (inputValue: string) => Promise<OptionType[]>;
  defaultValue?: OptionType | null;
  error?: FieldError;
  onChange?: (option: OptionType | null) => void;
  value?: OptionType | null;
  name: string;
}

export const AsyncSelectField = ({
  label,
  placeholder,
  loadOptions,
  defaultValue = null,
  error,
  onChange,
  value,
  name,
}: AsyncSelectFieldProps) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions={loadOptions}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        classNamePrefix="react-select"
        name={name}
        styles={{
          control: (base, state) => ({
            ...base,
            borderColor: error ? "#f87171" : "#d1d5db",
            boxShadow: "none",
            "&:hover": {
              borderColor: "#2563eb",
            },
          }),
        }}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};
