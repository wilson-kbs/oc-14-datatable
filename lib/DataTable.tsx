import styles from "./DataTable.module.css";
import { FC, useEffect, useMemo, useState } from "react";
import SelectEntryNumber from "./components/SelectEntryNumber/SelectEntryNumber.tsx";
import SearchDataTable from "./components/SearchDataTable/SearchDataTable.tsx";
import PaginationDataTable from "./components/PaginationDataTable/PaginationDataTable.tsx";
import { Column, DataType, Sort } from "./types";
import { useSearch } from "./hooks/useSearch.ts";
import { calculateColumnsSize, getSortIconStyle, isValidSearch } from "./utils";

type FilteredResult = {
  /**
   * The start index of the current page.
   */
  start: number;

  /**
   * The end index of the current page.
   */
  end: number;

  /**
   * The items to render on the current page.
   */
  renderItems: DataType[];
};

export interface DataTableProps {
  /**
   * Columns to display in the table
   */
  columns: Column[];

  /**
   * Data to display in the table
   */
  data: DataType[];
}

/**
 * DataTable component for displaying data in a table format with pagination, sorting, and search functionality.
 */
export const DataTable: FC<DataTableProps> = ({ columns, data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [countPages, setCountPages] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<Sort>({
    column: columns[0].data,
    direction: "asc",
  });
  const columnsSize = useMemo(
    () => calculateColumnsSize(columns, data),
    [columns, data],
  );

  const filteredData = useSearch(data, search);

  useEffect(() => {
    setCountPages(Math.ceil(filteredData.length / entriesPerPage));
  }, [filteredData, entriesPerPage]);

  /**
   * Memoized function to sort the filtered data based on the selected column and direction.
   *
   * @returns {DataType[]} - The sorted data.
   */
  const sortedData = useMemo(() => {
    const column = columns.find((c) => c.data === sort.column);
    if (!column) {
      return filteredData;
    }

    const sorted = [...filteredData].sort((a, b) => {
      const aData = a[column.data]?.toString();
      const bData = b[column.data]?.toString();
      if (aData === bData) {
        return 0;
      } else if (!aData) {
        return -1;
      } else if (!bData) {
        return 1;
      } else {
        return aData.localeCompare(bData);
      }
    });

    return sort.direction === "asc" ? sorted : sorted.reverse();
  }, [columns, filteredData, sort.column, sort.direction]);

  /**
   * Memoized function to calculate the start and end indices for the current page,
   * and to slice the sorted data to get the items to render.
   */
  const { start, end, renderItems }: FilteredResult = useMemo(() => {
    if (sortedData.length === 0) {
      return {
        start: 0,
        end: 0,
        renderItems: [],
      };
    }

    const start = (currentPage - 1) * entriesPerPage;
    const end = start + entriesPerPage;
    return {
      start: start + 1,
      end: Math.min(end, sortedData.length),
      renderItems: sortedData.slice(start, end),
    };
  }, [currentPage, entriesPerPage, sortedData]);

  const onShowNumberOfEntriesChange = (value: number) => {
    setEntriesPerPage(value);
    setCurrentPage(1);
  };

  const onSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const onPaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  const onSort = (column: string) => {
    if (sort.column === column) {
      setSort({
        column,
        direction: sort.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSort({ column, direction: "asc" });
    }
  };

  return (
    <div
      className={styles.DataTable_Wrapper}
      style={{
        width: columnsSize.reduce((acc, size) => acc + size, 0) + "px",
      }}
    >
      <div className={styles.DataTable_Wrapper_Header}>
        <SelectEntryNumber onSelect={onShowNumberOfEntriesChange} />
        <SearchDataTable onChange={onSearch} />
      </div>

      <table className={styles.DataTable}>
        <thead>
          <tr className={styles.DataTable_Header_Row}>
            {columns.map((column) => (
              <th
                className={styles.DataTable_Header_Cell}
                key={column.data}
                style={{
                  ...(sort.column === column.data
                    ? getSortIconStyle(sort.direction)
                    : getSortIconStyle()),
                  width: columnsSize[columns.indexOf(column)] + "px",
                }}
                onClick={() => onSort(column.data)}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.DataTable_Body}>
          {renderItems.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td
                  className={`${styles.DataTable_Body_Cell} ${column.data === sort.column ? styles.Sorterd : ""}`}
                  key={column.data}
                >
                  {row[column.data]}
                </td>
              ))}
            </tr>
          ))}
          {renderItems.length === 0 && (
            <tr>
              <td
                className={`${styles.DataTable_Body_Cell} ${styles.DataTable_Body_Cell_Empty}`}
                colSpan={columns.length}
              >
                No data available in table
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className={styles.DataTable_Footer}>
        <div>
          <span>
            Showing {start} to {end} of {filteredData.length} entries
          </span>
          {isValidSearch(search) && (
            <span> (filtered from {data.length} total entries)</span>
          )}
        </div>
        {countPages > 1 && (
          <PaginationDataTable
            total={countPages}
            current={currentPage}
            onChange={onPaginationChange}
          />
        )}
      </div>
    </div>
  );
};

export default DataTable;
