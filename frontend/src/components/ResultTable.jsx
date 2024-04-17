import React from "react";
import { v4 as uuidv4 } from "uuid";

import { DataGrid } from "@mui/x-data-grid";

const ResultTable = ({ queryResult, resultSize }) => {
  let columns = [];
  let rows = [];
  let rowsWithUniqueId = [];

  if (queryResult && queryResult.length > 0) {
    let columnNames = Object.keys(queryResult[0]);
    columnNames.forEach((item) => {
      // Check if the value is an object and format it accordingly
      const value = queryResult[0][item];
      const isObject =
        typeof value === "object" && value !== null && !Array.isArray(value);

      columns.push({
        field: item,
        headerName: item,
        width: 200,
        valueGetter: (params) => {
          const cellValue = params.row[item];

          // If the cell value is an object, format it as a string
          if (isObject) {
            return JSON.stringify(cellValue);
          }

          return cellValue;
        },
      });
    });
  }

  if (queryResult) {
    rows = queryResult;
  }
  rowsWithUniqueId = rows.map((row) => ({
    id: uuidv4(),
    ...row,
  }));


  return (
    <div>
      {queryResult && (
        <div style={{ height: 400, width: "100%" }}>
          
          <DataGrid
            rows={rowsWithUniqueId}
            columns={columns}
            getRowId={(row) => row.id}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 25, 50, 100]}
          />
        </div>
      )}
    </div>
  );
};

export default ResultTable;
