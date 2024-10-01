/**
 * Normalizes the input string by:
 * - Decomposing combined graphemes into their constituent parts (NFD normalization).
 * - Removing diacritical marks (accents).
 * - Converting to lowercase.
 * - Trimming whitespace from both ends.
 * - Replacing non-alphanumeric characters with hyphens.
 *
 * @param {string} input - The input string to normalize.
 * @returns {string} - The normalized string.
 */
export function normalize(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/gi, "-");
}
