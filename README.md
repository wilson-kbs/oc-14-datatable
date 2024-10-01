# DataTable Library

A React library for displaying data in a table format with pagination, sorting, and search functionality.

## Installation

Use npm to install the library:

```bash
npm install @wilson-kbs/oc-14-datatable
```

## Usage

Here is a basic example of how to use the `DataTable` component:

```typescript
import React from 'react';
import DataTable, { Column, DataType } from '@wilson-kbs/oc-14-datatable';

const columns: Column[] = [
  { title: 'Name', data: 'name' },
  { title: 'Age', data: 'age' },
  { title: 'Email', data: 'email' },
];

const data: DataType[] = [
  { name: 'John Doe', age: 28, email: 'john.doe@example.com' },
  { name: 'Jane Smith', age: 34, email: 'jane.smith@example.com' },
  // Add more data here
];

const App = () => (
  <div>
    <h1>DataTable Example</h1>
    <DataTable columns={columns} data={data} />
  </div>
);

export default App;
```

## Props

### DataTable

| Prop    | Type       | Description                          |
|---------|------------|--------------------------------------|
| columns | `Column[]` | The columns to display in the table. |
| data    | `DataType[]` | The data to display in the table.   |

### Column

| Prop  | Type     | Description            |
|-------|----------|------------------------|
| title | `string` | The title of the column. |
| data  | `string` | The key of the data to display. |

### DataType

An object representing a row of data. The keys should match the `data` values in the columns.

