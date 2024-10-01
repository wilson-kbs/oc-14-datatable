import {Column, DataType} from "../types";

/**
 * Calculates the size of each column based on the data.
 * @param columns - The columns to calculate sizes for.
 * @param data - The data to calculate sizes from.
 * @returns An array of column sizes.
 */
export const calculateColumnsSize = (
  columns: Column[],
  data: DataType[],
): number[] => {
  return columns.map((column) => {
    const maxLength = data.reduce((max, row) => {
      const value = row[column.data]?.toString() || "";
      return Math.max(max, value.length);
    }, column.title.length);

    return maxLength * 8 + 40;
  });
};
