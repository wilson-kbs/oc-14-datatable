import { FC, useEffect } from "react";
import styles from "./SelectEntryNumber.module.css";
import { Select } from "antd";

type SelectEntryNumberProps = {
  onSelect: (value: number) => void;
};

const SelectEntryNumber: FC<SelectEntryNumberProps> = ({ onSelect }) => {
  useEffect(() => {
    onSelect(10);
  }, []);

  return (
    <div className={styles.SelectNumberEntries}>
      <span>Show</span>
      <Select onSelect={onSelect} defaultValue={10}>
        <Select.Option value={10}>10</Select.Option>
        <Select.Option value={25}>25</Select.Option>
        <Select.Option value={50}>50</Select.Option>
        <Select.Option value={100}>100</Select.Option>
      </Select>
      <span>entries</span>
    </div>
  );
};

export default SelectEntryNumber;
