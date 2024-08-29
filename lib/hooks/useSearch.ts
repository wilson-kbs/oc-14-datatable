import { isValidSearch } from "../utils/isValidSearch.ts";
import { DataType } from "../types/DataType.ts";
import { normalize } from "../utils/normalize.ts";

export const useSearch = (data: DataType[], search: string) => {
  if (!isValidSearch(search)) {
    return data;
  }

  const splitSearch = search.split(/ +/g).filter((s) => s.length > 0);

  const normalizedSearch = splitSearch.map(normalize);

  return data.filter((row) => {
    const values = Object.values(row);
    return normalizedSearch.every((search) => {
      return values.some((value) => normalize(`${value}`).includes(search));
    });
  });
};
