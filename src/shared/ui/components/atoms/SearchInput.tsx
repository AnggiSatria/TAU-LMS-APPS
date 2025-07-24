"use client";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { useSearchStore } from "@/shared/store/useSearchStore";

export const SearchInput = () => {
  const { setKeyword } = useSearchStore();
  const [inputValue, setInputValue] = useState("");
  const debounced = useDebounce(inputValue, 500);

  useEffect(() => {
    setKeyword(debounced);
  }, [debounced]);

  return (
    <input
      type="text"
      className="w-full p-2 border border-gray-300 rounded-md"
      placeholder="Cari kelas..."
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
};
