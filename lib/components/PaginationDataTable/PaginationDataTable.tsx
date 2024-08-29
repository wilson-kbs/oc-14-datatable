import { FC } from "react";
import styles from "./PaginationDataTable.module.css";

type PaginationDataTableProps = {
  total: number;
  current: number;
  onChange: (page: number) => void;
};

const PaginationDataTable: FC<PaginationDataTableProps> = ({
  total,
  current,
  onChange,
}) => {
  if (current < 1 || current > total) {
    console.warn("Invalid current page number");
  }

  const pages = Array.from({ length: total }, (_, i) => i + 1);

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

  return (
    <div className={styles.PaginationDataTable}>
      <button disabled={current === 1} onClick={onPrevious}>
        Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`${page === current ? styles.PaginationDataTable__active : ""}`}
          onClick={() => onChange(page)}
        >
          {page}
        </button>
      ))}
      <button disabled={current === total} onClick={onNext}>
        Next
      </button>
    </div>
  );
};

export default PaginationDataTable;
