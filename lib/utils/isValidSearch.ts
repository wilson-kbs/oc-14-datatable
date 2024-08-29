import { normalize } from "./normalize.ts";

export const isValidSearch = (search: string) => {
  return normalize(search).length !== 0;
};
