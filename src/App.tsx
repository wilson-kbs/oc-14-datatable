import DataTable, { DataType } from "../lib";
import styles from "./App.module.css";
import dataUrl from "./data/employees-900.json?url";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState<DataType[] | null>(null);

  useEffect(() => {
    fetch(dataUrl)
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement du fichier JSON:", error);
      });
  }, []);

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

  return (
    <div className={styles.Container}>
      <h1>DataTable demo</h1>
      {data ? (
        <DataTable columns={columns} data={data} />
      ) : (
        <p>Chargement des données...</p>
      )}
    </div>
  );
}

export default App;
