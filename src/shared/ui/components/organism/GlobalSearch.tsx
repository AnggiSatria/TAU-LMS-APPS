import { SearchBar } from "../molecules/SearchBar";

export const GlobalSearch = ({ placeHolder }: { placeHolder?: string }) => {
  return (
    <div className="w-full">
      <SearchBar placeHolder={placeHolder} />
    </div>
  );
};
