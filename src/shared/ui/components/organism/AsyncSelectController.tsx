"use client";

import AsyncSelect from "react-select/async";
import { Controller, Control, FieldError } from "react-hook-form";
import React from "react";

interface OptionType {
  label: string;
  value: string | number;
}

interface AsyncSelectControllerProps {
  name: string;
  control: Control<any>;
  label: string;
  placeholder?: string;
  loadOptions: (inputValue: string) => Promise<OptionType[]>;
  defaultValue?: OptionType | null;
}

export const AsyncSelectController = ({
  name,
  control,
  label,
  placeholder,
  loadOptions,
  defaultValue = null,
}: AsyncSelectControllerProps) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field, fieldState }) => (
          <>
            <AsyncSelect
              {...field}
              cacheOptions
              defaultOptions
              loadOptions={loadOptions}
              placeholder={placeholder}
              classNamePrefix="react-select"
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: fieldState.error ? "#f87171" : "#d1d5db",
                  boxShadow: "none",
                  "&:hover": {
                    borderColor: "#2563eb",
                  },
                }),
              }}
              // react-select tidak menggunakan "value" langsung dari react-hook-form
              value={field.value}
              onChange={(option) => field.onChange(option)}
            />

            {fieldState.error && (
              <p className="text-red-500 text-sm mt-1">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
};
