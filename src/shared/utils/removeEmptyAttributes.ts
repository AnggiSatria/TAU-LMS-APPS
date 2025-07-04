import { listFilter } from "../lib/interfaces/filter.interfaces";

export const removeEmptyAttributes = (params: listFilter) => {
  const queryString = Object?.entries(params)
    .filter(([_, value]) => value !== undefined && value !== "")
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return queryString;
};
