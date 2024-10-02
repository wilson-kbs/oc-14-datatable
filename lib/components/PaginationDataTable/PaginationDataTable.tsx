import { FC, useEffect, useMemo } from "react";
import styles from "./PaginationDataTable.module.css";
import { determineProximity } from "@lib/utils";

type PaginationDataTableProps = {
  /**
   * The total number of pages.
   */
  total: number;
  /**
   * The current page number.
   */
  current: number;
  /**
   * Callback function to handle page change.
   * @param page - The new page number.
   */
  onChange: (page: number) => void;
  /**
   * Number of pages to show in the pagination bar.
   */
  showPages?: number;
};

const PaginationDataTable: FC<PaginationDataTableProps> = ({
  total,
  current,
  onChange,
  showPages = 7,
}) => {
  useEffect(() => {
    if (current < 1 || current > total) {
      console.warn("Invalid current page number");
    }
  }, [current, total]);

  useEffect(() => {
    if (showPages % 2 === 0) {
      console.warn("showPages should be an odd number");
    }
  }, [showPages]);

  const { pad, showElementOnExtreme, showElementOnMiddle } = useMemo(() => {
    return {
      pad: showPages - 4,
      showElementOnExtreme: showPages - 2,
      showElementOnMiddle: showPages - 4,
    };
  }, [showPages]);

  const proximity = useMemo(() => {
    return determineProximity(current, Math.floor(showPages / 2), total);
  }, [current, showPages, total]);

  const onNext = () => {
    if (current < total) {
      onChange(current + 1);
    }
  };

  const onPrevious = () => {
    if (current > 1) {
      onChange(current - 1);
    }
  };

  function getButton(page: number) {
    return (
      <button
        key={page}
        className={`${page === current ? styles.PaginationDataTable__active : ""}`}
        onClick={() => onChange(page)}
      >
        {page}
      </button>
    );
  }

  function getPagesButtons() {
    if (total <= showPages) {
      const pages = Array.from({ length: total }, (_, i) => i + 1);
      return pages.map(getButton);
    }

    switch (proximity) {
      case "start": {
        const startPages = Array.from(
          { length: showElementOnExtreme },
          (_, i) => i + 1,
        );
        return [
          ...startPages.map(getButton),
          <button key="ellipsis-2" disabled>
            ...
          </button>,
          getButton(total),
        ];
      }
      case "end": {
        const endPages = Array.from(
          { length: showElementOnExtreme },
          (_, i) => i + total - (pad + 1),
        );

        return [
          getButton(1),
          <button key="ellipsis-1" disabled>
            ...
          </button>,
          ...endPages.map(getButton),
        ];
      }
      case "middle": {
        const middlePages = Array.from(
          { length: showElementOnMiddle },
          (_, i) => i + current - Math.floor(showElementOnMiddle / 2),
        );

        return [
          getButton(1),
          <button key="ellipsis-1" disabled>
            ...
          </button>,
          ...middlePages.map(getButton),
          <button key="ellipsis-2" disabled>
            ...
          </button>,
          getButton(total),
        ];
      }
    }
  }

  return (
    <div className={styles.PaginationDataTable}>
      <button disabled={current === 1} onClick={onPrevious}>
        Previous
      </button>
      {getPagesButtons()}
      <button disabled={current === total} onClick={onNext}>
        Next
      </button>
    </div>
  );
};

export default PaginationDataTable;
