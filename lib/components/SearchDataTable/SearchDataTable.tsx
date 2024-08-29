import {FC} from "react";
import styles from "./SearchDataTable.module.css";
import {Input} from "antd";

type SearchDataTableProps = {
  onChange: (e: string) => void;
};

const SearchDataTable: FC<SearchDataTableProps> = ({ onChange }) => {
  return (
    <div className={styles.SearchDataTable}>
      <span>Search: </span>
      <Input allowClear onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};

export default SearchDataTable;
