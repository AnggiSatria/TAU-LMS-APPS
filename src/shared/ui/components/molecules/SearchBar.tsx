import { SearchInput } from "../atoms/SearchInput";

export const SearchBar = ({ placeHolder }: { placeHolder?: string }) => {
  return (
    <div className="w-full">
      <SearchInput placeHolder={placeHolder} />
    </div>
  );
};
