import DataTable from "../lib/DataTable";
import styles from "./App.module.css";
import data from "./data/employees-900.json";

function App() {
  const columns = [
    { title: "First Name", data: "firstName" },
    { title: "Last Name", data: "lastName" },
    { title: "Start Date", data: "startDate" },
    { title: "Department", data: "department" },
    { title: "Date of Birth", data: "dateOfBirth" },
    { title: "Street", data: "street" },
    { title: "City", data: "city" },
    { title: "State", data: "state" },
    { title: "Zip Code", data: "zipCode" },
  ];
  console.log(data.length);

  return (
    <div className={styles.Container}>
      <h1>DataTable demo</h1>
      <DataTable columns={columns} data={data} />,
    </div>
  );
}

export default App;
