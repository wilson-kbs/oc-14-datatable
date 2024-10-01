import {DataType} from "../types";
import {isValidSearch, normalize} from "../utils";

/**
 * Custom hook for searching through data
 * @param data - The data to search through
 * @param search - The search query string
 * @returns The filtered data based on the search query
 */
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
