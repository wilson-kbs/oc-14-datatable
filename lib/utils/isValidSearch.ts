import {normalize} from "./normalize.ts";

/**
 * Checks if the given search string is valid.
 *
 * @param search - The search string to validate.
 * @returns Returns true if the search string is valid, otherwise false.
 */
export const isValidSearch = (search: string) => {
  return normalize(search).length !== 0;
};
